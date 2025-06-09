import { Request, Response } from 'express';
import { Order } from '../models/Order';
import { Product } from '../models/Product';
import { Customer } from '../models/Customer';
import { User } from '../models/User';

const vat = 0.15;

// Checkout (Create Order)
export const checkoutOrder = async (req: Request, res: Response) => {
  try {
    const { customerId, cashierId, products } = req.body;
    // Validate customer and cashier
    const customer = await Customer.findById(customerId);
    const cashier = await User.findById(cashierId);
    // if (!customer || !cashier) {
    //   res.status(400).json({ message: 'Invalid customer or cashier' });
    //   return;
    // }

    // Prepare product list with full details
    let calculatedSubtotal = 0;
    const orderProducts = [];

    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (!product) continue;

      const subtotal =
        (item.unitPrice || product.price) * item.purchasedQuantity -
        (item.discount || 0);
      calculatedSubtotal += subtotal;

      orderProducts.push({
        purchasedQuantity: item.purchasedQuantity,
        productId: product._id,
        currentUnitPrice: product.price,
        discount: item.discount || 0,
        subtotal,
        productDetails: item.productId,
      });
    }
    const total = calculatedSubtotal + calculatedSubtotal * vat;
    const discount = req.body.discount || 0;
    calculatedSubtotal -= discount;
    // Ensure total is calculated correctly

    const order = await Order.create({
      customer: customerId,
      cashier: cashierId,
      products: orderProducts,
      subtotal: calculatedSubtotal,
      vat: (calculatedSubtotal * vat).toFixed(2),
      discount,
      total,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Failed to checkout', error });
  }
};

// Get All Orders
export const getAllOrders = async (_req: Request, res: Response) => {
  try {
    const orders = await Order.find()
      .populate('customer', 'name phone email')
      .populate('cashier', 'name')
      .populate('products.productDetails', 'name code description categories');

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders', error });
  }
};

// Get Order by ID
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('customer', 'name phone email')
      .populate('cashier', 'name')
      .populate('products.productDetails', 'name code description categories');

    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch order', error });
  }
};

// Get Orders by Customer
export const getOrdersByCustomer = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({ customer: req.params.customerId })
      .populate('cashier', 'name')
      .populate('products.productDetails', 'name code description categories');

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch customer orders', error });
  }
};

// Delete Order (Optional)
export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }

    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete order', error });
  }
};
