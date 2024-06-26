import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from '../../../services/api-service.service';
import { fadeInOut } from '../../../shared/animations';
import { PokemonCard, PokemonCardData, PokemonSearchedSet } from '../../../shared/models/pokemon-card';
import { Subscription, debounceTime, distinctUntilChanged, fromEvent } from 'rxjs';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-set-page.component.html',
  styleUrls: ['./detail-set-page.component.scss'],
  animations: [fadeInOut]
})
export class DetailSetPageComponent implements OnInit {
  private scrollSubscription: Subscription | undefined;
  constructor(
    private route: ActivatedRoute,
    private pokeApi: ApiServiceService,
    private router: Router,
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
    this.getSets();
    if (this.filterText) {
      this.searchData(true);
    } else {
      this.getCardbySet(this.pageNumber, this.pageSize);
    }
    this.elementRef.nativeElement.ownerDocument.documentElement.scrollTop = 0;

    this.setupScrollListener();
  }

  contentLoaded: boolean = false;

  private setupScrollListener(): void {
    this.loading = true;
    setTimeout(() => {
      this.contentLoaded = true;
      if (this.contentLoaded) {
        this.scrollSubscription = fromEvent(window, 'scroll')
          .pipe(
            debounceTime(400),
            distinctUntilChanged()
          )
          .subscribe(() => {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
              this.getNextPage();
            }
          });
      }
    }, 2000)
  }
  
  id = this.route.snapshot.paramMap.get('id')!;
  sets: PokemonSearchedSet;

  pageSize: number = 30;
  pageNumber: number = 1;
  cards: PokemonCardData[] = [];
  filteredCards: PokemonCardData[] = [];
  filterText: string = this.pokeApi.filterData();
  loading: boolean = false;
  closeList: boolean = false;
  notFound: boolean = false;
  loadMore: boolean = false

  getSets() {
    this.pokeApi.exportSets().subscribe((data: any) => {
      this.sets = data.data.find((x: any) => x.id === this.id);
    })
  }



  getNextPage(): void {
    this.pageNumber++

    if (this.cards.length > 0) {
      if (this.filterText && this.filteredCards.length > 0) {
        this.searchData(false);
      } else {
        this.getCardbySet(this.pageNumber, this.pageSize);
      }
    }
  }

  getCardbySet(pageNumber: number, pageSize: number) {
    this.loading = true;
    this.contentLoaded = false;
    this.pokeApi.getCards(pageNumber, pageSize, this.id).subscribe({
      next: (value: PokemonCard) => {
        if (this.cards.length === 0) {
          this.cards = value.data;
        } else {
          value.data.forEach(element => {
            this.cards.push(element);
          });
        }
        if (value.totalCount > this.cards.length) {
          this.loadMore = true;
        } else {
          this.loadMore = false;
        }
        this.loading = false;
        this.notFound = false;
        setTimeout(() => {
          this.contentLoaded = true;
        }, 1000);
      }
    })
  }

  getFilterTextFromApi(text?: string) {
    return this.pokeApi.filterData(text);
  }

  searchData(wasClicked: boolean) {
    let text: string = this.getFilterTextFromApi();
    this.contentLoaded = false;

    if (wasClicked) {
      text = this.getFilterTextFromApi(this.filterText);
      this.pageNumber = 1;
      this.filteredCards = [];
    }

    if (text) {
      this.loading = true;
      if (this.filteredCards.length === 0) {
        this.closeList = true;
      }

      this.pokeApi.searchCards(text.toLowerCase().replace(' ', '**'), 'set', this.pageNumber, this.pageSize, this.id).subscribe({
        next: (value: PokemonCard) => {
          if (value.data && value.data.length > 0) {
            if (this.filteredCards.length === 0) {
              this.filteredCards = value.data;
              this.cards = value.data;
            } else {
              value.data.forEach(element => {
                this.cards.push(element);
              });
            }
            this.closeList = false;
            this.loading = false;
            this.notFound = false;
            if (value.totalCount > this.cards.length) {
              this.loadMore = true;
            } else {
              this.loadMore = false;
            }
          } else {
            this.loading = false;
            if (this.pageNumber === 1) {
              this.notFound = true;
            }
            this.closeList = false;
            this.loadMore = false;
          }
          setTimeout(() => {
            this.contentLoaded = true;
          }, 1000);
        }, error: () => {
          this.loading = false;
        }
      });
    }
  }

  cleanSearch() {
    this.pageNumber = 1;
    this.filteredCards = [];
    this.cards = [];
    this.filterText = '';
    this.getFilterTextFromApi(this.filterText);
    this.getCardbySet(this.pageNumber, this.pageSize,)
    this.notFound = false;

  }

  verDetalhes(id: string) {
    this.router.navigate(['/cards', id]);
  }
}
