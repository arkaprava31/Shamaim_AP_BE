const express = require('express');
const mongoose = require('mongoose');
const Products = require('../models/Products');

const admin = require('../utils/firebaseAdmin');
const { getStorage } = require("firebase-admin/storage");

const router = express.Router();

router.post('/newProduct', async (req, res) => {
    try {
        const { product } = req.body;

        const newProduct = new Products(product);

        await newProduct.save();
        res.status(201).json({ message: "New product is added." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.put('/updateProduct/:id', async (req, res) => {
    try {
        const { product } = req.body;
        const { id } = req.params;

        if (!product) {
            return res.status(400).json({ message: "Product data is required." });
        }

        const updatedProduct = await Products.findByIdAndUpdate(
            id,
            { $set: product },
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found." });
        }

        console.log(updatedProduct);

        res.status(200).json({ message: "Product updated successfully.", updatedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


router.get('/allProducts', async (req, res) => {
    try {
        const allProducts = await Products.find();

        res.status(201).json(allProducts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/getProduct/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const pdt = await Products.findById(id);

        if (!pdt) {
            return res.status(404).json({ message: 'Product not found!' });
        }

        res.status(201).json(pdt);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/deleteProduct/:_id', async (req, res) => {
    try {
        const { _id } = req.params;

        console.log("Delete request received for product ID:", _id);

        const product = await Products.findById(_id);

        if (!product) {
            console.log("Product not found in DB");
            return res.status(404).json({ message: 'Product not found!' });
        }

        console.log("Product found:", product.title);

        const bucket = getStorage().bucket();

        console.log("Bucket name:", bucket.name);

        // Delete thumbnail
        if (product.thumbnail) {
            try {
                const filePath = decodeURIComponent(
                    product.thumbnail.split("/o/")[1].split("?")[0]
                );

                console.log("Deleting thumbnail:", filePath);

                await bucket.file(filePath).delete();

                console.log("Thumbnail deleted successfully");
            } catch (err) {
                console.log("Error deleting thumbnail:", err.message);
            }
        }

        // Delete product images
        if (product.images && product.images.length > 0) {
            for (const img of product.images) {
                try {
                    const filePath = decodeURIComponent(
                        img.split("/o/")[1].split("?")[0]
                    );

                    console.log("Deleting image:", filePath);

                    await bucket.file(filePath).delete();

                    console.log("Image deleted successfully");
                } catch (err) {
                    console.log("Error deleting image:", err.message);
                }
            }
        }

        // Delete product from DB
        const deletedProduct = await Products.findByIdAndDelete(_id);

        console.log("Product removed from database");

        res.status(200).json({ message: 'Product deleted successfully' });

    } catch (error) {
        console.log("Server error while deleting product:", error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;