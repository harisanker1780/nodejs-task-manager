const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/db/models/task')
const { userOneId, userOne, setupDatabase}  = require('./fixtures/db')

beforeEach(async () => {
   await setupDatabase()
})

test('Should create a task for the user', async () => {
    const response = await request(app)
    .post('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        description: 'Testing Task',
        completed: false,
    }).expect(201)

    const task = Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toEqual(false)
})