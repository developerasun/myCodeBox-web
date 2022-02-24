const parent = document.querySelector("#parent");
const hello = parent.firstChild.nextSibling;
const world = hello.nextSibling.nextSibling;

const beforeBegin = document.querySelector(".beforeBegin");
const afterBegin = document.querySelector(".afterBegin");
const beforeEnd = document.querySelector(".beforeEnd");
const afterEnd = document.querySelector(".afterEnd");

function checkHTML () {
    console.log("Outer : ", parent.outerHTML); 
    console.log("Inner : ", parent.innerHTML); 
}

beforeBegin.addEventListener("click", ()=>{
    parent.insertAdjacentHTML('beforebegin', "<h1>Programming convention</h1>");
});

afterBegin.addEventListener("click", ()=>{
    parent.insertAdjacentHTML('afterbegin', "<li>learning</li>");
});

beforeEnd.addEventListener("click", ()=>{
    parent.insertAdjacentHTML('beforeend', "<li>in javascript</li>");
});

afterEnd.addEventListener("click", ()=>{
    parent.insertAdjacentHTML('afterend', "<h1>!!!</h1>");
});

checkHTML();


// Node.insertAdjacentHTML(position, text)
// position : 1) 'beforebegin' 2) 'afterbegin' 3) 'beforeend' 4) 'afterend'