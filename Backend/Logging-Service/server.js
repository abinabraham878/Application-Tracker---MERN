const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/dbConfig');
const cors = require('cors');
const consumeMessage = require('./Consumer/rabbitmqConsumer');

// Load environment variables
dotenv.config({ path: './config/config.env' });

// Connect to MongoDB
connectDB();

// Initialize Express
const app = express();
app.use(express.json());
app.use(cors());

// PING Route
app.get('/ping-me', (req, res) => {
  res.status(204).send();  // Returning 204 No Content as no body is needed
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);  // Log the error
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Port Configuration
const PORT = process.env.PORT || 5000;

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Start consuming RabbitMQ messages after server starts
consumeMessage();

// Graceful Shutdown for Clean Exit
const gracefulShutdown = () => {
  console.log("Shutting down gracefully...");
  server.close(() => {
    console.log("Closed server.");
    process.exit(0);
  });
};

// Handle termination signals for graceful shutdown
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);