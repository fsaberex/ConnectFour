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

// set up the players


// let currentPlayer = playerOne

// const playerOne = {
//     name : '',
//     color: '',
//     wins: 0

// }

// const playerTwo = {
//     name: '',
//     color: '',
//     wins: 0

// }

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
                this.checkBoard(bottomSlot);
                
                
                break;
            }
            
            
        }

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

        //create column array from new token position down to the bottom, slot[1]-1 to [5]
        for(let i = slot[1] - 1; i < 6; i++) {
            colSlots.push(currentBoard[slot[0]-1][i]);
        }

        //create diagonal "up" array from bottom left to top right
        //create diagonal "down" array from top left to bottom right

        //check the row array for win condition
        let consecutivePieces = 1;
        for (let i = 1; i < rowSlots.length; i++) {
            if (rowSlots[i].player && rowSlots[i].player === rowSlots[i-1].player){
                consecutivePieces++;
                if (consecutivePieces >=4) {
                    console.log(rowSlots[i].player + " wins!");
                    //add code here to add 1 to player's win counter and reset the board
                    return;
                }
            }
            else {
                consecutivePieces = 1;
            } 
        }

        //check the column array for win condition
        // consecutivePieces = 1;
        // for (let i = 0; i < colSlots.length; i++) {
        // //     
        //     console.log(colSlots);
        //     console.log(colSlots[i+1]);
            
        
        //      if (colSlots[i].player && colSlots[i].player === colSlots[i+1].player){
        //         consecutivePieces++;
        //         if (consecutivePieces >=4) {
        //             console.log(colSlots[i-1].player + " wins!");
        //             return;
        //         }
        //     }
        //     else {
        //         consecutivePieces = 1;
        //     } 
        // }






    }
}


let game = new Game();
// fill()
//


//What we know what we want to do
//Play connect four
//Have two players
//Win counter
//Have Slot classes that provide the player color and coordinates in the grid
//What are the challenges we will face?
//Getting our heads in the same place (having everyone understand the logic). Different perspectives.
//Sufficiently communicating when we need help
//add a dropping sound
//yeet button

// const grid = {
//     slots: [],
//     xValue: '',
//     yValue: '',
// }


// function checkCoordinate() {
    
// }

// class Slot {
//     constructor(coords) {
//         coords: [];
//     }
    



