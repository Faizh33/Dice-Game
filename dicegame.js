let body = document.getElementById('body');
const rollBtn = document.getElementById('rollDiceBtn');
let current = document.getElementsByClassName('currentScore');
const holdBtn = document.getElementById('hold-btn');
let total = document.getElementsByClassName('totalScore');
const newGameBtn = document.getElementById('newGameBtn');
const dot = document.getElementsByClassName('bi-dot');
const applauseSound = document.getElementById('applauseSound');
const newGameSound = document.getElementById('newGameSound');
const holdSound = document.getElementById('holdSound');
const loseSound = document.getElementById('loseSound');
const rollDiceSound = document.getElementById('rollDiceSound');
let playerText = document.getElementsByClassName('player');
const currentContainerPlayer1 = document.getElementById('current1');
const currentContainerPlayer2 = document.getElementById('current2');
let styleBtns = document.getElementsByClassName('butn');
let winPop = document.getElementById('modal-win');
let winPopText = document.getElementById('modalText');
let rulesPop = document.getElementById('modal-rules');
const dice = document.getElementById('anim-dice');

//Create players class
class Players {
  constructor(name, currentScore, totalScore, win) {
    this.name = name;
    this.currentScore = currentScore;
    this.totalScore = totalScore;
    this.win = false;
  }
}  

//Create each player
let player1 = new Players('player1', 0, 0, false);
let player2 = new Players('player2', 0, 0, false);

//Start Game
let gameTurn = 0;

//Initialize active player
let activePlayer;

//Style CSS player
cssPlayer();

//To roll the dice
let rollTheDice = debounce(function () {
  var randomNumber = random(1, 7);
  rollDiceSound.play();
  diceAnimation();
  document.querySelector(".img").setAttribute("src", "img-dice/" + "dice" + randomNumber + ".png");

  //Initialization game
  if(gameTurn%2 === 0) {  //if gameTurn is even            
    activePlayer = player1;
    activePlayer.currentScore += randomNumber;     
    current[0].textContent = player1.currentScore;
  } else {   //if gameTurn is odd                      
    activePlayer = player2;
    activePlayer.currentScore += randomNumber;  
    current[1].textContent = player2.currentScore;
  }

  //If dice = 1
  if(randomNumber === 1 && gameTurn%2 === 0) {
    loseSound.play();
    player1.currentScore = 0;
    current[0].textContent = player1.currentScore;
    switchPlayer();
    cssPlayer();
  } else if (randomNumber === 1 && gameTurn%2 !== 0) {
    cssPlayer();
    loseSound.play();
    player2.currentScore = 0;
    current[1].textContent = player2.currentScore;
    switchPlayer();
    cssPlayer();
  }
}, 500);

//Fonction debounce
function debounce(callback, delay) {
  var timer;
  return function () {
    var args = arguments;
    var context = this;
    clearTimeout(timer);
    timer = setTimeout(function () {
      callback.apply(context, args);
    }, delay);
  };
}

//Function random number
function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

//Event roll the dice
rollBtn.addEventListener('click', rollTheDice);

//Function to change player
function switchPlayer() {
  if (activePlayer === player1) {
    player1.turn = false;
    activePlayer = player2;
    gameTurn++;
  } else {
    player2.turn = false;
    activePlayer = player1;
    gameTurn++;
  }
}

//function to add total score
let hold = debounce (function (){
  holdSound.play();

  if(gameTurn%2 === 0) {
    player1.totalScore += player1.currentScore;
    total[0].textContent = player1.totalScore;
    player1.currentScore = 0;
    current[0].textContent = player1.currentScore;
    switchPlayer();
    cssPlayer();
  } else {
    player2.totalScore += player2.currentScore;
    total[1].textContent = player2.totalScore;
    player2.currentScore = 0;
    current[1].textContent = player2.currentScore;
    switchPlayer();
    cssPlayer();
  }

    //if the player reaches 100 points
    if(player1.totalScore >= 100) {
      player1.win = true;
    } else if (player2.totalScore >= 100) {
      player2.win = true;
    }
    //Animations
    if(player1.totalScore >= 100 || player2.totalScore >= 100) {
      applauseSound.play();
      //Confetti animation
      for (let index = 0; index < (Math.floor(Math.random() * 20) + 10); index++) {
        confetti({ 
          origin: {
            x: Math.random() - 0.2,
            y: Math.random() - 0.2
          },
        });
      }
      
      //Open Pop-up
      winPop.style.display = 'block';
      //Winner text
      if (player1.win === true) {
          winPopText.innerHTML = `🎉 <strong>PARTIE GAGNÉE !</strong> 🎉<br><br>
          La partie a été remportée par le joueur 1 avec <strong>${player1.totalScore} points</strong>.<br>
          Pour jouer une nouvelle partie, cliquez sur <em>Nouvelle partie</em>.`;
      } else if (player2.win === true) {
          winPopText.innerHTML = `🎉 <strong>PARTIE GAGNÉE ! 🎉</strong><br><br>
          La partie a été remportée par le joueur 2 avec <strong>${player2.totalScore} points</strong>.<br>
          Pour jouer une nouvelle partie, cliquez sur <em>Nouvelle partie</em>.<br>`;
      }
      //Close Pop-up
      document.getElementById('modal-close1').addEventListener('click', function() {
        winPop.style.display = 'none';
      });
      //Restart game
    rollBtn.removeEventListener('click', rollTheDice);
    holdBtn.removeEventListener('click', hold);
    dot[0].style.opacity = 0;
    dot[1].style.opacity = 0;
    }
}, 300);

//event function hold()
holdBtn.addEventListener('click', hold);

//Function new game
function newGame() {
  newGameSound.play();
  diceAnimation2();
  player1 = new Players('player1', 0, 0);
  player2 = new Players('player2', 0, 0);
  gameTurn = 0;
  current[0].textContent = 0;
  current[1].textContent = 0;
  total[0].textContent = 0;
  total[1].textContent = 0;
  dot[0].style.opacity = 0;
  player1.win = false;
  player2.win = false;
  cssPlayer();
  rollBtn.addEventListener('click', rollTheDice);
  holdBtn.addEventListener('click', hold);
}

//Function confirm new game
function confirmRestart() {
  if (confirm("Êtes-vous sûr(e)s de vouloir redémarrer la partie?")) {
    newGame();
  }
}

//Event newGame
newGameBtn.addEventListener('click', confirmRestart);

//Function css player
function cssPlayer() {
  if(gameTurn%2 === 0) {
    dot[0].style.opacity = 1;
    dot[1].style.opacity = 0;
    playerText[0].style.fontWeight = 600;
    playerText[1].style.fontWeight = 400;
    playerText[0].style.opacity = 1;
    playerText[1].style.opacity = 0.25;
    playerText[0].style.filter = "none";
    playerText[1].style.filter = "blur(1px)";
    currentContainerPlayer2.style.opacity = 0.25;
    currentContainerPlayer2.style.filter = "blur(1px)";
    total[1].style.opacity = 0.25;
    total[1].style.filter = "blur(1px)";
    currentContainerPlayer1.style.opacity = 1;
    currentContainerPlayer1.style.filter = "none";
    total[0].style.opacity = 1;
    total[0].style.filter = "none";
    body.style.background = 'linear-gradient(90deg, #8B5CF6  50%, #FACC15  50%)';
    for (let styleBtn of styleBtns) {
      styleBtn.style.background = "#edf1f1";
    }
  } else {
    dot[0].style.opacity = 0;
    dot[1].style.opacity = 1;
    playerText[0].style.fontWeight = 400;
    playerText[1].style.fontWeight = 600;
    playerText[0].style.opacity = 0.25;
    playerText[1].style.opacity = 1;
    playerText[0].style.filter = "blur(1px)";
    playerText[1].style.filter = "none";
    currentContainerPlayer1.style.opacity = 0.25;
    currentContainerPlayer1.style.filter = "blur(1px)";
    total[0].style.opacity = 0.25;
    total[0].style.filter = "blur(1px)";
    currentContainerPlayer2.style.opacity = 1;
    currentContainerPlayer2.style.filter = "none";
    total[1].style.opacity = 1;
    total[1].style.filter = "none";
    body.style.background = 'linear-gradient(90deg, #8B5CF6  50%, #FACC15 50%)';
    for (let styleBtn of styleBtns) {
      styleBtn.style.background = "white";
    }
  }
}

//Open game rules
document.getElementById('btn-rules').addEventListener('click', function() {
  rulesPop.style.display = 'block';
});

//Close game rules
document.getElementById('modal-close2').addEventListener('click', function() {
  rulesPop.style.display = 'none';
});

//function dice animation when roll the dice
function diceAnimation(){ 
  dice.classList.add('anim');
  setTimeout(()=> {
    dice.classList.remove('anim')
  },1500)
}

//function dice animation when click new game
function diceAnimation2(){
  dice.classList.add('anim2');
  setTimeout(()=> {
    dice.classList.remove('anim2')
  },1500)
}

//Cut sound when click on the sound icon
document.getElementById('sound-icon').addEventListener('click', function() {
  if (applauseSound.muted) {
    applauseSound.muted = false;
    newGameSound.muted = false;
    holdSound.muted = false;
    loseSound.muted = false;
    rollDiceSound.muted = false;

    document.getElementById('icon-volume-on').style.display = 'inline';
    document.getElementById('icon-volume-off').style.display = 'none';
  } else {
    applauseSound.muted = true;
    newGameSound.muted = true;
    holdSound.muted = true;
    loseSound.muted = true;
    rollDiceSound.muted = true;

    document.getElementById('icon-volume-on').style.display = 'none';
    document.getElementById('icon-volume-off').style.display = 'inline';
  }
});


function checkOrientation() {
    const isPortrait = window.innerHeight > window.innerWidth;
    document.getElementById('rotate-warning').style.display = isPortrait ? 'flex' : 'none';
}

window.addEventListener("resize", checkOrientation);
window.addEventListener("orientationchange", checkOrientation);
window.addEventListener("load", checkOrientation);
