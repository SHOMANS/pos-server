import { Schema, model, Document } from 'mongoose';
import { MODEL_NAMES } from '../constants/models';

export interface IUser extends Document {
  name: string;
  email: string;
  role: Schema.Types.ObjectId;
  tenant: Schema.Types.ObjectId;
  password: string;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    tenant: {
      type: Schema.Types.ObjectId,
      ref: MODEL_NAMES.TENANT,
      required: true,
    },
    password: { type: String, required: true, select: false },
    role: {
      type: Schema.Types.ObjectId,
      ref: MODEL_NAMES.ROLE,
      required: true,
    },
  },
  { timestamps: true }
);

export const User = model<IUser>(MODEL_NAMES.USER, userSchema);
