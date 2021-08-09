const request = require('supertest')
const Task = require('../src/models/tasks')
const app = require("../src/app")
const { user_1,
    user_1_ID,
    user_2,
    user_2_ID,
    populateDB,
    task_1,
    task_2,
    task_3
} = require('./fixtures/db')

beforeEach(populateDB)

test('should create task for user', async () => {
    const res = await request(app)
        .post('/tasks').set('Authorization', `Bearer ${user_1.tokens[0].token}`)
        .send({
            description: 'From the test Framework'
        }).expect(201)
    const task = await Task.findById(res.body._id)

    expect(task).not.toBeNull()
    expect(task.completed).toBe(false)
})

test('Gets all tasks for user_1', async () => {
    const res = await request(app).get('/tasks')
        .set('Authorization', `Bearer ${user_1.tokens[0].token}`)
        .send().expect(200)

    expect(res.body.length).toBe(2)
})

test('shouldnt delete tasks not owned by you', async () => {
    const res = await request(app).delete(`/tasks/${task_1._id}`)
        .set('Authorization', `Bearer ${user_2.tokens[0].token}`)
        .send().expect(404)
    const task = await Task.findById(task_1._id)
    expect(task).not.toBeNull()
})


// Extra tests
// User Test Ideas
//
// Should not signup user with invalid name/email/password
// Should not update user if unauthenticated
// Should not update user with invalid name/email/password
// Should not delete user if unauthenticated

//
// Task Test Ideas
//
// Should not create task with invalid description/completed
// Should not update task with invalid description/completed
// Should delete user task
// Should not delete task if unauthenticated
// Should not update other users task
// Should fetch user task by id
// Should not fetch user task by id if unauthenticated
// Should not fetch other users task by id
// Should fetch only completed tasks
// Should fetch only incomplete tasks
// Should sort tasks by description/completed/createdAt/updatedAt
// Should fetch page of tasks