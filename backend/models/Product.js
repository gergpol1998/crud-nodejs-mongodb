const mongoose = require('mongoose');

//create Schema
const productSchema = new mongoose.Schema({
    imgpath: {type:String},
    id:{ type:String },
    name: { type:String },
    price:{ type:Number },
    qty:{ type:Number },
    model:{type:String},
    size:{type:Number}
})

//create model
const Product = new mongoose.model("products",productSchema);

//send model for use external
module.exports = Product

