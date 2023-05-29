// Define the shape of a User object
export type User = {
  _id: string; // Unique identifier for the user
  name: string; // Name of the user
  email: string; // Email address of the user
  token: string; // Token used for authentication
  isAdmin: boolean; // Indicates whether the user is an admin
  isSeller: boolean; // Indicates whether the user is a seller
};
