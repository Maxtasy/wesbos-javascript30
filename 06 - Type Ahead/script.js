const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

const cities = [];

fetch(endpoint)
    .then(blob => blob.json())
    .then(data => cities.push(...data));


searchInput.addEventListener("input", displayMatches);

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function findMatches(wordToMatch, cities) {
    return cities.filter(place => {
        // Here we need to figure out if the city or state matches what was searched
        const regex = new RegExp(wordToMatch, "gi");
        return place.city.match(regex) || place.state.match(regex);
    });
}

function displayMatches(e) {
    if (e.target.value === "") {
        const html = `            
            <li>Filter for a city</li>
            <li>or a state</li>
            `;
        suggestions.innerHTML = html;
    } else {
        const matches = findMatches(e.target.value, cities);
        if (matches.length < 1) {
            const html = `<li>No results found.</li>`;
            suggestions.innerHTML = html;
        } else {
            const html = matches.map(place => {
                const regex = new RegExp(e.target.value, "gi");
                const cityName = place.city.replace(regex, `<span class='hl'>${e.target.value}</span>`);
                const stateName = place.state.replace(regex, `<span class='hl'>${e.target.value}</span>`);
                return `
                    <li>
                        <span class="name">${cityName}, ${stateName}</span>
                        <span class="population">${numberWithCommas(place.population)}</span>
                    </li>`;
            }).join("");
            suggestions.innerHTML = html;
        }
    }
}