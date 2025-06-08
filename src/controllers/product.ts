import { Product } from '../models/Product';
import { Request, Response } from 'express';

// Get all products
export const getAllProducts = async (_req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch products', error: err });
  }
};

// Get single product by code
export const getProductByCode = async (req: Request, res: Response) => {
  try {
    const { code } = req.params;
    const product = await Product.findOne({ code });

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

    const existing = await Product.findOne({ code });
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
    const updated = await Product.findOneAndUpdate({ code }, req.body, {
      new: true,
    });

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
    const deleted = await Product.findOneAndDelete({ code });

    if (!deleted) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product', error });
  }
};
