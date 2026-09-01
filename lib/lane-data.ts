export interface Lane {
  id: string;
  origin: string;
  destination: string;
  label: string;
}

interface LaneData {
  statesCount: number;
  routesCount: number;
  states: string[];
  routes: Lane[];
}

let cachedLanes: Lane[] | null = null;

export async function loadLanes(): Promise<Lane[]> {
  if (cachedLanes) return cachedLanes;

  try {
    const res = await fetch("/data/us_48_states_all_routes.json");
    if (!res.ok) throw new Error(`Failed to load lanes: ${res.status}`);
    const data: LaneData = await res.json();
    cachedLanes = data.routes;
    return cachedLanes;
  } catch (err) {
    console.error("[lane-data] Failed to load routes:", err);
    return [];
  }
}
