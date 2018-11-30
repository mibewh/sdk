import { Injectable } from "@angular/core";
// import * as Gitana from 'gitana';
declare var Gitana: any;

import * as gitanaCredentials from "../../gitana.json";
const credentials = (<any>gitanaCredentials).default;

import * as heroDefinitionModule from "../../hero-definition.json";
const heroDefinition = (<any>heroDefinitionModule).default;

import { Observable, Subject, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

import { Hero } from "./hero";
import { MessageService } from "./message.service";
import { httpInMemBackendServiceFactory } from "angular-in-memory-web-api";

@Injectable({ providedIn: "root" })
export class CloudcmsHeroService {
  platform: any;
  appHelper: any;
  primaryDomain: any;
  stack: any;
  branch: any;
  project: any;
  applicationDomain: any;
  branchId: String = "master";
  connected: boolean = false;

  constructor(private messageService: MessageService) {}

  getConnection(): Promise<CloudcmsHeroService> {
    var self = this;

    console.log("Initializing Cloud CMS Connection " + JSON.stringify(credentials, null, 4));

    return new Promise(function(resolve, reject) {
      // Gitana.DEFAULT_LOCALE="es";
      Gitana.connect(credentials, function(err) {
          if (err) {
            reject(new Error("Could not connect to Cloud CMS " + err));
            return;
          }

          self.appHelper = this;
          self.platform = self.appHelper.platform();
          self.primaryDomain = self.platform.readPrimaryDomain();
          self.stack = self.appHelper.stack();
          self.project = self.appHelper.project();

          self.appHelper.datastore("content").trap(function(err) {
              reject(new Error("Failed to load datastore or branch from Cloud CMS " + err));
            }).readBranch(self.branchId).then(function() {
              self.branch = this;
              self.applicationDomain = self.appHelper.datastore("principals");
              self.connected = true;
              console.log('connected to project: "' + self.project.title + '" and branch: "' + self.branch.title + '"');

              self.branch.queryNodes({
                _type: heroDefinition._type,
                _qname: heroDefinition._qname
              }).then(function() {
                if (this.asArray().length === 0) {
                  // add the definition to the branch
                  self.branch.createNode(heroDefinition).then(function() {
                  // create a sample hero node on the branch
                  self.branch.createNode({
                      _type: "demo:hero",
                      title: "test hero 1"
                    }).then(function() {
                      resolve(self);
                      return;
                    });
                  });
                } else {
                  resolve(self);
                  return;
                }
              });
            });
        }
      );
    });
  }

  getHeroes(): Observable<Hero[]> {
    var self = this;

    console.log("getHeroes");

    let herosResult = new Subject<Hero[]>();
    this.getConnection().then(connection => {
      console.log('connected to project: "' + connection.project.title + '" and branch: "' + connection.branch.title + '"');

      connection.branch.queryNodes({
          _type: "demo:hero",
          "_features.f:translation": {
            "$exists": false
          }
        },{
          sort: { title: 1 }
        }).then(function() {
          let heroes: Array<Hero> = [];
          let result: Array<any> = this.asArray();
          for (var i = 0; i < result.length; i++) {
            heroes.push(new Hero(result[i].title || "NO NAME", result[i]._doc || "NO ID"));
          }

          herosResult.next(heroes);
        });
    });

    return herosResult.asObservable();
  }

  /** GET hero by id. Will 404 if id not found */
  getHero(id: string): Observable<Hero> {
    console.log("getHero");

    var self = this;

    let herosResult = new Subject<Hero>();
    this.getConnection().then(connection => {
      console.log('connected to project: "' + connection.project.title + '" and branch: "' + connection.branch.title + '"');

      connection.branch.readNode(id).then(function() {
        herosResult.next(new Hero(this.title || "NO NAME", this._doc || -1));
      });

    });

    return herosResult.asObservable();
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    var self = this;

    console.log("searchHeroes");

    let herosResult = new Subject<Hero[]>();
    this.getConnection().then(connection => {
      console.log('connected to project: "' + connection.project.title + '" and branch: "' + connection.branch.title + '"');

      connection.branch.searchNodes({
        search: {
          query_string: {
            query: term
          }
        }
      }).then(function() {
          let heroes: Array<Hero> = [];
          let result: Array<any> = this.asArray();
          for (var i = 0; i < result.length; i++) {
            if (result[i]._type === "demo:hero") {
              heroes.push(new Hero(result[i].title || "NO NAME", result[i]._doc || -1));
            }
          }

          herosResult.next(heroes);
        });
    });

    return herosResult.asObservable();
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addHero(hero: Hero): Observable<Hero> {
    console.log("addHero");

    var self = this;

    let heroResult = new Subject<Hero>();
    this.getConnection().then(connection => {
      console.log('connected to project: "' + connection.project.title + '" and branch: "' + connection.branch.title + '"');

      connection.branch.createNode({
          _type: "demo:hero",
          title: hero.name
        }).then(function() {
          heroResult.next(new Hero(this.title, this._doc));
        });
    });

    return heroResult.asObservable();
  }

  /** DELETE: delete the hero from the server */
  deleteHero(hero: Hero | number): Observable<Hero> {
    console.log("deleteHero");

    var self = this;
    const id = typeof hero === "number" ? hero : hero.id;

    let heroResult = new Subject<Hero>();
    this.getConnection().then(connection => {
      console.log('connected to project: "' + connection.project.title + '" and branch: "' + connection.branch.title + '"');

      connection.branch.queryOne({
          _type: "demo:hero",
          _doc: id
        }).then(function() {
          this.del().then(function() {
            heroResult.next(null);
          });
        });
    });

    return heroResult.asObservable();
  }

  /** PUT: update the hero on the server */
  updateHero(hero: Hero): Observable<any> {
    console.log("updateHero");

    var self = this;

    let heroResult = new Subject<Hero>();
    this.getConnection().then(connection => {
      console.log('connected to project: "' + connection.project.title + '" and branch: "' + connection.branch.title + '"');

      connection.branch.readNode(hero.id).then(function() {
        this.title = hero.name;
        this.update().then(function() {
          heroResult.next(hero);
        });
      });
    });

    return heroResult.asObservable();
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
