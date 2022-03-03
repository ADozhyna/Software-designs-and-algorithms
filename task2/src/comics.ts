import { Item } from "./item";
import { Pages } from "./pages";

export class Comics extends Item {
  
  private artist: string;
  
  constructor(title: string, author: string, artist: string, pages: Pages) {
    super(title, author, pages);
    this.artist = artist;
  }

  public toString = (): string => `Comics: ${this.getTitle} by ${this.getAuthor}, the artist is ${this.getArtist}, number of pages: ${this.pages.getNumberOfPages()}`

  public get getTitle() {
    return this.title;
  }

  public get getAuthor() {
    return this.author;
  }

  public get getArtist() {
    return this.artist;
  }

  public set setTitle(title: string) {
    this.title = title;
  }

  public set setAuthor(author: string) {
    this.author = author;
  }

  public set setArtist(artist: string) {
    this.artist = artist;
  }

}

