const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://shamaimlifestyle:MXJsc3m5nhH0yr8v@shamaimbackend.lraiidg.mongodb.net/");
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
