// Node => (inherit) => DOM => (model, standard) => Element(HTML, SVG, XML...) => (inherits) => HTMLElement ...
// All the DOM objects inherits Node object. 
const grabOl = document.querySelector("ol");
console.log(grabOl.firstChild); // grabOl inherits firstChild from Node object
console.log(grabOl.nodeType); // nodeType returns an integer depending on node types.
// see here for more details about node type : https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType

// Node object's property and method
// Node.childNodes
// Node.firstChild
// Node.nodeType
// Node.textContent
console.log(grabOl.textContent); // result : 1 of 3, 2 of 3, 3 of 3
// Node.appendChild(), removeChild()

// Nodes APIs exercise 1
console.group("Node relationship : Parent, Child, Sibiling")
console.log(document.body.firstChild); // result : white space(#text node)
console.log(document.body.firstChild.nextSibling); // result : comment
console.log(document.body.firstChild.nextSibling.nextSibling); // result : #text node
console.log(document.body.firstChild.nextSibling.nextSibling.previousSibling); // result : comment
console.log(grabOl.firstChild.nextSibling.style.color="red"); // control CSS with Node APIs

const second_li = document.querySelector(".second");
console.log(second_li.parentElement); 
console.groupEnd();


// Nodes APIs exercise 2
console.group("Node Types : nodeType, nodeName");
console.log(document.body.firstChild.nodeType); // text node
console.log(document.body.firstChild.nextSibling.nodeType); // comment node
console.log(document.body.firstChild.nextSibling.nextSibling.nextSibling.nodeName); // ol
console.groupEnd(); 

// Nodes APIs exercise 3 : recursive function
// when writing codes, take UI/UX into consideration first and then start writing codes 
// that are corresponding to it
function traverse(target, callback) {
    if (target.nodeType === Node.ELEMENT_NODE) { // Node.ELEMENT_NODE === 1
        if (target.nodeName === "LI"){ // lowercase "li" does not work here
            callback(target);
        }
            const childs = target.childNodes;
    
            for (let i = 0; i < childs.length; i++) {
                traverse(childs[i], callback); 
            }
        
    }
}

traverse(document.querySelector("body"), (elem) => {
    console.log(elem);
    elem.style.color="blue"; 
});

