const API_BASEURL = "https://jsonplaceholder.typicode.com";

const startSearch = document.getElementById("searchButton");
const searchKeyword = document.getElementById("searchKeyword");
const searchResult = document.getElementById("searchResult");
const userCards = document.getElementById("cards");

let fetchStatus = {
  idle: true,
  fetching: true,
  fetched: false,
};

let isRendered = false;

async function fetchUsers() {
  if ((fetchStatus.idle === true, fetchStatus.fetched === false)) {
    const response = await fetch(API_BASEURL.concat("/users"));
    const data = await response.json(); // array containing 10 objs
    console.log(data);
    fetchStatus.idle = false;
    fetchStatus.fetched = true;
    return data;
  } else {
    return undefined;
  }
}

async function renderResult() {
  const users = await fetchUsers();

  if (typeof users !== undefined && isRendered === false) {
    users.forEach((user, index) => {
      const { name, username, email } = user;
      const li = document.createElement("li");
      li.innerText = `name: ${name}, username: ${username}, email: ${email} \n`;
      userCards.append(li);
      isRendered = true;

      // store
      localStorage.setItem(`user-${index}`, li.innerHTML.toLowerCase());
    });
  }
}

function filterInput() {
  const input = searchKeyword.value;
  const refinedInput = input.toLowerCase();
  let hasInput = false;
  let bowl = [];

  //   search the input in localStorage
  for (let i = 0; i < localStorage.length; i++) {
    if (
      localStorage
        .getItem(`user-${i}`)
        .trim()
        .toLowerCase()
        .includes(refinedInput)
    ) {
      hasInput = true;
    }
  }
  console.log("search result: ", hasInput);

  //   arraify the localStorage
  for (let j = 0; j < localStorage.length; j++) {
    bowl.push(localStorage.getItem(`user-${j}`));
  }
  bowl = bowl.filter((val) => {
    if (val.includes(refinedInput)) {
      return val;
    }
  });
  console.log(bowl);
  searchResult.innerText = `search result: ${bowl[0].slice(0, -4)}`;
}

// facade pattern
class Search {
  constructor(_name) {
    this.name = _name;
  }
  get author() {
    return this.name;
  }
  set author(newName) {
    this.name = newName;
  }
  data() {
    fetchUsers();
  }
  render() {
    renderResult();
  }
  filter() {
    filterInput();
  }
}

function initSearch() {
  const search = new Search("Not Jake Sung");
  console.log(search.author);
  search.author = "Jake Sung";
  console.log(search.name);

  search.data();
  search.render();
  search.filter();
}

startSearch.addEventListener("click", initSearch);
