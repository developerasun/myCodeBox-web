import chalk from "chalk";
console.log(import.meta);

console.log(chalk.green.underline("DONE"));
console.log(chalk.red.bold("RED PREFIX IN TERMINAL"));
console.log(import.meta.url);

const filename = import.meta.url.split("/").pop(); // __filename is not defined in ESM
const dirname = import.meta.url.split("/").slice(3, -1).join("/"); // __dirname is not defined in ESM

console.log(filename);
console.log(dirname);

// console.log(__dirname); // error
// console.log(__filename); // error
