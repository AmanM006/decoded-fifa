import { SET_PIECE_MATCHES } from "../data/matches";

const BASE_URL = "https://raw.githubusercontent.com/statsbomb/open-data/master";

/**
 * Fetches World Cup matches list from StatsBomb open data.
 * Season 106 is WC 2022, Season 3 is WC 2018.
 */
export async function fetchStatsBombMatches(competitionId = 43, seasonId = 106) {
  try {
    const res = await fetch(`${BASE_URL}/data/matches/${competitionId}/${seasonId}.json`);
    if (!res.ok) throw new Error(`StatsBomb HTTP error! Status: ${res.status}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.warn("StatsBomb fetchMatches failed. Falling back to local matches preset.", error);
    // Return a mapped version of our preloaded matches
    return SET_PIECE_MATCHES.map(m => ({
      match_id: m.id,
      home_team: { home_team_name: m.name.split(" vs ")[0] },
      away_team: { away_team_name: m.name.split(" vs ")[1]?.split(" · ")[0] || "Opponent" },
      match_date: m.year,
      score: m.score,
      label: m.name
    }));
  }
}

/**
 * Fetches events for a specific match.
 */
export async function fetchStatsBombEvents(matchId) {
  try {
    // If it's one of our local preset matches, check if we can simulate it
    const preset = SET_PIECE_MATCHES.find(m => m.id === matchId || String(m.id) === String(matchId));
    if (preset) {
      // Simulate StatsBomb events using preset data
      return preset.corners.map(c => ({
        type: { name: "Play Pattern" },
        play_pattern: { name: "From Corner" },
        minute: parseInt(c.minute),
        team: { name: c.team },
        shot: c.outcome === "GOAL" ? { outcome: { name: "Goal" } } : null,
        is_preset: true,
        preset_corner: c
      }));
    }

    const res = await fetch(`${BASE_URL}/data/events/${matchId}.json`);
    if (!res.ok) throw new Error(`StatsBomb HTTP error! Status: ${res.status}`);
    const events = await res.json();
    return events;
  } catch (error) {
    console.warn(`StatsBomb fetchEvents failed for match ${matchId}. Returning preloaded preset events.`, error);
    // Find the first preset match or match matching ID
    const preset = SET_PIECE_MATCHES.find(m => m.id === matchId || String(m.id) === String(matchId)) || SET_PIECE_MATCHES[0];
    return preset.corners.map(c => ({
      type: { name: "Play Pattern" },
      play_pattern: { name: "From Corner" },
      minute: parseInt(c.minute),
      team: { name: c.team },
      shot: c.outcome === "GOAL" ? { outcome: { name: "Goal" } } : null,
      is_preset: true,
      preset_corner: c
    }));
  }
}

/**
 * Fetches team lineups for a match.
 */
export async function fetchStatsBombLineups(matchId) {
  try {
    const res = await fetch(`${BASE_URL}/data/lineups/${matchId}.json`);
    if (!res.ok) throw new Error(`StatsBomb HTTP error! Status: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.warn(`StatsBomb fetchLineups failed for match ${matchId}. Returning empty array.`, error);
    return [];
  }
}
