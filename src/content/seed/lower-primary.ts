import { ClassContent, mcq, fill, num, short, tf, long, comp, draw, match } from "./types";

export const p1: ClassContent = {
  class: "p1",
  subjects: [
    {
      subject: "mathematics",
      topics: [
        {
          topic: "numbers-1-20",
          notes: [{
            title: "Counting and Writing Numbers 1 to 20",
            summary: "Count objects, read and write numbers and number names up to 20.",
            minutes: 5,
            content: `# Numbers 1 to 20

## Counting
Count slowly and touch each object once.

🍊 🍊 🍊 🍊 🍊 → **5** oranges

## Numbers and their names
| 1 one | 2 two | 3 three | 4 four | 5 five |
|---|---|---|---|---|
| 6 six | 7 seven | 8 eight | 9 nine | 10 ten |
| 11 eleven | 12 twelve | 13 thirteen | 14 fourteen | 15 fifteen |
| 16 sixteen | 17 seventeen | 18 eighteen | 19 nineteen | 20 twenty |

## Before, after and between
- The number **after** 7 is **8**.
- The number **before** 12 is **11**.
- The number **between** 14 and 16 is **15**.

## Comparing
- 9 is **more than** 6. We write 9 > 6.
- 3 is **less than** 5. We write 3 < 5.
- 4 is **equal to** 4. We write 4 = 4.

## Counting in twos
2, 4, 6, 8, 10, 12, 14, 16, 18, 20

## Counting backwards
20, 19, 18, 17, 16, 15 ...
`,
          }],
          quiz: {
            questions: [
              mcq("How many stars are here? ★ ★ ★ ★ ★ ★ ★", ["6", "7", "8", "5"], "7"),
              fill("Write the number 'fourteen' in figures.", ["14"]),
              fill("Write 9 in words.", ["nine"]),
              num("What number comes after 16?", 17),
              num("What number comes before 11?", 10),
              num("What number is between 18 and 20?", 19),
              mcq("Which number is bigger?", ["8", "12", "5", "3"], "12"),
              fill("Fill in the missing number: 2, 4, 6, ___, 10", ["8"]),
              fill("Fill in the missing number: 20, 19, 18, ___, 16", ["17"]),
              num("Count the fingers on both your hands. How many are there?", 10),
            ],
          },
        },
        {
          topic: "addition-within-20",
          quiz: {
            title: "Addition within 20",
            questions: [
              num("3 + 4 =", 7),
              num("5 + 5 =", 10),
              num("8 + 6 =", 14),
              num("9 + 9 =", 18),
              num("Mary has 6 mangoes. Her mother gives her 5 more. How many mangoes does she have now?", 11),
              num("12 + 7 =", 19),
              num("There are 4 goats and 3 cows. How many animals are there altogether?", 7),
              num("0 + 15 =", 15),
              fill("Fill in the missing number: 6 + ___ = 10", ["4"]),
              num("Tom had 7 sweets. He got 3 more from his friend and 2 more from his aunt. How many sweets does he have?", 12),
            ],
          },
        },
      ],
    },
    {
      subject: "english",
      topics: [
        {
          topic: "naming-words-nouns",
          notes: [{
            title: "Naming Words",
            summary: "Names of people, animals, places and things around us.",
            minutes: 4,
            content: `# Naming Words

A **naming word** tells us the name of a person, an animal, a place or a thing.

## People
mother · father · teacher · doctor · girl · boy · baby

## Animals
cow · goat · dog · cat · hen · bird · fish

## Things in our classroom
desk · chair · book · pen · pencil · bag · ruler · chalk · board · duster

## Things at home
bed · cup · plate · spoon · pot · door · window

## Places
school · home · church · mosque · market · hospital

## One and many
| one | many |
|---|---|
| a book | two book**s** |
| a cup | five cup**s** |
| a dog | many dog**s** |

## Say and write
*This is a **pen**.* · *That is a **cow**.* · *These are **books**.*
`,
          }],
          quiz: {
            questions: [
              mcq("Which word is the name of an animal?", ["desk", "goat", "run", "big"], "goat"),
              mcq("Which word is the name of a person?", ["chair", "teacher", "eat", "red"], "teacher"),
              fill("Write the plural (many): one cup, two ______.", ["cups"]),
              fill("Write the plural: one book, three ______.", ["books"]),
              mcq("Which of these is found in a classroom?", ["desk", "cow", "river", "moon"], "desk"),
              fill("Complete: This is a ______. (a thing we write with)", ["pen", "pencil"]),
              mcq("Choose the naming word in this sentence: 'The dog is running.'", ["is", "running", "dog", "the"], "dog"),
              fill("Where do sick people go to see a doctor? A ______.", ["hospital", "clinic"]),
              mcq("Which word names a place?", ["market", "cat", "sleep", "sweet"], "market"),
              draw("Draw a cup and write its name under it.", "A recognisable cup drawing with the word 'cup' written."),
            ],
          },
        },
      ],
    },
    {
      subject: "literacy-1",
      topics: [
        {
          topic: "theme-4-the-human-body-and-health",
          notes: [{
            title: "Parts of My Body",
            summary: "Name the parts of the body, what they do, and how to keep them clean.",
            minutes: 5,
            content: `# Parts of My Body

## External parts
**head · hair · eyes · ears · nose · mouth · teeth · tongue · neck · shoulders · arms · hands · fingers · chest · stomach · legs · knees · feet · toes**

## What they do
| Part | Use |
|---|---|
| eyes | seeing |
| ears | hearing |
| nose | smelling and breathing |
| tongue | tasting and talking |
| hands | holding, writing, eating |
| legs and feet | walking, running, jumping |
| teeth | biting and chewing food |

We have **two** eyes, **two** ears, **one** nose, **one** mouth, **ten** fingers and **ten** toes.

## Keeping my body clean
- Bathe every day with soap and water.
- Brush your teeth in the morning and before sleeping.
- Wash your hands before eating and after using the toilet.
- Cut your nails short. Comb your hair.
- Wear clean clothes.

## Sense organs
Eyes (sight) · ears (hearing) · nose (smell) · tongue (taste) · skin (feeling/touch) — **five senses**.
`,
          }],
          quiz: {
            questions: [
              mcq("Which part of the body do we use for seeing?", ["ears", "eyes", "nose", "legs"], "eyes"),
              mcq("Which part of the body do we use for hearing?", ["eyes", "mouth", "ears", "hands"], "ears"),
              num("How many fingers do you have on both hands?", 10),
              num("How many eyes do you have?", 2),
              short("Which part of the body do we use to smell?", "Nose", ["the nose"]),
              mcq("What do we use to brush our teeth?", ["a spoon", "a toothbrush", "a comb", "a pencil"], "a toothbrush"),
              short("Name one thing we need to bathe.", "Water (and soap)", ["soap", "water", "soap and water", "a basin", "a towel"]),
              short("When should we wash our hands?", "Before eating and after using the toilet.", ["before eating", "after visiting the toilet", "after using the latrine", "before eating food", "after toilet"]),
              mcq("Which part of the body do we use for walking?", ["hands", "head", "legs", "ears"], "legs"),
              draw("Draw a face and show the eyes, nose and mouth.", "A face with two eyes, a nose and a mouth drawn."),
            ],
          },
        },
      ],
    },
  ],
};

export const p2: ClassContent = {
  class: "p2",
  subjects: [
    {
      subject: "mathematics",
      topics: [
        {
          topic: "multiplication-2-3-5-10",
          notes: [{
            title: "Multiplication: Tables of 2, 3, 5 and 10",
            summary: "Multiplication as repeated addition, and the first multiplication tables.",
            minutes: 6,
            content: `# Multiplication

Multiplication is **repeated addition**.
3 × 4 means **3 groups of 4**: 4 + 4 + 4 = **12**.

🍎🍎🍎🍎  🍎🍎🍎🍎  🍎🍎🍎🍎 → 3 groups of 4 = 12

## Table of 2
2×1=2, 2×2=4, 2×3=6, 2×4=8, 2×5=10, 2×6=12, 2×7=14, 2×8=16, 2×9=18, 2×10=20

## Table of 3
3×1=3, 3×2=6, 3×3=9, 3×4=12, 3×5=15, 3×6=18, 3×7=21, 3×8=24, 3×9=27, 3×10=30

## Table of 5
5×1=5, 5×2=10, 5×3=15, 5×4=20, 5×5=25, 5×6=30, 5×7=35, 5×8=40, 5×9=45, 5×10=50
(Answers end in **5** or **0**.)

## Table of 10
10×1=10, 10×2=20, 10×3=30 ... 10×10=100
(Just add a **0** to the number.)

## Tricks
- Any number × 1 = the same number. 7 × 1 = 7
- Any number × 0 = 0.
- 2 × 6 is the same as 6 × 2 (order does not matter).

## Word problems
There are 5 desks and each desk has 2 pupils. How many pupils? 5 × 2 = **10 pupils**.
`,
          }],
          quiz: {
            questions: [
              num("2 × 6 =", 12),
              num("3 × 4 =", 12),
              num("5 × 7 =", 35),
              num("10 × 8 =", 80),
              num("3 × 9 =", 27),
              num("There are 4 bicycles. Each bicycle has 2 wheels. How many wheels are there altogether?", 8),
              num("A hen has 2 legs. How many legs do 7 hens have?", 14),
              num("Each pupil has 5 fingers on one hand. How many fingers do 6 pupils have on one hand each?", 30),
              fill("Fill in the missing number: 3 × ___ = 15", ["5"]),
              mcq("Which of these is the same as 4 + 4 + 4?", ["3 × 4", "4 × 4", "3 + 4", "4 × 2"], "3 × 4"),
            ],
          },
        },
        {
          topic: "time-clock-and-calendar",
          quiz: {
            title: "Time: clock and calendar",
            questions: [
              num("How many days are there in a week?", 7),
              num("How many months are there in a year?", 12),
              mcq("Which day comes after Tuesday?", ["Monday", "Wednesday", "Thursday", "Sunday"], "Wednesday"),
              mcq("Which month comes before March?", ["April", "January", "February", "May"], "February"),
              num("How many hours are there in a day?", 24),
              mcq("When the long hand points to 12 and the short hand points to 3, the time is:", ["12 o'clock", "3 o'clock", "half past 3", "6 o'clock"], "3 o'clock"),
              num("How many minutes are there in one hour?", 60),
              mcq("Which is the first month of the year?", ["December", "January", "March", "June"], "January"),
              mcq("Which day of the week do most pupils not go to school?", ["Monday", "Tuesday", "Sunday", "Thursday"], "Sunday"),
              fill("Half past 7 can also be written as 7:______.", ["30"]),
            ],
          },
        },
      ],
    },
    {
      subject: "english",
      topics: [
        {
          topic: "verbs-past-tense",
          notes: [{
            title: "Doing Words: Yesterday (Past Tense)",
            summary: "Change doing words to tell about things that happened yesterday.",
            minutes: 5,
            content: `# Doing Words in the Past

A **doing word (verb)** tells what someone does: *run, eat, play, read*.

When something happened **yesterday** or **last week**, we change the doing word.

## Add -ed
| Today | Yesterday |
|---|---|
| I **play** | I **played** |
| We **jump** | We **jumped** |
| She **cook**s | She **cooked** |
| They **wash** | They **washed** |
| He **talk**s | He **talked** |

## Special words (just learn them!)
| Today | Yesterday |
|---|---|
| go | **went** |
| eat | **ate** |
| see | **saw** |
| run | **ran** |
| come | **came** |
| sit | **sat** |
| write | **wrote** |
| drink | **drank** |
| sing | **sang** |
| sleep | **slept** |
| buy | **bought** |
| take | **took** |

## Sentences
- Yesterday I **went** to the market.
- Last Sunday we **ate** rice and beans.
- She **played** netball yesterday.
`,
          }],
          quiz: {
            questions: [
              fill("Yesterday I ______ (play) football.", ["played"]),
              fill("Last week we ______ (go) to Jinja.", ["went"]),
              fill("She ______ (eat) a mango yesterday.", ["ate"]),
              fill("The boys ______ (wash) the plates last night.", ["washed"]),
              fill("Yesterday Tom ______ (see) a big snake.", ["saw"]),
              fill("Mother ______ (cook) matooke yesterday.", ["cooked"]),
              fill("The baby ______ (sleep) well last night.", ["slept"]),
              fill("We ______ (sing) a song in class yesterday.", ["sang"]),
              mcq("Choose the correct sentence.", ["Yesterday I goed home.", "Yesterday I went home.", "Yesterday I go home.", "Yesterday I going home."], "Yesterday I went home."),
              fill("Father ______ (buy) me a new bag last week.", ["bought"]),
            ],
          },
        },
      ],
    },
    {
      subject: "literacy-1",
      topics: [
        {
          topic: "theme-5-weather",
          notes: [{
            title: "Weather",
            summary: "Types of weather, weather words and how weather affects what we do.",
            minutes: 5,
            content: `# Weather

**Weather** is the condition of the air around us at a certain time. It can change many times in one day.

## Types of weather
| Weather | What we see or feel | What we do |
|---|---|---|
| **Sunny** ☀️ | the sun shines, it is hot | dry clothes, dry harvest, wear a hat |
| **Rainy** 🌧️ | rain falls from clouds | use an umbrella, plant seeds, stay indoors |
| **Cloudy** ☁️ | clouds cover the sun | |
| **Windy** 🌬️ | strong moving air, trees bend | fly kites, dry clothes fast |
| **Cold** 🥶 | we shiver | wear a sweater or jacket |

## Weather instruments
- **Rain gauge** – measures rainfall
- **Wind vane** – shows the direction of the wind
- **Thermometer** – measures how hot or cold it is
- **Wind sock** – shows how strong the wind is

## Good and bad effects of weather
- Rain gives water to plants, animals and people. Too much rain causes **floods**.
- Sun helps crops grow and dries things. Too much sun causes **drought**.
- Strong wind can blow off roofs and break trees.

## Seasons in Uganda
Uganda has a **wet (rainy) season** and a **dry season**. Farmers plant seeds at the start of the rainy season.

## Weather chart
Every day we can record the weather with symbols: ☀️ sunny, 🌧️ rainy, ☁️ cloudy, 🌬️ windy.
`,
          }],
          quiz: {
            questions: [
              mcq("What do we use to measure rainfall?", ["thermometer", "rain gauge", "wind vane", "ruler"], "rain gauge"),
              mcq("Which instrument shows the direction of the wind?", ["rain gauge", "wind vane", "thermometer", "clock"], "wind vane"),
              short("What do we carry when it is raining so that we do not get wet?", "An umbrella", ["umbrella", "a raincoat", "raincoat"]),
              mcq("When the sun shines brightly and it is hot, the weather is:", ["rainy", "windy", "sunny", "cloudy"], "sunny"),
              short("Name one thing we can do when the weather is windy.", "Fly a kite", ["flying kites", "dry clothes", "fly kites", "winnow grain"]),
              short("What do we wear when it is cold?", "A sweater or jacket", ["sweater", "jacket", "a sweater", "warm clothes", "a jacket"]),
              mcq("Too much rain can cause:", ["drought", "floods", "sunshine", "dust"], "floods"),
              mcq("In which season do farmers plant seeds?", ["dry season", "rainy season", "night", "holiday"], "rainy season"),
              short("Name the instrument that measures how hot or cold it is.", "Thermometer", ["a thermometer"]),
              draw("Draw a weather symbol for a rainy day.", "A cloud with rain drops falling."),
            ],
          },
        },
      ],
    },
  ],
};

export const p3: ClassContent = {
  class: "p3",
  subjects: [
    {
      subject: "mathematics",
      topics: [
        {
          topic: "numbers-up-to-9-999-and-place-value",
          notes: [{
            title: "Numbers up to 9,999 and Place Value",
            summary: "Read, write and break down numbers using thousands, hundreds, tens and ones.",
            minutes: 6,
            content: `# Numbers up to 9,999

## Place value
| Thousands | Hundreds | Tens | Ones |
|---|---|---|---|
| 3 | 5 | 2 | 8 |

**3,528** = 3 thousands, 5 hundreds, 2 tens, 8 ones.
In words: *three thousand five hundred twenty-eight*.

- Place value of 5 = **hundreds**. Value of 5 = **500**.

## Expanded form
3,528 = **3,000 + 500 + 20 + 8**

## Writing numbers
- 2,040 → two thousand forty
- *six thousand three hundred nine* → 6,309 (put 0 in the tens place!)

## Comparing
Look at the thousands first, then hundreds, tens and ones.
4,721 > 4,698 because 7 hundreds > 6 hundreds.

## Ordering
Ascending (smallest first): 1,203 · 1,230 · 1,302 · 1,320
Descending (biggest first): 1,320 · 1,302 · 1,230 · 1,203

## Rounding to the nearest 10 and 100
- 846 → nearest ten = **850** (6 is 5 or more, round up)
- 846 → nearest hundred = **800** (4 is less than 5, round down)
`,
          }],
          quiz: {
            questions: [
              mcq("What is the place value of 7 in 4,732?", ["ones", "tens", "hundreds", "thousands"], "hundreds"),
              num("What is the value of 9 in 2,915?", 900),
              short("Write 6,054 in words.", "Six thousand fifty-four", ["six thousand and fifty four", "six thousand fifty four", "six thousand and fifty-four"]),
              num("Write 'three thousand two hundred seven' in figures.", 3207),
              short("Write 5,381 in expanded form.", "5,000 + 300 + 80 + 1", ["5000 + 300 + 80 + 1", "5000+300+80+1"]),
              mcq("Which number is the smallest?", ["3,456", "3,465", "3,546", "3,445"], "3,445"),
              num("Round off 672 to the nearest ten.", 670),
              num("Round off 1,250 to the nearest hundred.", 1300),
              num("What number comes just after 2,999?", 3000),
              num("Form the largest 4-digit number using 4, 9, 1, 6 once each.", 9641),
            ],
          },
        },
        {
          topic: "fractions",
          quiz: {
            title: "Fractions",
            questions: [
              mcq("A cake is cut into 4 equal parts. One part is:", ["½", "¼", "⅓", "1"], "¼"),
              fill("Shade half of 8 circles. How many circles are shaded?", ["4"]),
              num("What is ½ of 10?", 5),
              num("What is ¼ of 12?", 3),
              mcq("Which fraction is bigger?", ["½", "¼"], "½"),
              fill("In the fraction ⅔, the number on top is called the ______.", ["numerator"]),
              fill("Work out: ⅕ + ⅖", ["3/5"]),
              num("A mother shares 1 bread equally among her 2 children. Each child gets ___ of the bread. (Enter the denominator.)", 2),
              fill("Write 'three quarters' as a fraction.", ["3/4", "¾"]),
              draw("Draw a circle and shade ½ of it.", "A circle divided into two equal parts with one half shaded."),
            ],
          },
        },
      ],
    },
    {
      subject: "english",
      topics: [
        {
          topic: "adjectives-and-comparison",
          notes: [{
            title: "Describing Words and Comparing",
            summary: "Use adjectives and the -er / -est endings to compare two or more things.",
            minutes: 5,
            content: `# Describing Words (Adjectives)

A **describing word** tells us more about a naming word.
*a **big** house · a **red** dress · **three** goats · a **kind** teacher*

## Comparing two things: add **-er**
- Tom is **taller** than John.
- A lorry is **bigger** than a car. (big → bigg**er**, double the last letter)
- This book is **heavier** than that one. (heavy → heav**ier**, y → i)

## Comparing three or more: add **-est**
- Musa is the **tallest** boy in the class.
- The elephant is the **biggest** animal in the park.
- Amina is the **happiest** girl today.

| Describing word | -er | -est |
|---|---|---|
| small | smaller | smallest |
| long | longer | longest |
| fat | fatter | fattest |
| busy | busier | busiest |
| nice | nicer | nicest |

## Special words
| good | better | best |
|---|---|---|
| bad | worse | worst |
| many | more | most |

## Opposites
big – small · tall – short · hot – cold · fast – slow · clean – dirty · heavy – light · old – new · happy – sad
`,
          }],
          quiz: {
            questions: [
              mcq("Choose the describing word: 'The small cat is sleeping.'", ["cat", "small", "sleeping", "is"], "small"),
              fill("Complete: An elephant is ______ (big) than a goat.", ["bigger"]),
              fill("Complete: Kato is the ______ (tall) boy in our class.", ["tallest"]),
              fill("Complete: This road is ______ (long) than that one.", ["longer"]),
              fill("Give the opposite of 'hot'.", ["cold"]),
              fill("Give the opposite of 'clean'.", ["dirty"]),
              fill("Complete: My drawing is good, but yours is ______.", ["better"]),
              fill("Complete: Today is the ______ (happy) day of my life.", ["happiest"]),
              mcq("Choose the correct sentence.", ["A mouse is smaller than a cat.", "A mouse is smallest than a cat.", "A mouse is more small than a cat.", "A mouse is small than a cat."], "A mouse is smaller than a cat."),
              fill("Give the opposite of 'fast'.", ["slow"]),
            ],
          },
        },
        {
          topic: "comprehension",
          quiz: {
            title: "Comprehension: Kato's Goat",
            questions: (() => {
              const passage = `Kato has a brown goat called Kakoko. Every morning before school, Kato takes Kakoko to the field to eat grass. He ties the goat to a tree with a long rope so that it does not eat the neighbour's beans.

One day, Kato forgot to tie the rope well. Kakoko ran into Mrs Namutebi's garden and ate many cabbages. Mrs Namutebi was very angry. Kato said sorry and helped her to plant new cabbages. After that, Kato always checked the rope twice.`;
              return [
                comp(passage, "What is the name of Kato's goat?", "Kakoko"),
                comp(passage, "What colour is the goat?", "Brown"),
                comp(passage, "Where does Kato take the goat every morning?", "To the field", ["the field", "to the field to eat grass", "field"]),
                comp(passage, "Why does Kato tie the goat to a tree?", "So that it does not eat the neighbour's beans.", ["so it does not eat the neighbour's beans", "to stop it eating the beans", "so that it does not eat beans"]),
                comp(passage, "Whose garden did the goat run into?", "Mrs Namutebi's garden", ["Mrs Namutebi", "Namutebi's garden", "Namutebi"]),
                comp(passage, "What did the goat eat in the garden?", "Cabbages", ["many cabbages", "cabbage"]),
                comp(passage, "How did Kato help Mrs Namutebi?", "He said sorry and helped her to plant new cabbages.", ["he helped her plant new cabbages", "planting new cabbages", "he planted new cabbages"]),
                comp(passage, "What did Kato do after that day?", "He always checked the rope twice.", ["checked the rope twice", "he checked the rope twice", "always checked the rope"]),
              ];
            })(),
          },
        },
      ],
    },
    {
      subject: "literacy-1",
      topics: [
        {
          topic: "theme-5-living-things-plants",
          notes: [{
            title: "Living Things: Plants",
            summary: "Parts of a plant and their work, what plants need, and how plants are useful.",
            minutes: 6,
            content: `# Plants

Plants are **living things**. They grow, make food, and produce seeds.

## Parts of a plant and their work
| Part | Work |
|---|---|
| **Roots** | hold the plant firmly in the soil; take in water and mineral salts |
| **Stem** | holds up the leaves and flowers; carries water from roots to leaves |
| **Leaves** | make food for the plant using sunlight (the plant's "kitchen") |
| **Flowers** | make fruits and seeds |
| **Fruits** | protect the seeds |
| **Seeds** | grow into new plants |

## What plants need to grow
**Water · sunlight · air · soil (mineral salts) · warmth**

## Types of plants
- **Food crops**: maize, beans, cassava, bananas (matooke), sweet potatoes, millet
- **Cash crops**: coffee, cotton, tea, sugar cane
- **Trees**: mango, jackfruit, eucalyptus, pine
- **Flowers**: roses, hibiscus, sunflower

## How plants are useful
Food · medicine (herbs) · timber for houses and furniture · firewood · shade · clean air · fodder for animals · fibres for mats and ropes · beauty.

## Caring for plants
Water them, weed around them, add manure, protect them from animals, do not break branches.

## Germination
A seed needs **water, air and warmth** to germinate (start growing). The young plant is called a **seedling**.
`,
          }],
          quiz: {
            questions: [
              mcq("Which part of a plant takes in water from the soil?", ["leaves", "flowers", "roots", "fruits"], "roots"),
              mcq("Which part of a plant makes food?", ["roots", "stem", "leaves", "seeds"], "leaves"),
              short("Which part of the plant becomes the fruit?", "The flower", ["flower", "flowers"]),
              short("Name one thing a plant needs to grow.", "Water", ["sunlight", "air", "soil", "warmth", "light", "sun"]),
              mcq("Which of these is a cash crop?", ["beans", "coffee", "cassava", "sweet potatoes"], "coffee"),
              short("Give one use of plants to people.", "Food", ["medicine", "timber", "firewood", "shade", "fodder", "clean air", "building materials", "fruits"]),
              fill("A young plant that has just grown from a seed is called a ______.", ["seedling"]),
              short("Name one thing a seed needs to germinate.", "Water", ["air", "warmth", "moisture", "heat"]),
              mcq("Which part of a plant protects the seeds?", ["root", "fruit", "stem", "leaf"], "fruit"),
              draw("Draw a bean plant and label the roots, stem and leaves.", "Plant drawing with roots below, a stem and leaves labelled (1 mark per correct label, max 3)."),
            ],
          },
        },
      ],
    },
  ],
};
