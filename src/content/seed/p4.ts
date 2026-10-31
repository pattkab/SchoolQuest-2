import { ClassContent, mcq, fill, num, short, tf, long, comp, draw, match } from "./types";

export const p4: ClassContent = {
  class: "p4",
  subjects: [
    {
      subject: "mathematics",
      topics: [
        {
          topic: "whole-numbers-and-place-value",
          notes: [{
            title: "Whole Numbers and Place Value (up to 99,999)",
            summary: "Read, write, order and round whole numbers; understand place value and total value.",
            minutes: 8,
            content: `# Whole Numbers and Place Value

## Place value chart
| Ten thousands | Thousands | Hundreds | Tens | Ones |
|---|---|---|---|---|
| 4 | 7 | 2 | 5 | 9 |

The number **47,259** is read as *forty-seven thousand, two hundred fifty-nine*.

- **Place value** of 7 is **Thousands**.
- **Value (total value)** of 7 is 7 × 1,000 = **7,000**.

## Expanded form
47,259 = 40,000 + 7,000 + 200 + 50 + 9
or (4 × 10,000) + (7 × 1,000) + (2 × 100) + (5 × 10) + (9 × 1)

## Writing numbers in words and figures
- 8,046 → *eight thousand forty-six*
- *Thirty thousand five hundred* → 30,500 (remember the zeros!)

## Comparing and ordering
Compare digits from the **left**. 23,450 > 23,045 because 4 hundreds > 0 hundreds.
- Ascending = smallest to largest. Descending = largest to smallest.

## Rounding off
Look at the digit to the **right** of the place you are rounding to. If it is **5 or more**, round **up**; if **less than 5**, keep.
- 6,748 to the nearest ten → **6,750**
- 6,748 to the nearest hundred → **6,700**
- 6,748 to the nearest thousand → **7,000**

## Roman numerals
I = 1, V = 5, X = 10, L = 50, C = 100.
- 14 = XIV, 29 = XXIX, 46 = XLVI, 99 = XCIX.
- Rule: a smaller numeral **before** a larger one is **subtracted** (IV = 4); **after** it is **added** (VI = 6).

## Even, odd, prime
- **Even** numbers end in 0, 2, 4, 6, 8. **Odd** end in 1, 3, 5, 7, 9.
- A **prime** number has exactly two factors (1 and itself): 2, 3, 5, 7, 11, 13, 17, 19, 23, 29 ...
`,
          }],
          quiz: {
            questions: [
              mcq("What is the place value of 6 in 36,482?", ["Hundreds", "Thousands", "Ten thousands", "Tens"], "Thousands"),
              num("What is the value of the digit 8 in 58,214?", 8000),
              short("Write 70,305 in words.", "Seventy thousand three hundred five", ["seventy thousand, three hundred and five", "seventy thousand three hundred and five", "seventy thousand, three hundred five"]),
              num("Write 'forty-two thousand, six hundred' in figures.", 42600),
              num("Round off 3,864 to the nearest hundred.", 3900),
              num("Round off 7,245 to the nearest ten.", 7250),
              mcq("Which number is the largest?", ["45,678", "45,876", "45,687", "45,768"], "45,876"),
              fill("Write XLIV in Hindu-Arabic numerals.", ["44"]),
              fill("Write 29 in Roman numerals.", ["XXIX"]),
              mcq("Which of these is a prime number?", ["9", "15", "17", "21"], "17", "17 has only two factors: 1 and 17."),
              short("Write 5,037 in expanded form.", "5,000 + 0 + 30 + 7", ["5000 + 30 + 7", "5,000 + 30 + 7", "5000+30+7"]),
              num("What is the smallest 4-digit number you can form using the digits 7, 0, 3 and 5 once each?", 3057, "Zero cannot be first, so start with 3, then 0, 5, 7."),
            ],
          },
        },
        {
          topic: "fractions",
          notes: [{
            title: "Fractions",
            summary: "Naming fractions, equivalent fractions, comparing, and adding/subtracting fractions with the same denominator.",
            minutes: 8,
            content: `# Fractions

A fraction is **part of a whole**. In ¾, the **3** is the **numerator** (parts taken) and **4** is the **denominator** (equal parts the whole is divided into).

## Types
- **Proper**: numerator smaller than denominator — ⅔, ⅝
- **Improper**: numerator bigger — 7/4, 9/5
- **Mixed number**: whole number + fraction — 1¾

## Changing between improper and mixed
- 7/4 → 7 ÷ 4 = 1 remainder 3 → **1¾**
- 2⅓ → (2 × 3 + 1)/3 = **7/3**

## Equivalent fractions
Multiply or divide **both** top and bottom by the same number.
½ = 2/4 = 3/6 = 4/8 = 5/10

**Simplifying (lowest terms):** divide by the HCF. 8/12 → ÷4 → **⅔**

## Comparing fractions
- **Same denominator:** bigger numerator is bigger. 5/7 > 3/7.
- **Same numerator:** smaller denominator is bigger. ⅓ > ⅕ (a cake cut into 3 pieces gives bigger pieces than 5).
- Otherwise make denominators the same: ⅔ vs ¾ → 8/12 vs 9/12 → **¾ is bigger**.

## Adding and subtracting (same denominator)
Add or subtract the **numerators** only.
- 2/7 + 3/7 = **5/7**
- 6/9 − 2/9 = 4/9

## Fraction of a quantity
⅓ of 24 = 24 ÷ 3 = **8**
¾ of 20 = (20 ÷ 4) × 3 = **15**
`,
          }],
          quiz: {
            questions: [
              mcq("In the fraction 5/8, which number is the denominator?", ["5", "8", "13", "3"], "8"),
              fill("Write an equivalent fraction for ½ with denominator 10.", ["5/10"]),
              fill("Simplify 6/9 to its lowest terms.", ["2/3"]),
              mcq("Which fraction is bigger?", ["2/5", "2/3", "2/7", "2/9"], "2/3", "Same numerator → smaller denominator is bigger."),
              fill("Change 9/4 to a mixed number.", ["2 1/4", "2¼"]),
              fill("Change 3⅖ to an improper fraction.", ["17/5"]),
              fill("Work out 3/8 + 4/8.", ["7/8"]),
              num("Find ¾ of 32.", 24),
              num("There are 30 pupils in a class and ⅖ of them are boys. How many boys are there?", 12),
              fill("Work out 7/10 − 3/10 (simplify your answer).", ["2/5", "4/10"]),
              draw("Shade ⅗ of a rectangle divided into 5 equal parts.", "A rectangle split into 5 equal parts with exactly 3 shaded."),
            ],
          },
        },
        {
          topic: "money",
          quiz: {
            title: "Money practice",
            questions: [
              num("Amina bought a book at UGX 3,500 and a pen at UGX 800. How much did she spend in total (UGX)?", 4300),
              num("A loaf of bread costs UGX 4,500. How much change do you get from UGX 5,000?", 500),
              num("One exercise book costs UGX 1,200. Find the cost of 6 exercise books (UGX).", 7200),
              num("Mother gave Kato UGX 10,000. He bought 3 pencils at UGX 500 each. How much money remained (UGX)?", 8500),
              num("A trader bought a hen at UGX 15,000 and sold it at UGX 18,000. What was the profit (UGX)?", 3000),
              mcq("Which of these is the currency of Uganda?", ["Dollar", "Shilling", "Rand", "Franc"], "Shilling"),
              num("If 4 mangoes cost UGX 2,000, how much does one mango cost (UGX)?", 500),
              long("Complete the shopping bill: 2 kg of sugar at UGX 4,000 per kg, 3 bars of soap at UGX 2,500 each, and 1 litre of cooking oil at UGX 7,000. Find the total.", "Sugar 8,000 + soap 7,500 + oil 7,000 = UGX 22,500. 1 mark per line, 1 for total.", 4),
            ],
          },
        },
      ],
    },
    {
      subject: "english",
      topics: [
        {
          topic: "nouns-and-articles",
          notes: [{
            title: "Nouns and Articles",
            summary: "Common, proper, collective and abstract nouns; singular and plural; using a, an and the.",
            minutes: 7,
            content: `# Nouns

A **noun** is a naming word — a person, place, animal, thing or idea.

## Kinds of nouns
| Kind | Meaning | Examples |
|---|---|---|
| **Common** | general names | boy, town, dog, book |
| **Proper** | special names, begin with a **capital letter** | Musa, Kampala, Monday, River Nile |
| **Collective** | a group | a *herd* of cattle, a *flock* of birds, a *swarm* of bees, a *bunch* of keys, a *class* of pupils |
| **Abstract** | things you cannot touch | happiness, kindness, honesty |

## Singular and plural
| Rule | Singular → Plural |
|---|---|
| add **-s** | book → books |
| add **-es** after s, x, ch, sh | box → boxes, church → churches |
| consonant + y → **-ies** | baby → babies (but *boy → boys*) |
| f / fe → **-ves** | leaf → leaves, knife → knives (but *roof → roofs*) |
| o → **-oes** | potato → potatoes, mango → mangoes (but *photo → photos*) |
| irregular | man → men, child → children, tooth → teeth, foot → feet, mouse → mice, sheep → sheep |

## Articles
- **a** before a consonant sound: *a cup, a university, a one-eyed man*
- **an** before a vowel sound: *an egg, an hour, an umbrella, an honest boy*
- **the** for a particular thing or something already mentioned: *the sun, the book I bought*
`,
          }],
          quiz: {
            questions: [
              mcq("Which of these is a proper noun?", ["river", "Kampala", "teacher", "school"], "Kampala"),
              fill("Give the plural of 'child'.", ["children"]),
              fill("Give the plural of 'knife'.", ["knives"]),
              fill("Give the plural of 'mango'.", ["mangoes", "mangos"]),
              fill("Give the plural of 'tooth'.", ["teeth"]),
              fill("Give the plural of 'baby'.", ["babies"]),
              mcq("Choose the correct article: She ate ______ orange.", ["a", "an", "the", "no article"], "an"),
              mcq("Choose the correct article: He is ______ honest boy.", ["a", "an", "the", "some"], "an", "'Honest' starts with a vowel SOUND because the h is silent."),
              fill("Complete the collective noun: a ______ of bees.", ["swarm"]),
              fill("Complete the collective noun: a ______ of cattle.", ["herd"]),
              mcq("Which word is an abstract noun?", ["table", "kindness", "dog", "Kampala"], "kindness"),
              fill("Give the plural of 'sheep'.", ["sheep"]),
            ],
          },
        },
        {
          topic: "verbs-and-tenses",
          quiz: {
            title: "Verbs and tenses practice",
            questions: [
              fill("Use the correct form: Every day my mother ______ (cook) supper.", ["cooks"]),
              fill("Yesterday we ______ (go) to the market.", ["went"]),
              fill("Look! The baby ______ (cry).", ["is crying"]),
              fill("Tomorrow the pupils ______ (visit) the zoo.", ["will visit", "shall visit", "are going to visit"]),
              fill("Last week Okello ______ (eat) a big mango.", ["ate"]),
              mcq("Choose the correct sentence.", ["She go to school every day.", "She goes to school every day.", "She going to school every day.", "She gone to school every day."], "She goes to school every day."),
              fill("The sun ______ (rise) in the east.", ["rises"]),
              fill("The dog ______ (bark) loudly last night.", ["barked"]),
              fill("Give the past tense of 'write'.", ["wrote"]),
              fill("Give the past tense of 'run'.", ["ran"]),
            ],
          },
        },
        {
          topic: "comprehension",
          quiz: {
            title: "Comprehension: Market Day",
            questions: (() => {
              const passage = `Every Saturday, Nakato goes to the market with her mother. They wake up early and walk for thirty minutes to reach Nakasero market. The market is full of people selling tomatoes, onions, bananas and fish.

Nakato's mother sells pineapples. She grows them on their small farm in Mukono. Nakato helps her mother to arrange the pineapples on a wooden table. She also counts the money when customers pay.

At midday, they eat chapati and drink juice. Nakato likes market day because she learns how to count money and meet many people. When they go home in the evening, her mother always buys her a sweet for working hard.`;
              return [
                comp(passage, "On which day does Nakato go to the market?", "Saturday", ["every Saturday", "on Saturday"]),
                comp(passage, "How long do they walk to reach the market?", "Thirty minutes", ["30 minutes", "half an hour"]),
                comp(passage, "What does Nakato's mother sell?", "Pineapples"),
                comp(passage, "Where does Nakato's mother grow the pineapples?", "On their small farm in Mukono", ["Mukono", "on their farm in Mukono", "their farm"]),
                comp(passage, "Give two ways Nakato helps her mother.", "She arranges the pineapples on the table and counts the money.", ["arranges pineapples and counts money", "arranging pineapples", "counting money", "she arranges the pineapples", "she counts the money"]),
                comp(passage, "What do they eat at midday?", "Chapati and juice", ["chapati", "chapati and drink juice"]),
                comp(passage, "Why does Nakato like market day?", "Because she learns how to count money and meets many people.", ["she learns to count money", "she meets many people", "learns how to count money and meet many people"]),
                comp(passage, "What does her mother buy her in the evening?", "A sweet", ["sweet", "sweets"]),
              ];
            })(),
          },
        },
      ],
    },
    {
      subject: "science",
      topics: [
        {
          topic: "soil",
          notes: [{
            title: "Soil",
            summary: "What soil is made of, the three main types of soil, and how to keep soil fertile.",
            minutes: 7,
            content: `# Soil

**Soil** is the top layer of the earth in which plants grow. It is formed when **rocks break down** (weathering) and mix with **humus** (rotten plants and animals).

## Components of soil
1. **Rock particles** (sand, silt, clay) — the skeleton of soil
2. **Humus** — gives soil its dark colour and nutrients
3. **Water**
4. **Air**
5. **Living organisms** — earthworms, bacteria, termites

> Experiment: shake soil in a jar of water and leave it to settle. Heavy sand sinks first, then silt, clay on top, and humus **floats**. Bubbles show that soil contains **air**.

## Types of soil
| Soil | Particles | Water | Fertility | Uses |
|---|---|---|---|---|
| **Sandy** | large, loose, gritty | drains very fast | low | building, glass making |
| **Clay** | very small, sticky | holds water, poor drainage, cracks when dry | medium | pottery, bricks, tiles |
| **Loam** | mixture of sand, clay and humus | holds enough water, drains well | **highest — best for crops** | farming |

## Soil and plants
Plants get **water** and **mineral salts** from soil, and roots get a firm **anchor**. Earthworms make tunnels that let in air and water.

## Soil erosion
The **washing or blowing away** of top soil by water, wind or animals. Causes: over-grazing, bush burning, deforestation, poor farming on slopes.

**Controlling erosion and keeping soil fertile:**
- Plant trees (afforestation) and grass cover
- Terracing and contour ploughing on hills
- Mulching (covering soil with dry grass)
- Crop rotation and adding manure or compost
- Avoid over-grazing and bush burning
`,
          }],
          quiz: {
            questions: [
              mcq("Which type of soil is best for growing crops?", ["Sandy soil", "Clay soil", "Loam soil", "Gravel"], "Loam soil"),
              short("Name the component of soil that gives it a dark colour and makes it fertile.", "Humus"),
              mcq("Which soil is used for making pots and bricks?", ["Sandy", "Clay", "Loam", "Stony"], "Clay"),
              short("Give one way of controlling soil erosion.", "Planting trees / mulching / terracing / crop rotation.", ["planting trees", "mulching", "terracing", "crop rotation", "contour ploughing", "planting grass", "afforestation", "avoid over-grazing"]),
              tf("Sandy soil holds water for a long time.", false, "Sandy soil drains water very fast."),
              short("What happens when soil is shaken in water and bubbles come out? What does this show?", "Soil contains air.", ["it shows soil has air", "there is air in soil", "air"]),
              short("Name one living organism found in soil that helps to make it fertile.", "Earthworm", ["earthworms", "termites", "bacteria", "ants"]),
              fill("The washing away of top soil by water or wind is called soil ______.", ["erosion"]),
              short("Why do farmers practise mulching?", "To keep moisture in the soil, control weeds and add humus when the mulch rots.", ["to keep water in the soil", "to conserve moisture", "to control weeds", "to prevent evaporation", "to add humus"]),
              long("Describe an experiment to show that soil contains water.", "Heat soil in a tin/test tube with a cold lid or glass above it. Water droplets form on the cold surface (condensation), showing soil contains water. Marks: apparatus (1), method (1), observation (1), conclusion (1).", 4),
            ],
          },
        },
        {
          topic: "sanitation",
          quiz: {
            title: "Sanitation and personal hygiene",
            questions: [
              short("What is personal hygiene?", "Keeping our body clean.", ["keeping the body clean", "keeping ourselves clean", "cleanliness of the body"]),
              mcq("Which of these is a good hygiene practice?", ["Sharing a toothbrush", "Washing hands after visiting the latrine", "Eating food from the floor", "Drinking unboiled water"], "Washing hands after visiting the latrine"),
              short("Give one reason why we should brush our teeth after meals.", "To remove food particles that cause tooth decay / to prevent bad breath.", ["to prevent tooth decay", "to remove food particles", "to prevent bad breath", "to keep teeth clean", "to prevent dental caries"]),
              short("Name one disease caused by poor sanitation.", "Cholera", ["typhoid", "dysentery", "diarrhoea", "bilharzia", "worms"]),
              short("Give one way of making water safe for drinking.", "Boiling", ["boil it", "filtering", "using water guard", "chlorination", "boiling it"]),
              short("Why should a latrine be built far from a water source?", "To prevent faeces from contaminating the water.", ["to avoid contaminating water", "so that germs do not enter the water", "to prevent diseases", "to avoid polluting the water source"]),
              mcq("Which item should every latrine have to keep flies away?", ["A window", "A cover/lid on the hole", "A radio", "A carpet"], "A cover/lid on the hole"),
              short("Name two things we need to wash our hands properly.", "Clean water and soap", ["water and soap", "soap and water", "soap and clean water"]),
              short("Give one way of keeping our school compound clean.", "Sweeping / picking rubbish / using a rubbish pit.", ["sweeping", "slashing", "picking rubbish", "using dustbins", "burning rubbish in a pit", "collecting rubbish"]),
              fill("A ______ is a hole in the ground where rubbish is thrown and later burnt or covered.", ["rubbish pit", "compost pit"]),
            ],
          },
        },
      ],
    },
    {
      subject: "social-studies",
      topics: [
        {
          topic: "map-work",
          notes: [{
            title: "Map Work: Symbols, Directions and the Compass",
            summary: "Read simple maps, use the eight compass points, and understand symbols and the key.",
            minutes: 7,
            content: `# Map Work

A **map** is a drawing of a place as seen from above. A **picture** shows a side view; a **plan** shows a small area from above; a **map** shows a large area.

## Elements of a good map
1. **Title** — what the map shows
2. **Key (legend)** — explains the symbols
3. **Compass direction** — usually an arrow pointing north
4. **Scale** — how much smaller the map is than the real place
5. **Frame / border**

## Common map symbols
- School ⛪→ (building with flag) · Hospital **+** · Church **†** · Mosque ☪
- River — wavy blue line · Road — double line · Railway — line with crossbars
- Bridge — road crossing a river · Swamp — tufts of grass · Hill — contour rings

## The compass
The **4 cardinal points**: **North (N), East (E), South (S), West (W)**.
Remember clockwise: *Never Eat Soggy Waffles*.

The **4 intermediate points**: **North-East (NE), South-East (SE), South-West (SW), North-West (NW)**.

- The sun **rises in the east** and **sets in the west**.
- If you face north, east is on your **right** and west on your **left**.

## Finding direction on a map
"The school is to the **south-west** of the market" means: start at the market, move down (south) and left (west) to reach the school.

## Uses of maps
Finding places, planning journeys, showing distribution of things (crops, population), finding directions, storing information.
`,
          }],
          quiz: {
            questions: [
              mcq("What do we call the part of a map that explains the symbols?", ["Title", "Key", "Scale", "Frame"], "Key"),
              short("In which direction does the sun rise?", "East"),
              mcq("Which compass point is between North and East?", ["North-West", "South-East", "North-East", "South-West"], "North-East"),
              short("If you face north, which direction is on your right?", "East"),
              short("What is a map?", "A drawing of a place as seen from above.", ["a drawing of a place from above", "drawing of an area as seen from above", "representation of a place on paper as seen from above"]),
              short("Give one use of maps.", "Finding places / showing directions / planning journeys.", ["finding places", "showing direction", "planning journeys", "locating places", "showing distribution of things", "to find direction"]),
              mcq("Which symbol usually shows a hospital on a map?", ["A plus sign (+)", "A circle", "A triangle", "A wavy line"], "A plus sign (+)"),
              fill("The opposite of North-West is ______.", ["South-East", "south east", "SE"]),
              short("Name the four cardinal points of the compass.", "North, East, South, West", ["north, south, east, west", "N, E, S, W", "north east south west"]),
              draw("Draw a compass showing the four cardinal points.", "A cross/star with N at top, S at bottom, E on the right and W on the left."),
            ],
          },
        },
        {
          topic: "leaders",
          quiz: {
            title: "Leaders and services in our district",
            questions: [
              short("Who is the political head of a district in Uganda?", "The LC5 Chairperson (District Chairperson)", ["LC5 chairperson", "LC V chairperson", "district chairperson", "LCV chairman", "LC5 chairman"]),
              short("Who is the head of the civil servants in a district?", "The Chief Administrative Officer (CAO)", ["CAO", "Chief Administrative Officer"]),
              short("Who represents the President in a district?", "The Resident District Commissioner (RDC)", ["RDC", "Resident District Commissioner"]),
              mcq("Which local council is in charge of a village?", ["LC1", "LC3", "LC5", "LC2"], "LC1"),
              mcq("Which local council is in charge of a sub-county?", ["LC1", "LC2", "LC3", "LC4"], "LC3"),
              short("Give one quality of a good leader.", "Honesty", ["honest", "fair", "hardworking", "responsible", "kind", "respectful", "trustworthy", "patient"]),
              short("Give one social service provided by the district.", "Health services / education / roads / clean water.", ["health", "education", "roads", "water", "security", "hospitals", "schools", "clean water"]),
              short("Who is the head of a school?", "The head teacher", ["headteacher", "headmaster", "headmistress", "head teacher"]),
              short("Give one duty of the police.", "Keeping law and order / protecting people and property / arresting criminals.", ["keeping law and order", "arresting criminals", "protecting people", "controlling traffic", "maintaining peace", "protecting property"]),
              match("Match the leader to the area they lead.", [["LC1 Chairperson", "Village"], ["LC3 Chairperson", "Sub-county"], ["LC5 Chairperson", "District"], ["Head teacher", "School"]]),
            ],
          },
        },
      ],
    },
  ],
};
