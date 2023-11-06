// set up the board with a function 

let instructions = document.getElementById('instructions');

class Slot {
    constructor(coord) {
        this.player = null;
        this.coord = coord;
    }
}

class Game {
    constructor() {
        this.board = [[],[],[],[],[],[],[]];
        this.activePlayer = 'red';
        
        this.makeBoard();
    }

    redWins = 0;
    blackWins = 0;

    makeBoard() {
        let rows = 6;
        let columns = 7;

        let board = document.getElementById('board');

        for (let r = 1; r <= rows; r++) {
            let row = document.createElement('div');
            row.setAttribute('class','row')
            for (let c = 1; c <= columns; c++) {
                let s = new Slot([c,r]);
                let slot = document.createElement('div');
                slot.addEventListener('click', () => {                    
                    this.placeToken(s);
                })
                slot.setAttribute('id',`${c}:${r}`);
                slot.setAttribute('class','slot');
                row.append(slot);
                this.board[c-1].push(s);
            }
            board.append(row);
        }
        instructions.innerText = `It is ${this.activePlayer}'s turn`

        let resetButton = document.getElementById('restart-button');
        resetButton.addEventListener('click', () => {this.clearBoard()});

        let replayButton = document.getElementById('play-again');
        replayButton.addEventListener('click', () => {this.clearBoard()});


    }

    placeToken(slot) {

        let columnArray = this.board[slot.coord[0] - 1]; // use this to grab the column array

        // check through the column array for an open slot, starting from bottom. set the first available slot's player to red and change div background color.
        
        for(let i = 5; i >= 0; i--) {
            if (columnArray[0].player != null){
                console.log("This column is full.");
                break;
            }
            if (columnArray[i].player === null) {
                columnArray[i].player = this.activePlayer;
                let filledSlot = document.getElementById(`${columnArray[i].coord[0]}:${columnArray[i].coord[1]}`);
                if (this.activePlayer === 'red'){
                    filledSlot.classList.add('red');
                } else {
                    filledSlot.classList.add('black');
                }
                let bottomSlot = [columnArray[0].coord[0], i + 1];
                this.checkBoard(bottomSlot);
                break;
            }
        }
        
        //Check for a full board and declare a draw
        let topRowFilled = 0;
        for (let i = 0; i < 7; i++) {
            if (this.board[i][0].player !== null) {
                topRowFilled++;
                if (topRowFilled >= 7) {
                    this.declareOutcome('draw');
                }
            }
        }

        //switch the current player
        instructions = document.getElementById('instructions');
        this.activePlayer = this.activePlayer === 'red' ? 'black' : 'red';
        instructions.innerText = `It is ${this.activePlayer}'s turn`
    }

    checkBoard(slot) {
        //create arrays of the row, column and diagonals into which the new token was dropped
        const currentBoard = this.board;
        let rowSlots = [];
        let colSlots = [];
        let diagDownSlots = [];
        let diagUpSlots = [];        
        
        //create row array from left to right, [0] to [6]
        for(let i = 0; i < 7; i++) {
            rowSlots.push(currentBoard[i][slot[1]-1]);
        }
        this.checkLine(rowSlots);

        //create column array from new token position down to the bottom, slot[1]-1 to [5]
        for(let i = slot[1] - 1; i < 6; i++) {
            colSlots.push(currentBoard[slot[0]-1][i]);
        }
        this.checkLine(colSlots);

        //create diagonal "up" array from bottom left to top right
        //start by finding bottom left slot
        let bottomLeft = [slot[0], slot[1]];
        while (bottomLeft[0] > 1 && bottomLeft[1] < 6) {
            bottomLeft[0]--;
            bottomLeft[1]++;
        }
        //push respective slots into the diagUpSlots array, moving up and right until edge of board is reached
        let x = bottomLeft[0];
        let y = bottomLeft[1];
        while (x < 8 && y > 0){
            diagUpSlots.push(currentBoard[x-1][y-1]);
            x++;
            y--;
        }
        this.checkLine(diagUpSlots);

        //create diagonal "down" array from bottom right to top left
        //start by finding bottom right slot
        let bottomRight = [slot[0], slot[1]];
        while (bottomRight[0] < 7 && bottomRight[1] < 6) {
            bottomRight[0]++;
            bottomRight[1]++;
        }
        
        //push respective slots into the diagDownSlots array, moving up and left until edge of board is reached
        x = bottomRight[0];
        y = bottomRight[1];
        while (x > 0 && y > 0){
            diagDownSlots.push(currentBoard[x-1][y-1]);
            x--;
            y--;
        }
        this.checkLine(diagDownSlots);
    }

    //check an array of slots for four consecutive tokens of the same player; declare winner if found and add one to winner's win counter
    checkLine (line) {
        let consecutivePieces = 1;
        for (let i = 1; i < line.length; i++) {
            if (line[i].player && line[i].player === line[i-1].player){
                consecutivePieces++;
                if (consecutivePieces >=4) {
                    if (line[i].player === 'red') {
                        this.redWins++
                    }
                    else {
                        this.blackWins++;
                    }

                    //update the win counters on the page
                    let redCounter = document.getElementById("red-wins");
                    let blackCounter = document.getElementById("black-wins");

                    redCounter.innerText = "Red wins: " + this.redWins;
                    blackCounter.innerText = "Black wins: " + this.blackWins;

                    this.declareOutcome(line[i].player);
                    return;
                }
            }
            else {
                consecutivePieces = 1;
            } 
        }
    }

    //display the game results on the page
    declareOutcome (result) {
        let winnerDiv = document.getElementById("winner");
        let winnerText = document.getElementById("winner-text");
        let playAgain = document.getElementById("play-again");
        playAgain.style.display = 'block';
        winnerDiv.style.display = 'flex';
        if (result !== 'draw'){
            winnerText.innerHTML = result + " wins!";
            winnerText.style.color = result;
        }
        else {
            winnerText.textContent = "It's a draw!";
        }
    }

    //Clear the game board for a new game
    clearBoard(){
        const currentBoard = this.board;
        
        let clearedBoard = document.getElementById('board');
        let winnerDiv = document.getElementById("winner");
        winnerDiv.style.display = 'none';
        clearedBoard.innerHTML = `<div id="status">
            <div id="instructions">It is red's turn</div>
            <div id="red-wins">Red wins: ${this.redWins}</div>
            <div id="black-wins">Black wins: ${this.blackWins}</div>
            </div>`;
        this.board = [[],[],[],[],[],[],[]];
        this.activePlayer = 'red';
        this.makeBoard();
    }
    
}

let game = new Game();



//add a dropping sound
//yeet button
//highlight the winning line