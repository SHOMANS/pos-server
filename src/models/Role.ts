import mongoose, { Schema, Document } from 'mongoose';

export interface IRole extends Document {
  name: 'admin' | 'manager' | 'cashier';
  tenant: mongoose.Types.ObjectId;
  permissions: string[];
  createdAt: Date;
  updatedAt: Date;
}

const RoleSchema: Schema = new Schema(
  {
    name: {
      type: String,
      enum: ['admin', 'manager', 'cashier'],
      required: true,
    },
    tenant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tenant',
      required: true,
    },
    permissions: [{ type: String, required: true }],
  },
  { timestamps: true }
);

export default mongoose.model<IRole>('Role', RoleSchema);
