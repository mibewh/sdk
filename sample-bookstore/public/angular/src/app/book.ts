export class Book {
    id: string;
    name: string;
    multilingual: boolean = false;
    translations: Book[] = [];
    locale: string = "default";
  
    constructor(name: string, id: string) {
      this.name = name;
      this.id = id;
    }
  }
  