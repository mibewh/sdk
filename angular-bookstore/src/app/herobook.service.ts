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
export class HeroBookService {

    private heroesUrl = 'api/books';  // URL to web api
    booksObservable;
    response;

    constructor(
        private http: HttpClient) { }


    getHeroes () {
        this.booksObservable = this.http.get<response>(this.heroesUrl);
        return this.booksObservable;
    }

}
