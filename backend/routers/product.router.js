const express = require("express");
const router = new express.Router();
const multer = require("multer");
const Product = require("../models/Product");

//img storage
const imgconfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

//img filter
const isImage = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("only images is allowd"));
  }
};

const upload = multer({
  storage: imgconfig,
  fileFilter: isImage,
});

//create product
router.post("/", upload.single("img"), async (req, res) => {
  try {
    const { filename } = req.file;
    const { id, name, price, qty, model, size } = req.body;
    const newProduct = new Product({
      imgpath: filename,
      id: id,
      name: name,
      price: price,
      qty: qty,
      model: model,
      size: size,
    });
    const product = await newProduct.save();
    res.status(200).json(product);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
});

//get product
router.get("/", async (req, res) => {
  const { query } = req.query;
  try {
    const product = await Product.find({
      $or: [
        { id: { $regex: query, $options: 'i' } },
        { name: { $regex: query, $options: 'i' } },
        { model: { $regex: query, $options: 'i' } }
      ]
    });
    res.status(200).json(product);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
});

//get product by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
});

//update product
router.put("/:id", upload.single("img"), async (req, res) => {
  try {
    const { filename } = req.file;
    const { newid, name, price, qty, model, size } = req.body;
    const { id } = req.params;

    const updatedProduct = {
      imgpath: filename,
      id: newid,
      name: name,
      price: price,
      qty: qty,
      model: model,
      size: size,
    };

    const product = await Product.findByIdAndUpdate(id, updatedProduct);

    // Cannot find product in the database
    if (!product) {
      return res
        .status(404)
        .json({ message: `Cannot find any product with id ${id}` });
    }

    res.status(200).json(product);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
});


//delete product
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete({ _id: id });
    res.status(200).json(product);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
