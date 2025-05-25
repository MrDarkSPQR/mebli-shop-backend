const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  category: String,
  description: String,
  model: String 
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
