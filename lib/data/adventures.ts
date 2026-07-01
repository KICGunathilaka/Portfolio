export interface Adventure {
  id: string;
  title: string;
  location: string;
  country: string;
  date: string;
  type: "hiking" | "camping" | "travel" | "climbing";
  distance?: string;
  elevation?: string;
  difficulty: "Easy" | "Moderate" | "Hard" | "Expert";
  duration: string;
  description: string;
  highlights: string[];
  image: string;
  lat?: number;
  lng?: number;
}

export const ADVENTURES: Adventure[] = [
  {
    id: "waterfall-canyon",
    title: "Hidden Waterfall Canyon",
    location: "Central Highlands",
    country: "Sri Lanka",
    date: "May 2026",
    type: "hiking",
    distance: "12 km",
    elevation: "900m gain",
    difficulty: "Hard",
    duration: "1 day",
    description:
      "A demanding trail through dense jungle leading to a dramatic canyon waterfall — sheer rock walls, turquoise pools, and total wilderness isolation.",
    highlights: [
      "Crystal blue pool carved into the canyon base",
      "Technical boulder scrambling over wet mossy rock",
      "Three river fords before reaching the falls",
      "Complete solitude — no other hikers all day",
    ],
    image: "/images/explorer/486480782_590334667384950_7960085291165407875_n.jpg",
    lat: 6.97,
    lng: 80.68,
  },
  {
    id: "knuckles-traverse",
    title: "Knuckles Summit Traverse",
    location: "Knuckles Mountain Range",
    country: "Sri Lanka",
    date: "April 2026",
    type: "hiking",
    distance: "24 km",
    elevation: "1,800m gain",
    difficulty: "Hard",
    duration: "2 days",
    description:
      "Multi-day traverse across the Knuckles — technical ridgelines, cloud forest, and panoramic views over wave after wave of green highland peaks.",
    highlights: [
      "Summit at 1,906m with a 360° ridge panorama",
      "Sleeping under stars at wild base camp",
      "Morning mist rising from the valleys like smoke",
      "Aerial drone footage from the exposed windswept ridge",
    ],
    image: "/images/explorer/703720695_940892928995787_7548368580049026280_n.jpg",
    lat: 7.39,
    lng: 80.80,
  },
  {
    id: "ridge-camp",
    title: "Overnight Ridge Camp",
    location: "Nuwara Eliya Highlands",
    country: "Sri Lanka",
    date: "March 2026",
    type: "camping",
    distance: "8 km",
    elevation: "600m gain",
    difficulty: "Moderate",
    duration: "2 days",
    description:
      "Carried full camp gear to a high ridge above the clouds — setting up home with a valley panorama and waking to a sea of mist below.",
    highlights: [
      "Camp pitched at 2,100m above sea level",
      "Sunset painting the tea plantation terraces orange",
      "Counting satellites through clear mountain skies",
      "Fog rolling in at 5AM like a slow-motion ocean",
    ],
    image: "/images/explorer/486553809_590959253989158_1003449634325424260_n.jpg",
    lat: 6.97,
    lng: 80.77,
  },
  {
    id: "flood-river-trek",
    title: "Post-Monsoon River Trek",
    location: "Southern Wilderness",
    country: "Sri Lanka",
    date: "February 2026",
    type: "hiking",
    distance: "18 km",
    elevation: "400m gain",
    difficulty: "Expert",
    duration: "1 day",
    description:
      "A post-monsoon trek where trails become rivers. Heavy packs, waist-deep crossings, and wild jungle — a lesson in reading water and staying calm.",
    highlights: [
      "Five river crossings with 20kg pack and walking stick",
      "Bamboo pole cut on-site for stability in the current",
      "Waterfall lunch stop after the deepest crossing",
      "Reached the far valley after 9 hours of river-walking",
    ],
    image: "/images/explorer/486542653_591631947255222_8781936745614695504_n.jpg",
    lat: 6.38,
    lng: 80.48,
  },
  {
    id: "sinharaja-steps",
    title: "Ancient Rainforest Trail",
    location: "Sinharaja Forest Reserve",
    country: "Sri Lanka",
    date: "January 2026",
    type: "hiking",
    distance: "10 km",
    elevation: "700m gain",
    difficulty: "Moderate",
    duration: "1 day",
    description:
      "Stone steps cut into the jungle floor centuries ago — a trail where the rainforest has been slowly reclaiming the path, moss by moss, root by root.",
    highlights: [
      "Ancient moss-covered stone stairway through dense canopy",
      "Endemic bird calls echoing through 100-year-old trees",
      "Waterfalls audible but hidden in mist above",
      "UNESCO World Heritage lowland rainforest — one of a kind",
    ],
    image: "/images/explorer/570875438_766683776416704_2065194432800988606_n.jpg",
    lat: 6.38,
    lng: 80.49,
  },
  {
    id: "horton-plains",
    title: "Horton Plains Loop",
    location: "Horton Plains National Park",
    country: "Sri Lanka",
    date: "December 2025",
    type: "hiking",
    distance: "9 km",
    elevation: "280m gain",
    difficulty: "Easy",
    duration: "4 hours",
    description:
      "Sri Lanka's cloud plateau — golden grasslands, serpentine rivers, sambar deer at sunrise, and World's End dropping 800m straight to the coastal plains.",
    highlights: [
      "Serpentine river winding through golden highland grasslands",
      "World's End viewpoint: an 800m vertical drop to the lowlands",
      "Sambar deer grazing in early morning mist",
      "Bluebird sky after a perfect cold highland sunrise",
    ],
    image: "/images/explorer/487491069_594655966952820_2266355550664252025_n.jpg",
    lat: 6.80,
    lng: 80.80,
  },
];

export const GEAR_ITEMS = [
  {
    id: "backpack",
    name: "Osprey Aether 65",
    category: "Backpacks",
    description: "Main expedition pack for multi-day highland trips.",
    rating: 5,
    image: "🎒",
  },
  {
    id: "tent",
    name: "Naturehike Cloud-Up 2",
    category: "Shelter",
    description: "Ultralight tent that's survived mountain rain and highland winds.",
    rating: 5,
    image: "⛺",
  },
  {
    id: "boots",
    name: "Salomon X Ultra 4 GTX",
    category: "Footwear",
    description: "Technical waterproof trail boot. Thousands of jungle kilometres logged.",
    rating: 5,
    image: "🥾",
  },
  {
    id: "camera",
    name: "Sony A7 IV + 24-70mm",
    category: "Photography",
    description: "Primary landscape photography setup. Handles tropical humidity like a champ.",
    rating: 5,
    image: "📷",
  },
  {
    id: "drone",
    name: "DJI Mini 4 Pro",
    category: "Aerial",
    description: "Lightweight drone for ridge and summit aerials. Under 249g.",
    rating: 4,
    image: "🚁",
  },
  {
    id: "sleeping",
    name: "Sea to Summit Spark III",
    category: "Sleep System",
    description: "Ultralight down bag rated -9°C. Perfect for highland cold nights.",
    rating: 5,
    image: "🛏️",
  },
];

export const VISITED_COUNTRIES = [
  "Sri Lanka", "India", "Thailand", "Malaysia", "Singapore",
  "Japan", "South Korea", "Indonesia", "Vietnam", "Nepal",
  "Maldives", "UAE", "Turkey", "Germany", "France",
  "Italy", "Spain", "Netherlands", "United Kingdom", "Switzerland",
];
