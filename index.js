import Sound from './components/Sound.js';

const gameBoard = document.getElementById('gameBoard');
const shipSound = new Sound('./audio/ship-at-bay.wav', true);
const accordionSound = new Sound('./audio/pirate-accordion.wav', true, 0.6);
const hitCounter = document.querySelector('#hit-counter');
const missCounter = document.querySelector('#miss-counter');

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
  if (hitShip) {
    const hitSound = new Sound('./audio/cannon-hitting-ship.mp3', false, 0.7);
    // changed coordinate square to red
    setTimeout(() => hitSound.play(), 600);
    hitCounter.innerHTML = parseInt(hitCounter.innerHTML) + 1;
    uiCoordinate.classList.add('hit');
  } else {
    const waterSplashSound = new Sound('./audio/water-splash.wav', false, 1);
    missCounter.innerHTML = parseInt(missCounter.innerHTML) + 1;
    setTimeout(() => waterSplashSound.play(), 600);
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
  const cannonFireSound = new Sound('./audio/cannon-fire.wav', false, 0.6);
  cannonFireSound.play();
  hitShip(gameState, [row, col]);

  // TODO: check if a space is occupied by a ship
  // TODO: keep track of the move
  // TODO: check if a ship is sunk
};

const hoistSails = () => {
  shipSound.play();
  accordionSound.play();

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

const playButton = document.querySelector('#play-button');
playButton.addEventListener('click', () => {
  hoistSails();
});
