const mongoose = require("mongoose");

const FvproductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  description: String,
});

module.exports = mongoose.model("Fvproduct", FvproductSchema);