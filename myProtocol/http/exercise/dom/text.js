// IN DOM tree, text object does not belong to element or document.
// Node => CharacterData => text, comment.
// White space is also an object in DOM. 

const helloWorld = document.querySelector(".hello");
console.group("Without white space");
console.log(helloWorld.textContent); // hello world
console.log(helloWorld.firstChild); // span 
console.log(helloWorld.firstChild.firstChild); // "hello world"
console.groupEnd(); 

const goodbyeWorld = document.querySelector(".goodbye"); 
console.group("With white space");
console.log(goodbyeWorld.firstChild); // #text
console.log(goodbyeWorld.firstChild.nextSibling); // span
console.log(goodbyeWorld.firstChild.nextSibling.firstChild); // "good bye world" 
console.groupEnd();

// Text APIs : 1) nodeValue 2) data 
console.group("Text APIs");
console.log(helloWorld.firstChild.firstChild.nodeValue); // hello world
helloWorld.firstChild.firstChild.nodeValue = "not hello world"; // update
console.log(helloWorld.firstChild.firstChild.nodeValue); // not hello world
console.log(helloWorld.firstChild.firstChild.data);
console.groupEnd();

// Text node inherits CharacterData object, which provides a few APIs to 
// control characters.
// 1) appendData 2) deleteData 3) insertData 4) replaceData 5) substringData
