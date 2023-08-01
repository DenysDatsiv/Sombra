import MatchGrid from "./matchGrid.js";
const args = {
  width: 4,
  height: 4,
  numColumns: 4,
  numRows: 4,
  timeLimit: 60,
  theme: { colors: "#f00" },
};

const game = new MatchGrid(args);

let isGameStarted = false;
let isTimerPaused = false;
let remainingTime = args.timeLimit;

const startButton = document.getElementById("start-button");
document.getElementById("start-button").addEventListener("click", () => {
  if (!isGameStarted) {
    startButton.textContent = "Replay";
    game.startGame();
    isGameStarted = true;
    remainingTime = args.timeLimit;
  } else {
    game.replayGame();
    isGameStarted = false;
    isTimerPaused = false;
  }
});

const gridContainer = document.getElementById("grid-container");
gridContainer.style.gridTemplateColumns = `repeat(${args.numColumns}, 1fr)`;
gridContainer.style.gridTemplateRows = `repeat(${args.numRows}, 1fr)`;

document.getElementById("end-button").addEventListener("click", () => {
  game.endGame();
  isGameStarted = false;
  isTimerPaused = false;
});

const pauseTimer = () => {
  if (isGameStarted && !isTimerPaused) {
    game.stopTimer();
    isTimerPaused = true;
    remainingTime = parseInt(
      document.getElementById("timer").innerText.split(" ")[2]
    );
  }
};

const resumeTimer = () => {
  if (isGameStarted && isTimerPaused) {
    game.timeLimit = remainingTime;
    game.startTimer();
    isTimerPaused = false;
  }
};

gridContainer.addEventListener("mouseenter", () => {
  resumeTimer();
});

gridContainer.addEventListener("mouseleave", () => {
  pauseTimer();
});
