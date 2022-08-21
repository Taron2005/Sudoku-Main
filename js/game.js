const gamePage = document.querySelector(".game__page");
let board = document.querySelector(".board");
let row = document.querySelectorAll(".row");
let moves__number = document.querySelector(".moves__number");
let cube__for__number = document.querySelectorAll(".cube__for__number");
let num = document.querySelectorAll(".num");
let menu = document.querySelector(".menu");
let startBtn = document.querySelector(".menu .start");
let selectedNumber = 1;

let boardNumbers = [];
let solution;
let EmptyCells = 0;
startBtn.addEventListener("click", () => {
  gamePage.classList.add("active");
  menu.classList.remove("active");
  game();
});
function game() {
  ChangeBoxes();
  makeBoard();
  WriteNumber();
  selectNumber();
  putNumber();
}
function WriteNumber() {
  for (let i = 0; i < boardNumbers.length; i++) {
    for (let j = 0; j < boardNumbers[i].length; j++) {
      if (boardNumbers[i][j] != "") {
        row[i].children[j].textContent = boardNumbers[i][j];
        row[i].children[j].style.backgroundColor = "black";
      }
    }
  }
}
for (let cube of cube__for__number) {
  cube.addEventListener("keydown", (e) => {});
}

function putNumber() {
  for (let i = 0; i < boardNumbers.length; i++) {
    for (let j = 0; j < boardNumbers[i].length; j++) {
      if (row[i].children[j].textContent == "") {
        row[i].children[j].addEventListener("click", function put() {
          moves__number.textContent++;
          if (selectedNumber == solution[i][j]) {
            row[i].children[j].textContent = selectedNumber;
          }
          if (row[i].children[j].textContent != "") {
            row[i].children[j].removeEventListener("click", put);
          }
          win();
        });
      }
    }
  }
}
function selectNumber() {
  document.addEventListener("keydown", (e) => {
    if (e.keyCode >= 49 && e.keyCode <= 57) {
      selectedNumber = e.key;
      for (d of num) {
        d.style.border = "1px solid white";
      }
      num[e.key - 1].style.border = "4px  dashed white";
    }
  });
  for (let selnum of num) {
    selnum.addEventListener("click", () => {
      for (d of num) {
        d.style.border = "1px solid white";
      }
      selectedNumber = selnum.textContent;
      selnum.style.border = "4px  dashed white";
    });
  }
}
function win() {
  let counter = 0;
  for (let cube of cube__for__number) {
    if (cube.textContent != "") {
      counter++;
    }
  }
  if (moves__number.textContent == EmptyCells + 4) {
    alert("Դուք կորցրեցիք 50% զեղչ շահելու հնարավորությունը");
  }
  if (moves__number.textContent == EmptyCells + 8) {
    alert("Դուք կորցրեցիք 24% զեղչ շահելու հնարավորությունը");
  }
  if (moves__number.textContent == EmptyCells + 12) {
    alert("Դուք կորցրեցիք զեղչ շահելու հնարավորությունը");
  }
  if (counter == 81) {
    alert("You finished the game");
    for (let cube of cube__for__number) {
      cube.textContent = "";
      cube.style.backgroundColor = "rgba(0, 0, 0, 0.849)";
    }
    moves__number.textContent = 0;
    gamePage.classList.remove("active");
    menu.classList.add("active");
  }
}

function ChangeBoxes() {
  let boxesArr = ChangeRows();
  let ChangedBoxes = [];
  for (let i = 0; i < 3; i++) {
    let min = Math.ceil(0);
    let max = Math.floor(boxesArr.length - 1);
    let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    ChangedBoxes.push(boxesArr[randomNum]);
    boxesArr.splice(randomNum, 1);
  }
  solution = ChangedBoxes[0].concat(ChangedBoxes[1].concat(ChangedBoxes[2]));
  changeColumns();
}
function ChangeRows() {
  let rows = [
    ["387491625", "241568379", "569327418"],
    ["758619234", "123784596", "496253187"],
    ["934176852", "675832941", "812945763"],
  ];

  let Changedrows = [];
  let result = [[], [], []];

  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < 3; j++) {
      let min = Math.ceil(0);
      let max = Math.floor(rows[i].length - 1);
      let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
      Changedrows.push(rows[i][randomNum]);
      rows[i].splice(randomNum, 1);
    }
  }
  for (i = 0; i < 3; i++) {
    result[0].push(Changedrows[i]);
    result[1].push(Changedrows[i + 3]);
    result[2].push(Changedrows[i + 6]);
  }
  return result;
}
function changeColumns() {
  let arrForModify = solution;
  let columns = [
    [[], [], []],
    [[], [], []],
    [[], [], []],
  ];
  let Changedcolumns = [];
  for (let i = 0; i < arrForModify.length; i++) {
    columns[0][0].push([arrForModify[i][0]]);
    columns[0][1].push([arrForModify[i][1]]);
    columns[0][2].push([arrForModify[i][2]]);
    columns[1][0].push([arrForModify[i][3]]);
    columns[1][1].push([arrForModify[i][4]]);
    columns[1][2].push([arrForModify[i][5]]);
    columns[2][0].push([arrForModify[i][6]]);
    columns[2][1].push([arrForModify[i][7]]);
    columns[2][2].push([arrForModify[i][8]]);
  }
  for (let i = 0; i < columns.length; i++) {
    for (let j = 0; j < 3; j++) {
      let min = Math.ceil(0);
      let max = Math.floor(columns[i].length - 1);
      let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
      Changedcolumns.push(columns[i][randomNum]);
      columns[i].splice(randomNum, 1);
    }
  }
  solution = Changedcolumns;
  return solution;
}
function makeBoard() {
  let counter = 1;
  let testboard = [[], [], [], [], [], [], [], [], []];
  for (i = 0; i < solution.length; i++) {
    for (j = 0; j < solution[i].length; j++) {
      if (
        solution[i][j] == counter ||
        solution[i][j] == counter - 1 ||
        solution[i][j] == counter + 1 ||
        solution[i][j] == counter + 2
      ) {
        counter++;
        testboard[i].push(solution[i][j]);
      } else {
        testboard[i].push("");
        EmptyCells++;
      }
      if (counter == 10) {
        counter = 1;
      }
    }
  }
  boardNumbers = testboard;
}
