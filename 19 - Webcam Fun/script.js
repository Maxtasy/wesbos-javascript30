const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false})
        .then(localMediaStream => {
            video.srcObject = localMediaStream;
            video.play();
        })
        .catch(err => {
            console.error("Browser has no access to use the webcam", err);
        });
}

function paintToCanvas() {
    const width = video.videoWidth;
    const height = video.videoHeight;

    canvas.width = width;
    canvas.height = height;

    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
        // Get pixel values
        let pixels = ctx.getImageData(0, 0, width, height);
        // Apply red effect to pixel values
        //pixels = redEffect(pixels);
        // Apply split effect to pixel values
        //pixels = rgbSplit(pixels);
        // Apply green screen effect to pixel values
        pixels = greenScreen(pixels);
        // Put new pixel values to canvas
        ctx.putImageData(pixels, 0, 0);
    }, 16);
}

function takePhoto() {
    snap.currentTime = 0;
    snap.play();

    const data = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href = data;
    link.setAttribute("download", "snapshot");
    link.innerHTML = `<img src="${data}" alt="Webcam Snapshot" />`;
    strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        // red
        pixels.data[i] += 100;
        // green
        pixels.data[i + 1] -= 50;
        // blue
        pixels.data[i + 2] *= .5;
        // alpha
        pixels.data[i + 3];
    }

    return pixels;
}

function rgbSplit(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        // red
        pixels.data[i - 150] = pixels.data[i];
        // green
        pixels.data[i + 500] = pixels.data[i + 1];
        // blue
        pixels.data[i - 500] = pixels.data[i + 2];
        // alpha
        pixels.data[i + 3];
    }

    return pixels;
}

function greenScreen(pixels) {
    const levels = {};

    [...document.querySelectorAll(".rgb input")].forEach((input) => {
        levels[input.name] = input.value;
    });

    for (let i = 0; i < pixels.data.length; i += 4) {
        let red = pixels.data[i];
        let green = pixels.data[i + 1];
        let blue = pixels.data[i + 2];

        if (red >= levels.rmin
            && green >= levels.gmin
            && blue >= levels.bmin
            && red <= levels.rmax
            && green <= levels.gmax
            && blue <= levels.bmax) {
                // Set alpha component to 0
                pixels.data[i + 3] = 0;
            }
    }

    return pixels;
}

getVideo();

video.addEventListener('canplay', paintToCanvas);