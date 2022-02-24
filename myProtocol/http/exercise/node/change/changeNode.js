// Node APIs : create node 
// 1) document.createElement 2) document.createTextNode
const UL = document.querySelector("ul");
const text_world = document.createTextNode("world");
const text_javascript = document.createTextNode("Javascript");
const text_typescript = document.createTextNode("Typescript");

function createWorld() {    
    const createLI = document.createElement("li");
    createLI.appendChild(text_world);
    UL.appendChild(createLI);
    console.group("result of createWorld");
    console.log(UL.textContent); 
    console.groupEnd(); 
}

function createJavascript() {
    const createLI = document.createElement("li");
    createLI.appendChild(text_javascript);
    console.log(createLI.textContent);
    // UL.appendChild(createLI);
    // Node.insertBefore(newNode, referenceNode)
    UL.insertBefore(createLI, UL.firstChild.nextSibling.nextSibling);
    console.group("result of createJavascript");
    console.log(UL.textContent); 
    console.groupEnd(); 
}


function removeHello() {
    const hello = UL.firstChild.nextSibling;
    hello.parentNode.removeChild(hello); // Node.removeChild(target) : remove a child node in parent node
    console.group("result of removeHello");
    console.log(UL.textContent); 
    console.groupEnd();
}

function replaceJavascript() {
    const link = document.createElement("a");
    link.setAttribute("href", "https://www.typescriptlang.org/");
    link.appendChild(text_typescript); 

    const javascript_li = UL.firstChild.nextSibling;
    javascript_li.replaceChild(link, javascript_li.firstChild);

    console.group("result of replaceJavascript");
    console.log(UL.textContent);
    console.group(); 

}

createWorld();  
createJavascript(); 
removeHello();
replaceJavascript();


