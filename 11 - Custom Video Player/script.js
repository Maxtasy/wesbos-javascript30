const videoElement = document.querySelector(".player__video.viewer");
const buttonPlayPause = document.querySelector(".player__button.toggle");
const skipButtons = document.querySelectorAll('[data-skip]');
const rangeSliders = document.querySelectorAll(".player__slider");
const progress = document.querySelector('.progress');
const progressBar = document.querySelector(".progress__filled");

buttonPlayPause.addEventListener("click", togglePlayback);
videoElement.addEventListener("click", togglePlayback);
videoElement.addEventListener("play", updateButton);
videoElement.addEventListener("pause", updateButton);
videoElement.addEventListener('timeupdate', handleProgress);
rangeSliders.forEach(rangeSlider => {
    rangeSlider.addEventListener("input", handleSliderChange);
});
skipButtons.forEach(skipButton => {
    skipButton.addEventListener("click", skip);
});

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

function togglePlayback() {
    const method = videoElement.paused ? "play" : "pause";
    videoElement[method]();
}

function updateButton() {
    const icon = videoElement.paused ? "▶" : "⏸";
    buttonPlayPause.textContent = icon;
}

function handleSliderChange() {
    videoElement[this.name] = this.value;
}

function skip() {
    videoElement.currentTime += parseFloat(this.dataset.skip);
}

function handleProgress() {
    const percent = videoElement.currentTime * 100 / videoElement.duration;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * videoElement.duration;
  videoElement.currentTime = scrubTime;
}