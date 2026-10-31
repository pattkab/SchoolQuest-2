import { ClassContent, mcq, fill, num, short, tf, long, comp, draw } from "./types";

export const p6: ClassContent = {
  class: "p6",
  subjects: [
    {
      subject: "mathematics",
      topics: [
        {
          topic: "ratio-and-proportion",
          notes: [{
            title: "Ratio and Proportion",
            summary: "Simplify ratios, share quantities in a given ratio, and solve direct and inverse proportion problems.",
            minutes: 9,
            content: `# Ratio

A **ratio** compares two or more quantities of the **same kind**. 3 : 5 is read "three to five".

## Simplifying
Divide by the HCF: 12 : 18 → ÷6 → **2 : 3**.
Make units the same first: 50 cm : 2 m = 50 : 200 = **1 : 4**.

## Sharing in a given ratio
Share UGX 56,000 between Aber and Okot in the ratio 3 : 4.
- Total parts = 3 + 4 = 7. One part = 56,000 ÷ 7 = 8,000.
- Aber = 3 × 8,000 = **UGX 24,000**; Okot = 4 × 8,000 = **UGX 32,000**.

## Finding a quantity from a ratio
Boys : girls = 5 : 3. There are 15 boys. Girls = 15 ÷ 5 × 3 = **9**.

## Increasing or decreasing in a ratio
Increase 40 in the ratio 5 : 4 → 40 × 5/4 = **50**.
Decrease 60 in the ratio 2 : 3 → 60 × 2/3 = **40**.

---

# Proportion

## Direct proportion
When one quantity increases, the other increases at the **same rate**.
*5 books cost UGX 15,000. Find the cost of 8 books.*
1 book = 3,000 → 8 books = **UGX 24,000** (unitary method).

## Inverse proportion
When one increases, the other **decreases**.
*6 men dig a trench in 10 days. How long will 4 men take?*
Total work = 6 × 10 = 60 man-days → 60 ÷ 4 = **15 days**.

## Scale (ratio on maps)
Scale 1 : 50,000 means 1 cm on the map = 50,000 cm = **500 m** on the ground.
A road 6 cm long on the map = 6 × 500 m = **3 km**.
`,
          }],
          quiz: {
            questions: [
              fill("Simplify the ratio 24 : 36.", ["2:3", "2 : 3"]),
              fill("Express 75 cm : 3 m as a ratio in its simplest form.", ["1:4", "1 : 4"]),
              num("Share UGX 45,000 between Jane and Mary in the ratio 2 : 3. How much does Mary get (UGX)?", 27000),
              num("The ratio of boys to girls in a class is 4 : 5. If there are 20 boys, how many girls are there?", 25),
              num("Increase 36 in the ratio 7 : 4.", 63),
              num("Decrease 90 in the ratio 3 : 5.", 54),
              num("3 pens cost UGX 2,400. Find the cost of 7 pens (UGX).", 5600),
              num("8 workers can build a wall in 12 days. How many days will 6 workers take?", 16),
              num("A map has a scale of 1 : 100,000. A river is 7 cm long on the map. Find its actual length in km.", 7),
              num("A car uses 6 litres of fuel for 90 km. How far can it travel on 10 litres (km)?", 150),
              long("Musa, Amos and Joy shared UGX 120,000 in the ratio 2 : 3 : 5. How much more did Joy get than Musa?", "Total parts 10; one part 12,000. Joy 60,000; Musa 24,000; difference UGX 36,000. Marks: total parts (1), one part (1), shares (1), difference (1).", 4),
            ],
          },
        },
        {
          topic: "data-handling",
          notes: [{
            title: "Data Handling: Mean, Mode, Median and Graphs",
            summary: "Averages, range, and reading and drawing bar graphs, pie charts and line graphs.",
            minutes: 8,
            content: `# Data Handling

## Measures of central tendency
Marks scored by 7 pupils: 6, 8, 5, 8, 9, 4, 9

| Measure | How to find it | Here |
|---|---|---|
| **Mean (average)** | sum ÷ number of items | 49 ÷ 7 = **7** |
| **Mode** | most frequent value | **8 and 9** (bimodal) |
| **Median** | middle value after arranging in order (4, 5, 6, **8**, 8, 9, 9) | **8** |
| **Range** | largest − smallest | 9 − 4 = **5** |

> With an **even** number of items, the median is the **mean of the two middle values**.

### Finding a missing value from the mean
The mean of 5 numbers is 12. Four of them are 10, 14, 9 and 15. Find the fifth.
Total = 5 × 12 = 60. Sum of four = 48. Fifth = **12**.

## Bar graphs
Bars of equal width, equal gaps, a title, labelled axes and a uniform scale.

## Pie charts
A full circle = **360°** = the whole.
If 60 pupils were surveyed and 15 like football: angle = 15/60 × 360° = **90°**.
To go from an angle back to a number: 72° out of 360° of 60 pupils = 72/360 × 60 = **12 pupils**.

## Line graphs
Show change over time (e.g. temperature during a day). Join the points with straight lines.

## Probability (introduction)
Probability = favourable outcomes ÷ total outcomes.
A bag has 3 red and 5 blue balls. P(red) = 3/8.
`,
          }],
          quiz: {
            questions: [
              num("Find the mean of 12, 15, 9, 20 and 14.", 14),
              num("Find the median of 7, 3, 9, 12, 5.", 7),
              num("Find the mode of 2, 5, 3, 5, 7, 5, 2.", 5),
              num("Find the range of 23, 17, 31, 12, 28.", 19),
              num("The mean of 4 numbers is 15. Three of the numbers are 12, 18 and 10. Find the fourth number.", 20),
              num("Find the median of 4, 8, 10, 14 (even number of values).", 9),
              num("In a pie chart showing how 90 pupils travel to school, 30 pupils walk. What angle represents those who walk (degrees)?", 120),
              num("A pie chart has a sector of 60° representing pupils who like maize out of a total of 72 pupils. How many pupils like maize?", 12),
              num("A bag contains 4 green and 6 yellow balls. What is the probability of picking a green ball? (Enter as a decimal.)", 0.4),
              mcq("Which graph is best for showing how temperature changes during a day?", ["Bar graph", "Pie chart", "Line graph", "Pictograph"], "Line graph"),
              long("The marks of 10 pupils were: 45, 60, 55, 70, 60, 80, 65, 60, 50, 75. Find (a) the mode, (b) the median, (c) the mean.", "Mode = 60. Ordered: 45,50,55,60,60,60,65,70,75,80 → median = (60+60)/2 = 60. Mean = 620/10 = 62. 1 mark mode, 2 marks median (ordering + value), 1 mark mean.", 4),
            ],
          },
        },
      ],
    },
    {
      subject: "english",
      topics: [
        {
          topic: "direct-and-indirect-speech",
          quiz: {
            title: "Reported speech practice",
            questions: [
              short("Change to indirect speech: \"I am hungry,\" said Tom.", "Tom said that he was hungry.", ["Tom said he was hungry"]),
              short("Change to indirect speech: \"We will visit you next week,\" they said.", "They said that they would visit us the following week.", ["They said they would visit us the following week", "They said that they would visit us the next week"]),
              short("Change to indirect speech: \"Do you like mangoes?\" she asked me.", "She asked me if I liked mangoes.", ["She asked me whether I liked mangoes", "She asked if I liked mangoes"]),
              short("Change to indirect speech: \"Close the door,\" the teacher told Peter.", "The teacher told Peter to close the door.", ["The teacher told Peter to close the door"]),
              short("Change to indirect speech: \"I have finished my work,\" Jane said.", "Jane said that she had finished her work.", ["Jane said she had finished her work"]),
              mcq("\"Where are you going?\" Mother asked. → Mother asked ______.", ["where I was going", "where was I going", "where am I going", "where I am going"], "where I was going"),
              short("Change to direct speech: He said that he was reading a book.", "He said, \"I am reading a book.\"", ["\"I am reading a book,\" he said.", "He said, \"I am reading a book\""]),
              short("Change to indirect speech: \"Don't run in the corridor,\" the prefect told us.", "The prefect told us not to run in the corridor.", ["The prefect told us not to run in the corridor"]),
            ],
          },
        },
        {
          topic: "composition",
          notes: [{
            title: "Composition Writing: Narrative and Descriptive",
            summary: "Plan, write and check a good composition — the structure examiners reward.",
            minutes: 8,
            content: `# Composition Writing

## Before you write — plan (3 minutes)
1. Read the title twice. Underline the key words.
2. Decide the **type**: story (narrative), description, debate, dialogue, letter.
3. Jot down 4–5 points in order.

## Structure
- **Introduction** (1 paragraph): set the scene — *who, where, when*. Hook the reader with a question, a sound or a surprising statement.
- **Body** (2–3 paragraphs): one main idea per paragraph. Use **linking words**: *first, then, suddenly, after that, meanwhile, however, finally*.
- **Conclusion** (1 paragraph): what happened in the end and the **lesson learnt** or how you felt.

## Narrative tips (stories)
- Use the **past tense** consistently.
- Include **dialogue** with correct punctuation: *"Run!" shouted Opio.*
- Show feelings: *My heart pounded like a drum.*
- Keep to the title. If it says "**The day I will never forget**", every paragraph must relate to that day.

## Descriptive tips
Use the five senses — what you **saw, heard, smelt, tasted, touched**. Use adjectives and similes: *as quiet as a graveyard*.

## Checking (2 minutes)
- Capital letters and full stops · Spelling of common words · Subject–verb agreement · Paragraphs indented
- Avoid *very very*, slang and repeating *and then*.

## Useful vocabulary
- Beginnings: *It all started when... / One sunny morning in July... / Have you ever...?*
- Endings: *From that day, I learnt that... / That experience taught me... / I will never forget...*
`,
          }],
          quiz: {
            questions: [
              mcq("Which tense is mostly used when writing a story about something that happened last holiday?", ["Present tense", "Past tense", "Future tense", "Present continuous"], "Past tense"),
              short("What should the introduction of a story tell the reader?", "Who, where and when — it sets the scene.", ["who where when", "sets the scene", "the setting", "who, where and when"]),
              mcq("Which of these is a linking word?", ["Banana", "Suddenly", "Kampala", "Quickly ran"], "Suddenly"),
              short("Punctuate correctly: run shouted opio", "\"Run!\" shouted Opio.", ["\"Run!\" shouted Opio"]),
              mcq("Which sentence uses a simile?", ["The night was dark.", "The night was as dark as coal.", "The dark night came.", "It was night."], "The night was as dark as coal."),
              long("Write a composition of about 150 words entitled: 'The day I will never forget'.", "Marks: relevance to title (2), introduction with setting (1), body with 2–3 paragraphs and clear sequence (3), conclusion with lesson/feelings (1), grammar and tense consistency (2), spelling and punctuation (1).", 10),
            ],
          },
        },
      ],
    },
    {
      subject: "science",
      topics: [
        {
          topic: "classification",
          notes: [{
            title: "Classification of Living Things",
            summary: "The characteristics of living things and the main groups of plants and animals.",
            minutes: 9,
            content: `# Classification of Living Things

## Characteristics of living things
**MRS GREN**: **M**ovement, **R**espiration, **S**ensitivity, **G**rowth, **R**eproduction, **E**xcretion, **N**utrition.

## Plants
### Flowering plants (produce flowers and seeds)
| | Monocotyledons | Dicotyledons |
|---|---|---|
| Seed leaves (cotyledons) | one | two |
| Leaf veins | parallel | network |
| Roots | fibrous | tap root |
| Examples | maize, grass, rice, millet, sugarcane, banana | beans, mango, groundnuts, hibiscus, tomato |

### Non-flowering plants
- **Ferns** — reproduce by **spores** under the leaves (fronds).
- **Mosses** — small, grow in damp places, spores.
- **Conifers** — cones, needle-like leaves (pine, cypress).
- **Algae** — simple green plants in water (spirogyra).
- **Fungi** (not true plants) — mushrooms, moulds, yeast; have no chlorophyll, feed on dead matter (saprophytes).

## Animals
### Vertebrates (have a backbone)
| Group | Body covering | Breathing | Temperature | Reproduction | Examples |
|---|---|---|---|---|---|
| **Fish** | scales | gills | cold-blooded | lay eggs in water | tilapia, Nile perch |
| **Amphibians** | moist skin | gills (young), lungs + skin (adult) | cold-blooded | eggs in water | frog, toad, newt |
| **Reptiles** | dry scales | lungs | cold-blooded | eggs with leathery shells on land | lizard, snake, crocodile, tortoise |
| **Birds** | feathers | lungs | warm-blooded | hard-shelled eggs | hen, eagle, ostrich |
| **Mammals** | hair/fur | lungs | warm-blooded | give birth, suckle young (mammary glands) | cow, bat, whale, human |

### Invertebrates (no backbone)
- **Insects** — 3 body parts (head, thorax, abdomen), **6 legs**, 2 antennae, usually wings: housefly, bee, mosquito.
- **Arachnids** — **8 legs**, 2 body parts: spider, tick, scorpion.
- **Myriapods** — many legs: centipede, millipede.
- **Crustaceans** — hard shell, 10 legs: crab, prawn.
- **Molluscs** — soft body, often a shell: snail, slug, octopus.
- **Worms** — earthworm, tapeworm, roundworm.

> A **bat** is a mammal (fur, gives birth, suckles), not a bird. A **whale** is a mammal. A **tortoise** is a reptile. A **penguin** is a bird.
`,
          }],
          quiz: {
            questions: [
              mcq("Which group of animals has feathers?", ["Mammals", "Reptiles", "Birds", "Amphibians"], "Birds"),
              mcq("A frog belongs to which group?", ["Reptiles", "Amphibians", "Fish", "Mammals"], "Amphibians"),
              short("How many legs does an insect have?", "Six", ["6", "six legs"]),
              mcq("Which of these is a mammal?", ["Crocodile", "Bat", "Tilapia", "Ostrich"], "Bat", "Bats have fur, give birth and suckle their young."),
              short("Name the three body parts of an insect.", "Head, thorax and abdomen", ["head thorax abdomen", "head, thorax, abdomen"]),
              mcq("Which plant is a monocotyledon?", ["Bean", "Mango", "Maize", "Groundnut"], "Maize"),
              short("Give one characteristic of dicotyledonous plants.", "Two seed leaves / network veins / tap root.", ["two cotyledons", "two seed leaves", "network veins", "tap root", "net veined leaves"]),
              short("How do ferns reproduce?", "By spores", ["spores"]),
              short("Give one reason why a spider is not an insect.", "It has eight legs (insects have six) / it has two body parts.", ["it has 8 legs", "eight legs", "two body parts", "it has no antennae", "it has no wings"]),
              fill("Animals with a backbone are called ______.", ["vertebrates"]),
              short("Why are fungi not regarded as true plants?", "They have no chlorophyll so cannot make their own food.", ["they lack chlorophyll", "no chlorophyll", "they do not make their own food", "cannot photosynthesise"]),
              short("Write what the letter 'R' stands for in MRS GREN (give one).", "Respiration (or Reproduction)", ["respiration", "reproduction"]),
            ],
          },
        },
        {
          topic: "circulatory-system",
          quiz: {
            title: "The circulatory system",
            questions: [
              num("How many chambers does the human heart have?", 4),
              short("Name the liquid part of blood.", "Plasma"),
              mcq("Which blood cells help in clotting?", ["Red blood cells", "White blood cells", "Platelets", "Plasma"], "Platelets"),
              short("Name the blood vessels that carry blood back to the heart.", "Veins", ["vein"]),
              short("Which part of the body makes red blood cells?", "The bone marrow", ["bone marrow", "marrow"]),
              short("Name the artery that carries deoxygenated blood from the heart to the lungs.", "Pulmonary artery", ["the pulmonary artery"]),
              short("What is a pulse?", "The throbbing of arteries as the heart pumps blood.", ["heart beat felt in arteries", "throbbing of arteries", "beating of the heart felt in the arteries", "the beat of the heart"]),
              short("Give one way of keeping the heart healthy.", "Regular exercise / eating less fat and salt / not smoking.", ["exercise", "regular exercise", "eating less fat", "avoid smoking", "eating a balanced diet", "avoiding fatty foods", "not smoking"]),
              short("Name the disease caused by lack of enough red blood cells or haemoglobin.", "Anaemia", ["anemia"]),
              mcq("Which blood group can donate blood to all other groups?", ["A", "B", "AB", "O"], "O"),
            ],
          },
        },
      ],
    },
    {
      subject: "social-studies",
      topics: [
        {
          topic: "east-african-community",
          quiz: {
            title: "The East African Community",
            questions: [
              short("Name the three founder members of the East African Community.", "Kenya, Uganda and Tanzania", ["Uganda, Kenya and Tanzania", "Kenya Uganda Tanzania", "Uganda Kenya Tanzania", "Tanzania, Kenya and Uganda"]),
              short("In which year was the first East African Community formed?", "1967"),
              short("In which year did the first East African Community collapse?", "1977"),
              short("Where is the headquarters of the EAC?", "Arusha, Tanzania", ["Arusha"]),
              mcq("Which two countries joined the EAC in 2007?", ["Rwanda and Burundi", "South Sudan and DRC", "Somalia and Ethiopia", "Rwanda and South Sudan"], "Rwanda and Burundi"),
              short("Give one advantage of the East African Community to Uganda.", "Wider market / free movement of people / shared services.", ["wider market", "free movement", "trade", "market for goods", "shared infrastructure", "peace", "cooperation", "employment opportunities"]),
              short("Name the EAC organ made up of the Presidents of member states.", "The Summit", ["Summit of Heads of State", "the summit"]),
              short("Name the common language spoken across East Africa.", "Kiswahili", ["Swahili"]),
              short("Give one problem facing the East African Community.", "Different currencies / political differences / smuggling / border conflicts.", ["different currencies", "political instability", "smuggling", "border conflicts", "language differences", "unequal development", "political differences"]),
              long("Explain two reasons why the first East African Community collapsed.", "Any two: ideological differences (capitalist Kenya vs socialist Tanzania); personal differences between Amin and Nyerere; unequal distribution of benefits (Kenya gained most); lack of a common currency; closure of the Kenya–Tanzania border in 1977. 2 marks each.", 4),
            ],
          },
        },
        {
          topic: "physical-features",
          quiz: {
            title: "Physical features of East Africa",
            questions: [
              short("Name the highest mountain in East Africa.", "Mount Kilimanjaro", ["Kilimanjaro", "Mt Kilimanjaro"]),
              short("Name the highest peak of Mount Kilimanjaro.", "Kibo (Uhuru Peak)", ["Kibo", "Uhuru peak", "Uhuru"]),
              short("Name the highest mountain in Kenya.", "Mount Kenya", ["Mt Kenya"]),
              mcq("Which lake is the deepest in East Africa?", ["Lake Victoria", "Lake Tanganyika", "Lake Turkana", "Lake Kyoga"], "Lake Tanganyika"),
              short("Name the two arms of the Great Rift Valley in East Africa.", "The Eastern (Gregory) Rift Valley and the Western (Albertine) Rift Valley", ["eastern and western", "Gregory and Albertine", "the eastern arm and the western arm"]),
              short("Give one example of a lake found in the Eastern Rift Valley.", "Lake Turkana", ["Turkana", "Lake Nakuru", "Nakuru", "Lake Naivasha", "Naivasha", "Lake Natron", "Natron", "Lake Eyasi", "Lake Manyara", "Lake Baringo", "Bogoria"]),
              short("Name the river that flows through Tanzania and is its longest.", "River Rufiji", ["Rufiji"]),
              short("Name the longest river in Kenya.", "River Tana", ["Tana"]),
              short("Which East African mountain lies on the border of Uganda and Kenya?", "Mount Elgon", ["Elgon", "Mt Elgon"]),
              short("What is a plateau?", "A large, fairly flat, raised area of land.", ["a raised flat land", "flat raised land", "high flat land", "a raised area of flat land"]),
            ],
          },
        },
      ],
    },
  ],
};
