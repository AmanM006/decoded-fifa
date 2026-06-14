import { z } from "zod";
import { SET_PIECE_MATCHES } from "../data/matches";

const BASE_URL = "https://raw.githubusercontent.com/statsbomb/open-data/master";

/**
 * Zod validation schema contract for match telemetry tokens
 */
export const MatchTelemetrySchema = z.object({
  player_id: z.number(),
  coordinates: z.tuple([z.number(), z.number()]), // Strict [x, y] coordinates
  velocity_vector: z.tuple([z.number(), z.number()]), // Strict velocity vector
  xg_probability: z.number().min(0).max(1), // Normalized xG metric
});

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
 * Fetches events for a specific match and validates the telemetry via Zod contract.
 * If validation fails or payload structure is corrupted, it triggers a self-healing fallback.
 */
export async function fetchStatsBombEvents(matchId) {
  try {
    // If it's one of our local preset matches, return preset corner trajectory immediately
    const preset = SET_PIECE_MATCHES.find(m => m.id === matchId || String(m.id) === String(matchId));
    if (preset && preset.corners) {
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

    if (!Array.isArray(events)) {
      throw new Error("StatsBomb payload format error: expected array of events");
    }

    // Intercept and validate telemetry tokens using Zod contract schema
    events.slice(0, 10).forEach(ev => {
      if (ev.location && ev.player) {
        const token = {
          player_id: Number(ev.player.id),
          coordinates: [Number(ev.location[0]), Number(ev.location[1])],
          velocity_vector: [0, 0], // Mock vector for telemetry contract validation
          xg_probability: Number(ev.shot?.statsbomb_xg ?? 0.05)
        };
        const parsed = MatchTelemetrySchema.safeParse(token);
        if (!parsed.success) {
          throw new Error(`Zod contract validation failed: ${parsed.error.message}`);
        }
      }
    });

    return events;
  } catch (error) {
    console.warn(`[DECODED Zod Interceptor] Telemetry validation failed: "${error.message}". Activating self-healing fallback dataset.`);
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
