const express = require('express');
const mongoose = require('mongoose');
const Products = require('../models/Products');

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

        const deletedProduct = await Products.findByIdAndDelete(_id);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found!' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
})

module.exports = router;