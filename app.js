function GameBoard(){
    let gameBoard = [
        ["x","","x"],
        ["x","x","x"],
        ["o","x","x"]
    ];
    // Just an idea to check the row, column, diag, antidiag from each selection and determine a winner
    // whenever a move is made.
    let row = [];
    let column = [];
    let diag = [];
    let antidiag = [];
    const getSelection = (x, y) => gameBoard[y][x];
    const makeSelection = (x, y, selection) => {
        if (getSelection(x,y) === "" && selection === "x" || selection === "o"){
            gameBoard[y][x] = selection;
            checkWinner(x, y, selection);
        }
        else if (getSelection(x,y) !== ""){
            console.log("space not empty");
        } else {
            console.log("Error: selection must be 'x' or 'o'");
        }
    }
    const checkWinner = (x, y, selection) => {
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
                    break
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
    return { getSelection, makeSelection };
}
function Player(name, symbol){
    return { name, symbol };
}

const test = new GameBoard();
test.makeSelection(1, 0, "x");