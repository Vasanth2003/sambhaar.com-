const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true, index: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Add this
  postedAt: { type: Date, default: Date.now },
});

const Blogs = mongoose.model("Blog", BlogSchema);
module.exports = Blogs;
