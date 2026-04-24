const fs = require("fs");
const path = require("path");

const root = __dirname;
const articlesDir = path.join(root, "articles");
const site = "https://joynguyenwrites.com";
const reviewed = "April 24, 2026";
const isoDate = "2026-04-24";

const images = {
  coast: {
    url: "https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?auto=format&fit=crop&w=1600&q=82",
    card: "https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?auto=format&fit=crop&w=900&q=80",
    alt: "Coastal desert landscape in Peru"
  },
  andes: {
    url: "https://images.unsplash.com/photo-1518181835702-6eef8b4b2113?auto=format&fit=crop&w=1600&q=82",
    card: "https://images.unsplash.com/photo-1518181835702-6eef8b4b2113?auto=format&fit=crop&w=900&q=80",
    alt: "Andean road and valley in Peru"
  },
  cusco: {
    url: "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1600&q=82",
    card: "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=900&q=80",
    alt: "Machu Picchu terraces in Peru"
  },
  city: {
    url: "https://images.unsplash.com/photo-1531968455001-5c5272a41129?auto=format&fit=crop&w=1600&q=82",
    card: "https://images.unsplash.com/photo-1531968455001-5c5272a41129?auto=format&fit=crop&w=900&q=80",
    alt: "Historic street in Peru"
  },
  culture: {
    url: "https://images.unsplash.com/photo-1533709752211-118fcaf03312?auto=format&fit=crop&w=1600&q=82",
    card: "https://images.unsplash.com/photo-1533709752211-118fcaf03312?auto=format&fit=crop&w=900&q=80",
    alt: "Colorful Peruvian textiles"
  }
};

const articles = [
  {
    slug: "peru-tourist-bus-authorization-check",
    title: "How to check if a Peru tourist bus is authorized",
    eyebrow: "Tourist bus authorization",
    region: "andes",
    sourceTitle: "SUTRAN: Viaje Seguro - identify whether a tourist transport bus is authorized",
    sourceUrl: "https://www.gob.pe/institucion/sutran/noticias/1315512-viaje-seguro-identifica-si-un-bus-de-transporte-turistico-esta-autorizado",
    research: "SUTRAN advises travelers to verify that tourist buses have official MTC authorization and visible company identification before boarding.",
    quick: "Before any Peru bus tour, check the operator name, RUC, authorization, SOAT, technical inspection, and visible vehicle information.",
    lesson: "For travelers, authorization is not a bureaucratic detail. It is the first filter between a formal tour vehicle and a vehicle that may not meet safety, insurance, or inspection standards.",
    actions: ["Ask for the company name and RUC before paying.", "Confirm that the bus or van displays company identification.", "Avoid boarding vehicles that change at the last minute without explanation.", "Use formal pickup points or hotel pickups from known operators."],
    keywords: ["Peru tourist bus", "SUTRAN", "authorized transport"]
  },
  {
    slug: "peru-informal-transport-risk",
    title: "Why informal transport is the wrong place to save money in Peru",
    eyebrow: "Informal transport risk",
    region: "andes",
    sourceTitle: "SUTRAN warns about the risks of traveling in informal vehicles",
    sourceUrl: "https://www.gob.pe/institucion/sutran/noticias/1322412-sutran-alerta-sobre-los-riesgos-de-viajar-en-vehiculos-informales",
    research: "SUTRAN warns that informal vehicles may lack MTC authorization, current technical inspections, and SOAT coverage.",
    quick: "Do not choose a cheap informal car, van, or bus for intercity travel or tours in Peru.",
    lesson: "The cheaper ticket can hide the most expensive risk: no proper authorization, unclear insurance, weak vehicle checks, and no reliable accountability if something goes wrong.",
    actions: ["Book with identifiable companies instead of street offers.", "Avoid unmarked vans outside terminals and tourist zones.", "Ask whether passenger insurance applies to the actual service.", "Treat very low prices as a reason to ask more questions."],
    keywords: ["Peru transport safety", "informal buses", "SOAT"]
  },
  {
    slug: "peru-bus-passengers-should-not-stand",
    title: "Why standing passengers are a red flag on Peru buses",
    eyebrow: "Passenger safety rule",
    region: "andes",
    sourceTitle: "SUTRAN reminds that passengers may not travel in bus aisles or cabins",
    sourceUrl: "https://www.gob.pe/institucion/sutran/noticias/878962-viajes-interprovinciales-sutran-recuerda-que-el-traslado-de-pasajeros-en-pasillos-y-cabina-de-buses-esta-prohibido",
    research: "SUTRAN reminds operators and passengers that interprovincial buses must not carry passengers standing in aisles or cabins.",
    quick: "If a Peru bus or tour van is willing to overcrowd, choose another service.",
    lesson: "Overcrowding tells travelers how the operator thinks about safety. A formal seat, seatbelt, and passenger count are basic signs that a company is treating the journey as transport, not improvisation.",
    actions: ["Do not accept aisle seats or cabin seats.", "Check that your seat has a working belt.", "Report overcrowding to the operator before departure.", "Prefer operators that assign seats clearly."],
    keywords: ["Peru bus safety", "passenger rights", "seatbelts"]
  },
  {
    slug: "peru-viaje-seguro-app-bus-travel",
    title: "How SUTRAN's Viaje Seguro app helps Peru bus travelers",
    eyebrow: "Safety app",
    region: "city",
    sourceTitle: "SUTRAN presents the Viaje Seguro app for interprovincial land travel",
    sourceUrl: "https://www.gob.pe/institucion/sutran/noticias/306314-sutran-presenta-aplicativo-viaje-seguro-para-que-pasajeros-alerten-accidentes-y-asaltos-en-viajes-terrestres-interprovinciales",
    research: "SUTRAN's Viaje Seguro app lets passengers monitor trips, verify bus and driver information, and report incidents during interprovincial travel.",
    quick: "Use official tools to verify buses and share routes when taking long-distance transport in Peru.",
    lesson: "Long bus trips feel easier when someone outside the bus knows your route and when passengers can check basic vehicle information. Digital tools do not replace careful operator choice, but they add a useful layer.",
    actions: ["Save your operator, plate, and route before departure.", "Share your trip details with a trusted contact.", "Keep phone battery available for arrival.", "Use official complaint channels if safety rules are ignored."],
    keywords: ["Viaje Seguro", "Peru bus app", "interprovincial travel"]
  },
  {
    slug: "peru-bus-travel-scale-2024",
    title: "Peru's buses move the country, so plan them seriously",
    eyebrow: "Passenger volume",
    region: "andes",
    sourceTitle: "SUTRAN: land transport moved more than 87 million passengers in Peru in 2024",
    sourceUrl: "https://www.gob.pe/institucion/sutran/noticias/1066891-sutran-transporte-terrestre-movilizo-mas-de-87-millones-de-pasajeros-a-nivel-nacional-en-2024",
    research: "SUTRAN reported more than 87 million passengers moved by national land transport services in 2024, with the south leading in passenger volume.",
    quick: "Buses are not a side detail in Peru travel; they are the backbone of many routes.",
    lesson: "Because buses move so many people, travelers should treat bus planning with the same seriousness as flights: route choice, operator quality, transfer buffers, and arrival time all matter.",
    actions: ["Book important long-distance legs before peak holidays.", "Avoid assuming every route has one central terminal.", "Plan rest after long overnight or mountain routes.", "Use the bus as a route-design tool, not only a cheap transfer."],
    keywords: ["Peru bus travel", "SUTRAN data", "interprovincial buses"]
  },
  {
    slug: "peru-bus-technical-safety-requirements",
    title: "What bus safety requirements mean for Peru travelers",
    eyebrow: "Technical safety",
    region: "andes",
    sourceTitle: "MTC: technical and safety requirements for interprovincial buses",
    sourceUrl: "https://www.gob.pe/institucion/mtc/noticias/29333-mtc-conoce-los-nuevos-requisitos-tecnicos-y-de-seguridad-exigidos-para-los-omnibus-interprovinciales",
    research: "MTC explains technical and safety requirements for interprovincial buses, including vehicle condition checks for passenger transport.",
    quick: "Choose operators that talk openly about vehicle condition, inspections, seatbelts, and driver standards.",
    lesson: "Travelers cannot inspect a bus like a mechanic, but they can notice signals: working seatbelts, professional boarding, visible company identity, and a service culture that does not treat safety questions as annoying.",
    actions: ["Ask if the vehicle has current technical inspection.", "Check seatbelts before departure.", "Avoid operators with chaotic boarding or unclear vehicles.", "Favor companies with visible maintenance and safety policies."],
    keywords: ["MTC Peru", "bus safety requirements", "interprovincial bus"]
  },
  {
    slug: "peru-bus-terminal-safety-first-timers",
    title: "How first-timers should handle Peru bus terminals",
    eyebrow: "Terminal safety",
    region: "city",
    sourceTitle: "Peru Bus Terminals: Safety, scams, navigation tips and alternatives",
    sourceUrl: "https://bushop.com/peru/guides/peru-bus-terminals-safety-scams-navigation-tips-smarter-alternatives/",
    research: "Traveler-focused terminal research notes that Peru's bus companies often use separate terminals, adding taxi time, early check-in, and luggage friction.",
    quick: "Budget time, attention, and taxi planning for terminals, especially in Lima and at night.",
    lesson: "The hardest part of a bus day may not be the ride itself. For first-timers, terminals create language, luggage, taxi, and timing stress that should be planned before the ticket is bought.",
    actions: ["Arrive early but keep luggage close.", "Use registered taxis or ride-hailing to and from terminals.", "Avoid late-night arrivals if you are unfamiliar with the city.", "Consider hotel pickup services for complex routes."],
    keywords: ["Peru bus terminals", "travel scams", "bus planning"]
  },
  {
    slug: "peru-terminal-vs-hotel-pickup",
    title: "Terminal buses versus hotel pickups in Peru",
    eyebrow: "Pickup model",
    region: "city",
    sourceTitle: "Peru Bus Safety and Stress: terminals vs hotel pickups",
    sourceUrl: "https://bushop.com/peru/guides/peru-bus-safety-and-stress-terminals-vs-hotel-pickups/",
    research: "Route research comparing terminal-to-terminal buses with hotel pickup models highlights terminal transfers, taxis, and language friction as major stress points.",
    quick: "Hotel pickups can be worth paying for when the alternative is two terminals, two taxis, and a tight schedule.",
    lesson: "The cheapest bus fare is not always the cheapest travel day. Once taxis, missed connections, stress, and lost sightseeing time are counted, door-to-door transport can become practical rather than luxurious.",
    actions: ["Compare the whole door-to-door cost.", "Add taxi time on both ends before choosing public buses.", "Use hotel pickup for early departures or unfamiliar cities.", "Choose terminal buses when you speak Spanish and the route is simple."],
    keywords: ["hotel pickup Peru", "bus terminal", "tourist bus"]
  },
  {
    slug: "peru-bus-accident-causes-research",
    title: "What accident research teaches about Peru bus choices",
    eyebrow: "Road safety research",
    region: "andes",
    sourceTitle: "Study of the causes of accidents on a Peruvian highway",
    sourceUrl: "https://cris.pucp.edu.pe/en/publications/estudio-de-las-causas-de-accidentes-en-una-carretera-peruana",
    research: "A peer-reviewed conference study analyzed Peruvian highway accidents involving interprovincial passenger buses using SUTRAN and police data.",
    quick: "Treat night routes, mountain roads, operator history, and driver behavior as serious planning variables.",
    lesson: "Accident research reminds travelers that risk is not evenly distributed. Geography, speed, fatigue, company practices, and enforcement all shape the safety of a bus trip.",
    actions: ["Prefer daylight for difficult Andean routes.", "Choose reputable operators over the lowest fare.", "Use seatbelts whenever available.", "Build buffers so you do not reward rushed driving."],
    keywords: ["Peru road safety", "bus accidents", "SUTRAN data"]
  },
  {
    slug: "peru-public-bus-safety-research",
    title: "Are public buses in Peru safe enough for travelers?",
    eyebrow: "Public bus safety",
    region: "andes",
    sourceTitle: "Are public buses in Peru safe in 2026?",
    sourceUrl: "https://howtoperu.com/answers/are-public-buses-in-peru-safe/",
    research: "A 2026 traveler safety review combines official road-risk context with recent traveler reports on routes, operators, night rides, terminals, and service quality.",
    quick: "Public buses can work well in Peru, but safety depends on route, operator, timing, and how comfortable you are managing terminals.",
    lesson: "The useful question is not whether all public buses are safe or unsafe. The better question is whether a specific route, company, departure time, and arrival setup match your risk tolerance.",
    actions: ["Pick daytime departures where practical.", "Read recent route-specific reviews.", "Avoid bargain operators with vague terminals.", "Have an arrival taxi plan before the bus leaves."],
    keywords: ["Peru public buses", "bus safety", "route planning"]
  },
  {
    slug: "peru-speeding-seatbelts-breakdowns",
    title: "Speeding, seatbelts, and breakdowns: the Peru bus checklist",
    eyebrow: "Bus safety checklist",
    region: "andes",
    sourceTitle: "Peru Bus Safety Reality Check: speeding, seatbelts and breakdowns",
    sourceUrl: "https://www.theonlyperuguide.com/research/peru-bus-safety-reality-check-speeding-seatbelts-and-breakdowns-what-i-discovered-2025/",
    research: "A safety-focused route review identifies speeding, seatbelt compliance, breakdowns, overnight routes, and Andean weather as practical concerns for travelers.",
    quick: "A safer Peru bus day starts with a reputable company, seatbelt use, daylight timing, and realistic buffers.",
    lesson: "Travelers often evaluate buses by price and seat comfort, but the real checklist should include driver behavior, monitoring, maintenance, rest stops, communication, and what happens during delays.",
    actions: ["Choose companies with clear safety standards.", "Buckle up even if other passengers do not.", "Avoid the tightest onward tour connection after a long ride.", "Carry water, layers, and backup battery."],
    keywords: ["Peru bus checklist", "seatbelts", "breakdowns"]
  },
  {
    slug: "peru-safest-routes-cities-bus-companies",
    title: "Peru safety is route-specific, not country-wide",
    eyebrow: "Safety by route",
    region: "city",
    sourceTitle: "Peru in 2026 for safety-focused travelers",
    sourceUrl: "https://www.theonlyperuguide.com/research/peru-safety-safest-cities-routes-and-bus-companies/",
    research: "A safety-focused Peru guide explains that risk varies by city, neighborhood, route, time of day, and transport type.",
    quick: "Plan Peru by safe corridors and practical transfer points, not by vague country-level fear.",
    lesson: "The same traveler can have a smooth trip in one corridor and a stressful day in another. Buses and tours should be chosen according to the specific places, terminals, roads, and hours involved.",
    actions: ["Use established tourist districts for arrivals.", "Avoid unfamiliar late-night transfers.", "Pick formal tourist transport for complex routes.", "Check protests, weather, and road conditions before moving."],
    keywords: ["Peru safety", "bus companies", "safe routes"]
  },
  {
    slug: "peru-travel-scams-tours-taxis-buses",
    title: "Where Peru travel scams meet buses and tours",
    eyebrow: "Scam prevention",
    region: "city",
    sourceTitle: "Peru travel scams to avoid: tours, tickets, taxis and too-good-to-be-true deals",
    sourceUrl: "https://bushop.com/peru/guides/peru-travel-scams-to-avoid-tours-tickets-taxis-and-too-good-to-be-true-deals/",
    research: "A traveler safety review identifies taxis, ultra-cheap tours, ticket confusion, and bus terminals as common friction points.",
    quick: "Most Peru transport scams are avoidable when you avoid vague sellers, fake urgency, and unclear pickup details.",
    lesson: "Scams often happen in the gap between a real need and weak information: a tired arrival, a chaotic terminal, a sold-out tour, or a confusing ticket system.",
    actions: ["Buy tours from traceable businesses.", "Confirm pickup time and exact inclusions.", "Agree taxi prices before riding when meters are not used.", "Do not hand luggage to unsolicited helpers."],
    keywords: ["Peru travel scams", "tour booking", "bus terminals"]
  },
  {
    slug: "peru-first-timer-bus-tour-risk",
    title: "The normal risks first-time Peru travelers should plan around",
    eyebrow: "First-time safety",
    region: "city",
    sourceTitle: "Peru travel safety for first-timers",
    sourceUrl: "https://bushop.com/peru/guides/peru-travel-safety-for-first-timers-the-normal-risks-vs-the-rare-stuff/",
    research: "A first-timer safety guide frames common travel risks around terminals, taxis, traffic, language gaps, tight schedules, crime, and civil unrest.",
    quick: "For first-timers, the safest Peru itinerary reduces avoidable friction around terminals, taxis, and rushed tour connections.",
    lesson: "Most problems are not dramatic. They are small stress points that pile up: arriving tired, negotiating a taxi, missing a pickup, or misunderstanding a tour inclusion.",
    actions: ["Keep arrival days simple.", "Avoid stacking bus arrivals and major tours on the same morning.", "Use formal transport in unfamiliar cities.", "Keep documents and valuables separated."],
    keywords: ["Peru first-time travel", "bus safety", "tour planning"]
  },
  {
    slug: "lima-callao-tourist-corridor-bus-transfer",
    title: "Why the Lima-Callao tourist corridor matters after landing",
    eyebrow: "Lima arrival corridor",
    region: "city",
    sourceTitle: "MINCETUR tourist routes and corridors",
    sourceUrl: "https://www.gob.pe/institucion/mincetur/informes-publicaciones/120-rutas-turisticas",
    research: "MINCETUR publishes recommended tourist corridors and notes that they include surveillance and patrols for safer travel.",
    quick: "Plan the airport-to-hotel transfer as part of the itinerary, not an afterthought.",
    lesson: "Many Peru trips begin with a tired arrival in Lima. A safer first day uses known districts, formal transfer options, and enough time before the next bus or tour.",
    actions: ["Book the first night in a practical Lima district.", "Avoid scheduling a long bus immediately after an international arrival.", "Use formal airport transfer options.", "Keep the first evening simple."],
    keywords: ["Lima airport transfer", "tourist corridor", "Peru arrival"]
  },
  {
    slug: "cusco-machu-picchu-corridor-bus-tour-planning",
    title: "The Cusco-Machu Picchu corridor is a chain, not one ticket",
    eyebrow: "Cusco corridor",
    region: "cusco",
    sourceTitle: "MINCETUR tourist routes and corridors",
    sourceUrl: "https://www.gob.pe/institucion/mincetur/informes-publicaciones/120-rutas-turisticas",
    research: "MINCETUR lists Cusco-Machupicchu among Peru's recommended tourist corridors.",
    quick: "Build Machu Picchu around linked legs: Cusco transfer, train or road approach, Aguas Calientes bus, timed entry, and return.",
    lesson: "Machu Picchu stress usually comes from treating the visit as a single ticket. In practice, it is a chain of timed transport and access decisions.",
    actions: ["Buy entry tickets before locking transport.", "Match train times to circuit entry times.", "Add overnight buffer if your budget allows.", "Avoid tight same-day returns during disruption-prone periods."],
    keywords: ["Cusco Machu Picchu", "tourist corridor", "bus transfer"]
  },
  {
    slug: "paracas-ica-nazca-corridor-bus-tours",
    title: "The Paracas-Ica-Nazca corridor is made for staged bus travel",
    eyebrow: "South coast corridor",
    region: "coast",
    sourceTitle: "MINCETUR tourist routes and corridors",
    sourceUrl: "https://www.gob.pe/institucion/mincetur/informes-publicaciones/120-rutas-turisticas",
    research: "MINCETUR includes the Paracas-Ica-Nasca corridor among recommended tourist routes.",
    quick: "Break the south coast into Paracas wildlife, Ica or Huacachina desert time, and Nazca flight planning.",
    lesson: "This corridor rewards travelers who stop in sequence instead of treating the coast as one long transfer. Each stop has its own timing logic.",
    actions: ["Schedule Ballestas boats in the morning.", "Use late afternoon for Huacachina dunes when possible.", "Keep Nazca flight plans flexible for weather.", "Avoid cramming all three into a single rushed day."],
    keywords: ["Paracas Ica Nazca", "Peru bus route", "south coast tours"]
  },
  {
    slug: "arequipa-colca-corridor-tour-bus",
    title: "Arequipa-Colca is a tour-bus route where pacing matters",
    eyebrow: "Arequipa-Colca corridor",
    region: "andes",
    sourceTitle: "MINCETUR declares major investment program viable for the Arequipa-Colca corridor",
    sourceUrl: "https://www.gob.pe/institucion/mincetur/noticias/1315251-mincetur-declara-viable-el-programa-de-inversion-multisectorial-mas-grande-para-el-corredor-turistico-arequipa-colca",
    research: "MINCETUR's Arequipa-Colca investment program focuses on visitor services, infrastructure, and natural and cultural heritage conditions in the corridor.",
    quick: "Do not treat Colca Canyon as a simple bus ride; altitude, early starts, viewpoints, and rural roads shape the experience.",
    lesson: "The route is famous for condors and canyon views, but the travel day includes altitude gain, winding roads, and very early departures. The best tour choice respects that physical reality.",
    actions: ["Avoid Colca as your first high-altitude activity if possible.", "Check whether the tour returns to Arequipa or continues to Puno.", "Pack layers for cold viewpoints.", "Choose operators with clear pickup and rest-stop details."],
    keywords: ["Arequipa Colca", "tour bus", "Peru tours"]
  },
  {
    slug: "puno-lake-titicaca-bus-tour-planning",
    title: "Puno tours work best when the bus day is not ignored",
    eyebrow: "Puno corridor",
    region: "andes",
    sourceTitle: "MINCETUR tourist routes and corridors",
    sourceUrl: "https://www.gob.pe/institucion/mincetur/informes-publicaciones/120-rutas-turisticas",
    research: "MINCETUR lists Puno-Lake Titicaca among Peru's recommended tourist routes.",
    quick: "Plan Puno with altitude, lake tour timing, and onward bus routes in mind.",
    lesson: "Puno can be a beautiful pause or an exhausting transfer point. The difference is whether travelers allow enough time for altitude, boat schedules, and the next road leg.",
    actions: ["Avoid same-day arrival and full lake tour if you are altitude-sensitive.", "Check whether your onward bus is to Cusco, Arequipa, or Bolivia.", "Pack sun and cold protection for the lake.", "Confirm pickup points for island tours."],
    keywords: ["Puno bus", "Lake Titicaca tours", "Peru corridor"]
  },
  {
    slug: "moche-trujillo-chiclayo-bus-tour-route",
    title: "Northern Peru's Moche route deserves more bus travelers",
    eyebrow: "Moche corridor",
    region: "culture",
    sourceTitle: "MINCETUR tourist routes and corridors",
    sourceUrl: "https://www.gob.pe/institucion/mincetur/informes-publicaciones/120-rutas-turisticas",
    research: "MINCETUR lists Moche-Trujillo and Moche-Chiclayo among Peru's recommended tourist corridors.",
    quick: "Use buses to connect Trujillo and Chiclayo when you want archaeology without Cusco crowds.",
    lesson: "Northern Peru is ideal for travelers who want culture and history beyond the southern circuit. The bus route makes sense when paired with planned museum and archaeological-site days.",
    actions: ["Build one full day for Trujillo sites.", "Add Chiclayo for museums and nearby archaeology.", "Use daylight transfers if possible.", "Check museum closing days before booking buses."],
    keywords: ["Moche route", "Trujillo Chiclayo bus", "Peru archaeology tours"]
  },
  {
    slug: "north-beaches-peru-bus-route",
    title: "North coast beach buses need seasonal planning",
    eyebrow: "Northern beaches",
    region: "coast",
    sourceTitle: "MINCETUR tourist routes and corridors",
    sourceUrl: "https://www.gob.pe/institucion/mincetur/informes-publicaciones/120-rutas-turisticas",
    research: "MINCETUR includes northern beach corridors for Tumbes and Piura among Peru's recommended tourist routes.",
    quick: "For Mancora, Piura, and Tumbes-style trips, plan bus comfort, season, and arrival time before chasing beach photos.",
    lesson: "Beach routes can look simple on a map, but long distances, heat, holiday crowds, and late arrivals affect the quality of the trip.",
    actions: ["Check high-season and holiday demand.", "Avoid arriving at unfamiliar beach towns very late.", "Confirm hotel transfers from bus stops.", "Book air-conditioned long-distance buses for northern routes."],
    keywords: ["Peru north coast", "beach buses", "Piura Tumbes"]
  },
  {
    slug: "iquitos-amazon-tour-route-logistics",
    title: "Iquitos tours start with logistics, not buses",
    eyebrow: "Amazon corridor",
    region: "culture",
    sourceTitle: "MINCETUR tourist routes and corridors",
    sourceUrl: "https://www.gob.pe/institucion/mincetur/informes-publicaciones/120-rutas-turisticas",
    research: "MINCETUR includes Iquitos-Rio Amazonas among recommended tourist routes, reminding travelers that some Peru tours depend on river and air logistics rather than roads.",
    quick: "Do not plan Iquitos like an overland bus stop; it needs flight, boat, lodge, and weather coordination.",
    lesson: "A bus-focused Peru itinerary still needs to know where buses stop making sense. The Amazon requires a different planning model, with verified tour operators and clear lodge transfers.",
    actions: ["Book lodge transfers before arrival.", "Check what boat transport is included.", "Pack for rain, insects, and humidity.", "Avoid vague jungle tours sold without clear location or operator details."],
    keywords: ["Iquitos tours", "Amazon logistics", "Peru travel planning"]
  },
  {
    slug: "lima-paracas-huacachina-nazca-bus-chain",
    title: "How to connect Lima, Paracas, Huacachina, and Nazca by bus",
    eyebrow: "South coast chain",
    region: "coast",
    sourceTitle: "Connecting Lima to Paracas, Huacachina, and Nazca",
    sourceUrl: "https://bushop.com/peru/guides/connecting-lima-to-paracas-huacachina-and-nazca-direct-routes-vs-stopover-based-travel/",
    research: "A corridor guide compares direct city-to-city buses with stopover-based travel through Paracas, Huacachina, and Nazca.",
    quick: "This route works best as a sequence, not as isolated tickets.",
    lesson: "Direct buses look efficient until taxis, terminals, missed activity windows, and separate tours are counted. A staged route turns transfer time into sightseeing time.",
    actions: ["Decide which stops are overnight stops.", "Use Paracas before Huacachina if you want Ballestas boats.", "Give Nazca flights weather buffer.", "Do not rely on last bus timing after dune tours."],
    keywords: ["Lima Paracas Huacachina Nazca", "bus route", "Peru tours"]
  },
  {
    slug: "paracas-huacachina-nazca-buffers",
    title: "Why buffers matter between Paracas, Huacachina, and Nazca",
    eyebrow: "Route buffers",
    region: "coast",
    sourceTitle: "How to link Paracas, Huacachina and Nazca by bus",
    sourceUrl: "https://www.theonlyperuguide.com/research/how-to-link-paracas-huacachina-nazca-by-bus-sample-route-buffers-backup-options/",
    research: "Route planning research recommends daylight hops, built-in buffers, and backup options for Paracas, Huacachina, and Nazca.",
    quick: "Keep 60 to 90 minutes of buffer around boats, buggies, flights, and onward buses.",
    lesson: "The south coast is easy to enjoy and easy to overpack. Travelers should protect the activities that depend on weather, daylight, and tour departure windows.",
    actions: ["Do not schedule dunes immediately after a late bus arrival.", "Keep Nazca flight plans flexible.", "Check whether pickup is from Ica or Huacachina.", "Book overnight stops if you dislike rushed travel days."],
    keywords: ["Paracas Huacachina Nazca", "travel buffers", "bus itinerary"]
  },
  {
    slug: "lima-to-nazca-bus-route",
    title: "Lima to Nazca by bus is better with context",
    eyebrow: "Lima-Nazca bus",
    region: "coast",
    sourceTitle: "Lima to Nazca by bus route guide",
    sourceUrl: "https://www.theonlyperuguide.com/bus/lima-to-nazca/",
    research: "A route guide describes Lima to Nazca as a coastal Pan-American Highway trip and explains why many travelers break the journey in Paracas and Huacachina.",
    quick: "Use the Lima-Nazca bus either as a direct transfer or as a staged coast itinerary with better experiences.",
    lesson: "Nazca is not only a destination; it is the end of a corridor with wildlife, dunes, vineyards, and desert viewpoints. The bus choice determines how much of that route you actually experience.",
    actions: ["Travel by day if you want scenery and easier arrivals.", "Add Huacachina if dunes matter to you.", "Stay overnight before a Nazca flight if you want less stress.", "Continue to Arequipa only after allowing recovery time."],
    keywords: ["Lima to Nazca bus", "Nazca Lines", "south coast Peru"]
  },
  {
    slug: "lima-to-machu-picchu-overland-bus-route",
    title: "Lima to Machu Picchu without flying needs staged buses",
    eyebrow: "Overland Peru route",
    region: "andes",
    sourceTitle: "Lima to Machu Picchu without flying",
    sourceUrl: "https://howtoperu.com/answers/lima-to-machu-picchu-without-flying/",
    research: "An overland route guide compares a direct Lima-Cusco bus with staged travel through Paracas, Huacachina, Nazca, Arequipa, Puno, and Cusco.",
    quick: "The no-fly route to Machu Picchu is more comfortable when broken into coast and Andes segments.",
    lesson: "A direct marathon bus may save a line on paper but cost comfort, acclimatization, and experience. The staged route gives the body and itinerary time to adjust.",
    actions: ["Break the journey before crossing high Andes.", "Use Arequipa or Puno as meaningful stops, not filler.", "Buy Machu Picchu tickets before final transport.", "Keep one buffer day before the citadel visit."],
    keywords: ["Lima to Machu Picchu", "overland Peru", "bus itinerary"]
  },
  {
    slug: "lima-to-huacachina-direct-vs-paracas-combo",
    title: "Lima to Huacachina: direct bus or Paracas combo?",
    eyebrow: "Huacachina route choice",
    region: "coast",
    sourceTitle: "Lima to Huacachina: direct bus vs Paracas combo route",
    sourceUrl: "https://www.limawalkingtour.com/guides/lima-to-huacachina-direct-bus-vs-paracas-combo-route-compared/",
    research: "A route comparison explains that direct buses usually mean Lima to Ica plus a taxi, while combo routes can add Paracas and hotel pickups.",
    quick: "Go direct if you only want dunes; add Paracas if you want a fuller south coast day.",
    lesson: "The right answer depends on travel style. Direct travel can work for simple logistics, but a combo route can reduce taxis and add a wildlife stop that fits naturally on the way.",
    actions: ["Choose direct for a simple overnight Huacachina stay.", "Choose a combo for Ballestas plus dunes.", "Check whether the bus goes to Ica or directly to Huacachina.", "Avoid same-day return if you dislike long days."],
    keywords: ["Lima to Huacachina", "Paracas combo", "Peru bus tour"]
  },
  {
    slug: "lima-to-nazca-direct-vs-huacachina-stopover",
    title: "Lima to Nazca: direct bus or Huacachina stopover?",
    eyebrow: "Nazca route choice",
    region: "coast",
    sourceTitle: "Lima to Nazca: direct bus vs stopover in Huacachina",
    sourceUrl: "https://www.limawalkingtour.com/guides/lima-to-nazca-direct-bus-vs-stopover-in-huacachina-compared/",
    research: "A route comparison explains the tradeoff between a direct Lima-Nazca bus and a stopover route through Huacachina.",
    quick: "Stop in Huacachina if you want the south coast to feel like travel, not only transit.",
    lesson: "Nazca is far enough from Lima that the bus day deserves a purpose. A stopover breaks fatigue and adds a memorable desert experience.",
    actions: ["Use direct travel only when time is tight.", "Add Huacachina if you want dunes and easier pacing.", "Fly the Nazca Lines in the morning when possible.", "Keep onward Arequipa plans flexible after the flight."],
    keywords: ["Lima Nazca bus", "Huacachina stopover", "Nazca tour"]
  },
  {
    slug: "best-stops-between-lima-and-cusco-by-bus",
    title: "Where to stop between Lima and Cusco by bus",
    eyebrow: "Hop-off planning",
    region: "andes",
    sourceTitle: "Where to hop off between Lima and Cusco",
    sourceUrl: "https://bushop.com/peru/guides/where-to-hop-off-between-lima-to-cusco-best-stops-on-the-peru-hop-route/",
    research: "A route guide recommends breaking Lima-Cusco into Paracas, Huacachina, Nazca, Arequipa, and Puno instead of treating the route as a single long ride.",
    quick: "The best Lima-Cusco bus itinerary turns the journey into a south Peru route.",
    lesson: "Stopping is not wasted time when the stops solve altitude, distance, and experience. The route becomes easier because each leg has a reason.",
    actions: ["Use Paracas for wildlife and coastal scenery.", "Use Huacachina for dunes and a short desert stop.", "Use Arequipa for altitude transition.", "Use Puno if Lake Titicaca or the Sun Route fits your trip."],
    keywords: ["Lima Cusco bus", "Peru Hop route", "south Peru itinerary"]
  },
  {
    slug: "fourteen-day-peru-bus-pass-itinerary",
    title: "A 14-day Peru bus route needs flexibility",
    eyebrow: "Flexible bus pass",
    region: "andes",
    sourceTitle: "14-day flexible Peru bus pass itinerary",
    sourceUrl: "https://bushop.com/peru/guides/14-day-flexible-peru-bus-pass-itinerary-lima-paracas-huacachina-nazca-arequipa-puno/",
    research: "A flexible pass itinerary strings Lima, Paracas, Huacachina, Nazca, Arequipa, Puno, and Cusco into a two-week overland route.",
    quick: "A two-week bus trip through southern Peru should protect rest days and optional tour days.",
    lesson: "Flexibility matters because weather, altitude, fatigue, and sold-out tours can change the ideal pace. A rigid pass can feel efficient but brittle.",
    actions: ["Do not schedule every day as a moving day.", "Add recovery after overnight or high-altitude legs.", "Book key tours early but leave some local flexibility.", "Use pass changes for weather-sensitive activities."],
    keywords: ["Peru bus pass", "14 day itinerary", "southern Peru"]
  },
  {
    slug: "promperu-tour-package-data-peru",
    title: "Why tour packages still matter in Peru travel",
    eyebrow: "Tour package behavior",
    region: "culture",
    sourceTitle: "PROMPERU presents the Profile of the Foreign Tourist",
    sourceUrl: "https://en.travel2latam.com/news-99008-promperu-presents-the-profile-of-the-foreign-tourist",
    research: "PROMPERU's foreign tourist profile found that many foreign tourists buy tour packages and plan trips months in advance.",
    quick: "Peru is a place where packaged tours can solve real complexity, especially around transport, tickets, and timing.",
    lesson: "Package tours are not only for inexperienced travelers. In Peru, they can coordinate road transfers, timed tickets, guides, altitude pacing, and backup plans.",
    actions: ["Use packages for Machu Picchu, Colca, Amazon, or multi-city routes.", "Check exactly which transport legs are included.", "Compare package value against DIY taxis, buses, tickets, and guides.", "Avoid packages that hide operator names."],
    keywords: ["PROMPERU tourist profile", "Peru tour packages", "travel planning"]
  },
  {
    slug: "machu-picchu-2026-capacity-bus-planning",
    title: "Machu Picchu's 2026 capacity rules affect bus timing",
    eyebrow: "Machu Picchu capacity",
    region: "cusco",
    sourceTitle: "Machu Picchu: Ministry of Culture sets 2026 visitor capacity",
    sourceUrl: "https://www.radionacional.gob.pe/noticias/cultural/machu-picchu-ministerio-de-cultura-fija-aforo-maximo-de-visitantes-diarios-para-2026",
    research: "Peru's Ministry of Culture set daily visitor capacity for Machu Picchu in 2026 and confirmed official ticket sales through tuboleto.cultura.pe.",
    quick: "Buy Machu Picchu entry first, then align trains, buses, and guides around that time slot.",
    lesson: "Capacity rules make improvisation risky. The shuttle bus from Aguas Calientes, entry circuit, guide timing, and return train all need to fit the same clock.",
    actions: ["Book official entry before finalizing transport.", "Arrive in Aguas Calientes with enough shuttle-bus buffer.", "Do not assume all circuits have equal availability.", "Avoid last-minute peak-season plans."],
    keywords: ["Machu Picchu 2026", "bus timing", "ticket capacity"]
  },
  {
    slug: "machu-picchu-circuits-tour-planning",
    title: "Machu Picchu circuits changed how tours should be booked",
    eyebrow: "Circuit planning",
    region: "cusco",
    sourceTitle: "How to choose the right Machu Picchu route and secure tickets",
    sourceUrl: "https://www.cntraveler.com/story/machu-picchu-tickets-how-to-choose-route",
    research: "Travel reporting on the updated Machu Picchu system explains timed entrances and multiple routes designed to manage congestion and conservation.",
    quick: "Do not book a generic Machu Picchu tour until you know which circuit and route you want.",
    lesson: "The circuit determines the experience. A guide, train, or bus transfer cannot fix a ticket that does not match the view, route, or mobility level you expected.",
    actions: ["Compare panoramic, classic, and lower-sector route options.", "Check walking difficulty before purchase.", "Match guide meeting time to entry slot.", "Keep screenshots and passport details ready."],
    keywords: ["Machu Picchu circuits", "guided tour", "route ticket"]
  },
  {
    slug: "machu-picchu-transport-disruption-buffer",
    title: "Machu Picchu transport disruptions prove buffers matter",
    eyebrow: "Transport disruption",
    region: "cusco",
    sourceTitle: "Ministry of Culture gave facilities to visitors affected by Machu Picchu train suspensions",
    sourceUrl: "https://www.tvperu.gob.pe/noticias/nacionales/ministerio-de-cultura-brindara-facilidades-a-turistas-que-hayan-adquirido-boletos-a-machu-picchu",
    research: "Peruvian public media reported Ministry of Culture measures for visitors affected when Machu Picchu train access was temporarily suspended for safety reasons.",
    quick: "Build at least one buffer around Machu Picchu if your trip budget and time allow it.",
    lesson: "The route to Machu Picchu depends on coordinated train, bus, and site access. When one leg stops, a same-day plan can collapse quickly.",
    actions: ["Avoid flying out of Cusco the same day you return from Machu Picchu.", "Keep hotel and transport contacts offline.", "Know official rebooking or refund channels.", "Monitor local disruptions before departure."],
    keywords: ["Machu Picchu disruption", "train bus transfer", "travel buffer"]
  },
  {
    slug: "machu-picchu-bus-licensing-dispute-lesson",
    title: "What Machu Picchu bus disputes teach travelers",
    eyebrow: "Access management",
    region: "cusco",
    sourceTitle: "Machu Picchu tourism travel disruption from bus licensing dispute",
    sourceUrl: "https://www.travelandtourworld.com/news/article/machu-picchu-tourism-faces-major-travel-disruption-as-bus-licensing-dispute-strands-hundreds-of-visitors-and-exposes-local-economic-challenges-in-peru-new-update-you-need-to-know/",
    research: "Travel industry reporting described disruption around the bus service between Aguas Calientes and Machu Picchu, showing how local transport management can affect visitors.",
    quick: "Even a short shuttle bus can become the critical point in a Machu Picchu itinerary.",
    lesson: "Travelers often focus on the train and entry ticket, but the final bus from Aguas Calientes is a key access link. Local disputes, crowds, or operational changes can affect the whole day.",
    actions: ["Arrive early for shuttle lines.", "Track local access updates near your visit date.", "Keep enough time between site exit and return train.", "Consider overnighting in Aguas Calientes before entry."],
    keywords: ["Machu Picchu bus", "Aguas Calientes shuttle", "tour disruption"]
  },
  {
    slug: "machu-picchu-digital-ticketing-trust",
    title: "Digital tickets can make Peru tours more trustworthy",
    eyebrow: "Digital tickets",
    region: "cusco",
    sourceTitle: "CANATUR backs digital ticketing for Machu Picchu",
    sourceUrl: "https://www.tvperu.gob.pe/noticias/cultural/machu-picchu-camara-nacional-de-turismo-del-peru-respalda-entradas-digitales",
    research: "CANATUR publicly supported Ministry of Culture digital ticketing measures for major monuments and attractions.",
    quick: "Use official digital ticketing where available and be cautious with resellers who cannot show clear confirmation.",
    lesson: "Digital tickets improve transparency when travelers know where official sales happen. They also make it easier to match tours with real availability.",
    actions: ["Buy high-demand tickets from official channels or traceable agencies.", "Confirm passport-name matching.", "Avoid paying for a tour that promises impossible availability.", "Save offline copies of confirmations."],
    keywords: ["Machu Picchu digital tickets", "tour trust", "Peru ticketing"]
  },
  {
    slug: "safest-peru-bus-company-data",
    title: "How to read Peru bus safety claims",
    eyebrow: "Safety claims",
    region: "andes",
    sourceTitle: "Safest bus company in Peru: data-backed safety ratings and real reviews",
    sourceUrl: "https://bushop.com/peru/guides/safest-bus-company-in-peru-data-backed-safety-ratings-real-reviews-and-peru-hop-standards/",
    research: "A safety-rating guide explains how official accident, injury, fatality, and sanction records can be used to compare bus companies.",
    quick: "Treat safety claims as useful only when they explain the data behind them.",
    lesson: "A company saying it is safe is not enough. Travelers should look for what is measured: crashes, sanctions, GPS monitoring, driver rotation, maintenance, route choice, and customer support.",
    actions: ["Look for specific safety practices, not vague slogans.", "Read recent negative reviews as carefully as positive ones.", "Ask about GPS monitoring and driver changes on long routes.", "Avoid operators that cannot identify their legal company."],
    keywords: ["Peru bus safety ratings", "bus company data", "transport safety"]
  },
  {
    slug: "sutran-penal-complaints-transport-danger",
    title: "Why enforcement news should affect your Peru bus choice",
    eyebrow: "Transport enforcement",
    region: "city",
    sourceTitle: "SUTRAN made more than 500 criminal complaints against dangerous public transport providers",
    sourceUrl: "https://www.gob.pe/institucion/sutran/noticias/1028365-sutran-realizo-mas-de-500-denuncias-penales-contra-transportistas-y-conductores-por-peligro-en-el-servicio-publico",
    research: "SUTRAN reported hundreds of criminal complaints related to unsafe public passenger transport, including lack of authorization, SOAT, or technical inspection.",
    quick: "If enforcement agencies are warning about illegal operators, travelers should not treat informality as harmless.",
    lesson: "Regulatory action reveals a real market problem. The traveler response is simple: choose formal companies and avoid improvised vehicles, even when they are convenient.",
    actions: ["Reject rides that cannot identify the company.", "Check pickup instructions for signs of formality.", "Do not confuse popularity with authorization.", "Use formal complaint channels if rules are ignored."],
    keywords: ["SUTRAN enforcement", "illegal transport", "Peru buses"]
  },
  {
    slug: "sutran-pnp-interprovincial-security",
    title: "Security operations explain why formal buses matter",
    eyebrow: "Interprovincial security",
    region: "city",
    sourceTitle: "SUTRAN, PNP and SUCAMEC coordinate security in interprovincial passenger transport",
    sourceUrl: "https://www.gob.pe/institucion/sutran/noticias/1313829-sutran-pnp-y-sucamec-articulan-esfuerzos-por-la-seguridad-en-el-transporte-interprovincial-de-pasajeros",
    research: "SUTRAN, police, and SUCAMEC coordinated operations to prevent dangerous cargo and improve safety in interprovincial passenger transport.",
    quick: "Formal interprovincial buses are easier for authorities to inspect and monitor.",
    lesson: "Security in transport is not only about the driver. It also involves what is carried, where vehicles are checked, and whether the company is inside the regulatory system.",
    actions: ["Avoid buses or vans loading unmarked cargo chaotically.", "Keep your luggage tagged and documented.", "Use formal terminals or hotel pickups.", "Be patient with inspections that protect passengers."],
    keywords: ["interprovincial bus Peru", "SUTRAN PNP", "transport security"]
  },
  {
    slug: "sutran-national-passenger-transport-rules",
    title: "What national passenger transport rules mean for tour vans",
    eyebrow: "Passenger transport rules",
    region: "andes",
    sourceTitle: "SUTRAN: passenger transport vehicles must be authorized and meet safety measures",
    sourceUrl: "https://www.gob.pe/institucion/sutran/noticias/692791-sutran-vehiculos-destinados-al-transporte-de-personas-deben-estar-autorizados-y-cumplir-medidas-de-seguridad",
    research: "SUTRAN reminds that passenger transport vehicles operating nationally must have MTC authorization and comply with vehicle and transport administration regulations.",
    quick: "Tour vans on national routes should be treated like passenger transport, not casual private rides.",
    lesson: "Many tours use vans rather than large buses. The vehicle size changes, but the safety logic does not: authorization, insurance, inspection, and professional operation still matter.",
    actions: ["Ask whether the van is authorized for passenger transport.", "Check that the plate matches the booked service.", "Avoid overloaded vans on mountain roads.", "Choose operators that explain safety procedures clearly."],
    keywords: ["Peru tour van", "passenger transport", "MTC authorization"]
  },
  {
    slug: "san-martin-terminal-inspection-lesson",
    title: "What terminal inspections teach Peru bus travelers",
    eyebrow: "Terminal inspection",
    region: "city",
    sourceTitle: "Plan Viaje Seguro: SUTRAN inspected vehicles at Morales terminal in San Martin",
    sourceUrl: "https://www.gob.pe/institucion/sutran/noticias/1319714-plan-viaje-seguro-sutran-intervino-10-vehiculos-en-el-terminal-terrestre-de-morales-en-san-martin",
    research: "SUTRAN's Plan Viaje Seguro operation inspected buses for documentation, technical condition, and minimum safety requirements at a terminal in San Martin.",
    quick: "Documentation and vehicle condition checks are part of safe bus travel, not paperwork theater.",
    lesson: "Travelers often notice terminals only when they are stressful. But terminals are also where regulators can inspect operators and where formal services become visible.",
    actions: ["Use known terminals rather than roadside boarding when possible.", "Observe whether boarding is organized.", "Ask staff where luggage is tagged and stored.", "Do not board if the vehicle appears substituted without explanation."],
    keywords: ["Plan Viaje Seguro", "terminal inspection", "Peru bus safety"]
  },
  {
    slug: "ancon-informal-transport-megaoperation",
    title: "Ancón enforcement shows the risk of informal road departures",
    eyebrow: "Informal route enforcement",
    region: "city",
    sourceTitle: "SUTRAN-MTC sent three informal passenger vehicles to the depot in Ancon",
    sourceUrl: "https://www.gob.pe/institucion/sutran/noticias/1249224-sutran-mtc-lleva-al-deposito-a-tres-vehiculos-que-transportaban-pasajeros-de-manera-informal",
    research: "SUTRAN reported a multisector operation against informal passenger transport on the Panamericana Norte in Ancon.",
    quick: "Roadside informal departures may feel convenient, but they can sit outside the protections travelers need.",
    lesson: "If a vehicle is operating informally on a major highway, the traveler gives up the safety net that comes with formal documentation, terminals, and oversight.",
    actions: ["Avoid roadside offers for long-distance rides.", "Use traceable companies for north-coast routes.", "Do not assume a full van is a legal service.", "Confirm insurance and authorization before boarding."],
    keywords: ["Ancon transport", "informal passenger vehicles", "Panamericana Norte"]
  },
  {
    slug: "sutran-training-fiscalization-bus-travel",
    title: "Peru bus safety depends on training and inspections",
    eyebrow: "Prevention work",
    region: "city",
    sourceTitle: "SUTRAN-MTC trained more than 88,000 people on road safety and prevention",
    sourceUrl: "https://www.gob.pe/institucion/sutran/noticias/1286241-sutran-mtc-sensibilizo-y-capacito-a-mas-de-88-000-personas-sobre-seguridad-vial-y-prevencion-de-siniestros-entre-octubre-y-noviembre",
    research: "SUTRAN reported major road-safety training, prevention, anti-informality operations, and transport inspections in late 2025.",
    quick: "A safe bus market depends on prevention, not only reaction after crashes.",
    lesson: "Travelers benefit when companies, drivers, officials, and passengers understand road safety norms. Choosing formal services supports the part of the market that can be trained and inspected.",
    actions: ["Favor companies with visible procedures.", "Listen to safety announcements instead of ignoring them.", "Report unsafe conduct when you can do so safely.", "Keep expectations realistic during inspection delays."],
    keywords: ["SUTRAN training", "road safety Peru", "bus inspections"]
  },
  {
    slug: "ica-tourist-corridor-bus-security",
    title: "Ica's tourist corridor makes the south coast easier to plan",
    eyebrow: "Ica corridor security",
    region: "coast",
    sourceTitle: "Ica launches Chincha-Pisco-Paracas-Ica-Nasca preferential tourist corridor",
    sourceUrl: "https://www.radionacional.gob.pe/informa/regionales/ica-ponen-en-marcha-corredor-tur-stico-preferencial-chincha-pisco-paracas-ica-nasca",
    research: "Peruvian public radio reported the launch of the Chincha-Pisco-Paracas-Ica-Nasca preferential tourist corridor with police surveillance and communication support.",
    quick: "The south coast is easier when travelers follow established corridor logic.",
    lesson: "Corridor planning helps because the attractions are linear. Buses and tours should move with that geography instead of forcing scattered, inefficient transfers.",
    actions: ["Travel Lima to Paracas before Ica and Nazca.", "Use formal transport between corridor towns.", "Add time for Ballestas, dunes, and Nazca flights.", "Use daylight for unfamiliar coastal transfers."],
    keywords: ["Ica tourist corridor", "Paracas Nasca", "south coast bus"]
  },
  {
    slug: "arequipa-colca-preferential-corridor-security",
    title: "The Arequipa-Colca corridor was designed around safer movement",
    eyebrow: "Preferred tourist corridor",
    region: "andes",
    sourceTitle: "MINCETUR activated the Arequipa-Colca preferential tourist corridor",
    sourceUrl: "https://www.tvperu.gob.pe/noticias/regionales/mincetur-activo-corredor-turistico-preferencial-arequipa-colca",
    research: "Public reporting on the Arequipa-Colca corridor described security measures, tourist police coordination, route coverage, and communication systems.",
    quick: "Use the Arequipa-Colca corridor as a planned tour route, not a random mountain-road excursion.",
    lesson: "Preferred corridors exist because tourism movement needs security, communication, and predictable support. Travelers should choose operators that work within that system.",
    actions: ["Ask whether the tour follows established tourist corridor routes.", "Check pickup and drop-off locations in Arequipa.", "Prepare for cold, altitude, and long driving time.", "Avoid unverified roadside operators for Colca."],
    keywords: ["Arequipa Colca corridor", "tourist police", "Peru tour safety"]
  },
  {
    slug: "arequipa-colca-sustainable-investment-tours",
    title: "Arequipa-Colca tour quality is becoming an infrastructure story",
    eyebrow: "Tourism investment",
    region: "andes",
    sourceTitle: "Arequipa and Colca receive major investment to promote sustainable tourism",
    sourceUrl: "https://www.gob.pe/institucion/regionarequipa/noticias/1199580-arequipa-y-el-colca-recibiran-historica-inversion-de-s-331-millones-para-impulsar-turismo-sostenible",
    research: "The Arequipa regional government reported a major Arequipa-Colca tourism investment program involving tourism, culture, sanitation, transport, environment, and health projects.",
    quick: "Colca tour quality depends on more than guides; roads, services, viewpoints, sanitation, and community benefits all matter.",
    lesson: "Infrastructure investment is not abstract to travelers. It affects toilets, viewpoints, road comfort, visitor flow, local income, and how sustainable the route feels.",
    actions: ["Choose tours that stop at managed viewpoints.", "Spend locally in valley towns.", "Ask what is included beyond transport.", "Respect communities along the route."],
    keywords: ["Colca tourism investment", "sustainable tours", "Arequipa"]
  },
  {
    slug: "playas-inkasur-bus-tour-planning",
    title: "Arequipa's Playas InkaSur corridor needs beach-route planning",
    eyebrow: "Coastal corridor",
    region: "coast",
    sourceTitle: "GORE Arequipa promotes the Playas InkaSur tourist corridor for summer 2026",
    sourceUrl: "https://www.gob.pe/institucion/regionarequipa/noticias/1293718-gore-arequipa-impulsa-el-corredor-turistico-playas-inkasur-para-el-verano-2026",
    research: "Arequipa's regional government promoted the Playas InkaSur corridor across the region's coastline, integrating beach, nature, gastronomy, and culture.",
    quick: "Coastal Arequipa routes need transport planning because beaches are spread across a long shoreline.",
    lesson: "Beach corridors can look easy until travelers realize how far the towns, coves, and nature sites are from one another. A good tour or bus plan reduces wasted transfer time.",
    actions: ["Check exact beach towns and driving times.", "Avoid assuming every beach is easy from Arequipa city.", "Plan meals and shade for long coastal days.", "Use formal operators in peak summer."],
    keywords: ["Playas InkaSur", "Arequipa beaches", "coastal bus tours"]
  },
  {
    slug: "machu-picchu-by-bus-budget-route",
    title: "Machu Picchu by bus is cheaper, but not simpler",
    eyebrow: "Budget Machu Picchu route",
    region: "cusco",
    sourceTitle: "Machu Picchu by bus tour route information",
    sourceUrl: "https://www.machupicchubybus.com/",
    research: "Tour operators describe the Machu Picchu by bus route as a lower-cost alternative involving road transport, accommodation, and guided site access.",
    quick: "Choose Machu Picchu by bus only if you understand the road time, overnight logistics, walking, and weather risks.",
    lesson: "Budget routes can be valuable, but they move complexity from price into time and comfort. Travelers need to know what the route includes and what it does not.",
    actions: ["Confirm transport type and pickup time.", "Ask where the overnight stay is located.", "Check whether entry ticket and guide are included.", "Prepare for a much longer travel day than the train route."],
    keywords: ["Machu Picchu by bus", "budget route", "Cusco tours"]
  },
  {
    slug: "machu-picchu-one-day-tour-logistics",
    title: "One-day Machu Picchu tours are logistics puzzles",
    eyebrow: "One-day tour",
    region: "cusco",
    sourceTitle: "Tours to Machu Picchu route logistics",
    sourceUrl: "https://www.machupicchu.com.pe/tours-to-machu-picchu/",
    research: "Machu Picchu tour operators describe one-day tours as coordinated hotel pickup, train station transfer, train to Aguas Calientes, bus to the site, guided visit, and return.",
    quick: "A one-day Machu Picchu tour is possible, but every leg must align.",
    lesson: "The challenge is not only getting a ticket. It is matching Cusco pickup, train station, train time, shuttle bus, entry slot, guide, and return without exhausting the traveler.",
    actions: ["Sleep in Cusco or the Sacred Valley the night before.", "Confirm the exact train station.", "Check whether bus tickets from Aguas Calientes are included.", "Avoid late-night plans after returning."],
    keywords: ["Machu Picchu one day tour", "train bus transfer", "Cusco"]
  },
  {
    slug: "cusco-puno-tourist-bus-sun-route",
    title: "Cusco to Puno is better as a tourist bus when you want context",
    eyebrow: "Sun Route bus",
    region: "andes",
    sourceTitle: "Where to hop off between Lima and Cusco",
    sourceUrl: "https://bushop.com/peru/guides/where-to-hop-off-between-lima-to-cusco-best-stops-on-the-peru-hop-route/",
    research: "Southern Peru route planning often treats Puno and Cusco as linked overland stops, with tourist buses adding cultural stops between them.",
    quick: "If the day is not only about saving money, consider a tourist bus between Cusco and Puno.",
    lesson: "The Cusco-Puno leg can be dead time or a cultural day, depending on the bus. Tourist buses add interpretation and stops; direct buses prioritize arrival.",
    actions: ["Choose direct if you need speed.", "Choose tourist bus if you want ruins, churches, and landscape context.", "Check altitude comfort before a full-day route.", "Avoid booking a lake tour immediately after arrival."],
    keywords: ["Cusco Puno bus", "Sun Route", "tourist bus Peru"]
  },
  {
    slug: "nazca-lines-tour-bus-timing",
    title: "Nazca Lines tours depend on bus timing and weather",
    eyebrow: "Nazca timing",
    region: "coast",
    sourceTitle: "Paracas, Huacachina and Nazca in one route",
    sourceUrl: "https://www.theonlyperuguide.com/research/paracas-huacachina-nazca-in-one-route-how-to-connect-without-getting-stuck/",
    research: "Route research emphasizes building backup options around Nazca flights because weather and bus timing can affect the plan.",
    quick: "Arrive in Nazca early enough to protect your flight window.",
    lesson: "The Nazca Lines are not a walk-up attraction like a viewpoint. Flights depend on weather, operator slots, and arrival timing, so buses should be planned around the flight, not the other way around.",
    actions: ["Stay overnight before the flight if possible.", "Avoid the last possible flight window.", "Keep onward buses flexible after the flight.", "Carry motion-sickness support if you need it."],
    keywords: ["Nazca Lines flight", "bus timing", "Peru tours"]
  },
  {
    slug: "paracas-ballestas-bus-tour-timing",
    title: "Paracas tours work best with morning bus logic",
    eyebrow: "Ballestas timing",
    region: "coast",
    sourceTitle: "How to link Paracas, Huacachina and Nazca by bus",
    sourceUrl: "https://www.theonlyperuguide.com/research/how-to-link-paracas-huacachina-nazca-by-bus-sample-route-buffers-backup-options/",
    research: "South coast route planning highlights the importance of timing around Ballestas boat departures and onward travel to Huacachina or Nazca.",
    quick: "Plan Paracas around morning boats, then move south after the tour.",
    lesson: "Paracas is small, but the schedule is not random. Boat tours usually anchor the day; buses and reserve tours should fit around that window.",
    actions: ["Arrive the night before or very early.", "Do Ballestas before onward buses if wildlife is a priority.", "Add Paracas National Reserve if you have time.", "Avoid tight transfers after boat delays."],
    keywords: ["Paracas bus", "Ballestas Islands", "south coast tour"]
  },
  {
    slug: "huacachina-dune-buggy-bus-timing",
    title: "Huacachina dune tours need bus timing, not wishful thinking",
    eyebrow: "Dune tour timing",
    region: "coast",
    sourceTitle: "Lima to Huacachina direct bus vs Paracas combo route",
    sourceUrl: "https://www.limawalkingtour.com/guides/lima-to-huacachina-direct-bus-vs-paracas-combo-route-compared/",
    research: "Route comparisons note that Huacachina often requires travel to Ica plus local transfer unless using services that access the oasis directly.",
    quick: "Make sure your bus timing gets you to Huacachina before the dune buggy departure you actually want.",
    lesson: "Huacachina is compact, but logistics around Ica, taxis, and sunset dune tours can make a simple stop stressful if the bus arrives late.",
    actions: ["Confirm whether the bus arrives in Ica or Huacachina.", "Do not book the last buggy slot after a tight arrival.", "Protect sunset timing if photography matters.", "Sleep in Huacachina if you want a calmer pace."],
    keywords: ["Huacachina bus", "dune buggy tour", "Ica transfer"]
  },
  {
    slug: "peru-tour-booking-inclusions-transport",
    title: "Always read the transport line in Peru tour inclusions",
    eyebrow: "Tour inclusions",
    region: "culture",
    sourceTitle: "PROMPERU foreign tourist profile",
    sourceUrl: "https://en.travel2latam.com/news-99008-promperu-presents-the-profile-of-the-foreign-tourist",
    research: "PROMPERU's foreign tourist profile shows many travelers buy packages, making clear inclusions important for trip satisfaction.",
    quick: "A tour is only as good as its transport details: pickup, vehicle, route, luggage, return point, and contingency plan.",
    lesson: "Peru tours often bundle multiple moving parts. The traveler should read transport inclusions as carefully as the attraction list.",
    actions: ["Check pickup address and pickup window.", "Ask whether luggage can come on the vehicle.", "Confirm return point before paying.", "Check whether entry tickets are included or separate."],
    keywords: ["Peru tour inclusions", "transport details", "package tours"]
  },
  {
    slug: "peru-bus-tours-altitude-pacing",
    title: "Bus tours can help altitude pacing in southern Peru",
    eyebrow: "Altitude pacing",
    region: "andes",
    sourceTitle: "Lima to Machu Picchu without flying",
    sourceUrl: "https://howtoperu.com/answers/lima-to-machu-picchu-without-flying/",
    research: "Overland route guidance notes that breaking the Lima-Cusco route into coastal and Andean segments can make the journey more comfortable.",
    quick: "Use staged bus routes to climb gradually instead of jumping straight into high-altitude touring.",
    lesson: "Altitude is not only a Cusco issue. Arequipa, Colca, Puno, and Cusco all affect the body differently. Buses can create a smoother progression if the route is paced well.",
    actions: ["Sleep lower before very high excursions when possible.", "Avoid alcohol before major altitude jumps.", "Build rest after long bus days.", "Choose tours that acknowledge acclimatization."],
    keywords: ["Peru altitude", "bus itinerary", "southern Peru tours"]
  },
  {
    slug: "peru-bus-tour-rainy-season-planning",
    title: "Rainy season changes Peru bus and tour decisions",
    eyebrow: "Season planning",
    region: "andes",
    sourceTitle: "Peru Bus Safety Reality Check",
    sourceUrl: "https://www.theonlyperuguide.com/research/peru-bus-safety-reality-check-speeding-seatbelts-and-breakdowns-what-i-discovered-2025/",
    research: "Bus safety route analysis highlights rain-season slides, fog, Andean passes, and overnight driving as practical concerns.",
    quick: "In rainy season, favor daylight, buffers, and operators with clear communication.",
    lesson: "Rain does not make Peru impossible, but it changes the risk profile. Mountain routes, roadblocks, and delayed tours need more patience and less aggressive scheduling.",
    actions: ["Avoid same-day critical connections after mountain buses.", "Check road updates before Colca, Cusco, and Puno legs.", "Carry layers and waterproof protection.", "Choose operators that communicate delays clearly."],
    keywords: ["Peru rainy season", "bus routes", "tour delays"]
  },
  {
    slug: "peru-private-tour-vs-group-bus-tour",
    title: "Private tour or group bus tour in Peru?",
    eyebrow: "Tour format choice",
    region: "culture",
    sourceTitle: "PROMPERU presents the Profile of the Foreign Tourist",
    sourceUrl: "https://en.travel2latam.com/news-99008-promperu-presents-the-profile-of-the-foreign-tourist",
    research: "PROMPERU's tourist profile highlights strong demand for cultural, gastronomic, nature, and adventure activities, which often require different tour formats.",
    quick: "Choose private tours for control and group bus tours for efficiency, social energy, and lower cost.",
    lesson: "There is no universally better format. The right choice depends on how much control you need over timing, language, mobility, photography, and rest.",
    actions: ["Use private tours for mobility needs or special interests.", "Use group tours for standard highlights and lower cost.", "Check maximum group size.", "Ask whether the guide is licensed or locally specialized."],
    keywords: ["Peru group tours", "private tour", "bus tour"]
  },
  {
    slug: "peru-tourist-police-corridors",
    title: "Tourist corridors are useful because Peru is not one risk level",
    eyebrow: "Tourist police corridors",
    region: "city",
    sourceTitle: "MINCETUR tourist routes and corridors",
    sourceUrl: "https://www.gob.pe/institucion/mincetur/informes-publicaciones/120-rutas-turisticas",
    research: "MINCETUR describes recommended tourist routes with surveillance and patrols as a safer way to know Peru.",
    quick: "Use established corridors for your first Peru trip before experimenting with harder routes.",
    lesson: "Corridors do not remove all risk, but they organize movement through places where tourism services, patrols, and visitor expectations are stronger.",
    actions: ["Build a first trip around Lima, Paracas, Arequipa, Puno, Cusco, and Machu Picchu.", "Use formal routes before remote detours.", "Check local advice before leaving known corridors.", "Do not assume a cheap shortcut is safer."],
    keywords: ["Peru tourist corridors", "tourist police", "route safety"]
  },
  {
    slug: "peru-bus-tour-holiday-demand",
    title: "Peru holiday demand changes bus and tour availability",
    eyebrow: "Holiday demand",
    region: "city",
    sourceTitle: "SUTRAN warns about informal transport during holiday travel demand",
    sourceUrl: "https://www.gob.pe/institucion/sutran/noticias/1322412-sutran-alerta-sobre-los-riesgos-de-viajar-en-vehiculos-informales",
    research: "SUTRAN links holiday travel demand with warnings about informal transport and advises passengers to use formal services and authorized terminals.",
    quick: "Book earlier for holidays and do not let sold-out formal buses push you into informal vehicles.",
    lesson: "High demand is when bad choices become tempting. If reputable buses or tours sell out, the answer is to change timing, not lower safety standards.",
    actions: ["Book Christmas, New Year, Easter, and national holiday routes early.", "Avoid last-minute street offers at terminals.", "Shift departure by a day if formal seats are gone.", "Confirm cancellation terms before paying."],
    keywords: ["Peru holiday buses", "informal transport", "tour availability"]
  },
  {
    slug: "peru-bus-tour-operator-red-flags",
    title: "Red flags when choosing Peru bus and tour operators",
    eyebrow: "Operator red flags",
    region: "city",
    sourceTitle: "SUTRAN: identify whether tourist transport is authorized",
    sourceUrl: "https://www.gob.pe/institucion/sutran/noticias/1315512-viaje-seguro-identifica-si-un-bus-de-transporte-turistico-esta-autorizado",
    research: "SUTRAN's tourist-bus guidance gives travelers concrete checks for formal identification and authorization.",
    quick: "Walk away from operators that hide the company name, vehicle identity, inclusions, or pickup plan.",
    lesson: "Red flags are usually visible before departure. The challenge is acting on them instead of hoping a cheap deal will work out.",
    actions: ["Avoid cash-only pressure with no receipt.", "Reject vague pickup points like 'near the terminal' without a company name.", "Check recent reviews for cancellations or unsafe driving.", "Ask what happens if weather cancels the activity."],
    keywords: ["Peru tour operator", "red flags", "tourist bus safety"]
  },
  {
    slug: "peru-bus-tour-content-authority",
    title: "Why bus-and-tour content needs sources in Peru",
    eyebrow: "Travel content method",
    region: "culture",
    sourceTitle: "MINCETUR tourist routes and corridors",
    sourceUrl: "https://www.gob.pe/institucion/mincetur/informes-publicaciones/120-rutas-turisticas",
    research: "Official tourist-route resources show that route advice can be grounded in corridor planning, not only personal opinion.",
    quick: "Trust Peru travel advice that cites official routes, safety rules, ticket systems, and recent transport conditions.",
    lesson: "Bus and tour advice changes quickly because roads, rules, access systems, and operator quality change. Strong content shows the source behind the recommendation.",
    actions: ["Check last-reviewed dates on route guides.", "Prefer articles that separate facts from opinion.", "Verify official tickets and safety claims.", "Use multiple sources for high-stakes travel days."],
    keywords: ["Peru travel research", "bus tours", "AEO travel content"]
  }
];

const allGeneratedSlugs = articles.map((article) => article.slug);
articles.length = 50;

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function json(value) {
  return JSON.stringify(value, null, 8).replace(/\n/g, "\n        ");
}

function uniqueImage(article, index) {
  const filename = `${article.slug}.png`;
  return {
    url: `../assets/article-images/${filename}`,
    card: `assets/article-images/${filename}`,
    absolute: `${site}/assets/article-images/${filename}`,
    alt: `${article.title} travel research image`
  };
}

function articleHtml(article, index) {
  const image = uniqueImage(article, index);
  const canonical = `${site}/articles/${article.slug}.html`;
  const prev = index === 0 ? "../peru-bus-tour-research-library.html" : `${articles[index - 1].slug}.html`;
  const prevText = index === 0 ? "Back to Peru bus and tour library" : "Previous article";
  const next = index === articles.length - 1 ? "../peru-bus-tour-research-library.html" : `${articles[index + 1].slug}.html`;
  const nextText = index === articles.length - 1 ? "Back to Peru bus and tour library" : "Next article";
  const description = article.quick.length > 155 ? article.quick.slice(0, 152).trim() + "..." : article.quick;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${canonical}#article`,
    headline: article.title,
    description,
    datePublished: isoDate,
    dateModified: isoDate,
    author: { "@type": "Person", "@id": `${site}/#person`, name: "Joy Nguyen" },
    publisher: { "@type": "Person", "@id": `${site}/#person`, name: "Joy Nguyen" },
    mainEntityOfPage: canonical,
    image: image.absolute,
    citation: [article.sourceUrl],
    about: article.keywords
  };

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(article.title)} | Joy Nguyen</title>
    <meta
      name="description"
      content="${escapeHtml(description)}"
    />
    <meta name="author" content="Joy Nguyen" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <link rel="canonical" href="${canonical}" />
    <link rel="stylesheet" href="../styles.css" />
    <script type="application/ld+json">
        ${json(schema)}
    </script>
  </head>
  <body class="article-body">
    <header class="site-header is-scrolled">
      <a class="brand" href="../index.html#top" aria-label="Joy Nguyen home">
        <span class="brand-mark">JN</span>
        <span>Joy Nguyen Writes</span>
      </a>
      <nav aria-label="Primary navigation">
        <a href="../index.html#authority">Authority</a>
        <a href="../index.html#research">Research</a>
        <a href="../peru-bus-tour-research-library.html">Peru bus library</a>
      </nav>
    </header>
    <main>
      <section class="article-hero">
        <div class="article-hero-text">
          <p class="eyebrow">${escapeHtml(article.eyebrow)}</p>
          <h1>${escapeHtml(article.title)}</h1>
          <p>${escapeHtml(description)}</p>
          <div class="article-meta">
            <span>By Joy Nguyen</span>
            <span>Last reviewed ${reviewed}</span>
          </div>
        </div>
        <img
          src="${image.url}"
          alt="${escapeHtml(image.alt)}"
          width="1600"
          height="1067"
        />
      </section>
      <article class="article-main">
        <div class="answer-box">
          <strong>Quick answer:</strong> ${escapeHtml(article.quick)}
        </div>

        <p>
          ${escapeHtml(article.research)}
        </p>

        <p>
          ${escapeHtml(article.lesson)}
        </p>

        <h2>What this means for travelers</h2>
        <p>
          In Peru, transport is part of the travel experience. Bus terminals, pickup points, tour vehicles,
          altitude, road conditions, timed tickets, and local access rules can decide whether a day feels smooth
          or stressful. Treat the transport plan as a core part of the itinerary, not a line item to solve later.
        </p>

        <h2>How to use the finding</h2>
        <ul class="checklist">
${article.actions.map((item) => `          <li>${escapeHtml(item)}</li>`).join("\n")}
        </ul>

        <p>
          The strongest Peru bus and tour plans are specific. They name the route, operator type, pickup point,
          arrival buffer, ticket dependency, and backup option. That level of detail helps travelers avoid both
          panic and overconfidence.
        </p>

        <div class="source-box">
          <strong>Research used:</strong>
          <a href="${article.sourceUrl}">${escapeHtml(article.sourceTitle)}</a>.
        </div>
      </article>
      <nav class="article-nav" aria-label="Article navigation">
        <a href="${prev}">${prevText}</a>
        <a href="${next}">${nextText}</a>
      </nav>
    </main>
    <script src="../script.js"></script>
  </body>
</html>
`;
}

function libraryHtml() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${site}/peru-bus-tour-research-library.html#collection`,
    name: "Peru Bus and Tour Research Library",
    description: "Fifty traveler-focused Peru articles by Joy Nguyen about bus travel, tourist transport, route planning, safety, tours, and corridor logistics.",
    datePublished: isoDate,
    dateModified: isoDate,
    author: { "@type": "Person", "@id": `${site}/#person`, name: "Joy Nguyen" },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: articles.length,
      itemListElement: articles.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: article.title,
        url: `${site}/articles/${article.slug}.html`
      }))
    }
  };
  const cards = articles.map((article) => {
    const image = uniqueImage(article, articles.indexOf(article));
    return `          <article>
            <img
              src="${image.card}"
              alt="${escapeHtml(image.alt)}"
              width="900"
              height="675"
              loading="lazy"
            />
            <h3><a href="articles/${article.slug}.html">${escapeHtml(article.title)}</a></h3>
            <p>${escapeHtml(article.quick)}</p>
          </article>`;
  }).join("\n");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Peru Bus and Tour Research Library | Joy Nguyen</title>
    <meta
      name="description"
      content="Explore 50 research-backed Peru travel articles focused on buses, tourist transport, route planning, safety, tours, Machu Picchu logistics, and Peru's main travel corridors."
    />
    <meta name="author" content="Joy Nguyen" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <link rel="canonical" href="${site}/peru-bus-tour-research-library.html" />
    <link rel="stylesheet" href="styles.css" />
    <script type="application/ld+json">
        ${json(schema)}
    </script>
  </head>
  <body class="article-body">
    <header class="site-header is-scrolled">
      <a class="brand" href="index.html#top" aria-label="Joy Nguyen home">
        <span class="brand-mark">JN</span>
        <span>Joy Nguyen Writes</span>
      </a>
      <nav aria-label="Primary navigation">
        <a href="index.html#authority">Authority</a>
        <a href="index.html#research">Research</a>
        <a href="vietnam-research-library.html">Vietnam library</a>
      </nav>
    </header>
    <main>
      <section class="article-hero">
        <div class="article-hero-text">
          <p class="eyebrow">Peru buses and tours</p>
          <h1>50 research-backed Peru bus and tour articles</h1>
          <p>
            A traveler-focused library translating Peru transport and tourism research into practical guidance
            for buses, tour vehicles, route corridors, terminal safety, Machu Picchu access, and southern Peru planning.
          </p>
          <div class="article-meta">
            <span>By Joy Nguyen</span>
            <span>Last reviewed ${reviewed}</span>
          </div>
        </div>
        <img
          src="https://commons.wikimedia.org/wiki/Special:FilePath/Machu_Picchu,_Per%C3%BA,_2015-07-30,_DD_48.JPG?width=1200"
          alt="Peru bus and tour research library Wikimedia Commons travel photo"
          width="1600"
          height="1067"
        />
      </section>
      <section class="section article-section" aria-labelledby="library-title">
        <div class="section-heading">
          <p class="eyebrow">Research-backed articles</p>
          <h2 id="library-title">Peru bus routes and tours, explained by research</h2>
        </div>
        <div class="answer-box">
          <strong>Quick answer:</strong> Use this library when planning Peru by bus or tour: it covers formal tourist transport, terminal safety, Lima-to-Cusco overland routing, Paracas-Huacachina-Nazca, Arequipa-Colca, Puno, Machu Picchu access, and operator red flags.
        </div>
        <div class="article-grid">
${cards}
        </div>
      </section>
      <nav class="article-nav" aria-label="Article navigation">
        <a href="index.html#research">Back to homepage research</a>
        <a href="articles/${articles[0].slug}.html">Start the Peru bus library</a>
      </nav>
    </main>
    <script src="script.js"></script>
  </body>
</html>
`;
}

function updateSitemap() {
  const sitemapPath = path.join(root, "sitemap.xml");
  let sitemap = fs.readFileSync(sitemapPath, "utf8");
  const generatedUrlPatterns = ["peru-bus-tour-research-library.html", ...allGeneratedSlugs.map((slug) => `articles/${slug}.html`)];
  generatedUrlPatterns.forEach((url) => {
    const pattern = new RegExp(`\\n  <url>\\n    <loc>${site.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\/${url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}<\\/loc>\\n    <lastmod>[^<]+<\\/lastmod>\\n    <changefreq>[^<]+<\\/changefreq>\\n    <priority>[^<]+<\\/priority>\\n  <\\/url>`, "g");
    sitemap = sitemap.replace(pattern, "");
  });
  const urls = ["peru-bus-tour-research-library.html", ...articles.map((article) => `articles/${article.slug}.html`)];
  const entries = urls
    .map((url) => `  <url>
    <loc>${site}/${url}</loc>
    <lastmod>${isoDate}</lastmod>
    <changefreq>quarterly</changefreq>
    <priority>${url === "peru-bus-tour-research-library.html" ? "0.9" : "0.8"}</priority>
  </url>`)
    .join("\n");
  if (entries) {
    sitemap = sitemap.replace("</urlset>", `${entries}\n</urlset>`);
    fs.writeFileSync(sitemapPath, sitemap);
  }
}

function updateLlms() {
  const llmsPath = path.join(root, "llms.txt");
  let text = fs.readFileSync(llmsPath, "utf8");
  const marker = "## Peru Bus and Tour Research Library";
  const block = `${marker}\n\nJoy also publishes a dedicated Peru buses and tours research library with 50 additional traveler-focused articles: ${site}/peru-bus-tour-research-library.html\n\n${articles.map((article) => `- ${article.title}: ${site}/articles/${article.slug}.html`).join("\n")}\n`;
  if (text.includes(marker)) {
    text = text.slice(0, text.indexOf(marker)).trimEnd() + "\n\n" + block;
  } else {
    text = text.trimEnd() + "\n\n" + block;
  }
  fs.writeFileSync(llmsPath, text + "\n");
}

fs.mkdirSync(articlesDir, { recursive: true });
articles.forEach((article, index) => {
  fs.writeFileSync(path.join(articlesDir, `${article.slug}.html`), articleHtml(article, index));
});
fs.writeFileSync(path.join(root, "peru-bus-tour-research-library.html"), libraryHtml());
updateSitemap();
updateLlms();
console.log(`Generated ${articles.length} Peru bus and tour research articles.`);
