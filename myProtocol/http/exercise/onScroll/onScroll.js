const testing = document.querySelector(".testing"); 
const endCard = document.querySelector(".end-about-developer");
console.log(endCard.getBoundingClientRect());
console.log(endCard.top);

testing.addEventListener("click", (event)=>{
    event.preventDefault();
})

window.addEventListener("scroll", ()=>{
    let scrollY = window.scrollY;
    
    if (scrollY > testing.getBoundingClientRect().top()+100) {
            testing.classList.add("active");
        } 
})