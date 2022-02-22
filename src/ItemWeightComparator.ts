import { Item } from './Item';
import { ItemComparator } from './ItemComparator';

export class ItemWeightComparator implements ItemComparator {
  public compare(first: Item, second: Item) {
    if (first.getWeigth === second.getWeigth) {
      return first.compareTo(second);
    }

    return first.getWeigth > second.getWeigth ? 1 : -1;
  }
}
