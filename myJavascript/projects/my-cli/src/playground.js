process.stdout.write("Hello World!\n");

process.argv.map((val, idx, arr) => {
  console.log(`${idx}: ${val}`);
});

const isNumber = process.argv.every((val, index) => {
  return typeof val === "number";
});

const isString = ["a", "b", "c"].every((val) => {
  return typeof val === "string";
});

console.log(isString);

console.log("ww12345".slice(4));
