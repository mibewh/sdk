import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { HeroBook } from './herobook';

export interface response {
  heroesUrl: string;
  textfile: string;
}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class HeaderService {

  private searchURL = 'api/search';  // URL to web api
  booksObservable;
  response;

  constructor(
    private http: HttpClient) { }


  getHeroes () {
    this.booksObservable = this.http.get<response>(this.searchURL);
    return this.booksObservable;
  }

}
