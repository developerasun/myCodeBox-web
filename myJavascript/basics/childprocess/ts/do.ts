import { exec } from "child_process";
import fs from "fs";

// files: string[]
const files = fs.readdirSync(__dirname, {
  encoding: "utf-8",
  withFileTypes: false,
});

console.log(files);

// iterate files in directory and execute them
files.forEach((file, index) => {
  if (index > 0) {
    exec(`ts-node ${file}`, (err, stdout, stderr) => {
      if (err) console.error(err.message);
      if (stderr) console.log(stderr);
      console.log(stdout);
    });
  }
});

// exec("ts-node execMe.ts", (err, stdout, stderr) => {
//   if (err) console.error(err.message);
//   if (stderr) console.log(stderr);
//   console.log(stdout);
// });
