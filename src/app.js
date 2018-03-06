class App {
  constructor() {
    this.rows = document.querySelectorAll('.row')
    this.startGameButton = document.querySelector('#start-game-button')
    //ROWS
    this.rowOne = document.querySelector('#row1')
    this.rowTwo = document.querySelector('#row2')
    this.rowThree = document.querySelector('#row3')
    this.rowFour = document.querySelector('#row4')
    this.addEventListeners()
    this.boxId = 0;
  }

  addSelectors() {
    this.rowOneCardBlock = document.querySelectorAll('.row-1')
    this.rowTwoCardBlock = document.querySelectorAll('.row-2')
    this.rowThreeCardBlock = document.querySelectorAll('.row-3')
    this.rowFourCardBlock = document.querySelectorAll('.row-4')
  }

  addEventListeners(){
    this.addStartGameEvent()
  }

  addStartGameEvent() {
    this.startGameButton.addEventListener("click", () => {
      this.fetchPhrase()
    })
  }

  fetchPhrase() {

    fetch(`http://localhost:3000/phrases`)
      .then(res => res.json())
      .then(json => {
        // this.boxId = 0;
        // this.generateBoxes();
        let phrase = new Phrase(json)
        console.log(phrase)
        console.log(this)
        this.renderPhrase(phrase.process())
      })
  }

  renderPhrase(displayObject) {
    for(let k in displayObject) {
      if (displayObject[k].length >= 0) {
        if (k === this.rowOne.id) {
          for(let i = 0; i < displayObject[k].length; i++){
            this.rowOneCardBlock[i].innerText = displayObject[k][i]
            console.log(this.rowOneCardBlock[i].innerText);
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

  renderBox(cardBlockText="") {
    return `
    <div class="col-lg-1 ">
      <div class="card bg-success empty-box mb-3">
       <div class="card-block row-${Math.floor(this.boxId++/12) + 1}">
       ${cardBlockText}
       </div>
      </div>
    </div>
    `
  }

  renderConsenantButtons() {
    
  }

  generateBoxes(){
    for (let row of this.rows) {
      row.innerHTML = ""
      for(let i = 0; i < 12; i++) {
        row.innerHTML += this.renderBox()
      }
    }
  }

}
