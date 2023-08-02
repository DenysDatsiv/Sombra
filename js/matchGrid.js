import Element from "./element.js";

export default class MatchGrid {
  constructor(args) {
    this.width = args.width;
    this.height = args.height;
    this.numColumns = args.numColumns;
    this.numRows = args.numRows;
    this.timeLimit = args.timeLimit;
    this.theme = args.theme;

    this.grid = [];
    this.timer = null;
    this.revealedElements = [];
    this.matchedCount = 0;
    this.isGameWon = false;

    this.initGrid();
    this.resetTimer();
  }

  initGrid() {
    const gridContainer = document.getElementById("grid-container");
    gridContainer.innerHTML = "";

    for (let id = 1; id <= (this.width * this.height) / 2; id++) {
      for (let i = 0; i < 2; i++) {
        const element = new Element(id, this);
        this.grid.push(element);
      }
    }
    
    this.shuffleGrid();
    this.grid.forEach((element) => gridContainer.appendChild(element.element));
  }

  shuffleGrid() {
    for (let i = this.grid.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.grid[i], this.grid[j]] = [this.grid[j], this.grid[i]];
    }
  }

  addToRevealedElements(element) {
    if (this.revealedElements.length < 2) {
      this.revealedElements.push(element);
    }
  }

  checkMatchingElements() {
    if (this.revealedElements.length === 2) {
      const [element1, element2] = this.revealedElements;
      if (element1.id === element2.id) {
        element1.element.classList.add("matched");
        element2.element.classList.add("matched");
        this.matchedCount += 2;

        if (this.matchedCount === this.grid.length) {
          this.isGameWon = true;
          alert("Congratulations! You win!");
          this.stopTimer();
        }
      } else {
        setTimeout(() => {
          if (!element1.element.classList.contains("matched")) {
            element1.reset();
          }
          if (!element2.element.classList.contains("matched")) {
            element2.reset();
          }
        }, 1000);
      }
      this.revealedElements = [];
    }
  }

  updateTimerDisplay(seconds) {
    document.getElementById("timer").innerText = `Time Left: ${seconds} sec.`;
  }

  startTimer() {
    let seconds = this.timeLimit;
    this.updateTimerDisplay(seconds);

    this.timer = setInterval(() => {
      seconds--;
      this.updateTimerDisplay(seconds);
      if (seconds <= 0) {
        const allMatched = this.grid.every((element) =>
          element.element.classList.contains("matched")
        );
        const timeLeft = parseInt(
          document.getElementById("timer").innerText.split(" ")[2]
        );
        if (!allMatched && timeLeft == 0) {
          alert("Time is up! You lose!");
          this.resetGame();
        }
        this.endGame();
      }
    }, 1000);
  }

  endGame() {
    this.resetTimer();
    this.stopTimer();
    this.grid.forEach((element) => {
      element.reset();
      element.element.classList.add("disabled");
    });
    const startButton = document.getElementById("start-button");
    startButton.textContent = "Start Game";
    this.isGameStarted = false;
    this.updateTimerDisplay(this.timeLimit);
    this.isTimerPaused = false;
  }

  resetGrid() {
    this.grid.forEach((element) => element.reset());
    this.shuffleGrid();
    const gridContainer = document.getElementById("grid-container");
    gridContainer.innerHTML = "";
    this.grid.forEach((element) => gridContainer.appendChild(element.element));
  }

  resetGame() {
    this.resetTimer();
    this.resetGrid();
    this.isTimerPaused = false;
    this.matchedCount = 0;
    this.isGameWon = false;
  }

  replayGame() {
    this.resetGame();
    this.grid.forEach((element) => {
      element.reset();
    });
    this.startGame();
    this.updateTimerDisplay(this.timeLimit);
  }

  startGame() {
    this.resetGame();
    this.startTimer();
    this.grid.forEach((element) => {
      element.element.classList.remove("disabled");
    });
  }

  resetTimer() {
    this.stopTimer();
    this.timeLimit = 60;
    this.updateTimerDisplay(this.timeLimit);
  }

  stopTimer() {
    clearInterval(this.timer);
    this.timer = null;
  }
}
