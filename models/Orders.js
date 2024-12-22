const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    items: [
        {
            id: { type: Schema.Types.ObjectId, required: true },
            sku: { type: String, required: true },
            name: { type: String, required: true },
            units: { type: Number, required: true },
            selling_price: { type: Number, required: true },
            thumbnail: { type: String, required: true },
            selectedAddress: { type: Schema.Types.Mixed, required: true },
            quantity: { type: Number, required: true },
            size: { type: Schema.Types.Mixed, required: true }, 
            productid: { type: Schema.Types.ObjectId, required: true }
        }
    ],
    totalAmount: { type: Number, required: true },
    totalItems: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, required: true },
    paymentDetails: { type: [Schema.Types.Mixed], required: true },
    shiprocketResponse: { type: [Schema.Types.Mixed], required: false },
    status: { type: String, enum: ['pending', 'shipped', 'delivered', 'cancelled'], default: 'pending' }
}, { timestamps: true });

const Orders = mongoose.model('Orders', orderSchema);

module.exports = Orders;
