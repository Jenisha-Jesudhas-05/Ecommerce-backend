import { Response } from "express";
import mongoose from "mongoose";
import Cart from "./cart.model";
import Product from "../product/product.model";
import { AuthRequest } from "../../middlewares/auth.middleware";

export const addToCart = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ message: "Product ID and quantity required" });
    }

    const userId = new mongoose.Types.ObjectId(req.user.id);

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const totalPrice = product.price * quantity;

    let cart = await Cart.findOne({ user: userId });

    // If cart does not exist → create new cart
    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [
          {
            product: productId,
            quantity,
            total_price: totalPrice
          }
        ]
      });

      return res.status(201).json(cart);
    }

    // Check if product already in cart
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      // update existing item
      cart.items[itemIndex].quantity += quantity;
      cart.items[itemIndex].total_price =
        cart.items[itemIndex].quantity * product.price;
    } else {
      // push new item
      cart.items.push({
        product: productId,
        quantity,
        total_price: totalPrice
      });
    }

    await cart.save();

    res.json(cart);

  } catch (error) {
    res.status(500).json({ message: "Add to cart failed", error });
  }
};


export const getCart = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = new mongoose.Types.ObjectId(req.user.id);

    const cart = await Cart.findOne({ user: userId })
      .populate("items.product");

    if (!cart) {
      return res.json({ items: [] });
    }

    res.json(cart);

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cart" });
  }
};



export const removeFromCart = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = new mongoose.Types.ObjectId(req.user.id);
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();

    res.json({ message: "Item removed", cart });

  } catch (error) {
    res.status(500).json({ message: "Remove failed" });
  }
};