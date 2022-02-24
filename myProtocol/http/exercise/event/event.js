// event programming : 1) inline scripting 2) property listener 3) 

// the merit of inline manner scripting : easy to find 
// dismerit : mixed with HTML and deteriorating functionality
function inline() {
    console.log("hello inline"); 
}

// property listener : add evenet as a property of an object
// event object : an object containing the context of event. When 
// event happens, event object is delivered as a first parameter in event handler
// In Internet explore 8 or older one, event object is not a paramter but global object window's property
// meaning cross browsing handling is needed
const property = document.querySelector(".property");
property.onclick = function(event) {
    
    console.log("hello property listener")
    console.log(event);
    // console.dir methods shows the property list of Javascript object
    console.dir(event);

    let bowl = new Array(); 
    for (let key in event) {
        console.log(key);
        bowl.push(key);
    }
    console.log(bowl.length); // event object has 67 properties as of 2021 
 }

 // addEventListener : merit of using addEventListener is that it enables to assign
 // multiple events to one event target.
const addEvent = document.querySelector(".addEventListener");
const addEvent_second = document.querySelector(".addEventListener-second");

addEvent.addEventListener("click", ()=>{
    console.log("clicked");
}); 

addEvent.addEventListener("click", ()=>{
    console.log("multiple events assigned");
}); 

function pickEvent(event) {
    if (event.target.className === "addEventListener-second") { // check event.target's property to see if it has 'className' as a property
        console.log("I am second");
        console.log(event.target); // result : button tag.
    } else {
        console.log("first!"); 
    }
}

addEvent.addEventListener("click", (e)=>{
    pickEvent(e);
});

addEvent_second.addEventListener("click", (e)=>{
    pickEvent(e); 
}); 

 // Internet Explorer cross browsing issues faced with this code exercise 
 // 1) const, let keyword not supported
 // 2) arrow function not supported
 // 3) addEventListener not supported
 // 4) webpage infinite loading
 var IEcompatible = document.getElementById("cross-browsing"); // const, let is only supported in IE 11+ Use var for cross-browsing

 if (IEcompatible.addEventListener) { // undefined is false value in JS. 
     IEcompatible.addEventListener("click", ()=>{ // arrow funciton not supported in IE 11. Use function keyword
        alert("hello event listener");
     });
 } else if (IEcompatible.attachEvent) {
     IEcompatible.attachEvent("onclick", function(){ // Use onclick instead of click in attachEvent
        alert("hello attach event");
     });
 }
