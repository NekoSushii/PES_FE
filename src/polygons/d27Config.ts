export interface PolygonConfig {
    id: number;
    name: string;
    path: { lat: number; lng: number }[];
    center: { lat: number; lng: number };
    fillColor: string;
  }
  
  export const d27Polygons: PolygonConfig[] = [
    {
        id: 1,
        name: "350/351/352 Canberra Road, 353/354 Admiralty Road, 355 Sembawang Way",
        path: [
          { lat: 1.450793, lng: 103.817813 },
          { lat: 1.449131, lng: 103.818480 },
          { lat: 1.449817, lng: 103.821411 },
          { lat: 1.451941, lng: 103.820247 },
        ],
        center: { lat: 1.450415, lng: 103.819485},
        fillColor: "#FF00FF",
      },
    {
      id: 2,
      name: "356/357/358/359/360 Admiralty Drive",
      path: [
        { lat: 1.449518, lng: 103.814408 },
        { lat: 1.448277, lng: 103.814523 },
        { lat: 1.449126, lng: 103.818270 },
        { lat: 1.450621, lng: 103.817677 },
      ],
      center: { lat: 1.449392, lng: 103.816330},
      fillColor: "#FF00FF",
    },
  ];

  export const d27WriteUp = [
    {
      id: 1,
      title: "350/351/352 Canberra Road, 353/354 Admiralty Road, 355 Sembawang Way",
      content: "<p>This area is known for its vibrant community and historic significance...</p>",
    },
    {
      id: 2,
      title: "356/357/358/359/360 Admiralty Drive",
      content: "<p>A quiet residential area with beautiful parks and amenities nearby...</p>",
    },
  ];