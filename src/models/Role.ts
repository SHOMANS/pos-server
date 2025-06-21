import mongoose, { Schema, Document } from 'mongoose';
import { MODEL_NAMES } from '../constants/models';
import { ROLE_NAMES } from '../constants/roles';

export interface IRole extends Document {
  name: ROLE_NAMES.ADMIN | ROLE_NAMES.MANAGER | ROLE_NAMES.CASHIER;
  tenant: mongoose.Types.ObjectId;
  permissions: string[];
  createdAt: Date;
  updatedAt: Date;
}

const RoleSchema: Schema = new Schema(
  {
    name: {
      type: String,
      enum: [ROLE_NAMES.ADMIN, ROLE_NAMES.MANAGER, ROLE_NAMES.CASHIER],
      required: true,
    },
    tenant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: MODEL_NAMES.TENANT,
      required: true,
    },
    permissions: [{ type: String, required: true }],
  },
  { timestamps: true }
);

export default mongoose.model<IRole>(MODEL_NAMES.ROLE, RoleSchema);
