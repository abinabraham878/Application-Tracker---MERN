const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/dbConfig');
const cors = require('cors');

// Load Routes
const userRoutes = require('./routes/userRoutes');
const jobApplicationRoutes = require('./routes/jobApplicationRoutes');

dotenv.config({ path: './config/config.env' });

// Connect to MongoDB
connectDB();

// Initialize Express
const app = express();
app.use(express.json());
app.use(cors());

// PING Route
app.get('/ping-me', (req, res) => {
    res.status(200).json({ message: "Server is running!" });
});

// Routes
app.use('/api/user', userRoutes);
app.use('/api/job-application', jobApplicationRoutes);

// Port Configuaration
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));