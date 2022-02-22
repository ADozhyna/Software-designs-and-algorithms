import { Item } from './Item';
import { ItemComparator } from './ItemComparator';

export class Inventory {
  private items: Array<Item> = [];

  public sort(): void
  public sort(comparator: ItemComparator): void 
  
  public sort(comparator?: ItemComparator){
    if (comparator) {
       this.items.sort(comparator.compare)
    } else {
      this.items.sort((x: Item, y: Item) => {
        if (x.getValue < y.getValue) {
          return -1;
        }
        if (x.getValue > y.getValue) {
          return 1;
        }
        return 0;
      })
    }
  }

  public addItem(item: Item) {
    this.items.push(item);
  }

  public toString() {
    return this.items.join(",");
  }
  
}