// Initialize game variables
let diceMaxValue = 6;
let currentActivePlayer: number = 1;

const diceImageElement: HTMLImageElement | null = document.querySelector(".dice");
const newGameButton: HTMLButtonElement | null = document.querySelector(".btn--new");
const rollDiceButton: HTMLButtonElement | null = document.querySelector(".btn--roll");
const holdButton: HTMLButtonElement | null = document.querySelector(".btn--hold");
const playerOneSectionElement: HTMLElement | null = document.querySelector(".player--1");
const playerTwoSectionElement: HTMLElement | null = document.querySelector(".player--2");
const playerOneCurrentScoreElemet: HTMLParagraphElement | null = document.querySelector("#current--1");
const playerTwoCurrentScoreElemet: HTMLParagraphElement | null = document.querySelector("#current--2");
const plyaerOneTotalScoreElement: HTMLParagraphElement | null = document.querySelector("#score--1");
const plyaerTwoTotalScoreElement: HTMLParagraphElement | null = document.querySelector("#score--2");

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
  private currentScore: number = 0;
  private totalScore: number = 0;

  constructor(public playerNumber: number) {
    this.currentScoreElemet = this.playerNumber === 1 ? playerOneCurrentScoreElemet : playerTwoCurrentScoreElemet;
    this.totalScoreElement = this.playerNumber === 1 ? plyaerOneTotalScoreElement : plyaerTwoTotalScoreElement;
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

    if (this.totalScoreElement) {
      this.totalScoreElement.textContent = String(this.totalScore);
    }

    // Check if the player has won
    if (this.totalScore >= 20) {
      let currentActivePlayerSectionElement =
        currentActivePlayer === 1 ? playerOneSectionElement : playerTwoSectionElement;

      if (currentActivePlayerSectionElement) {
        if (currentActivePlayerSectionElement.classList.contains("player--active")) {
          currentActivePlayerSectionElement.classList.remove("player--active");
        }

        if (!currentActivePlayerSectionElement.classList.contains("player--winner")) {
          currentActivePlayerSectionElement.classList.add("player--winner");
        }
      }

      // Remove the dice image
      if (diceImageElement) {
        if (!diceImageElement.classList.contains("hidden")) {
          diceImageElement.classList.add("hidden");
        }
      }

      // Remove the event listeners
      if (rollDiceButton) rollDiceButton.removeEventListener("click", rollDice);
      if (holdButton) holdButton.removeEventListener("click", holdScore);
    } else {
      // Reset current score
      this.resetCurrentScore();
    }
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

    // Change the current active player
    currentActivePlayer = this.playerNumber === 1 ? 2 : 1;

    // Change the player active state
    let currentActivePlayerSectionElement =
      currentActivePlayer === 1 ? playerOneSectionElement : playerTwoSectionElement;
    let inactivePlayer: number = currentActivePlayer === 1 ? 2 : 1;
    let inactivePlayerSectionElement = inactivePlayer === 1 ? playerOneSectionElement : playerTwoSectionElement;

    if (inactivePlayerSectionElement) {
      if (inactivePlayerSectionElement.classList.contains("player--active")) {
        inactivePlayerSectionElement.classList.remove("player--active");
      }
    }

    if (currentActivePlayerSectionElement) {
      if (!currentActivePlayerSectionElement.classList.contains("player--active")) {
        currentActivePlayerSectionElement.classList.add("player--active");
      }
    }
  }
}

let playerOne = new Player(1);
let playerTwo = new Player(2);

const rollDice = () => {
  if (currentActivePlayer === 1) {
    playerOne.rollDice();
  } else if (currentActivePlayer === 2) {
    playerTwo.rollDice();
  }
};

const holdScore = () => {
  if (currentActivePlayer === 1) {
    playerOne.holdScore();
  } else if (currentActivePlayer === 2) {
    playerTwo.holdScore();
  }
};

if (rollDiceButton) {
  rollDiceButton.addEventListener("click", rollDice);
}

if (holdButton) {
  holdButton.addEventListener("click", holdScore);
}

if (newGameButton) {
  newGameButton.addEventListener("click", () => {
    playerOne = new Player(1);
    playerTwo = new Player(2);

    currentActivePlayer = 1;

    if (playerTwoSectionElement) {
      if (playerTwoSectionElement.classList.contains("player--active")) {
        playerTwoSectionElement.classList.remove("player--active");
      }
      if (playerTwoSectionElement.classList.contains("player--winner")) {
        playerTwoSectionElement.classList.remove("player--winner");
      }
    }

    if (playerOneSectionElement) {
      if (!playerOneSectionElement.classList.contains("player--active")) {
        playerOneSectionElement.classList.add("player--active");
      }
      if (playerOneSectionElement.classList.contains("player--winner")) {
        playerOneSectionElement.classList.remove("player--winner");
      }
    }

    if (playerOneCurrentScoreElemet && playerTwoCurrentScoreElemet) {
      playerOneCurrentScoreElemet.textContent = "0";
      playerTwoCurrentScoreElemet.textContent = "0";
    }

    if (plyaerOneTotalScoreElement && plyaerTwoTotalScoreElement) {
      plyaerOneTotalScoreElement.textContent = "0";
      plyaerTwoTotalScoreElement.textContent = "0";
    }

    // Remove the dice image
    if (diceImageElement) {
      if (!diceImageElement.classList.contains("hidden")) {
        diceImageElement.classList.add("hidden");
      }
    }

    if (rollDiceButton) {
      rollDiceButton.addEventListener("click", rollDice);
    }

    if (holdButton) {
      holdButton.addEventListener("click", holdScore);
    }
  });
}
