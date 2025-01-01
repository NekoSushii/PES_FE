export interface PolygonConfig {
    id: number;
    name: string;
    path: { lat: number; lng: number }[];
    center: { lat: number; lng: number };
    fillColor: string;
  }
  
  export const d22Polygons: PolygonConfig[] = [
    {
        id: 1,
        name: "986/987/988/989/998 Jurong West Street 93",
        path: [
          { lat: 1.337085, lng: 103.693948 },
          { lat: 1.335036, lng: 103.694267 },
          { lat: 1.335079, lng: 103.696271 },
          { lat: 1.337420, lng: 103.695802 },
        ],
        center: { lat: 1.336190, lng: 103.695096},
        fillColor: "#FF00FF",
      },
    {
      id: 2,
      name: "Jurong West Crystal",
      path: [
        { lat: 1.336277, lng: 103.692589 },
        { lat: 1.336019, lng: 103.692896 },
        { lat: 1.336017, lng: 103.694043 },
        { lat: 1.336662, lng: 103.693922 },
        { lat: 1.337068, lng: 103.693689 },
        { lat: 1.336708, lng: 103.693040 },
      ],
      center: { lat: 1.336416, lng: 103.693452},
      fillColor: "#FF00FF",
    },
  ];

  export const d22WriteUp = [
    {
      id: 1,
      title: "986/987/988/989/998 Jurong West Street 93",
      content: "<p>This area is known for its vibrant community and historic significance...</p>",
    },
    {
      id: 2,
      title: "Jurong West Crystal",
      content: "<p>A quiet residential area with beautiful parks and amenities nearby...</p>",
    },
  ];