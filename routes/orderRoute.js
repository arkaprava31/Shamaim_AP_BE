const express = require('express');
const mongoose = require('mongoose');
const Orders = require('../models/Orders');
const Users = require('../models/Users');

const router = express.Router();

router.get('/allOrders', async (req, res) => {
    try {

        const allOrders = await Orders.find();

        const ordersWithUserDetails = await Promise.all(
            allOrders.map(async (order) => {

                const calculatedTotalAmount = order.items.reduce((total, item) => {
                    return total + item.units * item.selling_price;
                }, 0);

                return {
                    ...order.toObject(),
                    calculatedTotalAmount
                };
            })
        );

        res.status(201).json(ordersWithUserDetails);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;