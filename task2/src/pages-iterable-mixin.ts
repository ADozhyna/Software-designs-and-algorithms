import { Pages } from "./pages"

export class PagesIterable {
  public pages: Pages;
  
  constructor(pages: Pages) {
    this.pages = pages;
  }
  
  [Symbol.iterator]() {
    return {
      current: 0,
      pages: this.pages,
      toString: this.toString,

      next() {
        if (this.current < this.pages.getNumberOfPages()) {
          return { done: false, value: `${this.toString()}, ${this.pages.getPage(this.current++)}`};
        } else {
            return { done: true }
        }
      }
    }
  }
}