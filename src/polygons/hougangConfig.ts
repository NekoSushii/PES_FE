import shophouse9961030UpperSerangoonRoadBack from "../assets/Hougang/hougang_996_1030_upper_serangoon_road_back.jpg";
import hengLongTeochewPorridge from "../assets/Hougang/hougang_heng_long_teochew_porridge.jpg";
import jalanRengkam1 from "../assets/Hougang/hougang_jalan_rengkam_1.jpg";
import jalanRengkam3 from "../assets/Hougang/hougang_jalan_rengkam_3.jpg";
import jalanRengkam4 from "../assets/Hougang/hougang_jalan_rengkam_4.jpg";
import starsOfKovanFront from "../assets/Hougang/hougang_stars_of_kovan_front.jpg";
import starsOfKovanStoreMainEntrance from "../assets/Hougang/hougang_stars_of_kovan_main_entrance.jpg";
import starsOfKovanStoreFront from "../assets/Hougang/hougnag_stars_of_kovan_store_front.jpg";

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
      fillColor: "rgb(68, 36, 214)",
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
      fillColor: "rgb(61, 223, 49)",
    },
    {
      id: 3,
      name: "1012-1030 Upper Serangoon Road",
      path: [
        { lat: 1.362242658835887, lng: 103.88755439553353 },
        { lat: 1.3621608745820903, lng: 103.88788430723328 },
        { lat: 1.362929110175466, lng: 103.88866080673223 },
        { lat: 1.363111448777719, lng: 103.88848378094212 },
      ],
      center: { lat: 1.3624156124126605, lng: 103.88790844711376},
      fillColor: "#FF00FF",
    },
  ];

  export const hougangWriteUp = [
    {
      id: 1,
      title: "Stars of Kovan",
      type: "Mixed Development",
      tenure: "Leasehold - 99 years",
      yearOfReview: "2025",
      content: `<img src="${starsOfKovanFront}" style="width:85%; height:auto;" />
                <p>Stars of Kovan is a mixed development located in Kovan, a brief 5 minutes walk from Kovan mrt and Heartland Mall Kovan.</p>
                <img src="${starsOfKovanStoreFront}" style="width:85%; height:auto;" />
                <h2>Vibes & Amenities</h2>
                <p>Located in the heart of bustling Kovan, Stars of Kovan is no stranger to the hustle and bustle of residences, across the road we have an assortment of popular local delights such as Punggol Nasi Lemak, Qi Wei Chicken Claypot and many more famous eateries among the stretch of shophouses along Upper Serangoon Road.</p>
                <p>Not to forget, Stars of Kovan being a mixed development, there is a convenient stretch of shops just at the first floor of the condominium.</p>
                <p>At just a 5 minutes walk from the condominium is the Kovan Mrt line, which is a short 30 minutes transit to the city center. And just right next to the Mrt is Heartland Mall Kovan, which has the standard cookie cutter slew of grocery stores like NTUC, Cold Storage and Scarlett, a good mix of restraunts and eateries, but missing hardware stores.</p>
                <img src="${starsOfKovanStoreMainEntrance}" style="width:85%; height:auto;" />
                <h2>Livability & Costs</h2>
                <p>Built in 2020, Stars of Kovan is a relatively new project in the Kovan area and as such, the units are smaller than its older counterparts. For a medium sized project, the facilities are somewhat lackluster, probably owing to its mixed development siteplan. Interestingly, this project does offer 5 strata terrace units, which is a rare gem in the market.</p>
                <p>When it comes to relative sizes, the living rooms are decently sized, and all units except 1 bedroom units come with enclosable kitchen, as well as homeshelters which are a great plus.</p>
                `,
    },
    {
      id: 2,
      title: "Tai Peng Gardens",
      type: "Landed",
      tenure: "Freehold",
      yearOfReview: "2025",
      content: `<img src="${jalanRengkam1}" style="width:85%; height:auto;" />
                <p>Tai Peng Gardens is a small freehold landed enclave along Jalan Rengkam, which comprises of 2 to 3 story terraces.</p>
                <img src="${jalanRengkam3}" style="width:85%; height:auto;" />
                <h2>Vibes & Amenities</h2>
                <p>Tucked off to the side of Upper Serangoon Road, Tai Peng Gardens is a small refuge of peace and quiet, which spares it from the hustle and bustle of the main street of Kovan.</p>
                <img src="${jalanRengkam4}" style="width:85%; height:auto;" />
                <p>Being just a short 7 mins walk to Kovan Mrt station and Heartland Mall Kovan, residences residing here will have no short of food offerings and transport. Who can forget the famous eateries in shophouses along Upper Serangoon Road, giving residences here the comfort foods of Singapore.</p>
                <img src="${hengLongTeochewPorridge}" style="width:85%; height:auto;" />
                <p>At the entrance of Jalan Rengkam, there is also a small hawker selling Teochew Porridge, which based on review seems to be good.</p>
                <h2>Livability & Costs</h2>
                <p></p>
                `,
    },
    {
      id: 3,
      title: "1012-1030 Upper Serangoon Road",
      type: "Shophouse",
      tenure: "Freehold",
      yearOfReview: "2025",
      content: `<img src="${shophouse9961030UpperSerangoonRoadBack}" style="width:85%; height:auto;" />
                <p>Nestled along Upper Serangoon Road, we have a row of 3 story shophouse, where the first floor contains a bunch of eateries, the second floor being residential and commercial units, and third floor residential units.</p>
                <img src="${shophouse9961030UpperSerangoonRoadBack}" style="width:85%; height:auto;" />
                <h2>Vibes & Amenities</h2>
                <p>Busy, busy, busy! Is the unofficial moto of this area in Kovan, residents and proprietors will have no short of passerby perusing the shops on either sides of the street, constant rumbling of buses and cars will fill the air, fragrant with the smells of the nearby eateries and restaurants.</p>
                <h2>Livability & Costs</h2>
                <p>Shophouses in these heartland areas are not the most livable space, with units containing only 1 washroom, which has some owners renovating to have an additional powder room next to the kitchen. As such, units are surprisingly affordable. Buyers do beware though, as the age of the property creep up, roofing issues, piping and electrical wires might be due for a refresh, which would add to the cost of renovations.</p>
                <p>Shophouses do have a perk of having an unoffical backyard that is shared between all the units, which owners could store items, but which might lead to cluttering, which in this property's case, is quite minimal. However, it seemed to be a long time since the upkeep of these areas are attended do, and as such, the back of the shophouses does look somewhat unkept and dirty.</p>
                `,
    },
  ];