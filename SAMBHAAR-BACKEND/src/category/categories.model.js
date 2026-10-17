  const mongoose = require("mongoose");

  const SubcategorySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String, // image URL or path
      required: false,
    },
  });

  const CategorySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: false,
    },
    subcategories: [SubcategorySchema],
  });

  const Categories = mongoose.model("Category", CategorySchema);
  module.exports = Categories;
