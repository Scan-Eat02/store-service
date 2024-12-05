const express = require('express');
const cors = require('cors'); // Import the cors package
const app = express();
const port = 8088;

// Import the routes from the router directory
const router = require('./routes');

// Enable CORS for all routes
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Use the routes for all paths
app.use('/', router);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
