/* 

    Build a grid 7 x 6
        rid of positions: 7 col, 6 rows

        We have a grid object, and each slot
            Slot has info: 
                Either: 0, Red, Black
            CLASS OF SLOT -
                Player: null
                Coordinates/ [0,0] = bottom left (OR top left)
            
    Test for win condition:
        Has to check all around itself
        
        Each current play/token play
            Has 8 directions to check

            //check all the way in one direction

            //don't forget to also check in the other direction too

    Build players
        Name:
        Color:
        WinCounter:

*/

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
        // this.activePlayer = 'red';
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
                    //place token in lowest available slot
                    this.placeToken(s);
                    //change active player
                    

                    //check for win conditions
                    //this.checkBoard();
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
                this.checkBoard();
                // filledSlot.style.backgroundColor = player;
                //console.log(this.board);
                break;
            }
            
            
        }

        this.activePlayer = this.activePlayer === 'red' ? 'black' : 'red';
        instructions.innerText = `It is now ${this.activePlayer}'s turn`
    }

    checkBoard() {

        let board = this.board;
        console.log(board[0]);

        // Check vertical
        for (let row = 0; row < 6; row++) {
            for (let col = 0; col < 3; col++) {
                if (board[row][col].player !== null &&
                board[row][col].player === board[row][col + 1].player &&
                board[row][col].player === board[row][col + 2].player &&
                board[row][col].player === board[row][col + 3].player) {
                    console.log("inside vertical statement.")
                return board[row][col];
            }
          }
        }

        // Check horizontal
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 6; col++) {
                if (board[row][col].player !== null &&
                    board[row][col].player === board[row + 1][col].player &&
                    board[row][col].player === board[row + 2][col].player &&
                    board[row][col].player === board[row + 3][col].player) {
                        console.log("inside horizontal statement.")
                    return board[row][col];
                    
                }
            }
        }

        // Check diagonal bottom-left to top-right)
        for (let row = 3; row < 6; row++) {
            for (let col = 0; col < 3; col++) {
              if (board[row][col].player !== null &&
                  board[row][col].player === board[row - 1][col + 1].player &&
                  board[row][col].player === board[row - 2][col + 2].player &&
                  board[row][col].player === board[row - 3][col + 3].player) {
                    console.log("inside diagonal left to right statement.")
                return board[row][col];
              }
            }
        }
        
        // Check diagonal bottom-right to top-left
        for (let row = 3; row < 6; row++) {
            for (let col = 2; col < 6; col++) {
              if (board[row][col].player !== null &&
                  board[row][col].player === board[row - 1][col - 1].player &&
                  board[row][col].player === board[row - 2][col - 2].player &&
                  board[row][col].player === board[row - 3][col - 3].player) {
                    console.log("inside diagonal right to left statement.")
                return board[row][col];
              }
            }
        }

    }


}


let game = new Game();




