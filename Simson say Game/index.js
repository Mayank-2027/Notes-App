let gameseq = [];
let userseq = [];

let btns = ["yellow", "red", "blue", "green"];
let started = false;
let level = 0;

let h2 = document.querySelector("h2");

// Start game on key press
document.addEventListener("keyup", function () {
  if (started==false) {
    console.log("Game started");
    started = true;
    levelup();
  }
});

// Flash effect for game sequence
function btnflash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

function overflash() {
    let body=document.querySelector("body");
    body.classList.add("overflash");
    setTimeout(function () {
      body.classList.remove("overflash");
    }, 250);
  }
  

// Flash effect for user click
function userflash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 250);
}

// Increase level and generate new sequence
function levelup() {
  userseq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randomIdx = Math.floor(Math.random() * 3);
  let randomcolor = btns[randomIdx];
  let randombtn = document.querySelector(`.${randomcolor}`);

  btnflash(randombtn);
  gameseq.push(randomcolor);

  console.log(gameseq);
}

// Check user input
function check(idx) {
  if (userseq[idx] === gameseq[idx]) {
    if (userseq.length === gameseq.length) {
      console.log("Same value");
      setTimeout(levelup, 1000);
      
    }
  } else {
    h2.innerHTML = `Game Over! Your score: <b>${level}</b> <br>Press any key to restart`;
   overflash();
    reset();
  }
}

// Handle button press
function btnpress() {
  let btn = this;
  btnflash(btn);
  userflash(btn);

  let usercolor = btn.getAttribute("id");
  console.log(usercolor);

  userseq.push(usercolor);
  check(userseq.length - 1);
}

// Add event listeners to all buttons
let allbtns = document.querySelectorAll(".btn");
for (let btn of allbtns) {
  btn.addEventListener("click", btnpress);
}

// Reset game
function reset() {
  started = false;
  gameseq = [];
  userseq = [];
  level = 0;
}
//Here’s a short and clear summary of your Simon Game code 👇

// Game Start – Press any key → game begins (started=true) and Level 1 starts.

// Level Up – Each level adds a new random color to the game sequence (gameseq).

// Flashing – The chosen button flashes to show the sequence. User’s button also flashes when clicked.

// User Input – When a button is clicked, its color is stored in userseq and checked against gameseq.

// Check Logic –

// If all clicks are correct → next level starts.

// If wrong → "Game Over" message + score shown.

// Reset – On Game Over, gameseq, userseq, and level are reset for a fresh start.*/*
