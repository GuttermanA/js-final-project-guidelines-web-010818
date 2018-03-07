class Wheel {
  constructor() {
    this.wheel = ['Lose a Spin', 'BANKRUPTCY', 'BANKRUPTCY', 2500, 500, 600, 700, 600, 650, 500, 700, ['BANKRUPTCY', 'DOUBLE', 'BANKRUPTCY'], 600, 550, 500, 600, 650, 'Extra Spin', 700, 800, 500, 650, 500, 900]
  }

  randomSelect() {
    let result = this.wheel[Math.floor(Math.random()*this.wheel.length)];
    if (Array.isArray(result)) {
      let finalResult = result[Math.floor(Math.random()*result.length)]
      this.lastResult = finalResult
      return finalResult
    } else {
      this.lastResult = result
      return result;
    }
  }

  render(wheelValue = "SPIN") {
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



}
