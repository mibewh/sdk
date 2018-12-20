export class Hero {
  id: string;
  name: string;
  testimonial:string;
  multilingual: boolean = false;
  translations: Hero[] = [];
  locale: string = "default";

  constructor(name: string, id: string, testimonial:string) {
    this.name = name;
    this.id = id;
    this.testimonial = testimonial;
  }

}
