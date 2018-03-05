class App {
  constructor() {
    this.rows = document.querySelectorAll('.row')
    this.startGameButton = document.querySelector('#start-game-button')
    //ROWS
    this.rowOne = document.querySelector('#row-1')
    this.rowTwo = document.querySelector('#row-2')
    this.rowThree = document.querySelector('#row-3')
    this.rowFour = document.querySelector('#row-4')
    this.addEventListeners()
    this.boxId = 0;
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
      .then(json => console.log(json))
  }

  renderBox() {
    return  `
    <div class="col-lg-1 ">
      <div class="card bg-success empty-box mb-3" id="box-${++this.boxId}">
        <div class="card-block">
       </div>
      </div>
    </div>
    `
  }

  generateBoxes(){
    for (let row of this.rows) {
      for(let i = 0; i < 12; i++) {
        row.innerHTML += this.renderBox()
      }
    }
  }

}
