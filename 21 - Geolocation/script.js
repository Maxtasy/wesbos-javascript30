const arrow = document.querySelector(".arrow");
const speedValue = document.querySelector(".speed-value");

navigator.geolocation.watchPosition((data) => {
    // Simulate speed and direction changes
    const randomSpeedValue = Math.floor(Math.random() * Math.floor(100));
    const randomHeadingValue = Math.floor(Math.random() * Math.floor(360));
    
    if (data.coords.speed) {
        speedValue.textContent = data.coords.speed.toString();
    } else {
        // Test value
        speedValue.textContent = `${randomSpeedValue}`;
    }
    if (data.coords.heading) {
        arrow.style.transform = `rotate(${data.coords.heading})`;
    } else {
        // Test value
        arrow.style.transform = `rotate(${randomHeadingValue}deg)`;
    }
}, (err) => {
    console.error(err);
    alert("Not working unless you allow us to get your location.");
});