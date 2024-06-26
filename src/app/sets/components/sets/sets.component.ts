import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../../services/api-service.service';
import { fadeInOut } from '../../../shared/animations';
import { Router } from '@angular/router';
import { PokemonSearchedSet, PokemonSet } from '../../../shared/models/pokemon-card';


interface OrganisedSets {
  base: PokemonSearchedSet[];
  gym: PokemonSearchedSet[];
  neo: PokemonSearchedSet[];
  ecard: PokemonSearchedSet[];
  ex: PokemonSearchedSet[];
  np: PokemonSearchedSet[];
  pop: PokemonSearchedSet[];
  diamondpearl: PokemonSearchedSet[];
  platinum: PokemonSearchedSet[];
  heartgoldsoulsilver: PokemonSearchedSet[];
  blackwhite: PokemonSearchedSet[];
  xy: PokemonSearchedSet[];
  sunmoon: PokemonSearchedSet[];
  swordshield: PokemonSearchedSet[];
  scarletviolet: PokemonSearchedSet[];
  other: PokemonSearchedSet[]
}
@Component({
  selector: 'app-sets',
  templateUrl: './sets.component.html',
  styleUrls: ['./sets.component.scss'],
  animations: [fadeInOut]
})
export class SetsComponent implements OnInit {

  constructor(private pokeApi: ApiServiceService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getSets();
    this.searchData();
  }

  sets: PokemonSet;
  series: string[];
  organisedData: OrganisedSets = {
    base: [],
    gym: [],
    neo: [],
    ecard: [],
    ex: [],
    np: [],
    pop: [],
    diamondpearl: [],
    platinum: [],
    heartgoldsoulsilver: [],
    blackwhite: [],
    xy: [],
    sunmoon: [],
    swordshield: [],
    scarletviolet: [],
    other: []
  };
  filterText: string = this.pokeApi.filterData();
  filteredOrganisedSets: OrganisedSets = { ...this.organisedData };
  loading: boolean = false;
  closeList: boolean = false;
  notFound: boolean = false;

  processSeriesElement(element: string): keyof OrganisedSets {
    return element.toLowerCase().replace('&', '').replace(' ', '').replace(' ', '').replace('-', '') as keyof OrganisedSets;
  }

  getAllSeries() {
    const series: string[] = [];

    for (let i = 0; i < this.sets.data.length; i++) {
      if (!series.includes(this.sets.data[i].series)) {
        series.push(this.sets.data[i].series);
      }
    }

    series.forEach((element) => {
      const processedElement: string = element.toLowerCase().replace('&', '').replace(' ', '').replace(' ', '').replace('-', '');
      this.organisedData[processedElement as keyof OrganisedSets] = this.sets.data.filter(x => x.series === element);
    });
    this.filteredOrganisedSets = { ...this.organisedData };
    this.series = series;
  }

  getSets() {
    this.pokeApi.exportSets().subscribe((data: PokemonSet) => {
      this.sets = data;
      this.getAllSeries();
    })
  }

  searchData() {
    const text: string = this.pokeApi.filterData(this.filterText);
    let allPropsEmpty: boolean = true;

    for (const prop in this.organisedData) {
      if (this.organisedData.hasOwnProperty(prop)) {
        this.filteredOrganisedSets[prop as keyof OrganisedSets] = this.organisedData[prop as keyof OrganisedSets].filter((item: PokemonSearchedSet) =>
          item.name.toLowerCase().replace(' ', '').includes(text.toLowerCase().replace(' ', ''))
        );

        if (this.filteredOrganisedSets[prop as keyof OrganisedSets].length > 0) {
          allPropsEmpty = false;
        }
      }
    }

    this.notFound = allPropsEmpty;
  }

  verDetalhes(id: string) {
    this.router.navigate(['/sets', id]);
  }

  getFilterTextFromApi(text?: string) {
    return this.pokeApi.filterData(text);
  }
}
