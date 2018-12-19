import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
    selector: 'app-herobook',
    templateUrl: './herobook.component.html'
})
export class HeroBookComponent implements OnInit {

    book;

    constructor(private heroService: HeroService) { }

    ngOnInit() {
        this.getHeroes();
    }

    getHeroes(): void {
        this.heroService.getHeroes()
            .subscribe(heroes => {
                console.log("this.book", Object.values(heroes)[0]);
                    this.book = Object.values(heroes)[0];
                }
            );
    }

}
