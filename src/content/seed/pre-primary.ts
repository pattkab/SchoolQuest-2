import { ClassContent, mcq, fill, num, short, draw } from "./types";

export const baby: ClassContent = {
  class: "baby",
  subjects: [
    {
      subject: "mathematical-concepts",
      topics: [
        {
          topic: "counting-1-to-10",
          notes: [{
            title: "Let's Count 1 to 10",
            summary: "Count with songs, fingers and pictures.",
            minutes: 3,
            content: `# Let's Count! 🎈

Point to each picture and count out loud with a grown-up.

| | |
|---|---|
| 🍌 | **1** one |
| 🍌🍌 | **2** two |
| 🍌🍌🍌 | **3** three |
| 🍌🍌🍌🍌 | **4** four |
| 🍌🍌🍌🍌🍌 | **5** five |

Now use your fingers! Show **1** finger ... **2** fingers ... up to **5** fingers on one hand, and **10** on both hands.

## Counting song
*One, two, buckle my shoe,*
*Three, four, knock at the door,*
*Five, six, pick up sticks,*
*Seven, eight, lay them straight,*
*Nine, ten, a big fat hen!*

## Try at home
- Count the cups on the table.
- Count the chairs in the room.
- Count your toes!
`,
          }],
          quiz: {
            title: "Counting fun",
            questions: [
              mcq("How many bananas? 🍌🍌🍌", ["2", "3", "4"], "3"),
              mcq("How many balls? ⚽⚽", ["1", "2", "3"], "2"),
              mcq("How many cats? 🐱🐱🐱🐱🐱", ["4", "5", "6"], "5"),
              mcq("Which number comes after 2?", ["1", "3", "5"], "3"),
              mcq("How many fingers are on one hand?", ["3", "5", "10"], "5"),
              mcq("How many eggs? 🥚", ["1", "2", "3"], "1"),
              mcq("Which group has MORE? 🍎🍎🍎🍎 or 🍎🍎", ["🍎🍎🍎🍎", "🍎🍎"], "🍎🍎🍎🍎"),
              draw("Draw 3 circles.", "Three circle shapes drawn."),
            ],
          },
        },
      ],
    },
    {
      subject: "language-development",
      topics: [
        {
          topic: "parts-of-the-body",
          quiz: {
            title: "My body",
            questions: [
              mcq("What do we use to see? 👀", ["eyes", "ears", "feet"], "eyes"),
              mcq("What do we use to hear? 👂", ["nose", "ears", "hands"], "ears"),
              mcq("What do we use to walk?", ["hands", "legs", "mouth"], "legs"),
              mcq("What do we use to smell a flower?", ["nose", "eyes", "ears"], "nose"),
              mcq("How many hands do you have?", ["1", "2", "3"], "2"),
              draw("Draw your face with two eyes.", "A face with two eyes."),
            ],
          },
        },
      ],
    },
    {
      subject: "health-habits",
      topics: [
        {
          topic: "washing-hands",
          notes: [{
            title: "Clean Hands, Happy Me!",
            summary: "When and how to wash hands.",
            minutes: 3,
            content: `# Clean Hands 🧼

## When do we wash our hands?
- 🍽️ Before eating
- 🚽 After using the toilet
- 🤧 After sneezing or blowing the nose
- 🐕 After touching animals
- 🏃 After playing outside

## How to wash
1. Wet your hands with **water**.
2. Put on **soap**.
3. Rub, rub, rub — the front, the back and between the fingers (sing "Happy Birthday" twice!).
4. Rinse with clean water.
5. Dry with a clean towel.

Germs are too small to see, but soap and water chase them away!
`,
          }],
          quiz: {
            questions: [
              mcq("What do we use to wash our hands?", ["soap and water", "sand", "milk"], "soap and water"),
              mcq("When should we wash our hands?", ["before eating", "while sleeping", "never"], "before eating"),
              mcq("After using the toilet we should...", ["wash our hands", "eat", "sleep"], "wash our hands"),
              mcq("What do we use to dry our hands?", ["a clean towel", "a shoe", "a book"], "a clean towel"),
              mcq("Who can see germs?", ["nobody, they are too small", "everyone", "only babies"], "nobody, they are too small"),
            ],
          },
        },
      ],
    },
  ],
};

export const middle: ClassContent = {
  class: "middle",
  subjects: [
    {
      subject: "mathematical-concepts",
      topics: [
        {
          topic: "shapes-around-us",
          notes: [{
            title: "Shapes Around Us",
            summary: "Circle, square, triangle and rectangle.",
            minutes: 3,
            content: `# Shapes 🔵🟥🔺

| Shape | Name | Sides | Things that look like it |
|---|---|---|---|
| 🔵 | **circle** | 0 (it is round) | ball, plate, coin, the sun |
| 🟥 | **square** | 4 equal sides | window, handkerchief, dice |
| 🔺 | **triangle** | 3 sides | roof, slice of pizza, samosa |
| ▬ | **rectangle** | 4 sides, 2 long and 2 short | door, book, table |

## Shape hunt
Look around your room. Can you find a **circle**? A **rectangle**? Say the name out loud!

## Trace and say
Trace each shape in the air with your finger: round and round for a circle; one-two-three for a triangle.
`,
          }],
          quiz: {
            questions: [
              mcq("Which shape is round like a ball?", ["circle", "square", "triangle"], "circle"),
              mcq("How many sides does a triangle have?", ["2", "3", "4"], "3"),
              mcq("A door looks like a...", ["circle", "rectangle", "triangle"], "rectangle"),
              mcq("Which shape has 4 equal sides?", ["square", "circle", "triangle"], "square"),
              mcq("The roof of a house looks like a...", ["triangle", "circle", "rectangle"], "triangle"),
              mcq("How many sides does a circle have?", ["0", "3", "4"], "0"),
              draw("Draw a square and a circle.", "A four-sided square and a round circle drawn."),
            ],
          },
        },
        {
          topic: "counting-to-20",
          quiz: {
            title: "Counting to 20",
            questions: [
              mcq("What comes after 9?", ["8", "10", "11"], "10"),
              mcq("What comes after 14?", ["13", "15", "16"], "15"),
              mcq("Count: 🌟🌟🌟🌟🌟🌟🌟🌟", ["7", "8", "9"], "8"),
              mcq("Which is more: 12 or 7?", ["12", "7"], "12"),
              mcq("Which number is missing? 16, 17, __, 19", ["18", "20", "15"], "18"),
              fill("Write the number ten in figures.", ["10"]),
              mcq("How many toes do you have on both feet?", ["5", "10", "20"], "10"),
            ],
          },
        },
      ],
    },
    {
      subject: "reading",
      topics: [
        {
          topic: "letter-sounds-a-m",
          notes: [{
            title: "Letter Sounds a to m",
            summary: "Say the sound of each letter with a picture word.",
            minutes: 4,
            content: `# Letter Sounds 🔤

Say the **sound**, not just the name!

| Letter | Sound word |
|---|---|
| **a** | a – a – **apple** 🍎 |
| **b** | b – b – **ball** ⚽ |
| **c** | c – c – **cat** 🐱 |
| **d** | d – d – **dog** 🐶 |
| **e** | e – e – **egg** 🥚 |
| **f** | f – f – **fish** 🐟 |
| **g** | g – g – **goat** 🐐 |
| **h** | h – h – **hen** 🐔 |
| **i** | i – i – **ink** 🖋️ |
| **j** | j – j – **jug** 🫖 |
| **k** | k – k – **kite** 🪁 |
| **l** | l – l – **leaf** 🍃 |
| **m** | m – m – **mango** 🥭 |

## Blend two sounds
**a** + **t** = **at** · **i** + **n** = **in**

## Game
Find something in your home that starts with **b**. Then with **m**.
`,
          }],
          quiz: {
            questions: [
              mcq("Which word starts with the sound 'b'?", ["ball", "cat", "dog"], "ball"),
              mcq("Which word starts with the sound 'm'?", ["fish", "mango", "egg"], "mango"),
              mcq("What is the first sound in 'goat'?", ["g", "d", "k"], "g"),
              mcq("Which picture word goes with the letter 'f'?", ["fish 🐟", "hen 🐔", "leaf 🍃"], "fish 🐟"),
              mcq("Which letter comes after 'c' in the alphabet?", ["b", "d", "e"], "d"),
              mcq("Which word starts with 'a'?", ["apple", "jug", "kite"], "apple"),
            ],
          },
        },
      ],
    },
    {
      subject: "social-development",
      topics: [
        {
          topic: "my-family",
          quiz: {
            title: "My family",
            questions: [
              mcq("Who is your mother's mother?", ["grandmother", "sister", "aunt"], "grandmother"),
              mcq("A boy born to your parents is your...", ["brother", "uncle", "father"], "brother"),
              mcq("Your father's brother is your...", ["uncle", "cousin", "grandfather"], "uncle"),
              mcq("Who cooks food and takes care of you at home?", ["parents", "a stranger", "a dog"], "parents"),
              mcq("What do we say when someone gives us something?", ["thank you", "go away", "nothing"], "thank you"),
              mcq("What do we say when we meet someone in the morning?", ["good morning", "good night", "goodbye"], "good morning"),
            ],
          },
        },
      ],
    },
  ],
};

export const top: ClassContent = {
  class: "top",
  subjects: [
    {
      subject: "mathematical-concepts",
      topics: [
        {
          topic: "simple-addition",
          notes: [{
            title: "Adding Small Numbers",
            summary: "Put groups together and count all.",
            minutes: 4,
            content: `# Adding ➕

To **add**, we put things together and count them all.

🍎🍎 + 🍎 = 🍎🍎🍎 → **2 + 1 = 3**

🐥🐥🐥 + 🐥🐥 = **3 + 2 = 5**

## Use your fingers
Show 4 fingers on one hand. Show 2 fingers on the other. Count them all: **4 + 2 = 6**.

## Number line
0 — 1 — 2 — 3 — 4 — 5 — 6 — 7 — 8 — 9 — 10
Start at **3**, jump **2** steps forward → land on **5**. So 3 + 2 = 5.

## Adding zero
When you add **0**, the number stays the same: 6 + 0 = **6**.

## Practice
| 1 + 1 = 2 | 2 + 2 = 4 | 3 + 3 = 6 | 4 + 4 = 8 | 5 + 5 = 10 |
|---|---|---|---|---|
`,
          }],
          quiz: {
            questions: [
              num("2 + 3 =", 5),
              num("4 + 1 =", 5),
              num("5 + 2 =", 7),
              num("3 + 3 =", 6),
              num("6 + 0 =", 6),
              num("🐥🐥 + 🐥🐥🐥 = ?", 5),
              num("Amina has 4 sweets. Her friend gives her 3 more. How many sweets does she have?", 7),
              num("1 + 8 =", 9),
            ],
          },
        },
        {
          topic: "number-writing",
          quiz: {
            title: "Writing numbers",
            questions: [
              fill("Write the number six in figures.", ["6"]),
              fill("Write the number that comes after 7.", ["8"]),
              fill("Write the number before 5.", ["4"]),
              mcq("Which number is 'three'?", ["3", "8", "5"], "3"),
              fill("Write 'ten' in figures.", ["10"]),
              mcq("Which is the number 'nine'?", ["6", "9", "4"], "9"),
              draw("Write the numbers 1 to 5 in order.", "Digits 1, 2, 3, 4, 5 written in order and correctly formed."),
            ],
          },
        },
      ],
    },
    {
      subject: "reading",
      topics: [
        {
          topic: "three-letter-words",
          notes: [{
            title: "Reading Three-letter Words",
            summary: "Blend sounds to read short words.",
            minutes: 4,
            content: `# Three-letter Words 📖

Say each sound, then say them fast together!

## -at words
c-a-t **cat** 🐱 · h-a-t **hat** 🎩 · m-a-t **mat** · r-a-t **rat** 🐀 · b-a-t **bat**

## -en words
h-e-n **hen** 🐔 · p-e-n **pen** 🖊️ · t-e-n **ten** · m-e-n **men**

## -ig / -in words
p-i-g **pig** 🐷 · b-i-g **big** · w-i-g **wig** · p-i-n **pin** · t-i-n **tin**

## -og / -ot words
d-o-g **dog** 🐶 · l-o-g **log** · f-o-g **fog** · p-o-t **pot** · h-o-t **hot**

## -ug / -un words
j-u-g **jug** · b-u-g **bug** 🐛 · m-u-g **mug** · s-u-n **sun** ☀️ · r-u-n **run**

## Read the sentences
- The **cat** sat on the **mat**.
- A **big pig** is in the **pen**.
- The **dog** can **run** in the **sun**.
`,
          }],
          quiz: {
            questions: [
              mcq("Which word is 'c-a-t'?", ["cat", "cot", "cut"], "cat"),
              mcq("Which picture matches 'hen'?", ["🐔", "🐶", "🐷"], "🐔"),
              mcq("Which word rhymes with 'dog'?", ["log", "cat", "sun"], "log"),
              mcq("What is the middle sound in 'pig'?", ["i", "a", "o"], "i"),
              mcq("Which word is the name of something hot in the sky?", ["sun", "mat", "pen"], "sun"),
              fill("Finish the word: p _ g (a farm animal)", ["pig"]),
              fill("Finish the word: h _ t (you wear it on your head)", ["hat"]),
              mcq("Read: 'The cat sat on the ___.' Which word fits?", ["mat", "sun", "jug"], "mat"),
            ],
          },
        },
      ],
    },
    {
      subject: "writing",
      topics: [
        {
          topic: "writing-my-name",
          quiz: {
            title: "Writing letters and my name",
            questions: [
              mcq("Which letter is the capital (big) 'a'?", ["A", "a", "e"], "A"),
              mcq("Names of people begin with a...", ["capital letter", "small letter", "number"], "capital letter"),
              mcq("Which is written correctly?", ["Musa", "musa", "MUsa"], "Musa"),
              mcq("Which hand do most people write with?", ["right hand", "foot", "head"], "right hand"),
              draw("Write your name neatly on the line.", "Name written with a capital first letter and clear letter forms."),
              draw("Write the small letters a, b, c.", "Letters a, b, c correctly formed."),
            ],
          },
        },
      ],
    },
    {
      subject: "english",
      topics: [
        {
          topic: "greetings",
          quiz: {
            title: "Greetings",
            questions: [
              mcq("What do we say in the morning?", ["Good morning", "Good night", "Goodbye"], "Good morning"),
              mcq("What do we say in the afternoon?", ["Good afternoon", "Good morning", "Good night"], "Good afternoon"),
              mcq("What do we say before we sleep?", ["Good night", "Good morning", "Hello"], "Good night"),
              mcq("Someone says 'How are you?' You say...", ["I am fine, thank you.", "Good night.", "Sit down."], "I am fine, thank you."),
              mcq("When you leave school you say...", ["Goodbye", "Good morning", "Come in"], "Goodbye"),
              mcq("What do we say when we want something?", ["Please", "No", "Go"], "Please"),
            ],
          },
        },
      ],
    },
  ],
};
