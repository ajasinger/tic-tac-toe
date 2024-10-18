//During your interview, you will pair on adding support for a computer player to your game. 
//You can start with random moves and make the AI smarter if you have time.

const player1 = 'X';
const player2 = 'O';
let currentPlayer = player1;
const squares = new Array(9).fill('');
const board = document.getElementById('board');
const gameStatus = document.getElementById('gameStatus').querySelector('h2');
const resetButton = document.getElementById('resetButton').querySelector('button');

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const newGame = () => {
    //revert to initial presets
    currentPlayer = player1;
    squares.fill('');
    gameStatus.textContent = `${currentPlayer}'s turn`;
    //revert to blank board and make clickable
    board.querySelectorAll('.square').forEach((square, index) => {
        square.textContent = '';
        square.style.pointerEvents = 'auto'; 
        square.addEventListener('click', () => handleSquareClick(index), { once: true });
    });
}

// Start the game on page load
newGame();

const handleSquareClick = (index) => {
    //if square is blank
    if (squares[index] === '') {
        squares[index] = currentPlayer;
        document.getElementById(`square${index}`).textContent = currentPlayer;
        if (isWin()) {
            gameStatus.textContent = `${currentPlayer} wins!`;
            disableBoard();
        } else if (isTie()) {
            gameStatus.textContent = "It's a tie!";
            disableBoard();
        } else {
            currentPlayer = currentPlayer === player1 ? player2 : player1;
            gameStatus.textContent = `${currentPlayer}'s turn`;
        }
    }
}

const isWin = () => {
    return winningCombinations.some(combination => {
        return combination.every(index => squares[index] === currentPlayer);
    });
}

const isTie = () => {
    return squares.every(square => square !== '');
}

const disableBoard = () => {
    board.querySelectorAll('.square').forEach(square => {
        //prevent clicks
        square.style.pointerEvents = 'none';
    });
}

// Reset the game
resetButton.addEventListener('click', newGame);
