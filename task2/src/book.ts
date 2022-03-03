import { Item } from "./item";
import { Pages } from "./pages";

export class Book extends Item {

  constructor(title: string, author: string, pages: Pages) {
    super(title, author, pages);
  }

  public toString = (): string => `Book: ${this.getTitle} by ${this.getAuthor} with number of pages: ${this.pages.getNumberOfPages()}`

  public get getTitle() {
    return this.title;
  }

  public get getAuthor() {
    return this.author;
  }

  public set setTitle(title: string) {
    this.title = title;
  }

  public set setAuthor(author: string) {
    this.author = author;
  }
}