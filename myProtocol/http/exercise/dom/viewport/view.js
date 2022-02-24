// A location of element varies when HTML document is bigger than browser. 
// When HTML document bigger, a scroll is made and the document coordinate varies. 
// Viewport is a screen area that displays a portion of total images. 

// window.scrollY : the amount of mouse scroll in Y axis
// getBoundingClientRect + window.scroll : getting the element coordinates
const target = document.querySelector("#target");
const button = document.querySelector("#button");

setInterval(()=>{
    console.log(
    "getBoundingClientRect : ", target.getBoundingClientRect().top,
    "vertical scroll amount : ", window.scrollY, 
    "horizontal scroll amount : ", window.scrollX,
    "getting the element Y coordinate : ", target.getBoundingClientRect().top + window.scrollY
    ); 
},1000);

button.addEventListener("click", ()=>{
    // Window.scrollTo(x-coord, y-coord, scroll behavior ) : coordinates in pixel
    // Internet explorer does not support left, top, behavior. 
    // See below to check browser support
    // https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo
    window.scrollTo({
        left : 0,
        top : 0,
        behavior: "smooth"
    });
    console.log("getting screen size : ", `width : ${screen.width}, height : ${screen.height}`); 
    console.log("getting viewport size : ", `width : ${window.innerWidth}, height : ${window.innerHeight}`); 
     
});

