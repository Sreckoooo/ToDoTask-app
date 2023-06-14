const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: false
    },
    dueDate: {
        type: Date,
        required: true
    },
    updatedDate: {
        type: Date,
        required: true
    }
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo