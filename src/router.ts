import { Router } from "express";
import { createProduct, getProducts } from "./handlers/product";
import { body } from "express-validator";
import { handleInputErros } from "./middleware";

const router = Router();

router.get("/", getProducts);

router.post(
  "/",
  // Validación
  body("name").notEmpty().withMessage("El nombre de Producto no puede ir vacio"),
  body("price")
    .isNumeric()
    .withMessage("Valor no válido")
    .notEmpty()
    .withMessage("El precio de Producto no puede ir vacio")
    .custom((value) => value > 0)
    .withMessage("Precio no válido"),
  handleInputErros,
  createProduct
);

router.put("/", (req, res) => {
  res.json("Desde PUT");
});

router.patch("/", (req, res) => {
  res.json("Desde PATCH");
});

router.delete("/", (req, res) => {
  res.json("Desde DELETE");
});

export default router;
