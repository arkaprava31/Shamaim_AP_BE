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
                const userDetails = await Users.findById(order.user).lean();
                return {
                    ...order.toObject(),
                    userDetails
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