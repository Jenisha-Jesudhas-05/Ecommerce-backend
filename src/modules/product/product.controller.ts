import { Request, Response } from "express";
import Product from "./product.model";

// CREATE PRODUCT
export const createProduct = async (req: any, res: Response) => {
  try {
    const product = await Product.create({
      ...req.body,
      seller: req.user?.id, // optional (if you want seller ownership)
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to create product" });
  }
};

// GET ALL PRODUCTS
export const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

// UPDATE PRODUCT
export const updateProduct = async (req: any, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.title = req.body.title ?? product.title;
    product.price = req.body.price ?? product.price;
    product.description = req.body.description ?? product.description;
    product.stock = req.body.stock ?? product.stock;
    product.product_img = req.body.product_img ?? product.product_img;

    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Failed to update product" });
  }
};

// DELETE PRODUCT
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product" });
  }
};