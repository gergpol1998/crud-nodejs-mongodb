const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const product = require("../routers/product.router");
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true}))
app.use(cors());

//connect db
app.listen(port,()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/miniproject',{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(() => {
        console.log(`connection success and running at port ${port}`);
    })
    .catch((err) => {
        console.log(err);
    })
})
//path for img
app.use('/uploads',express.static('./uploads'))

//insert one product
app.use('/product/create',product)

//fetch products
app.use('/products',product)

//fetch product by id
app.use('/product',product)

//update product
app.use('/product/edit',product)

//delete product
app.use('/product/delete',product)