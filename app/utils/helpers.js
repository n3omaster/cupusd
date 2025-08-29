// Given a number, return the number with a random small variation of 0.1%
// This is to simulate the price fluctuation
const randomize = (num, deep = 1) => {
    const random = Math.random() * deep
    return num - deep + random
}

// lets creaate a function where gets an array of objects and do the following things:
// take the first object.value and store it in a variable
// take the rest of the objects and create a average of the object.value
// return both values
const averageData = (arr) => {
    const [first, ...rest] = arr
    if (rest.length === 0) return { first, average: first.value }
    const average = rest.reduce((acc, curr) => acc + curr.value, 0) / rest.length
    return { first, average }
}

export { randomize, averageData }