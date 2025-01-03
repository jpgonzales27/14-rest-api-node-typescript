import { Request, Response } from "express";
import Product from "../models/Product.models";
import { check, validationResult } from "express-validator";

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  console.log(req.body);

  // Validación
  await check("name").notEmpty().withMessage("El nombre de Producto no puede ir vacio").run(req);
  await check("price")
    .isNumeric()
    .withMessage("Valor no válido")
    .notEmpty()
    .withMessage("El precio de Producto no puede ir vacio")
    .custom((value) => value > 0)
    .withMessage("Precio no válido")
    .run(req);

  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const product = await Product.create(req.body);
  res.json({ data: product });
};
