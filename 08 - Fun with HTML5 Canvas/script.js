const cvs = document.querySelector("#draw");
const ctx = cvs.getContext("2d");

cvs.width = window.innerWidth;
cvs.height = window.innerHeight;

ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 21;

let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

cvs.addEventListener("mousedown", enableDraw);
cvs.addEventListener("mouseup", disableDraw);
cvs.addEventListener("mouseout", disableDraw);

function enableDraw(e) {
    cvs.addEventListener("mousemove", draw);
    lastX = e.x;
    lastY = e.y;
}

function disableDraw(e) {
    cvs.removeEventListener("mousemove", draw);
}

function draw(e) {
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY)
    ctx.lineTo(e.offsetX, e.offsetY)
    ctx.stroke();
    lastX = e.offsetX;
    lastY = e.offsetY;
    hue = (hue + 1) % 360;
    console.log(direction, ctx.lineWidth)
    if (ctx.lineWidth >= 50 || ctx.lineWidth <= 20) {
        direction = !direction;
    }
    if (direction) {
        ctx.lineWidth++;
    } else {
        ctx.lineWidth--;
    }
}