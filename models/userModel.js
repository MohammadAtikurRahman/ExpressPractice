const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    userEmail: { type: String, required: true, unique: true },
    userPhone: { type: String, required: true },
    userPassword: { type: String, required: true },
    userType: { type: String, required: true },
    userId: { type: String, required: true },
    userProfileId: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

