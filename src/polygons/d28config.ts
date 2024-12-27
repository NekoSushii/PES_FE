export interface PolygonConfig {
    id: number;
    name: string;
    path: { lat: number; lng: number }[];
    center: { lat: number; lng: number };
    fillColor: string;
  }
  
  export const d28Polygons: PolygonConfig[] = [
    {
        id: 1,
        name: "13/14/15/16 Lambeth Walk	",
        path: [
          { lat: 1.407708, lng: 103.869635 },
          { lat: 1.407276, lng: 103.869887 },
          { lat: 1.407505, lng: 103.870316 },
          { lat: 1.407944, lng: 103.870006 },
        ],
        center: { lat: 1.407387, lng: 103.872199},
        fillColor: "#FF00FF",
      },
    {
      id: 2,
      name: "35 Lambeth Walk",
      path: [
        { lat: 1.407242, lng: 103.869891 },
        { lat: 1.406874, lng: 103.870142 },
        { lat: 1.407047, lng: 103.870487 },
        { lat: 1.407427, lng: 103.870278 },
      ],
      center: { lat: 1.407387, lng: 103.872199},
      fillColor: "#FF00FF",
    },
  ];


  export const d28WriteUp = [
    {
      id: 1,
      title: "13/14/15/16 Lambeth Walk",
      content: "<p>This area is known for its vibrant community and historic significance...</p>",
    },
    {
      id: 2,
      title: "35 Lambeth Walk",
      content: "<p>A quiet residential area with beautiful parks and amenities nearby...</p>",
    },
  ];