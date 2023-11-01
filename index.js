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

class Slot {
    constructor(coord) {
        this.player = null;
        this.coord = coord;
    }
}

class Game {
    constructor() {
        this.board = [[],[],[],[],[],[],[]];
        this.makeBoard();
    }

    makeBoard() {
        let rows = 6;
        let columns = 7;
        let activePlayer = 'red';

        let board = document.getElementById('board');

        for (let r = 1; r <= rows; r++) {
            let row = document.createElement('div');
            row.setAttribute('class','row')
            for (let c = 1; c <= columns; c++) {
                let s = new Slot([c,r]);
                let slot = document.createElement('div');
                slot.addEventListener('click', () => {                    
                    //place token in lowest available slot
                    this.placeToken(s,activePlayer);
                    //change active player
                    activePlayer = activePlayer === 'red' ? 'black' : 'red';

                    //check for win conditions
                })

                slot.setAttribute('id',`${c}:${r}`);
                slot.setAttribute('class','slot');
                row.append(slot);
                
                this.board[c-1].push(s);
            }
            
            board.append(row);
        }
    }

    placeToken(slot,player) {

        let columnArray = this.board[slot.coord[0] - 1]; // use this to grab the column array

        // check through the column array for an open slot, starting from bottom. set the first available slot's player to red and change div background color.
        
        for(let i = 5; i >= 0; i--) {
            if (columnArray[0].player != null){
                console.log("This column is full.");
                break;
            }
            if (columnArray[i].player === null) {
                columnArray[i].player = player;
                let filledSlot = document.getElementById(`${columnArray[i].coord[0]}:${columnArray[i].coord[1]}`);
                filledSlot.style.backgroundColor = player;
                console.log(this.board);
                break;
            }
            
            
        }
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
    



