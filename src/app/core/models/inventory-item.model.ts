// src/app/models/inventory-item.model.ts
export interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  expirationDate: Date;
}
