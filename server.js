const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect Database
connectDB();

// Routes
app.use('/api/issues', require('./routes/issueRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

// Test Route
app.get('/', (req, res) => res.send('FixIt SL Backend Running!'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
