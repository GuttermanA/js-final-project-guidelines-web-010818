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
    this.vowelRow = document.querySelector('#vowel-row')
    this.vowelContainer = document.querySelector('#vowel-container')
    this.spins = document.querySelector('#spins')
    this.currentUser = document.querySelector('#current-user')
    this.winnings = document.querySelector('#winnings')
    this.currentCategory = document.querySelector('#current-category')
    this.wheel = new Wheel()
    //ROWS
    this.rowOne = document.querySelector('#row1')
    this.rowTwo = document.querySelector('#row2')
    this.rowThree = document.querySelector('#row3')
    this.rowFour = document.querySelector('#row4')
    this.generateBoxes()
    this.generateWheel();
    this.generateLetterButtons(this.consonants)
    this.generateLetterButtons(this.vowels, true)
    this.addSelectors()
    this.addEventListeners();
    this.renderPhrase = this.renderPhrase.bind(this)

  }

  //NOTE: ADD PAGE MANIPULATION

  addSelectors() {
    this.allCardBlocks = document.querySelectorAll('.card-block h1')
    this.rowOneCardBlock = document.querySelectorAll('.row-1')
    this.rowTwoCardBlock = document.querySelectorAll('.row-2')
    this.rowThreeCardBlock = document.querySelectorAll('.row-3')
    this.rowFourCardBlock = document.querySelectorAll('.row-4')
    this.wheelHTML = document.querySelector('#wheel')
    this.modalForm = document.querySelector('#modal-form')
  }

  addEventListeners(){
    this.addSpinWheelEvent()
    this.addButtonEvents()
    this.addStartGameEvent()
    this.addPlayAgainEvent()
    this.solveButton.addEventListener("click", () => {
      this.solve()
      this.solveButton.classList.add('disabled')
    })
    this.buyAVowelButton.addEventListener("click", () =>{
      this.vowelContainer.classList.remove('disabled-div')
      this.player.score -= 250
      this.winnings.innerText = this.player.score
      this.buyAVowelButton.classList.add('disabled')
    })
  }

  addSpinWheelEvent() {
    this.wheelContainer.addEventListener("click", () => {
      this.generateWheel(this.wheel.randomSelect());
      this.player.spinCounter += 1
      this.spins.innerText = 20 - this.player.spinCounter
      if (this.wheel.lastResult === "BANKRUPTCY" || this.wheel.lastResult === "Lose a Spin") {
        if (this.player.spinCounter === 20) {
          this.gameOver()
        } else {
          this.player.wheelEffect(this.wheel.lastResult)
          this.toggleDisplay(this.buyAVowelButton, true)
          this.toggleDisplay(this.solveButton, true)
        }
      } else {
        this.buttonContainer.classList.remove('disabled-div')
        this.wheelContainer.classList.add('disabled-wheel')
      }
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
    for(let button of this.playAgainButtons) {
      button.addEventListener("click", () =>{
        window.location.reload()
      })
    }
  }

  addButtonEvents() {
    this.buttonContainer.addEventListener("click", (event) => {
      let button = event.target
      console.log(button.innerText);
      this.checkSelection(button.innerText)
      button.classList.add('disabled')
    })
    this.vowelContainer.addEventListener("click", (event) => {
      if (this.player.score < 250) {
        alert('Not enough money to buy a vowel.')
      } else {
        let button = event.target
        console.log(button.innerText);
        this.checkSelection(button.innerText)
        button.classList.add('disabled')
        this.vowelContainer.classList.add('disabled-div')


      }
    })
  }

  checkSelection(eventTarget) {
    if (!this.pickedLetters.includes(eventTarget)) {
      this.pickedLetters.push(eventTarget)
      this.updateChosenLetters()
    }
    if (this.vowels.includes(eventTarget)) {
      this.player.boughtAvowel = true
    } else {
      this.player.boughtAvowel = false
    }
    let nLetters = this.matchSelection(eventTarget)
    if (nLetters) {
      console.log('success');
      this.player.successfulGuesses += 1
      this.player.wheelEffect(this.wheel.lastResult, nLetters)
      this.toggleDisplay(this.buyAVowelButton)
      this.toggleDisplay(this.solveButton)
      this.buyAVowelButton.classList.remove('disabled')
      this.solveButton.classList.remove('disabled')
    } else {
      this.failedGuess()
    }
    this.buttonContainer.classList.add('disabled-div')
    if (this.player.spinCounter === 20) {
      this.gameOver()
    } else {
      this.wheelContainer.classList.remove('disabled-wheel')
    }
  }

  failedGuess() {
    this.player.successfulGuesses = 0
    this.toggleDisplay(this.buyAVowelButton, true)
    this.toggleDisplay(this.solveButton, true)
    this.toggleDisplay(this.solveForm, true)
    console.log('failure')
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
        this.player.solvePuzzleScorer(this.wheel.lastResult, this.numLettersRemaining())
        this.phrase.solved = true
        this.solvedPhrase()
      } else {
        alert("Incorrect!")
        this.failedGuess()
      }

    })
  }

  numLettersRemaining() {
    let cardBlocks = document.querySelectorAll('.card-block')
    let hidden = []
    for(let block of cardBlocks){
      if (block.style.display === "none") {
        hidden.push(block)
      }
    }
    return hidden.length
  }

  solvedPhrase() {
    if (this.remainingChars === 0 || this.phrase.solved) {
      this.fetchPhrase()
      this.generateLetterButtons(this.consonants)
      this.generateLetterButtons(this.vowels, true)
      this.generateWheel()
      this.addEventListeners()
      this.chosenLettersHTML.innerText = ""
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
        this.revealLetter(block.parentElement.id)
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
        this.currentUser.innerText = this.player.name
        this.spins.innerText = 20 - this.player.spinCounter
        this.winnings.innerText = this.player.score
      })
  }

  postScore() {
    console.log(this.player);
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
    fetch(`http://localhost:3000/score_boards`, options)
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
            this.rowOneCardBlock[i].innerHTML = `<h1>${displayObject[k][i]}</h1>`
            this.styleBlock(this.rowOneCardBlock[i])

          }
        }
        if (k === this.rowTwo.id) {
          for(let i = 0; i < displayObject[k].length; i++){
            this.rowTwoCardBlock[i].innerHTML = `<h1>${displayObject[k][i]}</h1>`
            this.rowTwoCardBlock[i]
            this.styleBlock(this.rowTwoCardBlock[i])
          }
        }
        if (k === this.rowThree.id) {
          for(let i = 0; i < displayObject[k].length; i++){
            this.rowThreeCardBlock[i].innerHTML = `<h1>${displayObject[k][i]}</h1>`
            this.styleBlock(this.rowThreeCardBlock[i])
          }
        }
        if (k === this.rowFour.id) {
          for(let i = 0; i < displayObject[k].length; i++){
            this.rowFourCardBlock[i].innerHTML = `<h1>${displayObject[k][i]}</h1>`
            this.styleBlock(this.rowFourCardBlock[i])
          }
        }
      }
    }
    this.currentCategory.innerText = this.phrase.categoryName
    this.addSelectors()
  }

  renderScore(score) {
    return `
    <li>${score.name} - $${score.score}
    `
  }

  renderBox() {
    return `
    <div class="col-lg-1 ">
      <div class="card bg-success empty-box m-1">
       <div class="card-block row-${Math.floor(this.boxId/12) + 1} text-center h1 strong lead my-auto" id="box-${++this.boxId}">
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
    if (block.querySelector('h1').innerText.match(/^[a-zA-Z]+$/)) {

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
    document.querySelector('#score-display').innerText += this.player.score
    for(let score of json) {
      this.scoreList.innerHTML += this.renderScore(score)
    }
  }

  generateLetterButtons(letters, vowels) {
    if (vowels) {
      this.vowelRow.innerHTML = "";
      for(let i = 0; i < letters.length; i++) {
        this.vowelRow.innerHTML += this.renderButton(letters[i]);
        this.vowelRow.classList.add('disabled');
      }
    } else {
      this.keyRowOne.innerHTML = "";
      this.keyRowTwo.innerHTML = "";
      this.keyRowThree.innerHTML = "";
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

  }

  generateWheel(optional) {
    let wheelContent = this.wheelContainer;
    wheelContent.innerHTML = "";
    wheelContent.innerHTML = "<img src='https://www.gifanimate.net/wp-content/uploads/gift08.gif'></img>";;
    setTimeout(()=>{wheelContent.innerHTML = this.wheel.render(optional)}, 1200);
    // this.wheelContainer.innerHTML = this.wheel.render(optional);
  }

  generateBoxes(){
    for (let row of this.gameBoardRows) {
      row.innerHTML = "";
      for(let i = 0; i < 12; i++) {
        row.innerHTML += this.renderBox();
      }
    }
    this.addSelectors();
  }

}
