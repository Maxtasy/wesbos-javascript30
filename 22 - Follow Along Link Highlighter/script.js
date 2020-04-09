const links = document.querySelectorAll(".menu a, .wrapper a");
const highlight = document.createElement("span");
highlight.classList.add("highlight");
document.body.append(highlight);

links.forEach(link => {
    link.addEventListener("mouseenter", updateHighlighter);
});

function updateHighlighter() {
    const linkCoords = this.getBoundingClientRect();
    
    highlight.style.top = `${linkCoords.y + window.scrollY}px`;
    highlight.style.left = `${linkCoords.x + window.scrollX}px`;
    highlight.style.width = `${linkCoords.width}px`;
    highlight.style.height = `${linkCoords.height}px`;
}