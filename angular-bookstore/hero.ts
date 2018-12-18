export class Hero {
  id: string;
  name: string;
  authorTitle: string;
  multilingual: boolean = false;
  translations: Hero[] = [];
  locale: string = "default";

  constructor(name: string, id: string, authorTitle: string) {
    this.name = name;
    this.id = id;
    this.authorTitle = authorTitle;
  }
}
