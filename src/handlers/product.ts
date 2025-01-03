import { Request, Response } from "express";
import Product from "../models/Product.models";

export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.findAll({
      order: [["price", "DESC"]],
      limit: 3,
      attributes: { exclude: ["availability", "updatedAt", "createdAt"] },
    });
    res.json({ data: products });
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("PARAMS: " + req.params.id);
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      res.status(404).json({
        error: "Producto No Encontrado",
      });
    }

    res.json({ data: product });
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  console.log(req.body);

  try {
    const product = await Product.create(req.body);
    res.json({ data: product });
  } catch (error) {
    console.log(error);
  }
};
