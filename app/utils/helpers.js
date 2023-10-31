// Helpers File

// Given a number, return the number with a random small variation of 0.1%
// This is to simulate the price fluctuation
const randomize = (num, deep = 1) => {
    const random = Math.random() * deep
    return num + random
}

export { randomize }