import { Component, OnInit } from '@angular/core';

import { Book } from '../book';
import { BookService } from '../book.service';

@Component({
    selector: 'app-herobook',
    templateUrl: './herobook.component.html'
})
export class HeroBookComponent implements OnInit {

    book;

    constructor(private bookService: BookService) { }

    ngOnInit() {
        this.getBooks();
    }

    getBooks(): void {
        this.bookService.getBooks()
            .subscribe(books => {
                    this.book = Object.values(books)[0];
                }
            );
    }

}
