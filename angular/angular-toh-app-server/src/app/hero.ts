export class Hero {
  id: string;
  name: string;
  multilingual: boolean = false;
  translations: Hero[] = [];
  locale: string = "default";

  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }
}
