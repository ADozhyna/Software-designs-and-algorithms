import { Weapon } from './Weapon';

export class Sword extends Weapon {
  constructor(baseDamage: number, baseDurability: number, value: number, weight: number) {
    super('sword', baseDamage, baseDurability, value, weight);
  }

  public polish() {
    const maximumModifierValue = this.getBaseDamage * 0.25;
    if (maximumModifierValue <= this.getDamageModifier) {
      return;
    }

    this.setDamageModifier = this.getDamageModifier + this.MODIFIER_CHANGE_RATE;
  }
}
