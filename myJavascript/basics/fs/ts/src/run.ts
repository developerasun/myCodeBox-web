import { execFile } from "child_process";
import { readdirSync } from "fs";

// add tsconfig.json and set configs: outDir, rootDir, includes

// contain js files
const onlyJs: string[] = [];

// read files in directory
const files = readdirSync(__dirname, { encoding: "utf-8" });

// filter certain files
files.forEach((val) => {
  if (val.includes("one.js") || val.includes("two.js")) onlyJs.push(val);
});

// console.log(onlyJs);

// run and compile ts to js to execute: tsc (filename-here)
onlyJs.forEach((file, index) => {
  execFile(`node`, [file], (error, stdout, stderr) => {
    if (error) {
      throw error;
    }
    console.log(stdout);
  });
});
