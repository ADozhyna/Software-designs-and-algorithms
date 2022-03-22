import { IShipment, Shipment } from "./shipment";

export class ShipementDecorator implements IShipment {
  protected wrappee: IShipment;

  constructor(shipement: IShipment) {
    this.wrappee = shipement;
  }

  public ship(): string {
    return this.wrappee.ship()
  }
}

export class FragileDecorator extends ShipementDecorator {
  public ship(): string {
    return `${this.wrappee.ship()}\n **MARK FRAGILE**`;
  }
}

export class DoNotLeaveDecorator extends ShipementDecorator {
  public ship(): string {
    return `${this.wrappee.ship()}\n **MARK DO NOT LEAVE IF ADDRESS NOT AT HOME**`;
  }
}

export class ReturnDecorator extends ShipementDecorator {
  public ship(): string {
    return `${this.wrappee.ship()}\n **MARK RETURN RECEIPT REQUESTED**`;
  }
}