import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from './book';
import { MessageService } from './message.service';

export interface response {
    heroesUrl: string;
    textfile: string;
}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class HeroService {

  private booksUrl = 'api/books';  // URL to web api
    booksObservable;
    bookResponse;
    response;

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }


    getHeroes () {
        this.booksObservable = this.http.get<response>(this.booksUrl);
        return this.booksObservable;
    }


    /** GET hero by id. Return `undefined` when id not found */
  getHeroNo404<Data>(id: string): Observable<Hero> {
    const url = `${this.booksUrl}/?id=${id}`;
    return this.http.get<Hero[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

    get () {
        this.booksObservable = this.http.get<response>(this.booksUrl);
        return this.booksObservable;
    }

    /** GET hero by id. Will 404 if id not found */
  getHero(id: string) {
      console.log("{this.booksUrl}/${id}", this.booksUrl, id);
      const url = `${this.booksUrl}/${id}`;
      console.log("url",url);
      this.bookResponse = this.http.get<response>(url);
      console.log("this.bookResponse", this.bookResponse);
      return this.bookResponse;
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.booksUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
