import nivenRoadShophouse1 from "../assets/Rochor/1_mount_emily_road.jpg";
import nivenRoadShophouse2 from "../assets/Rochor/niven_road_1.jpg";
import nivenRoadShophouse3 from "../assets/Rochor/niven_road_2.jpg";
import nivenRoadShophouse4 from "../assets/Rochor/niven_road_3.jpg";
import nivenRoadShophouse5 from "../assets/Rochor/cove_niven_road.jpg";
import upperwilkieRoad4_6 from "../assets/Rochor/4_6_upper_wilkie_road.jpg";
import mountSophia8atFront from "../assets/Rochor/8_@_mount_sophia_front.jpg";
import mountSophia8atFront2 from "../assets/Rochor/8_@_mount_sophia_front_1.jpg";
import upperWilkieRoad8 from "../assets/Rochor/8_upper_wilkie_road.jpg";
import sophiaRoad71_75Front from "../assets/Rochor/71_75_sophia_road.jpg";
import sophiaRoad71_75Emblem from "../assets/Rochor/71_75_sophia_road_emblem.jpg";

export interface PolygonConfig {
    id: number;
    name: string;
    path: { lat: number; lng: number }[];
    center: { lat: number; lng: number };
    fillColor: string;
  }
  
  export const rochorPolygons: PolygonConfig[] = [
    {
        id: 1,
        name: "Niven Road Shophouses",
        path: [
          { lat: 1.3044698900237968, lng: 103.84950596507751 },
          { lat: 1.3028515958871065, lng: 103.84918812333832 },
          { lat: 1.3026933864655432, lng: 103.84941342888601 },
          { lat: 1.3027537205685973, lng: 103.84954619821897 },
          { lat: 1.302747016779454, lng: 103.84972724730935 },
          { lat: 1.3038784661473346, lng: 103.84984157870099 },
          { lat: 1.3038972367485038, lng: 103.84967662286307 },
          { lat: 1.3043959983899893, lng: 103.84966589402754 },
        ],
        center: { lat: 1.3034628313652852, lng: 103.84947545719658 },
        fillColor: "rgb(61, 223, 49)",
      },
    {
      id: 2,
      name: "4-6 Upper Wilkie Road",
      path: [
        { lat: 1.3042118122822342, lng: 103.84678844747265 },
        { lat: 1.304069021652011, lng: 103.84665903090064 },
        { lat: 1.3038712599676587, lng: 103.84691048797062 },
        { lat: 1.3040368434806973, lng: 103.84702649349892 },
      ],
      center: { lat: 1.3040361731021213, lng: 103.84684812661726 },
      fillColor: "rgb(61, 223, 49)",
    },
    {
        id: 3,
        name: "8 @ Mount Sophia",
        path: [
          { lat: 1.3001173362228602, lng: 103.84641769669344 },
          { lat: 1.3004498444933499, lng: 103.8468964709558 },
          { lat: 1.3006938626342774, lng: 103.846872331079 },
          { lat: 1.3015760818596847, lng: 103.84616959237181 },
          { lat: 1.3023175211872258, lng: 103.84606498622011 },
          { lat: 1.3016015562805434, lng: 103.84556207208013 },
          { lat: 1.3013629012582328, lng: 103.84544673707246 },
        ],
        center: { lat: 1.3010035779287743, lng: 103.84616288682487 },
        fillColor: "rgb(255,0,255)",
    },
    {
        id: 4,
        name: "8 Upper Wilkie Road",
        path: [
          { lat: 1.3039151871180292, lng: 103.84725933955599 },
          { lat: 1.3036550802055817, lng: 103.8470628677653 },
          { lat: 1.3034888262887137, lng: 103.8473438291315 },
          { lat: 1.3037563073834604, lng: 103.84750140889537 },
        ],
        center: { lat: 1.3036818953524356, lng: 103.84726939783879 },
        fillColor: "rgb(61, 223, 49)",
    },
    {
        id: 5,
        name: "71-75 Sophia Road",
        path: [
          { lat: 1.3018928335199462, lng: 103.84783058108162 },
          { lat: 1.301676301047179, lng: 103.84775950254985 },
          { lat: 1.3016166372975617, lng: 103.84790501237434 },
          { lat: 1.301839203187868, lng: 103.84798749029329 },
        ],
        center: { lat: 1.3017574169292534, lng: 103.84787684918251 },
        fillColor: "rgb(61, 223, 49)",
    },
  ];

  export const rochorWriteUp = [
    {
        id: 1,
        title: "Niven Road Shophouses",
        type: "Shophouses",
        tenure: "Freehold",
        yearOfReview: "2025",
        content: `<img src="${nivenRoadShophouse1}" style="width:85%; height:auto;" />
                  <img src="${nivenRoadShophouse2}" style="width:85%; height:auto;" />
                  <img src="${nivenRoadShophouse3}" style="width:85%; height:auto;" />
                  <img src="${nivenRoadShophouse4}" style="width:85%; height:auto;" />
                  <img src="${nivenRoadShophouse5}" style="width:85%; height:auto;" />
                  <h2>Vibes & Amenities</h2>
                  <h2>Livability & Costs</h2>
                  `,
    },
    {
        id: 2,
        title: "4-6 Upper Wilkie Road",
        type: "Landed",
        tenure: "Freehold",
        yearOfReview: "2025",
        content: `<img src="${upperwilkieRoad4_6}" style="width:85%; height:auto;" />
                  <h2>Vibes & Amenities</h2>
                  <h2>Livability & Costs</h2>
                  `,
    },
    {
        id: 3,
        title: "8 @ Mount Sophia",
        type: "Condominium",
        tenure: "103 Years from 2002",
        yearOfReview: "2025",
        content: `<img src="${mountSophia8atFront}" style="width:85%; height:auto;" />
                  <img src="${mountSophia8atFront2}" style="width:85%; height:auto;" />
                  <h2>Vibes & Amenities</h2>
                  <h2>Livability & Costs</h2>
                  `,
    },
    {
        id: 4,
        title: "8 Upper Wilkie Road",
        type: "Landed",
        tenure: "Freehold",
        yearOfReview: "2025",
        content: `<img src="${upperWilkieRoad8}" style="width:85%; height:auto;" />
                  <h2>Vibes & Amenities</h2>
                  <h2>Livability & Costs</h2>
                  `,
    },
    {
        id: 5,
        title: "71-75 Sopia Road",
        type: "Landed",
        tenure: "Freehold",
        yearOfReview: "2025",
        content: `<img src="${sophiaRoad71_75Front}" style="width:85%; height:auto;" />
                  <img src="${sophiaRoad71_75Emblem}" style="width:85%; height:auto;" />
                  <h2>Vibes & Amenities</h2>
                  <h2>Livability & Costs</h2>
                  `,
    },
  ];