import { Request, Response } from "express";
import Product from "../models/Product.models";
import { check, validationResult } from "express-validator";

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  console.log(req.body);

  try {
    const product = await Product.create(req.body);
    res.json({ data: product });
  } catch (error) {
    console.log(error);
  }
};
