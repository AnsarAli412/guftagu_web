const Message = require('../models/message');
const ResponseHandler = require('../utils/responseHandler.js');
const { getIdFromToken } = require('../utils/jwt.js');

exports.sendMessage = async (req, res) => {
    const { recipient, content } = req.body;
    let userId = getIdFromToken(req);
    try {
        const message = new Message(
            {
                sender: userId,
                recipient,
                content
            }
        );
        await message.save();
        return ResponseHandler.success(res,null,"Message send successfully");

    }
    catch (e) {
        return ResponseHandler.serverError(res, e);
    }
}

exports.getMessage = async (req, res) => {
    let userId = getIdFromToken(req);
    let recipientId = req.params.id;
    try {
        const messages = await Message.find({
            $or: [
                {
                    sender: userId, recipient: recipientId
                },
                {
                    sender: recipientId, recipient: userId
                }
            ]
        }).sort({timestamp:1});

        if(!messages) return ResponseHandler.success(res,null,"Message not available");
        return ResponseHandler.success(res,messages,"Message fetched successfully");
    }

    catch (e) {
        return ResponseHandler.serverError(res, e);
    }
}