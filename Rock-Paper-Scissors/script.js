let round = 0;
const maxRounds = 5;
let humanScore = 0;
let computerScore = 0;

function getComputerChoice() {
  const moves = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * moves.length);
  return moves[randomIndex];
}

function getHumanChoice() {
  const input = document.getElementById("userinput").value;
  return input.toLowerCase();
}

function playGame() {
  if (round >= maxRounds) {
    document.getElementById("result").textContent = `Game over. Final score - You: ${humanScore}, Computer: ${computerScore}.`;
    return;
  }

  const human = getHumanChoice();
  const computer = getComputerChoice();

  let result = "";

  if (!["rock", "paper", "scissors"].includes(human)) {
    result = "Invalid input. Please enter rock, paper, or scissors.";
  } else {
    round++;

    if (human === computer) {
      result = "It's a tie!";
    } else if (
      (human === "rock" && computer === "scissors") ||
      (human === "paper" && computer === "rock") ||
      (human === "scissors" && computer === "paper")
    ) {
      result = "You win!";
      humanScore++;
    } else {
      result = "You lose!";
      computerScore++;
    }
  }

  if (round >= maxRounds) {
    result += ` Game over. Final score - You: ${humanScore}, Computer: ${computerScore}.`;
  }

  document.getElementById("result").textContent = `Round ${round}: You chose ${human}, computer chose ${computer}. ${result}`;
}
