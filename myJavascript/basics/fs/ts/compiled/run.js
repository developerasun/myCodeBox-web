"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const fs_1 = require("fs");
// contain js files
const onlyJs = [];
// read files in directory
const files = (0, fs_1.readdirSync)(__dirname, { encoding: "utf-8" });
// filter certain files
files.forEach((val) => {
    if (val.includes("one.js") || val.includes("two.js"))
        onlyJs.push(val);
});
// console.log(onlyJs);
// run and compile ts to js to execute: tsc (filename-here)
onlyJs.forEach((file, index) => {
    (0, child_process_1.execFile)(`node`, [file], (error, stdout, stderr) => {
        if (error) {
            throw error;
        }
        console.log(stdout);
    });
});
