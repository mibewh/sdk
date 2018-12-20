import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { BookService } from '../book.service';
import { Location } from '@angular/common';
import {Observable, Subject} from "rxjs/index";

import {
    debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.css' ]
})
export class HeaderComponent implements OnInit {
    books: Book[] = [];
    results;
    books$: Observable<Book[]>;
    private searchTerms = new Subject<string>();

  constructor(private bookService: BookService,
              private location: Location) { }

    search(term: string): void {
        this.searchTerms.next(term);
    }

    clicked(term: string): void {
        this.bookService.getSearchResults(term)
            .subscribe(results => {
                    this.results = Object.values(results);
                }
            );
    }

    ngOnInit(): void {
        this.books$ = this.searchTerms.pipe(

            // wait 300ms after each keystroke before considering the term
            debounceTime(300),

            // ignore new term if same as previous term
            distinctUntilChanged(),

            // switch to new search observable each time the term changes
            switchMap((term: string) => this.bookService.getSearchResults(term)),
        );

    }
}
