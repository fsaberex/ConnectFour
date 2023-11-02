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
                // filledSlot.style.backgroundColor = player;
                console.log(this.board);
                break;
            }
            
            
        }

        this.activePlayer = this.activePlayer === 'red' ? 'black' : 'red';
        instructions.innerText = `It is now ${this.activePlayer}'s turn`
    }

    checkBoard(slot) {
        // create a new array that includes every slot in the row to which the token was added
        // read through that array looking for a consecutive group of four same-color tokens

        //When a piece is dropped, we want to evaluate the board every time.
        //We want to check for vertical, horizontal, and diagonal.
        //Gather all matching coordinates into an array
        //Validate if the array contains four coordinates with the same horizontal value, vertical value or diagonal pattern
        const currentBoard = this.board;
        let rowSlots = [];
        //console.log(currentBoard);
        console.log(slot);
        
        for(let y = 0; y < 7; y++) {
            rowSlots.push(currentBoard[y][slot.coord]);
        //     console.log(currentBoard[y][slot.coord]);
        //     console.log(rowSlots);
        }








        //for(let x = 0; x < currentBoard.length; x++) {
            //console.log(currentBoard[x]);
            // for(let y = 0; y < 7; y++) {
            //     rowSlots.push(currentBoard[slot.coord[0]]);
            //     console.log(rowSlots);
                //console.log(rowSlots);
                // if(currentBoard[x][y].player != null) {
                //     console.log(currentBoard[x][y].player);
                //     occupiedSlots.push(currentBoard[x][y].coord);
                //     console.log(occupiedSlots);
                //     console.log(occupiedSlots[0][0]);
                //     for(let z = 0; z < occupiedSlots.length; z++) {
                //         console.log(occupiedSlots[z][z]);
                //         if(occupiedSlots[z][z] === occupiedSlots[z][z]){
                //             verticalCounter + 1;
                //             console.log("Vertical Counter: " + verticalCounter);
                //         }
                //     }
                //     break;
                //     occupiedSlots = [];
                // }
            //}
        //}
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
    



