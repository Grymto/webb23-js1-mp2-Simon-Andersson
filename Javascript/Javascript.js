let playerScore = 0;
let computerScore = 0;
let gameStarted = false;

const playerNameInput = document.querySelector("#input");
const submitBtn = document.querySelector("#submitBtn");
const resetBtn = document.querySelector("#resetBtn");
const choices = document.querySelectorAll(".choice-btn");

const playerScoreDisplay = document.getElementById("playerScore");
const computerScoreDisplay = document.getElementById("computerScore");
const computerChoiceDisplay = document.getElementById("computerChoice");
const playerChoiceDisplay = document.getElementById("playerChoice");
const resultDisplay = document.getElementById("result");
const endResultDisplay = document.getElementById("endResult");
const playerName = document.getElementById("playerName");

submitBtn.addEventListener("click", function (event) {
  event.preventDefault();
  if (playerNameInput.value === "") {
    playerName.innerText = "Anonym";
  } else {
    playerName.innerText = playerNameInput.value;
  }
  resetGame();
});

choices.forEach(function (choice) {
  choice.addEventListener("click", function () {
    if (!gameStarted) return;

    const playerChoice = this.id;
    const computerChoice = getRandomChoice();
    const result = playRound(playerChoice, computerChoice);
    updateScore(result);
    updateDisplays(playerChoice, computerChoice, result);

    if (playerScore === 3 || computerScore === 3) {
      endGame();
    }
  });
});

resetBtn.addEventListener("click", resetGame);

function playRound(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return "Lika";
  } else if (
    (playerChoice === "Sten" && computerChoice === "Sax") ||
    (playerChoice === "Påse" && computerChoice === "Sten") ||
    (playerChoice === "Sax" && computerChoice === "Påse")
  ) {
    return "Spelare";
  } else {
    return "Datorn";
  }
}

function getRandomChoice() {
  const options = ["Sten", "Påse", "Sax"];
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}

function updateScore(result) {
  if (result === "Spelare") {
    playerScore++;
  } else if (result === "Datorn") {
    computerScore++;
  }
}

function updateDisplays(playerChoice, computerChoice, result) {
  playerScoreDisplay.textContent = "Spelarens poäng: " + playerScore;
  computerScoreDisplay.textContent = "Datorns poäng: " + computerScore;
  playerChoiceDisplay.textContent = "Spelarens val: " + playerChoice;
  computerChoiceDisplay.textContent = "Datorns val: " + computerChoice;
  resultDisplay.textContent = getMessage(result);
}

function getMessage(result) {
  if (result === "Spelare") {
    return "Du vann!";
  } else if (result === "Datorn") {
    return "Datorn vann!";
  } else {
    return "Det blev Lika";
  }
}

function endGame() {
  gameStarted = false;

  let message;
  if (playerScore === 3) {
    message = "Grattis! Du har besegrat Datorn.";
  } else {
    message = "Du Förlorade! Bättre lycka nästa gång.";
  }
  endResultDisplay.innerText = message;
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  gameStarted = true;
  playerScoreDisplay.textContent = "";
  computerScoreDisplay.textContent = "";
  computerChoiceDisplay.textContent = "";
  playerChoiceDisplay.textContent = "";
  resultDisplay.textContent = "";
  endResultDisplay.textContent = "";
}
