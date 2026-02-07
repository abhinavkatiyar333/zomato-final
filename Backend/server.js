// start server
require('dns').setDefaultResultOrder('ipv4first');
require('dotenv').config();

const app = require('./src/app');
const connectDB = require('./src/db/db');

// Connect database
connectDB();

// Use dynamic port for deployment
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Increase timeout to 5 minutes for video uploads
server.timeout = 300000;
