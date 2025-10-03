require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const razorpayRoute = require('./routes/razorpay');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');

const app = express();

// Connect to MongoDB
connectDB();

// Body parser
app.use(express.json());

// CORS configuration
const allowedOrigins = [
  'https://b-shopy.netlify.app', // production frontend
  'http://localhost:5173'        // local frontend (adjust port if needed)
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allow Postman or curl
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/razorpay', razorpayRoute);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
