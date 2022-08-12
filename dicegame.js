// Create players class
class players {
    constructor(name, currentScore, totalScore, tour, winner) {
        this.name = name
        this.currentScore = currentScore
        this.totalScore = totalScore
        this.tour = false
        this.winner = false
    }
}

// Create each player
let player1 = new players('player1', 0, 0, false, false);
let player2 = new players('player2', 0, 0, false, false);
let players = [player1, player2];

let currentPlayer;
let diceGameTour = 0;

// Function Roll the Dice button 
function rollTheDice() {
    setTimeout(function () {
        var currentScore = Math.floor(Math.random() * 6) + 1;

        document.querySelector(".img").setAttribute("src",
            "./img-dice/dice" + currentScore + ".png");
    }
)}

//Function reset
function newGame() {
    document.querySelector("body").reset();
}