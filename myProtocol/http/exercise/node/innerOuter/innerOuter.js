
const target = document.querySelector("#target");
const get = document.querySelector(".get");
const set = document.querySelector(".set");
const reset = document.querySelector(".reset");
const reset_value = target.innerHTML; // contain first value of target.innerHTML

function consoleLog(type) {
    if (type === "get") {
        console.group(`${type} button`);
        console.log(target.innerHTML); // showing inner HTMLs 
        console.log(target.outerHTML); // showing all HTMLs including oneself.
        console.groupEnd();
    } else if (type === "set") {
        target.innerHTML = "<li>changing nodes</li><li>Javascript for web</li>"
        console.group(`${type} button`);
        console.log(target.innerHTML); 
        console.log(target.outerHTML); 
        console.groupEnd();
    } else {
        target.innerHTML = reset_value;
        console.group(`${type} button`);
        console.log(target.innerHTML); 
        console.log(target.outerHTML); 
        console.groupEnd();        
    }
}


get.addEventListener("click", ()=>{
    const type = get.className; 
    consoleLog(type);
});

set.addEventListener("click", ()=>{
    const type = set.className;
    consoleLog(type);
});

reset.addEventListener("click", ()=>{
    const type = reset.className;
    consoleLog(type);
});