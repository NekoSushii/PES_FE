export interface PolygonConfig {
    id: number;
    name: string;
    path: { lat: number; lng: number }[];
    center: { lat: number; lng: number };
    fillColor: string;
  }
  
  export const d24Polygons: PolygonConfig[] = [
    {
        id: 1,
        name: "National Police Cadet Corps Headquarters",
        path: [
          { lat: 1.374337, lng: 103.719644 },
          { lat: 1.370138, lng: 103.720132 },
          { lat: 1.371382, lng: 103.722986 },
          { lat: 1.374294, lng: 103.726843 },
        ],
        center: { lat: 1.372825, lng: 103.722117},
        fillColor: "#FF00FF",
      },
  ];

  export const d24WriteUp = [
    {
      id: 1,
      title: "National Police Cadet Corps Headquarters",
      content: "<p>This area is known for its vibrant community and historic significance...</p>",
    },
  ];