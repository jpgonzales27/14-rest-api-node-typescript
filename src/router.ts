import { Router } from "express";
import { createProduct, getProducts, getProductById, updateProduct, updateAvailability } from "./handlers/product";
import { body, param } from "express-validator";
import { handleInputErrors } from "./middleware";

const router = Router();

router.get("/", getProducts);

router.get("/:id", param("id").isInt().withMessage("ID no válido"), handleInputErrors, getProductById);

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
  handleInputErrors,
  createProduct
);

router.put(
  "/:id",
  // Validación
  body("name").notEmpty().withMessage("El nombre de Producto no puede ir vacio"),
  body("price")
    .isNumeric()
    .withMessage("Valor no válido")
    .notEmpty()
    .withMessage("El precio de Producto no puede ir vacio")
    .custom((value) => value > 0)
    .withMessage("Precio no válido"),
  body("availability").isBoolean().withMessage("Valor para disponibilidad no válido"),
  handleInputErrors,
  updateProduct
);

router.patch("/:id", updateAvailability);

router.delete("/", (req, res) => {
  res.json("Desde DELETE");
});

export default router;
