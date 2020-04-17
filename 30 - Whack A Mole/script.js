const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');

let lastHole;
let timeUp = false;
let score = 0;

let min = 200;
let max = 1000;

let game;

function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 20000);
}

function peep() {
    const hole = randomHole(holes);
    const time = randomTime(min, max);

    hole.classList.add("up");

    setTimeout(() => {
        hole.classList.remove("up");
        if (!timeUp) peep();
    }, time);
}

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
    const holeIndex = Math.floor(Math.random() * holes.length);
    const hole = holes[holeIndex];
    if (hole === lastHole) {
        return randomHole(holes);
    }
    lastHole = hole;

    return hole;
}

function bonk(e) {
    if (!e.isTrusted) return; // Cheater!
    score++;
    scoreBoard.textContent = score;
    this.classList.remove("up");
}

moles.forEach(mole => {
    mole.addEventListener("click", bonk);
});