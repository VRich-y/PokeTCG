import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { PokemonCard, PokemonCardInfo, PokemonSet } from '../shared/models/pokemon-card';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http: HttpClient) {
    this.getSets();
  }

  cardsBaseUrl: string = 'https://api.pokemontcg.io/v2/cards';
  apiKey: string = '71b57046-effb-4fba-8b78-b44071826b98';

  headers = new HttpHeaders({
    'X-Api-Key': this.apiKey
  })

  filterText: string;

  filterData(text?: string) {
    if (text != null) {
      this.filterText = text;
    }
    return this.filterText;
  }

  private setsSubject = new BehaviorSubject<any>(null);
  public sets$ = this.setsSubject.asObservable();

  private getSets() {
    const url: string = 'https://api.pokemontcg.io/v2/sets';
    this.http.get<PokemonSet>(url, { headers: this.headers }).pipe(
      tap(data => this.setsSubject.next(data))
    ).subscribe();
  }

  public exportSets(): Observable<PokemonSet> {
    return this.sets$;
  }

  getCardsInfo(aditional: string): Observable<PokemonCardInfo> {
    return this.http.get<PokemonCardInfo>(`${this.cardsBaseUrl}/${aditional}`, { headers: this.headers })
  }

  getCards(pageNumber: number, pageSize: number, setId?: string): Observable<PokemonCard> {
    let url = this.cardsBaseUrl;
    if (setId) {
      url += `?q=set.id:${setId}&page=${pageNumber}&pageSize=${pageSize}`;
    } else {
      url += `?page=${pageNumber}&pageSize=${pageSize}`;
    }
    return this.http.get<PokemonCard>(url, { headers: this.headers })
  }

  searchCards(name: string, searchBy: string, pageNumber: number, pageSize: number, setId?: string): Observable<PokemonCard> {
    let url = this.cardsBaseUrl;

    if (searchBy === 'set') {
      url += `?q=set.id:*${setId}*+name:*${name}*&page=${pageNumber}&pageSize=${pageSize}`;
    } else if (searchBy === 'card') {
      url += `?q=name:*${name}*&page=${pageNumber}&pageSize=${pageSize}`
    }
    return this.http.get<PokemonCard>(url, { headers: this.headers })
  }
}