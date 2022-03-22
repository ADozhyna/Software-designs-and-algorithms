export interface IShipper {
  getCost(weight: number, type: packageType): number;
}

export enum packageType {
  Letter = 'LETTER',
  Package = 'PACKAGE',
  Oversized = 'OVERSIZED'
}

export abstract class Shipper implements IShipper {
  
  public abstract getCost(weight: number, type: packageType): number;
}

export class AirEastShipper extends Shipper {
  protected readonly additionalCostForOversized = 10;
  protected readonly costsMap = new Map([
    [packageType.Letter, 39],
    [packageType.Package, 25],
    [packageType.Oversized, 25]
  ]);

  constructor() {
      super();
  }

  public getCost(weight: number, type: packageType): number {
    return type === packageType.Oversized
      ? (weight * this.costsMap.get(type)!) / 100 + this.additionalCostForOversized : weight * this.costsMap.get(type)! / 100;
  }
}

export class ChicagoSprintShipper extends Shipper {
  protected readonly costsMap = new Map([
    [packageType.Letter, 42],
    [packageType.Package, 20],
    [packageType.Oversized, 20]
  ]);

  constructor() {
    super();
  }

  public getCost(weight: number, type: packageType): number {
    return weight * this.costsMap.get(type)! / 100;
  }
}

export class PacificParcelShipper extends Shipper {
  protected readonly additionalCostForOversized = 0.2;
  protected readonly costsMap = new Map([
    [packageType.Letter, 51],
    [packageType.Package, 19],
    [packageType.Oversized, 19 + this.additionalCostForOversized]
  ]);

  constructor() {
    super();
  }

  public getCost(weight: number, type: packageType): number {
    return weight * this.costsMap.get(type)! / 100;
  }
}

export class ShipperFactory {
  public getShipper(code?: string): Shipper {
    switch(code) {
      case '1':
      case'2':
      case '3':
        return new AirEastShipper();
      case '4':
      case '5':
      case'6':
        return new ChicagoSprintShipper();
      case '7':
      case '8':
      case '9':
        return new PacificParcelShipper();
      default:
        return new AirEastShipper();   
    }
  }
}
