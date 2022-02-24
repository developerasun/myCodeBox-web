// DOM - HTMLDocument(in web browser). The HTMLDocument object represents
// the whole HTML document. All objects inherits Node object so they have 
// the Node object's method as well. 

console.log(document.childNodes); // document.childNodes[0] : !HTML Doctype, 
// document.childNodes[1] : HTML

for (let i=0; i<document.childNodes.length; i++) {
    console.log(i); 
}

console.log(document.title); 
console.log(location.href); 
console.log(location.toString()); 