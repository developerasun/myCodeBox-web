// To control browser with Javascript, the first thing required is
// to find a browser object to control by using below methods
// getElementByTagName, QuerySelector, getElementByClassName ...

// Comparison : getElementBy(...) and querySelector 
// getElementBy(...) : returns a live HTMLCollection object. don't provide forEach method
// querySelector : returns a static NodeList. support forEach method


// console.group("group name") ~ console.groupEnd() : grouping logs.
console.group("querySelector"); 
const li = document.querySelector("li:nth-child(3)");
// constructor.name : Returns the name of the function. Function names are read-only
// and can not be changed.
console.log(li.constructor.name); // result : HTML_LI_Element, single entity => HTML element

const query_lis = document.querySelectorAll("li");
console.log(query_lis.constructor.name); // result : Node_list, plural => Node list(similar to array)

const query_ps = document.querySelectorAll("p");
console.log(query_ps.constructor.name); // result : Node_list, plural => Node list(similar to array)
console.groupEnd();

console.group("getElementBy");
const html_lis = document.getElementsByTagName("li");
console.log(html_lis.constructor.name); // result : HTML_Collection

const html_ps = document.getElementsByTagName("p");
console.log(query_ps.constructor.name); // result : HTML_Collection
console.groupEnd(); 

// Depending on DOM elements, property may vary. 
// a tag => 1) href 2) target ... 
// list tag => 1) type 2) value ...
// a, li, p, and other elements => childs of HTMLElement(parent)