export interface PolygonConfig {
    id: number;
    name: string;
    path: { lat: number; lng: number }[];
    center: { lat: number; lng: number };
    fillColor: string;
  }
  
  export const d26Polygons: PolygonConfig[] = [
    {
        id: 1,
        name: "912-928 Upper Thompson Road",
        path: [
          { lat: 1.399638, lng: 103.818039 },
          { lat: 1.399594, lng: 103.817807 },
          { lat: 1.398870, lng: 103.818066 },
          { lat: 1.398934, lng: 103.818283 },
        ],
        center: { lat: 1.399296, lng: 103.818051},
        fillColor: "#FF00FF",
      },
    {
      id: 2,
      name: "1-100 Thong Soon Green",
      path: [
        { lat: 1.399625, lng: 103.818045 },
        { lat: 1.398946, lng: 103.818290 },
        { lat: 1.399036, lng: 103.818545 },
        { lat: 1.399700, lng: 103.818297 },
      ],
      center: { lat: 1.399363, lng: 103.818292},
      fillColor: "#FF00FF",
    },
  ];

  export const d26WriteUp = [
    {
      id: 1,
      title: "912-928 Upper Thompson Road",
      content: "<p>This area is known for its vibrant community and historic significance...</p>",
    },
    {
      id: 2,
      title: "1-100 Thong Soon Green",
      content: "<p>A quiet residential area with beautiful parks and amenities nearby...</p>",
    },
  ];