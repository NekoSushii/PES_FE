export interface PolygonConfig {
    id: number;
    name: string;
    path: { lat: number; lng: number }[];
    fillColor: string;
  }
  
  export const polygons: PolygonConfig[] = [
    {
      id: 1,
      name: "District 1",
      path: [
        { lat: 1.345634, lng: 103.881787 },
        { lat: 1.346124, lng: 103.882860 },
        { lat: 1.346280, lng: 103.883522 },
        { lat: 1.346068, lng: 103.883647 },
        { lat: 1.345038, lng: 103.882264 },
      ],
      fillColor: "#FF0000",
    },
    {
      id: 2,
      name: "District 2",
      path: [
        { lat: 1.3521, lng: 103.8198 },
        { lat: 1.3530, lng: 103.8210 },
        { lat: 1.3510, lng: 103.8230 },
        { lat: 1.3500, lng: 103.8200 },
      ],
      fillColor: "#00FF00",
    },
    {
      id: 3,
      name: "District 3",
      path: [
        { lat: 1.3591, lng: 103.8108 },
        { lat: 1.3601, lng: 103.8128 },
        { lat: 1.3581, lng: 103.8138 },
        { lat: 1.3571, lng: 103.8118 },
      ],
      fillColor: "#0000FF",
    },
    {
      id: 4,
      name: "District 4",
      path: [
        { lat: 1.3491, lng: 103.8008 },
        { lat: 1.3501, lng: 103.8028 },
        { lat: 1.3481, lng: 103.8038 },
        { lat: 1.3471, lng: 103.8018 },
      ],
      fillColor: "#FFFF00",
    },
    {
      id: 5,
      name: "District 5",
      path: [
        { lat: 1.3421, lng: 103.8308 },
        { lat: 1.3431, lng: 103.8328 },
        { lat: 1.3411, lng: 103.8338 },
        { lat: 1.3401, lng: 103.8318 },
      ],
      fillColor: "#FF00FF",
    },
  ];
  