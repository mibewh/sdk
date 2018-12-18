import { Component, OnInit } from '@angular/core';

import { HeroBook } from '../herobook';
import { HeroBookService } from '../herobook.service';

@Component({
  selector: 'app-herobook',
  templateUrl: './herobook.component.html'
})
export class HeroBookComponent implements OnInit {

    book;

  constructor(private heroBookService: HeroBookService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroBookService.getHeroes()
        .subscribe(heroes => {
                this.book = Object.values(heroes)[0];
            }
        );
  }

}
