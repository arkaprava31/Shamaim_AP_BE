const express = require('express');
const mongoose = require('mongoose');
const Orders = require('../models/Orders');

const router = express.Router();

router.get('/allOrders', async (req, res) => {
    try {

        const allOrders = await Orders.find();

        res.status(201).json(allOrders);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;