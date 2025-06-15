import { Schema, model, Document } from 'mongoose';

export interface ICustomer extends Document {
  name: string;
  phone: string;
  email?: string;
  tenant: Schema.Types.ObjectId; // Reference to the tenant
}

const customerSchema = new Schema<ICustomer>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    tenant: { type: Schema.Types.ObjectId, ref: 'Tenant', required: true },
  },
  { timestamps: true }
);

export const Customer = model<ICustomer>('Customer', customerSchema);
