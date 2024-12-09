// Initialize Supabase
const SUPABASE_URL = "https://whornljepwbqwkwpuoxh.supabase.co"; 
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indob3JubGplcHdicXdrd3B1b3hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM3NjIyNzgsImV4cCI6MjA0OTMzODI3OH0.QdzqRJF2SxTVrAkGynJAnhW2gS8UhuIaULvI3t54CzM";
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Function to save scores to Supabase
async function saveScoresToSupabase() {
    const scores = JSON.parse(localStorage.getItem("scores") || "{}");

    // Prepare data for Supabase
    const scoresArray = Object.entries(scores).map(([artworkID, scoreData]) => ({
        artwork_id: artworkID,
        title: scoreData.title,
        fit_theme: scoreData.fitTheme || 0,
        inspire: scoreData.inspire || 0,
        originality: scoreData.originality || 0,
        total_score: (parseInt(scoreData.fitTheme || 0) + parseInt(scoreData.inspire || 0) + parseInt(scoreData.originality || 0))
    }));

    try {
        const { data, error } = await supabase
            .from('artwork_scores') // Replace with your Supabase table name
            .upsert(scoresArray, { onConflict: ['artwork_id'] }); // 'artwork_id' must be unique in your Supabase table

        if (error) {
            console.error("Error saving scores to Supabase:", error);
        } else {
            console.log("Scores successfully saved to Supabase:", data);
        }
    } catch (err) {
        console.error("Unexpected error:", err);
    }
}

// Call this function to save scores
saveScoresToSupabase();
