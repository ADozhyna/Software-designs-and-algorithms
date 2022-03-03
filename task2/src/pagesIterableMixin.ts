import { Page } from "./page";
import { Pages } from "./pages";

export class PagesIterable {
  private pages: Array<Page>;

  constructor(pages: Array<Page>) {
    this.pages = pages;
  }

  *[Symbol.iterator]() {
    return {
      peges: this.pages,
      current: 0,
      next() {
        while (this.current < this.peges.length) {
          return { done: false, value: ``}
        }
      }
    }
      
   }
}