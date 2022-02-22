import { Weapon } from './Weapon';

export class Bow extends Weapon {
  constructor(baseDamage: number, baseDurability: number, value: number, weight: number) {
    super('bow', baseDamage, baseDurability, value, weight);
  }

  public polish() {
    const maximumModifierValue = this.getBaseDurability * 0.25;
    if (maximumModifierValue <= this.getDurabilityModifier) {
      return;
    }

    this.setDurabilityModifier = this.getDurabilityModifier + this.MODIFIER_CHANGE_RATE;
  }
}