const request = require('supertest')
const app = require('../src/app')
const User = require('../src/db/models/user');
const { userOneId, userOne, setupDatabase}  = require('./fixtures/db')

beforeEach(async () => {
    await setupDatabase()
})

test('Should signup a user', async () => {
    const response = await request(app).post('/users').send({
        name: 'Test User',
        email: 'test1234@mail.com',
        password: 'Test@123',
        age: 25
    }).expect(201)

    // Assert that database was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    // Assertion about the response
    expect(response.body).toMatchObject({
        user: {
            name: 'Test User',
            email: 'test1234@mail.com'
        },
        token: user.tokens[0].token
    })


    expect(user.password).not.toBe('Test@123')
})

test('Should login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    const user = await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should not login nonexistent user', async () => {
    await request(app).post('/users/login').send({
        email: 'testnonexistent@mail.com',
        password: 'Test@123'
    }).expect(400)
})

test('Should get profile for user', async () => {
    await request(app)
          .get('/users/me')
          .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
          .send()
          .expect(200)
})

test('Should not get profile for unauthentiated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Should delete account for user', async () => {
    await request(app)
            .delete('/users/me')
            .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
            .send()
            .expect(200)

    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test('Should not delete the account for unauthenticated user', async () => {
    await request(app)
            .delete('/users/me')
            .send()
            .expect(401)
})

test('Should upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/inte.png')
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid user fields', async () => {
    await request(app)
        .patch('/users/me/')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'Test User 12334',
            email: 'testuser12334@mail.com',
            age: 23,
        }).expect(200)

    const user = await User.findById(userOneId)
    expect(user).toMatchObject({
            name: 'Test User 12334',
            email: 'testuser12334@mail.com',
            age: 23
    })
})

test('Should not update invalid user fields', async () => {
    await request(app)
        .patch('/users/me/')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            location: 'Bangalore',
        }).expect(400)
})