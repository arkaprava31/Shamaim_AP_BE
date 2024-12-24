const mongoose = require('mongoose');
const { Schema } = mongoose;

const addressSchema = new Schema({
    name: { type: String, required: false },
    email: { type: String, required: false },
    phone: { type: String, required: false },
    street: { type: String, required: false },
    city: { type: String, required: false },
    state: { type: String, required: false },
    pinCode: { type: String, required: false }
});

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user', enum: ['user', 'admin'] },
    addresses: [addressSchema],
    resetPasswordToken: { type: String, default: '' },
}, {
    timestamps: true
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;
