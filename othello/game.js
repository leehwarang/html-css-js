const inputPrompt = require("./command");

class Game {
  constructor() {
    this.black = new Black(); // 흑돌이 1
    this.white = new White(); // 백돌이 0
    this.board = Array(8)
      .fill(7)
      .map(x => Array(8).fill(7));
    this.currentStoneColor;
    this.allDirection = [
      [-1, 0], // 상
      [1, 0], // 하
      [0, -1], // 좌
      [0, 1] // 우
      // [-1, 1],
      // [1, 1],
      // [1, -1],
      // [-1, -1]
    ];
  }

  initBoard() {
    this.board[3][3] = 0;
    this.board[4][4] = 0;
    this.board[3][4] = 1;
    this.board[4][3] = 1;
  }

  checkSamePosition(row, column) {
    return this.board[row][column] === 1 || this.board[row][column] === 0;
  }

  searchUniqueDirection(coordinate, index, startRow, startColumn) {
    let changeRowVal = coordinate[0];
    let changeColumnVal = coordinate[1];

    let stack = [[startRow, startColumn]];
    let target, x, y;

    switch (index) {
      case 0: // 상
        while (startRow !== 0) {
          x = startRow + changeRowVal;
          y = startColumn + changeColumnVal;
          target = this.board[x][y];
          if (target === this.currentStoneColor) {
            stack.forEach(val => {
              this.board[val[0]][val[1]] = this.currentStoneColor;
            });
            stack = [];
            break;
          } else if (target === 7) {
            stack = [];
            break;
          } else {
            stack.push([x, y]);
          }
          startRow -= 1;
        }
        break;

      case 1: // 하
        while (startRow !== 7) {
          x = startRow + changeRowVal;
          y = startColumn + changeColumnVal;
          target = this.board[x][y];

          if (target === this.currentStoneColor) {
            stack.forEach(val => {
              this.board[val[0]][val[1]] = this.currentStoneColor;
            });
            stack = [];
            break;
          } else if (target === 7) {
            stack = [];
            break;
          } else {
            stack.push([x, y]);
          }
          startRow += 1;
        }
        break;

      case 2: // 좌
        while (startColumn !== 0) {
          x = startRow + changeRowVal;
          y = startColumn + changeColumnVal;
          target = this.board[x][y];

          if (target === this.currentStoneColor) {
            stack.forEach(val => {
              this.board[val[0]][val[1]] = this.currentStoneColor;
            });
            stack = [];
            break;
          } else if (target === 7) {
            stack = [];
            break;
          } else {
            stack.push([x, y]);
          }
          startColumn -= 1;
        }

      case 3: // 우
        while (startColumn !== 7) {
          x = startRow + changeRowVal;
          y = startColumn + changeColumnVal;
          target = this.board[x][y];

          if (target === this.currentStoneColor) {
            stack.forEach(val => {
              this.board[val[0]][val[1]] = this.currentStoneColor;
            });

            stack = [];
            break;
          } else if (target === 7) {
            stack = [];

            break;
          } else {
            stack.push([x, y]);
          }
          startColumn += 1;
        }
        break;

      default:
        break;
    }
  }

  updateBoard(row, column, firstTurn) {
    this.currentStoneColor = firstTurn === "white" ? 0 : 1;

    if (this.checkSamePosition(row, column)) {
      console.log("이미 돌이 놓여져 있는 자리 입니다.");
      return firstTurn;
    }

    this.allDirection.forEach((coordinate, index) => {
      this.searchUniqueDirection(coordinate, index, row, column);
    });

    console.log(this.board);

    if (this.currentStoneColor === 0) {
      this.white.turn = false;
      this.black.turn = true;
      firstTurn = "black";
    } else {
      this.white.turn = true;
      this.black.turn = false;
      firstTurn = "white";
    }

    return firstTurn;
  }
}

class Black {
  constructor() {
    this.stone = 32;
    this.turn = false;
  }
}

class White {
  constructor() {
    this.stone = 32;
    this.turn = true;
  }
}

module.exports = Game;
