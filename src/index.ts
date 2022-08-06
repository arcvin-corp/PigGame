// Initialize game variables
let diceMaxValue = 6;

let currentActivePlayer: number = 1;
const diceImageElement: HTMLImageElement | null = document.querySelector(".dice");
const rollDiceButton: HTMLButtonElement | null = document.querySelector(".btn--roll");
const holdButton: HTMLButtonElement | null = document.querySelector(".btn--hold");

/**
 * Function to generate a random number from 1 to deviceMaxNumber
 * @param diceMaxVal
 * @returns random number from 1 to deviceMaxNumber
 */
const randomNumGenerator = (diceMaxVal: number = diceMaxValue): number => {
  return Math.trunc(Math.random() * diceMaxVal + 1);
};

class Player {
  private currentScoreElemet: HTMLParagraphElement | null;
  private totalScoreElement: HTMLParagraphElement | null;
  private playerSectionElement: HTMLElement | null;
  private currentScore: number = 0;
  private totalScore: number = 0;

  constructor(public playerNumber: number) {
    this.currentScoreElemet = document.querySelector(`#current--${playerNumber}`);
    this.totalScoreElement = document.querySelector(`#score--${playerNumber}`);
    this.playerSectionElement = document.querySelector(`.player--${playerNumber}`);
  }

  private updateCurrentScore(diceValue: number) {
    // Increment the current score value
    this.currentScore += diceValue;

    if (this.currentScoreElemet) {
      this.currentScoreElemet.textContent = String(this.currentScore);
    }
  }

  holdScore() {
    // Hold the total score value
    this.totalScore += this.currentScore;

    // Reset current score
    this.resetCurrentScore();

    if (this.totalScoreElement) {
      this.totalScoreElement.textContent = String(this.totalScore);
    }

    // Change the current active player
    currentActivePlayer = this.playerNumber === 1 ? 2 : 1;

    // Remove player--active class from the play section.
  }

  rollDice() {
    // Generate a random dice value
    let diceValue: number = randomNumGenerator();

    // Change the dice image according to the generated dice value
    if (diceImageElement) {
      diceImageElement.src = `images/dice-${diceValue}.png`;
      if (diceImageElement.classList.contains("hidden")) {
        diceImageElement.classList.remove("hidden");
      }
    }

    // Update current score
    if (diceValue === 1) {
      this.resetCurrentScore();
      // Change the current active player
      currentActivePlayer = this.playerNumber === 1 ? 2 : 1;
    } else {
      this.updateCurrentScore(diceValue);
    }
  }

  private resetCurrentScore() {
    // Reset the current score of the player
    this.currentScore = 0;
    this.updateCurrentScore(0);

    // Change the player active state
    this.playerActiveDisable();
  }

  private playerActiveDisable() {
    if (this.playerSectionElement) {
      if (this.playerSectionElement.classList.contains("player--active")) {
        this.playerSectionElement.classList.remove("player--active");
      }
    }
  }
}

const playerOne = new Player(1);
const playerTwo = new Player(2);

if (rollDiceButton) {
  rollDiceButton.addEventListener("click", () => {
    if (currentActivePlayer === 1) {
      playerOne.rollDice();
    } else if (currentActivePlayer === 2) {
      playerTwo.rollDice();
    }
  });
}

if (holdButton) {
  holdButton.addEventListener("click", () => {
    if (currentActivePlayer === 1) {
      playerOne.holdScore();
    } else if (currentActivePlayer === 2) {
      playerTwo.holdScore();
    }
  });
}
