const axios = require("axios")
const express = require("express")
const router = express.Router()

router.get("/",async (req,res)=>{
    try {
        const reviews =await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${process.env.GOOGLE_REVIEWS_PLACE_ID}&fields=name,rating,reviews&key=${process.env.GOOGLE_REVIEWS_API_KEY}`)        
        res.status(200).json(reviews.data.result.reviews);
    } catch (error) {
        res.status(400).json(`${error.message}`)
    }
})

module.exports = router
