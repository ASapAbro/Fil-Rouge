const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { 
        type: String ,
        required : true,
        minlength:10,
        maxlength:20,
    },
    createdAt: { type: Date, default: Date.now },
    user:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }

});

module.exports = mongoose.model('Contact', ContactSchema);