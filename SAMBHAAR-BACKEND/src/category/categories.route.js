const express = require("express");
const Categories = require("./categories.model");
const router = express.Router();

const multer = require("multer");
const path = require("path");




const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // NO trailing slash needed
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(
        file.originalname
      )}`
    );
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files allowed"), false);
    }
    cb(null, true);
  },
});

router.patch(
  "/category/:id/image",
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const category = await Categories.findById(req.params.id);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      category.image = `/uploads/${req.file.filename}`;
      await category.save();

      res.json({
        message: "Category image uploaded successfully",
        category,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Upload failed" });
    }
  }
);

router.patch(
  "/category/:categoryId/subcategory/:subcategoryId/image",
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const category = await Categories.findById(req.params.categoryId);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      const subcategory = category.subcategories.id(
        req.params.subcategoryId
      );
      if (!subcategory) {
        return res.status(404).json({ message: "Subcategory not found" });
      }

      subcategory.image = `/uploads/${req.file.filename}`;
      await category.save();

      res.json({
        message: "Subcategory image uploaded successfully",
        subcategory,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Upload failed" });
    }
  }
);

router.use("/uploads", express.static("uploads"));

router.post(
  "/create-category-with-image",
  upload.single("image"),
  async (req, res) => {
    try {
      const { name, subcategories } = req.body;

      const newCategory = new Categories({
        name,
        image: req.file ? `/uploads/${req.file.filename}` : null,
        subcategories: subcategories ? JSON.parse(subcategories) : [],
      });

      const savedCategory = await newCategory.save();
      res.status(201).json(savedCategory);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to create category" });
    }
  }
);

router.post("/create-category", async (req, res) => {
  try {
    const { name, subcategories } = req.body;

    const newCategory = new Categories({
      name,
      subcategories,
    });

    const savedCategory = await newCategory.save();
    res.status(201).send(savedCategory);
  } catch (error) {
    console.error("Error creating new category:", error);
    res.status(500).send({ message: "Failed to create new category" });
  }
});

// Get all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Categories.find();
    res.status(200).send(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).send({ message: "Failed to fetch categories" });
  }
});

router.post("/upload-image",upload.single("file"),(req,res)=>{
  try {
    const {img} = req.body;
    if(req.file){
      return res.status(400).json({ message: "No file uploaded" });
    }

  } catch (error) {
    
  }



})
// Get a single category by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Categories.findById(id);
    if (!category) {
      return res.status(404).send({ message: "Category not found" });
    }

    res.status(200).send(category);
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).send({ message: "Failed to fetch category" });
  }
});
router.get("/subcategory/:sub",(req,res)=>{
  try{

  }catch (error) {
    console.error("Error Fetching Products:", error);
    res.status(500).send({ message: "Failed to update category" });
  }
})
// Update a category
router.patch("/update-category/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, subcategories } = req.body;

    const updatedCategory = await Categories.findByIdAndUpdate(
      id,
      { name, subcategories },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).send({ message: "Category not found" });
    }

    res.status(200).send({
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).send({ message: "Failed to update category" });
  }
});

// Delete a category
router.delete("/delete-category/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await Categories.findByIdAndDelete(id);
      res.status(200).send({ message: "Category deleted successfully" });
    } catch (error) {
      console.error("Error deleting category:", error);
      res.status(500).send({ message: "Error deleting category" });
    }
  });

module.exports = router;
