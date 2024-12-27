export interface PolygonConfig {
    id: number;
    name: string;
    path: { lat: number; lng: number }[];
    center: { lat: number; lng: number };
    fillColor: string;
  }
  
  export const d25Polygons: PolygonConfig[] = [
    {
        id: 1,
        name: "52-82 Jalan Kasau",
        path: [
          { lat: 1.417347, lng: 103.758378 },
          { lat: 1.417133, lng: 103.758395 },
          { lat: 1.417174, lng: 103.760327 },
          { lat: 1.417399, lng: 103.760328 },
        ],
        center: { lat: 1.417265, lng: 103.759347},
        fillColor: "#FF00FF",
      },
    {
      id: 2,
      name: "",
      path: [
        { lat: 1.417122, lng: 103.758423 },
        { lat: 1.416840, lng: 103.758436 },
        { lat: 1.416888, lng: 103.760096 },
        { lat: 1.417173, lng: 103.760090 },
      ],
      center: { lat: 1.417042, lng: 103.759382},
      fillColor: "#FF00FF",
    },
  ];

  export const d25WriteUp = [
    {
      id: 1,
      title: "52-82 Jalan Kasau",
      content: "<p>This area is known for its vibrant community and historic significance...</p>",
    },
    {
      id: 2,
      title: "27-53 Jalan Gelegar",
      content: "<p>A quiet residential area with beautiful parks and amenities nearby...</p>",
    },
  ];