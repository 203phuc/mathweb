function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Load score from localStorage or default to 0
let score = parseInt(localStorage.getItem("score")) || 0;
let answer = 0; // Declare answer globally

// Display initial score
document.getElementById("score").innerHTML = score;

function generateQuestion() {
  let num1 = getRandomInt(1, 10);
  let num2 = getRandomInt(1, 10);
  const operator = ["+", "-", "*", "/"][getRandomInt(0, 3)];

  if (operator === "/") {
    do {
      num2 = getRandomInt(1, 10); // Ensure divisor stays 1-10
      num1 = num2 * getRandomInt(1, 10); // Make num1 a multiple of num2
    } while (num1 > 10); // Ensure displayed num1 is also within 1-10

    answer = num1 / num2;
  } else {
    answer = eval(`${num1} ${operator} ${num2}`);
    answer = Math.abs(answer); // Ensure positive value
  }

  // Update UI
  document.getElementById("n0").innerHTML = num1;
  document.getElementById("MOT").innerHTML = getOperatorWord(operator);
  document.getElementById("n1").innerHTML = num2;
}

function getOperatorWord(operator) {
  switch (operator) {
    case "+":
      return "add to";
    case "-":
      return "minus";
    case "*":
      return "times";
    case "/":
      return "divided by";
  }
}

document.getElementById("quiz").addEventListener("submit", (e) => {
  e.preventDefault();

  const userAnswer = parseInt(e.target[0].value);

  if (userAnswer === answer) {
    score++; // ✅ Correct answer → Increase score
    document.getElementById("score").innerHTML = score;
    showPopup("popup"); // Show the correct answer popup
  } else {
    score--; // ❌ Wrong answer → Decrease score
    document.getElementById("score").innerHTML = score;
    showPopup("popup2"); // Show the wrong answer popup
  }
  localStorage.setItem("score", score); // Save score to localStorage
  document.getElementById("score").innerHTML = score;

  document.getElementById("quiz").reset();
  generateQuestion();
});

// Run for the first time
document.addEventListener("DOMContentLoaded", generateQuestion);

function showPopup(id) {
  const popup = document.getElementById(id);

  popup.classList.add("show", "spin"); // Slide up & spin

  setTimeout(() => {
    popup.classList.remove("show", "spin"); // Slide down after 2s
  }, 2000);
}
