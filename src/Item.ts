import { Comparable } from './Comparable';

let id = 0;

export abstract class Item implements Comparable<Item> {
  private id: number;

  private value: number;
  private name: string;
  private weight: number;

  constructor(name: string, value: number, weight: number) {
    this.name = name;
    this.value = value;
    this.weight = weight;
    id += 1;
    this.id = id;
  }

  public abstract use(): string;

  public compareTo(other: Item): number {
    if(other.value === this.value) {
      return this.name.toLocaleLowerCase() > other.name.toLocaleLowerCase() ? 1 : -1;
    }

    return this.value > other.value ? 1 : -1;
  }

  public toString(): string {
    return `${this.name} - Value: ${this.value}, Weight: ${this.weight.toFixed(2)}`;
  }


  static reset() {
    id = 0;
  }

  static get numberOfItems(): number {
    return id;
  }

  public get getId(): number {
    return this.id;
  }

  public get getName(): string {
    return this.name;
  }

  public get getWeigth(): number {
    return this.weight;
  }

  public get getValue(): number {
    return this.value;
  }

  public set setValue(newValue: number) {
    this.value = newValue;
  }

  public set setWeight(newWeight: number) {
    this.weight = newWeight;
  }

  public set setName(newName: string) {
    this.name = newName;
  }
}
