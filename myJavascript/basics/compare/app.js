// create two objects
const sally = { 
    name : 'sally'
}

const jake = {
    name : 'jake' ,
    sayHi(){
        console.log(`hi, ${this.name}`)
    }
}


// compare two objects
console.log(sally === jake) // false
console.log(jake === jake) // true
console.log( { name : "jake" } ===  { name : "jake" }) // false, object compares by reference
console.log( 5 === 5 ) // true, primitive compares by value
console.log([1] === [1]) // false

const checkJake = jake // assign the same reference
jake.sayHi() // hi, jake
checkJake.sayHi() // hi, jake 
console.log(checkJake === jake) // true, object compares by reference