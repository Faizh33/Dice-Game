
//Create players class
class Players {
  constructor(name, currentScore, totalScore, turn, win) {
    this.name = name
    this.currentScore = currentScore
    this.totalScore = totalScore
    this.turn = false
    this.win = false
  }
}  

//Create each player
let player1 = new Players(player1, 0, 0, false, false);
let player2 = new Players(player2, 0, 0, false, false);

