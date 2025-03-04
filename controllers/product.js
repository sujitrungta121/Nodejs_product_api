const { isValidObjectId } = require("mongoose");
const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      minPrice,
      maxPrice,
      inStock,
      search,
    } = req.query;
    let allProducts, skip;
    if (limit && page) {
      skip = limit * (page - 1);
    }
    if (category) {
      allProducts = await Product.find({ category: category })
        .limit(limit)
        .skip(skip);
    }
    if (minPrice && maxPrice) {
      allProducts = await Product.find({
        price: { $gte: minPrice, $lte: maxPrice },
      })
        .limit(limit)
        .skip(skip);
    }
    if (inStock) {
      allProducts = await Product.find({ inStock: inStock })
        .limit(limit)
        .skip(skip);
    }

    if (search) {
      allProducts = await Product.find({
        name: { $regex: search, $options: "i" },
        description: { $regex: search, $options: "i" },
      })
        .limit(limit)
        .skip(skip);
    }

    if (allProducts) {
      return res
        .status(200)
        .json({ message: "Success!", products: allProducts });
    }

    allProducts = await Product.find().limit(limit).skip(skip);
    console.log(allProducts, "pritnte the all prodicts");

    return res.status(200).json({ message: "Success!", products: allProducts });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id && !isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid product id" });
    }
    const product = await Product.findById({ id });
    if (!product)
      return res
        .status(404)
        .json({ message: "No Product Found With this Id!" });
    return res.status(200).json({ product });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { user } = req;
    console.log(user, "priteh user");
    console.log(" name, price, description, category, inStock, quantity");
    const { name, price, description, category, inStock, quantity } = req.body;
    if (!name || !price || !description || !category || !quantity) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    await Product.create({
      name,
      price,
      description,
      category,
      quantity,
      inStock,
    });
    return res.status(200).json({ message: "Product Created Successfully!" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, price, description, category, inStock, quantity } = req.body;
    const { id } = req.params;
    if (!id && !isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid product id" });
    }
    const productUpdate = await Product.findByIdAndUpdate(id, {
      name,
      price,
      description,
      category,
      quantity,
      inStock,
      updatedAt: Date.now(),
    });

    if (!productUpdate) {
      return res
        .status(404)
        .json({ message: "No Product Found with this id!" });
    }
    return res.status(200).json({ message: "Product updated Successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id && !isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid product id" });
    }
    await Product.findByIdAndDelete(id);
    return res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Filtering and searching functionality

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
