export interface PolygonConfig {
    id: number;
    name: string;
    path: { lat: number; lng: number }[];
    center: { lat: number; lng: number };
    fillColor: string;
  }
  
  export const bedokPolygons: PolygonConfig[] = [
    {
        id: 1,
        name: "Kensington Square",
        path: [
          { lat: 1.345571, lng: 103.881941 },
          { lat: 1.345051, lng: 103.882279 },
          { lat: 1.346014, lng: 103.883566 },
          { lat: 1.346149, lng: 103.883457 },
        ],
        center: { lat: 1.3455954517584472, lng: 103.8827586162167},
        fillColor: "#FF00FF",
      },
    {
      id: 2,
      name: "Tai Keng Gardens",
      path: [
        { lat: 1.349211, lng: 103.885207 },
        { lat: 1.348452, lng: 103.885079 },
        { lat: 1.347894, lng: 103.884795 },
        { lat: 1.345649, lng: 103.885708 },
        { lat: 1.346029, lng: 103.886266 },
        { lat: 1.346593, lng: 103.886074 },
        { lat: 1.346849, lng: 103.886322 },
        { lat: 1.347361, lng: 103.886278 },
        { lat: 1.347859, lng: 103.886040 },
        { lat: 1.348814, lng: 103.886295 },
      ],
      center: { lat: 1.347638, lng: 103.885405},
      fillColor: "#FF00FF",
    },
  ];