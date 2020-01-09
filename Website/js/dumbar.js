class grid {
  constructor(word, wordLength, x, y_array, height, width, letterBuffer) {
    this.word = word;
    this.x = x;
    this.y_array = y_array;
    this.wordLength = wordLength;
    this.columns = [];
    this.rows = [];
    this.height = height;
    this.width = width;
    this.isMoving = false;
    this.stepCounter = 0;
    this.letterBuffer = letterBuffer;

    this.targetColumns = [];
    this.targetRows = [];

    this.stepColumns = [];
    this.stepRows = [];
  }

  initValues() {
    for (let column of this.y_array) {
      let tempColumn = [];
      let tempTargetColumn = [];
      let tempStepColumn = [];
      for (let i = 0; i < column; i++) {
        tempColumn.push([0, 0]);
        tempTargetColumn.push([0, 0]);
        tempStepColumn.push([0, 0]);
      }
      this.columns.push(tempColumn);
      this.targetColumns.push(tempTargetColumn);
      this.stepColumns.push(tempStepColumn);
    }
    for (let i = 0; i < this.x; i++) {
      this.rows.push([0, 0]);
      this.targetRows.push([0, 0]);
      this.stepRows.push([0, 0]);
    }
  }

  generateColumnValues(init) {
    if (init) {
      for (let i = 0; i < this.columns.length; i++) {
        let values = randomSubdivide(this.height, this.columns[i].length);
        for (let j = 0; j < this.columns[i].length; j++) {
          this.columns[i][j] = [values[j], values[j + 1]];
        }
      }
    } else {
      for (let i = 0; i < this.targetColumns.length; i++) {
        let values = randomSubdivide(this.height, this.targetColumns[i].length);
        for (let j = 0; j < this.targetColumns[i].length; j++) {
          this.targetColumns[i][j] = [values[j], values[j + 1]];
          let step1 =
            (this.targetColumns[i][j][0] - this.columns[i][j][0]) / 30;
          let step2 =
            (this.targetColumns[i][j][1] - this.columns[i][j][1]) / 30;
          this.stepColumns[i][j] = [step1, step2];
        }
      }
    }
  }

  generateRowValues(init) {
    if (init) {
      let values = randomSubdivide(this.width, this.targetRows.length);
      for (let i = 0; i < this.rows.length; i++) {
        this.rows[i] = [values[i], values[i + 1]];
      }
    } else {
      let values = randomSubdivide(this.width, this.targetRows.length);
      for (let i = 0; i < this.rows.length; i++) {
        this.targetRows[i] = [values[i], values[i + 1]];
        let step1 = (this.targetRows[i][0] - this.rows[i][0]) / 30;
        let step2 = (this.targetRows[i][1] - this.rows[i][1]) / 30;
        this.stepRows[i] = [step1, step2];
      }
      this.moving = true;
    }
  }
  show() {
    let charCount = 0;
    for (let i = 0; i < this.columns.length; i++) {
      for (let j = 0; j < this.columns[i].length; j++) {
        if (charCount < this.word.length) {
          let letter = this.word.charAt(charCount);
          let x1 = this.rows[i][0];
          let x2 = this.rows[i][1];
          let y1 = this.columns[i][j][0];
          let y2 = this.columns[i][j][1];
          image(letterBuffer[letter], x1, y1, x2 - x1, y2 - y1);
          charCount += 1;
        }
      }
    }
  }

  move() {
    for (let i = 0; i < this.columns.length; i++) {
      this.rows[i][0] += this.stepRows[i][0];
      this.rows[i][1] += this.stepRows[i][1];
      for (let j = 0; j < this.columns[i].length; j++) {
        this.columns[i][j][0] += this.stepColumns[i][j][0];
        this.columns[i][j][1] += this.stepColumns[i][j][1];
      }
    }
    this.stepCounter += 1;
  }
}

let displayText = "tenletters";
let h = 1000;
let w = 600;
let backgroundColor = [255, 150, 253];
let letterBuffer = {};
let spam;

function setup() {
  textFont("monospace");
  createCanvas(w, h);
  background(backgroundColor[0], backgroundColor[1], backgroundColor[2]);
  rectMode(CORNERS);
  for (let i = 0; i < displayText.length; i++) {
    let char = displayText.charAt(i);
    if (!(char in letterBuffer)) {
      let buffer = createGraphics(250, 380);
      buffer.textSize(400);
      buffer.textFont("monospace");
      buffer.background(
        backgroundColor[0],
        backgroundColor[1],
        backgroundColor[2]
      );
      buffer.text(displayText.charAt(i), 0, 270);
      letterBuffer[char] = buffer;
    }
  }
  spam = new grid(displayText, 9, 3, [4, 2, 4], h, w, letterBuffer);

  spam.initValues();
  spam.generateColumnValues(true);
  spam.generateRowValues(true);
  spam.generateRowValues(false);
  spam.generateColumnValues(false);
}

function draw() {
  background(backgroundColor[0], backgroundColor[1], backgroundColor[2]);
  stroke(5);
  noFill();
  spam.show();
  if (spam.isMoving && spam.stepCounter <= 30) {
    console.log(spam);
    spam.move();
  }
  if (spam.stepCounter == 31) {
    spam.generateColumnValues(false);
    spam.generateRowValues(false);
    spam.isMoving = false;
    spam.stepCounter = 0;
  }
}

function keyPressed() {
  spam.stepCounter = 0;
  spam.generateColumnValues(false);
  spam.generateRowValues(false);
  spam.isMoving = true;
}

// function that takes a length and number of subdivisions as input and return that length
// randomly subdivided into x sections.
function randomSubdivide(length, number) {
  start = 0;
  values = [];
  values.push(0);
  if (length == 1) {
    return values;
  }
  for (let i = 1; i < number; i++) {
    let gap = Math.floor(length / number);
    let center = i * gap;
    center += Math.floor((Math.random() * gap) / 2) - gap / 4;
    values.push(center);
  }
  values.push(length);
  return values;
}
