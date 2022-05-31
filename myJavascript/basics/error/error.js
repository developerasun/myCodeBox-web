class Dummy {
    // define a custom error
    returnErr() {return new Error("some error")}
}

// create an instance
const dummy = new Dummy()
console.log(dummy.returnErr())

// check instance
console.log(dummy instanceof Dummy)