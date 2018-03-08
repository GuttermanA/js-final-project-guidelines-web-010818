class Player {
  constructor(name) {
    this.name = name
    this.score = 0
    this.spinCounter = 0
    this.successfulGuesses = 0
    this.spins = document.querySelector('#spins')
    this.currentUser = document.querySelector('#current-user')
    this.winnings = document.querySelector('#winnings')
  }

  wheelEffect(wheelValue, nLetters) {

    if (typeof wheelValue === "number") {
      if (!this.boughtAvowel) {
        this.score += wheelValue * nLetters
        this.winnings.innerText = this.score
      }
    } else {
      if (wheelValue === "BANKRUPTCY") {
        this.score = 0
        this.winnings.innerText = this.score
      } else if (wheelValue === "Lose a Spin") {
        this.spinCounter += 1
        this.spins.innerText = 20 - this.spinCounter
      } else if (wheelValue === "Extra Spin") {
        this.spinCounter -= 1
        this.spins.innerText = 20 - this.spinCounter
      } else if (wheelValue === "DOUBLE") {
        this.score = this.score * 2
        this.winnings.innerText = this.score
      }
    }
  }


  solvePuzzleScorer(wheelValue, numLettersRemaining) {
    let solvedWinnings = Math.round((wheelValue * (1 + (1/this.spinCounter))) * numLettersRemaining);
    this.score += solvedWinnings
    this.winnings.innerText = this.score
    return solvedWinnings
  }
}
