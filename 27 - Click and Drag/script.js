const slider = document.querySelector(".items");

let isDown = false;
let startX;
let scrollLeft;

function updateSlider(e) {
    if (!isDown) return; // Stop function from running if mouse is not pressed
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = x - startX;
    slider.scrollLeft = scrollLeft - walk;
}

function startUpdatingSlider(e) {
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    slider.classList.add("active");
}

function stopUpdatingSlider() {
    isDown = false;
    slider.classList.remove("active");
    scrollLeft = slider.scrollLeft;
}

slider.addEventListener("mousedown", startUpdatingSlider);

slider.addEventListener("mouseleave", stopUpdatingSlider);

slider.addEventListener("mouseup", stopUpdatingSlider);

slider.addEventListener("mousemove", updateSlider);