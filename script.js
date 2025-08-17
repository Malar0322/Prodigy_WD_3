const board = document.getElementById("board");
const statusText = document.getElementById("statusText");
const resetBtn = document.getElementById("resetBtn");

let cells = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = true;

// Winning combinations
const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// Create cells dynamically
function createBoard() {
    board.innerHTML = "";
    cells.forEach((_, index) => {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("data-index", index);
        cell.addEventListener("click", cellClicked);
        board.appendChild(cell);
    });
}

function cellClicked() {
    const index = this.getAttribute("data-index");

    if (cells[index] !== "" || !running) return;

    cells[index] = currentPlayer;
    this.textContent = currentPlayer;

    checkWinner();
}

function checkWinner() {
    let roundWon = false;
    let winningCells = [];

    for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            roundWon = true;
            winningCells = [a, b, c];
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `Player ${currentPlayer} Wins!`;
        highlightWinner(winningCells);
        running = false;
    } else if (!cells.includes("")) {
        statusText.textContent = "It's a Tie!";
        running = false;
    } else {
        currentPlayer = (currentPlayer === "X") ? "O" : "X";
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function highlightWinner(winningCells) {
    const allCells = document.querySelectorAll(".cell");
    winningCells.forEach(index => {
        allCells[index].classList.add("winner");
    });
}

resetBtn.addEventListener("click", resetGame);

function resetGame() {
    cells = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    running = true;
    statusText.textContent = `Player ${currentPlayer}'s turn`;
    createBoard();
}

createBoard();
