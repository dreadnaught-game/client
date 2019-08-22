// alert('hello');
const gameBoard = document.getElementById('gameBoard');

// play music
// this.sound = document.createElement("audio");
// this.sound.src = src;
// this.sound.setAttribute("preload", "auto");
// this.sound.setAttribute("controls", "none");
// this.sound.style.display = "none";
// document.body.appendChild(this.sound);
// this.play = function(){
//   this.sound.play();
// }
// this.stop = function(){
//   this.sound.pause();
// }

for (let i = 1; i < 11; i++) {
  for (let j = 1; j < 11; j++) {
    const coordinate = `<div class="coordinate" data-row="${i}" data-col="${j}"></div>`;
    gameBoard.innerHTML += coordinate;
  }
}

// TODO: JSON documentation
// TODO: Populate board with ships at random non-overlapping locations

// populate the game board
// returns coordinates of all 5 ships
const deployShips = () => {
  /* Ship list:
    1: 5 length - ship1
    1: 4 length - ship2
    2: 3 length - ship3 & ship4
    1: 2 length - ship5
    */
  // contains occupied coords
  // TODO: Implement randomization
  // const occupied = {};
  const fleet = [
    // ship1
    {
      c1: [1, 2],
      c2: [2, 2],
      c3: [3, 2],
      c4: [4, 2],
      c5: [5, 2],
    },
    // ship2
    {
      c1: [10, 7],
      c2: [10, 8],
      c3: [10, 9],
      c4: [10, 10],
    },
    // ship3
    {
      c1: [9, 4],
      c2: [8, 4],
      c3: [7, 4],
    },
    // ship4
    {
      c1: [3, 7],
      c2: [3, 8],
      c3: [3, 9],
    },
    // ship5
    {
      c1: [5, 8],
      c2: [5, 9],
    },
  ];

  return fleet;
};

const markCoordinate = (hitShip, [row, col]) => {
  const uiCoordinate = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
  console.log(hitShip);
  if (hitShip) {
    // changed coordinate square to red
    uiCoordinate.classList.add('hit');
  } else {
    // change coordinate square to black
    uiCoordinate.classList.add('miss');
  }
};

const spaceIsOccupied = (fleet, coordinate) => {
  let isOccupied = false;
  fleet.forEach(ship => {
    Object.values(ship).forEach(value => {
      if (value[0] === coordinate[0] && value[1] === coordinate[1]) {
        isOccupied = true;
      }
    });
  });
  return isOccupied;
};

const hitShip = (gameState, [row, col]) => {
  // Let's try to sink some ship here
  console.log('inside hitShip');
};

const fireCannon = (gameState, [row, col]) => {
  markCoordinate(spaceIsOccupied(gameState.fleet, [row, col]), [row, col]);
  hitShip(gameState, [row, col]);

  // TODO: check if a space is occupied by a ship
  // TODO: keep track of the move
  // TODO: check if a ship is sunk
};

const hoistSails = () => {
  const gameState = {
    sunkShips: 0,
    fleet: deployShips(),
  };
  // TODO: listen for user input
  const listOfCoords = document.querySelectorAll('.coordinate');
  listOfCoords.forEach(coordinate => {
    coordinate.addEventListener('click', () => {
      fireCannon(gameState, [parseInt(coordinate.dataset.row), parseInt(coordinate.dataset.col)]);
    });
  });
};

// TODO: check if all ships are sunk (Win Condition)
// TODO: gamestate tracker (OBJ/ARRAY)
// Recursively call from register move -> Win Condition

// TODO: Play Again --> populate board

hoistSails();
