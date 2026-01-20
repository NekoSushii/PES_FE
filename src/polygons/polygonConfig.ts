export interface PolygonConfig {
  id: number;
  name: string;
  path: { lat: number; lng: number }[];
  center: { lat: number; lng: number };
  fillColor: string;
}

// District IDs mapping
export const DISTRICT_IDS = {
  BEDOK: 1,
  HOUGANG: 34,
  MUSEUM: 42,
  ROCHOR: 47,
} as const;
