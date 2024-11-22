
// managers/SocketManager.js
const Contact = require('../models/conatcts');
const Message = require(('../models/message'))

class SocketManager {
    constructor(wss) {
        this.wss = wss;
        this.init();
    }

    init() {
        // Set up WebSocket connection handling
        this.wss.on('connection', (ws) => {
            console.log('New client connected'); // Optional: log the new connection

            // Listen for messages from the client
            ws.on('message', (message) => {
                // Parse the message from the client
                const data = JSON.parse(message);
                console.log()
                // Check if the message type is 'updateStatus'
                if (data.type === 'updateStatus') {
                    this.handleStatusUpdate(data, ws);
                } else if (data.type === 'sendMessage') {
                    this.handleSendMessage(data, ws);
                } else if (data.type === 'getMessages') {
                    this.handleGetMessages(data, ws);
                }
            });

            ws.on('close', () => {
                console.log('Client disconnected');
            });
        });
    }

    async handleStatusUpdate(data, ws) {
        const { contactId, status } = data;

        try {
            // Update the status in the Contact model
            const updatedContact = await Contact.findOneAndUpdate(
                { contact: contactId },
                { status: status },
                { new: true }
            );


            if (updatedContact) {
                // Broadcast the status change to all connected clients
                this.wss.clients.forEach(client => {
                    if (client.readyState === ws.OPEN) {
                        client.send(JSON.stringify({ type: 'statusUpdate', contactId, status }));
                    }
                });
            } else {
                console.error('Contact not found');
            }
        } catch (error) {
            console.error('Error updating status:', error);
            ws.send(JSON.stringify({ error: error.message }));
        }
    }

    async handleSendMessage(data, ws) {
        const { sender, recipient, content } = data;
        const message = new Message({
            sender: sender,
            recipient,
            content
        });

        try {
            await message.save();
            this.wss.clients.forEach(client => {
                if (client.readyState === ws.OPEN) {
                    client.send(JSON.stringify({ type: 'newMessage', sender, recipient, content }));
                }
            });
        }
        catch (e) {
            ws.send(JSON.stringify({ error: 'Failed to update status' }));
        }
    };

    async handleGetMessages(data, ws) {
        const { sender, recipient } = data;
        try {
            const messages = await Message.find({
                $or: [
                    {
                        sender: sender, recipient: recipient
                    },
                    {
                        sender: recipient, recipient: recipient
                    }
                ]
            }).sort({ timestamp: 1 });

            this.wss.clients.forEach(client => {
                if (client.readyState === ws.OPEN) {
                    client.send(JSON.stringify({ type: "allMessages", messages: messages }))
                }
            });


        }
        catch (error) {
            ws.send(JSON.stringify({ error: error.message }));
        }
    }
}

module.exports = SocketManager;
