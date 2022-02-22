import { Item } from './Item';

export abstract class Consumable extends Item {
  private consumed: boolean = false;
  private spoiled: boolean;

  constructor(name: string, value: number, weight: number, spoiled: boolean) {
    super(name, value, weight);
    this.spoiled = spoiled;
  }

  public abstract eat(): string

  public use(): string {
    if (this.isConsumed()) {
      return `There is nothing left of the ${this.getName} to consume.`;
    }

    if (this.isSpoiled()) {
      return `${this.eat()}.\n You feel sick.`
    }

    return this.eat();
  }

  private isConsumed() {
    return this.consumed;
  }

  private isSpoiled() {
    return this.spoiled;
  }

  public set setConsumed(consumed: boolean) {
    this.consumed = consumed;
  }
}