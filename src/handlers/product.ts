import { Request, Response } from "express";
import Product from "../models/Product.models";

export const createProduct = async (req: Request, res: Response) => {
  console.log(req.body);
  const product = await Product.create(req.body);
  res.json({ data: product });
};
