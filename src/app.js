class App {
  constructor() {
    this.pickeLetters = []
    this.consonants = ['Q', 'W', 'R', 'T', 'Y', 'P', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M']
    this.vowels = ['E', 'I', 'O', 'A','U']
    this.boxId = 0;
    this.gameBoardRows = document.querySelectorAll('#game-board .row')
    this.buttonContainer = document.querySelector('#button-container')
    this.buttonRows = document.querySelectorAll('#button-container .row')
    this.startGameButton = document.querySelector('#start-game-button')
    this.wheelContainer = document.querySelector('#wheel-container')
    this.letterContainer = document.querySelector('#letter-container')
    this.keyRowOne = document.querySelector('#key-row1')
    this.keyRowTwo = document.querySelector('#key-row2')
    this.keyRowThree = document.querySelector('#key-row3')
    //ROWS
    this.rowOne = document.querySelector('#row1')
    this.rowTwo = document.querySelector('#row2')
    this.rowThree = document.querySelector('#row3')
    this.rowFour = document.querySelector('#row4')
    this.wheel = new Wheel();
    this.generateBoxes()
    this.generateWheel();
    this.generateConsenantButtons()
    this.addSelectors()
    this.addEventListeners();

  }

  addSelectors() {
    this.rowOneCardBlock = document.querySelectorAll('.row-1')
    this.rowTwoCardBlock = document.querySelectorAll('.row-2')
    this.rowThreeCardBlock = document.querySelectorAll('.row-3')
    this.rowFourCardBlock = document.querySelectorAll('.row-4')
    this.wheelHTML = document.querySelector('#wheel')
  }

  addEventListeners(){
    this.addStartGameEvent()
    this.addButtonCharButtonEvent()
  }

  addStartGameEvent() {
    this.wheelContainer.addEventListener("click", () => {
      this.fetchPhrase();
      this.generateWheel(this.wheel.randomSelect());
    })
  }

  addButtonCharButtonEvent() {
    this.buttonContainer.addEventListener("click", (event) => {
      console.log(event.target.innerText);
    })
  }

  fetchPhrase() {

    fetch(`http://localhost:3000/phrases`)
      .then(res => res.json())
      .then(json => {
        // this.boxId = 0;
        // this.generateBoxes();
        let phrase = new Phrase(json)
        this.phrase = phrase
        console.log(this.phrase);
        this.renderPhrase(phrase.process())
      })
  }

  renderPhrase(displayObject) {
    for(let k in displayObject) {
      if (displayObject[k].length >= 0) {
        if (k === this.rowOne.id) {
          for(let i = 0; i < displayObject[k].length; i++){
            this.rowOneCardBlock[i].innerText = displayObject[k][i]
          }
        }
        if (k === this.rowTwo.id) {
          for(let i = 0; i < displayObject[k].length; i++){
            this.rowTwoCardBlock[i].innerText = displayObject[k][i]
          }
        }
        if (k === this.rowThree.id) {
          for(let i = 0; i < displayObject[k].length; i++){
            this.rowThreeCardBlock[i].innerText = displayObject[k][i]
          }
        }
        if (k === this.rowFour.id) {
          for(let i = 0; i < displayObject[k].length; i++){
            this.rowFourCardBlock[i].innerText = displayObject[k][i]
          }
        }
      }
    }
  }

  renderBox() {
    return `
    <div class="col-lg-1 ">
      <div class="card bg-success empty-box mb-3">
       <div class="card-block row-${Math.floor(this.boxId++/12) + 1}">
       </div>
      </div>
    </div>
    `
  }

  renderButton(char) {
    return `
    <button type="button" class="letter-button">${char}</button>
    `
  }

  generateConsenantButtons() {
    for(let i = 0; i < this.consonants.length; i++) {
      if (i < 7) {
        this.keyRowOne.innerHTML += this.renderButton(this.consonants[i]);
      } else if (i >= 7 && i < 14) {
        this.keyRowTwo.innerHTML += this.renderButton(this.consonants[i]);
      } else if (i >= 14) {
        this.keyRowThree.innerHTML += this.renderButton(this.consonants[i]);
      }
    }
  }

  generateWheel(optional) {
    this.wheelContainer.innerHTML = ""
    this.wheelContainer.innerHTML = this.wheel.render(optional)
  }

  generateBoxes(){
    for (let row of this.gameBoardRows) {
      row.innerHTML = ""
      for(let i = 0; i < 12; i++) {
        row.innerHTML += this.renderBox()
      }
    }
  }

}
