const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/dbConfig');
const cors = require('cors');

// Load Routes
const userRoutes = require('./routes/userRoutes');
const jobApplicationRoutes = require('./routes/jobApplicationRoutes');

// Load environment variables from .env file
dotenv.config({ path: './config/config.env' });

// Connect to MongoDB
connectDB();

// Initialize Express
const app = express();
app.use(express.json());
app.use(cors());

// PING Route
app.get('/ping-me', (req, res) => {
    res.status(204).send(); // Returning 204 No Content as no response body
});

// Routes
app.use('/api/user', userRoutes);
app.use('/api/job-application', jobApplicationRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Port Configuration
const PORT = process.env.PORT || 5000;
const ENV = process.env.NODE_ENV || 'development'; // Get the environment (default to 'development')

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running in ${ENV} mode on port ${PORT}`);
});
