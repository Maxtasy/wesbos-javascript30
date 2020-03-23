const hero = document.querySelector(".hero");
const headline = hero.querySelector("h1");

const MAX_OFFSET_X = 100;
const MAX_OFFSET_Y = 100;

function updateShadow(e) {
    const width = hero.offsetWidth;
    const height = hero.offsetHeight;
    let x = e.offsetX;
    let y = e.offsetY;

    if (this !== e.target) {
        x += e.target.offsetLeft;
        y += e.target.offsetTop;
    }

    if (x < width / 2) {
        xPercentage = -(width / 2 - x) / (width / 2);
    } else {
        xPercentage = (x - width / 2) / (width / 2);
    }

    if (y < height / 2) {
        yPercentage = -(height / 2 - y) / (height / 2);
    } else {
        yPercentage = (y - height / 2) / (height / 2);
    }

    const shadowOffsetX = xPercentage * MAX_OFFSET_X;
    const shadowOffsetY = yPercentage * MAX_OFFSET_Y;

    headline.style.textShadow = `
    ${shadowOffsetX}px ${shadowOffsetY}px 1px rgba(255, 255, 0, .5),
    ${shadowOffsetX * -1}px ${shadowOffsetY}px 1px rgba(255, 0, 0, .5),
    ${shadowOffsetY}px ${shadowOffsetX * -1}px 1px rgba(0, 255, 0, .5),
    ${shadowOffsetY * -1}px ${shadowOffsetX}px 1px rgba(0, 0, 255, .5)
    `;
}

hero.addEventListener("mousemove", updateShadow);