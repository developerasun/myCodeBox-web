// browser have default events that automatically executes when the event happens.
// for example, 1) submit button in form => transmit data to server
// 2) click a tag in HTML directs to an URL. 
// event.preventDefault cancels cancelable events. In IE 9 or older version,
// use event.returnValue instead of event.preventDefault 
// use event.cancelable to check if the event is cancelable

const isItCheck = document.querySelector("#os-check");
const googleLink = document.querySelector("#google-link");
const formBtn = document.querySelector("button");
  

function stopDefault(event) {
    console.log(`is this event cancelable? ${event.cancelable}`);
    if (isItCheck.checked === true) { // input:checkbox has a "checked" property
        event.preventDefault();
    }
}


isItCheck.addEventListener("click", (event)=>{
    console.log(isItCheck.checked);
});

googleLink.addEventListener("click", (event)=>{
    stopDefault(event); 
});

formBtn.addEventListener("click", (event)=>{
    stopDefault(event);
});
