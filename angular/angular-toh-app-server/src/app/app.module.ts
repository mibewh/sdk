import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { AppRoutingModule }     from './app-routing.module';

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { MainComponent }   from './Main/main.component';
import { HeroBookComponent }   from './Herobook/herobook.component';
import { HeaderComponent }   from './header/header.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';
import { HeroesComponent }      from './heroes/heroes.component';
import { HeroSearchComponent }  from './hero-search/hero-search.component';
import { MessagesComponent }    from './messages/messages.component';
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
    DashboardComponent,
    HeroesComponent,
    HeroDetailComponent,
    HeaderComponent,
    MessagesComponent,
    HeroSearchComponent,
      MainComponent,
      HeroBookComponent,
      AuthorlistComponent,
      BookcarauselComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
