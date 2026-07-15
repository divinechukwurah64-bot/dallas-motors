/* =========================================================
   DALLAS MOTORS — Inventory Data
   Fictional in-house marques (no real automaker branding),
   spread across every category the dealer carries.
   ========================================================= */

const INVENTORY = [
  // ---------------- SEDAN ----------------
  { id:"kestrel-lm-sedan", type:"sedan", make:"Kestrel", model:"LM Sedan", year:2026, price:34900, mileage:1200,
    fuel:"Petrol", trans:"Automatic", drivetrain:"FWD", hp:201, mpg:34, seats:5, color:"Graphite Grey",
    tags:["New Arrival"], rating:4.8,
    features:["Adaptive cruise control","Wireless phone charging","12.3\" digital cluster","Heated front seats","Lane-keep assist","Dual-zone climate"] },
  { id:"kestrel-lm-gt", type:"sedan", make:"Kestrel", model:"LM Sedan GT", year:2025, price:41200, mileage:8600,
    fuel:"Petrol", trans:"Automatic", drivetrain:"AWD", hp:255, mpg:29, seats:5, color:"Onyx Black",
    tags:["Certified"], rating:4.7,
    features:["Sport-tuned suspension","19\" alloy wheels","Adaptive cruise control","Premium audio","Heated & ventilated seats","Blind-spot monitor"] },
  { id:"aurelia-cs4", type:"sedan", make:"Aurelia", model:"CS4", year:2024, price:29800, mileage:15400,
    fuel:"Hybrid", trans:"Automatic", drivetrain:"FWD", hp:188, mpg:47, seats:5, color:"Pearl White",
    tags:["Great Value"], rating:4.6,
    features:["Hybrid drivetrain","Apple CarPlay / Android Auto","Rear cross-traffic alert","Keyless entry","Auto climate control"] },
  { id:"kestrel-lm-base", type:"sedan", make:"Kestrel", model:"LM Sedan Base", year:2023, price:23400, mileage:24100,
    fuel:"Petrol", trans:"Manual", drivetrain:"FWD", hp:168, mpg:36, seats:5, color:"Silver Mist",
    tags:[], rating:4.4,
    features:["Manual transmission","Cloth interior","Backup camera","Bluetooth audio","Cruise control"] },

  // ---------------- SUV ----------------
  { id:"draven-trailhead", type:"suv", make:"Draven", model:"Trailhead", year:2026, price:47500, mileage:600,
    fuel:"Petrol", trans:"Automatic", drivetrain:"AWD", hp:298, mpg:24, seats:7, color:"Deep Forest",
    tags:["New Arrival"], rating:4.9,
    features:["3-row seating","Panoramic sunroof","Adaptive AWD","Tow package (5000 lb)","360° camera","Hands-free liftgate"] },
  { id:"draven-summit", type:"suv", make:"Draven", model:"Summit", year:2025, price:39900, mileage:11200,
    fuel:"Diesel", trans:"Automatic", drivetrain:"AWD", hp:266, mpg:28, seats:5, color:"Slate Blue",
    tags:["Certified"], rating:4.7,
    features:["Off-road drive modes","Terrain camera","Roof rails","Heated steering wheel","Wireless CarPlay"] },
  { id:"solace-range-x", type:"suv", make:"Solace", model:"Range X (Electric)", year:2026, price:52900, mileage:2100,
    fuel:"Electric", trans:"Automatic", drivetrain:"AWD", hp:402, mpg:0, range:312, seats:5, color:"Arctic White",
    tags:["Electric","New Arrival"], rating:4.9,
    features:["312 mi range","Dual motor AWD","15\" center display","Over-the-air updates","Level 2 home charger included","Vehicle-to-load power"] },
  { id:"draven-trailhead-sport", type:"suv", make:"Draven", model:"Trailhead Sport", year:2024, price:35200, mileage:19800,
    fuel:"Petrol", trans:"Automatic", drivetrain:"AWD", hp:275, mpg:25, seats:5, color:"Crimson Red",
    tags:["Great Value"], rating:4.5,
    features:["Sport suspension","20\" wheels","Tow package (4500 lb)","Heated seats","Adaptive cruise control"] },

  // ---------------- TRUCK ----------------
  { id:"ferron-workline-1500", type:"truck", make:"Ferron", model:"Workline 1500", year:2026, price:44900, mileage:800,
    fuel:"Petrol", trans:"Automatic", drivetrain:"4WD", hp:355, mpg:19, seats:5, color:"Steel Grey",
    tags:["New Arrival"], rating:4.8,
    features:["9400 lb towing","Bed liner included","Trailer brake controller","4WD low range","Skid plates","Tailgate step"] },
  { id:"ferron-workline-2500hd", type:"truck", make:"Ferron", model:"Workline 2500 HD", year:2025, price:58200, mileage:9400,
    fuel:"Diesel", trans:"Automatic", drivetrain:"4WD", hp:445, mpg:16, seats:6, color:"Onyx Black",
    tags:["Certified"], rating:4.9,
    features:["Diesel torque tune","Heavy-duty suspension","Integrated brake controller","Bed-view camera","Crew cab, 6 seats"] },
  { id:"ferron-ridgeback", type:"truck", make:"Ferron", model:"Ridgeback", year:2023, price:31900, mileage:28600,
    fuel:"Petrol", trans:"Automatic", drivetrain:"RWD", hp:285, mpg:21, seats:5, color:"Sandstone",
    tags:["Great Value"], rating:4.4,
    features:["5-passenger crew cab","Spray-in bedliner","Backup camera","Cruise control","Alloy wheels"] },

  // ---------------- SPORTS ----------------
  { id:"corsira-gt3", type:"sports", make:"Corsira", model:"GT3", year:2026, price:118500, mileage:400,
    fuel:"Petrol", trans:"Dual-Clutch", drivetrain:"RWD", hp:512, mpg:19, seats:2, color:"Racing Red",
    tags:["New Arrival","Featured"], rating:5.0,
    features:["0-60 in 3.1s","Carbon-ceramic brakes","Track drive mode","Launch control","Carbon fiber accents","Sport bucket seats"] },
  { id:"corsira-spyder", type:"sports", make:"Corsira", model:"Spyder", year:2025, price:96900, mileage:3100,
    fuel:"Petrol", trans:"Dual-Clutch", drivetrain:"AWD", hp:468, mpg:21, seats:2, color:"Midnight Blue",
    tags:["Featured"], rating:4.9,
    features:["Retractable hardtop","Adaptive dampers","Launch control","Premium leather interior","Sport exhaust"] },
  { id:"kestrel-rsx", type:"sports", make:"Kestrel", model:"RSX Coupe", year:2024, price:52400, mileage:12300,
    fuel:"Petrol", trans:"Manual", drivetrain:"RWD", hp:349, mpg:23, seats:4, color:"Storm Grey",
    tags:["Certified"], rating:4.7,
    features:["6-speed manual","Limited-slip differential","Sport suspension","Brembo brakes","Alcantara seats"] },

  // ---------------- ELECTRIC ----------------
  { id:"solace-current-1", type:"electric", make:"Solace", model:"Current One", year:2026, price:38900, mileage:1000,
    fuel:"Electric", trans:"Automatic", drivetrain:"RWD", hp:238, mpg:0, range:271, seats:5, color:"Glacier White",
    tags:["New Arrival","Electric"], rating:4.8,
    features:["271 mi range","10-80% charge in 24 min","Center touchscreen","Over-the-air updates","Driver assist suite"] },
  { id:"solace-current-1-plus", type:"electric", make:"Solace", model:"Current One Plus", year:2026, price:45300, mileage:300,
    fuel:"Electric", trans:"Automatic", drivetrain:"AWD", hp:340, mpg:0, range:298, seats:5, color:"Deep Space",
    tags:["Electric"], rating:4.9,
    features:["298 mi range","Dual motor AWD","Heat pump climate system","Premium sound system","Hands-free driver assist"] },
  { id:"solace-range-x-2", type:"electric", make:"Solace", model:"Range X (Electric)", year:2025, price:48700, mileage:9800,
    fuel:"Electric", trans:"Automatic", drivetrain:"AWD", hp:402, mpg:0, range:298, seats:5, color:"Sage Green",
    tags:["Certified","Electric"], rating:4.7,
    features:["298 mi range","Dual motor AWD","Level 2 home charger included","15\" center display","360° camera"] },

  // ---------------- LUXURY ----------------
  { id:"aurelia-imperial", type:"luxury", make:"Aurelia", model:"Imperial", year:2026, price:82900, mileage:900,
    fuel:"Petrol", trans:"Automatic", drivetrain:"AWD", hp:389, mpg:22, seats:5, color:"Champagne Gold",
    tags:["New Arrival","Featured"], rating:4.9,
    features:["Massaging rear seats","Executive rear console","Night vision assist","24-speaker audio","Air suspension","Rear sunshades"] },
  { id:"aurelia-imperial-lwb", type:"luxury", make:"Aurelia", model:"Imperial LWB", year:2025, price:97500, mileage:6200,
    fuel:"Petrol", trans:"Automatic", drivetrain:"AWD", hp:389, mpg:21, seats:5, color:"Obsidian Black",
    tags:["Featured"], rating:5.0,
    features:["Extended wheelbase","Executive rear seating","Panoramic sunroof","Chauffeur drive mode","24-speaker audio"] },
  { id:"aurelia-crestline", type:"luxury", make:"Aurelia", model:"Crestline Coupe", year:2024, price:69900, mileage:14200,
    fuel:"Petrol", trans:"Automatic", drivetrain:"RWD", hp:335, mpg:24, seats:4, color:"Pearl White",
    tags:["Certified"], rating:4.8,
    features:["Nappa leather interior","Adaptive air suspension","Heads-up display","24-speaker audio","Ventilated seats"] },
];

/* helpers shared by inventory + home + detail pages */
function formatPrice(n){ return "$" + n.toLocaleString("en-US"); }
function formatMiles(n){ return n.toLocaleString("en-US") + " mi"; }
function findVehicle(id){ return INVENTORY.find(v => v.id === id); }
function typeLabel(t){
  return { sedan:"Sedan", suv:"SUV", truck:"Truck", sports:"Sports", electric:"Electric", luxury:"Luxury" }[t] || t;
}

/* ---------------------------------------------------------
   Real photography — a distinct Unsplash photo for every
   vehicle in the inventory (not just one per category).
   All under the Unsplash License (free to use, no attribution
   required). PHOTO_BASE_TYPE below covers homepage category
   tiles, which represent a body type rather than one vehicle.
--------------------------------------------------------- */
const PHOTO_BASE = {
  // sedan
  "kestrel-lm-sedan":      "https://images.unsplash.com/photo-1573710459621-bb101783ca0f",
  "kestrel-lm-gt":         "https://images.unsplash.com/photo-1764605206511-7a649d9df63b",
  "aurelia-cs4":           "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb",
  "kestrel-lm-base":       "https://images.unsplash.com/photo-1683728960304-4e0c299359bf",
  // suv
  "draven-trailhead":       "https://images.unsplash.com/photo-1569670380585-19bb0feec807",
  "draven-summit":          "https://images.unsplash.com/photo-1697689828678-dbb39d22b13f",
  "solace-range-x":         "https://images.unsplash.com/photo-1609772168547-d216c44c3f85",
  "draven-trailhead-sport": "https://images.unsplash.com/photo-1614522376247-5f3972b2a555",
  // truck
  "ferron-workline-1500":    "https://images.unsplash.com/photo-1721148774264-357cf2c6739a",
  "ferron-workline-2500hd":  "https://images.unsplash.com/photo-1637687200791-b3295dd30343",
  "ferron-ridgeback":        "https://images.unsplash.com/photo-1654475677168-38126f48c39d",
  // sports
  "corsira-gt3":     "https://images.unsplash.com/photo-1742739609116-7795f7bba442",
  "corsira-spyder":  "https://images.unsplash.com/photo-1767907571229-01cf4ba03590",
  "kestrel-rsx":     "https://images.unsplash.com/photo-1709559593427-4b7ac31080d2",
  // electric
  "solace-current-1":       "https://images.unsplash.com/photo-1673337188103-c196140adebd",
  "solace-current-1-plus":  "https://images.unsplash.com/photo-1711921127505-f4a8727329a5",
  "solace-range-x-2":       "https://images.unsplash.com/photo-1726471845977-9ebf30dc6822",
  // luxury
  "aurelia-imperial":     "https://images.unsplash.com/photo-1752805936161-5f0e10137780",
  "aurelia-imperial-lwb": "https://images.unsplash.com/photo-1613033686399-aa7c18d6d760",
  "aurelia-crestline":    "https://images.unsplash.com/photo-1758391439365-ee4abc04027a",
};

/* one representative photo per body type — used only for the
   homepage category tiles, which aren't tied to a single vehicle */
const PHOTO_BASE_TYPE = {
  sedan:    "https://images.unsplash.com/photo-1573710459621-bb101783ca0f",
  suv:      "https://images.unsplash.com/photo-1569670380585-19bb0feec807",
  truck:    "https://images.unsplash.com/photo-1721148774264-357cf2c6739a",
  sports:   "https://images.unsplash.com/photo-1742739609116-7795f7bba442",
  electric: "https://images.unsplash.com/photo-1673337188103-c196140adebd",
  luxury:   "https://images.unsplash.com/photo-1752805936161-5f0e10137780",
};

/**
 * Real photo URL for a specific vehicle id (preferred), or, when only
 * a body type is passed (homepage category tiles), a representative
 * photo for that type.
 */
function photoUrl(idOrType, opts){
  const w = (opts && opts.w) || 900;
  const q = (opts && opts.q) || 80;
  const base = PHOTO_BASE[idOrType] || PHOTO_BASE_TYPE[idOrType];
  return `${base}?q=${q}&w=${w}&auto=format&fit=crop&ixlib=rb-4.1.0`;
}
function photoBaseFor(idOrType){
  return PHOTO_BASE[idOrType] || PHOTO_BASE_TYPE[idOrType];
}
