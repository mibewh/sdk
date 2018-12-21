import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { Location } from '@angular/common';

import {
    debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Book } from '../book';
import { BookService } from '../book.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
    heroes$: Observable<Book[]>;
    results;
    tags;
    private searchTerms = new Subject<string>();

    constructor(private bookService: BookService,
                private location: Location) {}

    // Push a search term into the observable stream.
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

    getTags() {
        this.bookService.getTags()
            .subscribe(tags => {
            this.tags = Object.values(tags);
        });
    }

    ngOnInit(): void {
        this.getTags();

        this.heroes$ = this.searchTerms.pipe(


            // wait 300ms after each keystroke before considering the term
            debounceTime(300),

            // ignore new term if same as previous term
            distinctUntilChanged(),

            // switch to new search observable each time the term changes
            switchMap((term: string) => this.bookService.getSearchResults(term)),
        );
    }
}
