
const lists = require('./lists')

console.log(lists.people)
console.log(lists.pets)
console.log(lists) // contains people and pets 

// import multiples files individually with destructuring
const { people : Human, pets : Animal } = require('./lists')
console.log(Human, Animal)

// built-in module
const os = require('os')
console.log(os.homedir(), os.platform())