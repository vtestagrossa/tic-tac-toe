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
            console.log('test');
            gameBoard[y][x] = selection;
            return true;
        }
        // default return value in case errors were missed
        return false;
    }
    const getBoard = () => gameBoard;
    const newGame = () => gameBoard = [
        ["","",""],
        ["","",""],
        ["","",""]
    ];
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
    // check for the winner of the game
    const checkWinner = (x, y, selection, gameBoard) => {
        // checks diags only if a diagonal win is possible from the current selection
        if (x === y || 
            (x === 0 && y === 2 
            (x === 3 && y === 0 ))){
            //check diag  
            for (let i = 0; i < gameBoard.length; i++){
                if (gameBoard[i][i] !== selection){
                    console.log('no match');
                    return false;
                }
                if (i === gameBoard.length - 1){
                    console.log('winner on diag');
                    return true;
                }
            }
            let j = 2;
            //check anti-diag
            for (let i = 0; i < gameBoard.length; i++){
                if (gameBoard[j][i] !== selection){
                    return false;
                }
                if (i === gameBoard.length - 1){
                    console.log('winner on antidiag');
                    return true;
                }
                j--;
            }
        }
        // check current row
        for (let i = 0; i < gameBoard.length; i++){
            if (gameBoard[y][i] !== selection){
                break;
            }
            if (i === gameBoard.length - 1){
                console.log('winner on row');
                return true;
            }
        }
        // check current column
        for (let i = 0; i < gameBoard.length; i++){
            if (gameBoard[i][x] !== selection){
                return false;
            }
            if (i === gameBoard.length - 1){
                console.log('winner on column');
                return true;
            }
        }
    }
    // manage the turns of the game
    const takeTurn = (player1, player2, xinput, yinput, gameBoard) => {
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
                }
                // check winner
                if (checkWinner(xinput, yinput, player1.getSymbol(), gameBoard)){
                    player1.setWinner();
                }
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
                }
                // check winner
                if (checkWinner(xinput, yinput, player2.getSymbol(), gameBoard)){
                    player2.setWinner();
                }
            }
        }
        console.log(lastTurn);
        console.log(player1.getWinner() + " " + player2.getWinner());
    }
    return { takeTurn }
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
const testBoard = document.getElementById('test-board');
const submitBtn = document.getElementById('subBtn');
const inputx = document.getElementById('x');
const inputy = document.getElementById('y');
const player1 = new Player('Test', 'x');
const player2 = new Player('Test2', 'o');
let currentPlayer = player1;
submitBtn.addEventListener('click', () => {
    game.takeTurn(player1, player2, inputx.value, inputy.value, board);
    testBoard.textContent = board.toString();
    console.log(board.toString());
});
testBoard.textContent = board.toString();