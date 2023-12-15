/**
 * TODO: 
 * Need an IIFE for display logic.
 * 
 * Update the ability to select computer players, which will require an algo.
 * Detect and display which player's turn it is.
 * Allow player to select which symbol they want.
 * Refactor some of the messier code.
 * lastTurn might need to be reset if a winner is decided.
 */

/**
 * Need to figure out a factory method for this
 */
/* function displayController (gameObject){
    const game = gameObject;
    const gridSquares = document.querySelectorAll('.grid-square');
    let turn = "x";

    const setGame = (gameObject) => {
        game = gameObject;
    }
    const setTurn = (turn) => {
        this.turn = turn;
        gridSquares.forEach(square => {
            square.addEventListener('click', () =>{
                if (turn === 'x'){
                    console.log('x');
                }
                else if (turn === 'y') {
                    console.log('y');
                }
            });
        });
    } 
    return { setGame, setTurn }
} */

// Contains the functions for populating the gameBoard
const board = (function(){
    let gameBoard = [
        ["","",""],
        ["","",""],
        ["","",""]
    ];
    // returns the value of the current position on the gameboard
    const getSelection = (x, y) => { return gameBoard[y][x]; };
    const makeSelection = (x, y, selection) => {
        // validate x and y for null
        if (x === null || y === null || x === "" || y === ""){
            console.log('null input');
            return false;
        }
        // validate x and y for numeric values
        else if (isNaN(x) || isNaN(y)){
            console.log('nan');
            return false;
        }
        // validate range for x and y
        else if (x < 0 || x > 2 || y < 0 || y > 2){
            console.log('range error');
            return false;
        }
        // get the selection
        else if (getSelection(x,y) !== ""){
            console.log("expected spot was full");
            console.log(getSelection(x,y));
            return false;
        }
        // all validation checks passed
        else{
            gameBoard[y][x] = selection;
            return true;
        }
        // default return value in case errors were missed
        return false;
    }
    const getBoard = () => gameBoard;
    const newGame = () => {
            gameBoard = [
            ["","",""],
            ["","",""],
            ["","",""]
        ];
    }
    const toString = () => {
        let output = ""
        for (let i = 0; i < gameBoard.length; i++){
            for (let j = 0; j < gameBoard.length; j++){
                if(gameBoard[i][j] !== ""){
                    output += "[" + gameBoard[i][j] + "] "; 
                }
                else {
                    output += "[  ] ";
                }
            }
            output += "\r\n";
        }
        return output;
    }
    return { getSelection, makeSelection, getBoard, newGame, toString };
})();

// Contains the game's logic flow
const game = (function(){
    let lastTurn = "o";

    const getWinner = (player1, player2) => {
        if (player1.getWinner()){
            return player1;
        }
        else if (player2.getWinner()){
            return player2;
        }
        return false;
    }
    // check for the winner of the game
    const checkWinner = (x, y, selection, gameBoard) => {
        // checks diags only if a diagonal win is possible from the current selection
        if ((x === y) || 
            (x === '0' && y === '2') || 
            (x === '2' && y === '0')
            ) {
            //check diag  
            for (let i = 0; i < gameBoard.getBoard().length; i++){
                if (gameBoard.getBoard()[i][i] !== selection){
                    break;
                }
                else if (i === gameBoard.getBoard().length - 1){
                    return true;
                }
            }
            let j = 2;
            //check anti-diag
            for (let i = 0; i < gameBoard.getBoard().length; i++){
                if (gameBoard.getBoard()[i][j] !== selection){
                    break;
                }
                else if (i === gameBoard.getBoard().length - 1){
                    return true;
                }
                j--;
            }
        }
        // check current row
        for (let i = 0; i < gameBoard.getBoard().length; i++){
            if (gameBoard.getBoard()[y][i] !== selection){
                break;
            }
            else if (i === gameBoard.getBoard().length - 1){
                return true;
            }
        }
        // check current column
        for (let i = 0; i < gameBoard.getBoard().length; i++){
            if (gameBoard.getBoard()[i][x] !== selection){
                break;
            }
            else if (i === gameBoard.getBoard().length - 1){
                return true;
            }
        }
        return false; 
        // ONLY return false after row AND column have been checked (and diag/anti if relevant)
    }
    const getTurn = () => {
        return lastTurn;
    }
    // manage the turns of the game
    const takeTurn = (player1, player2, xinput, yinput, gameBoard) => {
        // TODO: refactor this into a single function
        if (!player1.getWinner() && !player2.getWinner()){
            // check which player has the correct symbol
            if (player1.getSymbol() !== lastTurn){
                if (!gameBoard.makeSelection(xinput, yinput, player1.getSymbol())){
                    console.log('input was invalid.');
                    /* xinput = prompt("pick your column (0-2)");
                    yinput = prompt("pick your row (0-2)"); */
                }
                else {
                    // set the last turn to the current player's type
                    lastTurn = player1.getSymbol();
                    console.log('turn successfully taken by player 1');
                    // check winner
                    if (checkWinner(xinput, yinput, player1.getSymbol(), gameBoard)){
                        player1.setWinner();
                    }
                    else {
                        console.log('p1: no winner');
                    }
                    return true;
                }
                return false;
            }            
            // check which player has the correct symbol
            else if (player2.getSymbol() !== lastTurn){
                if (!gameBoard.makeSelection(xinput, yinput, player2.getSymbol())){
                    console.log('input was invalid.');
                    /* xinput = prompt("pick your column (0-2)");
                    yinput = prompt("pick your row (0-2)"); */
                }
                else {
                    // set the last turn to the current player's type
                    lastTurn = player2.getSymbol();
                    console.log('turn successfully taken by player 2');
                    // check winner
                    if (checkWinner(xinput, yinput, player2.getSymbol(), gameBoard)){
                        player2.setWinner();
                    }
                    else {
                        console.log('p2: no winner');
                    }
                    return true;
                }
            }
        }
        return false;
    }
    return { takeTurn, getTurn, getWinner }
})();

/**
 * 
 */
const controller = (function(){
    const grid = document.querySelectorAll('.grid-square');
    grid.forEach(square => {
        square.addEventListener('click', () => {
            // call the takeTurn Logic and use the result to display the correct squares
            if (game.takeTurn(player1, player2, square.getAttribute('x'), square.getAttribute('y'), board)){
                if (game.getTurn() === 'x'){
                    square.classList.add('grid-square-x');
                }
                else if (game.getTurn() === 'o'){
                    square.classList.add('grid-square-o');
                }
            }
            // call the detectWinner logic and use that to display the winner and the replay button.
            if (game.getWinner(player1, player2) !== false){
                //this works as intended. Need to connect the logic to an element on the page.
                console.log(game.getWinner(player1, player2).name);
            }
        });
    });
})();

function Player(name, symbol){
    let type = "human";
    let winner = false;
    const getSymbol = () => {
        return symbol;
    }
    const setWinner = () => {
        winner = true;
    }
    const getWinner = () => {
        return winner;
    }
    return { name, getSymbol, setWinner, getWinner };
}
const player1 = new Player('Test', 'x');
const player2 = new Player('Test2', 'o');