import { Schema, model, Document, Types } from 'mongoose';

export interface IProduct extends Document {
  code: string;
  name: string;
  price: number;
  description?: string;
  quantity: number;
  categories: Types.ObjectId[]; // Array of category IDs
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    quantity: { type: Number, default: 0 },
    categories: [
      { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    ],
  },
  { timestamps: true }
);

export const Product = model<IProduct>('Product', productSchema);
