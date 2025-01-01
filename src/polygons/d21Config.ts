export interface PolygonConfig {
    id: number;
    name: string;
    path: { lat: number; lng: number }[];
    center: { lat: number; lng: number };
    fillColor: string;
  }
  
  export const d21Polygons: PolygonConfig[] = [
    {
        id: 1,
        name: "The Blossomvale",
        path: [
          { lat: 1.337671, lng: 103.782051 },
          { lat: 1.336839, lng: 103.782041 },
          { lat: 1.336529, lng: 103.782924 },
          { lat: 1.337151, lng: 103.783138 },
          { lat: 1.337811, lng: 103.782272 },
        ],
        center: { lat: 1.337142, lng: 103.782503},
        fillColor: "#FF00FF",
      },
    {
      id: 2,
      name: "Mayfair Morden",
      path: [
        { lat: 1.337839, lng: 103.781181 },
        { lat: 1.337035, lng: 103.781302 },
        { lat: 1.336898, lng: 103.781988 },
        { lat: 1.337967, lng: 103.782132 },
        { lat: 1.338196, lng: 103.781820 },
      ],
      center: { lat: 1.337597, lng: 103.781689},
      fillColor: "#FF00FF",
    },
  ];

  export const d21WriteUp = [
    {
      id: 1,
      title: "The Blossomvale",
      content: "<p>This area is known for its vibrant community and historic significance...</p>",
    },
    {
      id: 2,
      title: "Mayfair Morden",
      content: "<p>A quiet residential area with beautiful parks and amenities nearby...</p>",
    },
  ];