const keys = document.querySelectorAll(".key");

keys.forEach(key => {
    key.addEventListener("transitionend", removeTransition);
});

window.addEventListener("keydown", playSound);

function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);

    if (!audio) return; // stop function from running if a invalid key is pressed

    audio.currentTime = 0; // rewind to start
    audio.play(); // play sound
    key.classList.add("playing"); // change css style to playing
}

function removeTransition(e) {
    if (e.propertyName !== "transform") return; // skip if it's not a transform
    e.target.classList.remove("playing");
}