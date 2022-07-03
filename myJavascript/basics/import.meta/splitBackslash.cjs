const path = require("path");
const currentFileURL = path.join("file://", __filename);
const splited = currentFileURL.split("\\").join("/"); // split backslash
console.log(splited);
console.log(splited === currentFileURL);
console.log(currentFileURL);

// 'file:///C:/Users/nello/go/src/github.com/designerasun/myCodeBox-web/myJavascript/basics/import.meta/app.js'
// file:\C:\Users\nello\go\src\github.com\designerasun\myCodeBox-web\myJavascript\basics\import.meta\w.cjs
