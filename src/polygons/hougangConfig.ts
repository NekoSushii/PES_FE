import shophouse9961030UpperSerangoonRoadBack from "../assets/Hougang/hougang_996_1030_upper_serangoon_road_back.jpg";
import hengLongTeochewPorridge from "../assets/Hougang/hougang_heng_long_teochew_porridge.jpg";
import jalanRengkam1 from "../assets/Hougang/hougang_jalan_rengkam_1.jpg";
import jalanRengkam3 from "../assets/Hougang/hougang_jalan_rengkam_3.jpg";
import jalanRengkam4 from "../assets/Hougang/hougang_jalan_rengkam_4.jpg";
import starsOfKovanFront from "../assets/Hougang/hougang_stars_of_kovan_front.jpg";
import starsOfKovanStoreMainEntrance from "../assets/Hougang/hougang_stars_of_kovan_main_entrance.jpg";
import starsOfKovanStoreFront from "../assets/Hougang/hougnag_stars_of_kovan_store_front.jpg";
import starsOfKovanBack from "../assets/Hougang/hougang_stars_of_kovan_back.jpg";
import st31Ave3HdbCluster1 from "../assets/Hougang/hougang_st31_ave3_hdb_cluster_1.jpg";
import st31Ave3HdbCluster2 from "../assets/Hougang/hougang_st31_ave3_hdb_cluster_2.jpg";
import valleyRoad1 from "../assets/Hougang/hougang_valley_road_1.jpg";
import valleyRoad2 from "../assets/Hougang/hougang_valley_road_2.jpg";
import valleyRoad3 from "../assets/Hougang/hougang_valley_road_3.jpg";
import valleyRoad4 from "../assets/Hougang/hougang_valley_road_4.jpg";
import valleyRoad5 from "../assets/Hougang/hougang_valley_road_5.jpg";
import valleyRoad6 from "../assets/Hougang/hougang_valley_road_6.jpg";
import theTembusuFront from "../assets/Hougang/hougang_the_tembusu_front.jpg";
import fortuneParkFront from "../assets/Hougang/hougang_fortune_park.jpg";
import triliveFront from "../assets/Hougang/hougang_trilive.jpg";
import tampinesRoad9799 from "../assets/Hougang/hougang_97_99_tampines_road.jpg";

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
      fillColor: "rgb(255,0,255)",
    },
    {
      id: 4,
      name: "HDB cluster along Upper Serangoon Road and Hougang Ave 3",
      path: [
        { lat: 1.3635134164304465, lng: 103.88894443367307 },
        { lat: 1.3626285379219605, lng: 103.88977055399246 },
        { lat: 1.3625936790656026, lng: 103.89049206814529 },
        { lat: 1.3623067638441628, lng: 103.89048133931031 },
        { lat: 1.362408658974007, lng: 103.8911599382051 },
        { lat: 1.362408658986233, lng: 103.89272903034804 },
        { lat: 1.3639987587461264, lng: 103.89224086835779 },
        { lat: 1.3653475271967364, lng: 103.8909024461797 },
      ],
      center: { lat: 1.363617427374701, lng: 103.8911089580671},
      fillColor: "rgb(206, 145, 88)",
    },
    {
      id: 5,
      name: "Valley Road",
      path: [
        { lat: 1.3621544836374324, lng: 103.88777467743294 },
        { lat: 1.361359433285714, lng: 103.88777333632858 },
        { lat: 1.3614573062778765, lng: 103.88917747265504 },
        { lat: 1.3621303505788325, lng: 103.88922307020374 },
      ],
      center: { lat: 1.363617427374701, lng: 103.8911089580671},
      fillColor: "rgb(61, 223, 49)",
    },
    {
      id: 6,
      name: "The Tembusu",
      path: [
        { lat: 1.362045884869725, lng: 103.88931560652536 },
        { lat: 1.3613500482041931, lng: 103.88922038811486 },
        { lat: 1.3615136167640494, lng: 103.89049443726948 },
        { lat: 1.3621182840488073, lng: 103.89040860658959 },
      ],
      center: { lat: 1.3617348365199802, lng: 103.88974073661169},
      fillColor: "rgb(255,0,255)",
    },
    {
      id: 7,
      name: "Fortune Park",
      path: [
        { lat: 1.3620539292258103, lng: 103.89056015151084 },
        { lat: 1.361418425229246, lng: 103.89060843126828 },
        { lat: 1.3615015502341006, lng: 103.89116498958319 },
        { lat: 1.3620566106769227, lng: 103.89100942147589 },
      ],
      center: { lat: 1.3618005320827122, lng: 103.89084580674233},
      fillColor: "rgb(255,0,255)",
    },
    {
      id: 8,
      name: "Trilive",
      path: [
        { lat: 1.3623944734950708, lng: 103.89097723502967 },
        { lat: 1.361516298221014, lng: 103.8911676718507 },
        { lat: 1.361490777059716, lng: 103.891613117346 },
        { lat: 1.362406492653393, lng: 103.89154203881422 },
      ],
      center: { lat: 1.3619452830860181, lng: 103.89138378849816},
      fillColor: "rgb(255,0,255)",
    },
    {
      id: 9,
      name: "97-99 Tampines Road",
      path: [
        { lat: 1.3614130860716174, lng: 103.88886643694606 },
        { lat: 1.3612119771766071, lng: 103.88888990627258 },
        { lat: 1.3612314177038485, lng: 103.88916684432564 },
        { lat: 1.3614285044195502, lng: 103.88915946825162 },
      ],
      center: { lat: 1.361331301789679, lng: 103.8890193228446},
      fillColor: "rgb(61, 223, 49)",
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
                <img src="${starsOfKovanBack}" style="width:85%; height:auto;" />
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
    {
      id: 4,
      title: "HDB cluster along Upper Serangoon Road and Hougang Ave 3",
      type: "HDB",
      tenure: "99 Years",
      yearOfReview: "2025",
      content: `<img src="${st31Ave3HdbCluster1}" style="width:85%; height:auto;" />
                <img src="${st31Ave3HdbCluster2}" style="width:85%; height:auto;" />
                <h2>Vibes & Amenities</h2>
                <h2>Livability & Costs</h2>
                `,
    },
    {
      id: 5,
      title: "Valley Road",
      type: "Landed",
      tenure: "Freehold",
      yearOfReview: "2025",
      content: `<img src="${valleyRoad1}" style="width:85%; height:auto;" />
                <img src="${valleyRoad2}" style="width:85%; height:auto;" />
                <img src="${valleyRoad3}" style="width:85%; height:auto;" />
                <img src="${valleyRoad4}" style="width:85%; height:auto;" />
                <img src="${valleyRoad5}" style="width:85%; height:auto;" />
                <img src="${valleyRoad6}" style="width:85%; height:auto;" />
                <h2>Vibes & Amenities</h2>
                <h2>Livability & Costs</h2>
                `,
    },
    {
      id: 6,
      title: "The Tembusu",
      type: "Condominium",
      tenure: "Freehold",
      yearOfReview: "2025",
      content: `<img src="${theTembusuFront}" style="width:85%; height:auto;" />
                <h2>Vibes & Amenities</h2>
                <h2>Livability & Costs</h2>
                `,
    },
    {
      id: 7,
      title: "Fortune Park",
      type: "Condominium",
      tenure: "Freehold",
      yearOfReview: "2025",
      content: `<img src="${fortuneParkFront}" style="width:85%; height:auto;" />
                <h2>Vibes & Amenities</h2>
                <h2>Livability & Costs</h2>
                `,
    },
    {
      id: 6,
      title: "Trilive",
      type: "Condominium",
      tenure: "Freehold",
      yearOfReview: "2025",
      content: `<img src="${triliveFront}" style="width:85%; height:auto;" />
                <h2>Vibes & Amenities</h2>
                <h2>Livability & Costs</h2>
                `,
    },
    {
      id: 6,
      title: "97-99 Tampines Road",
      type: "Landed",
      tenure: "Freehold",
      yearOfReview: "2025",
      content: `<img src="${tampinesRoad9799}" style="width:85%; height:auto;" />
                <h2>Vibes & Amenities</h2>
                <h2>Livability & Costs</h2>
                `,
    },
  ];