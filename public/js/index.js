// buttons
const loanBtn = document.getElementById("getLoanButton")
const bankBtn = document.getElementById("bankButton")
const workBtn = document.getElementById("workButton")
const repayBtn = document.getElementById("repayButton")
const buyBtn = document.getElementById("buyLaptopButton")

// elements
const nameElement = document.getElementById("name")
const balanceElement = document.getElementById("balanceAmount")
const workElement = document.getElementById("workAmount")
const loanElement = document.getElementById("loanAmount")
const laptopElement = document.getElementById("laptops")
const laptopList = document.getElementById("laptopFeatures")
const laptopImg = document.getElementById("laptopImage")
const laptopTitle = document.getElementById("imageTitle")
const laptopDesc = document.getElementById("imageDescription")
const laptopPrice = document.getElementById("laptopPrice")

// global variables
const Url = "https://noroff-komputer-store-api.herokuapp.com"
let computerData
let purchased = [];



(async () => {
    const response = (await fetch(`${Url}/computers`))
    const jsonData = await  response.json()
    const data = [...jsonData]
    computerData = data.map(c => ({
        ...c,
        img:  `${Url}/${c.image}`
    }))
    console.log(computerData)
    addToList(computerData)
    features(computerData[0])
    display(computerData[0])
})();

function hasLoan() {
    return Number.parseInt(loanElement.innerText) > 0
}

// bank button that transfers the money from salary account to bank account.
bankBtn.addEventListener("click", e => {
    const salary = parseInt(workElement.innerText)
    const balance = parseInt(balanceElement.innerText)

    if (hasLoan()) {
        const loan = parseInt(loanElement.innerText) - salary * 0.1
        if (loan < 0) { loan = 0 }
        loanElement.innerText = loan
        balanceElement.innerText = balance + salary *0.9
    } else  {
        balanceElement.innerText = balance + salary
        
    }
    workElement.innerText = 0
})

// work button gives 100 dolla every time you press it. It's literally free money
workBtn.addEventListener("click", e =>{
    workElement.innerText = Number.parseInt(workElement.innerText) + 100
})


//Loan button to get a loan upto twice the amount in the balance account.
// Only one active loan permitted.
loanBtn.addEventListener("click", e =>{
    if (hasLoan()) {
        return console.error("Loan already taken")
    }

    const maximum = parseInt( balanceElement.innerText) * 2
    const loan = window.prompt(`Specify your loan. Up to ${maximum}`)
    if (loan < 0 || loan > maximum) {
        return console.error("Invalid amount.")
    }
    loanElement.innerText = loan
    balanceElement.innerText = parseInt(balanceElement.innerText) + parseInt(loan)
    repayBtn.style.visibility = "visible"
})

// Repay button repays the loan
repayBtn.addEventListener("click", e =>{
    const loan = parseInt(loanElement.innerText)
    const balance = parseInt(balanceElement.innerText)

    if (balance > loan){
        balanceElement.innerText = balance - loan
        loanElement.innerText = 0
    }
})
// Adds data to a dropdown list.
function addToList(data) {
    for (const item of data) {
        const listElement = document.createElement("option")
        listElement.innerText = item.title
        laptopElement.append(listElement)
    }
}
// displays the computer features in the laptop selection area.
function features(computer){
    laptopList.innerHTML = ""
    for (const feat of computer.specs) {
        const item = document.createElement("ul")
        item.innerText = feat
        laptopList.append(item)
    }
}

// display's currently selected item in the product "box"
function display(computer){
    laptopImg.src = computer.img
    laptopTitle.innerText = computer.title
    laptopDesc.innerText = computer.description
    laptopPrice.innerText = computer.price
}


// Change the currently displayed laptop when chosen different laptop

laptopElement.addEventListener("change", e =>{
    const target = e.target.value //title
    const newValue = computerData.find(c => c.title === target)
    display(newValue)
    features(newValue)

    if(purchased.includes(target)){ buyBtn.disabled = true}
    else {buyBtn.disabled = false}
})


// Method to buy laptops
buyBtn.addEventListener("click", e => {
    const price = parseInt(laptopPrice.innerText)
    const balance = parseInt(balanceElement.innerText)
    if( price > balance){
        return console.error("Not enough funds.")
    }
    balanceElement.innerText = balance - price
    purchased.push(laptopTitle.innerText)
    buyBtn.disabled = true;
})