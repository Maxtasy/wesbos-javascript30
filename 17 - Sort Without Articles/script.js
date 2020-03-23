const bandsList = document.querySelector("#bands");
const bands = ['The Plot in You', 'The Devil Wears Prada', 'Pierce the Veil', 'Norma Jean', 'The Bled', 'Say Anything', 'The Midway State', 'We Came as Romans', 'Counterparts', 'Oh, Sleeper', 'A Skylit Drive', 'Anywhere But Here', 'An Old Dog'];

function strip(bandName) {
    return bandName.replace(/^(a |an |the )/i, "");
}

function populateList(listElement, list) {
    let html = "";
    list.forEach(listItem => {
        html += `<li>${listItem}</li>`;
    });

    listElement.innerHTML = html;
}

// Short version
const sortedBands = bands.sort((first, second) => strip(first) < strip(second) ? -1 : 1);
// Long version
// const sortedBands = bands.sort((first, second) => {
//     if (strip(first) < strip(second)) {
//         return -1;
//     } else {
//         return 1;
//     }
// })

populateList(bandsList, sortedBands);