const Contact = require('../models/conatcts');
const ResponseHandler = require('../utils/responseHandler');
const { getIdFromToken } = require('../utils/jwt');

exports.getContacts = async (req, res) => {
    try {
        let userid = getIdFromToken(req);
        let contacts = await Contact.find({ user: userid });
        //.populate('conact', 'username avatar status')
        return ResponseHandler.success(res, contacts, "Contacts fetched successfully");
    } catch (e) {
        return ResponseHandler.serverError(res, e);
    }
}

exports.addContact = async(req,res)=>{
    try{
        const {contactId} = req.body;
    let userId = getIdFromToken(req);
    let existingContact = await Contact.findOne({user:userId,contact:contactId});
    if(existingContact) return ResponseHandler.badRequest(res,"Conatct alredy exists");

    let newContact = new Contact({user:userId,contact:contactId});
    await newContact.save();
    }
    catch (e) {
        return ResponseHandler.serverError(res, e);
    }
}

exports.removeContact = async (req,res)=>{
    try{
        const {conatctId} = req.body;
        let userId = getIdFromToken(req);
        await Contact.findOneAndDelete({user:userId,contact:conatctId});
        return ResponseHandler.success(res,null,"Conact removed successfully");
    }
    catch (e) {
        return ResponseHandler.serverError(res, e);
    }
}