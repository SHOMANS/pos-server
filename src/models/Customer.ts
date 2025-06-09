import { Schema, model, Document } from 'mongoose';

export interface ICustomer extends Document {
  name: string;
  phone: string;
  email?: string;
}

const customerSchema = new Schema<ICustomer>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
  },
  { timestamps: true }
);

export const Customer = model<ICustomer>('Customer', customerSchema);
