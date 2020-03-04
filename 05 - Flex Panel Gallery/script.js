const panels = document.querySelectorAll(".panel");

panels.forEach(panel => {
    panel.addEventListener("click", toggleOpen);
});
panels.forEach(panel => {
    panel.addEventListener("transitionend", toggleActive);
});

function toggleOpen(e) {
    e.target.classList.toggle("open");
}

function toggleActive(e) {
    if (e.propertyName.includes("flex")) {    
        e.target.classList.toggle("open-active");
    }
}