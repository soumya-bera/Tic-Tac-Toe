// Show section (menu hide, board show)
function showSection(id) {
  document.getElementById("menu").style.display = "none";
  document.querySelectorAll('.game-section').forEach(sec => sec.style.display = "none");
  document.getElementById(id).style.display = "block";
  initBoard(id); 
}

// Back to menu
function goBack() {
  document.getElementById("menu").style.display = "block";
  document.querySelectorAll('.game-section').forEach(sec => sec.style.display = "none");
}

// Restart a game
function restartGame(mode) {
  initBoard(mode);
}

// Initialize board for each mode
function initBoard(mode) {
  let boardElement = document.getElementById(`board-${mode}`);
  boardElement.innerHTML = "";
  let cells = Array(9).fill(null);
  let currentPlayer = "X";
  let gameOver = false;

  // create cells
  cells.forEach((_, i) => {
    let cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("click", () => {
      if (!gameOver && !cells[i]) {
        cells[i] = currentPlayer;
        cell.innerText = currentPlayer;
        if (checkWin(cells, currentPlayer)) {
          document.getElementById(`status-${mode}`).innerText = `${currentPlayer} Wins!`;
          gameOver = true;
          return;
        } else if (cells.every(c => c)) {
          document.getElementById(`status-${mode}`).innerText = "Draw!";
          gameOver = true;
          return;
        }
        // Switch turn
        currentPlayer = currentPlayer === "X" ? "O" : "X";

        // Computer move (only for computer mode)
        if (mode === "computer" && currentPlayer === "O" && !gameOver) {
          let emptyIndexes = cells.map((c, idx) => c ? null : idx).filter(c => c !== null);
          let move = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
          cells[move] = "O";
          boardElement.children[move].innerText = "O";
          if (checkWin(cells, "O")) {
            document.getElementById(`status-${mode}`).innerText = "Computer Wins!";
            gameOver = true;
          } else if (cells.every(c => c)) {
            document.getElementById(`status-${mode}`).innerText = "Draw!";
            gameOver = true;
          }
          currentPlayer = "X";
        }
      }
    });
    boardElement.appendChild(cell);
  });

  document.getElementById(`status-${mode}`).innerText = "";
}

// Check win
function checkWin(cells, player) {
  const wins = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // cols
    [0,4,8],[2,4,6]          // diagonals
  ];
  return wins.some(comb => comb.every(idx => cells[idx] === player));
}
