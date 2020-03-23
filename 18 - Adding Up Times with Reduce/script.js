// const videosList = document.querySelector(".videos");
// const videos = videosList.querySelectorAll("li");

// let totalHours = 0;
// let totalMinutes = 0;
// let totalSeconds = 0;

// videos.forEach(video => {
//     const time = video.dataset.time.split(":");
//     totalMinutes += parseInt(time[0]);
//     totalSeconds += parseInt(time[1]);
// })

// let minutesFromSeconds = Math.floor(totalSeconds / 60);
// totalSeconds %= 60;

// totalMinutes += minutesFromSeconds;

// let hoursFromMinutes = Math.floor(totalMinutes / 60);
// totalMinutes %= 60;

// totalHours += hoursFromMinutes;

// console.log(`${totalHours}:${totalMinutes}:${totalSeconds}`);

const timeNodes = Array.from(document.querySelectorAll("[data-time]"));

const seconds = timeNodes
    .map(node => node.dataset.time)
    .map(timeCode => {
        const [mins, secs] = timeCode.split(":");
        return (parseInt(mins) * 60 + parseInt(secs));
    })
    .reduce((total, current) => total + current);

let secondsLeft = seconds;

const hours = Math.floor(secondsLeft / 3600);
secondsLeft %= 3600;

const minutes = Math.floor(secondsLeft / 60);
secondsLeft %= 60;

console.log(`${hours}:${minutes}:${secondsLeft}`);