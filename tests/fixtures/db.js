const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../../src/models/users')
const Task = require('../../src/models/tasks')

const user_1_ID = new mongoose.Types.ObjectId()
const user_1 = {
    _id: user_1_ID,
    name: 'MWMA',
    email: 'MWMA@exapmle.com',
    password: 'MWMA12345!',
    tokens: [{
        token: jwt.sign({ _id: user_1_ID }, process.env.JWT_SECRET)
    }]
}

const user_2_ID = new mongoose.Types.ObjectId()
const user_2 = {
    _id: user_2_ID,
    name: 'MWMAA',
    email: 'MWMAA@exapmle.com',
    password: 'MWMAA12345!',
    tokens: [{
        token: jwt.sign({ _id: user_2_ID }, process.env.JWT_SECRET)
    }]
}

const task_1 = {
    _id: new mongoose.Types.ObjectId(),
    description: 'from the DB',
    completed: false,
    owner: user_1_ID
}

const task_2 = {
    _id: new mongoose.Types.ObjectId(),
    description: 'from the Dooby',
    completed: true,
    owner: user_1_ID
}

const task_3 = {
    _id: new mongoose.Types.ObjectId(),
    description: 'men henak',
    completed: false,
    owner: user_2_ID
}

const populateDB = async () => {
    await User.deleteMany()
    await Task.deleteMany()
    await new User(user_1).save()
    await new User(user_2).save()
    await new Task(task_1).save()
    await new Task(task_2).save()
    await new Task(task_3).save()
}

module.exports = {
    user_1,
    user_1_ID,
    user_2,
    user_2_ID,
    populateDB,
    task_1,
    task_2,
    task_3
}