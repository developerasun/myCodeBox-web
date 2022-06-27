const { exec } = require("child_process");

// stdout: output logged in terminal
// stderr: command executed but there is some error in terminal
exec("node executeMe.js", (error, stdout, stderr) => {
  if (error) console.error(error.message);
  if (stderr) console.error(error.message);

  console.log(stdout);
});
