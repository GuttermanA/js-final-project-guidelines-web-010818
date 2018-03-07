class Player {
  constructor(name) {
    this.name = name
    this.score = 0
    this.spinCounter = 0
    this.successfulGuesses = 0
  }

  incrementScore(wheelValue, nLetters) {
    this.score += wheelValue * nLetters
  }

  solvePuzzleScorer(wheelValue, numLettersRemaining) {
    return (wheelValue * (1 + (1/this.spinCounter))) * numLettersRemaining;
  }
}
