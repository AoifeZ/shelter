// Function to download scores as CSV
function downloadScoresCSV() {
    const scores = JSON.parse(localStorage.getItem("scores") || "{}");
    
    // Create CSV content
    let csvContent = "artwork_id,title,fit_theme,inspire,originality,total_score\n"; // CSV header

    Object.entries(scores).forEach(([artworkID, scoreData]) => {
        const totalScore = (parseInt(scoreData.fitTheme || 0) + parseInt(scoreData.inspire || 0) + parseInt(scoreData.originality || 0));
        const row = [
            artworkID, 
            scoreData.title, 
            scoreData.fitTheme || 0, 
            scoreData.inspire || 0, 
            scoreData.originality || 0, 
            totalScore
        ].join(",");
        csvContent += row + "\n";
    });

    // Create a Blob and download it
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "scores.csv";
    link.click();
}

// Add event listener to a download button (if desired)
document.getElementById("download-csv-button").addEventListener("click", downloadScoresCSV);
