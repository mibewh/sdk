import { Component, OnInit } from '@angular/core';

import { Bookcarousel } from '../bookcarousel';
import { BookcarouselService } from '../bookcarousel.service';

@Component({
  selector: 'app-bookcarousel',
  templateUrl: './bookcarousel.component.html'
})
export class BookCarouselComponent implements OnInit {

    books;

  constructor(private bookCarouselService: BookcarouselService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.bookCarouselService.getHeroes()
        .subscribe(books => {
                this.books = Object.values(books);
            }
        );
  }


}
