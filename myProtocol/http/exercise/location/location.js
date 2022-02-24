// window : 1) global object 2) window object
// document : a property of window. For example, 
// window.document === document
// window has a three types of property : 1) DOM 2) BOM 3) Javascript 
// 1) DOM : window.document (under web browser host environment)
// 2) BOM : window.navigator, window.screen, ... (under web browser host environment)
// 3) Javascript : Object, Array, Function ... (provided regardless of 
// host environmnet if Javascript is used)

// BOM: Browser Object Model : Abstractize web browser's screen/frame


// creating a function === creating a method in window object(when host
// environmnet is web)
function doConsoleLog() {
    console.log("log printed");
}

// How URL is structured
// (protocol name) + :// + (IP/domain, port number) + (resource directory) + (resource)
// e.g : https://www.google.com(80, default port number)/search/?val=cute+dog.png
// location object is window object's property, dealing with document's address.
function doLocation() {
    // location.toString() === location.href : Returns the Location object's URL.
    // location.protocol - get protocol types
    // location.host - get domain name
    // location.port - get port number
    // location.pathname - get resource directory
    // location.hash - get bookmared url part
    // location.reload() - refresh current website
    // through location object, parsing url is enabled. 
    console.log(window.location.toString(), location.href);
}

//     (location.protocol) + (location.host) + (location.port) + (location.pathname) + (location.hash)
// e.g : https://www.google.com(80, default port number)/search/?val=#cute+dog.png

// changing url with location.href
function moveToYoutube() {
    location.href = "https://www.youtube.com";
}