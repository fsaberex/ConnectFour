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



console.log(10);

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

let rows = 7;
let columns = 6;

let cols = [];

let board = document.getElementById('board');

for (let c = 1; c <= columns; c++) {
    let subRow = [];
    let row = document.createElement('div');
    row.setAttribute('class','row')
    for (let r = 1; r <= rows; r++) {
        let s = new Slot([r,c]);
        let slot = document.createElement('div');
        slot.addEventListener('click', () => {
            s.player = 'red';
            console.log(s)
            let thisSlot = document.getElementById(`${s.coord[0]}:${s.coord[1]}`)
            console.log(thisSlot);
        })
        slot.setAttribute('id',`${r}:${c}`);
        slot.setAttribute('class','slot');
        row.append(slot);
        subRow.push(s);
    }
    cols.push(subRow);
    board.append(row);
}

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
    




// }

// for (let i = 0; i < columns; i++) {
//     for 
// }