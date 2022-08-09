
let players = [player1, player2];
let score;
let points;

function rollTheDice() {
    setTimeout(function () {
        var randomNumber = Math.floor(Math.random() * 6) + 1;

        document.querySelector(".img").setAttribute("src",
            "./img-dice/dice" + randomNumber + ".png");
    }
)}
