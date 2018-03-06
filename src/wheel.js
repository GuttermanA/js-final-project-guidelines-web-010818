class Wheel {
  constructor() {
    this.wheel = ['Lose a Turn', 'BANKRUPTCY', 'BANKRUPTCY', 2500, 500, 600, 700, 600, 650, 500, 700, ['BANKRUPTCY', 1000000, 'BANKRUPTCY'], 600, 550, 500, 600, 650, 'FREE PLAY', 700, 800, 500, 650, 500, 900]
  }

  randomSelect() {
    let result = this.wheel[Math.floor(Math.random()*this.wheel.length)];
    if (Array.isArray(result)) {
      return result[Math.floor(Math.random()*result.length)]
    } else {
      return result;
    }
  }

  render(wheelValue = "Start Game") {
    let color = ((1<<24)*Math.random()|0).toString(16)
    return `
      <div class="jumbotron jumbotron-fluid" id="wheel" style="background: #${color};">
      <div class="container">
        <h1 class="display-4">${wheelValue}</h1>
      </div>
      </div>
      `
    // `
    // <div class="col-lg-3" style="background: ${#+((1<<24)*Math.random()|0).toString(16)};">
    //   <h2>${default}</h2>
    // </div>
    // `
  }


//   `<div class="jumbotron jumbotron-fluid">
//   <div class="container">
//     <h1 class="display-4">Fluid jumbotron</h1>
//     <p class="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
//   </div>
// </div>`

}
