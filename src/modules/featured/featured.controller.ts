import { Request, Response } from "express";
import Featured from "./featured.model";

export const addFeatured = async (req: Request, res: Response) => {
  const featured = await Featured.create(req.body);
  res.json(featured);
};

export const getFeatured = async (_req: Request, res: Response) => {
  const featured = await Featured.find().populate("product_id");
  res.json(featured);
};