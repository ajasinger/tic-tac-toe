//During your interview, you will pair on adding support for a computer player to your game. 
//You can start with random moves and make the AI smarter if you have time.

// add 2-player button & computer button 
// set a new game 
// a new state computerGame
// after a move check if it's a computerGame and make move 
// for computerMove check which squares are free by mapping through squares array 
// record which squares are empty and assign a random index from that 
// pass in randomIndex to handleSquareClick


const player1 = 'X';
const player2 = 'O';
let computerPlayer = false;
let currentPlayer = player1;
const squares = new Array(9).fill('');
const board = document.getElementById('board');
const gameStatus = document.getElementById('gameStatus').querySelector('h2');
//const resetButton = document.getElementById('resetButton').querySelector('button');

document.getElementById('humanMode').addEventListener('click', () => {
    computerPlayer = false;
    newGame();
});

document.getElementById('computerMode').addEventListener('click', () => {
    computerPlayer = true;
    newGame();
});

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
//newGame();

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
            if(computerPlayer && player2) {
                computerMove();
            }
        }
    }
}

const computerMove = () => {
    // for computerMove check which squares are free by mapping through squares array 
    // record which squares are empty and assign a random index from that 
    // pass in randomIndex to handleSquareClick
    let emptyIndex = [];
    squares.map((square, index)=> {
        console.log('square', square);
        if(square === '') {
            emptyIndex.push(index);
        }
    })
    console.log('emptyIndex', emptyIndex);
    // const emptySquares = squares.filter(square => {

    // })
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
//resetButton.addEventListener('click', newGame);
