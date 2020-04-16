const timerDisplay = document.querySelector(".display__time-left");
const endTimeDisplay = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");

let countdown;

function timer(seconds) {
    // Clear previous timer
    clearInterval(countdown);

    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);
    
    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);

        if (secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }

        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    let minutes = Math.floor(seconds / 60);
    seconds %= 60;
    let hours = Math.floor(minutes / 60);
    minutes %= 60;

    if (hours <= 0) {
        hours = "";
    } else {
        hours = ("0" + hours).slice(-2) + ":";
    }

    if (minutes <= 0 && hours <= 0) {
        minutes = "";
    } else {
        minutes = ("0" + minutes).slice(-2) + ":";
    }

    seconds = ("0" + seconds).slice(-2);

    const display = `${hours}${minutes}${seconds}`;

    timerDisplay.textContent = display;
    document.title = "Time left: " + display;
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minute = end.getMinutes();
    const second = end.getSeconds();
    endTimeDisplay.textContent = `Timer ends: ${hour < 10 ? "0" : ""}${hour}:${minute < 10 ? "0" : ""}${minute}:${second < 10 ? "0" : ""}${second}`;
}

function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach(button => {
    button.addEventListener("click", startTimer);
});

document.customForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const seconds = parseInt(this.minutes.value) * 60;
    timer(seconds);
    this.reset();
});