const mongoose = require('mongoose');

const ureSchema = new mongoose.Schema({
    taskid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    updatedDate: {
        type: Date,
        required: true
    },
    createdDate: {
        type: Date,
        required: true
    }
})

const Ure = mongoose.model('Ure', ureSchema)

module.exports = Ure