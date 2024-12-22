const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  Style: { type: String, required: true },
  genre: { type: [String], required: true },
  ProductCode: { type: String, required: true },
  SleeveLength: { type: String, required: true },
  Fit: { type: String, required: true },
  NeckType: { type: String, required: true },
  Pattern: { type: String, required: true },
  AboutTheDesign: { type: String, required: true },
  Material: { type: String, required: true },
  GSM: { type: String, required: true },
  NetQTY: { type: String, required: true },
  CountryOfOrigin: { type: String, required: true },
  CareInstructions: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female'], required: true },
  color: { type: String, required: true },
  size: { type: [String], required: true },
  stock: {
    M: { type: Number, default: 0 },
    L: { type: Number, default: 0 },
    XL: { type: Number, default: 0 },
  },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  price: { type: Number, required: true },
  discountPercentage: { type: Number, required: true },
  thumbnail: { type: String, required: false },
  images: { type: [String], required: false }
}, {
  timestamps: true
});

const Products = mongoose.model('Products', productSchema);

module.exports = Products;
