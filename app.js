/**
 * TODO: 
 * Add heading to modal that says "Input Players' Names!"
 * Add the ability to select computer players, which will require an algo.
 * Allow player to select which symbol they want.
 * Refactor some of the messier code.
 */


function Player(name, symbol){
    let type = "human";
    let winner = false;
    const getSymbol = () => {
        return symbol;
    }
    const setWinner = (isWinner) => {
        winner = isWinner;
    }
    const getWinner = () => {
        return winner;
    }
    return { name, getSymbol, setWinner, getWinner };
}
function openDialog() {
    const dialog = document.getElementById('input-dialog');
    dialog.showModal();
}
openDialog();
const player1 = new Player('Player X', 'x');
const player2 = new Player('Player O', 'o');
const submitBtn = document.getElementById('submit');
submitBtn.addEventListener('click', () => {
    if (document.getElementById('input-form').checkValidity()){
       player1.name = document.getElementById('name').value;
       player2.name = document.getElementById('name2').value;
       document.getElementById('game-info').textContent = player1.name + "'s turn!";
       document.getElementById('input-dialog').close();
    }
    else{
        alert('Please enter the values');
    }
})

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
            return false;
        }
        // all validation checks passed
        else{
            gameBoard[y][x] = selection;
            return true;
        }
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
    let tie = false;

    const getWinner = (player1, player2) => {
        if (player1.getWinner()){
            return player1;
        }
        else if (player2.getWinner()){
            return player2;
        }
        else if (tie){
            return "tie";
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
        //check if all rows and columns are filled
        for (let i = 0; i < gameBoard.getBoard().length; i++){
            for (let j = 0; j < gameBoard.getBoard().length; j++){
                if (gameBoard.getBoard()[i][j] === ""){
                    return false;
                }
            }
        }
        return "tie"; 
        // ONLY return false after row AND column have been checked (and diag/anti if relevant)
    }
    const getTurn = () => {
        return lastTurn;
    }
    const isTurn = (player) => {
        if (player.getSymbol() !== lastTurn){
            return true;
        }
        return false;
    }
    // manage the turns of the game
    /**
     * TODO:  
     * Might refactor this to only take a single player as input, then keep the decision
     * logic in the display function.
     */
    const takeTurn = (player1, player2, xinput, yinput, gameBoard) => {
        if (!player1.getWinner() && !player2.getWinner()){
            // check which player has the correct symbol
            if (player1.getSymbol() !== lastTurn){
                if (!gameBoard.makeSelection(xinput, yinput, player1.getSymbol())){
                    console.log('input was invalid.');
                }
                else {
                    // set the last turn to the current player's type
                    lastTurn = player1.getSymbol();
                    // check winner
                    if (checkWinner(xinput, yinput, player1.getSymbol(), gameBoard) === "tie"){
                        tie = true;
                    }
                    else if (checkWinner(xinput, yinput, player1.getSymbol(), gameBoard)){
                        player1.setWinner(true);
                    }
                    return true;
                }
                return false;
            }            
            // check which player has the correct symbol
            else if (player2.getSymbol() !== lastTurn){
                if (!gameBoard.makeSelection(xinput, yinput, player2.getSymbol())){
                    console.log('input was invalid.');
                }
                else {
                    // set the last turn to the current player's type
                    lastTurn = player2.getSymbol();
                    // check winner
                    if (checkWinner(xinput, yinput, player2.getSymbol(), gameBoard) === "tie"){
                        tie = true;
                    }
                    else if (checkWinner(xinput, yinput, player2.getSymbol(), gameBoard)){
                        player2.setWinner(true);
                    }
                    return true;
                }
            }
        }
        return false;
    }
    const startNew = (player1, player2) => {
        board.newGame();
        player1.setWinner(false);
        player2.setWinner(false);
        lastTurn = "o";
        tie = false;
    }
    return { takeTurn, getTurn, isTurn, getWinner, startNew }
})();

// Handles control of the display
const controller = (function(){
    const gameInfo = document.getElementById('game-info');
    const grid = document.querySelectorAll('.grid-square');
    const resetBtn = document.createElement('button');
    const controls = document.getElementById('game-controls');
    resetBtn.classList.add('reset-button');
    resetBtn.addEventListener('click', () => {
        game.startNew(player1, player2);
        grid.forEach(square => {
            square.classList.remove('grid-square-x');
            square.classList.remove('grid-square-o');
        });
        resetBtn.parentNode.removeChild(resetBtn);
        displayTurn(player1, player2);
    });
    const displayTurn = (player1, player2) => {
        if (game.isTurn(player1)){
            gameInfo.textContent = player1.name + "'s turn!";
        }
        else if (game.isTurn(player2)){
            gameInfo.textContent = player2.name + "'s turn!";
        }
    }
    displayTurn(player1, player2);
    grid.forEach(square => {
        square.addEventListener('click', () => {
            // call the takeTurn Logic and use the result to display the correct squares
            if (game.takeTurn(player1, player2, square.getAttribute('x'), square.getAttribute('y'), board)){
                if (game.getTurn() === player1.getSymbol()){
                    square.classList.add('grid-square-x');
                }
                else if (game.getTurn() === player2.getSymbol()){
                    square.classList.add('grid-square-o');
                }
                displayTurn(player1, player2);
            }
            // call the detectWinner logic and use that to display the winner and the replay button.
            if (game.getWinner(player1, player2) === "tie"){
                gameInfo.textContent = "It's a tie!";
                resetBtn.textContent = "Replay?";
                controls.appendChild(resetBtn);
            }
            else if (game.getWinner(player1, player2) !== false){
                gameInfo.textContent = game.getWinner(player1, player2).name + " wins!";
                resetBtn.textContent = "Replay?";
                controls.appendChild(resetBtn);
            }
        });
    });
})();