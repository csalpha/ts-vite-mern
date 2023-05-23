// Define a custom type for Product
export type Product = {
  _id: string;
  name: string; // The name of the product
  slug: string; // The slug (URL-friendly version) of the product name
  category: string; // The category to which the product belongs
  image: string; // The URL or path to the product image
  price: number; // The price of the product
  countInStock: number; // The number of items available in stock for the product
  brand: string; // The brand or manufacturer of the product
  rating: number; // The rating of the product (typically a number between 0 and 5)
  numReviews: number; // The number of reviews or ratings for the product
  description: string; // A description or details about the product
};

/* The Product type represents the structure  or shape of a product object. 
   It defines the properties that a product can have and their corresponding data types.
   By defining the Product type, you can ensure consistency in the structure and 
   data types of product objects used within your application.*/
