/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-namespace */

// Extend the Express Request interface to include additional properties
declare namespace Express {
  export interface Request {
    // Define the 'user' property in the Request interface
    user: {
      _id: string;
      name: string;
      email: string;
      isAdmin: boolean;
      isSeller: boolean;
      token: string;
    };
  }
}
