import { Page } from "./page";
import { Pages } from "./pages";

export class PagesFactory {
  public static build(config: Set<[number, string, string]>): Pages {
    const pages: Array<Page> = [];

    for(let pageData of config) {
      const [pageNumber, pageType, pageMaterial] = pageData;
      pages.push(new Page(pageNumber, pageType, pageMaterial))
    }

    return new Pages(pages);
  }
}