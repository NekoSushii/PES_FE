import suitesAtOrchardFront from "../assets/Museum/suites_at_orchard_front.jpg";
import hausOnHandyFront from "../assets/Museum/house_on_handy_front.jpg";
import hausOnHandyStairs from "../assets/Museum/haus_on_handy_stairs.jpg";
import theLuxeLobby from "../assets/Museum/the_luxe_lobby.jpg";
import theCathayFront from "../assets/Museum/cathay_front.jpg";
import theCathayBack from "../assets/Museum/the_cathay_back.jpg";

export interface PolygonConfig {
    id: number;
    name: string;
    path: { lat: number; lng: number }[];
    center: { lat: number; lng: number };
    fillColor: string;
  }
  
  export const museumPolygons: PolygonConfig[] = [
    {
        id: 1,
        name: "Suites at Orhard",
        path: [
          { lat: 1.3008894985409662, lng: 103.84579712134453 },
          { lat: 1.3006267097983606, lng: 103.84552353605238 },
          { lat: 1.2999523079510205, lng: 103.84625041462269 },
          { lat: 1.3000850431201165, lng: 103.84640195941687 },
        ],
        center: { lat: 1.3004403442959398, lng: 103.84595268945182 },
        fillColor: "rgb(255,0,255)",
      },
    {
      id: 2,
      name: "Haus on Handy",
      path: [
        { lat: 1.3004282774597036, lng: 103.84684318282365 },
        { lat: 1.2999134259258072, lng: 103.84625577910815 },
        { lat: 1.2995889621447954, lng: 103.84668627361197 },
        { lat: 1.3002204597958955, lng: 103.84692767239916 },
      ],
      center: { lat: 1.3000099605964102, lng: 103.84663665275016 },
      fillColor: "rgb(255,0,255)",
    },
    // {
    //     id: 3,
    //     name: "Nomu",
    //     path: [
    //       { lat: 1.3002083929572548, lng: 103.84695851782726 },
    //       { lat: 1.2995514208721537, lng: 103.8467412589188 },
    //       { lat: 1.2994924274520556, lng: 103.84697461107973 },
    //       { lat: 1.2999965529974624, lng: 103.8471529779614 },
    //     ],
    //     center: { lat: 1.2997860537793011, lng: 103.8469464478879 },
    //     fillColor: "rgb(255,0,255)",
    // },
    {
        id: 4,
        name: "The Luxe",
        path: [
          { lat: 1.299838343393768, lng: 103.84713152031384 },
          { lat: 1.299491086690629, lng: 103.84699875098087 },
          { lat: 1.2994227079519443, lng: 103.84720393994998 },
          { lat: 1.299773986942734, lng: 103.84732598044795 },
        ],
        center: { lat: 1.2996130958079806, lng: 103.84715566019256 },
        fillColor: "rgb(255,0,255)",
    },
    {
        id: 5,
        name: "The Cathay",
        path: [
          { lat: 1.2998530917425648, lng: 103.8473232982767 },
          { lat: 1.2993570107263546, lng: 103.8472079633006 },
          { lat: 1.2990928810644522, lng: 103.84768807866625 },
          { lat: 1.299153215253623, lng: 103.84812125537881 },
          { lat: 1.299657340866725, lng: 103.8480863866651 },
          { lat: 1.2999523079341126, lng: 103.84791204309658 },
        ],
        center: { lat: 1.2995433763087343, lng: 103.84769880750123 },
        fillColor: "rgb(68, 36, 214)",
    },
  ];

  export const museumWriteUp = [
    {
        id: 1,
        title: "Suites at Orchard",
        type: "Condominium",
        tenure: "99 Years from 2007",
        yearOfReview: "2025",
        content: `<img src="${suitesAtOrchardFront}" style="width:85%; height:auto;" />
                  <h2>Vibes & Amenities</h2>
                  <h2>Livability & Costs</h2>
                  `,
    },
    {
        id: 2,
        title: "Haus on Handy",
        type: "Condominium",
        tenure: "99 Years from 2023",
        yearOfReview: "2025",
        content: `<img src="${hausOnHandyFront}" style="width:85%; height:auto;" />
                  <img src="${hausOnHandyStairs}" style="width:85%; height:auto;" />
                  <h2>Vibes & Amenities</h2>
                  <h2>Livability & Costs</h2>
                  `,
    },
    // {
    //     id: 3,
    //     title: "Nomu",
    //     type: "Condominium",
    //     tenure: "Freehold",
    //     yearOfReview: "2025",
    //     content: `
    //               <h2>Vibes & Amenities</h2>
    //               <h2>Livability & Costs</h2>
    //               `,
    // },
    {
        id: 4,
        title: "The Luxe",
        type: "Condominium",
        tenure: "99 Years from 2005",
        yearOfReview: "2025",
        content: `<img src="${theLuxeLobby}" style="width:85%; height:auto;" />
                  <h2>Vibes & Amenities</h2>
                  <h2>Livability & Costs</h2>
                  `,
    },
    {
        id: 5,
        title: "The Cathay",
        type: "Mixed Development",
        tenure: "Freehold",
        yearOfReview: "2025",
        content: `<img src="${theCathayFront}" style="width:85%; height:auto;" />
                  <img src="${theCathayBack}" style="width:85%; height:auto;" />
                  <h2>Vibes & Amenities</h2>
                  <h2>Livability & Costs</h2>
                  `,
    },
  ];