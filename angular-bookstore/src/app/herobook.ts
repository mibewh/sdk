export class HeroBook {
    id: string;
    name: string;
    authorTitle: string;
    multilingual: boolean = false;
    imageUrl: string;
    locale: string = "default";

    constructor(name: string, id: string, authorTitle: string, imageUrl: string) {
        this.name = name;
        this.id = id;
        this.authorTitle = authorTitle;
        this.imageUrl = imageUrl;
    }
}
