let currentScore = document.getElementsByClassName('currentScore');
let totalScore = document.getElementsByClassName('totalScore');
let current = currentScore;
let total = totalScore;

let player1;
let player2;

let activePlayer = player1;

// Function to switch between player
function switchPlayer() {
    if (activePlayer === 'player1') {
      activePlayer = 'player2';
    } else {
      activePlayer = 'player1';
    }
}


// Function Roll the Dice button 
function rollTheDice() {
    setTimeout(function () {
        var randomNumber = Math.floor(Math.random() * 6) + 1;

        document.querySelector(".img").setAttribute("src",
            "./img-dice/dice" + randomNumber + ".png");
    }
)}

// Function to add current score when player roll the dice
function temporaryScore() {
    currentScore += randomNumber;
} 

//function to add current score to your score if you click on "hold".
function hold() {

  }

// Function for new game 
function newGame() {
    currentScore = 0;
    totalScore = 0;
}





