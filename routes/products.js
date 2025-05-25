const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Отримати всі товари
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Додати новий товар
router.post("/", async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.json(newProduct);
});

// Отримати один товар по ID
router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
});

module.exports = router;
