/**
 * Uganda curriculum structure (NCDC) used to seed the database and to map
 * Fresh Teacher library feeds (https://fresh-teacher.github.io/).
 *
 * Levels → Class grades → Subjects → Topics (by term).
 *
 * Keep this file as the single source of truth for the hierarchy. Content
 * (notes & practice questions) lives in ./seed/*.ts and references subjects and
 * topics by slug.
 */

export type TopicSeed = { slug: string; name: string; term: 1 | 2 | 3; summary?: string };

export type SubjectSeed = {
  slug: string;
  name: string;
  color: string;
  icon: string;
  /** Fresh Teacher subject key(s) used in page/feed names e.g. "MTC", "Science". */
  ftKeys?: string[];
  description?: string;
  isExaminable?: boolean;
  topics: TopicSeed[];
};

export type ClassSeed = {
  slug: string;
  name: string;
  shortName: string;
  level: LevelSlug;
  order: number;
  phase: string;
  description: string;
  color: string;
  /** Fresh Teacher class key e.g. "PrimaryFour". */
  ftKey: string;
  isActive: boolean;
  subjects: SubjectSeed[];
};

export type LevelSlug = "pre-primary" | "primary" | "o-level" | "a-level" | "university";

export const LEVELS: { slug: LevelSlug; name: string; order: number; description: string }[] = [
  { slug: "pre-primary", name: "Pre-Primary", order: 1, description: "Baby, Middle and Top class — the NCDC Early Childhood learning framework." },
  { slug: "primary", name: "Primary", order: 2, description: "P.1 to P.7, from the thematic curriculum to PLE preparation." },
  { slug: "o-level", name: "Secondary O-Level", order: 3, description: "S.1 to S.4 — Lower Secondary Competency-Based Curriculum and UCE." },
  { slug: "a-level", name: "Secondary A-Level", order: 4, description: "S.5 and S.6 — UACE preparation." },
  { slug: "university", name: "University & Tertiary", order: 5, description: "Foundation and professional study resources." },
];

// ── Colour palette (one colour per subject family) ───────────────────────────
const C = {
  maths: "#4F6BED",
  english: "#E0564A",
  science: "#0E9F8A",
  sst: "#D08A1A",
  re: "#9B59B6",
  local: "#8A66D9",
  literacy: "#2E9E6B",
  reading: "#1F8FBF",
  writing: "#B55A9E",
  health: "#E07A28",
  social: "#C84B8A",
  ict: "#4A5568",
  arts: "#D26B3F",
  kiswahili: "#2C7A7B",
  packages: "#6B7280",
  general: "#3B82F6",
};

// ── Helpers ──────────────────────────────────────────────────────────────────
const t = (slug: string, name: string, term: 1 | 2 | 3, summary?: string): TopicSeed => ({ slug, name, term, summary });

const spread = (names: string[]): TopicSeed[] =>
  names.map((name, i) => t(slugify(name), name, (Math.floor((i * 3) / names.length) + 1) as 1 | 2 | 3));

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ── Pre-primary learning areas (NCDC ECD Learning Framework) ─────────────────
const prePrimarySubjects = (cls: "baby" | "middle" | "top"): SubjectSeed[] => {
  const stage = cls === "baby" ? "3 years" : cls === "middle" ? "4 years" : "5 years";
  return [
    {
      slug: "language-development", name: "Language Development", color: C.literacy, icon: "message-circle", ftKeys: ["LanguageDevelopment"],
      description: `Listening, speaking, rhymes and vocabulary for ${stage}.`,
      topics: spread(["Greetings and Names", "Rhymes and Songs", "Naming Things Around Us", "Listening to Stories", "Colours", "Parts of the Body", "Animals and Their Sounds", "Family Words", "Action Words"]),
    },
    {
      slug: "mathematical-concepts", name: "Mathematical Concepts", color: C.maths, icon: "calculator", ftKeys: ["MathemeticalConcepts", "MathematicalConcepts"],
      description: "Numbers, shapes, sorting, matching and patterns.",
      topics: spread(["Sorting and Matching", "Counting 1 to 10", "Shapes Around Us", "Big and Small", "Patterns", "Number Writing", "More and Less", "Counting to 20", "Simple Addition"]),
    },
    {
      slug: "reading", name: "Reading", color: C.reading, icon: "book-open", ftKeys: ["Reading", "Literacy"],
      description: "Letter sounds, picture reading and word recognition.",
      topics: spread(["Picture Reading", "Letter Sounds a–m", "Letter Sounds n–z", "Two-letter Words", "Three-letter Words", "Simple Sentences"]),
    },
    {
      slug: "writing", name: "Writing", color: C.writing, icon: "pen-line", ftKeys: ["Writing", "WritingTheology"],
      description: "Pre-writing patterns, tracing and letter formation.",
      topics: spread(["Scribbling and Patterns", "Tracing Lines and Curves", "Writing Letters", "Writing Numbers", "Writing My Name", "Copying Words"]),
    },
    {
      slug: "health-habits", name: "Health Habits", color: C.health, icon: "heart-pulse", ftKeys: ["HealthHabits"],
      description: "Hygiene, safety, nutrition and caring for our bodies.",
      topics: spread(["Washing Hands", "Brushing Teeth", "Healthy Foods", "Keeping Clean", "Safety at Home", "Safety at School"]),
    },
    {
      slug: "social-development", name: "Social Development", color: C.social, icon: "users", ftKeys: ["SocialDevelopment"],
      description: "Self, family, friends, manners and our community.",
      topics: spread(["Myself", "My Family", "My Friends", "Good Manners", "People Who Help Us", "Our School"]),
    },
    {
      slug: "english", name: "English", color: C.english, icon: "languages", ftKeys: ["English"],
      description: "Early English vocabulary and simple spoken sentences.",
      topics: spread(["Greetings", "Naming Objects", "Colours and Shapes", "Numbers in English", "Simple Commands", "My Body"]),
    },
    {
      slug: "general-knowledge", name: "General Knowledge", color: C.general, icon: "globe", ftKeys: ["GeneralKnowledge"], isExaminable: false,
      description: "The world around us: weather, animals, plants and places.",
      topics: spread(["Weather", "Domestic Animals", "Wild Animals", "Plants Around Us", "Means of Transport", "Our Country Uganda"]),
    },
    {
      slug: "theology", name: "Theology / Religious Education", color: C.re, icon: "sparkles", ftKeys: ["Theology"], isExaminable: false,
      description: "Stories, prayers and values.",
      topics: spread(["God Made Me", "Prayers", "Bible / Quran Stories", "Being Kind", "Sharing", "Thanking God"]),
    },
  ];
};

// ── Lower primary (P1–P3) thematic curriculum ────────────────────────────────
const lowerThemes: Record<"p1" | "p2" | "p3", string[]> = {
  p1: ["Our School", "Our Home", "Our Community", "The Human Body and Health", "Weather", "Accidents and Safety", "Living Together", "Food and Nutrition", "Transport in Our Community", "Things We Make", "Our Environment", "Peace and Security"],
  p2: ["Our School and Neighbourhood", "Our Home and Community", "Our Community", "The Human Body and Health", "Weather", "Accidents and Safety", "Living Together", "Food and Nutrition", "Transport in Our Community", "Things We Make", "Our Environment", "Peace and Security"],
  p3: ["Our Sub-county / Division", "Livelihood in Our Sub-county", "Our Environment", "Environment and Weather", "Living Things: Plants", "Living Things: Animals", "Managing Resources in Our Sub-county", "Keeping Peace in Our Sub-county", "Culture and Gender in Our Sub-county", "Health in Our Sub-county", "Basic Technology in Our Sub-county", "Energy in Our Sub-county"],
};

const themeTopics = (cls: "p1" | "p2" | "p3"): TopicSeed[] =>
  lowerThemes[cls].map((name, i) => t(`theme-${i + 1}-${slugify(name)}`, `Theme ${i + 1}: ${name}`, (Math.floor(i / 4) + 1) as 1 | 2 | 3));

const lowerMathsTopics: Record<"p1" | "p2" | "p3", string[]> = {
  p1: ["Sorting and Matching", "Numbers 1–20", "Addition within 20", "Subtraction within 20", "Shapes", "Numbers 21–99", "Measurement: Length and Mass", "Time: Days of the Week", "Money: Coins", "Patterns", "Fractions: Halves", "Data: Pictographs"],
  p2: ["Sets and Sorting", "Numbers up to 999", "Addition with Carrying", "Subtraction with Borrowing", "Multiplication: 2, 3, 5, 10", "Division as Sharing", "Fractions: Halves and Quarters", "Shapes and Lines", "Measurement: Length, Mass, Capacity", "Time: Clock and Calendar", "Money: Shopping", "Graphs: Bar Graphs"],
  p3: ["Sets", "Numbers up to 9,999 and Place Value", "Addition and Subtraction", "Multiplication Tables to 12", "Division", "Fractions", "Geometry: Shapes and Angles", "Measurement: Length, Mass, Capacity", "Time", "Money", "Algebra: Missing Numbers", "Data Handling"],
};

const lowerEnglishTopics: Record<"p1" | "p2" | "p3", string[]> = {
  p1: ["Greetings and Introductions", "Alphabet and Letter Sounds", "Naming Words (Nouns)", "Colours and Shapes", "My Body", "Action Words", "Simple Sentences", "Describing Words", "Plurals: Adding -s", "Reading Short Stories", "Days and Months", "Picture Composition"],
  p2: ["Nouns: Common and Proper", "Pronouns: I, You, He, She", "Verbs: Present Tense", "Verbs: Past Tense", "Adjectives", "Prepositions: in, on, under", "Opposites", "Plurals", "Punctuation: Capital Letters and Full Stops", "Comprehension", "Guided Composition", "Rhymes and Poems"],
  p3: ["Nouns and Articles (a, an, the)", "Pronouns", "Present and Past Tenses", "Future Tense", "Adjectives and Comparison", "Adverbs", "Prepositions", "Conjunctions: and, but, because", "Question Words", "Punctuation", "Comprehension", "Composition and Letter Writing"],
};

const lowerPrimarySubjects = (cls: "p1" | "p2" | "p3"): SubjectSeed[] => [
  { slug: "literacy-1", name: "Literacy I (Thematic)", color: C.literacy, icon: "leaf", ftKeys: ["Lit1", "Thematic"], description: "Knowledge of our environment, health, community and living together — taught through the 12 NCDC themes.", topics: themeTopics(cls) },
  { slug: "literacy-2", name: "Literacy II (Reading & Writing)", color: C.reading, icon: "book-open", ftKeys: ["Lit2", "Reading", "Writing"], description: "Reading and writing skills developed through the themes.", topics: spread(["Letter Sounds and Blends", "Reading Words and Sentences", "Reading Short Passages", "Handwriting", "Spelling", "Dictation", "Writing Sentences", "Reading Comprehension", "Writing Short Stories"]) },
  { slug: "english", name: "English", color: C.english, icon: "languages", ftKeys: ["English"], description: "Oral English, grammar, reading and writing.", topics: spread(lowerEnglishTopics[cls]) },
  { slug: "mathematics", name: "Mathematics", color: C.maths, icon: "calculator", ftKeys: ["MTC"], description: "Numbers, operations, shapes, measurement and problem solving.", topics: spread(lowerMathsTopics[cls]) },
  { slug: "religious-education", name: "Religious Education", color: C.re, icon: "sparkles", ftKeys: ["RE", "Theology"], description: "Christian and Islamic Religious Education.", topics: spread(["Creation", "My Family and God", "Prayer and Worship", "Stories of Faith", "Caring for Others", "Festivals and Celebrations"]) },
  { slug: "local-language", name: "Local Language", color: C.local, icon: "speech", ftKeys: ["Luganda", "RunyankoreRukiga"], description: "Reading and writing in the area language (Luganda, Runyankore-Rukiga and others).", isExaminable: false, topics: spread(["Greetings", "Naming Things", "Reading Words", "Writing Sentences", "Stories and Proverbs", "Songs and Rhymes"]) },
  { slug: "ict", name: "ICT", color: C.ict, icon: "monitor", ftKeys: ["ICT"], isExaminable: false, description: "Basic computer awareness.", topics: spread(["Parts of a Computer", "Using a Mouse and Keyboard", "Drawing on a Computer", "Keeping Devices Safe"]) },
  { slug: "news-and-oral-literature", name: "News & Oral Literature", color: C.arts, icon: "mic", ftKeys: ["News", "OralLiterature"], isExaminable: false, description: "Daily news, stories, riddles and rhymes.", topics: spread(["Telling News", "Riddles", "Rhymes and Songs", "Folk Stories"]) },
];

// ── Upper primary (P4–P7) ────────────────────────────────────────────────────
type Upper = 4 | 5 | 6 | 7;

const upperMaths: Record<Upper, TopicSeed[]> = {
  4: [
    t("sets", "Sets", 1), t("whole-numbers-and-place-value", "Whole Numbers and Place Value", 1), t("operations-on-whole-numbers", "Operations on Whole Numbers", 1), t("number-patterns", "Number Patterns and Sequences", 1),
    t("fractions", "Fractions", 2), t("geometry", "Geometry: Lines, Angles and Shapes", 2), t("data-handling", "Data Handling: Graphs", 2), t("measurement", "Measurement: Length, Mass and Capacity", 2),
    t("money", "Money", 3), t("time", "Time", 3), t("algebra", "Algebra: Simple Equations", 3),
  ],
  5: [
    t("sets", "Sets", 1), t("numeration-and-place-value", "Numeration Systems and Place Value", 1), t("operations-on-whole-numbers", "Operations on Whole Numbers", 1), t("number-patterns", "Number Patterns and Sequences", 1),
    t("fractions", "Fractions", 2), t("decimals-and-percentages", "Decimals and Percentages", 2), t("geometry", "Geometry: Construction and Angles", 2), t("data-handling", "Data Handling", 2), t("measurement", "Measurement: Perimeter and Area", 2),
    t("money", "Money", 3), t("time", "Time", 3), t("integers", "Integers", 3), t("algebra", "Algebra", 3), t("number-bases", "Number Bases", 3),
  ],
  6: [
    t("sets", "Sets", 1), t("numeration-and-bases", "Numeration Systems and Number Bases", 1), t("operations-on-whole-numbers", "Operations on Whole Numbers", 1), t("number-patterns", "Number Patterns and Sequences", 1),
    t("fractions-decimals-percentages", "Fractions, Decimals and Percentages", 2), t("ratio-and-proportion", "Ratio and Proportion", 2), t("geometry", "Geometry: Construction and Properties", 2), t("data-handling", "Data Handling: Mean, Mode and Median", 2), t("measurement", "Measurement: Area, Volume and Capacity", 2),
    t("money-profit-and-loss", "Money: Profit, Loss and Simple Interest", 3), t("time-distance-speed", "Time, Distance and Speed", 3), t("integers", "Integers", 3), t("algebra", "Algebra", 3),
  ],
  7: [
    t("sets", "Sets", 1), t("numeration-and-bases", "Numeration Systems and Number Bases", 1), t("operations-and-patterns", "Operations on Numbers and Number Patterns", 1), t("fractions-decimals-percentages", "Fractions, Decimals and Percentages", 1),
    t("ratio-and-proportion", "Ratio and Proportion", 2), t("geometry", "Geometry: Construction, Angles and Polygons", 2), t("data-handling", "Data Handling and Graphs", 2), t("measurement", "Measurement: Area, Volume and Circumference", 2), t("commercial-arithmetic", "Commercial Arithmetic", 2),
    t("time-distance-speed", "Time, Distance and Speed", 3), t("integers", "Integers", 3), t("algebra", "Algebra: Equations and Inequalities", 3), t("probability", "Probability", 3),
  ],
};

const upperEnglish: Record<Upper, TopicSeed[]> = {
  4: [t("nouns-and-articles", "Nouns and Articles", 1), t("pronouns", "Pronouns", 1), t("verbs-and-tenses", "Verbs and Tenses", 1), t("adjectives", "Adjectives and Comparison", 1), t("adverbs", "Adverbs", 2), t("prepositions", "Prepositions", 2), t("punctuation", "Punctuation and Capitalisation", 2), t("comprehension", "Reading Comprehension", 2), t("vocabulary", "Vocabulary: School, Home and Community", 3), t("composition", "Guided Composition", 3), t("letter-writing", "Informal Letter Writing", 3)],
  5: [t("nouns-and-articles", "Nouns, Articles and Plurals", 1), t("pronouns", "Pronouns", 1), t("verbs-and-tenses", "Verbs and Tenses", 1), t("adjectives", "Adjectives and Comparison", 1), t("adverbs", "Adverbs", 2), t("prepositions-and-conjunctions", "Prepositions and Conjunctions", 2), t("question-tags", "Question Tags", 2), t("comprehension", "Reading Comprehension", 2), t("vocabulary", "Vocabulary by Theme", 3), t("composition", "Composition Writing", 3), t("letter-writing", "Letter Writing", 3), t("punctuation", "Punctuation", 3)],
  6: [t("nouns-and-articles", "Nouns, Articles and Plurals", 1), t("pronouns", "Pronouns and Possessives", 1), t("verbs-and-tenses", "Tenses", 1), t("adjectives-and-adverbs", "Adjectives and Adverbs", 1), t("prepositions-and-conjunctions", "Prepositions and Conjunctions", 2), t("direct-and-indirect-speech", "Direct and Indirect Speech", 2), t("comprehension", "Comprehension and Summary", 2), t("vocabulary", "Vocabulary by Theme", 2), t("composition", "Composition: Narrative and Descriptive", 3), t("letter-writing", "Formal and Informal Letters", 3), t("punctuation", "Punctuation", 3), t("question-tags", "Question Tags and Rewrites", 3)],
  7: [t("nouns-and-articles", "Nouns, Articles and Plurals", 1), t("pronouns", "Pronouns", 1), t("tenses", "Tenses", 1), t("adjectives-and-adverbs", "Adjectives and Adverbs", 1), t("prepositions-and-conjunctions", "Prepositions and Conjunctions", 1), t("direct-and-indirect-speech", "Direct and Indirect Speech", 2), t("active-and-passive-voice", "Active and Passive Voice", 2), t("question-tags", "Question Tags and Sentence Rewrites", 2), t("comprehension", "Comprehension and Summary", 2), t("vocabulary", "Vocabulary by Theme", 3), t("composition", "Composition Writing", 3), t("functional-writing", "Functional Writing: Letters, Notices and Dialogues", 3)],
};

const upperScience: Record<Upper, TopicSeed[]> = {
  4: [t("weather", "Weather", 1), t("soil", "Soil", 1), t("plants", "Plants: Parts and Their Functions", 1), t("sanitation", "Sanitation and Personal Hygiene", 2), t("teeth", "Teeth and Dental Care", 2), t("water", "Water", 2), t("food-and-nutrition", "Food and Nutrition", 2), t("energy", "Energy: Heat and Light", 3), t("animals", "Animals Around Us", 3), t("common-diseases", "Common Diseases and Prevention", 3), t("materials", "Materials and Their Uses", 3)],
  5: [t("keeping-poultry", "Keeping Poultry", 1), t("insects", "Insects", 1), t("immunisation", "Immunisation and Childhood Diseases", 1), t("digestive-system", "The Digestive System", 1), t("skeletal-system", "The Skeleton and Muscles", 2), t("plant-reproduction", "Reproduction in Flowering Plants", 2), t("weather-and-climate", "Weather and Climate", 2), t("soil-erosion", "Soil Erosion and Conservation", 2), t("water-and-purification", "Water: Sources and Purification", 2), t("light-and-sound", "Energy: Light and Sound", 3), t("simple-machines", "Simple Machines", 3), t("vectors-and-diseases", "Vectors and Diseases", 3), t("accidents-and-first-aid", "Accidents and First Aid", 3)],
  6: [t("classification", "Classification of Living Things", 1), t("circulatory-system", "The Circulatory System", 1), t("respiratory-system", "The Respiratory System", 1), t("animal-reproduction", "Reproduction in Animals", 1), t("food-chains", "Living Things and Their Environment", 2), t("hiv-aids", "HIV/AIDS and Immunity", 2), t("drugs-and-medicine", "Drugs and Medicine", 2), t("matter", "Matter: Solids, Liquids and Gases", 2), t("magnetism", "Energy: Magnetism", 2), t("livestock", "Keeping Cattle, Goats and Pigs", 3), t("beekeeping", "Bee Keeping", 3), t("fish-farming", "Fish Farming", 3), t("crop-growing", "Crop Growing", 3)],
  7: [t("human-body-systems", "Human Body Systems", 1), t("excretory-system", "The Excretory System and Skin", 1), t("nervous-system", "The Nervous System and Sense Organs", 1), t("communicable-diseases", "Communicable Diseases and PHC", 1), t("plants-and-classification", "Plants: Classification and Growth", 2), t("animals-and-classification", "Animals: Classification and Adaptation", 2), t("environment-and-interdependence", "Environment and Interdependence", 2), t("matter-and-energy", "Matter and Energy", 2), t("electricity", "Electricity and Magnetism", 2), t("light-and-sound", "Light and Sound", 3), t("machines", "Simple Machines and Technology", 3), t("agriculture", "Crop and Animal Husbandry", 3), t("population-and-health", "Population, Health and Science in Society", 3)],
};

const upperSst: Record<Upper, TopicSeed[]> = {
  4: [t("our-district", "Location of Our District", 1), t("map-work", "Map Work: Symbols, Directions and Compass", 1), t("physical-features", "Physical Features of Our District", 1), t("climate-and-vegetation", "Climate and Vegetation of Our District", 2), t("people-and-occupations", "People of Our District and Their Work", 2), t("leaders", "Leaders and Services in Our District", 2), t("culture", "Culture in Our District", 3), t("resources", "Resources in Our District", 3), t("history", "History of Our District", 3)],
  5: [t("location-of-uganda", "Location and Size of Uganda", 1), t("physical-features", "Physical Features of Uganda", 1), t("climate-and-vegetation", "Climate and Vegetation of Uganda", 1), t("map-reading", "Map Reading: Grid, Scale and Symbols", 1), t("people-of-uganda", "The People of Uganda", 2), t("pre-colonial-uganda", "Pre-colonial Kingdoms and Chiefdoms", 2), t("colonial-rule", "Foreigners and Colonial Rule in Uganda", 2), t("government", "Government of Uganda", 3), t("economic-activities", "Resources and Economic Activities", 3), t("transport-and-communication", "Transport and Communication", 3), t("population", "Population of Uganda", 3)],
  6: [t("location-of-east-africa", "Location and Size of East Africa", 1), t("physical-features", "Physical Features of East Africa", 1), t("climate-and-vegetation", "Climate and Vegetation of East Africa", 1), t("people-and-settlement", "Peoples of East Africa and Migrations", 2), t("coastal-trade", "Early Visitors and Coastal Trade", 2), t("colonial-east-africa", "Colonial Rule and Independence in East Africa", 2), t("east-african-community", "The East African Community", 3), t("economic-activities", "Economic Activities in East Africa", 3), t("transport-and-trade", "Transport, Communication and Trade", 3), t("governments", "Governments of East Africa", 3)],
  7: [t("location-of-africa", "Location and Size of Africa", 1), t("physical-features", "Physical Features of Africa", 1), t("climate-and-vegetation", "Climate and Vegetation of Africa", 1), t("peoples-of-africa", "Peoples of Africa and Early Civilisations", 1), t("foreign-influence", "Foreign Influence: Explorers, Missionaries and Traders", 2), t("colonialism", "Colonialism and the Partition of Africa", 2), t("independence", "Nationalism and Independence Struggles", 2), t("post-independence", "Post-independence Africa", 2), t("regional-cooperation", "Regional Co-operation: AU, EAC, ECOWAS, SADC", 3), t("economic-development", "Economic Development in Africa", 3), t("population", "Population of Africa", 3), t("world-organisations", "Uganda and the World: UN and Commonwealth", 3)],
};

const upperRe: TopicSeed[] = spread(["God's Creation", "Faith and Worship", "Prophets and Leaders", "Values and Conduct", "Sacred Texts", "Festivals and Celebrations", "Community Life", "Service to Others", "Preparing for PLE RE"]);

const upperPrimarySubjects = (n: Upper): SubjectSeed[] => [
  { slug: "mathematics", name: "Mathematics", color: C.maths, icon: "calculator", ftKeys: ["MTC"], description: "Numbers, operations, geometry, measurement, data and problem solving.", topics: upperMaths[n] },
  { slug: "english", name: "English", color: C.english, icon: "languages", ftKeys: ["English"], description: "Grammar, vocabulary, comprehension and composition.", topics: upperEnglish[n] },
  { slug: "science", name: "Integrated Science", color: C.science, icon: "flask-conical", ftKeys: ["Science"], description: "Living things, health, matter, energy, environment and agriculture.", topics: upperScience[n] },
  { slug: "social-studies", name: "Social Studies", color: C.sst, icon: "map", ftKeys: ["SST"], description: `Geography, history and civics of ${n === 4 ? "our district" : n === 5 ? "Uganda" : n === 6 ? "East Africa" : "Africa"}.`, topics: upperSst[n] },
  { slug: "religious-education", name: "Religious Education", color: C.re, icon: "sparkles", ftKeys: ["RE", "IRE", "Theology"], description: "Christian and Islamic Religious Education.", topics: upperRe },
  { slug: "kiswahili", name: "Kiswahili", color: C.kiswahili, icon: "speech", ftKeys: ["Kiswahili"], isExaminable: false, description: "Salamu, msamiati, sarufi na mazungumzo.", topics: spread(["Salamu (Greetings)", "Nambari (Numbers)", "Familia (Family)", "Shuleni (At School)", "Vitenzi (Verbs)", "Wakati (Time)"]) },
  { slug: "ict", name: "ICT", color: C.ict, icon: "monitor", ftKeys: ["ICT"], isExaminable: false, description: "Computer basics, typing and safe use of technology.", topics: spread(["Parts of a Computer", "Keyboard and Mouse Skills", "Word Processing", "Internet Safety"]) },
  { slug: "creative-arts-and-pe", name: "Creative Arts & PE", color: C.arts, icon: "palette", ftKeys: ["Art", "PE", "Music"], isExaminable: false, description: "Music, dance, drama, art and physical education.", topics: spread(["Drawing and Colour", "Crafts", "Songs and Dance", "Games and Athletics"]) },
  { slug: "holiday-packages", name: "Holiday Packages & Mixed Papers", color: C.packages, icon: "package", ftKeys: ["Packages"], isExaminable: false, description: "Multi-subject holiday work and mixed revision sets.", topics: [] },
];

// ── Secondary (placeholders for the library; content coming incrementally) ──
const oLevelSubjects: SubjectSeed[] = [
  ["mathematics", "Mathematics", C.maths, "calculator", ["Mathematics"]], ["english", "English", C.english, "languages", ["English"]], ["biology", "Biology", C.science, "flask-conical", ["Biology"]], ["chemistry", "Chemistry", "#0F766E", "flask-conical", ["Chemistry"]], ["physics", "Physics", "#1D4ED8", "atom", ["Physics"]],
  ["geography", "Geography", C.sst, "map", ["Geography"]], ["history", "History & Political Education", "#B45309", "landmark", ["History"]], ["cre", "Christian Religious Education", C.re, "sparkles", ["CRE"]], ["ire", "Islamic Religious Education", "#7C3AED", "sparkles", ["IRE"]], ["kiswahili", "Kiswahili", C.kiswahili, "speech", ["Kiswahili"]],
  ["entrepreneurship", "Entrepreneurship", "#059669", "briefcase", ["Entrepreneurship", "Entreprenuership"]], ["agriculture", "Agriculture", "#65A30D", "leaf", ["Agriculture"]], ["ict", "ICT", C.ict, "monitor", ["ICT"]], ["literature", "Literature in English", "#BE185D", "book-open", ["Literature"]], ["art", "Art & Design", C.arts, "palette", ["Art"]],
  ["commerce", "Commerce", "#0369A1", "briefcase", ["Commerce"]], ["accounts", "Accounts", "#0369A1", "briefcase", ["Accounts"]], ["food-and-nutrition", "Nutrition & Food Technology", C.health, "utensils", ["FN"]], ["technology-and-design", "Technology & Design", "#475569", "wrench", ["TD", "TechnologyandDesign", "TechnicalDrawing"]], ["luganda", "Luganda", C.local, "speech", ["Luganda"]], ["french", "French", "#2563EB", "languages", ["French"]], ["german", "German", "#334155", "languages", ["German"]], ["arabic", "Arabic", "#047857", "languages", ["Arabic"]], ["physical-education", "Physical Education", C.arts, "dumbbell", ["PhysicalEducation"]], ["music", "Music", C.arts, "music", ["Music"]],
].map(([slug, name, color, icon, ftKeys]) => ({ slug: slug as string, name: name as string, color: color as string, icon: icon as string, ftKeys: ftKeys as string[], topics: [] }));

const aLevelSubjects: SubjectSeed[] = [
  ["general-paper", "General Paper", C.general, "newspaper", ["GeneralPaper", "GP"]], ["mathematics", "Mathematics", C.maths, "calculator", ["Mathematics"]], ["physics", "Physics", "#1D4ED8", "atom", ["Physics"]], ["chemistry", "Chemistry", "#0F766E", "flask-conical", ["Chemistry"]], ["biology", "Biology", C.science, "flask-conical", ["Biology"]],
  ["economics", "Economics", "#0369A1", "trending-up", ["Economics"]], ["geography", "Geography", C.sst, "map", ["Geography"]], ["history", "History", "#B45309", "landmark", ["History"]], ["divinity", "Divinity", C.re, "sparkles", ["Divinity", "Divity"]], ["ire", "Islamic Religious Education", "#7C3AED", "sparkles", ["IRE"]], ["literature", "Literature in English", "#BE185D", "book-open", ["Literature"]],
  ["entrepreneurship", "Entrepreneurship", "#059669", "briefcase", ["Entrepreneurship"]], ["agriculture", "Agriculture", "#65A30D", "leaf", ["Agriculture"]], ["art", "Art", C.arts, "palette", ["Art"]], ["ict", "Sub-ICT", C.ict, "monitor", ["ICT", "IPS"]], ["kiswahili", "Kiswahili", C.kiswahili, "speech", ["Kiswahili"]], ["luganda", "Luganda", C.local, "speech", ["Luganda"]], ["french", "French", "#2563EB", "languages", ["French"]], ["german", "German", "#334155", "languages", ["German"]], ["food-and-nutrition", "Foods & Nutrition", C.health, "utensils", ["FN"]], ["technical-drawing", "Technical Drawing", "#475569", "wrench", ["TD", "TechnicalDrawing"]], ["commerce", "Commerce", "#0369A1", "briefcase", ["Commerce"]], ["music", "Music", C.arts, "music", ["Music"]],
].map(([slug, name, color, icon, ftKeys]) => ({ slug: slug as string, name: name as string, color: color as string, icon: icon as string, ftKeys: ftKeys as string[], topics: [] }));

// ── Class grades ─────────────────────────────────────────────────────────────
export const CLASSES: ClassSeed[] = [
  { slug: "baby", name: "Baby Class", shortName: "Baby", level: "pre-primary", order: 1, phase: "Early years (3 yrs)", description: "Play-based learning: language, numbers, health habits and social skills.", color: "#F472B6", ftKey: "BabyClass", isActive: true, subjects: prePrimarySubjects("baby") },
  { slug: "middle", name: "Middle Class", shortName: "Middle", level: "pre-primary", order: 2, phase: "Early years (4 yrs)", description: "Building vocabulary, counting, pre-reading and pre-writing.", color: "#FB923C", ftKey: "MiddleClass", isActive: true, subjects: prePrimarySubjects("middle") },
  { slug: "top", name: "Top Class", shortName: "Top", level: "pre-primary", order: 3, phase: "School readiness (5 yrs)", description: "Getting ready for Primary One: reading, writing and number work.", color: "#FACC15", ftKey: "TopClass", isActive: true, subjects: prePrimarySubjects("top") },

  { slug: "p1", name: "Primary One", shortName: "P.1", level: "primary", order: 4, phase: "Thematic curriculum", description: "Literacy, numeracy, life skills and values learnt through 12 familiar themes.", color: "#34D399", ftKey: "PrimaryOne", isActive: true, subjects: lowerPrimarySubjects("p1") },
  { slug: "p2", name: "Primary Two", shortName: "P.2", level: "primary", order: 5, phase: "Thematic curriculum", description: "Deepening reading, writing and number skills through the themes.", color: "#2DD4BF", ftKey: "PrimaryTwo", isActive: true, subjects: lowerPrimarySubjects("p2") },
  { slug: "p3", name: "Primary Three", shortName: "P.3", level: "primary", order: 6, phase: "Thematic curriculum", description: "Final thematic year: confident reading, writing and arithmetic.", color: "#22D3EE", ftKey: "PrimaryThree", isActive: true, subjects: lowerPrimarySubjects("p3") },
  { slug: "p4", name: "Primary Four", shortName: "P.4", level: "primary", order: 7, phase: "Transition year", description: "Learners move from themes to subjects and use English as the language of instruction.", color: "#60A5FA", ftKey: "PrimaryFour", isActive: true, subjects: upperPrimarySubjects(4) },
  { slug: "p5", name: "Primary Five", shortName: "P.5", level: "primary", order: 8, phase: "Subject-based learning", description: "Building subject knowledge across Mathematics, English, Science and SST.", color: "#818CF8", ftKey: "PrimaryFive", isActive: true, subjects: upperPrimarySubjects(5) },
  { slug: "p6", name: "Primary Six", shortName: "P.6", level: "primary", order: 9, phase: "Subject-based learning", description: "Consolidating skills and starting PLE-style practice.", color: "#A78BFA", ftKey: "PrimarySix", isActive: true, subjects: upperPrimarySubjects(6) },
  { slug: "p7", name: "Primary Seven", shortName: "P.7", level: "primary", order: 10, phase: "PLE preparation", description: "Revision, past papers and mock exams for the Primary Leaving Examination.", color: "#F87171", ftKey: "PrimarySeven", isActive: true, subjects: upperPrimarySubjects(7) },

  { slug: "s1", name: "Senior One", shortName: "S.1", level: "o-level", order: 11, phase: "Lower secondary", description: "Competency-based curriculum — library resources available now.", color: "#0EA5E9", ftKey: "SeniorOne", isActive: false, subjects: oLevelSubjects },
  { slug: "s2", name: "Senior Two", shortName: "S.2", level: "o-level", order: 12, phase: "Lower secondary", description: "Competency-based curriculum — library resources available now.", color: "#0284C7", ftKey: "SeniorTwo", isActive: false, subjects: oLevelSubjects },
  { slug: "s3", name: "Senior Three", shortName: "S.3", level: "o-level", order: 13, phase: "Lower secondary", description: "Competency-based curriculum — library resources available now.", color: "#0369A1", ftKey: "SeniorThree", isActive: false, subjects: oLevelSubjects },
  { slug: "s4", name: "Senior Four", shortName: "S.4", level: "o-level", order: 14, phase: "UCE preparation", description: "UCE revision — library resources available now.", color: "#075985", ftKey: "SeniorFour", isActive: false, subjects: oLevelSubjects },
  { slug: "s5", name: "Senior Five", shortName: "S.5", level: "a-level", order: 15, phase: "Advanced level", description: "UACE subject combinations — library resources available now.", color: "#7C3AED", ftKey: "SeniorFive", isActive: false, subjects: aLevelSubjects },
  { slug: "s6", name: "Senior Six", shortName: "S.6", level: "a-level", order: 16, phase: "UACE preparation", description: "UACE revision — library resources available now.", color: "#6D28D9", ftKey: "SeniorSix", isActive: false, subjects: aLevelSubjects },
  { slug: "university", name: "University & Tertiary", shortName: "Uni", level: "university", order: 17, phase: "Higher education", description: "Foundation courses and professional study — coming soon.", color: "#334155", ftKey: "", isActive: false, subjects: [] },
];

export const PRIMARY_CLASS_SLUGS = ["p1", "p2", "p3", "p4", "p5", "p6", "p7"] as const;
export const PRE_PRIMARY_CLASS_SLUGS = ["baby", "middle", "top"] as const;

export function findClass(slug: string) {
  return CLASSES.find((c) => c.slug === slug);
}

/** Map a legacy level string such as "Primary 4" / "P7" / "P.4" to a class slug. */
export function classSlugFromLegacyLevel(level: string | null | undefined): string | null {
  if (!level) return null;
  const m = level.match(/(?:primary|p)\.?\s*(\d)/i);
  if (m) return `p${m[1]}`;
  const s = level.match(/(?:senior|s)\.?\s*(\d)/i);
  if (s) return `s${s[1]}`;
  if (/baby/i.test(level)) return "baby";
  if (/middle/i.test(level)) return "middle";
  if (/top/i.test(level)) return "top";
  return null;
}

/** Map a legacy subject string to a subject slug for a given class. */
export function subjectSlugFromLegacy(subject: string | null | undefined, classSlug: string): string {
  const cls = findClass(classSlug);
  const s = (subject ?? "").toLowerCase();
  if (!cls) return "mathematics";
  if (/math|mtc|numer/.test(s)) return "mathematics";
  if (/eng/.test(s)) return "english";
  if (/sci/.test(s)) return cls.subjects.some((x) => x.slug === "science") ? "science" : "literacy-1";
  if (/sst|social/.test(s)) return cls.subjects.some((x) => x.slug === "social-studies") ? "social-studies" : "literacy-1";
  if (/re|relig|cre|ire|theolog/.test(s)) return "religious-education";
  if (/mixed|package|holiday|all/.test(s)) return cls.subjects.some((x) => x.slug === "holiday-packages") ? "holiday-packages" : "mathematics";
  return cls.subjects[0]?.slug ?? "mathematics";
}
