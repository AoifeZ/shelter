let artworks = [];  // Declare once

// Fetch JSON data
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        artworks = data;
        displayArtworkGrid();
    })
    .catch(error => console.error("Error loading JSON:", error));

// Display the grid of artworks
function displayArtworkGrid() {
    const container = document.getElementById('artwork-list');
    container.innerHTML = ''; // Clear previous content

    artworks.forEach((artwork, index) => {
        const score = getTotalScore(artwork.ID);
        const scoreText = score ? score : 'Not yet scored';

        const artworkItem = document.createElement('div');
        artworkItem.classList.add('artwork-item');

        artworkItem.innerHTML = `
            <div class="artwork-thumbnail-container">
                <img src="${artwork.Image}" alt="${artwork.Title}" class="artwork-thumbnail">
            </div>
            <div class="artwork-title">
                ${index + 1}. <a href="sifting.html?id=${artwork.ID}">${artwork.Title}</a>
            </div>
            <div class="artwork-score">${scoreText}</div>
        `;

        container.appendChild(artworkItem);
    });
}

// Helper function to get the total score from localStorage
function getTotalScore(artworkID) {
    const scores = JSON.parse(localStorage.getItem("scores") || "{}");
    const artworkScores = scores[artworkID];
    if (artworkScores) {
        return parseInt(artworkScores.fitTheme || 0) + parseInt(artworkScores.inspire || 0) + parseInt(artworkScores.originality || 0);
    }
    return null;
}

// Load artwork details into the page
function loadArtwork(index) {
    const artwork = artworks[index];
    const container = document.getElementById("artwork-container");

    if (!artwork) {
        container.innerHTML = "<p>No artwork found.</p>";
        return;
    }

    container.innerHTML = `
        <div class="container">
            <div class="row">
                <!-- Image Column (50%) -->
                <div class="col-md-6">
                    <img src="${artwork.Image}" class="img-fluid" alt="${artwork.Title}">
                </div>
                <!-- Content Column (50%) -->
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-body bg-body-secondary">
                            <h3 class="card-title my-3">${artwork.Title}</h3>
                            <p class="card-text">${artwork.Content}</p>

                            <div class="row mb-3">
                                <div class="col-md-2"><strong>W:</strong> ${artwork.Width || 'N/A'}</div>
                                <div class="col-md-2"><strong>H:</strong> ${artwork.Height || 'N/A'}</div>
                                <div class="col-md-2"><strong>D:</strong> ${artwork.Depth || 'N/A'}</div>
                                <div class="col-md-2"><strong>Y:</strong> ${artwork.Year || 'N/A'}</div>
                                <div class="col-md-2"><strong>AI:</strong> ${artwork.AI || 'N/A'}</div>
                            </div>

                            <div class="row mb-3">
                                <div class="col-md-6"><strong>Material:</strong> ${artwork.Material || 'N/A'}</div>
                                <div class="col-md-6"><strong>Other materials:</strong> ${artwork["Other materials"] || 'N/A'}</div>
                            </div>

                            <p><strong>How the artwork connects to the theme of Shelter:</strong> ${artwork["How the artwork connects to the theme of Shelter"] || 'N/A'}</p>
                            <p><strong>Recorded answer:</strong> ${artwork["Recorded answer"] || "N/A"}</p>
                        </div>                            
                        <div class="card-body border-top">
                            <form>
                                <!-- Fit Theme -->
                                <div class="mb-3 form-range-wrapper">
                                    <label for="fit-theme" class="form-label"><strong>From 1-10:</strong> How well does it fit the theme 'SHELTER'?</label>
                                    <input type="range" class="form-range" id="fit-theme" min="1" max="10" value="${getScore(artwork.ID, 'fitTheme') || 5}">
                                    <span class="form-text">Selected: <span id="fit-theme-value">${getScore(artwork.ID, 'fitTheme') || 5}</span></span>
                                </div>

                                <!-- Inspire -->
                                <div class="mb-3 form-range-wrapper">
                                    <label for="inspire" class="form-label"><strong>From 1-10:</strong> How much does it inspire and excite you?</label>
                                    <input type="range" class="form-range" id="inspire" min="1" max="10" value="${getScore(artwork.ID, 'inspire') || 5}">
                                    <span class="form-text">Selected: <span id="inspire-value">${getScore(artwork.ID, 'inspire') || 5}</span></span>
                                </div>

                                <!-- Originality -->
                                <div class="mb-3 form-range-wrapper">
                                    <label for="originality" class="form-label"><strong>From 1-10:</strong>  How original is the artwork?</label>
                                    <input type="range" class="form-range" id="originality" min="1" max="10" value="${getScore(artwork.ID, 'originality') || 5}">
                                    <span class="form-text">Selected: <span id="originality-value">${getScore(artwork.ID, 'originality') || 5}</span></span>
                                </div>
                            </form>
                            <p><strong>Subtotal: <span id="subtotal">${calculateSubtotal(artwork.ID)}</span></strong></p>
                            <button id="save-button" class="btn btn-primary">Save Score</button>
                            <div id="saved-message" class="alert alert-success mt-3" style="display: none;">Saved!</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Calculate the subtotal for a specific artwork based on its scores
function calculateSubtotal(artworkID) {
    const fitTheme = parseInt(getScore(artworkID, 'fitTheme') || 0);
    const inspire = parseInt(getScore(artworkID, 'inspire') || 0);
    const originality = parseInt(getScore(artworkID, 'originality') || 0);
    return fitTheme + inspire + originality;
}

// Save score in localStorage
function saveScore(artworkID, category, score) {
    const scores = JSON.parse(localStorage.getItem("scores") || "{}");
    if (!scores[artworkID]) {
        scores[artworkID] = {};
    }
    scores[artworkID][category] = score;
    localStorage.setItem("scores", JSON.stringify(scores));
}

// Helper function to retrieve score from localStorage
function getScore(artworkID, category) {
    const scores = JSON.parse(localStorage.getItem("scores") || "{}");
    return scores[artworkID] ? scores[artworkID][category] : null;
}
