console.log(global.process.versions);
console.log(process.cwd()); // current dir
console.log(__dirname);
console.log(process.stdout.write("wow!"));
process.chdir("./newDir");
console.log(process.cwd()); // newDir
