const request = require('supertest')
const app = require("../src/app")
const User = require('../src/models/users')
const { user_1, user_1_ID, populateDB } = require('./fixtures/db')

beforeEach(populateDB)

test('should sign up a new user', async () => {
    const res = await request(app).post('/users').send({
        name: 'Andrew',
        email: 'mahmoudamer95.bird@gmail.com',
        password: 'Mypass777!'
    }).expect(201)

    // Assert the database changed correctly
    const user = await User.findById(res.body.user._id)
    expect(user).not.toBeNull()

    // Assertions about response
    expect(res.body).toMatchObject({
        user: {
            name: 'Andrew',
            email: 'mahmoudamer95.bird@gmail.com'
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('Mypass777!')
})

test('should login existing User', async () => {
    const res = await request(app).post('/users/login').send({
        email: user_1.email,
        password: user_1.password
    }).expect(200)

    const user = await User.findById(user_1_ID)

    expect(res.body.token).toBe(user.tokens[1].token)
})

test("Shouldn't login faulty users", async () => {
    await request(app).post('/users/login').send({
        email: user_1.email,
        password: 'user_1.password'
    }).expect(400)
})

test('Should Get prof of user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${user_1.tokens[0].token}`)
        .send()
        .expect(200)
})

test('should not get un-auth users', async () => {
    await request(app).get('/users/me').send().expect(401)
})

test('should delete account', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${user_1.tokens[0].token}`)
        .send()
        .expect(200)

    const user = await User.findById(user_1_ID)
    expect(user).toBeNull()
})

test('should not delete account', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

test('Should Upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${user_1.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200)

    const user = await User.findById(user_1_ID)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${user_1.tokens[0].token}`)
        .send({
            name: 'miky'
        })
        .expect(200)

    const user = await User.findById(user_1_ID)
    expect(user.name).toBe('miky')
})

test('Shouldnt update valid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${user_1.tokens[0].token}`)
        .send({
            height: 28
        })
        .expect(400)
})