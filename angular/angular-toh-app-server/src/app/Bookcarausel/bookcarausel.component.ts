import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
    selector: 'app-bookcarausel',
    templateUrl: './bookcarausel.component.html'
})
export class BookcarauselComponent implements OnInit {

    books;

    constructor(private heroService: HeroService) { }

    ngOnInit() {
        this.getAuthors();
    }

    getAuthors(): void {
        this.heroService.getBooks()
            .subscribe(books => {
                console.log("this.book", Object.values(books));
                    this.books = Object.values(books);
                }
            );
    }

}
