// Initialize game variables
let playerOneCurrentScore: number = 0;
let playerTwoCurrentScore: number = 0;
let playerOneTotalScore: number = 0;
let playerTwoTotalScore: number = 0;
let diceMaxNumber = 6;

/**
 * Function to generate a random number from 1 to deviceMaxNumber
 * @param diceMaxNumber
 * @returns random number from 1 to deviceMaxNumber
 */
const randomNumGenerator = (diceMaxNumber: number): number => {
  return Math.trunc(Math.random() * diceMaxNumber + 1);
};


const updateScore = (diceValue: number, playerCurrScoreElement: HTMLParagraphElement) {
    playerCurrScoreElement.innerHTML = String(diceValue);
})