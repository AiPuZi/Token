const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// Load configuration file
const config = require('./config.json');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the "web" directory
app.use(express.static(path.join(__dirname, 'web')));

// Your existing API routes and middleware
// ...

const PORT = config.port || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});