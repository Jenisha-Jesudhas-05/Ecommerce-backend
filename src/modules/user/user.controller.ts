import { Request, Response } from "express";
import User from "./user.model";

export const getProfile = async (req: any, res: Response) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
};

export const addAddress = async (req: any, res: Response) => {
  const user = await User.findById(req.user.id);
  user?.addresses.push(req.body);
  await user?.save();
  res.json(user);
};