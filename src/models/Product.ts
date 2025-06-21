import { Schema, model, Document, Types } from 'mongoose';
import { MODEL_NAMES } from '../constants/models';

export interface IProduct extends Document {
  code: string;
  name: string;
  price: number;
  description?: string;
  quantity: number;
  categories: Types.ObjectId[]; // Array of category IDs
  createdAt: Date;
  updatedAt: Date;
  tenant: Types.ObjectId; // Reference to the tenant
}

const productSchema = new Schema<IProduct>(
  {
    code: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    quantity: { type: Number, default: 0 },
    tenant: {
      type: Schema.Types.ObjectId,
      ref: MODEL_NAMES.TENANT,
      required: true,
      select: false,
    },
    categories: {
      type: [{ type: Schema.Types.ObjectId, ref: MODEL_NAMES.CATEGORY }],
      default: [],
    },
  },
  { timestamps: true }
);

// ✅ Add compound unique index: code + tenant
productSchema.index({ code: 1, tenant: 1 }, { unique: true });

export const PRODUCT_MODEL_NAME = 'Product';

export const Product = model<IProduct>(PRODUCT_MODEL_NAME, productSchema);
