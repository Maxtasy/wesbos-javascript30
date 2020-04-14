const divs = document.querySelectorAll("div");
const button = document.querySelector("button");

function logText(e) {
    console.log(this.classList.value);
    // e.stopPropagation(); // Stop bubbling
    // console.log(this);
}

divs.forEach(div => {
    div.addEventListener("click", logText, {
        capture: false,
        once: true // Disables event listener once it's been fired
    });
});

button.addEventListener("click", () => {
    console.log("Click!");
}, { 
    once: true 
});