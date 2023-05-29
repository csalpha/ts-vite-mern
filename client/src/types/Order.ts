import { CartItem, ShippingAddress } from "./Cart";
import { User } from "./User";

// Define the shape of an Order object
export type Order = {
  _id: string; // Unique identifier for the order
  orderItems: CartItem[]; // Array of ordered items
  shippingAddress: ShippingAddress; // Shipping address for the order
  paymentMethod: string; // Payment method used for the order
  user: User; // User associated with the order
  createdAt: string; // Date and time when the order was created
  isPaid: boolean; // Indicates whether the order has been paid for
  paidAt: string; // Date and time when the order was paid
  isDelivered: boolean; // Indicates whether the order has been delivered
  deliveredAt: string; // Date and time when the order was delivered
  itemsPrice: number; // Total price of all items in the order
  shippingPrice: number; // Price for shipping the order
  taxPrice: number; // Tax amount for the order
  totalPrice: number; // Total price of the order (including items, shipping, and tax)
};
