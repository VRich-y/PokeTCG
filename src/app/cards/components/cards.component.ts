import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service';
import { Router } from '@angular/router';
import { fadeInOut } from '../../shared/animations';
import { PokemonCard, PokemonCardData } from '../../shared/models/pokemon-card';
import { Subscription, fromEvent, debounceTime, distinctUntilChanged } from 'rxjs';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
  animations: [fadeInOut]
})
export class CardsComponent implements OnInit {
  private scrollSubscription: Subscription | undefined;

  constructor(private pokeApi: ApiServiceService,
    private router: Router,
    private appComp:AppComponent
  ) {
    appComp.isLoginOn = false;
  }

  ngOnInit(): void {
    if (this.filterText) {
      this.searchData(true);
    } else {
      this.getCards(this.pageNumber, this.pageSize);
    }

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

  cards: PokemonCardData[] = [];
  filteredCards: PokemonCardData[] = [];
  filterText: string = this.pokeApi.filterData();
  pageSize: number = 30;
  pageNumber: number = 1;
  loading: boolean = false;
  closeList: boolean = false;
  notFound: boolean = false;
  loadMore: boolean = false;


  getNextPage(): void {
    this.pageNumber++;

    if (this.filterText && this.filteredCards.length > 0 && this.cards.length > 0) {
      this.searchData(false);
    } else {
      this.getCards(this.pageNumber, this.pageSize);
    }
  }

  getCards(pageNumber: number, pageSize: number) {
    this.loading = true;
    this.contentLoaded = false;
    this.pokeApi.getCards(pageNumber, pageSize).subscribe({
      next: (value: PokemonCard) => {
        if (this.cards.length === 0) {
          this.cards = value.data;
        } else {
          value.data.forEach(element => {
            this.cards.push(element)
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
      },
    });
  }

  getFilterTextFromApi(text?: string): string {
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
      this.pokeApi.searchCards(text.toLowerCase().replace(' ', '**'), 'card', this.pageNumber, this.pageSize).subscribe({
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
    this.getCards(this.pageNumber, this.pageSize);
    this.notFound = false;

  }

  verDetalhes(id: string) {
    this.router.navigate(['/cards', id]);
  }
}
