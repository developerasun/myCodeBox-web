// console.log(globalThis)

globalThis.setTimeout(()=> {
    console.log("Let's stop the setInterval")
    clearInterval(count)
},3000)

const count = setInterval(()=> { 
    console.log("using setInterval")
},1000)

console.log(__dirname)
console.log(__filename)
