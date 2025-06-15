import mongoose, { Schema, Document } from 'mongoose';

export interface ITenant extends Document {
  name: string;
  domain?: string; // optional: for custom domains
  createdAt: Date;
  updatedAt: Date;
}

const TenantSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    domain: { type: String, unique: true, sparse: true }, // optional unique domain
  },
  { timestamps: true }
);

export default mongoose.model<ITenant>('Tenant', TenantSchema);
