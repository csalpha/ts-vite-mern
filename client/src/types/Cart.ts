// Define a custom type for CartItem
export type CartItem = {
  image: string | undefined; // Image URL of the cart item
  slug: string; // Slug of the cart item
  quantity: number; // Quantity of the cart item
  countInStock: number; // Number of items in stock for the cart item
  price: number; // Price of the cart item
  _id: string; // Unique identifier of the cart item
  name: string; // Name of the cart item
};

// Define a custom type for ShippingAddress
export type ShippingAddress = {
  fullName: string; // Full name of the shipping address recipient
  address: string; // Address of the shipping address
  city: string; // City of the shipping address
  country: string; // Country of the shipping address
  postalCode: string; // Postal code of the shipping address
};

// Define a custom type for Cart
export type Cart = {
  cartItems: CartItem[]; // Array of cart items
  shippingAddress: ShippingAddress; // Shipping address for the cart
  paymentMethod: string; // Payment method for the cart
  itemsPrice: number; // Total price of all items in the cart
  shippingPrice: number; // Shipping price for the cart
  taxPrice: number; // Tax price for the cart
  totalPrice: number; // Total price of the cart (itemsPrice + shippingPrice + taxPrice)
};
