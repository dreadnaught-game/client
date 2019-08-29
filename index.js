// alert('hello');
const gameBoard = document.getElementById('gameBoard');
// have a default start location (1,1)
// eventlistener for keypress
// keep track of current row/col
// classList.remove(string)
// classList.add(string)
// querySelector

const highlightSquare = target => {
  console.log(target);
  target.classList.add('marked');
  console.log(
    `${target.getAttribute('data-row')}, ${target.getAttribute(
      'data-col'
    )} marked`
  );
};
// impure as of now

const moveUp = currentSquare => {
  console.log('up');
};
const moveLeft = currentSquare => {
  console.log('left');
};
const moveDown = currentSquare => {
  // console.log('down');
  // const newSquare = document.getElementsByClassName('marked');
  // newSquare.setAttribute(
  //   'data-row',
  //   `${parseInt(currentSquare.getAttribute('data-row')) + 1}`
  // );
  // `${parseInt(currentSquare.getAttribute('data-row')) + 1}, ${currentSquare.getAttribute('data-col')}`.split(', ');
  // currentSquare.classList.remove('marked');
  // console.log(currentSquare);
  // console.log(newSquare);
  highlightSquare(currentSquare);
};
const moveRight = currentSquare => {
  console.log('right');
};
const confirmShot = currentSquare => {
  console.log('fire!');
};

// const navButtons = {
//   up: false,
//   down: false,
//   left: false,
//   right: false,
// };

// function searchFleet(fleet, coordinate) { }

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
  const uiCoordinate = document.querySelector(
    `[data-row="${row}"][data-col="${col}"]`
  );
  uiCoordinate.setAttribute('data-clicked', 'true');
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
// really impure
const countSunkShips = fleet => {
  let count = 0;
  fleet.forEach(ship => {
    if (Object.keys(ship).length === 0) count += 1;
  });
  return count;
};
const removeShipCoordinate = ({ fleet }, [row, col]) => {
  // Let's try to sink some ship here
  fleet.forEach(ship => {
    Object.keys(ship).forEach(key => {
      if (ship[key][0] === row && ship[key][1] === col) {
        delete ship[key];
      }
    });
  });
};

const fireCannon = (gameState, [row, col]) => {
  const uiCoordinate = document.querySelector(
    `[data-row="${row}"][data-col="${col}"]`
  );
  if (uiCoordinate.getAttribute('data-clicked') === 'true') {
    // TODO: implement a return message
    return 0;
  }
  markCoordinate(spaceIsOccupied(gameState.fleet, [row, col]), [row, col]);
  removeShipCoordinate(gameState, [row, col]);
  // TODO: check if a space is occupied by a ship
  // TODO: keep track of the move
  // TODO: check if a ship is sunk
};

const reset = () => {
  gameBoard.innerHTML = '';
};
const hoistSails = () => {
  reset();
  for (let i = 1; i < 11; i++) {
    for (let j = 1; j < 11; j++) {
      const coordinate = `<div class="coordinate" data-row="${i}" data-col="${j}"></div>`;
      gameBoard.innerHTML += coordinate;
    }
  }
  const gameState = {
    fleet: deployShips(),
    currentSquare: document.querySelector(`[data-row="1"][data-col="1"]`),
  };
  // TODO: move into a createBoard function
  // TODO: listen for user input

  const listOfCoords = document.querySelectorAll('.coordinate');
  // console.log(listOfCoords);
  listOfCoords.forEach(coordinate => {
    coordinate.addEventListener('click', () => {
      fireCannon(gameState, [
        parseInt(coordinate.dataset.row),
        parseInt(coordinate.dataset.col),
      ]);
      if (countSunkShips(gameState.fleet) === 5) {
        // eslint-disable-next-line no-restricted-globals
        const response = confirm(
          "Shiver me timbers! Ye sunk all thar ships and seized th' treasure, Captain! But thar be more booty to be had, Play Again?"
        );
        if (response) hoistSails();
        else return 0;
      }
    });
  });
  console.log(gameState.currentSquare);
  document.body.onkeydown = function(event) {
    switch (event.keyCode) {
      case 87:
        moveUp(hoistSails.currentSquare);
        break;
      case 65:
        moveLeft(hoistSails.currentSquare);
        break;
      case 68:
        moveRight(hoistSails.currentSquare);
        break;
      case 83:
        console.log(gameState.currentSquare);
        moveDown(gameState.currentSquare);
        break;
      case 13:
        highlightSquare(hoistSails.currentSquare);
        break;
      default:
        break;
    }
  };
};

hoistSails();
