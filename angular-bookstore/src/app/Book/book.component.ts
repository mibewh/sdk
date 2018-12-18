import { Component, OnInit } from '@angular/core';

import { Bookcarousel } from '../bookcarousel';
import { BookcarouselService } from '../bookcarousel.service';
import {ActivatedRoute} from "@angular/router";
import {BookService} from "../book.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html'
})
export class BookComponent implements OnInit {

    book;

    constructor(
                private route: ActivatedRoute,
                private bookService: BookService,
                private location: Location) {
    }

    ngOnInit() {
        this.getBook();
    }

    getBook(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.bookService.getHero(id)
            .subscribe(book => {
                    this.book = Object.values(book);
                }
            );
    }
}
