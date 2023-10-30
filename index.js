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



//console.log(10);

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
            dropPiece(thisSlot, s);
        })
        slot.setAttribute('id',`${r}:${c}`);
        slot.setAttribute('class','slot');
        row.append(slot);
        subRow.push(s);
    }
    cols.push(subRow);
    board.append(row);
}

function dropPiece(slot, player){
    const selectedSlot = `${slot.id}`;
    //console.log("selectedSlot: " + selectedSlot);
    const columnSlots = [['1:1', '1:2', '1:3', '1:4', '1:5', '1:6'], ['2:1', '2:2', '2:3', '2:4', '2:5', '2:6'], ['3:1', '3:2', '3:3', '3:4', '3:5', '3:6'],['4:1', '4:2', '4:3', '4:4', '4:5', '4:6'], ['5:1', '5:2', '5:3', '5:4', '5:5', '5:6'], ['6:1', '6:2', '6:3', '6:4', '6:5', '6:6'],['7:1', '7:2', '7:3', '7:4', '7:5', '7:6']];

    for (let i = 0; i < columnSlots.length; i++){
        for (let j = 0; j < columnSlots[i].length; j++){
            //console.log("columnSlots: " + columnSlots[i][j]);
            if (selectedSlot === columnSlots[i][j]){
                /* check the column for how many slots are occupied from the bottom of the columnSlots[i] value in the array by iterating backwards and checking to see if there is a color value to the slot that is undefined. */
                for(let k = 5; k >= 0; k--) {
                    let currentSlot = document.getElementById(columnSlots[i][k]);
                    //columnSlots[i][k];
                    console.log(slot.id);
                    console.log(currentSlot.style.backgroundColor);
                    //currentSlot.style.backgroundColor = player.player;
                    //slot.style.backgroundColor = player.player;
                    //console.log(document.getElementById(columnSlots[i][k]));
                    if(!currentSlot.style.backgroundColor){
                        console.log(currentSlot.style.backgroundColor);
                        currentSlot.style.backgroundColor = player.player;
                        //columnSlots[i][k+1];
                        break;
                    }
                    if(currentSlot.style.backgroundColor) {
                        console.log(currentSlot.style.backgroundColor);
                        continue;
                    }

                }
            }
        }
    }

    
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