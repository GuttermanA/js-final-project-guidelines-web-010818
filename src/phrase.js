class Phrase {
  constructor({ text, category_name}) {
    this.text = text;
    this.categoryName = category_name
    this.process = this.process.bind(this)
  }

process() {
  let displayObject = {row1: [], row2:[], row3:[], row4:[]};
  let splitPhrase = this.text.split(/(\s+)/);

  let rowNum = 1;
  let currentRowRemainder = 12;

  for (let i = 0; i < splitPhrase.length; i++) {
    if (currentRowRemainder - splitPhrase[i].length >= 0) {
      displayObject[`row${rowNum}`].push(splitPhrase[i]);
      currentRowRemainder -= splitPhrase[i].length;
    } else {
      rowNum++;
      currentRowRemainder = 12;
      displayObject[`row${rowNum}`].push(splitPhrase[i]);
      currentRowRemainder -= splitPhrase[i].length;
    }
  }
  for(let k in displayObject) {
    displayObject[k] = displayObject[k].join("").toUpperCase().split("");
  }
  console.log(displayObject);
  this.displayObject = displayObject
  return displayObject;
}


  //ORIGINAL PROCESS
  // process() {
  //   let displayObject = {row1: [], row2:[], row3:[], row4:[]}
  //   let splitPhrase = this.text.split(/(\s+)/)
  //   debugger
  //   for (let i = 0; i < splitPhrase.length; i++) {
  //     if ((displayObject["row1"].join(" ").length + splitPhrase[i].length) <= 12) {
  //       displayObject["row1"].push(splitPhrase[i])
  //     } else if ((displayObject["row2"].join(" ").length + splitPhrase[i].length) <= 12) {
  //       displayObject["row2"].push(splitPhrase[i])
  //     } else if ((displayObject["row3"].join(" ").length + splitPhrase[i].length) <= 12) {
  //       displayObject["row3"].push(splitPhrase[i])
  //     } else if ((displayObject["row4"].join(" ").length + splitPhrase[i].length) <= 12) {
  //       displayObject["row4"].push(splitPhrase[i])
  //     } else {
  //       console.error("Phrase is too long to fit")
  //     }
  //   }
  //   for(let k in displayObject) {
  //     displayObject[k] = displayObject[k].join("").split("")
  //   }
  //   console.log(displayObject);
  //   return displayObject
  // }


  //PROCESS WITH WHILE
  // process() {
  //   let splitPhrase = this.text.split(/(\s+)/)
  //   for(let k in this.displayObject) {
  //     let rowLength = this.
  //     while (this.displayObject[k].length <= 12) {
  //       for(let word of splitPhrase) {
  //         this.displayObject[k].push(word)
  //       }
  //     }
  //   }
  // }

}
