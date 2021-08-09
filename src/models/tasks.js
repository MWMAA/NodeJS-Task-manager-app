const mongoose = require('mongoose')


const taskSchema = new mongoose.Schema({
    description: {
        required: true,
        type: String,
        trim: true
    },
    completed: {
        default: false,
        type: Boolean
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})


const tasks = mongoose.model('tasks', taskSchema)

module.exports = tasks