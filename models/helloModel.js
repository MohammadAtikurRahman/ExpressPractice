const mongoose = require('mongoose');

const helloSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Hello', helloSchema);
