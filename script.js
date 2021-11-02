const cells = document.querySelectorAll(".cell");
const modal = document.querySelector(".modal");
const playAgain = document.querySelector(".play-again-button");

let turn = "";
let counterO = 0;
let counterX = 0;

//TicTacToes winning pattern
const winningPatterns = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["1", "4", "7"],
  ["2", "5", "8"],
  ["3", "6", "9"],
  ["1", "5", "9"],
  ["3", "5", "7"],
];

const gamePatternO = [];

const gamePatternX = [];

cells.forEach((cell) => {
  cell.addEventListener("click", function () {
    if (cell.classList.contains("enabled")) {
      cell.classList.remove("enabled");
    }
    //Check if what turn it is and call the function that creates either an X or an O
    if (turn === "first" || turn === "") {
      //Append the element to the cell(the O)
      const element = createElement("first");
      cell.appendChild(element);
      //Disable the cell that already has an item
      cell.classList.add("disabled");
      //Changing the turn
      turn = "second";
      //Pushing the number of the cell into an array
      gamePatternO.push(this.dataset.number);

      //Call the function that checks if someone won
      checkForWin(gamePatternO);
    } else {
      //Append the elements to the cell(the Xs)
      const [spanLeft, spanRight] = createElement("second");
      cell.appendChild(spanLeft);
      cell.appendChild(spanRight);
      //Disable the cell that already has an item
      cell.classList.add("disabled");
      //Changing the turn
      turn = "first";
      gamePatternX.push(this.dataset.number);
      //Call the function that checks if someone won
      checkForWin(gamePatternX);
    }
  });
});

//Function that creates the elements for the cells;
const createElement = (turn) => {
  if (turn === "first" || turn === "") {
    const span = document.createElement("span");
    span.classList.add("o");
    return span;
  } else if (turn === "second") {
    const spanLeft = document.createElement("span");
    const spanRight = document.createElement("span");
    spanLeft.classList.add("x", "x-left");
    spanRight.classList.add("x", "x-right");
    return [spanLeft, spanRight];
  }
};
//Function that checks if someone won or if it is a draw
const checkForWin = (player) => {
  for (let i = 0; i < winningPatterns.length; i++) {
    for (let j = 0; j < winningPatterns[i].length; j++) {
      console.log(
        winningPatterns[i][0],
        winningPatterns[i][1],
        winningPatterns[i][2]
      );

      if (
        !(
          player.includes(winningPatterns[i][0]) ||
          player.includes(winningPatterns[i][1]) ||
          player.includes(winningPatterns[i][2])
        )
      ) {
        break;
      } else if (
        player.includes(winningPatterns[i][0]) &&
        player.includes(winningPatterns[i][1]) &&
        player.includes(winningPatterns[i][2]) &&
        player.length >= 3
      ) {
        return gameEnded("win");
      }
    }
  }
  if (player.length >= 5) {
    return gameEnded("draw");
  }
};
//Function that displays the modal depending on what happend in the game
const gameEnded = (gameState) => {
  displayModal();
  if (gameState === "win") {
    if (turn === "second") {
      document.querySelector(
        ".modal-container-header"
      ).textContent = `Player O has won the game!`;
      counterO++;
      document.querySelector(".score-o").textContent = counterO;
    } else {
      document.querySelector(
        ".modal-container-header"
      ).textContent = `Player X has won the game!`;
      counterX++;
      document.querySelector(".score-x").textContent = counterX;
    }
  }
  if (gameState === "draw") {
    document.querySelector(
      ".modal-container-header"
    ).textContent = `It is a draw!`;
  }
};

const playAgainFunction = () => {
  modal.style.display = "none";
  removeChildsFunc();
  gamePatternO.length = 0;
  gamePatternX.length = 0;
  turn = "first";
};
playAgain.addEventListener("click", playAgainFunction);

//Reseting the game
document.querySelector(".reset").addEventListener("click", function () {
  modal.style.display = "none";
  counterO = 0;
  counterX = 0;
  gamePatternO.length = 0;
  gamePatternX.length = 0;
  document.querySelector(".score-o").textContent = counterO;
  document.querySelector(".score-x").textContent = counterX;
  removeChildsFunc();
  turn = "first";
});

const displayModal = () => {
  modal.style.display = "flex";
  cells.forEach((cell) => {
    cell.classList.add("disabled");
    cell.classList.remove("enabled");
  });
};
const removeChildsFunc = () => {
  cells.forEach((cell) => {
    while (cell.firstChild) {
      cell.removeChild(cell.firstChild);
    }
    cell.classList.add("enabled");
  });
};

document.querySelector(".rule").addEventListener("onmouseover", function () {
  document.querySelector(".rule").classList.add("animation");
});
