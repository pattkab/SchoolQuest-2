import { ClassContent, mcq, fill, num, short, tf, long, comp, draw } from "./types";

export const p7: ClassContent = {
  class: "p7",
  subjects: [
    // ──────────────────────────────── MATHEMATICS ────────────────────────────
    {
      subject: "mathematics",
      topics: [
        {
          topic: "sets",
          notes: [{
            title: "Sets: Symbols, Venn Diagrams and Problems",
            summary: "Revise set language, Venn diagrams with two sets, and the PLE style 'n(A ∪ B)' problems.",
            minutes: 10,
            content: `# Sets

A **set** is a well-defined collection of objects called **members** or **elements**. We write sets with curly brackets, e.g. \`A = {2, 4, 6, 8}\`.

## Key symbols
| Symbol | Meaning | Example |
|---|---|---|
| ∈ | is a member of | 4 ∈ A |
| ∉ | is not a member of | 5 ∉ A |
| n(A) | number of members in A | n(A) = 4 |
| ∪ | union (all members in either set) | A ∪ B |
| ∩ | intersection (members in both sets) | A ∩ B |
| ⊂ | is a subset of | {2, 4} ⊂ A |
| { } or ∅ | empty set | |
| ε or U | universal set | |
| A' | complement of A (members not in A) | |

## Types of sets
- **Equal sets** have exactly the same members: {a, b, c} = {c, b, a}.
- **Equivalent sets** have the same *number* of members: {1, 2, 3} ↔ {x, y, z}.
- **Disjoint sets** have no common members, so A ∩ B = { }.
- **Subsets**: a set with *n* members has **2ⁿ** subsets. {a, b, c} has 2³ = 8 subsets.

## Venn diagrams with two sets
When a question says "**n(A) = 15, n(B) = 12, n(A ∩ B) = 5**", draw two overlapping circles:
- Put **5** in the overlap.
- A only = 15 − 5 = **10**.
- B only = 12 − 5 = **7**.
- n(A ∪ B) = 10 + 5 + 7 = **22**.

### Worked PLE example
In a class of 40 pupils, 25 like Maths (M), 20 like Science (S), and 8 like neither. How many like both?

1. Pupils who like at least one subject = 40 − 8 = 32.
2. Let x = both. Then (25 − x) + x + (20 − x) = 32 → 45 − x = 32 → **x = 13**.
3. Check: Maths only = 12, both = 13, Science only = 7, neither = 8. Total = 40 ✓

> **Tip:** Always label the "neither" region outside the circles but inside the rectangle (universal set).

## Common mistakes
- Forgetting that the overlap is counted **once** in the union.
- Confusing ∪ (union = "or") with ∩ (intersection = "and").
`,
          }],
          quiz: {
            title: "Sets practice",
            questions: [
              mcq("Given A = {1, 2, 3, 4} and B = {3, 4, 5}, find A ∩ B.", ["{1, 2}", "{3, 4}", "{1, 2, 3, 4, 5}", "{5}"], "{3, 4}", "The intersection contains members found in BOTH sets."),
              mcq("How many subsets does the set {p, q, r} have?", ["3", "6", "8", "9"], "8", "A set with n members has 2ⁿ subsets: 2³ = 8."),
              num("If n(P) = 18, n(Q) = 14 and n(P ∩ Q) = 6, find n(P ∪ Q).", 26, "n(P ∪ Q) = 18 + 14 − 6 = 26."),
              num("In a class of 45 pupils, 30 play football, 25 play netball and 5 play neither. How many pupils play both games?", 15, "At least one = 40. 30 + 25 − x = 40 → x = 15."),
              fill("A set with no members is called an ______ set.", ["empty", "null"], "The empty set is written { } or ∅."),
              short("List the members of the set of even numbers between 1 and 11.", "{2, 4, 6, 8, 10}", ["2, 4, 6, 8, 10", "2,4,6,8,10"], "Even numbers are divisible by 2."),
              tf("The sets {1, 2, 3} and {a, b, c} are equal sets.", false, "They are equivalent (same number of members) but not equal."),
              mcq("Which symbol means 'is a subset of'?", ["∈", "∩", "⊂", "∪"], "⊂"),
              num("Set K has 5 members. How many subsets of K have at least one member?", 31, "2⁵ = 32 subsets, minus the empty set = 31."),
              long("A survey of 50 farmers found that 32 grow maize, 28 grow beans and 6 grow neither. Draw a Venn diagram and find how many farmers grow only beans.", "Both = 32 + 28 − 44 = 16. Beans only = 28 − 16 = 12. Award marks for a correctly labelled Venn diagram (2), correct value for both (1) and final answer 12 (1).", 4),
            ],
          },
        },
        {
          topic: "fractions-decimals-percentages",
          notes: [{
            title: "Fractions, Decimals and Percentages",
            summary: "Convert between the three forms, operate with fractions, and solve PLE word problems.",
            minutes: 12,
            content: `# Fractions, Decimals and Percentages

These are three ways of writing **part of a whole**.

## Converting
- **Fraction → decimal:** divide the numerator by the denominator. ¾ = 3 ÷ 4 = **0.75**
- **Decimal → fraction:** write over 10, 100 or 1000 then simplify. 0.35 = 35/100 = **7/20**
- **Fraction → percentage:** multiply by 100%. ⅖ × 100% = **40%**
- **Percentage → fraction:** write over 100 and simplify. 45% = 45/100 = **9/20**

## Operations with fractions
1. **Addition/subtraction:** find the LCM of the denominators.
   ⅔ + ¼ = 8/12 + 3/12 = **11/12**
2. **Multiplication:** multiply numerators and denominators (cancel first if possible).
   ⅗ × 10/9 = (3 × 10)/(5 × 9) = 30/45 = **⅔**
3. **Division:** multiply by the reciprocal.
   ⅝ ÷ ¼ = ⅝ × 4/1 = 20/8 = **2½**

> **BODMAS** applies to fractions too: Brackets, Of, Division, Multiplication, Addition, Subtraction.

## Percentages of quantities
20% of UGX 45,000 = 20/100 × 45,000 = **UGX 9,000**

## Percentage increase and decrease
- New value = original × (100 ± change)/100.
- A shirt costing UGX 20,000 is increased by 15%: 20,000 × 115/100 = **UGX 23,000**.
- Percentage change = (change ÷ original) × 100%.

## Finding the whole from a part
If 30% of a number is 42, the number = 42 ÷ 30 × 100 = **140**.

## Fractions of a remainder (PLE favourite)
A man spent ⅓ of his salary on rent and ¼ of the **remainder** on food. If he remained with UGX 90,000, what was his salary?
- After rent: ⅔ remains. Food = ¼ × ⅔ = ⅙. Left = ⅔ − ⅙ = **½**.
- ½ of salary = 90,000 → salary = **UGX 180,000**.
`,
          }],
          quiz: {
            title: "Fractions, decimals & percentages practice",
            questions: [
              mcq("Change ⅝ to a decimal.", ["0.58", "0.625", "0.65", "0.8"], "0.625", "5 ÷ 8 = 0.625."),
              mcq("Express 0.45 as a fraction in its lowest terms.", ["45/100", "9/20", "4/5", "9/25"], "9/20"),
              num("Work out: ⅔ + ¼. Give your answer as a fraction in twelfths (enter the numerator only).", 11, "8/12 + 3/12 = 11/12."),
              num("Find 35% of 240.", 84, "35/100 × 240 = 84."),
              num("A dress costing UGX 50,000 is sold at a discount of 12%. Find the selling price in UGX.", 44000, "50,000 × 88/100 = 44,000."),
              num("If 40% of a number is 60, find the number.", 150, "60 ÷ 40 × 100 = 150."),
              num("Work out ⅗ ÷ 9/10 and give your answer as a fraction a/b (enter the numerator of the simplified fraction).", 2, "⅗ × 10/9 = 30/45 = ⅔. Numerator is 2."),
              short("Simplify 2⅓ × 1½ (give a mixed number or improper fraction).", "3½", ["7/2", "3 1/2", "3.5"], "7/3 × 3/2 = 21/6 = 7/2 = 3½."),
              num("Nambi spent ¼ of her money on books and ⅓ of the remainder on transport. If she remained with UGX 24,000, how much money did she have at first (UGX)?", 48000, "After books ¾ remains; transport = ⅓ × ¾ = ¼; left = ¾ − ¼ = ½ → 24,000 × 2 = 48,000."),
              mcq("The price of sugar rose from UGX 4,000 to UGX 5,000 per kg. What is the percentage increase?", ["20%", "25%", "10%", "50%"], "25%", "Increase = 1,000. 1,000/4,000 × 100% = 25%."),
            ],
          },
        },
        {
          topic: "algebra",
          notes: [{
            title: "Algebra: Equations and Inequalities",
            summary: "Simplify expressions, solve linear equations and inequalities, and form equations from word problems.",
            minutes: 10,
            content: `# Algebra

Algebra uses **letters** to stand for numbers we do not yet know.

## Simplifying expressions
Collect **like terms** (same letter and power).
- 3a + 5b − a + 2b = **2a + 7b**
- 4(x + 3) = **4x + 12** (expand by multiplying every term inside the bracket)

## Substitution
If x = 3 and y = 2, then 2x² − y = 2(9) − 2 = **16**.

## Solving equations
Whatever you do to one side, do to the other.

**Example 1:** 3x − 7 = 11 → 3x = 18 → **x = 6**

**Example 2:** 2(x + 4) = 18 → 2x + 8 = 18 → 2x = 10 → **x = 5**

**Example 3 (fractions):** x/4 + 2 = 5 → x/4 = 3 → **x = 12**

**Example 4 (unknown on both sides):** 5y − 3 = 2y + 9 → 3y = 12 → **y = 4**

## Inequalities
Solve like equations, but when you **multiply or divide by a negative** number, **reverse** the sign.
- 2x + 1 < 9 → 2x < 8 → **x < 4**
- 5 − x ≥ 2 → −x ≥ −3 → **x ≤ 3**

Represent on a number line: an open circle (○) for < or >, a closed circle (●) for ≤ or ≥.

## Forming equations from words
"Okello is 3 years older than twice Amina's age. Their total age is 27."
- Let Amina = a. Okello = 2a + 3.
- a + 2a + 3 = 27 → 3a = 24 → **a = 8**, Okello = 19.

## Angles and algebra
Angles on a straight line add to 180°: (2x + 30)° + x° = 180° → 3x = 150 → **x = 50**.
`,
          }],
          quiz: {
            questions: [
              mcq("Simplify 5m + 3n − 2m + n.", ["3m + 4n", "7m + 2n", "3m + 2n", "7m + 4n"], "3m + 4n"),
              num("Solve for x: 4x − 9 = 15.", 6, "4x = 24, x = 6."),
              num("Solve: 2(y + 3) = 16.", 5, "2y + 6 = 16 → y = 5."),
              num("Solve: p/3 + 4 = 7.", 9, "p/3 = 3 → p = 9."),
              num("If a = 4 and b = 3, find the value of 2a² − 3b.", 23, "2(16) − 9 = 23."),
              num("Solve: 7k − 5 = 3k + 11.", 4, "4k = 16, k = 4."),
              mcq("Solve the inequality 3x − 2 < 10.", ["x < 4", "x > 4", "x < 6", "x ≤ 4"], "x < 4"),
              num("The sum of three consecutive numbers is 48. Find the smallest number.", 15, "n + (n+1) + (n+2) = 48 → 3n = 45 → n = 15."),
              num("Two angles on a straight line are (3x + 20)° and (x + 40)°. Find the value of x.", 30, "4x + 60 = 180 → x = 30."),
              long("Mukasa bought 3 pens and 2 books for UGX 11,000. A book costs UGX 1,000 more than a pen. Form an equation and find the cost of a pen.", "Let pen = p; book = p + 1000. 3p + 2(p + 1000) = 11000 → 5p = 9000 → p = 1800. Marks: equation (2), solution (2).", 4),
            ],
          },
        },
        {
          topic: "commercial-arithmetic",
          notes: [{
            title: "Commercial Arithmetic: Profit, Loss, Discount and Interest",
            summary: "Money problems that appear every year in PLE Section B.",
            minutes: 10,
            content: `# Commercial Arithmetic

## Profit and loss
- **Profit** = Selling price − Cost price (when SP > CP)
- **Loss** = Cost price − Selling price (when CP > SP)
- **Percentage profit** = Profit ÷ Cost price × 100%
- **Percentage loss** = Loss ÷ Cost price × 100%

*Example:* A trader bought a radio at UGX 60,000 and sold it at UGX 75,000.
Profit = 15,000. % profit = 15,000/60,000 × 100% = **25%**.

### Finding the cost price
Sold at UGX 46,000 making a 15% profit: CP = 46,000 ÷ 115 × 100 = **UGX 40,000**.

## Discount
A **discount** is a reduction on the marked price.
Marked price UGX 80,000, discount 10% → pay 80,000 × 90/100 = **UGX 72,000**.

## Simple interest
**I = P × R × T ÷ 100**, where P = principal, R = rate per year, T = time in years.
UGX 200,000 at 12% p.a. for 2½ years: I = 200,000 × 12 × 2.5 ÷ 100 = **UGX 60,000**.
**Amount** = Principal + Interest = UGX 260,000.

> Convert months to years: 8 months = 8/12 = ⅔ year.

## Shopping bills
| Item | Quantity | Unit price | Cost |
|---|---|---|---|
| Sugar | 2 kg | UGX 4,500 | UGX 9,000 |
| Soap | 3 bars | UGX 3,000 | UGX 9,000 |
| **Total** | | | **UGX 18,000** |

## Exchange rates and hire purchase
- If 1 US$ = UGX 3,700, then US$ 50 = **UGX 185,000**.
- **Hire purchase**: deposit + (monthly instalment × number of months). Compare with cash price to find extra paid.
`,
          }],
          quiz: {
            questions: [
              num("A trader bought a bicycle at UGX 150,000 and sold it at UGX 180,000. Find the percentage profit.", 20, "Profit 30,000; 30,000/150,000 × 100 = 20%."),
              num("A dress marked at UGX 60,000 is sold at a 15% discount. How much does a customer pay (UGX)?", 51000),
              num("Find the simple interest on UGX 300,000 at 8% per annum for 3 years (UGX).", 72000, "I = 300,000 × 8 × 3 ÷ 100."),
              num("Achen sold a goat at UGX 92,000 making a profit of 15%. What was the cost price (UGX)?", 80000, "92,000 ÷ 115 × 100 = 80,000."),
              num("Find the simple interest on UGX 120,000 at 10% per year for 9 months (UGX).", 9000, "T = 9/12 = ¾ year. I = 120,000 × 10 × 0.75 ÷ 100 = 9,000."),
              num("If 1 US dollar costs UGX 3,750, how many shillings is US$ 40?", 150000),
              mcq("A shopkeeper bought 5 trays of eggs at UGX 12,000 each and sold all at UGX 13,500 each. His total profit was:", ["UGX 1,500", "UGX 7,500", "UGX 6,000", "UGX 67,500"], "UGX 7,500", "Profit per tray 1,500 × 5 = 7,500."),
              num("A TV costs UGX 900,000 cash. On hire purchase one pays a deposit of UGX 300,000 and 6 instalments of UGX 120,000. How much more is paid on hire purchase (UGX)?", 120000, "300,000 + 720,000 = 1,020,000; extra = 120,000."),
              num("Mugisha deposited money in a bank at 5% p.a. simple interest. After 2 years the interest was UGX 30,000. How much did he deposit (UGX)?", 300000, "P = I × 100 ÷ (R × T) = 30,000 × 100 ÷ 10."),
              long("A trader bought 40 kg of beans at UGX 2,500 per kg. He sold 30 kg at UGX 3,200 per kg and the rest at UGX 2,000 per kg. Find his percentage profit.", "CP = 100,000. SP = 96,000 + 20,000 = 116,000. Profit = 16,000. % = 16%. Marks: CP (1), SP (1), profit (1), % (1).", 4),
            ],
          },
        },
      ],
    },

    // ──────────────────────────────── ENGLISH ────────────────────────────────
    {
      subject: "english",
      topics: [
        {
          topic: "tenses",
          notes: [{
            title: "Tenses: Present, Past, Future and Perfect",
            summary: "Master the 12 tenses tested in PLE Section A with signal words and sentence patterns.",
            minutes: 10,
            content: `# Tenses

A **tense** shows *when* an action happens.

## Simple tenses
| Tense | Form | Example | Signal words |
|---|---|---|---|
| Simple present | verb / verb+s | She **walks** to school. | every day, always, usually |
| Simple past | verb+ed / irregular | She **walked** to school. | yesterday, last week, ago, in 2020 |
| Simple future | will + verb | She **will walk** to school. | tomorrow, next week, soon |

## Continuous tenses (be + verb-ing)
- Present: She **is walking** now.
- Past: She **was walking** when it started raining.
- Future: She **will be walking** at 8 o'clock.

## Perfect tenses (have + past participle)
- Present perfect: She **has walked** 5 km already. (just, already, yet, since, for, ever, never)
- Past perfect: She **had walked** home **before** it rained. (used for the *earlier* of two past actions)
- Future perfect: By noon she **will have walked** 10 km.

## Irregular verbs to memorise
go–went–gone · see–saw–seen · write–wrote–written · eat–ate–eaten · begin–began–begun · take–took–taken · speak–spoke–spoken · ring–rang–rung · drink–drank–drunk · lie–lay–lain · lay–laid–laid

## PLE patterns
1. **"Since / for"** → present perfect: We **have lived** here **since** 2019.
2. **"By the time ... "** → past perfect: By the time we arrived, the bus **had left**.
3. **"While"** → past continuous + simple past: While I **was reading**, the lights **went** off.
4. **"If" (first conditional)** → If it rains, we **shall/will stay** indoors.
5. **"Wish"** → past tense: I wish I **had** a bicycle.

> Watch the **third person singular -s** in the simple present: *He goes*, *It rains*, *She does*.
`,
          }],
          quiz: {
            questions: [
              mcq("Choose the correct word: The children ______ football every Saturday.", ["play", "plays", "playing", "played"], "play", "Plural subject + simple present → no -s."),
              fill("Use the correct form of the verb in brackets: By the time the teacher came, the pupils ______ (finish) the work.", ["had finished"], "'By the time' + past → past perfect."),
              fill("Rewrite with the verb in brackets correctly: We ______ (live) in Mbale since 2018.", ["have lived", "have been living"], "'Since' → present perfect."),
              mcq("While I ______ my homework, the lights went off.", ["do", "did", "was doing", "am doing"], "was doing"),
              fill("Give the past participle of 'write'.", ["written"]),
              fill("Complete: If it rains tomorrow, we ______ (stay) at home.", ["shall stay", "will stay"]),
              mcq("Choose the correct sentence.", ["She has went to the market.", "She has gone to the market.", "She have gone to the market.", "She has go to the market."], "She has gone to the market."),
              fill("I wish I ______ (have) a new school bag.", ["had"], "'Wish' takes the past tense for present wishes."),
              fill("The baby ______ (sleep) now, so keep quiet.", ["is sleeping"], "'Now' → present continuous."),
              fill("Yesterday the bell ______ (ring) at exactly 8 o'clock.", ["rang"], "Past tense of ring is rang."),
            ],
          },
        },
        {
          topic: "active-and-passive-voice",
          notes: [{
            title: "Active and Passive Voice",
            summary: "Change sentences from active to passive in all common tenses.",
            minutes: 8,
            content: `# Active and Passive Voice

- **Active:** the subject *does* the action. *The dog chased the cat.*
- **Passive:** the subject *receives* the action. *The cat was chased by the dog.*

## How to change active → passive
1. The **object** of the active sentence becomes the **subject**.
2. Use the correct form of **be** + **past participle**.
3. The old subject goes after **by** (or is left out if unimportant).

| Tense | Active | Passive |
|---|---|---|
| Simple present | Musa **writes** letters. | Letters **are written** by Musa. |
| Simple past | Musa **wrote** a letter. | A letter **was written** by Musa. |
| Present continuous | Musa **is writing** a letter. | A letter **is being written** by Musa. |
| Present perfect | Musa **has written** a letter. | A letter **has been written** by Musa. |
| Simple future | Musa **will write** a letter. | A letter **will be written** by Musa. |
| Modal | Musa **can write** a letter. | A letter **can be written** by Musa. |

## Pronoun changes
I → me · he → him · she → her · we → us · they → them
*She helped **me**.* → ***I** was helped by her.*

## Questions in the passive
*Who broke the window?* → *By whom was the window broken?*
*Did he eat the food?* → *Was the food eaten by him?*

## Passive without "by"
Use when the doer is unknown or obvious: *My phone **was stolen**.*
`,
          }],
          quiz: {
            questions: [
              short("Rewrite in the passive voice: The teacher punished the boy.", "The boy was punished by the teacher.", ["The boy was punished by the teacher"]),
              short("Rewrite in the passive voice: Mary is cooking supper.", "Supper is being cooked by Mary.", ["Supper is being cooked by Mary"]),
              short("Rewrite in the passive voice: They have built a new bridge.", "A new bridge has been built by them.", ["A new bridge has been built", "A new bridge has been built by them"]),
              short("Rewrite in the passive voice: The pupils will clean the classroom.", "The classroom will be cleaned by the pupils.", ["The classroom will be cleaned by the pupils"]),
              short("Rewrite in the active voice: The letter was written by Ali.", "Ali wrote the letter.", ["Ali wrote the letter"]),
              mcq("Choose the passive form: 'Who painted this picture?'", ["By whom was this picture painted?", "Who was painted this picture?", "This picture painted by whom?", "By who this picture was painted?"], "By whom was this picture painted?"),
              short("Rewrite in the passive: She helped me.", "I was helped by her.", ["I was helped by her"]),
              short("Rewrite beginning with the given words: Someone has stolen my bag. → My bag ...", "My bag has been stolen.", ["My bag has been stolen", "My bag has been stolen by someone"]),
            ],
          },
        },
        {
          topic: "direct-and-indirect-speech",
          notes: [{
            title: "Direct and Indirect (Reported) Speech",
            summary: "Change what people said into reported speech with the correct tense and pronoun shifts.",
            minutes: 8,
            content: `# Direct and Indirect Speech

**Direct speech** gives the exact words with quotation marks: *Jane said, "I am tired."*
**Indirect speech** reports the words: *Jane said that she was tired.*

## Changes to make
### 1. Tense goes one step back
| Direct | Indirect |
|---|---|
| present simple → | past simple |
| present continuous → | past continuous |
| past simple → | past perfect |
| present perfect → | past perfect |
| will → | would |
| can → | could |
| may → | might |
| must → | had to |

### 2. Pronouns change
I → he/she · we → they · my → his/her · you → (the listener)

### 3. Time and place words change
| now → then | today → that day | tomorrow → the next/following day |
|---|---|---|
| yesterday → the previous day / the day before | here → there | this → that |
| ago → before | next week → the following week | tonight → that night |

## Statements
*"I will come tomorrow," Peter said.* → *Peter said that he would come the following day.*

## Questions
Use **asked** + **if/whether** for yes/no questions; keep the question word for wh- questions. **No question mark** and **statement word order**.
*"Are you sick?" the nurse asked me.* → *The nurse asked me if/whether I was sick.*
*"Where do you live?" he asked.* → *He asked where I lived.*

## Commands and requests
Use **told/ordered/asked + object + to-infinitive** (or **not to**).
*"Sit down," the teacher said to us.* → *The teacher told us to sit down.*
*"Don't make noise," she said.* → *She told us not to make noise.*
`,
          }],
          quiz: {
            questions: [
              short("Change to indirect speech: \"I am going to Jinja,\" said Paul.", "Paul said that he was going to Jinja.", ["Paul said that he was going to Jinja", "Paul said he was going to Jinja"]),
              short("Change to indirect speech: \"Where do you live?\" the man asked me.", "The man asked me where I lived.", ["The man asked me where I lived", "The man asked where I lived"]),
              short("Change to indirect speech: \"Don't touch the wire,\" the teacher told the boys.", "The teacher told the boys not to touch the wire.", ["The teacher told the boys not to touch the wire"]),
              short("Change to indirect speech: \"I will see you tomorrow,\" she said.", "She said that she would see me the following day.", ["She said that she would see me the next day", "She said she would see me the following day", "She said she would see me the next day"]),
              mcq("\"Can you swim?\" Joy asked Tom. → Joy asked Tom ______.", ["if he could swim", "can he swim", "if he can swim", "whether can he swim"], "if he could swim"),
              short("Change to direct speech: Mother told me to wash the plates.", "\"Wash the plates,\" Mother told me.", ["Mother said, \"Wash the plates.\"", "\"Wash the plates,\" said Mother.", "Mother told me, \"Wash the plates.\""]),
              short("Change to indirect speech: \"We visited the zoo yesterday,\" the pupils said.", "The pupils said that they had visited the zoo the previous day.", ["The pupils said that they had visited the zoo the day before", "The pupils said they had visited the zoo the previous day"]),
            ],
          },
        },
        {
          topic: "comprehension",
          quiz: {
            title: "Comprehension: The Village Well",
            questions: (() => {
              const passage = `Every morning before the sun rose, Akello carried a yellow jerrycan to the village well. The well was two kilometres away, and the path went through a eucalyptus forest where monkeys chattered in the trees. Akello did not mind the long walk because she met her friend Opio there, and they always raced each other back home.

One day, the well was dry. The long dry season had lasted four months, and the water level had dropped below the pump. The villagers gathered around and talked worriedly. Without water, the children could not bathe before school, the cattle grew thin, and the gardens of cassava and beans began to wither.

Akello's grandmother, Nyakato, remembered a spring at the foot of Ongom Hill that her own mother had used long ago. She led the elders there, and after clearing away the bushes and stones, clean water bubbled out of the ground. The villagers built a small concrete wall around the spring to protect it, and the local council promised to dig a borehole before the next dry season.

Akello learnt an important lesson: the knowledge of old people can save a whole village.`;
              return [
                comp(passage, "Where did Akello go every morning?", "To the village well", ["the village well", "village well", "to the well", "the well"]),
                comp(passage, "How far was the well from Akello's home?", "Two kilometres", ["2 kilometres", "2 km", "two km", "two kilometers"]),
                comp(passage, "Why didn't Akello mind the long walk?", "Because she met her friend Opio there and they raced each other home.", ["she met her friend Opio", "because she met Opio", "she met her friend"]),
                comp(passage, "What caused the well to dry up?", "The long dry season that lasted four months made the water level drop below the pump.", ["the long dry season", "dry season", "the water level dropped"]),
                comp(passage, "Give one problem the villagers faced without water.", "Children could not bathe before school / cattle grew thin / gardens withered.", ["children could not bathe", "cattle grew thin", "gardens withered", "the gardens began to wither", "cattle became thin"]),
                comp(passage, "Who remembered the spring at the foot of Ongom Hill?", "Akello's grandmother, Nyakato", ["Nyakato", "Akello's grandmother", "her grandmother", "the grandmother"]),
                comp(passage, "What did the local council promise to do?", "To dig a borehole before the next dry season", ["dig a borehole", "to dig a borehole"]),
                comp(passage, "Write another word or phrase that means the same as 'wither' as used in the passage.", "dry up", ["dry up", "shrivel", "die", "become dry", "wilt"]),
                comp(passage, "What lesson did Akello learn?", "The knowledge of old people can save a whole village.", ["knowledge of old people can save a village", "old people's knowledge is important", "the knowledge of elders can save a village"]),
                comp(passage, "Suggest a suitable title for this passage.", "The Village Well", ["The Dry Well", "Akello and the Well", "The Spring at Ongom Hill", "Water for the Village", "The Village Well"]),
              ];
            })(),
          },
        },
      ],
    },

    // ──────────────────────────────── SCIENCE ────────────────────────────────
    {
      subject: "science",
      topics: [
        {
          topic: "human-body-systems",
          notes: [{
            title: "The Circulatory and Respiratory Systems",
            summary: "The heart, blood, blood vessels, breathing and gaseous exchange — PLE essentials.",
            minutes: 12,
            content: `# The Circulatory System

The circulatory (blood) system **transports** materials around the body. It is made of the **heart**, **blood vessels** and **blood**.

## The heart
- A muscular pump about the size of your fist, found in the chest slightly to the left.
- Has **four chambers**: two **atria** (upper) and two **ventricles** (lower).
- The **left ventricle** has the thickest wall because it pumps blood to the whole body.
- **Valves** prevent blood from flowing backwards.
- Beats about 72 times a minute in an adult at rest (the **pulse**).

## Blood vessels
| Vessel | Carries blood | Walls | Valves |
|---|---|---|---|
| **Arteries** | away from the heart (oxygenated, except pulmonary artery) | thick, elastic | no |
| **Veins** | towards the heart (deoxygenated, except pulmonary vein) | thin | yes |
| **Capillaries** | link arteries and veins; exchange of materials | one cell thick | no |

## Blood
- **Red blood cells** contain **haemoglobin** which carries oxygen. Made in the bone marrow.
- **White blood cells** fight germs (disease).
- **Platelets** help blood to clot.
- **Plasma** is the liquid part; carries dissolved food, carbon dioxide, hormones and waste.

Blood groups: **A, B, AB and O**. Group **O** is the universal donor; **AB** is the universal receiver.

## Diseases and care
- **Anaemia** – too few red blood cells; eat iron-rich food (liver, greens, beans).
- **High blood pressure**, **heart attack** – avoid too much salt and fat; exercise regularly.
- **Sickle cell anaemia** – inherited.

---

# The Respiratory System

Breathing takes in **oxygen** and removes **carbon dioxide**.

## Path of air
Nose/mouth → **pharynx** → **larynx** (voice box) → **trachea** (windpipe) → **bronchi** → **bronchioles** → **alveoli** (air sacs).

- Nose hairs and **mucus** trap dust and germs; the nose also warms and moistens air.
- The trachea is held open by **rings of cartilage**.
- The **epiglottis** closes the windpipe when swallowing.

## Breathing in (inhalation) vs breathing out (exhalation)
| | Inhalation | Exhalation |
|---|---|---|
| Diaphragm | contracts and flattens | relaxes and domes upward |
| Rib cage | moves up and out | moves down and in |
| Chest volume | increases | decreases |
| Air | rushes in | pushed out |

## Gaseous exchange in the alveoli
Alveoli are **many**, **thin-walled**, **moist** and surrounded by many **capillaries** — adaptations for fast diffusion of oxygen into blood and carbon dioxide out.

## Diseases of the respiratory system
Tuberculosis (TB), pneumonia, asthma, bronchitis, whooping cough, influenza, COVID-19, lung cancer (smoking).
**Prevention:** immunisation (BCG for TB), good ventilation, avoiding smoking and dusty places, covering the mouth when coughing.
`,
          }],
          quiz: {
            questions: [
              mcq("Which blood vessels carry blood away from the heart?", ["Veins", "Arteries", "Capillaries", "Valves"], "Arteries"),
              short("Name the substance in red blood cells that carries oxygen.", "Haemoglobin", ["hemoglobin"]),
              mcq("Which chamber of the heart has the thickest wall?", ["Right atrium", "Left atrium", "Right ventricle", "Left ventricle"], "Left ventricle", "It pumps blood to the whole body."),
              short("State the function of white blood cells.", "They fight germs / defend the body against disease.", ["fight germs", "fight diseases", "defend the body against disease", "kill germs", "protect the body against diseases"]),
              fill("Blood group ______ is called the universal donor.", ["O"]),
              short("Why do veins have valves?", "To prevent the backflow of blood.", ["to stop blood flowing backwards", "prevent backflow of blood", "to prevent blood from flowing back"]),
              mcq("Which structure closes the windpipe when swallowing food?", ["Larynx", "Epiglottis", "Trachea", "Diaphragm"], "Epiglottis"),
              short("Name the tiny air sacs in the lungs where gaseous exchange takes place.", "Alveoli", ["alveolus", "air sacs"]),
              mcq("What happens to the diaphragm when we breathe in?", ["It relaxes and moves up", "It contracts and flattens", "It does not move", "It moves sideways"], "It contracts and flattens"),
              short("Give one way in which alveoli are adapted for gaseous exchange.", "They have thin walls / are moist / are many / are surrounded by many capillaries.", ["thin walls", "moist", "many capillaries", "large surface area", "they are many", "surrounded by capillaries"]),
              short("Name the disease prevented by the BCG vaccine.", "Tuberculosis", ["TB"]),
              short("Give one way of preventing anaemia.", "Eating iron-rich foods such as liver, greens and beans.", ["eating iron rich foods", "eating food rich in iron", "eat liver", "eat green vegetables", "eating greens"]),
              draw("Draw a simple diagram of the heart and label the left ventricle.", "Award marks for a four-chambered shape (1) and left ventricle correctly labelled on the viewer's right-hand lower chamber (1)."),
            ],
          },
        },
        {
          topic: "electricity",
          notes: [{
            title: "Electricity and Magnetism",
            summary: "Static and current electricity, circuits, conductors, safety and magnets.",
            minutes: 10,
            content: `# Electricity

Electricity is a form of **energy**.

## Types
- **Static electricity** – charges that do not flow, e.g. a plastic ruler rubbed on hair attracts paper; **lightning**.
- **Current electricity** – flow of charges (electrons) through a conductor.

## Sources
Dry cells (batteries), generators, solar panels, hydro-electric dams (e.g. Nalubaale, Bujagali, Karuma, Isimba in Uganda), wind, car batteries.

## A simple circuit
A complete path for current. Parts: **cell** (source), **wires** (conductors), **switch** (opens/closes the circuit), **bulb** (load).
- **Closed circuit** – switch ON, current flows, bulb lights.
- **Open circuit** – switch OFF, there is a gap, bulb does not light.

### Series and parallel
| | Series | Parallel |
|---|---|---|
| Path | one path | more than one path |
| If one bulb blows | all go off | others stay on |
| Brightness | dimmer as bulbs are added | each bulb stays bright |
| Used in | torches | house wiring |

## Conductors and insulators
- **Conductors** allow current to pass: copper, aluminium, iron, graphite, salty water, the human body.
- **Insulators** do not: rubber, plastic, dry wood, glass, dry air.

## The dry cell
Parts: **carbon rod** (positive terminal), **zinc case** (negative terminal), **ammonium chloride paste** (electrolyte), manganese dioxide. It changes **chemical** energy to **electrical** energy.

## Electrical safety
- Never touch switches with wet hands.
- Do not overload sockets.
- Use **fuses** and **circuit breakers** — a fuse melts when too much current flows.
- Keep away from fallen power lines; lightning conductors protect tall buildings.
- Use insulated tools; switch off the mains before repairs.

## Energy changes in appliances
Bulb → light + heat · Iron/heater → heat · Radio → sound · Fan/motor → movement (kinetic) · Phone charger → chemical.

---

# Magnetism

A **magnet** attracts **magnetic materials**: iron, steel, nickel, cobalt. (Copper, aluminium, brass, wood are **non-magnetic**.)

- Every magnet has a **north** and a **south pole**. **Like poles repel; unlike poles attract.**
- A freely suspended magnet rests pointing **north–south** (compass).
- **Making a magnet:** stroking with another magnet (single-touch), electrical method (coil + current = electromagnet), induction.
- **Destroying a magnet:** heating, hammering/dropping, leaving poles unprotected.
- **Uses:** compass, electric bells, loudspeakers, motors, separating iron from scrap, fridge doors.
`,
          }],
          quiz: {
            questions: [
              mcq("Which of these is a good conductor of electricity?", ["Rubber", "Copper", "Dry wood", "Glass"], "Copper"),
              short("Name the part of a dry cell that acts as the positive terminal.", "Carbon rod", ["the carbon rod", "carbon"]),
              mcq("In a series circuit with three bulbs, what happens when one bulb blows?", ["The other two become brighter", "The other two stay the same", "All the bulbs go off", "Only the blown bulb goes off"], "All the bulbs go off"),
              short("State one safety precaution when using electricity at home.", "Do not touch switches with wet hands / do not overload sockets / use fuses.", ["do not touch switches with wet hands", "never touch electrical appliances with wet hands", "do not overload sockets", "use fuses", "switch off the mains before repairs", "avoid overloading sockets"]),
              fill("Like poles of a magnet ______ each other.", ["repel"]),
              mcq("Which of these materials is attracted by a magnet?", ["Aluminium", "Copper", "Iron", "Brass"], "Iron"),
              short("What energy change takes place in an electric bulb?", "Electrical energy to light and heat energy.", ["electrical to light and heat", "electrical to light", "electric energy to light energy and heat energy"]),
              short("Why are house circuits wired in parallel?", "So that if one bulb or appliance fails, the others keep working, and each receives full voltage.", ["so that other bulbs stay on when one blows", "each appliance can be switched independently", "bulbs remain bright", "if one bulb blows others remain on"]),
              short("What is the function of a fuse in a circuit?", "It melts and breaks the circuit when too much current flows, protecting appliances.", ["breaks the circuit when there is too much current", "protects appliances from excess current", "it melts when current is too high", "cuts off excess current"]),
              short("Name one hydro-electric power station in Uganda.", "Nalubaale (Owen Falls)", ["Owen Falls", "Bujagali", "Karuma", "Isimba", "Kiira", "Nalubaale"]),
              short("Give one way of destroying the magnetism of a magnet.", "Heating it / hammering it / dropping it.", ["heating", "hammering", "dropping", "heating it strongly", "hammering it"]),
              draw("Draw a simple circuit with one cell, a switch and a bulb, using symbols.", "Award marks for correct cell symbol (long and short line) (1), switch and bulb symbols connected in a closed loop (1)."),
            ],
          },
        },
        {
          topic: "communicable-diseases",
          notes: [{
            title: "Communicable Diseases and Primary Health Care",
            summary: "Germs, how diseases spread, the big disease groups and the eight elements of PHC.",
            minutes: 10,
            content: `# Communicable Diseases

A **communicable disease** can be passed from one person to another. It is caused by **germs** (pathogens): **bacteria, viruses, fungi and protozoa**.

## How diseases spread and examples
| Route | Examples | Prevention |
|---|---|---|
| **Air (droplets)** | TB, measles, influenza, whooping cough, COVID-19 | ventilation, cover the mouth, immunisation |
| **Contaminated food and water (faecal–oral)** | cholera, typhoid, dysentery, polio, diarrhoea | boil water, wash hands, use latrines, cover food |
| **Vectors** | malaria (female *Anopheles* mosquito), sleeping sickness (tsetse fly), plague (fleas), bilharzia (water snail) | mosquito nets, clear bushes, drain stagnant water |
| **Direct contact / body fluids** | HIV/AIDS, scabies, ringworm, trachoma | avoid sharing sharp objects, personal hygiene |
| **Soil (bare feet)** | hookworm, tetanus | wear shoes, immunise |

## Immunisable diseases (Uganda's routine schedule)
Tuberculosis (BCG), polio (OPV), diphtheria, whooping cough (pertussis), tetanus, hepatitis B, *Haemophilus influenzae* type b (the **pentavalent** vaccine covers the last five), pneumonia (PCV), rotavirus diarrhoea, measles-rubella, yellow fever, HPV for girls.

- **Immunity** is the body's ability to resist disease. **Natural** immunity comes from recovering from a disease or from breast milk; **artificial** immunity comes from vaccines.

## Malaria in detail
- Caused by a **protozoan** (*Plasmodium*) and spread by the female *Anopheles* mosquito.
- Signs: fever, shivering, headache, joint pains, vomiting, loss of appetite.
- Prevention: sleep under a **treated mosquito net**, drain stagnant water, clear bushes, spray houses, use repellents.
- Treatment: **ACTs** (Artemisinin-based Combination Therapy) from a health worker — complete the dose.

## Primary Health Care (PHC)
Essential health care made available to everyone at a cost the community can afford. The **8 elements**:
1. Health education
2. Proper nutrition
3. Safe water and basic sanitation
4. Maternal and child health care (including **family planning**)
5. Immunisation
6. Prevention and control of endemic diseases
7. Treatment of common diseases and injuries
8. Provision of essential drugs

**Principles:** community participation, equity (fairness), appropriate technology, inter-sectoral collaboration.
`,
          }],
          quiz: {
            questions: [
              mcq("Which germ causes malaria?", ["Bacteria", "Virus", "Protozoa", "Fungus"], "Protozoa", "Plasmodium is a protozoan carried by the female Anopheles mosquito."),
              short("Name the vector that spreads sleeping sickness.", "Tsetse fly", ["tsetse", "tse tse fly"]),
              mcq("Which of these diseases is spread through contaminated water?", ["Measles", "Cholera", "Tuberculosis", "Scabies"], "Cholera"),
              short("Give one way of preventing the spread of airborne diseases.", "Covering the mouth when coughing / good ventilation / immunisation.", ["cover the mouth when coughing", "good ventilation", "immunisation", "opening windows", "isolating the sick", "wearing a mask"]),
              short("Name the vaccine that protects against tuberculosis.", "BCG"),
              fill("The ability of the body to resist disease is called ______.", ["immunity"]),
              short("State any two elements of Primary Health Care.", "Any two of: health education, nutrition, safe water and sanitation, maternal and child health, immunisation, control of endemic diseases, treatment of common diseases, essential drugs.", ["health education", "immunisation", "proper nutrition", "safe water", "maternal and child health", "essential drugs", "sanitation", "treatment of common diseases"]),
              short("Why should a person complete the full dose of malaria medicine even when they feel better?", "To kill all the germs and prevent the disease from returning or becoming resistant to the drug.", ["to kill all the germs", "to prevent drug resistance", "so that the disease does not come back", "to kill all the parasites"]),
              mcq("Hookworms enter the body mainly through:", ["the mouth", "the nose", "bare feet", "the eyes"], "bare feet"),
              short("Give one sign of malaria.", "Fever", ["high temperature", "shivering", "headache", "vomiting", "joint pains", "loss of appetite"]),
              long("Explain three ways a community can control malaria.", "Any three with explanation: sleeping under treated nets (prevents bites), draining stagnant water (removes breeding places), clearing bushes near homes (removes resting places), indoor residual spraying, early treatment with ACTs. 1 mark per point + 1 for explanation quality.", 4),
            ],
          },
        },
      ],
    },

    // ──────────────────────────────── SOCIAL STUDIES ─────────────────────────
    {
      subject: "social-studies",
      topics: [
        {
          topic: "location-of-africa",
          notes: [{
            title: "Location, Size and Position of Africa",
            summary: "Africa's position on the globe, its neighbours, lines of latitude and longitude, and map skills.",
            minutes: 8,
            content: `# Location of Africa

Africa is the **second largest continent** (after Asia), covering about **30 million km²**, and the **second most populated**.

## Position
- Africa is crossed by the **Equator** (0°), the **Tropic of Cancer** (23½° N) and the **Tropic of Capricorn** (23½° S). It is the only continent crossed by all three.
- The **Greenwich Meridian** (0° longitude) passes through Ghana, Burkina Faso, Togo, Mali and Algeria.
- Africa lies in all four hemispheres: Northern, Southern, Eastern and Western.

## Neighbouring water bodies
| Direction | Water body |
|---|---|
| North | Mediterranean Sea (separates Africa from Europe) |
| North-east | Red Sea and the Suez Canal (separate Africa from Asia) |
| East | Indian Ocean |
| West | Atlantic Ocean |

The **Strait of Gibraltar** separates Morocco from Spain. The **Suez Canal** (Egypt, opened 1869) joins the Mediterranean to the Red Sea and shortens the sea route from Europe to Asia.

## Extreme points
- North: Ras ben Sakka (Tunisia) · South: Cape Agulhas (South Africa)
- East: Ras Hafun (Somalia) · West: Cape Verde (Senegal)

## Africa has 54 countries
- **Largest:** Algeria. **Smallest (mainland):** The Gambia. **Smallest overall:** Seychelles.
- **Most populated:** Nigeria.
- **Landlocked** countries (no coastline): Uganda, Rwanda, Burundi, South Sudan, Ethiopia, Chad, Niger, Mali, Burkina Faso, CAR, Zambia, Zimbabwe, Malawi, Botswana, Lesotho, Eswatini.
- **Islands:** Madagascar (largest), Seychelles, Mauritius, Comoros, Cape Verde, São Tomé and Príncipe.

## Latitude and longitude
- **Latitude** lines run east–west and measure distance north/south of the Equator.
- **Longitude** lines run north–south and measure distance east/west of Greenwich. They are used to calculate **time**: 15° = 1 hour; places to the **east** are **ahead**.

*Example:* Kampala is on 32° E and Accra on 0°. Difference ≈ 32° ≈ 2 hours. When it is 10:00 am in Accra, it is about **12:00 noon** in Kampala.

## Map skills
Compass directions (8 points), scale, key/legend, title, frame, grid references, contour lines for relief.
`,
          }],
          quiz: {
            questions: [
              mcq("Which is the largest continent in the world?", ["Africa", "Asia", "Europe", "America"], "Asia", "Africa is the second largest."),
              short("Name the sea that separates Africa from Europe.", "Mediterranean Sea", ["the Mediterranean Sea", "Mediterranean"]),
              fill("The ______ Canal joins the Mediterranean Sea to the Red Sea.", ["Suez"]),
              mcq("Which line of latitude passes through Uganda?", ["Tropic of Cancer", "Equator", "Tropic of Capricorn", "Greenwich Meridian"], "Equator"),
              short("Give one example of a landlocked country in Africa.", "Uganda", ["Rwanda", "Burundi", "South Sudan", "Ethiopia", "Chad", "Niger", "Mali", "Zambia", "Zimbabwe", "Malawi", "Botswana", "Lesotho", "Eswatini", "Burkina Faso", "Central African Republic"]),
              short("Which country has the largest population in Africa?", "Nigeria"),
              short("Name the largest island in Africa.", "Madagascar"),
              num("How many countries are there in Africa?", 54),
              short("What is the difference in time between two places that are 45° of longitude apart (in hours)?", "3 hours", ["3", "three hours", "three"], "15° = 1 hour, so 45° = 3 hours."),
              short("Why is the Suez Canal important to world trade?", "It shortens the sea route between Europe and Asia so ships do not have to go around the Cape of Good Hope.", ["it shortens the sea route between Europe and Asia", "ships do not go around Africa", "shorter route from Europe to Asia", "reduces distance between Europe and Asia"]),
              short("Name the strait that separates Africa from Europe.", "Strait of Gibraltar", ["Gibraltar"]),
              mcq("Lines of longitude are mainly used to find:", ["temperature", "rainfall", "time", "altitude"], "time"),
            ],
          },
        },
        {
          topic: "foreign-influence",
          notes: [{
            title: "Foreign Influence: Explorers, Missionaries and Traders",
            summary: "Who came to Africa before colonial rule, why they came and what they changed.",
            minutes: 10,
            content: `# Foreign Influence in Africa

## 1. Explorers
Europeans who came to discover the geography of Africa — sources of rivers, lakes and mountains.
| Explorer | Nationality | Discovery / fame |
|---|---|---|
| Mungo Park | Scottish | explored River Niger |
| David Livingstone | Scottish | Victoria Falls (1855), River Zambezi; also a missionary |
| Richard Burton & John Speke | British | Lake Tanganyika (1858) |
| John Hanning Speke | British | named Lake Victoria (1858); source of the Nile (1862) with James Grant |
| Samuel Baker | British | Lake Albert (1864), Murchison Falls |
| Henry Morton Stanley | Welsh-American | found Livingstone (1871), explored the Congo; visited Kabaka Muteesa I (1875) and invited missionaries |
| Rebmann & Krapf | German | Mt Kilimanjaro (1848) and Mt Kenya (1849) |

**Effects:** maps of Africa, European interest and later colonisation, opening of routes for missionaries and traders.

## 2. Traders
- **Arab traders** came from the coast (Zanzibar) for **ivory and slaves**, introduced **Islam**, Kiswahili, cloth, guns and new crops. Important names: Ahmed bin Ibrahim (first Arab in Buganda, 1844), Tippu Tip.
- **Long-distance trade**: Nyamwezi, Yao and Kamba traders carried goods between the interior and the coast.
- **Chartered companies**: Imperial British East Africa Company (**IBEACo**, William Mackinnon, 1888 — Frederick Lugard in Uganda, 1890); German East Africa Company (Karl Peters); Royal Niger Company; British South Africa Company (Cecil Rhodes).

## 3. Missionaries
Came to spread Christianity.
- **CMS (Anglican/Protestant)**: Shergold Smith and C.T. Wilson arrived in Buganda in **1877**; Alexander Mackay (1878).
- **White Fathers (Roman Catholic)**: Fr Simeon Lourdel ("Mapeera") and Bro Amans in **1879**.
- Bishop James Hannington killed in Busoga (1885). The **Uganda Martyrs** died at Namugongo (1886) under Kabaka Mwanga; remembered on **3 June**.

**Positive effects:** schools and hospitals, writing of local languages, end of slave trade, new crops and skills, Christianity.
**Negative effects:** religious wars (1888–1892 in Buganda), undermined African culture and chiefs' authority, paved the way for colonial rule.

## 4. The Slave Trade
- **Trans-Atlantic** (West Africa → Americas, 15th–19th century, "triangular trade"). 
- **Indian Ocean / East African** trade run by Arabs via Zanzibar.
- Abolished through efforts of **William Wilberforce**, Granville Sharp; the 1807 British Act; Frere Treaty with Sultan Barghash (1873) closed the Zanzibar slave market.
`,
          }],
          quiz: {
            questions: [
              short("Who was the first European to see Lake Victoria and name it?", "John Hanning Speke", ["Speke", "John Speke"]),
              mcq("Which explorer discovered Victoria Falls?", ["H.M. Stanley", "David Livingstone", "Samuel Baker", "Mungo Park"], "David Livingstone"),
              short("Name the first Arab trader to arrive in Buganda.", "Ahmed bin Ibrahim", ["Ahmed Bin Ibrahim", "Ahmed Ibrahim"]),
              short("In which year did the first CMS missionaries arrive in Buganda?", "1877"),
              short("Who was the leader of the first Roman Catholic missionaries (White Fathers) in Buganda?", "Fr Simeon Lourdel (Mapeera)", ["Lourdel", "Simeon Lourdel", "Mapeera", "Father Lourdel"]),
              mcq("The Uganda Martyrs were killed during the reign of:", ["Kabaka Muteesa I", "Kabaka Mwanga II", "Kabaka Daudi Chwa", "Kabaka Suuna"], "Kabaka Mwanga II"),
              short("Give one positive effect of missionaries in Uganda.", "They built schools and hospitals / wrote local languages / helped end the slave trade.", ["built schools", "built hospitals", "introduced formal education", "wrote local languages", "spread Christianity", "stopped slave trade", "introduced new crops"]),
              short("Which company administered Uganda before it became a British protectorate?", "Imperial British East Africa Company (IBEACo)", ["IBEACo", "IBEA", "Imperial British East Africa Company", "IBEACO"]),
              short("Name the British explorer who found Livingstone and later visited Kabaka Muteesa I.", "Henry Morton Stanley", ["H.M. Stanley", "Stanley", "Henry Stanley"]),
              short("Give one reason why Arab traders came to the interior of East Africa.", "To get ivory and slaves.", ["ivory", "slaves", "to trade in ivory and slaves", "to spread Islam", "to look for ivory"]),
              short("On which date are the Uganda Martyrs remembered every year?", "3rd June", ["3 June", "June 3", "3rd of June", "June 3rd"]),
              long("Explain two negative effects of the coming of foreigners to Africa.", "Any two: slave trade depopulated areas; religious wars; loss of independence/colonial rule; loss of African culture and religion; exploitation of resources. 2 marks each with explanation.", 4),
            ],
          },
        },
        {
          topic: "regional-cooperation",
          notes: [{
            title: "Regional Co-operation: EAC, AU and Others",
            summary: "The organisations Africa uses to work together, their aims, members and headquarters.",
            minutes: 8,
            content: `# Regional Co-operation in Africa

Countries co-operate to **trade**, keep **peace**, share **infrastructure** and speak with one voice.

## East African Community (EAC)
- **Headquarters:** Arusha, Tanzania.
- **First EAC (1967–1977)**: Kenya, Uganda, Tanzania. Collapsed because of political differences (Idi Amin vs Nyerere), different ideologies, unequal sharing of benefits (Kenya gained most).
- **Revived 30 November 1999** (treaty), began **7 July 2000**.
- **Members (8):** Kenya, Uganda, Tanzania, Rwanda, Burundi (2007), South Sudan (2016), DR Congo (2022), Somalia (2024).
- **Organs:** Summit of Heads of State, Council of Ministers, East African Legislative Assembly (EALA), East African Court of Justice, Secretariat.
- **Stages:** Customs Union (2005) → Common Market (2010) → Monetary Union (planned) → Political Federation.
- **Benefits:** wider market, free movement of people and goods, shared infrastructure (roads, railways, Lake Victoria), common passport, peace and security.
- **Challenges:** different currencies, border disputes, smuggling, political instability, unequal development.

## African Union (AU)
- Formed **9 July 2002** in Durban, replacing the **OAU** (founded **25 May 1963** in Addis Ababa — **Africa Day**).
- **Headquarters:** Addis Ababa, Ethiopia. **55 members.**
- Aims: unity, peace and security, economic integration (AfCFTA – African Continental Free Trade Area), defend sovereignty, promote democracy and human rights, fight disease and poverty.
- Organs: Assembly of Heads of State, Executive Council, Commission, Pan-African Parliament (Midrand, South Africa), Peace and Security Council.

## Other groupings
| Organisation | Region | HQ |
|---|---|---|
| **COMESA** (Common Market for Eastern and Southern Africa) | 21 states | Lusaka, Zambia |
| **IGAD** (Intergovernmental Authority on Development) | Horn of Africa incl. Uganda | Djibouti |
| **ECOWAS** | West Africa | Abuja, Nigeria |
| **SADC** | Southern Africa | Gaborone, Botswana |
| **Nile Basin Initiative** | Nile countries | Entebbe, Uganda |

## International bodies
- **United Nations (UN)** – formed 24 Oct 1945; HQ New York; Uganda joined 1962. Agencies: UNICEF, WHO, UNESCO, FAO, UNHCR, WFP.
- **Commonwealth** – former British colonies; HQ London; Uganda hosted CHOGM in 2007.
`,
          }],
          quiz: {
            questions: [
              short("Where is the headquarters of the East African Community?", "Arusha, Tanzania", ["Arusha"]),
              short("Give one reason why the first East African Community collapsed in 1977.", "Political differences between leaders / different ideologies / unequal sharing of benefits.", ["political differences", "ideological differences", "unequal sharing of benefits", "Idi Amin and Nyerere disagreed", "Kenya benefited more", "unequal distribution of benefits"]),
              mcq("Which country joined the EAC most recently (2024)?", ["Rwanda", "DR Congo", "Somalia", "South Sudan"], "Somalia"),
              short("Name the organisation that was replaced by the African Union in 2002.", "Organisation of African Unity (OAU)", ["OAU", "Organization of African Unity"]),
              short("Where is the headquarters of the African Union?", "Addis Ababa, Ethiopia", ["Addis Ababa"]),
              fill("Africa Day is celebrated every year on 25th ______.", ["May"]),
              short("Give one benefit Uganda gets from being a member of the EAC.", "A wider market for goods / free movement of people / shared infrastructure / peace and security.", ["wider market", "free movement", "shared infrastructure", "trade", "peace and security", "common passport", "market for goods"]),
              short("Name the EAC organ that makes laws for the community.", "East African Legislative Assembly (EALA)", ["EALA", "East African Legislative Assembly"]),
              mcq("The headquarters of COMESA is in:", ["Nairobi", "Lusaka", "Kampala", "Kigali"], "Lusaka"),
              short("Name one UN agency that helps children.", "UNICEF", ["United Nations Children's Fund", "WFP", "UNESCO"]),
              short("Give one challenge facing the East African Community.", "Different currencies / border disputes / smuggling / political instability.", ["different currencies", "border disputes", "smuggling", "political instability", "unequal development", "language differences"]),
            ],
          },
        },
      ],
    },
  ],
};
