import starsOfKovanFront from "../assets/Kovan/stars_of_kovan_front.jpg";

export interface PolygonConfig {
    id: number;
    name: string;
    path: { lat: number; lng: number }[];
    center: { lat: number; lng: number };
    fillColor: string;
  }
  
  export const hougangPolygons: PolygonConfig[] = [
    {
        id: 1,
        name: "Stars of Kovan",
        path: [
          { lat: 1.361353, lng: 103.888184 },
          { lat: 1.361123, lng: 103.888192 },
          { lat: 1.361013, lng: 103.886557 },
          { lat: 1.361232, lng: 103.886524 },
          { lat: 1.361992, lng: 103.887292 },
          { lat: 1.361714, lng: 103.887592 },
          { lat: 1.361714, lng: 103.887773 },
          { lat: 1.361349, lng: 103.887769 },
        ],
        center: { lat: 1.361409, lng: 103.887241},
        fillColor: "#FF00FF",
      },
    {
      id: 2,
      name: "Jalan Rengkam",
      path: [
        { lat: 1.362140, lng: 103.889621 },
        { lat: 1.362172, lng: 103.887924 },
        { lat: 1.362880, lng: 103.888685 },
        { lat: 1.362830, lng: 103.889395 },
        { lat: 1.362587, lng: 103.889619 },
      ],
      center: { lat: 1.347638, lng: 103.885405},
      fillColor: "#FF00FF",
    },
  ];

  export const hougangWriteUp = [
    {
      id: 1,
      title: "Stars of Kovan",
      type: "Mixed Development",
      tenure: "Leasehold - 99 years",
      content: `<p>Stars of Kovan</p><img src="${starsOfKovanFront}" style="width:300px; height:auto;" />`,
    },
    {
      id: 2,
      title: "Jalan Rengkam",
      type: "Landed",
      tenure: "Freehold",
      content: "<p>A quiet residential area with beautiful parks and amenities nearby...</p>",
    },
  ];