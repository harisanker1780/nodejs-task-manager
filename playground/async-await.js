
const add = (a, b) => {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(a < 0 || b < 0) {
                return reject('Number must be non-negative')
            }
            resolve( a + b)
        }, 2000)
    })
}

const doWork = async () => {
    const sum = await add(1, 99)
    const sum1 = await add(sum, -50)
    const sum2 = await add(sum1, 3)
    return sum2;
}

doWork().then((result) => {
    console.log(result)
}).catch((e) => {
    console.log('Error',  e)
})

