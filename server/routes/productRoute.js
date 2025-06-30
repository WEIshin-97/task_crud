import express from "express";
import { Product } from "../models/Product.js";
import verifyToken from "../middleware/auth.js";
const router = express.Router();

// get all products
router.get("/", verifyToken, async (req, res) => {
  try{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    let products;
    let count;
    if(req.user.role === "admin") {
      products = await Product.find({})
                              .limit(parseInt(limit))
                              .skip((parseInt(page) - 1) * parseInt(limit))
                              .populate("createdBy", "username role");
      count = await Product.countDocuments();

    }else {
      products = await Product.find({ createdBy: req.user.id })
                              .limit(parseInt(limit))
                              .skip((parseInt(page) - 1) * parseInt(limit));
      count = await Product.countDocuments({ createdBy: req.user.id });
            
    }

    return res.status(200).json({
      total: count,
      page: parseInt(page),
      pageSize: parseInt(limit),
      data: products,
    });

  }catch(err){
    console.log(err.message);
    return res.status(500).json({ message: "Server error: "+ err.message });

  }
});

// get product by id
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const product = await Product.findOne({_id: req.params.id});

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (req.user.role !== "admin" && product.createdBy._id.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    return res.status(200).json(product);
    
  } catch (err) {
    console.error("Error fetching product:", err.message);
    return res.status(500).json({ message: "Server error: "+ err.message });
  }
});

// create product
router.post("/", verifyToken, async (req, res) => {
  try {
    const product = new Product({ 
      ...req.body, 
      createdBy: req.user.id, 
      updatedBy: req.user.id
    });
    await product.save();
    
    return res.status(200).json({ message: "Create Product Successfully" });

  } catch (err) {
    console.error("Error create product:", err.message);
    return res.status(500).json({ message: "Server error: "+ err.message });
  }
});

// update product by id
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body, updatedBy: req.user.id},
      { new: true }
    );
    return res.status(200).json({product: product, message: "Update Product Successfully" });

  } catch (err) {
    console.error("Error update product:", err.message);
    return res.status(500).json({ message: "Server error: "+ err.message });
  }
});

// delete product by id
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Product.findOneAndDelete({ _id: req.params.id });
    return res.status(200).json({ message: "Delete Product Successfully" });

  } catch (err) {
    console.error("Error delete product:", err.message);
    return res.status(500).json({ message: "Server error: "+ err.message });
  }
});

export default router;

