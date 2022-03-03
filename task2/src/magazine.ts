import { Item } from "./item";
import { Pages } from "./pages";

export class Magazine extends Item {
  constructor(title: string, author: string, pages: Pages) {
    super(title, "", pages)
  }

  public toString = (): string => `Magazine: ${this.getTitle} with number of pages: ${this.pages.getNumberOfPages()}`

  public get getTitle() {
    return this.title;
  }

  public set setTitle(title: string) {
    this.title = title;
  }
}