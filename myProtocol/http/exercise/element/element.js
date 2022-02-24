// DOM is not only for controling HTML but provides a standard to 
// control markup languages like XML, SVG, XUL. Each markup language
// is added to Element object (HTMLElement, SVGElement, XMLElement ... etc)
// DOM - Element - HTMLElement - HTMLLIElement
//               - SVGElement - xxxElement ...
//               - XMLElement - yyyElement ...

// Element API 1) tagName
const whatIsIt = document.querySelector(".grabMe"); 
console.log(whatIsIt.tagName); // result : LI. Tag name is immutable

console.log(whatIsIt.id); // result : grabMe id
whatIsIt.id = "not grabMe id";
console.log(whatIsIt.id); // result : grabMe id. id property is mutable

// Element API 2) classList
console.log(whatIsIt.classList); // result : DOMTokenList (a list of class names)
console.log(whatIsIt.classList[0]); // result : grabMe
whatIsIt.classList.add("helloWorld"); // white space not allowed when adding class name in DOMTokenList
whatIsIt.classList.add("goodbyeWorld");
console.log(whatIsIt.classList[1]); // result : helloWorld

for (let i=0; i < whatIsIt.classList.length; i++){
    console.log(whatIsIt.className); // result : grabMe, helloWorld, goodbyeWorld
}

whatIsIt.classList.toggle("toggleToggle"); // create toggle toggle class 
console.log(whatIsIt.classList);
whatIsIt.classList.toggle("toggleToggle"); // delete toggle toggle class
console.log(whatIsIt.classList);
console.log(whatIsIt.classList.toggle("toggleToggle"));

// document.getElementBy vs element.getElementBy
const doc_get = document.getElementsByClassName("grabMe"); // document.getElementBy
const elem_get = document.getElementById("grabMeUl");
elem_get.getElementsByClassName("grabMe"); // element.getElementBy

console.group("document vs element");
console.log("doc_get :", doc_get);
console.log("elem : ", elem_get);
console.groupEnd(); 

// Element attribute API
// 1) Element.getAttribute(name)
// 2) Element.setAttribute(name, value)
// 3) Element.hasAttribute(name)
// 4) Element.removeAttribute(name)
const target = document.getElementById("target"); 
console.group("Element attribute");
console.log(target.getAttribute("href")); // result : www.google.com
target.setAttribute("href", "https://www.youtube.com");
console.log(target.getAttribute("href")); // result : www.youtube.com
target.setAttribute("nickname", "hello target");
console.log(target.getAttribute("nickname")); 
target.removeAttribute("nickname");
console.log(target.getAttribute("nickname")); // result : null
console.log(target.hasAttribute("nickname")); // result : false
console.groupEnd();

// Comparison : attribute vs property
// speed => attribute < property
// sometimes both approach have the same result but sometimes not. 
// For example, 
console.group("attribute vs property");
const attr_path = document.getElementById("path");
console.log(attr_path.getAttribute("href")); // result : relative path
const prop_path = document.getElementById("path");
console.log(prop_path.href); // absolute path
console.groupEnd(); 