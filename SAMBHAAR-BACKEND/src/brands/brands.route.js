const express = require("express")
const router = express.Router();
const Brand = require("./brands.model")
const Products = require("../products/products.model")
// router.post("/add-brand",async(req,res)=>{
//    try{
//      const newBrand = await new Brand.create(req.body);
//     if(newBrand){
//         res.status(200).json(newBrand)
//     }
//     else{
//         res.status(404).json({"message":"Provide Brand Details Properly"})
//     }
//    }catch(err){
//         res.status(404).json({"message":`Error Occured while creating Brand ${err.message}`})
//    }
// })


router.post("/add-brand", async (req, res) => {
  try {
    const data = req.body;

    if (!Array.isArray(data) || data.length === 0) {
      return res.status(400).json({ message: "Send an array of brands." });
    }

    const insertedBrands = await Brand.insertMany(data);

    res.status(200).json({
      message: "Brands inserted successfully.",
      brands: insertedBrands,
    });
  } catch (err) {
    res.status(500).json({ message: `Error occurred while adding brands: ${err}` }); 
  }
});

router.get("/getAllBrands",async (req,res)=>{
   try {
     const brands = await Brand.find()
    if(brands.length>0){
        res.status(200).json(brands);
    }
    else{
        res.status(200).json({"message":"No Brands Found"});
   
    }
   } catch (error) {
    res.status(404).json({"message":`Error Occured while Fetching Brands ${error}`})
   }
})

router.get("/productsByBrandId/:id", async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id); 

    if (brand) {
      res.status(200).json(brand.products); 
    } else {
      res.status(404).json({ message: "Brand not found. Check Brand ID." });
    }
  } catch (error) {
    res.status(500).json({ message: `Error occurred while fetching brand: ${error.message}` });
  }
});


router.get("/productsByBrandName/:name", async (req, res) => {
  try {
    const brand = await Products.find({brandCategory:req.params.name}); 

    if (brand) {
      res.status(200).json(brand); 
    } else {
      res.status(404).json({ message: "Brand not found. Check Brand ID." });
    }
  } catch (error) {
    res.status(500).json({ message: `Error occurred while fetching brand: ${error.message}` });
  }
});



module.exports = router;
