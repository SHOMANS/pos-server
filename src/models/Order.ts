import { Schema, model, Document, Types } from 'mongoose';

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
  paymentMethod: 'cash' | 'card' | 'mobile_money';
  tenant: Types.ObjectId; // Reference to Tenant
}

const orderSchema = new Schema<IOrder>(
  {
    customer: { type: Schema.Types.ObjectId, ref: 'Customer' },
    cashier: { type: Schema.Types.ObjectId, ref: 'User' },
    tenant: { type: Schema.Types.ObjectId, ref: 'Tenant', required: true },

    products: [
      {
        _id: false, // Prevent creation of an additional _id field for each product
        productDetails: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
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
      enum: ['cash', 'card', 'mobile_money'],
      required: true,
      default: 'cash',
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const Order = model<IOrder>('Order', orderSchema);
