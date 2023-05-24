import { modelOptions, prop, getModelForClass } from "@typegoose/typegoose";

//The @modelOptions decorator sets the schema options for the User class
@modelOptions({ schemaOptions: { timestamps: true } })

//The User class represents a user and defines its properties using the @prop decorator.
export class User {
  public _id?: string;

  // Define the name property with required validation
  @prop({ required: true })
  public name!: string;

  // Define the email property with required and unique validation ( validation rules )
  @prop({ required: true, unique: true })
  public email!: string;

  // Define the password property with required validation
  @prop({ required: true })
  public password!: string;

  // Define the isAdmin property with required validation
  @prop({ required: true, default: false })
  public isAdmin!: boolean;

  // Define the isSeller property with required validation
  @prop({ required: true, default: false })
  public isSeller!: boolean;
}

// Create a UserModel based on the User class
export const UserModel = getModelForClass(User);
