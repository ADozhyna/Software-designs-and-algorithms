import { Pages } from "./pages";
import { PagesIterable } from "./pages-iterable-mixin";

export abstract class Item extends PagesIterable {
  public pages: Pages;
  public title: string;
  public author: string;

  constructor(title: string, author: string, pages: Pages, ) {
    super(pages);
    this.pages = pages;
    this.title = title;
    this.author = author;
  }

  public abstract toString(): string;
}