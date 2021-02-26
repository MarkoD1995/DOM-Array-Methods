const main = document.getElementById("main");
const addUser = document.getElementById("add-user");
const doubleMoneyBtn = document.getElementById("dbl-money");
const showMillionersBtn = document.getElementById("show-millioners");
const sortByRichestBtn = document.getElementById("sort-by-richest");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

// Fetch random user from api and adds money to every user
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 10000),
  };

  addData(newUser);
}

// Add new obj to data arr
function addData(obj) {
  data.push(obj);
  console.log(data);
  updateDOM();
}

//Doubles money for every user
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}

// Filter only millioners
function showMillioners() {
  data = data.filter((user) => user.money > 1000000);

  updateDOM();
}

//Sort by richest
function sortByRichest() {
  data = data.sort((a, b) => b.money - a.money);

  updateDOM();
}

//Calculate Wealth
function calculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  const wealth1 = document.createElement("div");
  wealth1.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    wealth
  )}</strong></h3>`;
  main.appendChild(wealth1);
}

//format money as currency
function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

//Update DOM

function updateDOM(providedData = data) {
  //clear main div ???
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

//Event listeners
addUser.addEventListener("click", getRandomUser);
doubleMoneyBtn.addEventListener("click", doubleMoney);
showMillionersBtn.addEventListener("click", showMillioners);
sortByRichestBtn.addEventListener("click", sortByRichest);
calculateWealthBtn.addEventListener("click", calculateWealth);
