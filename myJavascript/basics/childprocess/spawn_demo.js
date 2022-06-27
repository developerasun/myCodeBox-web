"use strict";
const { spawn } = require("child_process");

// The child_process.spawn() method spawns a new process using the givencommand,
// with command-line arguments in args.
// If omitted, args defaults to an empty array.
// spawn(command, [cli-options])
const child = spawn("dir", []);

child.stdout.addListener("data", (data) => {
  console.log("stdout: ", data);
});

child.stderr.addListener("data", (data) => {
  console.log("stderr: ", data);
});

child.addListener("error", (error) => {
  console.log(error.message);
});

child.addListener("exit", (exitCode, signal) => {
  if (exitCode) console.log(exitCode);
  if (signal) console.log("process killed with signal: ", signal);
  console.log("done");
});
