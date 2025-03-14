// src/app/models/inventory-item.model.ts
export interface InventoryItem {
  inventoryId: number;
  inventoryName: string;
  quantity: number;
  price: number;
  expirationDate: Date;
}
