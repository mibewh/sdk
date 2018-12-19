import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
    selector: 'app-authorlist',
    templateUrl: './authorlist.component.html'
})
export class AuthorlistComponent implements OnInit {

    authors;

    constructor(private heroService: HeroService) { }

    ngOnInit() {
        this.getAuthors();
    }

    getAuthors(): void {
        this.heroService.getAuthors()
            .subscribe(authors => {
                console.log("this.book", Object.values(authors));
                    this.authors = Object.values(authors);
                }
            );
    }

}
