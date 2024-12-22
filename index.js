const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5050;

const connectDB = require('./config/db');

app.use(express.json());
app.use(cors());

connectDB();

const productRoutes = require('./routes/productRoute');
const orderRoutes = require('./routes/orderRoute');

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use('/api', productRoutes);
app.use('/api', orderRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
