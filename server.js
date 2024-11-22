
const express = require('express');
const http = require('http');
const path = require('path');
const WebSocket = require('ws');  // Use the ws library
const connectDB = require('./config/db');

// Routes
const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');
const messageRoutes = require('./routes/messageRoutes');
const SocketManager = require('./managers/socketManager');

require('dotenv').config();

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Database connection
connectDB();

// Middleware
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoutes);
app.use('/api/messages',messageRoutes);
app.use(express.static(path.join(__dirname, 'public')));

// Set up WebSocket manager
new SocketManager(wss);

// Serve HTML file for testing WebSocket connection
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
