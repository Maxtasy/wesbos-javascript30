document.querySelectorAll(".controls input").forEach(input => {
    input.addEventListener("input", inputChanged);
});

function inputChanged(e) {
    if (e.target.dataset["sizing"]) {
        document.documentElement.style.setProperty(`--${e.target.name}`, e.target.value + e.target.dataset["sizing"]);
    } else {
        document.documentElement.style.setProperty(`--${e.target.name}`, e.target.value);
    }
}