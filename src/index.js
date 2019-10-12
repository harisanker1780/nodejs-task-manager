const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})


// const Task = require('./db/models/task')
// const User = require('./db/models/user')

// const main = async() => {
//     // const task = await Task.findById('5d6bfcd55332518c305e7df5')
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner)

//     const user = await User.findById('5d6bf0860fcaaf6dec6d6564')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }

// main()
