// JSON : JavaScript Object Notation, meaning how to document code
// when creating an object in Javascript. Other languages have adopted 
// this format in different domains. For example, config and data transmission.

// object in JS : 1) curly braces, 2) comma, 3) index and value
const person = { 
    "height":173, 
    "job":"programmer"
};

const display_person = document.querySelector(".showJson");

function displayPerson(object) {
    display_person.innerHTML = Object.values(object);
}

const person_literal = '{ \
    "height":190, \
    "job":"NBA all star"\
}';

const display_parsed_person = document.querySelector(".showParsedJson");

function displayParsedPerson() {
    const toObject = JSON.parse(person_literal); // JSON.parse takes a string and parse into an object
    display_parsed_person.innerHTML = Object.values(toObject);
    const toString = JSON.stringify(toObject); // JSON.stringify takes an object and convert to a string
    display_parsed_person.append(document.createElement("br")); 
    display_parsed_person.append(toString); 
}

displayPerson(person); 
displayParsedPerson(); 
