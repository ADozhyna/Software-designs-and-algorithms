import {Comics} from "../src/comics";
import { PagesFactory } from "../src/pages-factory";

describe('Comics', () => {
  it('toString should return correct value', () => {
    let counter = 1;
    const comics = new Comics('Spider-Man', 'Stan Lee', 'some author', PagesFactory.build(new Set([
      [1, 'with images', 'glossy paper'],
      [2, 'with images', 'glossy paper']
    ])));

    for (const page of comics) {
      expect(page).toEqual(`Comics: Spider-Man by Stan Lee, the artist is some author, number of pages: 2, here is page with images #${counter} and it\'s material is glossy paper`);
      counter++;
    }
  });
});
