// when tab/cursor into input text area : focus, out : blur
const form = document.querySelector("#target");
const username = document.querySelector("#username");
const reflected = document.querySelector(".reflected");

form.addEventListener("submit", (event)=>{
    if (username.value==="" || username.value.length < 5) { // form validation check
        event.preventDefault(); 
        alert("Username can't be empty and longer than 4 characters.");
    }
});

username.addEventListener("change", ()=>{
    reflected.innerText = `reflected texts : ${username.value}`;
})

username.addEventListener("blur", ()=>{
    username.style.backgroundColor = "white";
})

username.addEventListener("focus", ()=>{
    username.style.backgroundColor = "black";
    username.style.color = "white";
})