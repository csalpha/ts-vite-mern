import { modelOptions, prop, getModelForClass } from "@typegoose/typegoose";

//The @modelOptions decorator sets the schema options for the Product class
@modelOptions({
  schemaOptions: { timestamps: true }, // enabling timestamps for created and updated timestamps.
})

//The Product class represents a product and defines its properties using the @prop decorator.
export class Product {
  public _id!: string;

  // Define the name property with required validation
  @prop({ required: true })
  public name!: string;

  // Define the slug property with required and unique validation ( validation rules )
  @prop({ required: true, unique: true })
  public slug!: string;

  // Define the image property with required validation
  @prop({ required: true })
  public image!: string;

  // Define the brand property with required validation
  @prop({ required: true })
  public brand!: string;

  // Define the category property with required validation
  @prop({ required: true })
  public category!: string;

  // Define the description property with required validation
  @prop({ required: true })
  public description!: string;

  // Define the price property with required validation and a default value of 0
  @prop({ required: true, default: 0 })
  public price!: number;

  // Define the countInStock property with required validation and a default value of 0
  @prop({ required: true, default: 0 })
  public countInStock!: number;

  // Define the rating property with required validation and a default value of 0
  @prop({ required: true, default: 0 })
  public rating!: number;

  // Define the numReviews property with required validation and a default value of 0
  @prop({ required: true, default: 0 })
  public numReviews!: number;
}

// Create the ProductModel using the Product class
export const ProductModel = getModelForClass(Product);
