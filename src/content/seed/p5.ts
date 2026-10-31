import { ClassContent, mcq, fill, num, short, tf, long, comp, draw } from "./types";

export const p5: ClassContent = {
  class: "p5",
  subjects: [
    {
      subject: "mathematics",
      topics: [
        {
          topic: "decimals-and-percentages",
          notes: [{
            title: "Decimals and Percentages",
            summary: "Place value of decimals, the four operations with decimals, and changing between decimals, fractions and percentages.",
            minutes: 9,
            content: `# Decimals

A **decimal** uses a point to show parts of a whole.

## Place value
| Tens | Ones | . | Tenths | Hundredths | Thousandths |
|---|---|---|---|---|---|
| 2 | 4 | . | 3 | 7 | 5 |

24.375 = 20 + 4 + 3/10 + 7/100 + 5/1000. The value of 7 is **7/100 or 0.07**.

## Changing fractions ↔ decimals
- ¾ = 3 ÷ 4 = **0.75** · ⅖ = 4/10 = **0.4**
- 0.6 = 6/10 = **⅗** · 0.125 = 125/1000 = **⅛**

## Adding and subtracting
Line up the **decimal points**.
\`\`\`
  12.50
+  3.75
-------
  16.25
\`\`\`

## Multiplying
Multiply as whole numbers, then count the total decimal places.
2.4 × 1.5 → 24 × 15 = 360 → two decimal places → **3.60 = 3.6**

Multiplying by 10, 100, 1000 moves the point **right**: 3.45 × 100 = **345**.

## Dividing
Dividing by 10, 100, 1000 moves the point **left**: 56.2 ÷ 10 = **5.62**.
To divide by a decimal, make the divisor a whole number: 4.8 ÷ 0.6 = 48 ÷ 6 = **8**.

## Ordering decimals
Compare place by place: 0.5 > 0.45 > 0.405.

---

# Percentages

**Per cent** means **out of 100**. 45% = 45/100 = 0.45.

- Fraction → %: multiply by 100. ⅘ × 100 = **80%**
- % → fraction: write over 100 and simplify. 25% = **¼**
- % → decimal: divide by 100. 8% = **0.08**

## Percentage of a quantity
15% of 60 pupils = 15/100 × 60 = **9 pupils**.

## Expressing one quantity as a percentage of another
12 out of 40 = 12/40 × 100 = **30%**.
`,
          }],
          quiz: {
            questions: [
              mcq("What is the place value of 8 in 3.482?", ["Tenths", "Hundredths", "Thousandths", "Ones"], "Hundredths"),
              num("Work out 4.75 + 2.8.", 7.55),
              num("Work out 9.3 − 4.65.", 4.65),
              num("Work out 1.2 × 0.5.", 0.6),
              num("Work out 7.2 ÷ 0.9.", 8),
              num("Change ⅜ to a decimal.", 0.375),
              fill("Change 0.35 to a fraction in its lowest terms.", ["7/20"]),
              num("Change ⅗ to a percentage (enter the number only).", 60),
              num("Find 25% of 80.", 20),
              num("In a class of 50 pupils, 20 are girls. What percentage of the class are girls?", 40),
              num("Work out 3.14 × 100.", 314),
              mcq("Arrange in ascending order: 0.7, 0.07, 0.77, 0.707", ["0.07, 0.7, 0.707, 0.77", "0.7, 0.07, 0.77, 0.707", "0.77, 0.707, 0.7, 0.07", "0.07, 0.707, 0.7, 0.77"], "0.07, 0.7, 0.707, 0.77"),
            ],
          },
        },
        {
          topic: "measurement",
          notes: [{
            title: "Measurement: Perimeter and Area",
            summary: "Units of length, converting between them, and finding perimeter and area of rectangles, squares and triangles.",
            minutes: 8,
            content: `# Measurement

## Units of length
| km | hm | dam | m | dm | cm | mm |
|---|---|---|---|---|---|---|
1 km = 1,000 m · 1 m = 100 cm · 1 cm = 10 mm

- Big unit → small unit: **multiply**. 3.5 m = 3.5 × 100 = **350 cm**
- Small unit → big unit: **divide**. 2,500 m = 2,500 ÷ 1,000 = **2.5 km**

## Perimeter
The **distance around** a shape — add all the sides.
- **Rectangle:** P = 2(L + W). A 12 cm by 7 cm rectangle: 2(12 + 7) = **38 cm**
- **Square:** P = 4 × side. Side 9 cm → **36 cm**
- **Triangle:** add the three sides.

## Area
The amount of **surface** inside a shape, measured in **square units** (cm², m²).
- **Rectangle:** A = L × W. 12 cm × 7 cm = **84 cm²**
- **Square:** A = side × side. 9 cm → **81 cm²**
- **Triangle:** A = ½ × base × height. Base 10 cm, height 6 cm → ½ × 10 × 6 = **30 cm²**

### Finding a missing side
A rectangle has area 60 cm² and length 12 cm. Width = 60 ÷ 12 = **5 cm**.

### Compound shapes
Split an L-shape into two rectangles, find each area, then **add**.

## Everyday problems
A garden 20 m by 15 m is fenced with wire costing UGX 2,000 per metre.
Perimeter = 2(20 + 15) = 70 m. Cost = 70 × 2,000 = **UGX 140,000**.
`,
          }],
          quiz: {
            questions: [
              num("Change 4.5 km to metres.", 4500),
              num("Change 850 cm to metres.", 8.5),
              num("Find the perimeter of a rectangle 15 cm long and 9 cm wide (cm).", 48),
              num("Find the area of a square whose side is 11 cm (cm²).", 121),
              num("Find the area of a rectangle 14 m by 6 m (m²).", 84),
              num("A triangle has a base of 12 cm and a height of 5 cm. Find its area (cm²).", 30),
              num("The area of a rectangle is 96 cm² and its width is 8 cm. Find its length (cm).", 12),
              num("A square has a perimeter of 48 cm. Find the length of one side (cm).", 12),
              num("A rectangular garden is 25 m long and 18 m wide. Find the total length of fence needed to go round it (m).", 86),
              num("A rectangular floor 6 m by 4 m is covered with square tiles of side 1 m. How many tiles are needed?", 24),
              long("A rectangular plot 30 m by 20 m has a path 2 m wide inside along all four sides. Find the area of the path.", "Outer area 600 m². Inner rectangle 26 m × 16 m = 416 m². Path = 600 − 416 = 184 m². Marks: outer (1), inner dimensions (1), inner area (1), answer (1).", 4),
            ],
          },
        },
      ],
    },
    {
      subject: "english",
      topics: [
        {
          topic: "adjectives",
          notes: [{
            title: "Adjectives and Comparison",
            summary: "Describing words and the three degrees of comparison, including irregular forms.",
            minutes: 7,
            content: `# Adjectives

An **adjective** describes a noun or pronoun: *a **tall** boy, **three** books, **the red** car.*

## Degrees of comparison
| Positive | Comparative (two things) | Superlative (three or more) |
|---|---|---|
| tall | tall**er** | tall**est** |
| big | bigg**er** (double the consonant) | bigg**est** |
| happy | happ**ier** (y → i) | happ**iest** |
| brave | brav**er** | brav**est** |
| beautiful | **more** beautiful | **most** beautiful |
| careful | more careful | most careful |

Use **-er/-est** for short words (one syllable, and two-syllable words ending in -y). Use **more/most** for longer words.

## Irregular comparisons
| good | better | best |
|---|---|---|
| bad | worse | worst |
| many / much | more | most |
| little | less | least |
| far | farther / further | farthest / furthest |
| old | older / elder | oldest / eldest |

## Sentence patterns
- **Comparative + than:** *Mary is taller **than** Jane.*
- **as ... as:** *Peter is **as** tall **as** John.* (equal)
- **the + superlative + of/in:** *Musa is **the tallest** boy **in** the class.*
- *Of the two boys, Tom is **the taller**.* (two → comparative)

## Order of adjectives
Opinion → size → age → shape → colour → origin → material: *a beautiful small old round brown Ugandan wooden stool*.
`,
          }],
          quiz: {
            questions: [
              fill("Give the comparative form of 'big'.", ["bigger"]),
              fill("Give the superlative form of 'happy'.", ["happiest"]),
              fill("Give the superlative form of 'good'.", ["best"]),
              fill("Give the comparative form of 'bad'.", ["worse"]),
              fill("Complete: Kampala is the ______ (large) city in Uganda.", ["largest"]),
              fill("Complete: This road is ______ (dangerous) than that one.", ["more dangerous"]),
              mcq("Choose the correct sentence.", ["Of the two girls, Amina is the tallest.", "Of the two girls, Amina is the taller.", "Of the two girls, Amina is more tall.", "Of the two girls, Amina is tall."], "Of the two girls, Amina is the taller."),
              fill("Complete: My bag is as ______ (heavy) as yours.", ["heavy"]),
              fill("Complete: Of all the pupils, Opio ran the ______ (far).", ["farthest", "furthest"]),
              fill("Complete: She has ______ (little) money than her brother.", ["less"]),
              mcq("Choose the correct order: She bought a ______ dress.", ["red beautiful long", "beautiful long red", "long red beautiful", "red long beautiful"], "beautiful long red"),
            ],
          },
        },
        {
          topic: "letter-writing",
          notes: [{
            title: "Informal and Formal Letters",
            summary: "The parts of a letter, the correct layout, and useful phrases for PLE composition.",
            minutes: 8,
            content: `# Letter Writing

## Informal (friendly) letter
Written to friends and relatives.

\`\`\`
                                        St. Mary's Primary School,
                                        P.O. Box 123,
                                        Mbarara.
                                        14th March, 2026.

Dear Grandmother,

[Paragraph 1: greeting and reason for writing]
[Paragraph 2–3: the body — news, description]
[Last paragraph: closing wishes]

                                        Your loving granddaughter,
                                        Joan
\`\`\`
- **One address** (the writer's) at the top right.
- **Date** under the address.
- **Salutation**: *Dear Mother, / Dear Peter,*
- **Ending**: *Yours sincerely, / Your loving son, / Your friend,*

## Formal (official) letter
Written to people in offices — head teacher, LC chairperson, a company.
- **Two addresses**: writer's (top right) and receiver's (left, below the date).
- **Salutation**: *Dear Sir/Madam,* or *Dear Mr Okot,*
- **Heading (RE:)** in capitals or underlined: *RE: APPLICATION FOR A BURSARY*
- **Body**: short, polite and to the point.
- **Ending**: *Yours faithfully,* (if Dear Sir/Madam) or *Yours sincerely,* (if you used the name). Sign and print your name.

## Useful phrases
- *I am writing to inform you that...*
- *I would be grateful if you could...*
- *Thank you for your letter which I received last week.*
- *Please pass my greetings to...*
- *I look forward to hearing from you.*

## Common mistakes
- Forgetting the date or putting the address on the left in an informal letter.
- Writing "Yours faithfully" after "Dear Mr Okot" (should be *sincerely*).
- Not paragraphing; using slang in a formal letter.
`,
          }],
          quiz: {
            questions: [
              mcq("How many addresses does a formal letter have?", ["None", "One", "Two", "Three"], "Two"),
              mcq("Which ending is correct after 'Dear Sir/Madam'?", ["Yours sincerely,", "Yours faithfully,", "Your friend,", "With love,"], "Yours faithfully,"),
              short("Where is the writer's address placed in a letter?", "At the top right-hand corner", ["top right", "top right corner", "on the right at the top", "right hand side at the top"]),
              fill("The part of a letter that says 'Dear Uncle,' is called the ______.", ["salutation", "greeting"]),
              mcq("Which of these is a correct salutation for a letter to your friend?", ["Dear Sir,", "Dear Madam,", "Dear Aisha,", "To whom it may concern,"], "Dear Aisha,"),
              short("What comes immediately below the address in a letter?", "The date", ["date"]),
              mcq("A letter to the head teacher asking for permission is a:", ["friendly letter", "formal letter", "poem", "story"], "formal letter"),
              long("Write a letter to your friend telling him or her about your school sports day. (Marks for layout: address and date, salutation, three paragraphs, ending; and for content, grammar and spelling.)", "Layout 4 marks (address/date 1, salutation 1, paragraphing 1, ending 1). Content and language 6 marks: describes events of sports day, correct tenses, clear sentences, few spelling errors.", 10),
            ],
          },
        },
      ],
    },
    {
      subject: "science",
      topics: [
        {
          topic: "digestive-system",
          notes: [{
            title: "The Digestive System",
            summary: "The alimentary canal, what happens in each part, enzymes, and care of the digestive system.",
            minutes: 9,
            content: `# The Digestive System

**Digestion** is the breaking down of food into small soluble particles that the body can absorb.

## Types of digestion
- **Mechanical (physical)** — chewing with teeth, churning in the stomach.
- **Chemical** — using **enzymes** (chemicals that speed up digestion).

## Parts of the alimentary canal and what happens
| Part | What happens |
|---|---|
| **Mouth** | Teeth chew; **saliva** (from salivary glands) contains the enzyme **ptyalin/amylase** which starts digesting **starch** into sugar. |
| **Oesophagus (gullet)** | Food is pushed down by **peristalsis** (wave-like muscle movement). |
| **Stomach** | Churns food; **gastric juice** has **hydrochloric acid** (kills germs) and **pepsin** (digests **proteins**). Food becomes **chyme**. |
| **Small intestine** (duodenum, ileum) | Most digestion and **all absorption**. Bile (from the **liver**, stored in the **gall bladder**) breaks fats into droplets; pancreatic juice digests starch, protein and fat. **Villi** absorb digested food into the blood. |
| **Large intestine (colon)** | Absorbs **water** and mineral salts; forms faeces. |
| **Rectum and anus** | Store and remove faeces (**egestion**). |

## End products of digestion
- Carbohydrates → **glucose** (simple sugar)
- Proteins → **amino acids**
- Fats and oils → **fatty acids and glycerol**

## Villi adaptations
Many, finger-like (large surface area), thin walls, rich blood supply, lacteal for fats.

## Diseases and disorders
Constipation (eat **roughage**/fibre, drink water), diarrhoea (give **ORS**), indigestion, ulcers, food poisoning, worms, cholera, typhoid.

## Caring for the digestive system
Eat a balanced diet with fibre, chew food well, drink clean water, wash hands and fruits, avoid eating too fast, don't skip meals, deworm regularly.
`,
          }],
          quiz: {
            questions: [
              short("Name the enzyme in saliva.", "Ptyalin (salivary amylase)", ["ptyalin", "amylase", "salivary amylase"]),
              mcq("Where does digestion begin?", ["Stomach", "Mouth", "Small intestine", "Oesophagus"], "Mouth"),
              fill("The wave-like movement that pushes food along the gut is called ______.", ["peristalsis"]),
              short("What is the function of hydrochloric acid in the stomach?", "It kills germs in food (and provides an acidic medium for pepsin).", ["kills germs", "to kill germs in food", "kills bacteria", "kill germs"]),
              mcq("Which food is digested by the enzyme pepsin?", ["Starch", "Fat", "Protein", "Vitamins"], "Protein"),
              short("Where is bile stored?", "In the gall bladder", ["gall bladder", "gallbladder"]),
              short("Name the end product of the digestion of proteins.", "Amino acids", ["amino acid"]),
              mcq("Most absorption of digested food takes place in the:", ["stomach", "large intestine", "small intestine", "mouth"], "small intestine"),
              short("What is absorbed in the large intestine?", "Water (and mineral salts)", ["water", "water and mineral salts", "water and salts"]),
              short("Name the finger-like structures in the small intestine that absorb digested food.", "Villi", ["villus"]),
              short("Give one way of preventing constipation.", "Eating food with roughage/fibre and drinking plenty of water.", ["eating roughage", "eat fibre", "eating vegetables and fruits", "drinking plenty of water", "eating fibre"]),
              draw("Draw and label the stomach and small intestine on a simple outline of the digestive system.", "Recognisable J-shaped stomach labelled (1) and coiled small intestine labelled (1)."),
            ],
          },
        },
        {
          topic: "plant-reproduction",
          quiz: {
            title: "Reproduction in flowering plants",
            questions: [
              short("Name the male part of a flower.", "Stamen", ["stamens", "the stamen"]),
              short("Name the female part of a flower.", "Pistil (carpel)", ["pistil", "carpel"]),
              fill("The transfer of pollen grains from the anther to the stigma is called ______.", ["pollination"]),
              mcq("Which part of the flower produces pollen?", ["Stigma", "Anther", "Ovary", "Petal"], "Anther"),
              short("Give one agent of pollination.", "Insects", ["wind", "insects", "birds", "water", "bees", "animals", "butterflies"]),
              short("Why do flowers have brightly coloured petals?", "To attract insects for pollination.", ["to attract insects", "attract pollinators", "to attract insects and birds"]),
              short("What does the ovary become after fertilisation?", "The fruit", ["fruit", "a fruit"]),
              short("What does the ovule become after fertilisation?", "The seed", ["seed", "a seed"]),
              mcq("Pollination within the same flower or the same plant is called:", ["cross pollination", "self pollination", "wind pollination", "insect pollination"], "self pollination"),
              short("Give one difference between a wind-pollinated and an insect-pollinated flower.", "Wind-pollinated flowers are small, dull, have no scent or nectar and produce lots of light pollen; insect-pollinated flowers are large, bright, scented and have nectar.", ["wind pollinated flowers are dull", "insect pollinated flowers are brightly coloured", "wind pollinated flowers have no scent", "insect pollinated flowers have nectar", "wind pollinated produce more pollen"]),
              short("Name the part of a flower that protects the flower when it is still a bud.", "Sepals (calyx)", ["sepal", "sepals", "calyx"]),
            ],
          },
        },
      ],
    },
    {
      subject: "social-studies",
      topics: [
        {
          topic: "physical-features",
          notes: [{
            title: "Physical Features of Uganda",
            summary: "Relief, drainage, mountains, lakes, rivers and how they were formed.",
            minutes: 9,
            content: `# Physical Features of Uganda

Uganda is a **plateau** country — most of it lies between 900 m and 1,500 m above sea level, with highlands on the eastern and western borders and the Western Rift Valley in the west.

## Mountains
| Mountain | Location | Type | Highest peak |
|---|---|---|---|
| **Rwenzori** (Mountains of the Moon) | Western border with DRC | **Block (horst)** — formed by faulting | **Margherita** (5,109 m) — highest point in Uganda; snow-capped |
| **Elgon** | Eastern border with Kenya | **Volcanic** (extinct) | Wagagai (4,321 m) |
| **Muhavura, Mgahinga, Sabinyo** (Virunga/Mufumbiro) | South-west (Kisoro) | Volcanic | gorillas live on their slopes |
| **Moroto, Kadam, Morungole, Napak** | Karamoja | Volcanic | |

## Lakes
- **Lake Victoria** — largest lake in Africa, **second largest fresh-water lake in the world**; shared by Uganda, Kenya and Tanzania; source of the Nile at **Jinja**. Formed by **down-warping**.
- **Rift Valley lakes** (formed by **faulting**): Albert, Edward, George.
- **Crater lakes** (formed by volcanic action): Nyabikere, Nkuruba, Katwe (salt).
- **Lake Kyoga** — shallow, swampy; formed by down-warping and up-warping.
- **Lake Bunyonyi** — formed when lava dammed a river (lava-dammed lake); the deepest lake in Uganda.

## Rivers
- **River Nile** — the longest river in Africa (6,650 km). In Uganda: **Victoria Nile** (L. Victoria → L. Kyoga → L. Albert, with Murchison Falls) and **Albert Nile** (L. Albert → South Sudan). Dams: Nalubaale, Kiira, Bujagali, Isimba, Karuma.
- Others: Kafu, Katonga, Mpologoma, Manafwa, Aswa, Semliki, Kagera (largest inflow to L. Victoria).

## The Rift Valley
Part of the **Western (Albertine) Rift Valley**, formed by **faulting** — the land between two parallel cracks (faults) sank. Contains lakes Albert, Edward and George and the River Semliki. **Escarpments** mark its edges (e.g. Butiaba).

## Importance of physical features
Tourism, fishing, hydro-electric power, transport, fertile volcanic soils for farming (coffee on Elgon), rainfall formation, minerals (salt at Katwe), national boundaries.
`,
          }],
          quiz: {
            questions: [
              short("Name the highest mountain in Uganda.", "Mount Rwenzori", ["Rwenzori", "Mt Rwenzori", "Rwenzori mountains"]),
              short("Name the highest peak of Mount Rwenzori.", "Margherita", ["Margherita peak"]),
              mcq("Mount Elgon was formed by:", ["faulting", "folding", "volcanic action", "down-warping"], "volcanic action"),
              mcq("Mount Rwenzori is an example of a:", ["volcanic mountain", "block mountain", "fold mountain", "residual mountain"], "block mountain"),
              short("Name the largest lake in Africa.", "Lake Victoria", ["Victoria"]),
              short("In which town does the River Nile start its journey from Lake Victoria?", "Jinja"),
              short("Give one example of a Rift Valley lake in Uganda.", "Lake Albert", ["Albert", "Lake Edward", "Edward", "Lake George", "George"]),
              short("How was Lake Bunyonyi formed?", "By lava blocking/damming a river valley.", ["lava damming", "lava blocked a river", "lava dammed lake", "lava blocking a river"]),
              short("Name the longest river in Africa.", "River Nile", ["Nile", "the Nile"]),
              short("Give one importance of mountains to the people of Uganda.", "Tourism / fertile soils for farming / rainfall / minerals.", ["tourism", "fertile soils", "farming", "rainfall", "attract tourists", "source of rivers", "minerals", "cool climate"]),
              short("Name the falls found on the Victoria Nile between Lake Kyoga and Lake Albert.", "Murchison Falls", ["Murchison", "Kabalega Falls"]),
              short("Name the process that formed the Western Rift Valley.", "Faulting"),
            ],
          },
        },
        {
          topic: "pre-colonial-uganda",
          quiz: {
            title: "Pre-colonial kingdoms and chiefdoms",
            questions: [
              short("Who was the first Kabaka of Buganda?", "Kintu", ["Kabaka Kintu"]),
              short("Name the title of the king of Bunyoro-Kitara.", "Omukama"),
              short("Name the title of the king of Tooro.", "Omukama", ["Omukama of Tooro"]),
              mcq("The Omugabe was the title of the king of:", ["Buganda", "Bunyoro", "Ankole", "Busoga"], "Ankole"),
              short("Name the title of the cultural leader of Busoga.", "Kyabazinga", ["Isebantu Kyabazinga"]),
              short("Who founded the Tooro Kingdom after breaking away from Bunyoro?", "Prince Kaboyo", ["Kaboyo", "Olimi Kaboyo"]),
              short("Name the Omukama of Bunyoro who resisted the British.", "Kabalega", ["Omukama Kabalega", "Chwa II Kabalega"]),
              short("Give one reason why Buganda became powerful before the coming of Europeans.", "Strong central government under the Kabaka / fertile soils / strong army / trade with Arabs.", ["strong leadership", "centralised government", "fertile soils", "strong army", "trade", "good climate", "unity", "trade with Arabs"]),
              mcq("Which Kabaka welcomed H.M. Stanley and invited missionaries?", ["Mwanga", "Muteesa I", "Suuna", "Daudi Chwa"], "Muteesa I"),
              short("Name the clan system head in Buganda who sits on the Lukiiko.", "Katikkiro (Prime Minister)", ["Katikkiro", "Katikiro"]),
              short("Which pre-colonial people in northern Uganda had chiefdoms led by Rwot?", "The Acholi", ["Acholi"]),
              long("Explain two ways in which the pre-colonial kingdoms of Uganda were governed.", "Any two: hereditary king (Kabaka/Omukama) with absolute power; council of chiefs/Lukiiko advised the king; county (saza) and sub-county (gombolola) chiefs appointed by the king collected tribute; clan heads handled clan matters. 2 marks each.", 4),
            ],
          },
        },
      ],
    },
  ],
};
