const { MongoClient, ObjectID} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const id = new ObjectID()
console.log(id)
console.log(id.getTimestamp())

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {

    if(error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)
    // db.collection('users').insertOne({
    //     name: 'Harisanker',
    //     age: 27
    // }, (error, result) => {
    //     if(error) {
    //         console.log('Unable to insert user')
    //     }

    //     console.log(result.ops)
    // })

    // db.collection('users').insertMany([
    //     {
    //         name: 'Test User 1',
    //         age: 20
    //     },
    //     {
    //         name: 'Test User 2',
    //         age: 40
    //     }
    // ], (error, result) => {
    //     if(error) {
    //         return console.log('Unable to insert document')
    //     }

    //     console.log(result.ops)
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'Task 1',
    //         completed: true,
    //     },
    //     {
    //         description: 'Task 2',
    //         completed: true
    //     },
    //     {
    //         description: 'Task 3',
    //         completed: false
    //     }
    // ], (error, result) => {
    //     if(error) {
    //         return console.log('Unable to insert tasks')
    //     }

    //     console.log(result.ops)
    // })

    // db.collection('users').findOne({_id: new ObjectID('5d5977708c1be82424258739')}, (error, user) => {

    //     if(error) {
    //         return console.log('Unable to fetch user')
    //     }

    //     console.log(user)
    // })

    // db.collection('users').find({age: 27}).toArray((error, users) => {
    //     console.log(users)
    // })

    // db.collection('users').find({age: 27}).count((error, count) => {
    //     console.log(count)
    // })

    // db.collection('tasks').findOne({_id: new ObjectID('5d59792247d27d1bb4c16335')}, (error, task) => {
    //     console.log(task)
    // })

    // db.collection('tasks').find({completed: true}).toArray((error, tasks) => {
    //     console.log(tasks)
    // })

    // const updatePromise = db.collection('users').updateOne({
    //     _id: new ObjectID("5d5971533dc6952a78e271f9")
    // },{
    //     $set: {
    //         name: 'Rahul'
    //     }
    // })

    // updatePromise.then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // db.collection('users').updateOne({
    //     _id: new ObjectID("5d5971533dc6952a78e271f9")
    // }, {
    //     $inc: {
    //         age: 1
    //     }
    // }).then((result) => {
    //     console.log(result)

    // }).catch((error) => {
    //     console.log(error)
    // })

    // db.collection('tasks').updateMany({
    //     completed: true
    // },{
    //     $set: {
    //         completed: false
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // db.collection('users').deleteMany({
    //     age: 27
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    db.collection('tasks').deleteMany({
        description: 'Task 1'
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })

})

