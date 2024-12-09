// Helper function to get the total score from localStorage
function getTotalScore(artworkID) {
    const scores = JSON.parse(localStorage.getItem("scores") || "{}");
    const artworkScores = scores[artworkID];
    if (artworkScores) {
        return parseInt(artworkScores.fitTheme || 0) + parseInt(artworkScores.inspire || 0) + parseInt(artworkScores.originality || 0);
    }
    return null;
}

// Function to download scores as CSV
function downloadScoresCSV(artworks) {
    const scores = JSON.parse(localStorage.getItem("scores") || "{}");

    // Create CSV content
    let csvContent = "artwork_id,title,fit_theme,inspire,originality,total_score\n"; // CSV header

    artworks.forEach(artwork => {
        const artworkID = artwork.ID;
        const scoreData = scores[artworkID];

        if (scoreData) {
            const totalScore = (parseInt(scoreData.fitTheme || 0) + parseInt(scoreData.inspire || 0) + parseInt(scoreData.originality || 0));
            const row = [
                artworkID,
                artwork.Title, // Using title from data.json
                scoreData.fitTheme || 0,
                scoreData.inspire || 0,
                scoreData.originality || 0,
                totalScore
            ].join(",");
            csvContent += row + "\n";
        }
    });

    // Create a Blob and download it
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "scores.csv";
    link.click();
}
