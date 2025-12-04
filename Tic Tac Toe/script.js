const cards = document.querySelectorAll(".card");
const xWinsSpan = document.getElementById("player 1-wins");
const oWinsSpan = document.getElementById("player 2-wins");
const roundInfo = document.getElementById("round-info");
const finalResult = document.getElementById("final-result");

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let currentPlayer = "X";
let round = 1;
let totalRounds = 3;
const playerNames = { X: "Player 1", O: "Player 2" };
let score = { X: 0, O: 0 };

// Function to check for winner
function checkWin() {
  const faces = Array.from(document.querySelectorAll(".card-face")).map(
    (f) => f.textContent
  );
  for (const combo of winningCombinations) {
    const [a, b, c] = combo;
    if (faces[a] && faces[a] === faces[b] && faces[a] === faces[c]) {
      return faces[a]; // "X" or "O"
    }
  }
  return null;
}

// Reset board
function resetBoard() {
  cards.forEach((card) => {
    const face = card.querySelector(".card-face");
    face.textContent = "";
    card.classList.remove("locked");
  });
  currentPlayer = "X";
  finalResult.textContent = "";
}

// Handle end of round
function endRound(winner) {
  if (winner) {
    alert(`${playerNames[winner]} wins this round!`);
    score[winner]++;
  } else {
    alert("This round is a tie!");
  }

  xWinsSpan.textContent = score.X;
  oWinsSpan.textContent = score.O;

  if (round < totalRounds) {
    round++;
    roundInfo.textContent = `Round ${round} of ${totalRounds}`;
    resetBoard();
  } else {
    // End of all rounds
    if (score.X > score.O) finalResult.textContent = "Player 1 wins the game!";
    else if (score.O > score.X)
      finalResult.textContent = "Player 2 wins the game!";
    else finalResult.textContent = "The game is a tie!";
  }
}

// Click-to-play logic
cards.forEach((card) => {
  const face = card.querySelector(".card-face");

  face.addEventListener("click", () => {
    if (face.textContent === "" && round <= totalRounds) {
      face.textContent = currentPlayer;
      card.classList.add("locked");

      const winner = checkWin();
      if (winner) {
        endRound(winner);
        return;
      }

      // Check tie
      const allFilled = Array.from(
        document.querySelectorAll(".card-face")
      ).every((f) => f.textContent !== "");
      if (allFilled) {
        endRound(null);
        return;
      }

      // Switch player
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  });
});

// reset button
document.getElementById("reset-round").addEventListener("click", () => {
  // Reset scores
  score = { X: 0, O: 0 };
  xWinsSpan.textContent = score.X;
  oWinsSpan.textContent = score.O;

  // Reset round number
  round = 1;
  roundInfo.textContent = `Round ${round} of ${totalRounds}`;

  // Reset board
  resetBoard();

  // Clear final result
  finalResult.textContent = "";
});
