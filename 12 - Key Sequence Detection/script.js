window.addEventListener("keyup", handleKeypress);

const rightSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65, 13];
const currentSequence = [];
let index = 0;


// UP(38), UP(38), DOWN(40), DOWN(40), LEFT(37), RIGHT(39), LEFT(37), RIGHT(39), B(66), A(65), ENTER(13)
function handleKeypress(e) {
    if (e.keyCode === rightSequence[index]) {
        currentSequence.push(e.keyCode);
        index++;
        console.log(currentSequence);
        if (JSON.stringify(currentSequence) === JSON.stringify(rightSequence)) {
            console.log("You did it!");
        }
    } else {
        currentSequence.length = 0;
        index = 0;
    }
}
