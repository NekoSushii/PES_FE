export interface PolygonConfig {
    id: number;
    name: string;
    path: { lat: number; lng: number }[];
    center: { lat: number; lng: number };
    fillColor: string;
  }
  
  export const d23Polygons: PolygonConfig[] = [
    {
        id: 1,
        name: "Hume Park 1",
        path: [
          { lat: 1.354235, lng: 103.767231 },
          { lat: 1.352920, lng: 103.767590 },
          { lat: 1.353362, lng: 103.769311 },
          { lat: 1.354634, lng: 103.768916 },
        ],
        center: { lat: 1.353868, lng: 103.7682311},
        fillColor: "#FF00FF",
      },
    {
      id: 2,
      name: "The Hillside",
      path: [
        { lat: 1.352557, lng: 103.766544 },
        { lat: 1.351775, lng: 103.766785 },
        { lat: 1.352278, lng: 103.769699 },
        { lat: 1.353281, lng: 103.769456 },
      ],
      center: { lat: 1.352525, lng: 103.768162},
      fillColor: "#FF00FF",
    },
  ];

  export const d23WriteUp = [
    {
      id: 1,
      title: "Hume Park 1",
      content: "<p>This area is known for its vibrant community and historic significance...</p>",
    },
    {
      id: 2,
      title: "The Hillside",
      content: "<p>A quiet residential area with beautiful parks and amenities nearby...</p>",
    },
  ];