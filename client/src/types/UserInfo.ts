// represents the structure of user information
export type UserInfo = {
  name: string; // Represents the name of the user
  email: string; // Represents the email address of the user
  token: string; // Represents the authentication token associated with the user
  isAdmin: boolean; // Indicates whether the user has admin privileges (true or false)
  isSeller: boolean; // Indicates whether the user is a seller (true or false)
};
