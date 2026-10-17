const express = require("express");
const Blogs = require("./blogs.model");
const verifyToken = require("../middleware/verifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");
const router = express.Router();

// Create a new blog
router.post("/create-blog", async (req, res) => {
  try {
    const { title, description, image } = req.body;

    if (!title || !description || !image) {
      return res
        .status(400)
        .send({ message: "Title, description, and image are required" });
    }

    const newBlog = new Blogs({
      title,
      description,
      image,
    });

    const savedBlog = await newBlog.save();
    res.status(201).send(savedBlog);
  } catch (error) {
    console.error("Error creating new blog:", error);
    res.status(500).send({ message: "Failed to create new blog" });
  }
});

// Get all blogs
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const totalBlogs = await Blogs.countDocuments();
    const totalPages = Math.ceil(totalBlogs / parseInt(limit));

    const blogs = await Blogs.find()
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ postedAt: -1 }); // Sort by the latest posted date

    res
      .status(200)
      .send({ blogs, totalPages, totalBlogs, page: parseInt(page) }); // Add page to response
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).send({ message: "Failed to fetch blogs" });
  }
});

// Get a single blog by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blogs.findById(id);

    if (!blog) {
      return res.status(404).send({ message: "Blog not found" });
    }

    res.status(200).send(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).send({ message: "Failed to fetch blog" });
  }
});

// Update a blog
router.patch("/update-blog/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;

    const updatedBlog = await Blogs.findByIdAndUpdate(
      id,
      { title, description, image },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).send({ message: "Blog not found" });
    }

    res.status(200).send({
      message: "Blog updated successfully",
      blog: updatedBlog,
    });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).send({ message: "Failed to update blog" });
  }
});

// Delete a blog
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBlog = await Blogs.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).send({ message: "Blog not found" });
    }

    res.status(200).send({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).send({ message: "Failed to delete blog" });
  }
});

// Search blogs by keyword
router.get("/search", async (req, res) => {
  try {
    const { query } = req.query;
    const regex = new RegExp(query, "i");

    const filter = {
      $or: [
        { title: regex },
        { content: regex },
        { category: regex },
        { tags: regex },
      ],
    };

    const blogs = await Blogs.find(filter).populate("author", "username email");
    res.status(200).send(blogs);
  } catch (error) {
    console.error("Error searching blogs", error);
    res.status(500).send({ message: "Failed to search blogs" });
  }
});

// Get related blogs
router.get("/related/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blogs.findById(id);

    if (!blog) return res.status(404).send({ message: "Blog not found" });

    const titleRegex = new RegExp(
      blog.title
        .split(" ")
        .filter((word) => word.length > 1)
        .join("|"),
      "i"
    );

    const relatedBlogs = await Blogs.find({
      _id: { $ne: id },
      $or: [{ title: { $regex: titleRegex } }, { category: blog.category }],
    });

    res.status(200).send(relatedBlogs);
  } catch (error) {
    console.error("Error fetching related blogs", error);
    res.status(500).send({ message: "Failed to fetch related blogs" });
  }
});

module.exports = router;
