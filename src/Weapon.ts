import { Item } from './Item';

export abstract class Weapon extends Item {
  public readonly MODIFIER_CHANGE_RATE: number = 0.05;
  private baseDamage: number;
  private damageModifier: number = 0;
  private baseDurability: number;
  private durabilityModifier: number = 0;

  constructor(name: string, baseDamage: number, baseDurability: number, value: number, weight: number) {
    super(name, value, weight);
    this.baseDamage = baseDamage;
    this.baseDurability = baseDurability;
  }

  public abstract polish(): void;

  public getDamage(): number {
    return this.baseDamage + this.damageModifier;
  }

  public getDurability(): number {
    return this.baseDurability + this.durabilityModifier;
  }

  public toString(): string {
    return `${this.getName} - Value: ${this.getValue}, Weight: ${this.getWeigth.toFixed(2)}, Damage: ${this.getDamage()}, Durability: ${(this.getDurability() * 100).toFixed(2)}%"`;
  }

  public use(): string {
    if (this.getDamage() <= 0) {
      return `You can't use the ${this.getName}, it is broken.`
    } else {
      this.damageModifier = this.damageModifier - this.MODIFIER_CHANGE_RATE;
      return this.getDamage() <= 0 
        ? `You use the ${this.getName}, dealing ${this.getDamage().toFixed(2)} points of damage. The hammer breaks.`
        : `You use the ${this.getName}, dealing ${this.getDamage().toFixed(2)} points of damage.`
    }
  }

  public get getBaseDamage(): number {
    return this.baseDamage
  }

  public set setBaseDamage(damage: number) {
    this.baseDamage = damage;
  }

  public get getBaseDurability(): number {
    return this.baseDurability;
  }

  public set setBaseDurability(durability: number) {
    this.baseDurability = durability;
  }

  public get getDamageModifier(): number {
    return this.damageModifier;
  }

  public set setDamageModifier(value: number) {
    this.damageModifier = value;
  }

  public get getDurabilityModifier(): number {
    return this.durabilityModifier;
  }

  public set setDurabilityModifier(value: number) {
    this.durabilityModifier = value;
  }

}
