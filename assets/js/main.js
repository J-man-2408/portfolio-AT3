console.log("JSON Connected");

const animalsCheckbox = document.getElementById('animals-api');
const dogsCheckbox = document.getElementById('dogs-api');
const userInput = document.getElementById('user-input');
const form = document.getElementById('api-form');
const responseMessage = document.getElementById('response-message');

// API-Ninjas base URLs
const ANIMALS_URL = 'https://api.api-ninjas.com/v1/animals';
const DOGS_URL = 'https://api.api-ninjas.com/v1/dogs';

const API_KEY = 'du7Qhh4fWVIDzuwtpSzPagi25PMeAhemjCvsdA5Q';

function getSelectedAPIs() {
    const selected = [];
    if (animalsCheckbox.checked) selected.push('animals');
    if (dogsCheckbox.checked) selected.push('dogs');
    return selected;
}

// Mutually exclusive checkboxes
animalsCheckbox.addEventListener('change', function () {
    if (animalsCheckbox.checked) {
        dogsCheckbox.checked = false;
    }
});

dogsCheckbox.addEventListener('change', function () {
    if (dogsCheckbox.checked) {
        animalsCheckbox.checked = false;
    }
});

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const selected = getSelectedAPIs();
    const inputValue = userInput.value.trim();

    // Validation 1: at least one checkbox must be ticked
    if (selected.length === 0) {
        responseMessage.textContent = 'Error: Please select an API (Animals or Dog Breeds).';
        return;
    }

    // Validation 2: input must not be empty
    if (inputValue === '') {
        responseMessage.textContent = 'Error: Please enter an animal or dog breed name.';
        return;
    }

    // Validation 3: input must be letters only, no numbers
    if (/\d/.test(inputValue)) {
        responseMessage.textContent = 'Error: Name must contain letters only, no numbers.';
        return;
    }

    // Passed validation — call the API
    responseMessage.textContent = 'Searching...';

    selected.forEach(function (api) {
        if (api === 'animals') {
            callAPI(`${ANIMALS_URL}?name=${inputValue}`);
        }
        if (api === 'dogs') {
            callAPI(`${DOGS_URL}?name=${inputValue}`);
        }
    });
});

function callAPI(url) {
    fetch(url, {
        headers: { 'X-Api-Key': API_KEY }
    })
    .then(function (response) {
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }
        return response.json();
    })
    .then(function (data) {
        console.log('API response:', data);
        displayResults(data);
    })
    .catch(function (error) {
        responseMessage.textContent = `Request failed: ${error.message}`;
        console.error('Fetch error:', error);
    });
}

function displayResults(data) {
    // Handle empty results
    if (!Array.isArray(data) || data.length === 0) {
        responseMessage.textContent = 'No results found. Try a different name!';
        return;
    }

    const output = data.map(function (item) {

        // --- DOGS API ---
        if (item.image_link) {
            return `
                ${item.name.toUpperCase()}
                Lifespan:  ${item.min_life_expectancy} - ${item.max_life_expectancy} years
                Energy:    ${stars(item.energy)}
                Shedding:  ${stars(item.shedding)}
                `.trim();
        }

        // --- ANIMALS API ---
        if (item.taxonomy) {
            const c = item.characteristics;
            return `
                ${item.name.toUpperCase()}
                Kingdom:  ${item.taxonomy.kingdom}
                Diet:     ${c.diet || 'Unknown'}
                Habitat:  ${c.habitat || 'Unknown'}
                `.trim();
        }
        return JSON.stringify(item);

    }).join('\n\n---\n\n');

    responseMessage.textContent = output;
}

function stars(value) {
    const filled = '⭐'.repeat(value);
    const empty = ''.repeat(5 - value);
    return filled + empty;
}