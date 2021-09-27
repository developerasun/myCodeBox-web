// Code convention: constant variable should be declared in capital
// Declare a repeated string value in capital to avoid confusion in code block
const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "userName"; 

const loginForm = document.querySelector("#login-form");
const loginInput = loginForm.querySelector("#login-form input");
const loginButton = loginForm.querySelector("#login-form button");
const myLink = document.querySelector("a"); 
const hideForm = document.querySelector(".not-hidden"); 
const greeting = document.querySelector("#greeting"); 
const savedUserName = localStorage.getItem(USERNAME_KEY); 

// function handleLoginBtn(){ 
    
//     // Check inner value list of loginInput object with console.dir command
//     // console.dir(loginInput);
    
//     // object.value: text content of placeholder
//     const userName = loginInput.value;
//     console.log(userName);
    
//     // if (userName === ""){
//     //     alert("Please enter right value");
//     // } else if (userName.length > 15) {
//     //     alert("ID should be less than 15 characters"); 
//     // } 
//     // console.log("Entered value is: ", loginInput.value);
// }

// event is a conventional name for first parameter in function
function onLoginSubmit(event){
    // When a browser calls a function in addEventListener, the function
    // is called with invisible argument by default
    // The very first argument of all the eventListener functions is about
    // information of a targeted function(event), onLoginSubmit, in this case. 

    event.preventDefault(); // check the invisible argument
    loginForm.classList.add(HIDDEN_CLASSNAME); 

    // localStorage object stores data in a web browser in key-value format
    // the stored data has no expiration date
    localStorage.setItem(USERNAME_KEY, loginInput.value); 

    paintGreetings(); 

    // Recommend A when string value and variable are used at the same time
    // greeting.innerText = `Hello ${userName}`;   // method A (back quote)
    // greeting.innerText = "Hello "+ userName; // method B
    // greeting.classList.remove(HIDDEN_CLASSNAME); 
}

// Submit event happens when enter hit or button clicked 
// Form is re-submitted everytime a browser is refreshed
// Use object.preventDefault function if you do not want 
// the page get refreshed
loginForm.addEventListener("submit", onLoginSubmit); 

function handleMyLink(event){
    // Once alert is executed, default behavior of browser will be done.
    // linking to the website, in this case. alert blocks every bevaior when executed -
    // try to avoid using it.
    // alert("Moved to Nomade homepage") 
    console.log("clicked!");
    event.preventDefault(); 
    console.log(event); 
}

myLink.addEventListener("click", handleMyLink); 

function hideFormTag(){
    console.log(hideForm.className + " will be hidden"); 
    hideForm.className = "hidden";
}

hideForm.addEventListener("click", hideFormTag); 

// Observe patterns in code and make it a function to avoid duplicates
function paintGreetings(){
    const username = localStorage.getItem(USERNAME_KEY);
    greeting.innerText = `Hello ${username}`; 
    greeting.classList.remove(HIDDEN_CLASSNAME);
}

if (savedUserName === null){
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener("submit", onLoginSubmit); 
} else { 
    paintGreetings(); 
}