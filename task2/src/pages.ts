import { Page } from "./page";

export class Pages {
  public pages: Array<Page>;

  constructor(pages: Array<Page>) {
    this.pages = pages
  }

  public getNumberOfPages() {
    return this.pages.length;
  }

  public getPage(index: number): string {
    return this.pages[index].toString()
  }
}