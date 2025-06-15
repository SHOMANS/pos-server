import { Product } from '../models/Product';
import { Request, Response } from 'express';

// Get all products
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { tenantId } = (req as any).user;

    const products = await Product.find({ tenant: tenantId });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch products', error: err });
  }
};

// Get single product by code
export const getProductByCode = async (req: Request, res: Response) => {
  try {
    const { tenantId } = (req as any).user;
    const { code } = req.params;
    const product = await Product.findOne({ code, tenant: tenantId });

    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch product', error });
  }
};

// Create product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { code, name, price, description, quantity, categories } = req.body;
    const { tenantId } = (req as any).user;
    const existing = await Product.findOne({ code, tenant: tenantId });
    if (existing) {
      res.status(400).json({ message: 'Product code must be unique' });
      return;
    }

    const product = new Product({
      code,
      name,
      price,
      description,
      quantity,
      categories,
      tenant: tenantId,
    });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error });
  }
};

// Update product by code
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { code } = req.params;
    const { tenantId } = (req as any).user;
    const updated = await Product.findOneAndUpdate(
      { code, tenant: tenantId },
      req.body,
      {
        new: true,
      }
    );

    if (!updated) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update product', error: err });
  }
};

// Delete product by code
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { code } = req.params;
    const { tenantId } = (req as any).user;
    const deleted = await Product.findOneAndDelete({ code, tenant: tenantId });

    if (!deleted) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product', error });
  }
};
