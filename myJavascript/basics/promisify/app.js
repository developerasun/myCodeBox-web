const fs = require("fs");
const util = require("util");

// readFile method is based on callback
fs.readFile("./app.js", (err, data) => {
  if (err) console.error(err);
  else console.log(data.toString());
});

console.log("=====================");

const readFile = util.promisify(fs.readFile);

// now readFile is based on promise
readFile("./app.js", { encoding: "utf-8" })
  .then((val) => console.log(val))
  .catch((err) => console.log(err))
  .finally(() => console.log("all done"));

console.log("=====================");

// or use await/async

async function useWithAsyncAwait() {
  const result = await readFile("./app.js", { encoding: "utf-8" });
  console.log(result);
}

useWithAsyncAwait();
