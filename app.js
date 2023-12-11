// Contains the functions for populating the gameBoard
const board = (function(){
    let outputString = "";
    let gameBoard = [
        ["","",""],
        ["","",""],
        ["","",""]
    ];
    // returns the value of the current position on the gameboard
    const getSelection = (x, y) => gameBoard[y][x];
    const makeSelection = (x, y, selection) => {
        if (getSelection(x,y) === "" && selection === "x" || selection === "o"){
            gameBoard[y][x] = selection;
        }
        else if (getSelection(x,y) !== ""){
            console.log("space not empty");
        } else {
            console.log("Error: selection must be 'x' or 'o'");
        }
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
                output += "[" + gameBoard[j][i] + "] "; 
            }
            output += "\n";
        }
        return output;
    }
    return { getSelection, makeSelection, getBoard, newGame, toString };
})();

// Contains the game's logic flow
const game = (function(){
    let lastTurn = "x";
    // manage the turns of the game
    const takeTurn= (player1, player2) => {
        
    }

    // check for the winner of the game
    const checkWinner = (x, y, selection, gameBoard) => {
        // checks diags only if a diagonal win is possible from the current selection
        if (x === y || 
            (x === 0 && y === 2 
            (x === 3 && y === 0 ))){
            //check diag  
            for (let i = 0; i < gameBoard.length; i++){
                if (gameBoard[i][i] !== selection){
                    break;
                }
                if (i === gameBoard.length - 1){
                    console.log('winner on diag');
                }
            }
            let j = 2;
            //check anti-diag
            for (let i = 0; i < gameBoard.length; i++){
                if (gameBoard[j][i] !== selection){
                    break;
                }
                if (i === gameBoard.length - 1){
                    console.log('winner on antidiag');
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
            }
        }
        // check current column
        for (let i = 0; i < gameBoard.length; i++){
            if (gameBoard[i][x] !== selection){
                break;
            }
            if (i === gameBoard.length - 1){
                console.log('winner on column');
            }
        }
    }
    return {  }
})();

function Player(name, symbol){
    let type = "human";
    const getType = () => {
        return type;
    }
    const takeTurn = () => {

    }
    return { name, symbol, getType, takeTurn };
}

console.log(board.toString());