import bcrypt from "bcryptjs";
import { User } from "./models/userModel";
import { Product } from "./models/productModel";
// // import { Product } from "./types/Product";

/*   The products array contains a list of product objects, each representing a different product. 
Each object has properties such as name, slug, category, image, price, countInStock, brand, rating, 
numReviews, and description, which provide information about the specific product.                 */

// Define an array of products
export const products: Product[] = [
  {
    name: "PS5 Digital Edition", // Name of the product
    slug: "ps5-digital-edition", // Slug for the product URL
    category: "Consoles", // Category of the product
    image: "/images/ps5-digital-edition.png", // URL to the product image
    price: 399, // Price of the product
    countInStock: 50, // Number of items in stock
    brand: "Sony", // Brand of the product
    rating: 4.9, // Rating of the product
    numReviews: 10, // Number of reviews for the product
    description: "high quality product", // Description of the product
  },
  {
    name: "PS5 Standard Edition",
    slug: "ps5-standard-edition",
    category: "Consoles",
    image: "/images/ps5-standard-edition.png",
    price: 499,
    countInStock: 50,
    brand: "Sony",
    rating: 4.9,
    numReviews: 10,
    description: "high quality product",
  },
  {
    name: "Xbox Series X",
    slug: "xbox-series-x",
    category: "Consoles",
    image: "/images/xbox-series-x.png",
    price: 499,
    countInStock: 50,
    brand: "Microsoft",
    rating: 4.8,
    numReviews: 5,
    description: "high quality product",
  },
  {
    name: "Xbox Series S",
    slug: "xbox-series-s",
    category: "Consoles",
    image: "/images/xbox-series-s.png",
    price: 399,
    countInStock: 50,
    brand: "Microsoft",
    rating: 4.7,
    numReviews: 10,
    description: "high quality product",
  },
  {
    name: "Nintendo Switch",
    slug: "nintendo-switch",
    category: "Consoles",
    image: "/images/nintendo-switch.png",
    price: 299,
    countInStock: 50,
    brand: "Nintendo",
    rating: 4.8,
    numReviews: 5,
    description: "high quality product",
  },
];

export const users: User[] = [
  {
    name: "Carlos",
    email: "carlos@mail.com",
    password: bcrypt.hashSync("1234", 8),
    isAdmin: true,
    isSeller: true,
  },
  {
    name: "Ana",
    email: "ana@mail.com",
    password: bcrypt.hashSync("1234", 8),
    isAdmin: false,
    isSeller: true,
  },
  {
    name: "Joana",
    email: "joana@mail.com",
    password: bcrypt.hashSync("1234", 8),
    isAdmin: false,
    isSeller: true,
  },
  {
    name: "Sofia",
    email: "sofia@mail.com",
    password: bcrypt.hashSync("1234", 8),
    isAdmin: false,
    isSeller: false,
  },
];
