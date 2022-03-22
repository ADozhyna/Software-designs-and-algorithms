import { DoNotLeaveDecorator, FragileDecorator, ReturnDecorator, ShipementDecorator } from "./decorator";
import { Context, ShipmentFactory } from "./shipment";
import { ShipperFactory } from "./shipper";

export enum ShipmentMarks {
  Fragile = "Fragile",
  DoNotLeave = "DoNotLeave",
  ReturnReceipt = "ReturnReceipt"
}

export class Client {
  private static client: Client;
  private readonly shipperFactory = new ShipperFactory();
  private readonly shippingContext = new Context();
  private readonly shipmentFactory = new ShipmentFactory()

  public static getInstance() {
    if (!Client.client) {
      Client.client = new Client();
    }

    return Client.client;
  }

  public ship(toAddress: string, fromAddress: string, toZipCode: string, fromZipCode: string, weight: number, marks: Array<ShipmentMarks>) {
    this.shippingContext.setShipper(this.shipperFactory.getShipper(fromZipCode.charAt(0)));
    const shipment = this.shipmentFactory.getShipement(
      toAddress,
      fromAddress,
      toZipCode,
      fromZipCode,
      weight,
      this.shippingContext,
      marks
    )

    console.log(shipment.ship());
  }
}