import {
  modelOptions,
  prop,
  getModelForClass,
  Ref,
} from "@typegoose/typegoose";
import { Product } from "./productModel";
import { User } from "./userModel";

// This code defines TypeScript classes and a MongoDB

class ShippingAddress {
  @prop()
  public fullName?: string; // Full name of the shipping address
  @prop()
  public address?: string; // Address of the shipping address
  @prop()
  public city?: string; // City of the shipping address
  @prop()
  public postalCode?: string; // Postal code of the shipping address
  @prop()
  public country?: string; // Country of the shipping address
  @prop()
  public lat?: number; // Latitude coordinate of the shipping address
  @prop()
  public lng?: number; // Longitude coordinate of the shipping address
}

class Item {
  @prop({ required: true })
  public name!: string; // Name of the item
  @prop({ required: true })
  public quantity!: string; // Quantity of the item
  @prop({ required: true })
  public image!: number; // Image of the item
  @prop({ required: true })
  public price!: number; // Price of the item
  @prop({ ref: Product })
  public product?: Ref<Product>; // Reference to the associated product
}

class PaymentResult {
  @prop()
  public paymentId!: string; // Payment ID
  @prop()
  public status!: string; // Status of the payment
  @prop()
  public update_time!: string; // Update time of the payment
  @prop()
  public email_address!: string; // Email address associated with the payment
}

// Add options to the schema, in this case, enabling timestamps for createdAt and updatedAt fields
modelOptions({ schemaOptions: { timestamps: true } });

export class Order {
  public _id!: string; // Order ID
  @prop()
  public orderItems!: Item[]; // Array of order items
  @prop()
  public shippingAddress?: ShippingAddress; // Shipping address information

  @prop({ ref: User })
  public user?: Ref<User>; // Reference to the User model for the user associated with the order

  @prop({ required: true })
  public paymentMethod!: string; // Payment method used for the order

  @prop()
  public paymentResult?: PaymentResult; // Payment result information

  @prop({ required: true, default: 0 })
  public itemsPrice!: number; // Total price of the order items

  @prop({ required: true, default: 0 })
  public shippingPrice!: number; // Shipping price for the order

  @prop({ required: true, default: 0 })
  public taxPrice!: number; // Tax price for the order

  @prop({ required: true, default: 0 })
  public totalPrice!: number; // Total price of the order including items, shipping, and tax

  @prop({ required: true, default: false })
  public isPaid!: boolean; // Flag indicating if the order has been paid

  @prop()
  public paidAt!: Date; // Date and time when the order was paid

  @prop({ required: true, default: false })
  public isDelivered!: boolean; // Flag indicating if the order has been delivered

  @prop()
  public deliveredAt!: Date; // Date and time when the order was delivered
}

// Generate the Order model from the Order class using the getModelForClass function from @typegoose/typegoose
export const OrderModel = getModelForClass(Order);
