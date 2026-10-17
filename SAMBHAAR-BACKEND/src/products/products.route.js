
const express = require("express");
const Products = require("./products.model");

const verifyToken = require("../middleware/verifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");

const router = express.Router();
const XLSX = require("xlsx");

const FVProducts = require("./fvmodel")
const multer = require("multer");
// const upload = multer({ storage: multer.memoryStorage() });


const path = require("path");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     const uniqueName =
//       Date.now() + "-" + file.originalname.replace(/\s+/g, "-");
//     cb(null, uniqueName);
//   },
// });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "fruitsandvegs/");
  },
  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() + "-" + file.originalname.replace(/\s+/g, "-");
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });
const ALLOWED_FIELDS = [
  "category",
  "subcategory",
  "brand",
  "description",
  "price",
  "gst",
  "oldPrice",
  "weight",
  "image",
  "rating",
  "isRewardEligible",
  "bestseller",
  "soldout",
  "brandCategory"
];


function coerceValue(key, value) {
  if (value === undefined || value === null || value === "") return undefined;

  if (["price", "gst", "oldPrice", "rating"].includes(key)) {
    return Number(value);
  }

  if (["isRewardEligible", "bestseller", "soldout"].includes(key)) {
    const str = String(value).toLowerCase();
    return ["true", "1", "yes"].includes(str);
  }

  return String(value).trim();
}

router.post(
  "/bulk-update",
  verifyToken,
  verifyAdmin,
  upload.single("file"),  // field name in form-data should be `file`
async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Read Excel buffer
    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    if (!rows.length) {
      return res.status(400).json({ message: "Excel file is emptyyy" });
    }

    const bulkOps = [];
    let updatedCount = 0;

    for (const row of rows) {
      if (!row.name) {
        continue
      }; // name is required to match

      const updateDoc = {};
      for (const field of ALLOWED_FIELDS) {
        if (row[field] !== undefined) {
          const coerced = coerceValue(field, row[field]);
          if (coerced !== undefined) updateDoc[field] = coerced;
        }
      }

      if (Object.keys(updateDoc).length === 0) continue;

      // bulkOps.push({
      //   updateOne: {
      //     filter: { name: row.name },
      //     update: { $set: updateDoc },
      //   },
      // });
      
      const filter = { name: row.name };
      if (row.weight !== undefined && row.weight !== "") {
        filter.weight = String(row.weight).trim();
      }

      //  bulkOps.push({
      //   updateOne: {
      //     filter: { name: row.name },
      //     update: { $set: updateDoc },
      //   },
      // });
      bulkOps.push({
        updateOne: {
          filter,
          update: { $set: updateDoc },
        },
      });
    }

    if (!bulkOps.length) {
      return res.status(400).json({ message: "No valid updates found in Excel" });
    }

    const result = await Products.bulkWrite(bulkOps, { ordered: false });

    res.json({
      message: "Bulk update completed",
      matched: result.matchedCount,
      modified: result.modifiedCount,
      
    });
  } catch (err) {
    console.error("Bulk update error:", err);
    res.status(500).json({ message: "Error updating products", error: err.message });
  };
}
);


//post a product
router.post("/create-product", async (req, res) => {
  try {
    const newProduct = new Products({
      ...req.body,
    });
    const savedProduct = await newProduct.save();
    res.status(201).send(savedProduct);
  } catch (error)  {
    console.log("Error creating new product", error);
    res.status(500).send({ message: "Failed to create new product"});
  }
});

router.get("/makeisVerified", async(req,res)=>{
  const items = await Products.find()
  res.status(200).send({items}) 
})




//get all products
router.get("/", async (req, res) => {
  try {
    const {
      category,
      brand,
      subcategory,
      minPrice,
      maxPrice,
      page = 1,
      limit = 4000,
      brandCategory
    } = req.query;

    let filter = {};
    if (category && category !== "all") {
      filter.category = category;
    }
    
    if(brandCategory ){
      filter.brandCategory = brandCategory;
    }

    if (brand && brand !== "all") {
      filter.brand = brand;
    }
    if (subcategory) {
      filter.subcategory = subcategory;
    }
    
    if (minPrice && maxPrice) {
        const min = parseFloat(minPrice);
        const max = parseFloat(maxPrice);
        if (!isNaN(min) && !isNaN(max)) {   // <-- fix here
          filter.price = { $gte: min, $lte: max };
        }
      }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const totalProducts = await Products.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / parseInt(limit));
    const products = await Products.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .populate("author", "email")
      .sort({ createdAt: -1 });
      // console.log(products);

    res.status(200).send({ products, totalPages, totalProducts });
  } catch (error) {
    console.log("Error fetching products", error);
    res.status(500).send({ message: "Errror fetching products" });
  }
});


router.get("/getProduct/:productName",async (req,res)=>{

  const {productName} = req.params;
const product = await Products.findOne({ name: productName });
if (!product) {
  return res.status(404).json({ message: "No Product Found" });
}
res.status(200).json(product);
})
// In a protected admin route


//get all products for search
// Get all products
router.get("/search", async (req, res) => {
  try {
    const { query } = req.query; // Retrieve the search query
    const regex = new RegExp(query, "i"); // Case-insensitive regex for partial matching

    const filter = {
      $or: [
        { name: regex },
        { description: regex },
        { category: regex },
        { subcategory: regex },
        { brand: regex },
      ],
    };

    const products = await Products.find(filter);
    res.status(200).send(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send({ message: "Failed to fetch products" });
  }
});


//get single product
router.get("/update/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Products.findById(productId).populate(
      "author",
      "email username"
    );
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    res.status(200).send({ product });
  } catch (error) {
    console.log("Error fetching single product", error);
    res.status(500).send({ message: "Error fetching single product" });
  }
});
router.patch(
  "/patch-soldout-field",

  async (req, res) => {
    try {
      const result = await Products.updateMany(
        { soldout: { $exists: false } }, // Only where 'soldout' doesn't exist
        { $set: { soldout: false } }     // Add it with default value
      );

      res.status(200).send({
        message: "Soldout field added to existing products",
        matchedCount: result.matchedCount,
        modifiedCount: result.modifiedCount,
      });
    } catch (error) {
      console.error("Error patching soldout field:", error);
      res.status(500).send({ message: "Error updating soldout field" });
    }
  }
);


router.patch(
  "/update-product/:id",
  verifyToken,
  verifyAdmin,
  async (req, res) => {
    try {
      const productId = req.params.id;

      const updatedProduct = await Products.findByIdAndUpdate(
        productId,
        { ...req.body },
        { new: true }
      );

      
      if (!updatedProduct) {
        return res.status(400).send({ message: "Product not found" });
      }

      res.status(200).send({
        message: "Product updated successfully",
        product: updatedProduct,
      });
    } catch (error) {
      console.log("Error updating the product", error);
      res.status(500).send({ message: "Error updating the product" });
    }
  }
);

//delete a product
router.delete("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Products.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).send({ message: "Product not found" });
    }

    res.status(200).send({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log("Error deleting the product", error);
    res.status(500).send({ message: "Error deleting the product" });
  }
});

//get related products
router.get("/related/:id", async (req, res) => {
  try {
    const { id } = req.params;

    
    if (!id) {
      return res.status(400).send({ message: "Product ID is required" });
    }

    const product = await Products.findById(id);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    const titleRegex = new RegExp(
      product.name
        .split(" ")
        .filter((word) => word.length > 1)
        .join("|"),
      "i"
    );

    const relatedProducts = await Products.find({
      _id: { $ne: id }, //Exclude the current product
      $or: [
        { name: { $regex: titleRegex } }, //match similar names
        { category: product.category }, //match the same category
      ],
    });

    res.status(200).send(relatedProducts);
  } catch (error) {
    console.log("Error fetching the related products", error);
    res.status(500).send({ message: "Error fetching the related products" });
  }
});

// Get all products that are reward eligible
// Router for rewarded products
router.get("/bestseller-products", async (req, res) => {
  try {
    const bestseller = await Products.find({ bestseller: true });


    res.status(200).json({ bestseller });
  } catch (error) {
    console.error("Error fetching rewarded products:", error);
    res.status(500).json({ error: "Server error" });
  }
});



    router.get("*",async (req,res)=>{

    
    res.status(200).json({ message: "Failed", data: "Enter Proper Route" });

  })

  router.post(
  "/upload-image",
  // verifyToken,
  // verifyAdmin,
  upload.single("image"),
  (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

const imageUrl = `http://localhost:4000/products/${req.file.filename}`;
      res.status(200).json({
        message: "Image uploaded successfully",
        imageUrl,
      });
    } catch (error) {
      console.error("Image upload error:", error);
      res.status(500).json({ message: "Image upload failed" });
    }
  }
);

router.post(
  "/createfv-product",
  // verifyToken,
  // verifyAdmin,
  upload.single("image"),
  async (req, res) => {
    try {
      let imageUrl = "";

      if (req.file) {
 imageUrl = `http://localhost:4000/products/${req.file.filename}`;      }

      const newProduct = new FVProducts({
        ...req.body,
        image: imageUrl,
      });

      const savedProduct = await newProduct.save();

      res.status(201).json(savedProduct);
    } catch (error) {
      console.log("Error creating new product", error);
      res.status(500).json({ message: "Failed to create product" });
    }
  }
);

const fs = require("fs");

router.delete("/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const product = await FVProducts.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete image file
    if (product.image) {
      const imagePath = product.image.split("/products/")[1];
      fs.unlink(`uploads/${imagePath}`, (err) => {
        if (err) console.log("Error deleting image file:", err);
      });
    }

    await Products.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log("Error deleting product", error);
    res.status(500).json({ message: "Error deleting product" });
  }
});


module.exports = router;


//Backup


// const express = require("express");
// const Products = require("./products.model");

// const verifyToken = require("../middleware/verifyToken");
// const verifyAdmin = require("../middleware/verifyAdmin");

// const router = express.Router();
// const XLSX = require("xlsx");

// const FVProducts = require("./fvmodel")
// const multer = require("multer");
// // const upload = multer({ storage: multer.memoryStorage() });


// const path = require("path");

// // const storage = multer.diskStorage({
// //   destination: function (req, file, cb) {
// //     cb(null, "uploads/");
// //   },
// //   filename: function (req, file, cb) {
// //     const uniqueName =
// //       Date.now() + "-" + file.originalname.replace(/\s+/g, "-");
// //     cb(null, uniqueName);
// //   },
// // });

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "fruitsandvegs/");
//   },
//   filename: function (req, file, cb) {
//     const uniqueName =
//       Date.now() + "-" + file.originalname.replace(/\s+/g, "-");
//     cb(null, uniqueName);
//   },
// });

// const upload = multer({ storage });
// const ALLOWED_FIELDS = [
//   "category",
//   "subcategory",
//   "brand",
//   "description",
//   "price",
//   "gst",
//   "oldPrice",
//   "weight",
//   "image",
//   "rating",
//   "isRewardEligible",
//   "bestseller",
//   "soldout",
//   "brandCategory"
// ];


// function coerceValue(key, value) {
//   if (value === undefined || value === null || value === "") return undefined;

//   if (["price", "gst", "oldPrice", "rating"].includes(key)) {
//     return Number(value);
//   }

//   if (["isRewardEligible", "bestseller", "soldout"].includes(key)) {
//     const str = String(value).toLowerCase();
//     return ["true", "1", "yes"].includes(str);
//   }

//   return String(value).trim();
// }

// router.post(
//   "/bulk-update",
//   verifyToken,
//   verifyAdmin,
//   upload.single("file"),  // field name in form-data should be `file`
// async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     // Read Excel buffer
//     const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
//     const sheetName = workbook.SheetNames[0];
//     const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

//     if (!rows.length) {
//       return res.status(400).json({ message: "Excel file is emptyyy" });
//     }

//     const bulkOps = [];
//     let updatedCount = 0;

//     for (const row of rows) {
//       if (!row.name) {
//         continue
//       }; // name is required to match

//       const updateDoc = {};
//       for (const field of ALLOWED_FIELDS) {
//         if (row[field] !== undefined) {
//           const coerced = coerceValue(field, row[field]);
//           if (coerced !== undefined) updateDoc[field] = coerced;
//         }
//       }

//       if (Object.keys(updateDoc).length === 0) continue;

//       // bulkOps.push({
//       //   updateOne: {
//       //     filter: { name: row.name },
//       //     update: { $set: updateDoc },
//       //   },
//       // });
      
//       const filter = { name: row.name };
//       if (row.weight !== undefined && row.weight !== "") {
//         filter.weight = String(row.weight).trim();
//       }

//       //  bulkOps.push({
//       //   updateOne: {
//       //     filter: { name: row.name },
//       //     update: { $set: updateDoc },
//       //   },
//       // });
//       bulkOps.push({
//         updateOne: {
//           filter,
//           update: { $set: updateDoc },
//         },
//       });
//     }

//     if (!bulkOps.length) {
//       return res.status(400).json({ message: "No valid updates found in Excel" });
//     }

//     const result = await Products.bulkWrite(bulkOps, { ordered: false });

//     res.json({
//       message: "Bulk update completed",
//       matched: result.matchedCount,
//       modified: result.modifiedCount,
      
//     });
//   } catch (err) {
//     console.error("Bulk update error:", err);
//     res.status(500).json({ message: "Error updating products", error: err.message });
//   };
// }
// );


// //post a product
// router.post("/create-product", async (req, res) => {
//   try {
//     const newProduct = new Products({
//       ...req.body,
//     });
//     const savedProduct = await newProduct.save();
//     res.status(201).send(savedProduct);
//   } catch (error)  {
//     console.log("Error creating new product", error);
//     res.status(500).send({ message: "Failed to create new product"});
//   }
// });

// router.get("/makeisVerified", async(req,res)=>{
//   const items = await Products.find()
//   res.status(200).send({items}) 
// })




// //get all products
// router.get("/", async (req, res) => {
//   try {
//     const {
//       category,
//       brand,
//       subcategory,
//       minPrice,
//       maxPrice,
//       page = 1,
//       limit = 4000,
//       brandCategory
//     } = req.query;

//     let filter = {};
//     if (category && category !== "all") {
//       filter.category = category;
//     }
    
//     if(brandCategory ){
//       filter.brandCategory = brandCategory;
//     }

//     if (brand && brand !== "all") {
//       filter.brand = brand;
//     }
//     if (subcategory) {
//       filter.subcategory = subcategory;
//     }
    
//     if (minPrice && maxPrice) {
//         const min = parseFloat(minPrice);
//         const max = parseFloat(maxPrice);
//         if (!isNaN(min) && !isNaN(max)) {   // <-- fix here
//           filter.price = { $gte: min, $lte: max };
//         }
//       }

//     const skip = (parseInt(page) - 1) * parseInt(limit);
//     const totalProducts = await Products.countDocuments(filter);
//     const totalPages = Math.ceil(totalProducts / parseInt(limit));
//     const products = await Products.find(filter)
//       .skip(skip)
//       .limit(parseInt(limit))
//       .populate("author", "email")
//       .sort({ createdAt: -1 });
//       // console.log(products);

//     res.status(200).send({ products, totalPages, totalProducts });
//   } catch (error) {
//     console.log("Error fetching products", error);
//     res.status(500).send({ message: "Error fetching products" });
//   }
// });


// router.get("/getProduct/:productName",async (req,res)=>{

//   const {productName} = req.params;
// const product = await Products.findOne({ name: productName });
// if (!product) {
//   return res.status(404).json({ message: "No Product Found" });
// }
// res.status(200).json(product);
// })
// // In a protected admin route


// //get all products for search
// // Get all products
// router.get("/search", async (req, res) => {
//   try {
//     const { query } = req.query; // Retrieve the search query
//     const regex = new RegExp(query, "i"); // Case-insensitive regex for partial matching

//     const filter = {
//       $or: [
//         { name: regex },
//         { description: regex },
//         { category: regex },
//         { subcategory: regex },
//         { brand: regex },
//       ],
//     };

//     const products = await Products.find(filter);
//     res.status(200).send(products);
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     res.status(500).send({ message: "Failed to fetch products" });
//   }
// });


// //get single product
// router.get("/update/:id", async (req, res) => {
//   try {
//     const productId = req.params.id;
//     const product = await Products.findById(productId).populate(
//       "author",
//       "email username"
//     );
//     if (!product) {
//       return res.status(404).send({ message: "Product not found" });
//     }
//     res.status(200).send({ product });
//   } catch (error) {
//     console.log("Error fetching single product", error);
//     res.status(500).send({ message: "Error fetching single product" });
//   }
// });
// router.patch(
//   "/patch-soldout-field",

//   async (req, res) => {
//     try {
//       const result = await Products.updateMany(
//         { soldout: { $exists: false } }, // Only where 'soldout' doesn't exist
//         { $set: { soldout: false } }     // Add it with default value
//       );

//       res.status(200).send({
//         message: "Soldout field added to existing products",
//         matchedCount: result.matchedCount,
//         modifiedCount: result.modifiedCount,
//       });
//     } catch (error) {
//       console.error("Error patching soldout field:", error);
//       res.status(500).send({ message: "Error updating soldout field" });
//     }
//   }
// );


// router.patch(
//   "/update-product/:id",
//   verifyToken,
//   verifyAdmin,
//   async (req, res) => {
//     try {
//       const productId = req.params.id;

//       const updatedProduct = await Products.findByIdAndUpdate(
//         productId,
//         { ...req.body },
//         { new: true }
//       );

      
//       if (!updatedProduct) {
//         return res.status(400).send({ message: "Product not found" });
//       }

//       res.status(200).send({
//         message: "Product updated successfully",
//         product: updatedProduct,
//       });
//     } catch (error) {
//       console.log("Error updating the product", error);
//       res.status(500).send({ message: "Error updating the product" });
//     }
//   }
// );

// //delete a product
// router.delete("/:id", async (req, res) => {
//   try {
//     const productId = req.params.id;
//     const deletedProduct = await Products.findByIdAndDelete(productId);

//     if (!deletedProduct) {
//       return res.status(404).send({ message: "Product not found" });
//     }

//     res.status(200).send({
//       message: "Product deleted successfully",
//     });
//   } catch (error) {
//     console.log("Error deleting the product", error);
//     res.status(500).send({ message: "Error deleting the product" });
//   }
// });

// //get related products
// router.get("/related/:id", async (req, res) => {
//   try {
//     const { id } = req.params;

    
//     if (!id) {
//       return res.status(400).send({ message: "Product ID is required" });
//     }

//     const product = await Products.findById(id);
//     if (!product) {
//       return res.status(404).send({ message: "Product not found" });
//     }

//     const titleRegex = new RegExp(
//       product.name
//         .split(" ")
//         .filter((word) => word.length > 1)
//         .join("|"),
//       "i"
//     );

//     const relatedProducts = await Products.find({
//       _id: { $ne: id }, //Exclude the current product
//       $or: [
//         { name: { $regex: titleRegex } }, //match similar names
//         { category: product.category }, //match the same category
//       ],
//     });

//     res.status(200).send(relatedProducts);
//   } catch (error) {
//     console.log("Error fetching the related products", error);
//     res.status(500).send({ message: "Error fetching the related products" });
//   }
// });

// // Get all products that are reward eligible
// // Router for rewarded products
// router.get("/bestseller-products", async (req, res) => {
//   try {
//     const bestseller = await Products.find({ bestseller: true });


//     res.status(200).json({ bestseller });
//   } catch (error) {
//     console.error("Error fetching rewarded products:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// });



//     router.get("*",async (req,res)=>{

    
//     res.status(200).json({ message: "Failed", data: "Enter Proper Route" });

//   })

//   router.post(
//   "/upload-image",
//   // verifyToken,
//   // verifyAdmin,
//   upload.single("image"),
//   (req, res) => {
//     try {
//       if (!req.file) {
//         return res.status(400).json({ message: "No file uploaded" });
//       }

// const imageUrl = `http://localhost:4000/products/${req.file.filename}`;
//       res.status(200).json({
//         message: "Image uploaded successfully",
//         imageUrl,
//       });
//     } catch (error) {
//       console.error("Image upload error:", error);
//       res.status(500).json({ message: "Image upload failed" });
//     }
//   }
// );

// router.post(
//   "/createfv-product",
//   // verifyToken,
//   // verifyAdmin,
//   upload.single("image"),
//   async (req, res) => {
//     try {
//       let imageUrl = "";

//       if (req.file) {
//  imageUrl = `http://localhost:4000/products/${req.file.filename}`;      }

//       const newProduct = new FVProducts({
//         ...req.body,
//         image: imageUrl,
//       });

//       const savedProduct = await newProduct.save();

//       res.status(201).json(savedProduct);
//     } catch (error) {
//       console.log("Error creating new product", error);
//       res.status(500).json({ message: "Failed to create product" });
//     }
//   }
// );

// const fs = require("fs");

// router.delete("/:id", verifyToken, verifyAdmin, async (req, res) => {
//   try {
//     const product = await FVProducts.findById(req.params.id);

//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     // Delete image file
//     if (product.image) {
//       const imagePath = product.image.split("/products/")[1];
//       fs.unlink(`uploads/${imagePath}`, (err) => {
//         if (err) console.log("Error deleting image file:", err);
//       });
//     }

//     await Products.findByIdAndDelete(req.params.id);

//     res.status(200).json({ message: "Product deleted successfully" });
//   } catch (error) {
//     console.log("Error deleting product", error);
//     res.status(500).json({ message: "Error deleting product" });
//   }
// });


// module.exports = router;