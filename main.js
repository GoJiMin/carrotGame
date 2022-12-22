const startBtn = document.querySelector(".game__start");
const stopBtn = document.querySelector(".game__stop");
const replayBtn = document.querySelector(".replay__button");
const playGround = document.querySelector(".game__playground");
const fieldRect = playGround.getBoundingClientRect();
const timer = document.querySelector(".game__timer");
const gameStatus = document.querySelector(".game__status");
const replay = document.querySelector(".replay");
const replayText = document.querySelector(".replay__text");
const count = document.querySelector(".game__count");
const alertWav = new Audio("sound/alert.wav");
alertWav.volume = 0.3;
const bgm = new Audio("sound/bg.mp3");
const bugPull = new Audio("sound/bug_pull.mp3");
const carrotPull = new Audio("sound/carrot_pull.mp3");
const gameWin = new Audio("sound/game_win.mp3");

let carrotCount = 10;
function makeElement() {
  const xMin = 0;
  const yMin = 0;
  const xMax = fieldRect.width;
  const yMax = fieldRect.height;

  let carrots = [];
  let bugs = [];

  for (let i = 0; i < 10; i++) {
    const x = randomNumber(xMin, xMax);
    const y = randomNumber(yMin, yMax);

    const carrot = document.createElement("img");
    carrot.setAttribute("class", "game__carrot");
    carrot.setAttribute("src", "img/carrot.png");

    carrot.style.left = `${x}px`;
    carrot.style.top = `${y - 80}px`;

    carrots[i] = carrot;
  }

  for (let i = 0; i < 10; i++) {
    const x = randomNumber(xMin, xMax);
    const y = randomNumber(yMin, yMax);

    const bug = document.createElement("img");
    bug.setAttribute("class", "game__bug");
    bug.setAttribute("src", "img/bug.png");

    bug.style.left = `${x}px`;
    bug.style.top = `${y - 80}px`;

    bugs[i] = bug;
  }

  carrots.forEach((carrot) => playGround.append(carrot));
  bugs.forEach((bug) => playGround.append(bug));
  carrotCount = 10;
  count.textContent = carrotCount;
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

let timeLeft = 9;
let timeCron;

function timerStart() {
  timeCron = setInterval(countDown, 1000);
}

function timerStop() {
  clearInterval(timeCron);
}

function countDown() {
  timer.innerHTML = `0 : ` + timeLeft;
  if (timeLeft <= 0) {
    clearInterval(timeCron);
    replay.classList.toggle("play");
    replayText.innerHTML = `Game Over`;
  }
  timeLeft--;
}

function gameStart() {
  makeElement();
  timerStart();
}

function gameOver() {
  timeLeft = 9;
  timer.innerHTML = "0 : 10";
  playGround.replaceChildren();
  makeElement();
  timerStart();
}

startBtn.addEventListener("click", () => {
  alertWav.play();
  bgm.play();
  startBtn.remove();
  stopBtn.classList.toggle("active");
  gameStart();
});

let stop = 0;
stopBtn.addEventListener("click", () => {
  alertWav.play();
  if (stop === 0) {
    bgm.pause();
    replay.classList.toggle("play");
    timerStop();
    stop = 1;
  } else {
    bgm.play();
    replay.classList.toggle("play");
    timerStart();
    stop = 0;
  }
});

replayBtn.addEventListener("click", () => {
  alertWav.play();
  bgm.load();
  bgm.play();
  gameOver();
  replay.classList.toggle("play");
  replayText.innerHTML = "Replay?";
  stop = 0;
});

playGround.addEventListener("click", (e) => {
  if (e.target.className === "game__carrot") {
    carrotPull.play();
    e.target.remove();
    carrotCount--;
    count.textContent = carrotCount;
  } else if (e.target.className === "game__bug") {
    bugPull.play();
    bgm.pause();
    clearInterval(timeCron);
    replay.classList.toggle("play");
    replayText.innerHTML = `Game Over`;
  }

  if (carrotCount === 0) {
    bgm.pause();
    gameWin.play();
    clearInterval(timeCron);
    replay.classList.toggle("play");
    replayText.innerHTML = `You Win!!!`;
    overed = 1;
  }
});
