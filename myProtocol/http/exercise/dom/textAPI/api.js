const grabH1 = document.querySelector("h1").firstChild; 
const appendBtn = document.querySelector(".appendData");
const deleteBtn = document.querySelector(".deleteData");
const insertBtn = document.querySelector(".insertData");


const inputData = document.querySelector("#data");
const inputStart = document.querySelector("#start");
const inputEnd = document.querySelector("#end");

appendBtn.addEventListener("click", ()=>{
    grabH1.appendData(inputData.value);
});

deleteBtn.addEventListener("click", ()=>{
    grabH1.deleteData(inputStart.value, inputEnd.value); // exclude last element
});

insertBtn.addEventListener("click", ()=>{
    grabH1.insertData(inputStart.value, inputData.value); 
});
