// script.js

const playerNameInput = document.getElementById("playerName");
const startGameButton = document.getElementById("startGameButton");
const playerNameText = document.getElementById("playerNameText");
const rockBtn = document.getElementById("rockBtn");
const paperBtn = document.getElementById("paperBtn");
const scissorsBtn = document.getElementById("scissorsBtn");
const resultText = document.getElementById("resultText");
const resetBtn = document.getElementById("resetBtn");
const playerScoreText = document.getElementById("playerScore");
const aiScoreText = document.getElementById("aiScore");
const darkModeToggle = document.getElementById("darkModeToggle");
const body = document.body;

let playerName = "Player";
let playerScore = 0;
let aiScore = 0;
let darkModeEnabled = false;

startGameButton.addEventListener("click", () => {
  playerName = playerNameInput.value.trim() || "Player";
  if (playerName !== "Player") {
    playerNameText.textContent = playerName;
  } else {
    playerNameText.textContent = "Player";
  }

  playerNameInput.value = "";
  startGameButton.disabled = true;
});

rockBtn.addEventListener("click", () => playGame("rock"));
paperBtn.addEventListener("click", () => playGame("paper"));
scissorsBtn.addEventListener("click", () => playGame("scissors"));
resetBtn.addEventListener("click", resetGame);
darkModeToggle.addEventListener("change", toggleDarkMode);

function playGame(playerChoice) {
  const aiChoice = getAIChoice();
  const result = getResult(playerChoice, aiChoice);
  displayResult(playerChoice, aiChoice, result);
  updateScore(result);
}

function getAIChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function getResult(playerChoice, aiChoice) {
  if (playerChoice === aiChoice) {
    return "tie";
  } else if (
    (playerChoice === "rock" && aiChoice === "scissors") ||
    (playerChoice === "paper" && aiChoice === "rock") ||
    (playerChoice === "scissors" && aiChoice === "paper")
  ) {
    return "win";
  } else {
    return "lose";
  }
}

function displayResult(playerChoice, aiChoice, result) {
  const playerChoiceEmoji = getEmoji(playerChoice);
  const aiChoiceEmoji = getEmoji(aiChoice);
  let resultMessage = "";

  if (result === "win") {
    resultMessage = `${playerChoiceEmoji} beats ${aiChoiceEmoji}. You win!`;
  } else if (result === "lose") {
    resultMessage = `${aiChoiceEmoji} beats ${playerChoiceEmoji}. You lose!`;
  } else {
    resultMessage = `${playerChoiceEmoji} equals ${aiChoiceEmoji}. It's a tie!`;
  }

  resultText.textContent = resultMessage;
}

function updateScore(result) {
  if (result === "win") {
    playerScore++;
  } else if (result === "lose") {
    aiScore++;
  }

  playerScoreText.textContent = playerScore;
  aiScoreText.textContent = aiScore;
}

function resetGame() {
  playerName = "Player";
  playerNameText.textContent = playerName;

  playerScore = 0;
  aiScore = 0;

  playerScoreText.textContent = playerScore;
  aiScoreText.textContent = aiScore;
  resultText.textContent = "";
  startGameButton.disabled = false;
}

function getEmoji(choice) {
  if (choice === "rock") {
    return "🗿";
  } else if (choice === "paper") {
    return "📄";
  } else {
    return "✂️";
  }
}

function toggleDarkMode() {
  darkModeEnabled = !darkModeEnabled;
  if (darkModeEnabled) {
    body.classList.add("dark-mode");
  } else {
    body.classList.remove("dark-mode");
  }
}
