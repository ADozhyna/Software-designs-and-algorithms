import uniqid from 'uniqid';
import { ShipmentMarks } from './client';
import { DoNotLeaveDecorator, FragileDecorator, ReturnDecorator } from './decorator';
import { packageType, Shipper } from './shipper';

export interface IShipment {
  ship(): string;
}

export abstract class Shipment implements IShipment {
  private shipmentID: string = '';
  public abstract type: packageType;

  constructor(
    private toAddress: string,
    private fromAddress: string,
    private toZipCode: string,
    private fromZipCode: string,
    private weight: number,
    private readonly context: Context
  ) {
    this.shipmentID = this.getShipmentID();
  }

  private getShipmentID(): string {
    return uniqid();
  }

  private getCost(): number {
    return this.context.getCost(this.weight, this.type);
  }

  public ship() {
    return `The shipment ${this.shipmentID} was shipped from ${this.fromAddress}/${this.fromZipCode} to ${this.toAddress}/${this.toZipCode}.\n Shipment cost is ${this.getCost()}`
  }

}

export class Context {
  protected shipper!: Shipper;

  public setShipper(s: Shipper) {
    this.shipper = s;
  }
  
  public getCost(a: number, type: packageType) {
    return this.shipper.getCost(a, type);
  }
}

export class Letter extends Shipment {
  public readonly type = packageType.Letter

  constructor(
    toAddress: string,
    fromAddress: string,
    toZipCode: string,
    fromZipCode: string,
    weight: number,
    context: Context
  ) {
    super(toAddress, fromAddress, toZipCode, fromZipCode, weight, context)
  }
}

export class Package extends Shipment {
  public readonly type = packageType.Package

  constructor(
    toAddress: string,
    fromAddress: string,
    toZipCode: string,
    fromZipCode: string,
    weight: number,
    context: Context
  ) {
    super(toAddress, fromAddress, toZipCode, fromZipCode, weight, context)
  }
}

export class Oversized extends Shipment {
  public readonly type = packageType.Oversized;

  constructor(
    toAddress: string,
    fromAddress: string,
    toZipCode: string,
    fromZipCode: string,
    weight: number,
    context: Context
  ) {
    super(toAddress, fromAddress, toZipCode, fromZipCode, weight, context)
  }
}

export class ShipmentFactory {
  private readonly maxLetterWeight = 15;
  private readonly maxPackageWeight = 160;

  public getShipement(toAddress: string, fromAddress: string, toZipCode: string, fromZipCode: string, weight: number, context: Context, marks: Array<ShipmentMarks>) {
    const shipement = this.getShipementType(toAddress, fromAddress, toZipCode, fromZipCode, weight, context);

    return marks.length ? this.markShipement(shipement, marks) : shipement;
  }

  private getShipementType(toAddress: string, fromAddress: string, toZipCode: string, fromZipCode: string, weight: number, context: Context) {
    if (weight <= this.maxLetterWeight) {
      return new Letter(toAddress, fromAddress, toZipCode, fromZipCode, weight, context);
    }

    if (weight > this.maxPackageWeight) {
      return new Oversized(toAddress, fromAddress, toZipCode, fromZipCode, weight, context);
    }

    return new Package(toAddress, fromAddress, toZipCode, fromZipCode, weight, context);
  }

  private markShipement(shipement: IShipment, marks: Array<ShipmentMarks>) {
    return marks.reduce((acc, mark) => {
      switch(mark) {
        case ShipmentMarks.Fragile: 
          return new FragileDecorator(acc);
        case ShipmentMarks.DoNotLeave:
          return new DoNotLeaveDecorator(acc);
        case ShipmentMarks.ReturnReceipt:
          return new ReturnDecorator(acc);
        default:
          return acc
      }
    }, shipement)

  }
}