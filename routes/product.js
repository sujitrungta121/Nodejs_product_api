const express = require("express");
const router = express.Router();
const productController = require("../controllers/product");
const auth = require("../auth/verify-create-token");
const { configDotenv } = require("dotenv");

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.post("/", auth.verifyToken, productController.createProduct);
router.put("/:id", auth.verifyToken, productController.updateProduct);
router.delete("/:id", auth.verifyToken, productController.deleteProduct);

module.exports = router;
