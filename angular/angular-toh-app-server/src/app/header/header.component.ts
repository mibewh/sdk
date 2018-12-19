import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";
import {Observable, Subject} from "rxjs/index";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.css' ]
})
export class HeaderComponent implements OnInit {
  heroes: Hero[] = [];
    heroes$: Observable<Hero[]>;
    private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

    search(term: string): void {
      console.log("term",term);
        this.searchTerms.next(term);
    }

    // ngOnInit(): void {
    //     this.heroes$ = this.searchTerms.pipe(
    //
    //         // wait 300ms after each keystroke before considering the term
    //         debounceTime(300),
    //
    //         // ignore new term if same as previous term
    //         distinctUntilChanged(),
    //
    //         // switch to new search observable each time the term changes
    //         switchMap((term: string) => this.heroService.searchHeroes(term)),
    //     );
    // }
}
