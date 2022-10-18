let newGameBtn = document.getElementById('newGameBtn')
let rollBtn = document.getElementById('rollDiceBtn')
let holdBtn = document.getElementById('holdBtn')
let total = document.getElementsByClassName('totalScore')
let current = document.getElementsByClassName('currentScore')


//Create each player
let player1;
let player2;

let activePlayer = player1;
let randomNumber = 0;

// Function Roll the Dice button 
function rollTheDice() {
  setTimeout(function (e) {
    randomNumber = Math.floor(Math.random() * 6) + 1

    document.querySelector(".img").setAttribute("src",
      "./img-dice/dice" + randomNumber + ".png")
  })
}

//Event RollTheDice
rollBtn.addEventListener('click', rollTheDice)

if (randomNumber == 1) {
  current.textContent = 0
  switchPlayer()
} else {
  addCurrentScore()
}

// Function to switch between player
function switchPlayer() {
  if (activePlayer == player1) {
    activePlayer = player2;
  } else {
    activePlayer = player1;
  }
} 

//function to add current score to active player
function addCurrentScore() {
  if (activePlayer == player1) {
    current[0].textContent += randomNumber
  } else {
    current[1].textContent += randomNumber
  }
}

//function to add current score to your total score if you click on "hold".
function hold() {
  if (activePlayer == player1) {
    total[0].textContent += current[0]
    current[0].textContent = 0
    switchPlayer()
  } else {
    total[1].textContent += current[1]
    current[1].textContent = 0
    switchPlayer()
  }
}

//Event hold
holdBtn.addEventListener('click', hold)

//Function for New Game 
function newGame() {
    current.textContent = 0;
    total.textContent = 0;
    activePlayer = player1;
}

//Event New Game
newGameBtn.addEventListener('click', newGame)