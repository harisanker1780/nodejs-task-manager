require('../src/db/mongoose')
const User = require('../src/db/models/user')
const Task  = require('../src/db/models/task')


// User.findByIdAndUpdate('5d5ec7f3ef89870de4d39f7f', {age: 29}).then((user) => {
//     console.log(user)
//     return User.countDocuments({age:28})
// }).then((result) => {
//     console.log(result)
// }).catch((error) => {
//     console.log(error)
// })

// Task.findByIdAndDelete('5d5eca453cea5963c013ebd8').then((task) => {
//     console.log(task)
//     return Task.countDocuments({completed: true})
// }).then((result) => {
//     console.log(result)
// }).catch((error) => {
//     console.log(error)
// })

// const updateAgeAndCount = async (id, age) => {
//     const user = await User.findByIdAndUpdate(id, {age})
//     const count = await User.countDocuments({age})
//     return count
// }

// updateAgeAndCount('5d5ec7f3ef89870de4d39f7f', 40).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log('Error', e)
// })

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed: true})
    return count
}

deleteTaskAndCount('5d5ed4a88fbd9b2d109ded97').then((result) => {
    console.log(result)
}).catch((e) => {
    console.log('Error', e)
})