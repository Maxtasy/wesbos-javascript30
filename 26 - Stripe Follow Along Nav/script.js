const listItems = document.querySelectorAll(".cool > li");
const nav = document.querySelector(".top");
const dropdownBackground = document.querySelector(".dropdownBackground");

function enableDropdownBackground() {
    this.classList.add("trigger-enter");
    setTimeout(() => {
        if (this.classList.contains("trigger-enter")) {
            this.classList.add("trigger-enter-active");
        }
    }, 150);
    dropdownBackground.classList.add("open");

    const dropdownContent = this.querySelector(".dropdown");
    const dropdownContentCoords = dropdownContent.getBoundingClientRect();
    const navCoords = nav.getBoundingClientRect();

    const coords = {
        height: dropdownContentCoords.height,
        width: dropdownContentCoords.width,
        top: dropdownContentCoords.top - navCoords.top,
        left: dropdownContentCoords.left - navCoords.left
    };

    dropdownBackground.style.width = `${coords.width}px`;
    dropdownBackground.style.height = `${coords.height}px`;
    dropdownBackground.style.top = `${coords.top}px`;
    dropdownBackground.style.left = `${coords.left}px`;
}

function disableDropdownBackground() {
    this.classList.remove("trigger-enter", "trigger-enter-active");
    dropdownBackground.classList.remove("open");
}

listItems.forEach(listItem => {
    listItem.addEventListener("mouseenter", enableDropdownBackground);
    listItem.addEventListener("mouseleave", disableDropdownBackground);
});