const addBtn = document.querySelector('.add');
const doubleBtn = document.querySelector('.double');
const milBtn = document.querySelector('.millionaire');
const sortBtn = document.querySelector('.sort');
const sumBtn = document.querySelector('.sum');
const main = document.querySelector('.main');

let userData = [];

// Make Initial User
getRandomUser();
getRandomUser();
getRandomUser();

// Call API
async function getRandomUser(){
    const res = await fetch('https://randomuser.me/api/');
    const json = await res.json();

    const userName = `${json.results[0].name.first} ${json.results[0].name.last}`;
    const money = Math.ceil(Math.random()*1000000);

    const userObj = {
        userName,
        money
    };

    addData(userObj);
}

function addData(obj){
    userData.push(obj);

    updateUser();
}

// Get Double Money
function doubleMoney(){
    userData = userData.map(user => {
        return {...user, money:user.money * 2}
    });

    updateUser();
}

// Show Millionaires
function showMil(){
    userData = userData.filter(user => user.money > 1000000);

    updateUser();
}

// Sort by Richest
function sortUser(){
    userData = userData.sort((a,b) => b.money - a.money);

    updateUser();
}

// Calculate Entire Money
function sumAllMoney(){
    const whole = userData.reduce((result, user) => result += user.money, 0);

    const result = document.createElement('h3');
    result.classList.add('total');
    result.innerHTML = `Total Wealth:<strong>${formatMoney(whole)}</strong>`;
    main.appendChild(result);
}

// Get User Text
function updateUser(){
    // Clear Text
    main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';

    userData.forEach(user => {
        const person = document.createElement('h3');
        person.classList.add('person');
        person.innerHTML = `<strong>${user.userName}</strong>${formatMoney(user.money)}`;
        main.appendChild(person);
    });
}

function formatMoney(number){
    return `$${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

// Event Listeners
addBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
milBtn.addEventListener('click', showMil);
sortBtn.addEventListener('click', sortUser);
sumBtn.addEventListener('click', sumAllMoney);