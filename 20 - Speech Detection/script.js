const words = document.querySelector(".words");

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = 'en-US';

let currentParagraph = document.createElement("p");

words.appendChild(currentParagraph);

recognition.addEventListener("result", e => {
    const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join("");

    currentParagraph.textContent = transcript;

    if (e.results[0].isFinal) {
        currentParagraph = document.createElement("p");
        words.appendChild(currentParagraph);
    }

    if (transcript.includes("dog")) {
        console.log("🐕");
    }
});

recognition.addEventListener("end", recognition.start);

recognition.start();