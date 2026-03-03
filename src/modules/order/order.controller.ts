import { Request, Response } from "express";
import mongoose from "mongoose";
import Order from "../order/order.model";
import Cart from "../cart/cart.model";
import { AuthRequest } from "../../middlewares/auth.middleware";


export const createOrder = async (req: AuthRequest, res: Response) => {
  try {
    // Convert string id to ObjectId
    const userId = new mongoose.Types.ObjectId(req.user?.id);

    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let grandTotal = 0;

    const orderItems = cart.items.map((item) => {
      grandTotal += item.total_price;
      return {
        product: item.product,
        quantity: item.quantity,
        total_price: item.total_price
      };
    });

    const newOrder = await Order.create({
      user: userId,
      items: orderItems,
      payment_method: req.body.payment_method,
      expected_delivery: req.body.expected_delivery,
      shipping_address: req.body.shipping_address,
      grand_total: grandTotal,
      order_status: "pending"
    });

    // Clear cart after successful order
    cart.items = [];
    await cart.save();

    res.status(201).json({
      message: "Order created successfully",
      order: newOrder
    });

  } catch (error) {
    res.status(500).json({
      message: "Order creation failed",
      error
    });
  }
};


export const getMyOrders = async (req: AuthRequest, res: Response) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user?.id);

    const orders = await Order.find({ user: userId })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};


export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch all orders" });
  }
};


export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { order_status: status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);

  } catch (error) {
    res.status(500).json({ message: "Status update failed" });
  }
};