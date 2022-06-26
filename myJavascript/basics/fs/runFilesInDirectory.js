const { execFile } = require('child_process')
const fs = require('fs')

const files = fs.readdirSync(__dirname)
console.log(files)
// const child = execFile('node', ['ss.js'], (err, stdout, stderr) => {
//     if (err) throw err
//     console.log(stdout)
// })

files.forEach((file, index) => {
    if (index < 2) {
        execFile('node', [file], (error, stdout, stderr) => {
            if (error) throw error
            console.log(stdout)
        })
    }
})

// const files = fs.readdirSync(__dirname)
// // exec(`ts-node ${files[0]}.ts`)
// function execute() {
//     execFile('./check.ts')
//     // files.forEach((file, index) => {
//     //     console.log(`ts-node ${__dirname.slice(-3)}/${file}`)
//     //     if (index < files.length - 1) execFile(file)

//     //     // exec(file)
//     //     // exec.bind(null, `node ${__dirname.slice(-3)}/${file}`)
//     // })
// }

// execute()

// console.log(fs.readFileSync(__filename).toString())
// console.log(__filename)
