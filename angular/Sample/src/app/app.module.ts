import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { AppRoutingModule }     from './app-routing.module';

import { AppComponent }         from './app.component';
import { MainComponent }   from './Main/main.component';
import { HeroBookComponent }   from './Herobook/herobook.component';
import { HeaderComponent }   from './Header/header.component';
import {BookDetailComponent} from './Bookdetail/book-detail.component';
import {SearchComponent} from './Search/search.component';
import {AuthorlistComponent} from "./Authorlist/authorlist.component";
import {BookcarauselComponent} from "./Bookcarausel/bookcarausel.component";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
      BookDetailComponent,
    HeaderComponent,
      MainComponent,
      HeroBookComponent,
      AuthorlistComponent,
      BookcarauselComponent,
      SearchComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
