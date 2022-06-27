const { execFile } = require("child_process");

const myFunc = () => {
  console.log("Ww");
};

myFunc();

execFile("node executeMe.js", (err, stdout, stderr) => {
  if (err !== null) console.error(err.message);
  if (stderr !== null) console.error(stderr);

  console.log(stdout);
});
