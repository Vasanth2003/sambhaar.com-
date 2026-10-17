const mongoose = require("mongoose")
const express = require("express")

const brandsSchema = new mongoose.Schema({
    name :{
        type:"String",
        required:true
    },
    products:[{
        type:mongoose.Types.ObjectId,
        ref:"Products",
    }]
})


const Brands = mongoose.model("Brand",brandsSchema)
module.exports = Brands;