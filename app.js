function GameBoard(){
    let gameBoard = [
        ["","",""],
        ["","",""],
        ["","",""]
    ];
    // Just an idea to check the row, column, diag, antidiag from each selection and determine a winner
    // whenever a move is made. If the row is equal to the length of the board in that direction and 
    // all the symbols are x or o, that symbol wins the game.
    let row = [];
    let column = [];
    let diag = [];
    let antidiag = [];
    const getSelection = (x, y) => gameBoard[x][y];
    const makeSelection = (x, y, selection) => {
        if (getSelection(x,y) === "" && selection === "x" || selection === "o"){
            gameBoard[x][y] = selection;
        }
        else{
            console.log("Error: selection must be 'x' or 'o'");
        }
    }

    return { getSelection, makeSelection, checkWinner };
}
function Player(name, symbol){
    return { name, symbol };
}