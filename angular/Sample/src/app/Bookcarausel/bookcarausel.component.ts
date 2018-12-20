import { Component, OnInit } from '@angular/core';

import { Book } from '../book';
import { BookService } from '../book.service';

@Component({
    selector: 'app-bookcarausel',
    templateUrl: './bookcarausel.component.html'
})
export class BookcarauselComponent implements OnInit {

    books;

    constructor(private bookService: BookService) { }

    ngOnInit() {
        this.getBooks();
    }

    getBooks(): void {
        this.bookService.getBooks()
            .subscribe(books => {
                    this.books = Object.values(books);
                    this.books = this.books.slice(0, Math.min(4, this.books.length));
                }
            );
    }

}
