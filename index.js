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

        //switch the current player
        this.activePlayer = this.activePlayer === 'red' ? 'black' : 'red';
        instructions.innerText = `It is now ${this.activePlayer}'s turn`
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
        console.log(diagDownSlots);
        this.checkLine(diagDownSlots);
    }

    checkLine (line) {
        let consecutivePieces = 1;
        for (let i = 1; i < line.length; i++) {
            if (line[i].player && line[i].player === line[i-1].player){
                consecutivePieces++;
                if (consecutivePieces >=4) {
                    console.log(line[i].player + " wins!");
                    //add code here to add 1 to player's win counter and reset the board
                    return;
                }
            }
            else {
                consecutivePieces = 1;
            } 
        }
    }
}

let game = new Game();



//add a dropping sound
//yeet button
//highlight the winning line