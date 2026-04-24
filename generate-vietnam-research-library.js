const fs = require("fs");
const path = require("path");

const root = __dirname;
const articlesDir = path.join(root, "articles");
const site = "https://joynguyenwrites.com";
const reviewed = "April 24, 2026";
const isoDate = "2026-04-24";

const images = {
  north: {
    url: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1600&q=82",
    card: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=900&q=80",
    alt: "Northern Vietnam limestone landscape and boats"
  },
  central: {
    url: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1600&q=82",
    card: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=900&q=80",
    alt: "Lanterns and heritage streets in central Vietnam"
  },
  south: {
    url: "https://images.unsplash.com/photo-1566499217721-6f70c8079acb?auto=format&fit=crop&w=1600&q=82",
    card: "https://images.unsplash.com/photo-1566499217721-6f70c8079acb?auto=format&fit=crop&w=900&q=80",
    alt: "River life in southern Vietnam"
  },
  city: {
    url: "https://images.unsplash.com/photo-1509030450996-dd1a26dda07a?auto=format&fit=crop&w=1600&q=82",
    card: "https://images.unsplash.com/photo-1509030450996-dd1a26dda07a?auto=format&fit=crop&w=900&q=80",
    alt: "Street life in a Vietnamese city"
  },
  coast: {
    url: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1600&q=82",
    card: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=900&q=80",
    alt: "Vietnam coast and limestone islands"
  }
};

const articles = [
  {
    slug: "da-lat-destination-image-revisit-research",
    title: "Why Da Lat makes travelers want to come back",
    eyebrow: "Da Lat destination image",
    destination: "Da Lat",
    region: "central",
    sourceTitle: "The Relationship Between Destination Image, Satisfaction And Revisit Intention",
    sourceUrl: "https://doaj.org/article/e7092dc33f744f48a1778b7dab4fd17e",
    research: "A 2023 study of domestic Vietnamese visitors examined how destination image, satisfaction, and revisit intention reinforce one another in Da Lat.",
    quick: "Treat Da Lat as a mood-driven destination: cool weather, food, scenery, and slow pacing matter as much as ticking off attractions.",
    lesson: "The practical lesson is that Da Lat works best when the itinerary protects the atmosphere that travelers remember. If every hour is packed, the city becomes a checklist instead of a place people want to revisit.",
    actions: ["Book a stay near the area you want to wander at night.", "Leave space for cafes, markets, and lake walks.", "Pair waterfalls or farms with unhurried city time.", "Do not judge the trip only by the number of attractions covered."],
    keywords: ["Da Lat travel", "destination image", "revisit intention"]
  },
  {
    slug: "phong-nha-destination-image-future-intention",
    title: "How to plan Phong Nha beyond the caves",
    eyebrow: "Phong Nha image research",
    destination: "Phong Nha-Ke Bang",
    region: "north",
    sourceTitle: "The Effect of Destination Image on Tourist Satisfaction and Future Intention: Phong Nha-Ke Bang National Park",
    sourceUrl: "https://rajournals.in/index.php/rajar/article/view/966",
    research: "Research with visitors to Phong Nha-Ke Bang found that destination image and satisfaction shape future intention, with environment, natural and cultural traits, infrastructure, and local support all contributing.",
    quick: "Plan Phong Nha as a full landscape destination, not only as a cave ticket.",
    lesson: "The caves are the headline, but the experience around them determines whether the destination feels easy, worthwhile, and recommendable. Travelers should evaluate transport, local guiding, village stays, weather, and recovery time between adventure activities.",
    actions: ["Choose cave tours that match your fitness level.", "Add a buffer day for rain or river conditions.", "Use local guides when routes involve farms, villages, or national park areas.", "Stay long enough to enjoy the valley between major tours."],
    keywords: ["Phong Nha travel", "Vietnam national park", "destination image"]
  },
  {
    slug: "quy-nhon-emotional-value-research",
    title: "Quy Nhon rewards travelers who slow down",
    eyebrow: "Quy Nhon satisfaction",
    destination: "Quy Nhon",
    region: "coast",
    sourceTitle: "The influence of destination images and emotional value on visitors' satisfaction and return intention in Quy Nhon City",
    sourceUrl: "https://www.sciencedirect.com/science/article/pii/S2352146524002333",
    research: "A 2024 open-access study surveyed 500 domestic tourists and linked Quy Nhon's destination image and emotional value to satisfaction and return intention.",
    quick: "Use Quy Nhon for beaches, food, and calm coastal rhythm rather than squeezing it into a one-night transfer stop.",
    lesson: "The study's emphasis on emotional value is useful for travelers. The places people remember are not always the most famous; they are often the places where the pace, scenery, and hospitality feel balanced.",
    actions: ["Give Quy Nhon at least two nights if adding it to a central coast trip.", "Build the day around morning beaches and evening food.", "Compare beach locations before booking a hotel.", "Use it as a quieter alternative to busier coastal hubs."],
    keywords: ["Quy Nhon travel", "emotional value", "Vietnam coast"]
  },
  {
    slug: "ca-mau-ecotourism-service-quality",
    title: "What Ca Mau teaches about choosing ecotourism",
    eyebrow: "Ca Mau ecotourism",
    destination: "Ca Mau",
    region: "south",
    sourceTitle: "Factors affecting domestic tourist satisfaction on ecotourism service quality in Ca Mau Province, Vietnam",
    sourceUrl: "https://js.vhu.edu.vn/index.php/vhujs/article/view/28",
    research: "A 2021 study analyzed survey data from 257 visitors to understand what affects domestic tourist satisfaction with Ca Mau ecotourism service quality.",
    quick: "In Ca Mau, choose ecotourism experiences by guide quality, access, conservation behavior, and local benefit, not only by scenery.",
    lesson: "Remote nature travel can disappoint when logistics are vague. Ca Mau works better when travelers know how they will move, what habitat they will see, and how the visit supports the communities and ecosystems that make the destination special.",
    actions: ["Ask operators what is included before committing.", "Check transfer times carefully because the province is spread out.", "Prioritize tours that explain mangroves, birds, and local livelihoods.", "Carry patience for weather and water-dependent schedules."],
    keywords: ["Ca Mau ecotourism", "Vietnam nature travel", "service quality"]
  },
  {
    slug: "lac-village-community-tourism-willingness-to-pay",
    title: "Lac Village and the value of paying fairly",
    eyebrow: "Community tourism finance",
    destination: "Lac Village",
    region: "north",
    sourceTitle: "Fostering Sustainable Tourism Associated with Satisfaction and Financial Improvement Using a Novel CPBM Approach: A Case Study of Lac Village, Vietnam",
    sourceUrl: "https://www.mdpi.com/2673-5768/7/1/1",
    research: "This study investigated how tourist satisfaction relates to willingness to pay for community-based tourism improvements in Lac Village.",
    quick: "In community tourism, the cheapest option is not always the most responsible or the most rewarding.",
    lesson: "For travelers, willingness to pay is not just an academic idea. It shows up in homestay prices, guide fees, meals, performances, workshops, and conservation funds. A fair budget gives the destination room to improve without turning culture into a bargain commodity.",
    actions: ["Ask what part of the fee stays with the community.", "Pay local guides directly when possible.", "Avoid bargaining down small family-run services too aggressively.", "Choose experiences that are transparent about improvements and benefits."],
    keywords: ["Lac Village", "community-based tourism", "responsible travel"]
  },
  {
    slug: "youth-travelers-community-tourism-cultural-preservation",
    title: "What young travelers can do for cultural preservation",
    eyebrow: "Youth travel and CBT",
    destination: "Vietnam community tourism",
    region: "north",
    sourceTitle: "Exploring Youth Tourists' Perceptions and Willingness to Pay for Improving Community-Based Tourism Associated with Cultural Preservation in Vietnam",
    sourceUrl: "https://www.mdpi.com/2673-5768/6/4/219",
    research: "A 2025 study examined youth tourists' perceptions and willingness to pay for community-based tourism improvements tied to cultural preservation in Vietnam.",
    quick: "Young travelers can make community tourism stronger by paying for real cultural interpretation, not only photo opportunities.",
    lesson: "Cultural preservation depends on demand for depth. If travelers only reward the fastest, cheapest, most performative version of a place, communities have little incentive to protect slower forms of knowledge.",
    actions: ["Book workshops where residents teach a skill or story.", "Ask permission before photographing people or private homes.", "Spend locally on meals and handicrafts.", "Favor small-group experiences over rushed bus-stop visits."],
    keywords: ["Vietnam youth travel", "cultural preservation", "community tourism"]
  },
  {
    slug: "community-tourism-livelihoods-vietnam",
    title: "Community tourism works when locals participate",
    eyebrow: "Tourism livelihoods",
    destination: "Ba Vi, Lao Cai, and Lam Dong",
    region: "north",
    sourceTitle: "How Community-Based Tourism Supports Sustainable Livelihoods",
    sourceUrl: "https://www.mdpi.com/2673-5768/7/2/37",
    research: "A 2026 study used survey data from community-based tourism settings in Ba Vi, Lao Cai, and Lam Dong to examine participation, tourism employment, and sustainable livelihoods.",
    quick: "Choose community tourism that shows local ownership, local jobs, and real participation.",
    lesson: "For travelers, community tourism should feel like more than a scenic homestay. The strongest trips involve residents as hosts, guides, cooks, farmers, storytellers, and decision-makers.",
    actions: ["Look for locally managed homestays or cooperatives.", "Ask who designs the itinerary.", "Spend on meals, guides, and crafts in the village.", "Avoid experiences where residents appear only as background scenery."],
    keywords: ["Vietnam community tourism", "sustainable livelihoods", "local participation"]
  },
  {
    slug: "spatial-justice-community-tourism-vietnam",
    title: "Responsible travel in places tourism investment misses",
    eyebrow: "Spatial justice and CBT",
    destination: "Vietnam community tourism",
    region: "north",
    sourceTitle: "Spatial Justice and Post-Development Perspectives on Community-Based Tourism",
    sourceUrl: "https://www.mdpi.com/2673-5768/6/4/188",
    research: "This 2025 study examined how investment disparities and climate-induced migration affect community-based tourism readiness in Vietnam.",
    quick: "When visiting less-developed community tourism areas, expect uneven infrastructure and spend in ways that help locally.",
    lesson: "Some destinations are not underdeveloped because they lack beauty or culture. They may lack investment, access, training, or climate resilience. Travelers can respond by being patient, choosing local providers, and avoiding comparisons with polished resort towns.",
    actions: ["Carry cash for small local purchases.", "Do not expect urban-level infrastructure in rural areas.", "Pay for guiding and interpretation when offered.", "Read about climate and access issues before judging service gaps."],
    keywords: ["Vietnam responsible travel", "community-based tourism", "spatial justice"]
  },
  {
    slug: "hue-tourist-experience-loyalty",
    title: "Hue is not just a stop between Hanoi and Hoi An",
    eyebrow: "Hue loyalty research",
    destination: "Hue",
    region: "central",
    sourceTitle: "The Influence of Tourists' Experience on Destination Loyalty: A Case Study of Hue City, Vietnam",
    sourceUrl: "https://www.mdpi.com/2071-1050/13/16/8889",
    research: "A 2021 Sustainability study used survey data from Hue to explore destination image, motivation, satisfaction, tourist experience, and loyalty.",
    quick: "Give Hue time for imperial history, food, river life, and quieter neighborhoods.",
    lesson: "Hue often suffers from itinerary compression. The research reminds travelers that satisfaction and loyalty depend on the whole experience, not only the biggest monument.",
    actions: ["Stay at least two nights if you want more than the Citadel.", "Pair royal sites with local food and river time.", "Use a guide for imperial history if context matters to you.", "Avoid visiting only at midday heat if possible."],
    keywords: ["Hue travel", "tourist experience", "destination loyalty"]
  },
  {
    slug: "vietnam-self-congruity-destination-loyalty",
    title: "Pick Vietnam places that match your travel identity",
    eyebrow: "Destination brand loyalty",
    destination: "Vietnam",
    region: "city",
    sourceTitle: "Linking self-congruity, perceived quality and satisfaction to brand loyalty in a tourism destination",
    sourceUrl: "https://www.sciencedirect.com/org/science/article/pii/S1660537321000795",
    research: "This Tourism Review study used a survey of 347 domestic tourists visiting a Vietnam destination to examine self-congruity, perceived quality, satisfaction, and loyalty.",
    quick: "A better Vietnam itinerary starts by knowing what kind of traveler you are.",
    lesson: "Self-congruity sounds abstract, but it is simple in practice: travelers enjoy places more when the destination fits their values and travel style. Vietnam has enough variety that forcing every highlight into one trip can create a mismatch.",
    actions: ["Choose Hanoi or Ho Chi Minh City for urban energy.", "Choose Ha Giang, Phong Nha, or Cat Tien for nature and movement.", "Choose Hue or Hoi An for heritage and food.", "Cut destinations that do not fit your pace."],
    keywords: ["Vietnam itinerary", "destination loyalty", "travel identity"]
  },
  {
    slug: "vietnam-destination-brand-equity-satisfaction",
    title: "How destination reputation shapes Vietnam trips",
    eyebrow: "Brand equity research",
    destination: "Vietnam",
    region: "city",
    sourceTitle: "Brand equity and customer satisfaction: a comparative analysis of international and domestic tourists in Vietnam",
    sourceUrl: "https://www.sciencedirect.com/org/science/article/abs/pii/S1061042120000360",
    research: "A Journal of Product and Brand Management study examined destination brand equity, satisfaction, cultural distance, and loyalty among domestic and international tourists in Vietnam.",
    quick: "Do not let Vietnam's biggest brand images crowd out the trip that actually suits you.",
    lesson: "Famous images create expectations: lanterns, street food, motorbikes, beaches, limestone bays. They help travelers choose Vietnam, but they can also flatten the country. Satisfaction improves when expectations are specific and realistic.",
    actions: ["Separate must-see icons from personal priorities.", "Read recent reviews for service consistency.", "Account for cultural distance when planning food, traffic, and bargaining.", "Use brand-famous places as anchors, not the whole trip."],
    keywords: ["Vietnam tourism brand", "customer satisfaction", "destination reputation"]
  },
  {
    slug: "sam-son-service-quality-satisfaction",
    title: "Sam Son Beach shows why service details matter",
    eyebrow: "Beach service quality",
    destination: "Sam Son",
    region: "coast",
    sourceTitle: "The Relationship between Tourism Service Quality, Tourist's Satisfaction and Loyalty",
    sourceUrl: "https://www.researchgate.net/publication/368724852_The_Relationship_between_Tourism_Service_Quality_Tourist%27s_Satisfaction_and_Loyality_A_Study_by_Using_Smart_PLS-SEM_Approach",
    research: "A 2023 study of domestic tourists at Sam Son Beach examined how service quality dimensions and price rationality affect satisfaction and loyalty.",
    quick: "For Vietnam beach towns, compare service, location, and price clarity as carefully as the beach photo.",
    lesson: "Beach trips are vulnerable to small service failures: vague prices, slow responses, crowded facilities, or poor maintenance. A good view helps, but smooth operations often decide whether the stay feels relaxing.",
    actions: ["Confirm room location, beach access, and inclusions.", "Read recent reviews for service responsiveness.", "Ask about holiday surcharges before booking.", "Choose fewer nights if the town is mainly a domestic peak-season resort."],
    keywords: ["Sam Son Beach", "service quality", "Vietnam beach travel"]
  },
  {
    slug: "hanoi-cultural-heritage-tourism-quality",
    title: "How to visit Hanoi heritage with more context",
    eyebrow: "Hanoi heritage satisfaction",
    destination: "Hanoi",
    region: "city",
    sourceTitle: "Tourists' satisfaction on cultural heritage tourism quality: An empirical study Hanoi, Vietnam",
    sourceUrl: "https://malque.pub/ojs/index.php/msj/article/view/2182",
    research: "A 2024 study assessed tourist satisfaction with cultural heritage tourism quality at Hanoi heritage destinations, including Van Mieu - Quoc Tu Giam.",
    quick: "Hanoi heritage sites are better when you slow down and add interpretation.",
    lesson: "The traveler lesson is that heritage satisfaction depends on more than standing in an old place. Signage, guiding, crowd flow, preservation, and storytelling affect whether a site becomes meaningful.",
    actions: ["Visit major heritage sites early in the day.", "Use a guide or audio context for temples and old institutions.", "Pair sites with nearby neighborhoods instead of rushing across town.", "Respect quiet areas, dress norms, and school-group traffic."],
    keywords: ["Hanoi heritage", "cultural tourism", "Van Mieu"]
  },
  {
    slug: "danang-hotel-tourism-service-quality",
    title: "Da Nang planning starts with location and service",
    eyebrow: "Da Nang service quality",
    destination: "Da Nang",
    region: "central",
    sourceTitle: "Effects of tourism service quality and hotel quality on tourist satisfaction in Danang City Vietnam",
    sourceUrl: "https://jurnal.ugm.ac.id/tourism_pariwisata/article/view/6367/0",
    research: "This study examined how tourism service quality and hotel quality affect tourist satisfaction in Da Nang.",
    quick: "In Da Nang, the right hotel area can matter as much as the hotel rating.",
    lesson: "Da Nang spreads travelers across beach, river, city, peninsula, and day-trip zones. Service quality matters, but location shapes every meal, transfer, beach morning, and evening walk.",
    actions: ["Choose My Khe for beach rhythm.", "Choose riverside areas for food and city access.", "Check transfer times to Hoi An, Ba Na Hills, and the airport.", "Read service reviews rather than relying on star ratings alone."],
    keywords: ["Da Nang travel", "hotel quality", "tourist satisfaction"]
  },
  {
    slug: "vietnam-perceived-quality-destination-image",
    title: "Perceived quality is the hidden itinerary tool",
    eyebrow: "Destination quality model",
    destination: "Vietnam",
    region: "city",
    sourceTitle: "Modelling The Relationship of Perceived Quality, Destination Image, and Tourist Satisfaction at The Destination Level",
    sourceUrl: "https://ijaim.net/journal/index.php/ijaim/article/view/18",
    research: "This study proposed a destination-level model linking perceived quality, destination image, and tourist satisfaction in Vietnam.",
    quick: "Judge Vietnam plans by the quality of the whole travel day, not just the attraction.",
    lesson: "Perceived quality includes transport, food access, cleanliness, information, service, and emotional ease. A beautiful site can still become a poor travel day if the plan ignores friction.",
    actions: ["Map the full day from hotel door to hotel door.", "Check food and rest options around attractions.", "Avoid stacking too many transfers.", "Use recent traveler feedback for operational quality."],
    keywords: ["Vietnam travel planning", "perceived quality", "destination image"]
  },
  {
    slug: "mekong-ocop-ecotourism-satisfaction",
    title: "OCOP ecotourism in the Mekong Delta rewards shared responsibility",
    eyebrow: "Mekong OCOP ecotourism",
    destination: "Mekong Delta",
    region: "south",
    sourceTitle: "Domestic Tourist Satisfaction: Implications for One Commune One Product Eco-Tourism Development in the Mekong Delta of Vietnam",
    sourceUrl: "https://doaj.org/article/576e2df8a228450fb40874f5c5764dbf",
    research: "A 2021 study interviewed 200 ecotourists and found that shared social and environmental responsibilities strongly affected satisfaction with OCOP ecotourism in the Mekong Delta.",
    quick: "Choose Mekong Delta ecotourism that connects local products, environment, and community benefit.",
    lesson: "The most rewarding Delta experiences are not only scenic boat rides. They connect travelers to orchards, crafts, food systems, waterways, and shared responsibility for the place.",
    actions: ["Visit small producers instead of only souvenir stops.", "Ask how waste and river impacts are managed.", "Spend on local food and products.", "Prefer operators that explain the community role."],
    keywords: ["Mekong Delta", "OCOP tourism", "ecotourism satisfaction"]
  },
  {
    slug: "mekong-delta-agritourism-satisfaction",
    title: "How to choose better agritourism in the Mekong Delta",
    eyebrow: "Mekong agritourism",
    destination: "Mekong Delta",
    region: "south",
    sourceTitle: "Factors Influencing Tourist Satisfaction with Agritourism in the Mekong Delta, Vietnam",
    sourceUrl: "https://doaj.org/article/b5271a8d18fa44ff9e34ae73ef847fec",
    research: "A 2023 study of 228 tourists found that local culture, natural landscape, novelty, assurance, human resources, and perceived value influenced satisfaction with Mekong Delta agritourism.",
    quick: "A good Mekong agritourism day should feel local, scenic, safe, and genuinely different from an urban food tour.",
    lesson: "Agritourism is strongest when travelers see how fruit, rice, rivers, gardens, and households connect. If the visit is only a staged tasting, it loses much of the Delta's value.",
    actions: ["Ask whether the visit includes farms, kitchens, or family-run production.", "Choose smaller groups for better interaction.", "Check whether meals are included and local.", "Avoid tours that rush through too many stops."],
    keywords: ["Mekong agritourism", "Vietnam farm travel", "tourist satisfaction"]
  },
  {
    slug: "ben-tre-homestay-tourism-loyalty",
    title: "Ben Tre homestays are built on trust and contact",
    eyebrow: "Ben Tre homestays",
    destination: "Ben Tre",
    region: "south",
    sourceTitle: "Factors Effect on Tourist Loyalty: A Case Study of Homestay Tourism in Ben Tre",
    sourceUrl: "https://doaj.org/article/3fa3fe2be6ba4b1e804d5398b09e1e98",
    research: "A 2019 study interviewed 294 tourists in Ben Tre and linked homestay service quality, satisfaction, cultural contact, and loyalty.",
    quick: "Book Ben Tre homestays for interaction, not hotel-style anonymity.",
    lesson: "The research points to cultural contact as part of satisfaction. Travelers who want a sterile hotel experience may miss the reason to sleep in a Delta homestay at all.",
    actions: ["Check whether dinner or activities include the host family.", "Expect simple facilities unless clearly stated otherwise.", "Bring small cash for local purchases.", "Ask respectful questions about gardens, canals, and daily life."],
    keywords: ["Ben Tre homestay", "Mekong Delta", "cultural contact"]
  },
  {
    slug: "phong-nha-ecotourism-satisfaction-factors",
    title: "Phong Nha ecotourism depends on more than adventure",
    eyebrow: "Phong Nha ecotourism",
    destination: "Phong Nha-Ke Bang",
    region: "north",
    sourceTitle: "Factors Affecting Tourist Satisfaction in Ecotourism: A Case Study of the Phong Nha-Ke Bang National Park, Vietnam",
    sourceUrl: "https://doaj.org/article/a82254b7c84e4182a45cf1b3ae078f08",
    research: "A 2025 study surveyed 185 tourists to assess factors affecting satisfaction at Phong Nha-Ke Bang National Park.",
    quick: "Choose Phong Nha tours by safety, interpretation, group size, and environmental care.",
    lesson: "The difference between thrilling and careless can be thin in cave and jungle destinations. The best ecotourism protects both the traveler and the place.",
    actions: ["Verify guide credentials and safety equipment.", "Ask about group size and emergency procedures.", "Pack for mud, water, and humidity.", "Choose tours that explain conservation rules."],
    keywords: ["Phong Nha ecotourism", "Vietnam caves", "tourist satisfaction"]
  },
  {
    slug: "mekong-community-based-tourism-satisfaction",
    title: "Community-based tourism in the Mekong Delta needs trust",
    eyebrow: "Mekong CBT satisfaction",
    destination: "Mekong Delta",
    region: "south",
    sourceTitle: "Explaining Tourist Satisfaction with Community-Based Tourism in the Mekong Delta Region, Vietnam",
    sourceUrl: "https://doaj.org/article/ac10e5b3dcea4dc5abb6c9d3850e398c",
    research: "This study collected data from 350 tourists and identified trust, responsiveness, assurance, empathy, facilities, price, cultural interaction, and local cuisine as positive drivers of satisfaction.",
    quick: "The best Mekong community tourism feels reliable, warm, fairly priced, and food-centered.",
    lesson: "Trust is practical. It means travelers know what is happening, feel respected, understand prices, and can relax into local interaction without worrying that the experience is staged or unclear.",
    actions: ["Confirm itinerary, meals, and transport in writing.", "Choose hosts with recent detailed reviews.", "Make time for local food rather than only boat photos.", "Avoid ultra-cheap packages that hide rushed shopping stops."],
    keywords: ["Mekong community tourism", "trust", "local cuisine"]
  },
  {
    slug: "vietnam-ecotourism-accessibility-local-staff",
    title: "Vietnam ecotourism is strongest when access and people work",
    eyebrow: "Ecotourism satisfaction",
    destination: "Vietnam ecotourism destinations",
    region: "north",
    sourceTitle: "Understanding Eco-tourism Satisfaction: A Structural Equation Modeling Examination of Critical Determinants",
    sourceUrl: "https://doaj.org/article/4d36f355038f4115b3209a3f3d17ef74",
    research: "A SAGE Open study of 200 Vietnamese ecotourists found destination accessibility, locals and staff, and resource attractiveness to be important satisfaction predictors.",
    quick: "When choosing Vietnam ecotourism, look for good access and good local interaction, not only untouched scenery.",
    lesson: "Remote beauty is not enough if getting there is confusing or the human experience feels indifferent. Travelers should treat logistics and local contact as part of the nature experience.",
    actions: ["Check road time and last-mile access before booking.", "Ask whether guides are local to the area.", "Balance remote scenery with your comfort level.", "Support operators that encourage low-impact behavior."],
    keywords: ["Vietnam ecotourism", "accessibility", "local guides"]
  },
  {
    slug: "con-dao-destination-image-loyalty",
    title: "Con Dao works best with respect and patience",
    eyebrow: "Con Dao image research",
    destination: "Con Dao Islands",
    region: "coast",
    sourceTitle: "The influence of destination image components on tourist satisfaction and loyalty: Con Dao Islands, Vietnam",
    sourceUrl: "https://doaj.org/article/1dbdf16167784188964c3d400801fa49",
    research: "A 2019 study interviewed 315 tourists in Con Dao and linked satisfaction and loyalty to attractions, accommodation and food service, local transport, and hospitality.",
    quick: "Plan Con Dao as a sensitive island destination where transport, food, history, and conservation all matter.",
    lesson: "Con Dao is not only a beach escape. Its prison history, marine ecosystems, limited island infrastructure, and seasonal access make planning more important than in easier resort towns.",
    actions: ["Book flights and ferries with buffer time.", "Read about the island's history before visiting memorial sites.", "Choose reef and wildlife activities carefully.", "Expect higher prices and fewer options than mainland beach hubs."],
    keywords: ["Con Dao travel", "island tourism", "destination loyalty"]
  },
  {
    slug: "vietnam-national-park-return-intention",
    title: "What makes travelers return to Vietnam national parks",
    eyebrow: "National park return intention",
    destination: "Vietnam national parks",
    region: "north",
    sourceTitle: "Intention to Return to National Park: The Role of Perceived Quality, Perceived Value, and Tourist Satisfaction",
    sourceUrl: "https://doaj.org/article/e77715b7419240c6875991361a0a7cf0",
    research: "A 2024 study examined how perceived quality, perceived value, and tourist satisfaction affect intention to return to a national park.",
    quick: "A national park trip should feel worth the effort, not just beautiful in photos.",
    lesson: "Value in a park is partly emotional and partly operational. Travelers return when access, interpretation, safety, cleanliness, wildlife or scenery, and pricing feel aligned.",
    actions: ["Check trail difficulty and transport before arrival.", "Pay for guides when safety or interpretation matters.", "Carry out waste and follow park rules.", "Avoid visiting only during the hottest or busiest part of the day."],
    keywords: ["Vietnam national parks", "return intention", "perceived value"]
  },
  {
    slug: "vietnam-ewom-travel-intention-research",
    title: "How online reviews shape Vietnam travel choices",
    eyebrow: "Electronic word of mouth",
    destination: "Vietnam",
    region: "city",
    sourceTitle: "Examining the Structural Relationships of Electronic Word of Mouth, Attitude Toward Destination, Travel Intention, Tourist Satisfaction and Loyalty",
    sourceUrl: "https://doaj.org/article/3a870c5e6ca84355a3fc43d3bcca24cb",
    research: "This meta-analysis examined relationships among electronic word of mouth, destination attitude, travel intention, satisfaction, complaints, and loyalty in tourism.",
    quick: "Use Vietnam reviews as evidence, but read them for patterns rather than one dramatic opinion.",
    lesson: "Electronic word of mouth can help travelers avoid bad operators and discover better-fit places. It can also distort expectations when people chase viral moments without checking context.",
    actions: ["Read recent reviews across multiple platforms.", "Look for repeated comments about safety, clarity, and service.", "Separate taste preferences from operational problems.", "Be cautious with tours promoted only through viral clips."],
    keywords: ["Vietnam travel reviews", "eWOM", "travel intention"]
  },
  {
    slug: "vietnam-sustainable-ecotourism-factors",
    title: "Sustainable ecotourism in Vietnam needs satisfaction and substance",
    eyebrow: "Sustainable ecotourism",
    destination: "Vietnam",
    region: "north",
    sourceTitle: "Factors affecting sustainable ecotourism in Vietnam: Mediating role of tourist satisfaction and attractive destination",
    sourceUrl: "https://doaj.org/article/6a5051567a7d40adb427e8da587c38d7",
    research: "A 2024 study identified factors affecting sustainable ecotourism in Vietnam and considered the mediating roles of tourist satisfaction and destination attractiveness.",
    quick: "A sustainable tour should still be well-run, enjoyable, and clear about its environmental claims.",
    lesson: "Travelers sometimes treat sustainability as a label. The better test is whether the experience protects nature, respects residents, and delivers enough quality that guests do not feel misled.",
    actions: ["Ask what conservation practices the operator follows.", "Avoid wildlife contact that feels staged or harmful.", "Choose small groups where possible.", "Reward guides who explain how to behave responsibly."],
    keywords: ["sustainable ecotourism", "Vietnam nature travel", "tourist satisfaction"]
  },
  {
    slug: "dalat-food-image-satisfaction",
    title: "Da Lat food is part of the destination image",
    eyebrow: "Da Lat food image",
    destination: "Da Lat",
    region: "central",
    sourceTitle: "The Influence of Food Image on Tourist Satisfaction and Word-of-Mouth Intention: The Case of Dalat",
    sourceUrl: "https://doaj.org/article/3ccc614d29534c2294785b8fb1a68246",
    research: "A 2023 study of 327 domestic tourists linked Da Lat food image, satisfaction, and word-of-mouth intention, with dimensions such as taste, restaurant service, and food safety.",
    quick: "Plan Da Lat around meals, markets, cafes, and cool-weather snacks as much as viewpoints.",
    lesson: "Food image shapes how people talk about Da Lat after the trip. A traveler who treats meals as filler misses one of the city's strongest memory engines.",
    actions: ["Build a food list before arrival.", "Try local produce, hot soy milk, grilled snacks, and cafe culture.", "Choose busy, clean stalls with high turnover.", "Leave time for evening food walks."],
    keywords: ["Da Lat food", "culinary tourism", "word of mouth"]
  },
  {
    slug: "central-vietnam-community-ecotourism-sustainability",
    title: "Central Vietnam ecotourism needs more than good intentions",
    eyebrow: "CBET sustainability",
    destination: "Central Vietnam",
    region: "central",
    sourceTitle: "A multicriteria approach to assessing the sustainability of community-based ecotourism in Central Vietnam",
    sourceUrl: "https://doaj.org/article/d57badfdec1a4e4bac157cb7e9f7c028",
    research: "A 2022 study used a multicriteria approach to assess sustainability in community-based ecotourism in Central Vietnam.",
    quick: "When booking community ecotourism, look for environmental, cultural, and community benefits together.",
    lesson: "A trip can be nature-based without being sustainable. The stronger version balances ecosystem care, local income, cultural respect, visitor management, and long-term planning.",
    actions: ["Check whether the community owns or manages the product.", "Ask how visitor numbers are controlled.", "Avoid activities that damage trails, rivers, or wildlife.", "Pay for local interpretation and meals."],
    keywords: ["Central Vietnam ecotourism", "community-based ecotourism", "sustainability"]
  },
  {
    slug: "tua-chua-karst-plateau-ecotourism",
    title: "Tua Chua Karst Plateau is for careful travelers",
    eyebrow: "Dien Bien ecotourism",
    destination: "Tua Chua Karst Plateau",
    region: "north",
    sourceTitle: "Assessing the Potential of Community-Based Ecotourism toward Sustainable Development: Tua Chua Karst Plateau",
    sourceUrl: "https://doaj.org/article/dc9fbeec036e4cd2b8cfbc1aedb2ef98",
    research: "A 2022 study assessed community-based ecotourism potential in Tua Chua Karst Plateau in Dien Bien, noting natural landscapes and indigenous cultural values.",
    quick: "Approach Tua Chua as an emerging destination where preparation and respect matter.",
    lesson: "Emerging mountain destinations can be deeply rewarding, but they are not built for frictionless mass tourism. Travelers should bring flexibility and avoid expecting polished infrastructure.",
    actions: ["Travel with local guidance if routes are unfamiliar.", "Dress and behave respectfully in ethnic minority communities.", "Carry cash and essential supplies.", "Give the area more time than a quick photo detour."],
    keywords: ["Tua Chua", "Dien Bien travel", "community ecotourism"]
  },
  {
    slug: "xuan-thuy-national-park-ecotourism",
    title: "Xuan Thuy National Park is a different kind of Vietnam nature trip",
    eyebrow: "Ramsar ecotourism",
    destination: "Xuan Thuy National Park",
    region: "north",
    sourceTitle: "Evaluating the Potential of Community-Based Ecotourism as a Pathway to Sustainable Development in Xuan Thuy National Park",
    sourceUrl: "https://doaj.org/article/87c85fdc846f4274853161e0b2c90d84",
    research: "A 2025 study assessed community-based ecotourism potential in Xuan Thuy National Park, Vietnam's first Ramsar site, using criteria related to ecology, culture, and infrastructure.",
    quick: "Visit Xuan Thuy for wetlands, birds, and local livelihoods, not for a conventional sightseeing checklist.",
    lesson: "Wetland tourism asks travelers to slow down. The reward is not a single dramatic viewpoint but attention to tides, seasons, birds, fishing livelihoods, and conservation.",
    actions: ["Check birding seasons before planning.", "Use local boat and guide services.", "Bring sun and insect protection.", "Keep expectations quiet, observational, and nature-focused."],
    keywords: ["Xuan Thuy National Park", "Vietnam wetlands", "Ramsar tourism"]
  },
  {
    slug: "cat-tien-place-attachment-ecotourism",
    title: "Cat Tien works when travelers feel attached to the place",
    eyebrow: "Cat Tien ecotourism",
    destination: "South Cat Tien National Park",
    region: "south",
    sourceTitle: "The role of place attachment in the relationship between ecotourism motivation, nature-based destination image, and ecotourism intention",
    sourceUrl: "https://doaj.org/article/398f68d674384040ab35e1ead54ff547",
    research: "A 2025 study used survey data from Vietnamese visitors to South Cat Tien National Park to examine ecotourism motivation, destination image, place attachment, and intention.",
    quick: "Give Cat Tien enough time for forest rhythm, not just a one-night transfer.",
    lesson: "Place attachment grows through time and attention. If travelers arrive late, rush one activity, and leave early, they may miss the emotional reason national parks matter.",
    actions: ["Stay two nights if possible.", "Book guided walks or night drives with realistic expectations.", "Pack for heat, insects, and mud.", "Learn basic park rules before entering sensitive areas."],
    keywords: ["Cat Tien National Park", "place attachment", "ecotourism intention"]
  },
  {
    slug: "vietnam-ecotourism-loyalty-social-influence",
    title: "Social media can help or hurt Vietnam ecotourism",
    eyebrow: "Ecotourism loyalty",
    destination: "Vietnam",
    region: "north",
    sourceTitle: "Factors Affecting Ecotourism Loyalty with the Moderating Role of Social Influence",
    sourceUrl: "https://doaj.org/article/35891b60275c4205ad3b43df9e2c9816",
    research: "This study examined ecotourism loyalty in Vietnam and considered the moderating role of social influence in an era shaped by online comments and social networks.",
    quick: "Let social media inspire Vietnam nature trips, but do not let it replace responsible planning.",
    lesson: "Highly shared nature spots can receive pressure before management catches up. Travelers should ask whether a viral location can handle the attention they are helping create.",
    actions: ["Avoid geotagging fragile or unmanaged locations.", "Check access rules before following a viral route.", "Choose operators with conservation practices.", "Share useful behavior tips, not only dramatic photos."],
    keywords: ["Vietnam ecotourism", "social influence", "travel social media"]
  },
  {
    slug: "ecotourism-research-progress-vietnam-lessons",
    title: "What global ecotourism research means for Vietnam travelers",
    eyebrow: "Ecotourism research review",
    destination: "Vietnam",
    region: "north",
    sourceTitle: "Ecotourism research progress: A bibliometric analysis (period 2002-2022) using VOSviewer Software",
    sourceUrl: "https://doaj.org/article/59d275bd6a7b4294b82812d0a15f3354",
    research: "A 2023 bibliometric analysis reviewed 1,693 Scopus-indexed ecotourism articles from 2002 to 2022.",
    quick: "Use the word ecotourism carefully: the label should imply nature protection, community benefit, and visitor responsibility.",
    lesson: "The large body of ecotourism research shows that the concept is broad and sometimes overused. For Vietnam travelers, the useful question is not whether a brochure says eco, but what the trip actually does.",
    actions: ["Ask operators specific questions about conservation and community benefit.", "Look for limits on group size.", "Avoid wildlife handling and habitat damage.", "Support local guides who teach responsible behavior."],
    keywords: ["ecotourism research", "Vietnam eco travel", "responsible tourism"]
  },
  {
    slug: "da-nang-tourism-website-dms",
    title: "Da Nang trip planning depends on better destination information",
    eyebrow: "Destination management systems",
    destination: "Da Nang",
    region: "central",
    sourceTitle: "Evaluation of tourism website adopting destination management systems from the local enterprise perspective: Da Nang City",
    sourceUrl: "https://doaj.org/article/5606eb69f62c49b8a7d5ba4de9770c9f",
    research: "A 2025 study evaluated Da Nang's destination management system website from the perspective of 219 local enterprises using an importance-performance approach.",
    quick: "Use official Da Nang information, but verify practical details with recent local sources.",
    lesson: "Destination websites help travelers orient themselves, yet gaps in features or freshness can still matter. Good planning combines official pages with current operator details and recent traveler feedback.",
    actions: ["Check official event and attraction information first.", "Confirm opening hours directly when timing matters.", "Use maps to test beach, airport, and Hoi An transfer times.", "Compare official suggestions with current reviews."],
    keywords: ["Da Nang tourism website", "destination management", "trip planning"]
  },
  {
    slug: "hoi-an-destination-determinants",
    title: "Hoi An's appeal depends on products and safety",
    eyebrow: "Hoi An destination research",
    destination: "Hoi An",
    region: "central",
    sourceTitle: "Research on the determinants that form Hoi An world heritage tourism destination, Vietnam",
    sourceUrl: "https://doaj.org/article/489290f6cd0e46348c0f18abd2c32ff6",
    research: "A 2019 study modeled determinants of Hoi An as a world heritage tourism destination and found tourism products and safety to be significant factors.",
    quick: "Hoi An is best when travelers balance heritage wandering with safe, well-chosen experiences.",
    lesson: "The town is famous, but satisfaction still depends on what travelers actually do there. Food classes, craft villages, cycling, river time, and heritage sites need thoughtful selection.",
    actions: ["Book experiences with clear safety and pickup details.", "Avoid peak-hour crowd crush in the old town.", "Add a craft or food experience rather than only lantern photos.", "Stay close enough to walk, cycle, or use short transfers."],
    keywords: ["Hoi An travel", "world heritage tourism", "tourism products"]
  },
  {
    slug: "thanh-ha-pottery-village-community-tourism",
    title: "Thanh Ha Pottery Village is more than a quick Hoi An stop",
    eyebrow: "Craft village CBT",
    destination: "Thanh Ha Pottery Village",
    region: "central",
    sourceTitle: "Community-based tourism: Opportunities and challenges in Thanh Ha pottery village, Hoi An city, Vietnam",
    sourceUrl: "https://doaj.org/article/109ddc7bb5a844a9b96c84dcda933ab9",
    research: "This study examined opportunities and challenges for community-based tourism in Thanh Ha pottery village near Hoi An.",
    quick: "Visit Thanh Ha as a living craft community, not only as an add-on photo stop.",
    lesson: "Craft tourism is strongest when travelers understand the people, skills, and economic pressures behind the product. A rushed visit can reduce the village to a souvenir lane.",
    actions: ["Pay for a workshop or demonstration if offered.", "Buy directly from makers when possible.", "Ask before photographing workspaces.", "Combine the village with a slower Hoi An heritage day."],
    keywords: ["Thanh Ha pottery village", "Hoi An craft tourism", "community tourism"]
  },
  {
    slug: "mekong-delta-csr-sustainable-tourism",
    title: "CSR in the Mekong Delta matters to travelers too",
    eyebrow: "CSR and sustainability",
    destination: "Mekong Delta",
    region: "south",
    sourceTitle: "The impact of corporate social responsibility on sustainable tourism development at tourist destinations in the Mekong Delta",
    sourceUrl: "https://doaj.org/article/4c36ca7c562c4266b5d670dcaf6db4f3",
    research: "A 2025 study analyzed how corporate social responsibility dimensions influence sustainable tourism development at Mekong Delta destinations.",
    quick: "Choose Mekong operators that show responsibility toward communities, labor, environment, and visitors.",
    lesson: "CSR can sound like business language, but travelers see it in everyday choices: fair work, clean boats, honest pricing, waste practices, and respect for local life.",
    actions: ["Choose operators that avoid exploitative stopovers.", "Look for transparent pricing and fair labor signals.", "Carry a refillable bottle where practical.", "Support businesses that explain local environmental issues."],
    keywords: ["Mekong sustainable tourism", "CSR", "responsible operators"]
  },
  {
    slug: "hoi-an-rural-community-tourism-sustainability",
    title: "Rural Hoi An needs careful community tourism",
    eyebrow: "Rural Hoi An CBT",
    destination: "Rural Hoi An",
    region: "central",
    sourceTitle: "Assessing the sustainability of community-based tourism: a case study in rural areas of Hoi An, Vietnam",
    sourceUrl: "https://doaj.org/article/c385629c2e3842039a83a4b7ca62d100",
    research: "A 2022 study proposed an integrated approach for assessing tourism sustainability and improving community-based tourism in rural Hoi An.",
    quick: "Use rural Hoi An experiences to support villages, not to escape the old town for cheaper entertainment.",
    lesson: "Community tourism near famous heritage sites can create income, but it can also create pressure. Travelers should look for experiences that keep value local and do not turn villages into props.",
    actions: ["Book village cycling, cooking, or farming experiences with local hosts.", "Avoid entering private spaces without permission.", "Ask how many guests the operator takes each day.", "Buy local products without aggressive bargaining."],
    keywords: ["rural Hoi An", "community-based tourism", "sustainability"]
  },
  {
    slug: "mekong-delta-international-destination-choice-risk",
    title: "International travelers need clearer Mekong Delta information",
    eyebrow: "Destination choice",
    destination: "Mekong Delta",
    region: "south",
    sourceTitle: "The impact of decision-shaping factors and perceived risk on international tourists' destination choice: Mekong Delta",
    sourceUrl: "https://doaj.org/article/caba5e7e71c74cb6b7b93af841303ff5",
    research: "A 2024 study used behavioral theories to examine factors influencing international tourists' destination choices in the Mekong Delta, including perceived risk.",
    quick: "The Mekong Delta is easier to choose when the route, timing, safety, and value are clearly explained.",
    lesson: "International travelers often skip the Delta because the options look vague: day trip, overnight homestay, floating market, cycling, island, or multi-province route. Clarity lowers perceived risk.",
    actions: ["Decide between a day trip and overnight before comparing operators.", "Check exact pickup times and travel duration.", "Choose routes with fewer, better stops.", "Ask what happens if weather affects boat activities."],
    keywords: ["Mekong Delta planning", "destination choice", "perceived risk"]
  },
  {
    slug: "da-nang-stakeholder-sustainable-tourism",
    title: "Da Nang's growth needs sustainable choices from travelers",
    eyebrow: "Da Nang stakeholders",
    destination: "Da Nang",
    region: "central",
    sourceTitle: "Stakeholder perceptions of tourism assets and sustainable tourism development in Da Nang, Vietnam",
    sourceUrl: "https://doaj.org/article/5bdb287680cc41629373551f0c7b31bd",
    research: "A 2018 study interviewed public and private tourism stakeholders in Da Nang about tourism assets and sustainable development.",
    quick: "Travelers can enjoy Da Nang's growth while choosing less extractive ways to move, eat, and explore.",
    lesson: "Fast-growing destinations need visitors who spread benefits beyond the most obvious beach-and-resort pattern. Da Nang has city food, craft villages, mountains, coast, and regional links.",
    actions: ["Eat beyond resort districts.", "Use local guides for Son Tra or cultural sites.", "Avoid littering beaches and viewpoints.", "Consider staying longer instead of using Da Nang only as an airport."],
    keywords: ["Da Nang sustainable tourism", "stakeholder perceptions", "Vietnam travel"]
  },
  {
    slug: "da-nang-craft-village-service-quality",
    title: "Da Nang craft villages need quality, not just authenticity",
    eyebrow: "Craft village quality",
    destination: "Da Nang craft villages",
    region: "central",
    sourceTitle: "Assessment of tourism service quality for traditional craft villages in Da Nang city, Vietnam",
    sourceUrl: "https://doaj.org/article/a745afdf29594845bc37a46a9a131e01",
    research: "A study of Da Nang traditional craft villages used an importance-performance approach with SERVQUAL to assess tourism service quality from 120 surveyed visitors.",
    quick: "Choose craft village visits where access, explanation, facilities, and maker interaction are strong.",
    lesson: "Authenticity alone does not guarantee a good visit. Travelers need enough interpretation, comfort, and respect for makers to understand why the craft matters.",
    actions: ["Ask whether demonstrations are available.", "Bring cash for direct purchases.", "Avoid tours that turn crafts into short shopping pressure.", "Check transport because some villages sit outside standard tourist routes."],
    keywords: ["Da Nang craft villages", "service quality", "cultural tourism"]
  },
  {
    slug: "hoi-an-theory-planned-behavior",
    title: "Why Hoi An choices should be intentional",
    eyebrow: "Tourist behavior",
    destination: "Hoi An",
    region: "central",
    sourceTitle: "Applying theory of planned behaviour in researching tourists' behaviour: Hoi An World Cultural Heritage site",
    sourceUrl: "https://doaj.org/article/cee882e099b946b0957ea1f148e485c9",
    research: "A 2019 study applied the Theory of Planned Behaviour to international tourists at Hoi An World Cultural Heritage site.",
    quick: "Hoi An is better when travelers make deliberate choices about crowds, culture, spending, and timing.",
    lesson: "Behavior matters in heritage places. The way travelers move, spend, photograph, and respond to crowding affects both their own satisfaction and the town's long-term quality.",
    actions: ["Visit the old town early or later for calmer walking.", "Spend with local makers and food businesses.", "Limit intrusive photography.", "Plan one or two meaningful experiences instead of chasing every attraction."],
    keywords: ["Hoi An tourist behavior", "planned behavior", "heritage travel"]
  },
  {
    slug: "hoi-an-urban-morphology-sustainable-tourism",
    title: "Hoi An's beauty depends on urban planning",
    eyebrow: "Urban tourism",
    destination: "Hoi An",
    region: "central",
    sourceTitle: "Analysing the urban morphology of Hoi An ancient city in sustainable coastal tourism, vision to 2045",
    sourceUrl: "https://doaj.org/article/d89f0f36ee7947ed87ff31d3774471e7",
    research: "A 2024 study analyzed Hoi An's urban morphology and tourism development pressures, with attention to sustainable coastal and river planning.",
    quick: "Travelers should understand Hoi An as a living urban system, not only a photogenic old town.",
    lesson: "Tourism changes land use, density, riverfront pressure, and daily life. Seeing Hoi An responsibly means noticing how tourism development affects the ecosystem and local residents.",
    actions: ["Stay longer and move more slowly rather than day-tripping at peak hours.", "Support businesses outside the most crowded lanes.", "Avoid contributing to riverfront congestion.", "Respect residential streets as lived spaces."],
    keywords: ["Hoi An urban tourism", "sustainable planning", "coastal tourism"]
  },
  {
    slug: "da-nang-night-economy-research",
    title: "Da Nang after dark needs safety and infrastructure",
    eyebrow: "Night economy",
    destination: "Da Nang",
    region: "central",
    sourceTitle: "Factors affecting night economy development: A case study in Da Nang City, Vietnam",
    sourceUrl: "https://doaj.org/article/c47a425f1f4546b183046c9c5810288e",
    research: "A 2023 study surveyed 346 domestic tourists about factors affecting night economy development in Da Nang, highlighting security, safety, and infrastructure.",
    quick: "Plan Da Nang nights around safe transport, walkable zones, and realistic closing times.",
    lesson: "Night travel succeeds when it feels easy and safe. Markets, bridges, riverfronts, bars, seafood areas, and beach walks all depend on lighting, transport, information, and crowd management.",
    actions: ["Check ride-hailing availability before staying far from the center.", "Keep valuables simple in crowded markets.", "Use well-lit walking routes.", "Pair night markets with nearby dinner rather than crossing the city repeatedly."],
    keywords: ["Da Nang nightlife", "night economy", "safety"]
  },
  {
    slug: "hoi-an-tourism-waste-management",
    title: "Hoi An tourism has a waste problem travelers can see",
    eyebrow: "Tourism waste systems",
    destination: "Hoi An",
    region: "central",
    sourceTitle: "Optimization of solid waste collection system in a tourism destination",
    sourceUrl: "https://doaj.org/article/d94db91325f44b4397e01e4ab4b6f1c0",
    research: "A 2022 environmental management study examined solid waste collection optimization in Hoi An, a major tourism destination.",
    quick: "In Hoi An, small traveler choices around plastic, food waste, and tours add up.",
    lesson: "Waste management is usually invisible until a destination is overloaded. Hoi An's popularity makes low-waste habits more than personal virtue; they are part of visitor responsibility.",
    actions: ["Carry a refillable bottle where refill access exists.", "Decline unnecessary plastic bags and packaging.", "Choose sit-down food over disposable-heavy snacking when practical.", "Do not leave trash on boats, beaches, or rural cycling routes."],
    keywords: ["Hoi An waste", "sustainable travel", "tourism destination management"]
  },
  {
    slug: "mekong-ecotourism-industry-satisfaction",
    title: "Mekong ecotourism should balance nature, culture, and safety",
    eyebrow: "Ecotourism industry",
    destination: "Mekong Delta",
    region: "south",
    sourceTitle: "Influences of the ecotourism industry in Mekong Delta - Vietnam: The mediating role of Tourist Satisfaction",
    sourceUrl: "https://doaj.org/article/d2825a7b722d48aea4003d5cbf9d18e2",
    research: "A 2024 study examined factors affecting the Mekong Delta ecotourism industry, including travel service, safety, nature, culture, facilities, local people, food, and experience.",
    quick: "A strong Mekong ecotourism trip combines river nature with food, local people, safety, and good operations.",
    lesson: "The Delta is not one product. It is a layered destination where boats, gardens, markets, homestays, wildlife, food, and culture need to be connected carefully.",
    actions: ["Avoid one-size-fits-all tours with unclear stops.", "Ask about safety on boats and bikes.", "Choose itineraries with local food and cultural context.", "Spend at least one night if you want more than a surface visit."],
    keywords: ["Mekong ecotourism", "tourist satisfaction", "Delta travel"]
  },
  {
    slug: "da-nang-hotel-selection-domestic-tourists",
    title: "What Da Nang hotel research teaches every traveler",
    eyebrow: "Hotel selection",
    destination: "Da Nang",
    region: "central",
    sourceTitle: "Factors affecting the selection of domestic hotels with 3/4 star ratings: Da Nang City",
    sourceUrl: "https://doaj.org/article/2d046e14dc414acd994ed16d8509c7f0",
    research: "A 2019 study analyzed survey data from 405 domestic tourists staying in 3- and 4-star hotels in Da Nang and found location, personnel service quality, and safety to be key influences.",
    quick: "For Da Nang hotels, prioritize location, staff reliability, and safety over decorative photos.",
    lesson: "A hotel can look excellent online and still create friction if the location is wrong or staff support is weak. Da Nang travelers often move between beach, city, airport, and day trips, so logistics matter.",
    actions: ["Map your top activities before choosing a hotel.", "Read reviews mentioning staff responsiveness.", "Check walkability at night.", "Compare beach access, river access, and airport timing."],
    keywords: ["Da Nang hotels", "hotel selection", "service quality"]
  },
  {
    slug: "smart-tourism-apps-vietnam",
    title: "Vietnam travelers need useful, secure tourism apps",
    eyebrow: "Smart tourism apps",
    destination: "Vietnam",
    region: "city",
    sourceTitle: "Understanding Vietnamese Tourists' Re-Browse Intentions for Smart Tourism Apps",
    sourceUrl: "https://doaj.org/article/2eeda45921c7462cb25ca3b03740c97a",
    research: "A 2025 study of 455 respondents used an extended technology acceptance model to examine smart tourism app features, e-flow, and re-browse intention among young Vietnamese tourists.",
    quick: "Use travel apps that are clear, secure, current, and easy to compare with real-world conditions.",
    lesson: "Apps shape decisions before travelers ever meet a guide or step into a hotel. Good apps reduce uncertainty; poor apps create false confidence.",
    actions: ["Use official or well-reviewed apps for transport and attractions.", "Check privacy and payment security.", "Compare app information with recent reviews.", "Save key addresses offline in case mobile data fails."],
    keywords: ["Vietnam smart tourism", "tourism apps", "travel technology"]
  },
  {
    slug: "mekong-delta-destination-information-choice",
    title: "Information is the Mekong Delta's biggest planning tool",
    eyebrow: "Destination information",
    destination: "Mekong Delta",
    region: "south",
    sourceTitle: "The impact of information on international tourists' destination choice in the Mekong Delta",
    sourceUrl: "https://doaj.org/article/33b2b00e1c3f45cfa068213aa6d613e5",
    research: "A 2025 study of 348 international tourists in Tien Giang and Can Tho found destination information had a strong impact on destination choice, attitude, and travel motivation.",
    quick: "Clear information can turn the Mekong Delta from a vague add-on into a confident itinerary choice.",
    lesson: "Many travelers know they should visit the Delta but cannot tell which province, route, or experience fits their trip. Better information turns curiosity into action.",
    actions: ["Decide whether you want floating markets, cycling, homestays, orchards, or wetlands.", "Compare Can Tho, Ben Tre, Tien Giang, and An Giang by travel time.", "Avoid choosing only by the cheapest day trip.", "Ask operators for exact stop names."],
    keywords: ["Mekong Delta information", "destination choice", "international tourists"]
  },
  {
    slug: "post-pandemic-vietnam-travel-behavior",
    title: "Post-pandemic travel behavior still affects Vietnam planning",
    eyebrow: "Travel behavior",
    destination: "Vietnam",
    region: "city",
    sourceTitle: "Travel Intention and Travel Behaviour in the Post-Pandemic Era: Evidence from Vietnam",
    sourceUrl: "https://doaj.org/article/a196cac947664611805e6d66f14adf3e",
    research: "A 2023 study collected 431 questionnaires to identify determinants of travel intention and the link between intention and behavior among Vietnamese travelers after the pandemic.",
    quick: "Travel demand can rebound faster than traveler confidence, so flexible planning still matters.",
    lesson: "Post-pandemic behavior changed how many people think about crowding, safety, flexibility, and value. Even as travel normalizes, good itineraries still protect choice.",
    actions: ["Book flexible transport when weather or health uncertainty matters.", "Avoid overloading peak holiday periods.", "Check cancellation terms before paying deposits.", "Give yourself enough rest between major transfers."],
    keywords: ["Vietnam post-pandemic travel", "travel intention", "travel behavior"]
  },
  {
    slug: "social-media-gratifications-vietnam-travel-intention",
    title: "Social media can inspire better Vietnam trips when used well",
    eyebrow: "Social media and travel",
    destination: "Vietnam",
    region: "city",
    sourceTitle: "The impact of uses and motivation gratifications on tourist behavioral intention",
    sourceUrl: "https://doaj.org/article/dd4f1b700266438ead770f221830a917",
    research: "A 2024 study used data from 590 Vietnamese tourists to examine how social media uses and gratifications affect destination image, attitudes, and behavioral intention.",
    quick: "Use social media for discovery, then verify routes, rules, seasons, and ethics before booking.",
    lesson: "Social feeds are powerful because they satisfy curiosity, entertainment, and planning needs. But they rarely show transfer fatigue, weather, crowds, or cultural expectations.",
    actions: ["Save ideas, then group them by geography.", "Check if photos are seasonal or heavily edited.", "Verify access rules and opening hours.", "Avoid copying itineraries that ignore travel time."],
    keywords: ["Vietnam social media travel", "destination image", "behavioral intention"]
  },
  {
    slug: "da-lat-virtual-reality-botanical-tourism",
    title: "Virtual reality can help travelers decide on Da Lat",
    eyebrow: "VR travel intention",
    destination: "Da Lat",
    region: "central",
    sourceTitle: "Leveraging Virtual Reality Experiences to Shape Tourists' Behavioral Intentions",
    sourceUrl: "https://doaj.org/article/accdaf1a414a404b8b3f5e37ad30c3fe",
    research: "A 2025 study explored how VR experiences influence intention to visit Da Lat as a botanical destination, with enjoyment and immersion as mediators.",
    quick: "Use immersive previews to decide whether Da Lat's gardens, climate, and scenery fit your trip.",
    lesson: "VR and rich media can reduce uncertainty, especially for destinations where the appeal is atmospheric. But they should support planning rather than replace practical checks.",
    actions: ["Use videos or VR previews to compare garden and nature experiences.", "Still check season, weather, and transport.", "Do not expect every location to match promotional visuals.", "Pair botanical sites with food and cafe time."],
    keywords: ["Da Lat VR", "botanical tourism", "travel intention"]
  },
  {
    slug: "south-central-coast-online-brand-experience",
    title: "Vietnam's South Central Coast needs credible online information",
    eyebrow: "Online destination brand",
    destination: "South Central Coast",
    region: "coast",
    sourceTitle: "The relationship between online destination brand experience and brand credibility tourists' intention towards tourist destination in the South Central Coast of Vietnam",
    sourceUrl: "https://doaj.org/article/19e59aae7140437d94401f04d06b6579",
    research: "A 2024 study examined online destination brand experience, brand credibility, and tourist intention for provinces along Vietnam's South Central Coast.",
    quick: "For lesser-known coastal stops, credible online information can be the difference between skipping and staying.",
    lesson: "The South Central Coast has strong potential, but travelers need confidence: where to stay, how to move, what beaches fit their style, and whether the destination is worth the extra stop.",
    actions: ["Compare official pages, maps, and recent reviews.", "Check transfer options before adding a coastal detour.", "Look for credible local operators.", "Choose a route that gives the coast enough time to breathe."],
    keywords: ["South Central Coast Vietnam", "online destination brand", "travel planning"]
  },
  {
    slug: "gen-y-mobile-tourism-apps-vietnam",
    title: "Trust and security matter in Vietnam travel apps",
    eyebrow: "Mobile tourism apps",
    destination: "Vietnam",
    region: "city",
    sourceTitle: "Gen-Y Behavioral intention to adopt mobile tourism apps: Extending UTAUT2 with trust and security",
    sourceUrl: "https://doaj.org/article/9cfa52d6c1b647beac6046ff3622435b",
    research: "A 2024 study of 337 Vietnam users found performance expectancy, effort expectancy, social influence, trust, and perceived security positively affected intention to use mobile tourism apps.",
    quick: "Use apps that save time without exposing you to unclear payments or unreliable listings.",
    lesson: "Travel apps are now part of the journey infrastructure. For Vietnam travelers, they can simplify rides, hotels, maps, tours, and payments, but only when trust and security are strong.",
    actions: ["Prefer widely used apps with transparent payment processes.", "Check permissions before installing unfamiliar travel apps.", "Keep backup addresses and booking references offline.", "Read recent app reviews for reliability issues."],
    keywords: ["Vietnam mobile tourism apps", "trust", "security"]
  },
  {
    slug: "pro-environmental-behavior-vietnam-destinations",
    title: "How travelers can behave better at Vietnam destinations",
    eyebrow: "Pro-environmental behavior",
    destination: "Vietnam",
    region: "north",
    sourceTitle: "Exploring the pathways to tourists' pro-environmental behavior at Vietnamese tourism destinations",
    sourceUrl: "https://doaj.org/article/0d870b3b150d47b69259c5bbe08625b2",
    research: "A 2025 study of 306 tourists examined perceived severity, perceived vulnerability, altruism, environmental attitude, personal norms, and pro-environmental behavior at Vietnam destinations.",
    quick: "Responsible Vietnam travel starts with small behaviors repeated consistently.",
    lesson: "People behave better when environmental risk feels real and personal norms are activated. Travelers do not need perfection; they need habits that reduce harm at beaches, parks, caves, rivers, and cities.",
    actions: ["Carry trash until you find a proper bin.", "Stay on marked paths in parks and heritage zones.", "Avoid feeding or touching wildlife.", "Choose refill, shared transport, and lower-waste options when practical."],
    keywords: ["Vietnam responsible travel", "pro-environmental behavior", "sustainable tourism"]
  },
  {
    slug: "generation-z-vietnam-destination-choice",
    title: "Gen Z destination choice is changing Vietnam tourism",
    eyebrow: "Gen Z travel intention",
    destination: "Vietnam",
    region: "city",
    sourceTitle: "Factors Affecting Generation Z's Intention of Choosing a Tourism Destination",
    sourceUrl: "https://doaj.org/article/1b1162514164445cb0ff6a56a820147b",
    research: "A 2024 study applied an extended Theory of Planned Behavior model to analyze factors affecting Generation Z's intention to choose a tourist destination.",
    quick: "For younger travelers, Vietnam itineraries should balance affordability, identity, shareability, and authenticity.",
    lesson: "Gen Z travelers often research socially, book flexibly, and value experiences that feel meaningful. Destinations that are only famous may be less persuasive than places that feel personal and credible.",
    actions: ["Build trips around interests, not only iconic sites.", "Verify viral recommendations with maps and recent reviews.", "Budget for experiences, not only transport and beds.", "Choose places where local culture is respected rather than consumed quickly."],
    keywords: ["Gen Z travel", "Vietnam destination choice", "travel intention"]
  },
  {
    slug: "ha-long-memorable-experience-social-media",
    title: "Ha Long Bay memories depend on more than the photo",
    eyebrow: "Ha Long revisit intention",
    destination: "Ha Long Bay",
    region: "coast",
    sourceTitle: "MTEs and revisit intention: destination attachment and sharing experiences on social media",
    sourceUrl: "https://doaj.org/article/3079cb4c843144a297fbe08da861cf8a",
    research: "A 2024 study focused on Ha Long Bay and examined memorable tourism experiences, destination attachment, social media sharing, and revisit intention.",
    quick: "Choose a Ha Long Bay cruise for the experience you want to remember, not only the deck photo.",
    lesson: "Memorable experiences come from boat quality, pacing, food, route, staff, views, weather expectations, and fellow travelers. Social sharing is only the afterglow.",
    actions: ["Compare cruise routes, not just cabin photos.", "Ask about crowd levels at activity stops.", "Check whether the itinerary uses Ha Long, Lan Ha, or Bai Tu Long Bay.", "Budget for the cruise quality you actually want."],
    keywords: ["Ha Long Bay", "memorable tourism experience", "social media"]
  },
  {
    slug: "vietnam-ewom-brand-trust-tourism",
    title: "Brand trust in Vietnam travel starts with useful reviews",
    eyebrow: "eWOM and trust",
    destination: "Vietnam",
    region: "city",
    sourceTitle: "The adoption of e-Word of mouth and brand trust in Vietnam tourism",
    sourceUrl: "https://doaj.org/article/315abf5217784f7aa52d493d0fcd5303",
    research: "A study of tourists in Ho Chi Minh City, Nha Trang, Da Nang, and Hanoi examined e-word-of-mouth adoption, brand image, and brand trust.",
    quick: "Trust travel brands that earn confidence through relevance, accuracy, and credible sources.",
    lesson: "Online recommendations are not equal. Travelers should give more weight to specific, recent, verifiable comments than to generic praise or outrage.",
    actions: ["Look for reviews that mention dates and details.", "Cross-check claims across platforms.", "Be wary of identical review language.", "Trust operators that answer questions clearly and consistently."],
    keywords: ["Vietnam eWOM", "brand trust", "tourism reviews"]
  },
  {
    slug: "binh-thuan-revisit-risk-cultural-contact",
    title: "Binh Thuan is better when travelers understand risk and culture",
    eyebrow: "Binh Thuan revisit intention",
    destination: "Binh Thuan",
    region: "coast",
    sourceTitle: "Revisit intention and satisfaction: destination image, perceived risk, and cultural contact",
    sourceUrl: "https://doaj.org/article/a562a339739f4634a9a7527f9b1bab87",
    research: "A study of 405 international tourists in Binh Thuan examined destination image, cultural contact, perceived risk, satisfaction, and revisit intention.",
    quick: "For Binh Thuan and Mui Ne-style coast trips, plan around wind, transport, culture, and safety.",
    lesson: "Beach destinations are not only sand and resorts. Perceived risk, cultural contact, accommodation, and attractiveness all shape whether travelers want to recommend or return.",
    actions: ["Check wind and water conditions for beach activities.", "Confirm transport if arriving by train or bus.", "Add local food and Cham cultural context where appropriate.", "Avoid isolated areas at night without reliable transport."],
    keywords: ["Binh Thuan travel", "perceived risk", "cultural contact"]
  },
  {
    slug: "tra-vinh-word-of-mouth-revisit",
    title: "Tra Vinh needs word of mouth that explains why to go",
    eyebrow: "Tra Vinh revisit intention",
    destination: "Tra Vinh",
    region: "south",
    sourceTitle: "Words of Mouth on Destination Images and Intentions to Revisit",
    sourceUrl: "https://doaj.org/article/cab74dc6bb83437a84b6acc112ca0874",
    research: "A 2025 study examined electronic word of mouth, destination image, and revisit intention in Tra Vinh Province, Vietnam.",
    quick: "Tra Vinh works best for travelers interested in Khmer culture, temples, food, and slower Delta routes.",
    lesson: "Emerging destinations need explanation. Word of mouth is useful when it tells travelers what makes a place distinct, who it suits, and how to visit respectfully.",
    actions: ["Research Khmer pagodas and local etiquette before visiting.", "Use Tra Vinh as a slower cultural Delta stop.", "Check transport because connections may be less obvious.", "Share specific recommendations if you have a good experience."],
    keywords: ["Tra Vinh travel", "word of mouth", "Mekong Delta culture"]
  },
  {
    slug: "ho-chi-minh-city-medical-tourism-experience",
    title: "Medical tourism in Ho Chi Minh City needs extra care",
    eyebrow: "Medical tourism",
    destination: "Ho Chi Minh City",
    region: "south",
    sourceTitle: "Medical Tourism Experience, Word of Mouth and Return Intention in Ho Chi Minh City",
    sourceUrl: "https://doaj.org/article/2a1565405c7f4e0fbb8aa7bbb0f09096",
    research: "A 2025 study examined medical tourism experience, word of mouth, and return intention in Ho Chi Minh City.",
    quick: "Medical tourism should be planned with higher standards than ordinary sightseeing.",
    lesson: "Travelers considering care abroad need verified providers, clear medical communication, recovery time, and realistic expectations. A positive trip is not only about price.",
    actions: ["Verify provider credentials independently.", "Build recovery time into the itinerary.", "Do not combine medical care with aggressive sightseeing.", "Keep records, insurance details, and emergency contacts accessible."],
    keywords: ["Ho Chi Minh City medical tourism", "return intention", "travel safety"]
  },
  {
    slug: "da-nang-gastronomy-quality-satisfaction",
    title: "Da Nang food quality shapes international visitor satisfaction",
    eyebrow: "Da Nang gastronomy",
    destination: "Da Nang",
    region: "central",
    sourceTitle: "A study of the impact of local gastronomy quality on international tourist satisfaction: Danang City, Vietnam",
    sourceUrl: "https://doaj.org/article/1e23aa49f70a4b2dad70e0964216a397",
    research: "A 2020 study surveyed 365 international tourists in Da Nang and linked gastronomy quality factors with visitor satisfaction.",
    quick: "Plan Da Nang food deliberately: local dishes, clean busy venues, seafood, and neighborhood variety.",
    lesson: "Food can become the strongest reason to remember Da Nang. But satisfaction depends on quality, price perception, service, safety, and how easy it is to understand what to order.",
    actions: ["Try mi quang, bun cha ca, seafood, and local snacks.", "Choose busy venues with clear turnover.", "Ask locals or guides for neighborhood-specific food tips.", "Balance street food with sit-down meals if food safety is a concern."],
    keywords: ["Da Nang food", "gastronomy tourism", "international tourist satisfaction"]
  },
  {
    slug: "nhon-ly-coastal-community-tourism",
    title: "Nhon Ly shows the promise and pressure of coastal community tourism",
    eyebrow: "Coastal CBT",
    destination: "Nhon Ly",
    region: "coast",
    sourceTitle: "Toward sustainable community-based tourism development: Perspectives from local people in Nhon Ly coastal community",
    sourceUrl: "https://doaj.org/article/ac8b0a88a77c4201b41f0991f67cb72b",
    research: "A 2023 PLoS ONE study explored local perspectives on tourism impacts, participation, and challenges in Nhon Ly coastal community in Binh Dinh province.",
    quick: "Visit emerging coastal communities in ways that spread value and reduce pressure.",
    lesson: "Coastal tourism can create new livelihoods, but it can also crowd beaches, raise prices, and change daily life. Local perspectives help travelers see beyond the view.",
    actions: ["Use local boats, meals, and guides where available.", "Avoid damaging reefs or dunes for photos.", "Respect fishing activity and private homes.", "Stay longer instead of rushing through a crowded beach stop."],
    keywords: ["Nhon Ly", "coastal community tourism", "Binh Dinh"]
  },
  {
    slug: "cao-bang-geopark-heritage-preservation",
    title: "Cao Bang's geopark needs travelers who respect heritage",
    eyebrow: "Geopark heritage",
    destination: "Non Nuoc Cao Bang UNESCO Global Geopark",
    region: "north",
    sourceTitle: "Balancing heritage preservation and tourism development: Non Nuoc Cao Bang UNESCO Global Geopark",
    sourceUrl: "https://doaj.org/article/b76919986955463fbcb845f8e0ebc3c0",
    research: "A 2025 study assessed heritage conservation and tourism impacts at Non Nuoc Cao Bang UNESCO Global Geopark using surveys, field data, and GIS.",
    quick: "Cao Bang is spectacular, but heritage and geopark landscapes need low-impact behavior.",
    lesson: "The destination's value is geological, cultural, historical, and rural. Travelers who only chase waterfalls miss the broader responsibility of visiting a geopark.",
    actions: ["Stay on marked paths near sensitive sites.", "Use local guides for context.", "Avoid removing rocks, plants, or artifacts.", "Spend in villages and small businesses rather than only quick viewpoint stops."],
    keywords: ["Cao Bang geopark", "heritage preservation", "Vietnam responsible travel"]
  },
  {
    slug: "sapa-community-night-tourism",
    title: "Sa Pa night tourism needs safety, culture, and infrastructure",
    eyebrow: "Sa Pa night tourism",
    destination: "Sa Pa",
    region: "north",
    sourceTitle: "Factors Affecting the Development of Community-Based Night Tourism in Vietnam: Sapa-Lao Cai",
    sourceUrl: "https://doaj.org/article/2183c8e681054ed8b91c72bb950b126a",
    research: "A 2023 study surveyed 391 tourists in Sa Pa and found environment, culture and services, infrastructure, security and safety, and policy affected community-based night tourism development.",
    quick: "Sa Pa after dark is best when travelers choose safe, respectful, locally grounded experiences.",
    lesson: "Night tourism can extend income for communities, but it must avoid turning culture into noise or spectacle. Travelers should look for experiences that feel safe and respectful.",
    actions: ["Use reliable transport after dark.", "Choose cultural activities with clear community involvement.", "Dress for mountain weather at night.", "Avoid pressuring residents or children for photos and performances."],
    keywords: ["Sa Pa night tourism", "community tourism", "Lao Cai"]
  }
];

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
  const prev = index === 0 ? "../vietnam-research-library.html" : `${articles[index - 1].slug}.html`;
  const prevText = index === 0 ? "Back to Vietnam research library" : "Previous article";
  const next = index === articles.length - 1 ? "../vietnam-research-library.html" : `${articles[index + 1].slug}.html`;
  const nextText = index === articles.length - 1 ? "Back to Vietnam research library" : "Next article";
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
        <a href="../vietnam-research-library.html">Vietnam library</a>
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
          For a real trip, the research points to a simple planning rule: do not separate the destination from
          the way the destination is experienced. Transport, timing, local contact, information quality, safety,
          service, and environmental pressure all shape whether ${escapeHtml(article.destination)} feels worth
          the time and money.
        </p>

        <h2>How to use the finding</h2>
        <ul class="checklist">
${article.actions.map((item) => `          <li>${escapeHtml(item)}</li>`).join("\n")}
        </ul>

        <p>
          The best Vietnam itineraries are not built by copying a list of famous stops. They are built by matching
          a traveler's time, energy, interests, and risk tolerance to places that can deliver a good experience
          without hiding the local costs. That is why research like this is useful: it turns abstract tourism
          concepts into better decisions before the trip begins.
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
    "@id": `${site}/vietnam-research-library.html#collection`,
    name: "Vietnam Travel Research Library",
    description: "Fifty traveler-focused Vietnam travel articles by Joy Nguyen, each based on tourism research.",
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
    <title>Vietnam Travel Research Library | Joy Nguyen</title>
    <meta
      name="description"
      content="Explore 50 research-backed Vietnam travel articles by Joy Nguyen, covering Hanoi, Hoi An, Da Nang, Hue, the Mekong Delta, national parks, food, ecotourism, and community tourism."
    />
    <meta name="author" content="Joy Nguyen" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <link rel="canonical" href="${site}/vietnam-research-library.html" />
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
        <a href="index.html#proof">Proof</a>
      </nav>
    </header>
    <main>
      <section class="article-hero">
        <div class="article-hero-text">
          <p class="eyebrow">Vietnam research library</p>
          <h1>50 research-backed Vietnam travel articles</h1>
          <p>
            A traveler-focused library translating Vietnam tourism research into practical guidance for
            itinerary planning, destination choice, responsible travel, food, ecotourism, heritage, and service quality.
          </p>
          <div class="article-meta">
            <span>By Joy Nguyen</span>
            <span>Last reviewed ${reviewed}</span>
          </div>
        </div>
        <img
          src="https://commons.wikimedia.org/wiki/Special:FilePath/Cu_%C4%90%C3%AA_River,_Da_Nang.jpg?width=1200"
          alt="Vietnam research library Wikimedia Commons travel photo"
          width="1600"
          height="1067"
        />
      </section>
      <section class="section article-section" aria-labelledby="library-title">
        <div class="section-heading">
          <p class="eyebrow">Research-backed articles</p>
          <h2 id="library-title">Vietnam travel decisions, explained by research</h2>
        </div>
        <div class="answer-box">
          <strong>Quick answer:</strong> Use this library when you need evidence-backed Vietnam planning guidance across regions, from Hanoi and the central coast to the Mekong Delta, national parks, community tourism, food, apps, and sustainable travel.
        </div>
        <div class="article-grid">
${cards}
        </div>
      </section>
      <nav class="article-nav" aria-label="Article navigation">
        <a href="index.html#research">Back to homepage research</a>
        <a href="articles/${articles[0].slug}.html">Start the Vietnam library</a>
      </nav>
    </main>
    <script src="script.js"></script>
  </body>
</html>
`;
}

function updateSitemap() {
  const existing = [
    "",
    "articles/what-travelers-want-peru.html",
    "articles/peru-tourism-recovery-planning.html",
    "articles/cusco-altitude-sickness-research.html",
    "articles/machu-picchu-circuits-sustainable-visit.html",
    "articles/raymi-llaqta-cultural-travel.html",
    "articles/vietnam-tourism-growth-planning.html",
    "articles/hanoi-revisit-intention-research.html",
    "articles/ha-long-bay-satisfaction-research.html",
    "articles/hoi-an-service-quality-research.html",
    "articles/mekong-delta-ecotourism-research.html",
    "vietnam-research-library.html",
    ...articles.map((article) => `articles/${article.slug}.html`)
  ];

  const body = existing.map((url, index) => `  <url>
    <loc>${site}/${url}</loc>
    <lastmod>${isoDate}</lastmod>
    <changefreq>${index === 0 ? "monthly" : "quarterly"}</changefreq>
    <priority>${index === 0 ? "1.0" : url === "vietnam-research-library.html" ? "0.9" : "0.8"}</priority>
  </url>`).join("\n");

  fs.writeFileSync(path.join(root, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`);
}

function updateLlms() {
  const llmsPath = path.join(root, "llms.txt");
  let text = fs.readFileSync(llmsPath, "utf8");
  const marker = "## Vietnam Research Library";
  const block = `${marker}\n\nJoy also publishes a dedicated Vietnam travel research library with 50 additional traveler-focused articles: https://joynguyenwrites.com/vietnam-research-library.html\n\n${articles.map((article) => `- ${article.title}: ${site}/articles/${article.slug}.html`).join("\n")}\n`;
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
fs.writeFileSync(path.join(root, "vietnam-research-library.html"), libraryHtml());
updateSitemap();
updateLlms();
console.log(`Generated ${articles.length} Vietnam research articles.`);
