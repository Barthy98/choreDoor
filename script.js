const doorImage1 = document.getElementById('door1');
const doorImage2 = document.getElementById('door2');
const doorImage3 = document.getElementById('door3');
const startButton = document.getElementById('start');

const botDoorPath = 'https://content.codecademy.com/projects/chore-door/images/robot.svg';
const beachDoorPath = 'https://content.codecademy.com/projects/chore-door/images/beach.svg';
const spaceDoorPath = 'https://content.codecademy.com/projects/chore-door/images/space.svg';
const closedDoorPath = 'https://content.codecademy.com/projects/chore-door/images/closed_door.svg';

let openDoor1;
let openDoor2;
let openDoor3;
let numClosedDoors = 3;
let currentlyPlaying = true;
let score = 0;
let highScore = 0;
let currentStreak = document.getElementById('score-number');
let bestStreak = document.getElementById('high-score-number');
currentStreak.innerHTML = score;
bestStreak.innerHTML = highScore;

const isBot = door => { // checks if door has a ChoreBot
  if (door.src === botDoorPath) {
    return true;
  } else {
    return false;
  }
};

const isClicked = door => { // checks if door is open (was clicked)
  if (door.src === closedDoorPath) {
    return false; // closed (src equals to closedDoorPath)
  } else {
    return true; // opened (src changed to other door path) 
  }
};

const playDoor = door => {
  numClosedDoors--; // decrease amoun of closed doors after 'onclicks'
  if (numClosedDoors === 0) {
    gameOver('win');
  } else if (isBot(door)) { // if closed>0 check if door contains ChoreBot
    gameOver(); // if yes, you lose
  }
};

const randomChoreDoorGenerator = () => {
  choreDoor = Math.floor(Math.random() * 6);
  switch (choreDoor) {
    case 0:
      openDoor1 = botDoorPath;
      openDoor2 = beachDoorPath;
      openDoor3 = spaceDoorPath;
      break;
    case 1:
      openDoor1 = botDoorPath;
      openDoor2 = spaceDoorPath;
      openDoor3 = beachDoorPath;
      break;
    case 2:
      openDoor2 = botDoorPath;
      openDoor1 = beachDoorPath;
      openDoor3 = spaceDoorPath;
      break;
    case 3:
      openDoor2 = botDoorPath;
      openDoor1 = spaceDoorPath;
      openDoor3 = beachDoorPath;
      break;
    case 4:
      openDoor3 = botDoorPath;
      openDoor1 = beachDoorPath;
      openDoor2 = spaceDoorPath;
      break;
    case 5:
      openDoor3 = botDoorPath;
      openDoor1 = spaceDoorPath;
      openDoor2 = beachDoorPath;
      break;
  }
};

doorImage1.onclick = () => {
  if (currentlyPlaying && !isClicked(doorImage1)) { // if currently playing and door wasn't opened yet
    doorImage1.src = openDoor1;
    playDoor(doorImage1);
  }
};
doorImage2.onclick = () => {
  if (currentlyPlaying && !isClicked(doorImage2)) {
    doorImage2.src = openDoor2;
    playDoor(doorImage2);
  }
};
doorImage3.onclick = () => {
  if (currentlyPlaying && !isClicked(doorImage3)) {
    doorImage3.src = openDoor3;
    playDoor(doorImage3);
  }
};

const startRound = () => { // reset to starting values
  numClosedDoors = 3;
  doorImage1.src = closedDoorPath;
  doorImage2.src = closedDoorPath;
  doorImage3.src = closedDoorPath;
  startButton.innerHTML = 'Good luck !';
  currentlyPlaying = true;
  randomChoreDoorGenerator(); // reroll doors
};

startButton.onclick = () => {
  if (!currentlyPlaying) { // can reset only if game is over
    startRound();
  }
}

const gameOver = status => {
  if (status === 'win') {
    startButton.innerHTML = 'You win ! Play again ?';
    getYourScore();
  } else {
    startButton.innerHTML = 'Game over ! Play again ?';
    score = 0;
    currentStreak.innerHTML = score;
  }
  currentlyPlaying = false;
};

const getYourScore = () => {
  score++;
  currentStreak.innerHTML = score;
  if (score > highScore) {
    highScore = score;
    bestStreak.innerHTML = highScore;
  }
};

startRound(); // first call when site loads