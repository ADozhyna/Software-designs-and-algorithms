import { Client, ShipmentMarks } from './client';

const client = Client.getInstance();

client.ship(
  '3250 Mae Ave NE',
  '330 Kendrick Ave SE',
  '123456',
  '101112',
  200,
  [ShipmentMarks.Fragile, ShipmentMarks.DoNotLeave, ShipmentMarks.ReturnReceipt]
);