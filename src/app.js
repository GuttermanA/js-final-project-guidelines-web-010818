class App {
  constructor() {
    this.pickedLetters = []
    this.consonants = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z']
    this.vowels = ['A', 'E', 'I', 'O', 'U']
    this.boxId = 0;
    this.scoreList = document.querySelector('#score-list')
    this.solveForm = document.querySelector('#solve-form')
    this.solveSubmit = document.querySelector('#solve-submit')
    this.playAgainButtons = document.querySelectorAll('#play-again')
    this.buyAVowelButton = document.querySelector('#buy-a-vowel')
    this.solveButton = document.querySelector('#solve')
    this.nameSubmit = document.querySelector('#name-submit')
    this.gameBoardRows = document.querySelectorAll('#game-board .row')
    this.buttonContainer = document.querySelector('#button-container')
    this.buttonRows = document.querySelectorAll('#button-container .row')
    this.startGameButton = document.querySelector('#start-game-button')
    this.wheelContainer = document.querySelector('#wheel-container')
    this.letterContainer = document.querySelector('#letter-container')
    this.chosenLettersHTML = document.querySelector('#chosen-letters')
    this.keyRowOne = document.querySelector('#key-row1')
    this.keyRowTwo = document.querySelector('#key-row2')
    this.keyRowThree = document.querySelector('#key-row3')
    //ROWS
    this.rowOne = document.querySelector('#row1')
    this.rowTwo = document.querySelector('#row2')
    this.rowThree = document.querySelector('#row3')
    this.rowFour = document.querySelector('#row4')
    this.generateBoxes()
    this.generateWheel();
    this.generateLetterButtons(this.consonants)
    this.addSelectors()
    this.addEventListeners();
    this.renderPhrase = this.renderPhrase.bind(this)

  }

  //NOTE: ADD PAGE MANIPULATION

  addSelectors() {
    this.allCardBlocks = document.querySelectorAll('.card-block')
    this.rowOneCardBlock = document.querySelectorAll('.row-1')
    this.rowTwoCardBlock = document.querySelectorAll('.row-2')
    this.rowThreeCardBlock = document.querySelectorAll('.row-3')
    this.rowFourCardBlock = document.querySelectorAll('.row-4')
    this.wheelHTML = document.querySelector('#wheel')
    this.modalForm = document.querySelector('#modal-form')
  }

  addEventListeners(){
    this.addSpinWheelEvent()
    this.addButtonCharButtonEvent()
    this.addStartGameEvent()
    this.addPlayAgainEvent()
    this.solveButton.addEventListener("click", () => {
      this.solve()
    })
  }

  addSpinWheelEvent() {
    this.wheelContainer.addEventListener("click", () => {
      this.generateWheel(this.wheel.randomSelect());
      this.player.spinCounter += 1
      this.buttonContainer.classList.remove('disabled-div')
      this.wheelContainer.classList.add('disabled-wheel')
    })
  }

  addStartGameEvent() {
    this.nameSubmit.addEventListener("click", (event) => {
      event.preventDefault()
      let name = this.modalForm.querySelector('#name').value
      if (name !== "") {
        let player = new Player(name)
        this.player = player
        $("#start-game").modal('hide');
        this.fetchPhrase();
        console.log(player)
      } else {
        alert("Please enter a name")
      }

    })
  }

  addPlayAgainEvent() {
    console.log(this.playAgainButtons);
    for(let button of this.playAgainButtons) {
      button.addEventListener("click", () =>{
        window.location.reload()
      })
    }
  }

  addButtonCharButtonEvent() {
    this.buttonContainer.addEventListener("click", (event) => {
      let button = event.target
      console.log(button.innerText);
      this.checkSelection(button.innerText)
      button.classList.add('disabled')
    })
  }

  checkSelection(eventTarget) {
    if (!this.pickedLetters.includes(eventTarget)) {
      this.pickedLetters.push(eventTarget)
      this.updateChosenLetters()
    }
    let foundLetters = this.matchSelection(eventTarget)
    if (foundLetters) {
      console.log('success');
      this.player.successfulGuesses += 1
      this.player.incrementScore(this.wheel.lastResult, foundLetters)
      this.toggleDisplay(this.buyAVowelButton)
      this.toggleDisplay(this.solveButton)

    } else {
      this.player.successfulGuesses = 0
      this.toggleDisplay(this.buyAVowelButton, true)
      this.toggleDisplay(this.solveButton, true)
      console.log('failure')
    }
    this.buttonContainer.classList.add('disabled-div')
    console.log(this.player.spinCounter);
    if (this.player.spinCounter === 20) {
      this.gameOver()
    } else {
      this.wheelContainer.classList.remove('disabled-wheel')
    }

  }

  gameOver() {
    this.postScore()
    document.querySelector('#score-display').innerText + this.player.score
    $("#end-game").modal({
      'backdrop' : 'static'
    })
  }

  solve() {
    this.toggleDisplay(this.solveForm)
    this.solveFormEvent()
  }

  solveFormEvent() {
    this.solveSubmit.addEventListener("click", () => {
      let answer = this.solveForm.querySelector('#solve-input').value.toUpperCase()
      if (answer === this.phrase.text) {
        alert("Correct!")
        this.phrase.solved = true
        this.solvedPhrase()
      } else {
        alert("Incorrect!")
      }

    })
  }

  solvedPhrase() {
    if (this.remainingChars === 0 || this.phrase.solved) {
      this.fetchPhrase()
      this.generateLetterButtons(this.consonants)
      this.generateWheel()
      this.addEventListeners()
      this.toggleDisplay(this.solveForm, true)
    }
  }

  toggleDisplay(domElement, hide) {
    if (hide === true) {
      domElement.style.display = "none"
    } else {
      domElement.style.display = "block"
    }
  }

  matchSelection(letter) {
    let found = 0
    for(let block of this.allCardBlocks) {
      if (block.innerText === letter) {
        this.revealLetter(block.id)
        found += 1
      }
    }
    return found
  }

  revealLetter(blockId) {
    let block = document.querySelector(`#${blockId}`)
    block.style.display = "block"
  }

  updateChosenLetters() {
    this.chosenLettersHTML.innerText = ""
    for(let letter of this.pickedLetters) {
      this.chosenLettersHTML.innerText += letter
    }
  }

  //API INTERACTION

  fetchPhrase() {
    fetch(`http://localhost:3000/phrases`)
      .then(res => res.json())
      .then(json => {
        console.log("fetching");
        this.boxId = 0;
        this.generateBoxes();
        let phrase = new Phrase(json)
        this.phrase = phrase
        this.renderPhrase(this.phrase.process())
      })
  }

  postScore() {
    let body = {
      name: this.player.name,
      score: this.player.score
    }
    let options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(body)
    }
    fetch(`http://localhost:3000/score_boards`)
      .then(res => res.json())
      .then(json => this.generateScoreList(json))

  }

  //RENDER
  renderPhrase(displayObject) {
    console.log('rendering');
    for(let k in displayObject) {
      if (displayObject[k].length > 0) {
        if (k === this.rowOne.id) {
          for(let i = 0; i < displayObject[k].length; i++){
            this.rowOneCardBlock[i].innerText = displayObject[k][i]
            this.styleBlock(this.rowOneCardBlock[i])
          }
        }
        if (k === this.rowTwo.id) {
          for(let i = 0; i < displayObject[k].length; i++){
            this.rowTwoCardBlock[i].innerText = displayObject[k][i]
            this.styleBlock(this.rowTwoCardBlock[i])
          }
        }
        if (k === this.rowThree.id) {
          for(let i = 0; i < displayObject[k].length; i++){
            this.rowThreeCardBlock[i].innerText = displayObject[k][i]
            this.styleBlock(this.rowThreeCardBlock[i])
          }
        }
        if (k === this.rowFour.id) {
          for(let i = 0; i < displayObject[k].length; i++){
            this.rowFourCardBlock[i].innerText = displayObject[k][i]
            this.styleBlock(this.rowFourCardBlock[i])
          }
        }
      }
    }
  }

  renderScore(score) {
    let date = new Date(score.created_at).toString()
    return `
    <li>${score.name} - $${score.score} - ${date}
    `
  }

  renderBox() {
    return `
    <div class="col-lg-1 ">
      <div class="card bg-success empty-box mb-3">
       <div class="card-block row-${Math.floor(this.boxId/12) + 1}" id="box-${++this.boxId}">
       </div>
      </div>
    </div>
    `
  }

  renderButton(char) {
    return `
    <button type="button" class="letter-button btn btn-lg btn-warning">${char}</button>
    `
  }

  styleBlock(block) {
    if (block.innerText.match(/^[a-zA-Z]+$/)) {
      block.style.display = "none"
      block.parentElement.classList.remove('bg-success')
      block.parentElement.classList.add('card-outline-success')
    } else if (block.innerText !== "") {
      block.parentElement.classList.remove('bg-success')
      block.parentElement.classList.add('card-outline-success')
    }
  }

  //GENERATE

  generateScoreList(json) {
    for(let score of json) {
      this.scoreList.innerHTML += this.renderScore(score)
    }
  }

  generateLetterButtons(letters) {
    this.keyRowOne.innerHTML = ""
    this.keyRowTwo.innerHTML = ""
    this.keyRowThree.innerHTML = ""
    for(let i = 0; i < letters.length; i++) {
      if (i < 7) {
        this.keyRowOne.innerHTML += this.renderButton(letters[i]);
      } else if (i >= 7 && i < 14) {
        this.keyRowTwo.innerHTML += this.renderButton(letters[i]);
      } else if (i >= 14) {
        this.keyRowThree.innerHTML += this.renderButton(letters[i]);
      }
    }
  }

  generateWheel(optional) {
    this.wheelContainer.innerHTML = ""
    this.wheel = new Wheel()
    this.wheelContainer.innerHTML = this.wheel.render(optional)
  }

  generateBoxes(){
    for (let row of this.gameBoardRows) {
      row.innerHTML = ""
      for(let i = 0; i < 12; i++) {
        row.innerHTML += this.renderBox();
      }
    }
    this.addSelectors()
  }

}
