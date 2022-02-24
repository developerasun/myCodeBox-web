// event propagation : 1) capturing 2) bubbling
// capturing : event firstly captured in outermost element e.g HTML
// bubbling : event firstly captured in innermost element 

const html = document.querySelector("html");
const body = document.querySelector("body");
const fieldset_first = document.querySelector("fieldset:nth-child(1)");
const fieldset_second = document.querySelector("fieldset:nth-child(2)");
const name_ = document.querySelector("#name");
const nickname = document.querySelector("#nickname");
const inputs = document.querySelectorAll("input");

function findWhere(event) { 
    console.log(event.target);
    console.log(event.target.nodeName, this.nodeName);
    console.log("==============");
}

// capturing exercise : capturing is not supported in IE.
function doCapturing() {
    // 3rd argument of addEventListener is useCapture. default value is 'false' except old browser.
    name_.addEventListener("click", stopEvent, true); 
    fieldset_first.addEventListener("click", findWhere, true);
    // body.addEventListener("click", findWhere, true);
    // html.addEventListener("click", findWhere, true);
}

// bubbling exercise : bubbling is the most common in event propagation setting
// bubbling is supported in all browser. 
// Event.eventPhase : returns an integer value based on the event flow
// 1) Event.NONE : 0
// 2) Event.CAPTURING_PHASE : 1
// 2) Event.AT_TARGET : 2
// 2) Event.BUBBLING_PHASE : 3
function doBubbling() {
    nickname.addEventListener("click", findWhere, false); 
    fieldset_second.addEventListener("click", findWhere, false);
    // body.addEventListener("click", findWhere, false);
    // html.addEventListener("click", findWhere, false);
}

// event.stopPropagation() : stops a current event's propagation during bubbling/capturing. 
function stopEvent(event) {
    event.stopPropagation();
} 

for (let key in inputs) {
    switch (inputs[key].id) {
        case "name":
            doCapturing();
            break;
        case "nickname":
            doBubbling();
            break;
    }
}
