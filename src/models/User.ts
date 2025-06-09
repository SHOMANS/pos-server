import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'cashier'; // Example roles
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: ['admin', 'manager', 'cashier'],
      default: 'cashier',
    },
  },
  { timestamps: true }
);

export const User = model<IUser>('User', userSchema);
