export interface PolygonConfig {
    id: number;
    name: string;
    path: { lat: number; lng: number }[];
    center: { lat: number; lng: number };
    fillColor: string;
  }
  
  export const d20Polygons: PolygonConfig[] = [
    {
        id: 1,
        name: "Ellington Square",
        path: [
          { lat: 1.371630, lng: 103.833216 },
          { lat: 1.371046, lng: 103.834953 },
          { lat: 1.372365, lng: 103.835765 },
          { lat: 1.373271, lng: 103.834405 },
        ],
        center: { lat: 1.372067, lng: 103.834540},
        fillColor: "#FF00FF",
      },
    {
      id: 2,
      name: "",
      path: [
        { lat: 1.374963, lng: 103.832638 },
        { lat: 1.373740, lng: 103.832609 },
        { lat: 1.372097, lng: 103.832094 },
        { lat: 1.371639, lng: 103.832584 },
        { lat: 1.372180, lng: 103.833086 },
        { lat: 1.374856, lng: 103.832947 },
      ],
      center: { lat: 1.373199, lng: 103.832697},
      fillColor: "#FF00FF",
    },
  ];

  export const d20WriteUp = [
    {
      id: 1,
      title: "Ellington Square",
      content: "<p>This area is known for its vibrant community and historic significance...</p>",
    },
    {
      id: 2,
      title: "St Nicholas View",
      content: "<p>A quiet residential area with beautiful parks and amenities nearby...</p>",
    },
  ];