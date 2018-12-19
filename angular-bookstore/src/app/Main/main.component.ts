import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
//
// import { HeroBook } from './Herobook/herobook';
// import { BookList } from './Book/booklist';
// import { AuthorList } from './Author/authorlist';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: [ './main.component.css' ]
})
export class MainComponent implements OnInit {
    heroes: Hero[] = [];

    constructor(private heroService: HeroService) { }

    ngOnInit() {
        this.getHeroes();
    }

    getHeroes(): void {
        this.heroService.getHeroes()
            .subscribe(heroes => this.heroes = heroes.slice(0, 5));
    }

}
