import { Schema, model, Document, Types } from 'mongoose';
import { MODEL_NAMES } from '../constants/models';

export interface ICategory extends Document {
  name: string;
  description?: string;
  parent?: Types.ObjectId; // Reference to parent category (optional)
  createdAt: Date;
  updatedAt: Date;
  tenant: Types.ObjectId; // Reference to the tenant
}

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    parent: {
      type: Schema.Types.ObjectId,
      ref: MODEL_NAMES.CATEGORY,
      default: null,
    },
    tenant: {
      type: Schema.Types.ObjectId,
      ref: MODEL_NAMES.TENANT,
      required: true,
    },
  },
  { timestamps: true }
);

export const Category = model<ICategory>(MODEL_NAMES.CATEGORY, categorySchema);
