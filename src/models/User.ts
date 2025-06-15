import { Schema, model, Document } from 'mongoose';

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
    tenant: { type: Schema.Types.ObjectId, ref: 'Tenant', required: true },
    password: { type: String, required: true, select: false },
    role: { type: Schema.Types.ObjectId, ref: 'Role', required: true },
  },
  { timestamps: true }
);

export const User = model<IUser>('User', userSchema);
