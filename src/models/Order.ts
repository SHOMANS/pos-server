import { Schema, model, Document, Types } from 'mongoose';
import { PRODUCT_MODEL_NAME } from './Product';
import { MODEL_NAMES } from '../constants/models';
import { PAYMENT_TYPES } from '../constants/orders';

interface IOrder extends Document {
  customer: Types.ObjectId; // Reference to Customer
  cashier: Types.ObjectId; // Reference to User

  products: {
    quantity: number;
    currentUnitPrice: number;
    discount?: number;
    subtotal: number;
  }[];

  subtotal: number;
  vat: number;
  discount?: number;
  total: number;
  paymentMethod: PAYMENT_TYPES;
  tenant: Types.ObjectId; // Reference to Tenant
}

const orderSchema = new Schema<IOrder>(
  {
    customer: { type: Schema.Types.ObjectId, ref: MODEL_NAMES.CUSTOMER },
    cashier: { type: Schema.Types.ObjectId, ref: MODEL_NAMES.USER },
    tenant: {
      type: Schema.Types.ObjectId,
      ref: MODEL_NAMES.TENANT,
      required: true,
    },

    products: [
      {
        _id: false, // Prevent creation of an additional _id field for each product
        productDetails: {
          type: Schema.Types.ObjectId,
          ref: PRODUCT_MODEL_NAME,
          required: true,
        },
        purchasedQuantity: { type: Number, required: true },
        currentUnitPrice: { type: Number, required: true },
        discount: { type: Number, default: 0 },
        subtotal: { type: Number, required: true },
      },
    ],
    subtotal: { type: Number, required: true },
    vat: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    total: { type: Number, required: true },
    paymentMethod: {
      type: String,
      enum: [PAYMENT_TYPES.CASH, PAYMENT_TYPES.CARD, PAYMENT_TYPES.TRANSFER],
      required: true,
      default: PAYMENT_TYPES.CASH,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const Order = model<IOrder>(MODEL_NAMES.ORDER, orderSchema);
