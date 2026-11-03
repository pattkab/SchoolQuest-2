-- Restore classes, subjects, notes, and practice papers. No user accounts.

INSERT INTO "Level" ("id", "slug", "name", "order", "description", "createdAt", "updatedAt") VALUES
(E'cmvy9o5980000bogywpy2ncgg', E'pre-primary', E'Pre-Primary', 1, E'Baby, Middle and Top class — the NCDC Early Childhood learning framework.', '2026-11-01T20:12:35.612Z', '2026-11-01T20:12:35.612Z'),
(E'cmvy9o59c0001bogyqzg5mvlu', E'primary', E'Primary', 2, E'P.1 to P.7, from the thematic curriculum to PLE preparation.', '2026-11-01T20:12:35.616Z', '2026-11-01T20:12:35.616Z'),
(E'cmvy9o59c0002bogyr4qxpk7o', E'o-level', E'Secondary O-Level', 3, E'S.1 to S.4 — Lower Secondary Competency-Based Curriculum and UCE.', '2026-11-01T20:12:35.617Z', '2026-11-01T20:12:35.617Z'),
(E'cmvy9o59d0003bogysi96p0b9', E'a-level', E'Secondary A-Level', 4, E'S.5 and S.6 — UACE preparation.', '2026-11-01T20:12:35.617Z', '2026-11-01T20:12:35.617Z'),
(E'cmvy9o59d0004bogys425rk8n', E'university', E'University & Tertiary', 5, E'Foundation and professional study resources.', '2026-11-01T20:12:35.618Z', '2026-11-01T20:12:35.618Z')
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ClassGrade" ("id", "slug", "name", "shortName", "levelId", "order", "phase", "description", "color", "freshTeacherKey", "isActive", "createdAt", "updatedAt") VALUES
(E'cmvy9o59e0006bogycgciciu8', E'baby', E'Baby Class', E'Baby', E'cmvy9o5980000bogywpy2ncgg', 1, E'Early years (3 yrs)', E'Play-based learning: language, numbers, health habits and social skills.', E'#F472B6', E'BabyClass', TRUE, '2026-11-01T20:12:35.618Z', '2026-11-01T20:12:35.618Z'),
(E'cmvy9o5ai0042bogya4q2rot5', E'middle', E'Middle Class', E'Middle', E'cmvy9o5980000bogywpy2ncgg', 2, E'Early years (4 yrs)', E'Building vocabulary, counting, pre-reading and pre-writing.', E'#FB923C', E'MiddleClass', TRUE, '2026-11-01T20:12:35.658Z', '2026-11-01T20:12:35.658Z'),
(E'cmvy9o5b8007ybogy0eothz8e', E'top', E'Top Class', E'Top', E'cmvy9o5980000bogywpy2ncgg', 3, E'School readiness (5 yrs)', E'Getting ready for Primary One: reading, writing and number work.', E'#FACC15', E'TopClass', TRUE, '2026-11-01T20:12:35.685Z', '2026-11-01T20:12:35.685Z'),
(E'cmvy9o5c100bubogyxobqklrl', E'p1', E'Primary One', E'P.1', E'cmvy9o59c0001bogyqzg5mvlu', 4, E'Thematic curriculum', E'Literacy, numeracy, life skills and values learnt through 12 familiar themes.', E'#34D399', E'PrimaryOne', TRUE, '2026-11-01T20:12:35.713Z', '2026-11-01T20:12:35.713Z'),
(E'cmvy9o5cv00fybogyd4k5smyq', E'p2', E'Primary Two', E'P.2', E'cmvy9o59c0001bogyqzg5mvlu', 5, E'Thematic curriculum', E'Deepening reading, writing and number skills through the themes.', E'#2DD4BF', E'PrimaryTwo', TRUE, '2026-11-01T20:12:35.744Z', '2026-11-01T20:12:35.744Z'),
(E'cmvy9o5dq00k2bogyi7qvvpui', E'p3', E'Primary Three', E'P.3', E'cmvy9o59c0001bogyqzg5mvlu', 6, E'Thematic curriculum', E'Final thematic year: confident reading, writing and arithmetic.', E'#22D3EE', E'PrimaryThree', TRUE, '2026-11-01T20:12:35.775Z', '2026-11-01T20:12:35.775Z'),
(E'cmvy9o5et00o6bogyd5iiymt2', E'p4', E'Primary Four', E'P.4', E'cmvy9o59c0001bogyqzg5mvlu', 7, E'Transition year', E'Learners move from themes to subjects and use English as the language of instruction.', E'#60A5FA', E'PrimaryFour', TRUE, '2026-11-01T20:12:35.813Z', '2026-11-01T20:12:35.813Z'),
(E'cmvy9o5gb00scbogyihv5h2tq', E'p5', E'Primary Five', E'P.5', E'cmvy9o59c0001bogyqzg5mvlu', 8, E'Subject-based learning', E'Building subject knowledge across Mathematics, English, Science and SST.', E'#818CF8', E'PrimaryFive', TRUE, '2026-11-01T20:12:35.868Z', '2026-11-01T20:12:35.868Z'),
(E'cmvy9o5hs00wybogyi61erru2', E'p6', E'Primary Six', E'P.6', E'cmvy9o59c0001bogyqzg5mvlu', 9, E'Subject-based learning', E'Consolidating skills and starting PLE-style practice.', E'#A78BFA', E'PrimarySix', TRUE, '2026-11-01T20:12:35.921Z', '2026-11-01T20:12:35.921Z'),
(E'cmvy9o5is011gbogyesyu81sm', E'p7', E'Primary Seven', E'P.7', E'cmvy9o59c0001bogyqzg5mvlu', 10, E'PLE preparation', E'Revision, past papers and mock exams for the Primary Leaving Examination.', E'#F87171', E'PrimarySeven', TRUE, '2026-11-01T20:12:35.956Z', '2026-11-01T20:12:35.956Z'),
(E'cmvy9o5jv0162bogy0mvlb00d', E's1', E'Senior One', E'S.1', E'cmvy9o59c0002bogyr4qxpk7o', 11, E'Lower secondary', E'Competency-based curriculum — library resources available now.', E'#0EA5E9', E'SeniorOne', FALSE, '2026-11-01T20:12:35.996Z', '2026-11-01T20:12:35.996Z'),
(E'cmvy9o5k9017ibogy2iuia862', E's2', E'Senior Two', E'S.2', E'cmvy9o59c0002bogyr4qxpk7o', 12, E'Lower secondary', E'Competency-based curriculum — library resources available now.', E'#0284C7', E'SeniorTwo', FALSE, '2026-11-01T20:12:36.009Z', '2026-11-01T20:12:36.009Z'),
(E'cmvy9o5ki018ybogy1td0z7hx', E's3', E'Senior Three', E'S.3', E'cmvy9o59c0002bogyr4qxpk7o', 13, E'Lower secondary', E'Competency-based curriculum — library resources available now.', E'#0369A1', E'SeniorThree', FALSE, '2026-11-01T20:12:36.018Z', '2026-11-01T20:12:36.018Z'),
(E'cmvy9o5ku01aebogygit99696', E's4', E'Senior Four', E'S.4', E'cmvy9o59c0002bogyr4qxpk7o', 14, E'UCE preparation', E'UCE revision — library resources available now.', E'#075985', E'SeniorFour', FALSE, '2026-11-01T20:12:36.031Z', '2026-11-01T20:12:36.031Z'),
(E'cmvy9o5l801bubogytor1mdeb', E's5', E'Senior Five', E'S.5', E'cmvy9o59d0003bogysi96p0b9', 15, E'Advanced level', E'UACE subject combinations — library resources available now.', E'#7C3AED', E'SeniorFive', FALSE, '2026-11-01T20:12:36.044Z', '2026-11-01T20:12:36.044Z'),
(E'cmvy9o5lg01d6bogyu8kqhywc', E's6', E'Senior Six', E'S.6', E'cmvy9o59d0003bogysi96p0b9', 16, E'UACE preparation', E'UACE revision — library resources available now.', E'#6D28D9', E'SeniorSix', FALSE, '2026-11-01T20:12:36.052Z', '2026-11-01T20:12:36.052Z'),
(E'cmvy9o5lu01eibogym1fpkn3t', E'university', E'University & Tertiary', E'Uni', E'cmvy9o59d0004bogys425rk8n', 17, E'Higher education', E'Foundation courses and professional study — coming soon.', E'#334155', NULL, FALSE, '2026-11-01T20:12:36.066Z', '2026-11-01T20:12:36.066Z')
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "Subject" ("id", "slug", "name", "classGradeId", "color", "icon", "order", "description", "freshTeacherKey", "isExaminable", "createdAt", "updatedAt") VALUES
(E'cmvy9o59g0008bogyf7kym6wn', E'language-development', E'Language Development', E'cmvy9o59e0006bogycgciciu8', E'#2E9E6B', E'message-circle', 0, E'Listening, speaking, rhymes and vocabulary for 3 years.', E'LanguageDevelopment', TRUE, '2026-11-01T20:12:35.620Z', '2026-11-01T20:12:35.620Z'),
(E'cmvy9o59q000sbogy1rnuql4y', E'mathematical-concepts', E'Mathematical Concepts', E'cmvy9o59e0006bogycgciciu8', E'#4F6BED', E'calculator', 1, E'Numbers, shapes, sorting, matching and patterns.', E'MathemeticalConcepts,MathematicalConcepts', TRUE, '2026-11-01T20:12:35.631Z', '2026-11-01T20:12:35.631Z'),
(E'cmvy9o59t001cbogytt2lkajg', E'reading', E'Reading', E'cmvy9o59e0006bogycgciciu8', E'#1F8FBF', E'book-open', 2, E'Letter sounds, picture reading and word recognition.', E'Reading,Literacy', TRUE, '2026-11-01T20:12:35.634Z', '2026-11-01T20:12:35.634Z'),
(E'cmvy9o59w001qbogy8v7vyte1', E'writing', E'Writing', E'cmvy9o59e0006bogycgciciu8', E'#B55A9E', E'pen-line', 3, E'Pre-writing patterns, tracing and letter formation.', E'Writing,WritingTheology', TRUE, '2026-11-01T20:12:35.637Z', '2026-11-01T20:12:35.637Z'),
(E'cmvy9o5a20024bogylq4715ld', E'health-habits', E'Health Habits', E'cmvy9o59e0006bogycgciciu8', E'#E07A28', E'heart-pulse', 4, E'Hygiene, safety, nutrition and caring for our bodies.', E'HealthHabits', TRUE, '2026-11-01T20:12:35.642Z', '2026-11-01T20:12:35.642Z'),
(E'cmvy9o5a4002ibogydm13e0gz', E'social-development', E'Social Development', E'cmvy9o59e0006bogycgciciu8', E'#C84B8A', E'users', 5, E'Self, family, friends, manners and our community.', E'SocialDevelopment', TRUE, '2026-11-01T20:12:35.645Z', '2026-11-01T20:12:35.645Z'),
(E'cmvy9o5a7002wbogyfdw3jsqs', E'english', E'English', E'cmvy9o59e0006bogycgciciu8', E'#E0564A', E'languages', 6, E'Early English vocabulary and simple spoken sentences.', E'English', TRUE, '2026-11-01T20:12:35.647Z', '2026-11-01T20:12:35.647Z'),
(E'cmvy9o5a9003abogy1vpi1j2e', E'general-knowledge', E'General Knowledge', E'cmvy9o59e0006bogycgciciu8', E'#3B82F6', E'globe', 7, E'The world around us: weather, animals, plants and places.', E'GeneralKnowledge', FALSE, '2026-11-01T20:12:35.649Z', '2026-11-01T20:12:35.649Z'),
(E'cmvy9o5ab003obogykd2k88x5', E'theology', E'Theology / Religious Education', E'cmvy9o59e0006bogycgciciu8', E'#9B59B6', E'sparkles', 8, E'Stories, prayers and values.', E'Theology', FALSE, '2026-11-01T20:12:35.652Z', '2026-11-01T20:12:35.652Z'),
(E'cmvy9o5ai0044bogyhgyg2jis', E'language-development', E'Language Development', E'cmvy9o5ai0042bogya4q2rot5', E'#2E9E6B', E'message-circle', 0, E'Listening, speaking, rhymes and vocabulary for 4 years.', E'LanguageDevelopment', TRUE, '2026-11-01T20:12:35.659Z', '2026-11-01T20:12:35.659Z'),
(E'cmvy9o5am004obogy7hkwase4', E'mathematical-concepts', E'Mathematical Concepts', E'cmvy9o5ai0042bogya4q2rot5', E'#4F6BED', E'calculator', 1, E'Numbers, shapes, sorting, matching and patterns.', E'MathemeticalConcepts,MathematicalConcepts', TRUE, '2026-11-01T20:12:35.663Z', '2026-11-01T20:12:35.663Z'),
(E'cmvy9o5ap0058bogy5jve1q4p', E'reading', E'Reading', E'cmvy9o5ai0042bogya4q2rot5', E'#1F8FBF', E'book-open', 2, E'Letter sounds, picture reading and word recognition.', E'Reading,Literacy', TRUE, '2026-11-01T20:12:35.666Z', '2026-11-01T20:12:35.666Z'),
(E'cmvy9o5as005mbogy5rfx3n6p', E'writing', E'Writing', E'cmvy9o5ai0042bogya4q2rot5', E'#B55A9E', E'pen-line', 3, E'Pre-writing patterns, tracing and letter formation.', E'Writing,WritingTheology', TRUE, '2026-11-01T20:12:35.668Z', '2026-11-01T20:12:35.668Z'),
(E'cmvy9o5au0060bogyqcbb1p25', E'health-habits', E'Health Habits', E'cmvy9o5ai0042bogya4q2rot5', E'#E07A28', E'heart-pulse', 4, E'Hygiene, safety, nutrition and caring for our bodies.', E'HealthHabits', TRUE, '2026-11-01T20:12:35.671Z', '2026-11-01T20:12:35.671Z'),
(E'cmvy9o5az006ebogy72t0rwzu', E'social-development', E'Social Development', E'cmvy9o5ai0042bogya4q2rot5', E'#C84B8A', E'users', 5, E'Self, family, friends, manners and our community.', E'SocialDevelopment', TRUE, '2026-11-01T20:12:35.676Z', '2026-11-01T20:12:35.676Z'),
(E'cmvy9o5b1006sbogygfab43it', E'english', E'English', E'cmvy9o5ai0042bogya4q2rot5', E'#E0564A', E'languages', 6, E'Early English vocabulary and simple spoken sentences.', E'English', TRUE, '2026-11-01T20:12:35.678Z', '2026-11-01T20:12:35.678Z'),
(E'cmvy9o5b40076bogysxne7wx8', E'general-knowledge', E'General Knowledge', E'cmvy9o5ai0042bogya4q2rot5', E'#3B82F6', E'globe', 7, E'The world around us: weather, animals, plants and places.', E'GeneralKnowledge', FALSE, '2026-11-01T20:12:35.680Z', '2026-11-01T20:12:35.680Z'),
(E'cmvy9o5b6007kbogyogsos5la', E'theology', E'Theology / Religious Education', E'cmvy9o5ai0042bogya4q2rot5', E'#9B59B6', E'sparkles', 8, E'Stories, prayers and values.', E'Theology', FALSE, '2026-11-01T20:12:35.682Z', '2026-11-01T20:12:35.682Z'),
(E'cmvy9o5b90080bogymvis8q9n', E'language-development', E'Language Development', E'cmvy9o5b8007ybogy0eothz8e', E'#2E9E6B', E'message-circle', 0, E'Listening, speaking, rhymes and vocabulary for 5 years.', E'LanguageDevelopment', TRUE, '2026-11-01T20:12:35.685Z', '2026-11-01T20:12:35.685Z'),
(E'cmvy9o5be008kbogy6a21ec64', E'mathematical-concepts', E'Mathematical Concepts', E'cmvy9o5b8007ybogy0eothz8e', E'#4F6BED', E'calculator', 1, E'Numbers, shapes, sorting, matching and patterns.', E'MathemeticalConcepts,MathematicalConcepts', TRUE, '2026-11-01T20:12:35.691Z', '2026-11-01T20:12:35.691Z'),
(E'cmvy9o5bi0094bogydnwdniyw', E'reading', E'Reading', E'cmvy9o5b8007ybogy0eothz8e', E'#1F8FBF', E'book-open', 2, E'Letter sounds, picture reading and word recognition.', E'Reading,Literacy', TRUE, '2026-11-01T20:12:35.694Z', '2026-11-01T20:12:35.694Z'),
(E'cmvy9o5bk009ibogylit0hl1o', E'writing', E'Writing', E'cmvy9o5b8007ybogy0eothz8e', E'#B55A9E', E'pen-line', 3, E'Pre-writing patterns, tracing and letter formation.', E'Writing,WritingTheology', TRUE, '2026-11-01T20:12:35.697Z', '2026-11-01T20:12:35.697Z'),
(E'cmvy9o5bm009wbogypqbmxsnt', E'health-habits', E'Health Habits', E'cmvy9o5b8007ybogy0eothz8e', E'#E07A28', E'heart-pulse', 4, E'Hygiene, safety, nutrition and caring for our bodies.', E'HealthHabits', TRUE, '2026-11-01T20:12:35.699Z', '2026-11-01T20:12:35.699Z'),
(E'cmvy9o5bo00aabogyf315dgku', E'social-development', E'Social Development', E'cmvy9o5b8007ybogy0eothz8e', E'#C84B8A', E'users', 5, E'Self, family, friends, manners and our community.', E'SocialDevelopment', TRUE, '2026-11-01T20:12:35.701Z', '2026-11-01T20:12:35.701Z'),
(E'cmvy9o5br00aobogymwmr6xfn', E'english', E'English', E'cmvy9o5b8007ybogy0eothz8e', E'#E0564A', E'languages', 6, E'Early English vocabulary and simple spoken sentences.', E'English', TRUE, '2026-11-01T20:12:35.704Z', '2026-11-01T20:12:35.704Z'),
(E'cmvy9o5bw00b2bogypdxs6oz8', E'general-knowledge', E'General Knowledge', E'cmvy9o5b8007ybogy0eothz8e', E'#3B82F6', E'globe', 7, E'The world around us: weather, animals, plants and places.', E'GeneralKnowledge', FALSE, '2026-11-01T20:12:35.708Z', '2026-11-01T20:12:35.708Z'),
(E'cmvy9o5by00bgbogy6dw2pim2', E'theology', E'Theology / Religious Education', E'cmvy9o5b8007ybogy0eothz8e', E'#9B59B6', E'sparkles', 8, E'Stories, prayers and values.', E'Theology', FALSE, '2026-11-01T20:12:35.711Z', '2026-11-01T20:12:35.711Z'),
(E'cmvy9o5c100bwbogyrtqn7cf4', E'literacy-1', E'Literacy I (Thematic)', E'cmvy9o5c100bubogyxobqklrl', E'#2E9E6B', E'leaf', 0, E'Knowledge of our environment, health, community and living together — taught through the 12 NCDC themes.', E'Lit1,Thematic', TRUE, '2026-11-01T20:12:35.714Z', '2026-11-01T20:12:35.714Z'),
(E'cmvy9o5c500cmbogyyxjlfhzz', E'literacy-2', E'Literacy II (Reading & Writing)', E'cmvy9o5c100bubogyxobqklrl', E'#1F8FBF', E'book-open', 1, E'Reading and writing skills developed through the themes.', E'Lit2,Reading,Writing', TRUE, '2026-11-01T20:12:35.718Z', '2026-11-01T20:12:35.718Z'),
(E'cmvy9o5cb00d6bogyl7x6p8v4', E'english', E'English', E'cmvy9o5c100bubogyxobqklrl', E'#E0564A', E'languages', 2, E'Oral English, grammar, reading and writing.', E'English', TRUE, '2026-11-01T20:12:35.724Z', '2026-11-01T20:12:35.724Z'),
(E'cmvy9o5cg00dwbogyh9lmye1w', E'mathematics', E'Mathematics', E'cmvy9o5c100bubogyxobqklrl', E'#4F6BED', E'calculator', 3, E'Numbers, operations, shapes, measurement and problem solving.', E'MTC', TRUE, '2026-11-01T20:12:35.729Z', '2026-11-01T20:12:35.729Z'),
(E'cmvy9o5cl00embogyurkrxlpw', E'religious-education', E'Religious Education', E'cmvy9o5c100bubogyxobqklrl', E'#9B59B6', E'sparkles', 4, E'Christian and Islamic Religious Education.', E'RE,Theology', TRUE, '2026-11-01T20:12:35.733Z', '2026-11-01T20:12:35.733Z'),
(E'cmvy9o5cn00f0bogygo0rd9sh', E'local-language', E'Local Language', E'cmvy9o5c100bubogyxobqklrl', E'#8A66D9', E'speech', 5, E'Reading and writing in the area language (Luganda, Runyankore-Rukiga and others).', E'Luganda,RunyankoreRukiga', FALSE, '2026-11-01T20:12:35.735Z', '2026-11-01T20:12:35.735Z'),
(E'cmvy9o5cs00febogyo3jxrns1', E'ict', E'ICT', E'cmvy9o5c100bubogyxobqklrl', E'#4A5568', E'monitor', 6, E'Basic computer awareness.', E'ICT', FALSE, '2026-11-01T20:12:35.740Z', '2026-11-01T20:12:35.740Z'),
(E'cmvy9o5ct00fobogydz2hq3jr', E'news-and-oral-literature', E'News & Oral Literature', E'cmvy9o5c100bubogyxobqklrl', E'#D26B3F', E'mic', 7, E'Daily news, stories, riddles and rhymes.', E'News,OralLiterature', FALSE, '2026-11-01T20:12:35.742Z', '2026-11-01T20:12:35.742Z'),
(E'cmvy9o5cw00g0bogya4oaoqqx', E'literacy-1', E'Literacy I (Thematic)', E'cmvy9o5cv00fybogyd4k5smyq', E'#2E9E6B', E'leaf', 0, E'Knowledge of our environment, health, community and living together — taught through the 12 NCDC themes.', E'Lit1,Thematic', TRUE, '2026-11-01T20:12:35.744Z', '2026-11-01T20:12:35.744Z'),
(E'cmvy9o5d000gqbogyfpv05t7g', E'literacy-2', E'Literacy II (Reading & Writing)', E'cmvy9o5cv00fybogyd4k5smyq', E'#1F8FBF', E'book-open', 1, E'Reading and writing skills developed through the themes.', E'Lit2,Reading,Writing', TRUE, '2026-11-01T20:12:35.748Z', '2026-11-01T20:12:35.748Z'),
(E'cmvy9o5d300habogyookpbn9c', E'english', E'English', E'cmvy9o5cv00fybogyd4k5smyq', E'#E0564A', E'languages', 2, E'Oral English, grammar, reading and writing.', E'English', TRUE, '2026-11-01T20:12:35.752Z', '2026-11-01T20:12:35.752Z'),
(E'cmvy9o5db00i0bogyxud66mz1', E'mathematics', E'Mathematics', E'cmvy9o5cv00fybogyd4k5smyq', E'#4F6BED', E'calculator', 3, E'Numbers, operations, shapes, measurement and problem solving.', E'MTC', TRUE, '2026-11-01T20:12:35.759Z', '2026-11-01T20:12:35.759Z'),
(E'cmvy9o5dg00iqbogy75157zh5', E'religious-education', E'Religious Education', E'cmvy9o5cv00fybogyd4k5smyq', E'#9B59B6', E'sparkles', 4, E'Christian and Islamic Religious Education.', E'RE,Theology', TRUE, '2026-11-01T20:12:35.764Z', '2026-11-01T20:12:35.764Z'),
(E'cmvy9o5di00j4bogyc11byvii', E'local-language', E'Local Language', E'cmvy9o5cv00fybogyd4k5smyq', E'#8A66D9', E'speech', 5, E'Reading and writing in the area language (Luganda, Runyankore-Rukiga and others).', E'Luganda,RunyankoreRukiga', FALSE, '2026-11-01T20:12:35.766Z', '2026-11-01T20:12:35.766Z'),
(E'cmvy9o5dk00jibogy77e7hh6c', E'ict', E'ICT', E'cmvy9o5cv00fybogyd4k5smyq', E'#4A5568', E'monitor', 6, E'Basic computer awareness.', E'ICT', FALSE, '2026-11-01T20:12:35.769Z', '2026-11-01T20:12:35.769Z'),
(E'cmvy9o5dm00jsbogywslhtsxc', E'news-and-oral-literature', E'News & Oral Literature', E'cmvy9o5cv00fybogyd4k5smyq', E'#D26B3F', E'mic', 7, E'Daily news, stories, riddles and rhymes.', E'News,OralLiterature', FALSE, '2026-11-01T20:12:35.771Z', '2026-11-01T20:12:35.771Z'),
(E'cmvy9o5dr00k4bogy3jk9huwe', E'literacy-1', E'Literacy I (Thematic)', E'cmvy9o5dq00k2bogyi7qvvpui', E'#2E9E6B', E'leaf', 0, E'Knowledge of our environment, health, community and living together — taught through the 12 NCDC themes.', E'Lit1,Thematic', TRUE, '2026-11-01T20:12:35.775Z', '2026-11-01T20:12:35.775Z'),
(E'cmvy9o5dv00kubogyor87i053', E'literacy-2', E'Literacy II (Reading & Writing)', E'cmvy9o5dq00k2bogyi7qvvpui', E'#1F8FBF', E'book-open', 1, E'Reading and writing skills developed through the themes.', E'Lit2,Reading,Writing', TRUE, '2026-11-01T20:12:35.780Z', '2026-11-01T20:12:35.780Z'),
(E'cmvy9o5dz00lebogyox84kgx9', E'english', E'English', E'cmvy9o5dq00k2bogyi7qvvpui', E'#E0564A', E'languages', 2, E'Oral English, grammar, reading and writing.', E'English', TRUE, '2026-11-01T20:12:35.783Z', '2026-11-01T20:12:35.783Z'),
(E'cmvy9o5e600m4bogyennjiqe1', E'mathematics', E'Mathematics', E'cmvy9o5dq00k2bogyi7qvvpui', E'#4F6BED', E'calculator', 3, E'Numbers, operations, shapes, measurement and problem solving.', E'MTC', TRUE, '2026-11-01T20:12:35.790Z', '2026-11-01T20:12:35.790Z'),
(E'cmvy9o5eb00mubogygb7rrcn2', E'religious-education', E'Religious Education', E'cmvy9o5dq00k2bogyi7qvvpui', E'#9B59B6', E'sparkles', 4, E'Christian and Islamic Religious Education.', E'RE,Theology', TRUE, '2026-11-01T20:12:35.796Z', '2026-11-01T20:12:35.796Z'),
(E'cmvy9o5ee00n8bogyhwagls9f', E'local-language', E'Local Language', E'cmvy9o5dq00k2bogyi7qvvpui', E'#8A66D9', E'speech', 5, E'Reading and writing in the area language (Luganda, Runyankore-Rukiga and others).', E'Luganda,RunyankoreRukiga', FALSE, '2026-11-01T20:12:35.798Z', '2026-11-01T20:12:35.798Z'),
(E'cmvy9o5eh00nmbogy5pq1rxpy', E'ict', E'ICT', E'cmvy9o5dq00k2bogyi7qvvpui', E'#4A5568', E'monitor', 6, E'Basic computer awareness.', E'ICT', FALSE, '2026-11-01T20:12:35.801Z', '2026-11-01T20:12:35.801Z'),
(E'cmvy9o5ej00nwbogy8qq6k56n', E'news-and-oral-literature', E'News & Oral Literature', E'cmvy9o5dq00k2bogyi7qvvpui', E'#D26B3F', E'mic', 7, E'Daily news, stories, riddles and rhymes.', E'News,OralLiterature', FALSE, '2026-11-01T20:12:35.803Z', '2026-11-01T20:12:35.803Z'),
(E'cmvy9o5eu00o8bogygh9plo8b', E'mathematics', E'Mathematics', E'cmvy9o5et00o6bogyd5iiymt2', E'#4F6BED', E'calculator', 0, E'Numbers, operations, geometry, measurement, data and problem solving.', E'MTC', TRUE, '2026-11-01T20:12:35.814Z', '2026-11-01T20:12:35.814Z'),
(E'cmvy9o5fn00owbogy90vuop2s', E'english', E'English', E'cmvy9o5et00o6bogyd5iiymt2', E'#E0564A', E'languages', 1, E'Grammar, vocabulary, comprehension and composition.', E'English', TRUE, '2026-11-01T20:12:35.844Z', '2026-11-01T20:12:35.844Z'),
(E'cmvy9o5fr00pkbogycyzvb3zq', E'science', E'Integrated Science', E'cmvy9o5et00o6bogyd5iiymt2', E'#0E9F8A', E'flask-conical', 2, E'Living things, health, matter, energy, environment and agriculture.', E'Science', TRUE, '2026-11-01T20:12:35.847Z', '2026-11-01T20:12:35.847Z'),
(E'cmvy9o5fv00q8bogykbaxiig1', E'social-studies', E'Social Studies', E'cmvy9o5et00o6bogyd5iiymt2', E'#D08A1A', E'map', 3, E'Geography, history and civics of our district.', E'SST', TRUE, '2026-11-01T20:12:35.851Z', '2026-11-01T20:12:35.851Z'),
(E'cmvy9o5g000qsbogyepxufuh1', E'religious-education', E'Religious Education', E'cmvy9o5et00o6bogyd5iiymt2', E'#9B59B6', E'sparkles', 4, E'Christian and Islamic Religious Education.', E'RE,IRE,Theology', TRUE, '2026-11-01T20:12:35.857Z', '2026-11-01T20:12:35.857Z'),
(E'cmvy9o5g500rcbogyjg69sh2h', E'kiswahili', E'Kiswahili', E'cmvy9o5et00o6bogyd5iiymt2', E'#2C7A7B', E'speech', 5, E'Salamu, msamiati, sarufi na mazungumzo.', E'Kiswahili', FALSE, '2026-11-01T20:12:35.862Z', '2026-11-01T20:12:35.862Z'),
(E'cmvy9o5g800rqbogy4iyktdvx', E'ict', E'ICT', E'cmvy9o5et00o6bogyd5iiymt2', E'#4A5568', E'monitor', 6, E'Computer basics, typing and safe use of technology.', E'ICT', FALSE, '2026-11-01T20:12:35.864Z', '2026-11-01T20:12:35.864Z'),
(E'cmvy9o5g900s0bogyn0jqm6k0', E'creative-arts-and-pe', E'Creative Arts & PE', E'cmvy9o5et00o6bogyd5iiymt2', E'#D26B3F', E'palette', 7, E'Music, dance, drama, art and physical education.', E'Art,PE,Music', FALSE, '2026-11-01T20:12:35.866Z', '2026-11-01T20:12:35.866Z'),
(E'cmvy9o5gb00sabogywll7c052', E'holiday-packages', E'Holiday Packages & Mixed Papers', E'cmvy9o5et00o6bogyd5iiymt2', E'#6B7280', E'package', 8, E'Multi-subject holiday work and mixed revision sets.', E'Packages', FALSE, '2026-11-01T20:12:35.867Z', '2026-11-01T20:12:35.867Z'),
(E'cmvy9o5gc00sebogyqi6qlbkx', E'mathematics', E'Mathematics', E'cmvy9o5gb00scbogyihv5h2tq', E'#4F6BED', E'calculator', 0, E'Numbers, operations, geometry, measurement, data and problem solving.', E'MTC', TRUE, '2026-11-01T20:12:35.868Z', '2026-11-01T20:12:35.868Z'),
(E'cmvy9o5gj00t8bogy6oatig5k', E'english', E'English', E'cmvy9o5gb00scbogyihv5h2tq', E'#E0564A', E'languages', 1, E'Grammar, vocabulary, comprehension and composition.', E'English', TRUE, '2026-11-01T20:12:35.875Z', '2026-11-01T20:12:35.875Z'),
(E'cmvy9o5gn00tybogybrqnqg16', E'science', E'Integrated Science', E'cmvy9o5gb00scbogyihv5h2tq', E'#0E9F8A', E'flask-conical', 2, E'Living things, health, matter, energy, environment and agriculture.', E'Science', TRUE, '2026-11-01T20:12:35.880Z', '2026-11-01T20:12:35.880Z'),
(E'cmvy9o5gs00uqbogyilx6aa2a', E'social-studies', E'Social Studies', E'cmvy9o5gb00scbogyihv5h2tq', E'#D08A1A', E'map', 3, E'Geography, history and civics of Uganda.', E'SST', TRUE, '2026-11-01T20:12:35.885Z', '2026-11-01T20:12:35.885Z'),
(E'cmvy9o5h200vebogyma6r8mvw', E'religious-education', E'Religious Education', E'cmvy9o5gb00scbogyihv5h2tq', E'#9B59B6', E'sparkles', 4, E'Christian and Islamic Religious Education.', E'RE,IRE,Theology', TRUE, '2026-11-01T20:12:35.894Z', '2026-11-01T20:12:35.894Z'),
(E'cmvy9o5hd00vybogyywijp63d', E'kiswahili', E'Kiswahili', E'cmvy9o5gb00scbogyihv5h2tq', E'#2C7A7B', E'speech', 5, E'Salamu, msamiati, sarufi na mazungumzo.', E'Kiswahili', FALSE, '2026-11-01T20:12:35.905Z', '2026-11-01T20:12:35.905Z'),
(E'cmvy9o5hn00wcbogyyu8yrlxz', E'ict', E'ICT', E'cmvy9o5gb00scbogyihv5h2tq', E'#4A5568', E'monitor', 6, E'Computer basics, typing and safe use of technology.', E'ICT', FALSE, '2026-11-01T20:12:35.916Z', '2026-11-01T20:12:35.916Z'),
(E'cmvy9o5hp00wmbogy8pucucvc', E'creative-arts-and-pe', E'Creative Arts & PE', E'cmvy9o5gb00scbogyihv5h2tq', E'#D26B3F', E'palette', 7, E'Music, dance, drama, art and physical education.', E'Art,PE,Music', FALSE, '2026-11-01T20:12:35.917Z', '2026-11-01T20:12:35.917Z'),
(E'cmvy9o5hr00wwbogygou8e6ou', E'holiday-packages', E'Holiday Packages & Mixed Papers', E'cmvy9o5gb00scbogyihv5h2tq', E'#6B7280', E'package', 8, E'Multi-subject holiday work and mixed revision sets.', E'Packages', FALSE, '2026-11-01T20:12:35.920Z', '2026-11-01T20:12:35.920Z'),
(E'cmvy9o5hu00x0bogydcfxqrp2', E'mathematics', E'Mathematics', E'cmvy9o5hs00wybogyi61erru2', E'#4F6BED', E'calculator', 0, E'Numbers, operations, geometry, measurement, data and problem solving.', E'MTC', TRUE, '2026-11-01T20:12:35.923Z', '2026-11-01T20:12:35.923Z'),
(E'cmvy9o5i100xsbogy2vbxdigr', E'english', E'English', E'cmvy9o5hs00wybogyi61erru2', E'#E0564A', E'languages', 1, E'Grammar, vocabulary, comprehension and composition.', E'English', TRUE, '2026-11-01T20:12:35.930Z', '2026-11-01T20:12:35.930Z'),
(E'cmvy9o5i600yibogyz9epzoab', E'science', E'Integrated Science', E'cmvy9o5hs00wybogyi61erru2', E'#0E9F8A', E'flask-conical', 2, E'Living things, health, matter, energy, environment and agriculture.', E'Science', TRUE, '2026-11-01T20:12:35.934Z', '2026-11-01T20:12:35.934Z'),
(E'cmvy9o5id00zabogydgno1szr', E'social-studies', E'Social Studies', E'cmvy9o5hs00wybogyi61erru2', E'#D08A1A', E'map', 3, E'Geography, history and civics of East Africa.', E'SST', TRUE, '2026-11-01T20:12:35.941Z', '2026-11-01T20:12:35.941Z'),
(E'cmvy9o5kx01aqbogygault86r', E'geography', E'Geography', E'cmvy9o5ku01aebogygit99696', E'#D08A1A', E'map', 5, NULL, E'Geography', TRUE, '2026-11-01T20:12:36.033Z', '2026-11-01T20:12:36.033Z'),
(E'cmvy9o5ig00zwbogysbrs0341', E'religious-education', E'Religious Education', E'cmvy9o5hs00wybogyi61erru2', E'#9B59B6', E'sparkles', 4, E'Christian and Islamic Religious Education.', E'RE,IRE,Theology', TRUE, '2026-11-01T20:12:35.945Z', '2026-11-01T20:12:35.945Z'),
(E'cmvy9o5ik010gbogytbwxr3uy', E'kiswahili', E'Kiswahili', E'cmvy9o5hs00wybogyi61erru2', E'#2C7A7B', E'speech', 5, E'Salamu, msamiati, sarufi na mazungumzo.', E'Kiswahili', FALSE, '2026-11-01T20:12:35.948Z', '2026-11-01T20:12:35.948Z'),
(E'cmvy9o5im010ubogyrmhfvbdn', E'ict', E'ICT', E'cmvy9o5hs00wybogyi61erru2', E'#4A5568', E'monitor', 6, E'Computer basics, typing and safe use of technology.', E'ICT', FALSE, '2026-11-01T20:12:35.950Z', '2026-11-01T20:12:35.950Z'),
(E'cmvy9o5io0114bogysrkw7py3', E'creative-arts-and-pe', E'Creative Arts & PE', E'cmvy9o5hs00wybogyi61erru2', E'#D26B3F', E'palette', 7, E'Music, dance, drama, art and physical education.', E'Art,PE,Music', FALSE, '2026-11-01T20:12:35.952Z', '2026-11-01T20:12:35.952Z'),
(E'cmvy9o5ir011ebogyzefog8vm', E'holiday-packages', E'Holiday Packages & Mixed Papers', E'cmvy9o5hs00wybogyi61erru2', E'#6B7280', E'package', 8, E'Multi-subject holiday work and mixed revision sets.', E'Packages', FALSE, '2026-11-01T20:12:35.956Z', '2026-11-01T20:12:35.956Z'),
(E'cmvy9o5it011ibogyoeiiouhk', E'mathematics', E'Mathematics', E'cmvy9o5is011gbogyesyu81sm', E'#4F6BED', E'calculator', 0, E'Numbers, operations, geometry, measurement, data and problem solving.', E'MTC', TRUE, '2026-11-01T20:12:35.957Z', '2026-11-01T20:12:35.957Z'),
(E'cmvy9o5iy012abogy57nynjx4', E'english', E'English', E'cmvy9o5is011gbogyesyu81sm', E'#E0564A', E'languages', 1, E'Grammar, vocabulary, comprehension and composition.', E'English', TRUE, '2026-11-01T20:12:35.963Z', '2026-11-01T20:12:35.963Z'),
(E'cmvy9o5j20130bogyj0oufl7o', E'science', E'Integrated Science', E'cmvy9o5is011gbogyesyu81sm', E'#0E9F8A', E'flask-conical', 2, E'Living things, health, matter, energy, environment and agriculture.', E'Science', TRUE, '2026-11-01T20:12:35.967Z', '2026-11-01T20:12:35.967Z'),
(E'cmvy9o5jb013sbogy22txr9li', E'social-studies', E'Social Studies', E'cmvy9o5is011gbogyesyu81sm', E'#D08A1A', E'map', 3, E'Geography, history and civics of Africa.', E'SST', TRUE, '2026-11-01T20:12:35.975Z', '2026-11-01T20:12:35.975Z'),
(E'cmvy9o5jg014ibogyzjbjhl1r', E'religious-education', E'Religious Education', E'cmvy9o5is011gbogyesyu81sm', E'#9B59B6', E'sparkles', 4, E'Christian and Islamic Religious Education.', E'RE,IRE,Theology', TRUE, '2026-11-01T20:12:35.981Z', '2026-11-01T20:12:35.981Z'),
(E'cmvy9o5jk0152bogy712qcrtn', E'kiswahili', E'Kiswahili', E'cmvy9o5is011gbogyesyu81sm', E'#2C7A7B', E'speech', 5, E'Salamu, msamiati, sarufi na mazungumzo.', E'Kiswahili', FALSE, '2026-11-01T20:12:35.984Z', '2026-11-01T20:12:35.984Z'),
(E'cmvy9o5jn015gbogymdkooia5', E'ict', E'ICT', E'cmvy9o5is011gbogyesyu81sm', E'#4A5568', E'monitor', 6, E'Computer basics, typing and safe use of technology.', E'ICT', FALSE, '2026-11-01T20:12:35.988Z', '2026-11-01T20:12:35.988Z'),
(E'cmvy9o5jt015qbogyzvygwmz4', E'creative-arts-and-pe', E'Creative Arts & PE', E'cmvy9o5is011gbogyesyu81sm', E'#D26B3F', E'palette', 7, E'Music, dance, drama, art and physical education.', E'Art,PE,Music', FALSE, '2026-11-01T20:12:35.994Z', '2026-11-01T20:12:35.994Z'),
(E'cmvy9o5jv0160bogy6ov2q750', E'holiday-packages', E'Holiday Packages & Mixed Papers', E'cmvy9o5is011gbogyesyu81sm', E'#6B7280', E'package', 8, E'Multi-subject holiday work and mixed revision sets.', E'Packages', FALSE, '2026-11-01T20:12:35.996Z', '2026-11-01T20:12:35.996Z'),
(E'cmvy9o5jw0164bogy5tpxio7n', E'mathematics', E'Mathematics', E'cmvy9o5jv0162bogy0mvlb00d', E'#4F6BED', E'calculator', 0, NULL, E'Mathematics', TRUE, '2026-11-01T20:12:35.996Z', '2026-11-01T20:12:35.996Z'),
(E'cmvy9o5jw0166bogyfpn86zo0', E'english', E'English', E'cmvy9o5jv0162bogy0mvlb00d', E'#E0564A', E'languages', 1, NULL, E'English', TRUE, '2026-11-01T20:12:35.997Z', '2026-11-01T20:12:35.997Z'),
(E'cmvy9o5jx0168bogyo222gwii', E'biology', E'Biology', E'cmvy9o5jv0162bogy0mvlb00d', E'#0E9F8A', E'flask-conical', 2, NULL, E'Biology', TRUE, '2026-11-01T20:12:35.997Z', '2026-11-01T20:12:35.997Z'),
(E'cmvy9o5jx016abogyv45xw3kn', E'chemistry', E'Chemistry', E'cmvy9o5jv0162bogy0mvlb00d', E'#0F766E', E'flask-conical', 3, NULL, E'Chemistry', TRUE, '2026-11-01T20:12:35.998Z', '2026-11-01T20:12:35.998Z'),
(E'cmvy9o5jx016cbogynpx99ymu', E'physics', E'Physics', E'cmvy9o5jv0162bogy0mvlb00d', E'#1D4ED8', E'atom', 4, NULL, E'Physics', TRUE, '2026-11-01T20:12:35.998Z', '2026-11-01T20:12:35.998Z'),
(E'cmvy9o5jy016ebogy6vway53f', E'geography', E'Geography', E'cmvy9o5jv0162bogy0mvlb00d', E'#D08A1A', E'map', 5, NULL, E'Geography', TRUE, '2026-11-01T20:12:35.998Z', '2026-11-01T20:12:35.998Z'),
(E'cmvy9o5jy016gbogyz2mih7z9', E'history', E'History & Political Education', E'cmvy9o5jv0162bogy0mvlb00d', E'#B45309', E'landmark', 6, NULL, E'History', TRUE, '2026-11-01T20:12:35.999Z', '2026-11-01T20:12:35.999Z'),
(E'cmvy9o5jz016ibogyks2szm77', E'cre', E'Christian Religious Education', E'cmvy9o5jv0162bogy0mvlb00d', E'#9B59B6', E'sparkles', 7, NULL, E'CRE', TRUE, '2026-11-01T20:12:35.999Z', '2026-11-01T20:12:35.999Z'),
(E'cmvy9o5jz016kbogywhvgnev5', E'ire', E'Islamic Religious Education', E'cmvy9o5jv0162bogy0mvlb00d', E'#7C3AED', E'sparkles', 8, NULL, E'IRE', TRUE, '2026-11-01T20:12:35.999Z', '2026-11-01T20:12:35.999Z'),
(E'cmvy9o5jz016mbogyftfrdr6u', E'kiswahili', E'Kiswahili', E'cmvy9o5jv0162bogy0mvlb00d', E'#2C7A7B', E'speech', 9, NULL, E'Kiswahili', TRUE, '2026-11-01T20:12:36.000Z', '2026-11-01T20:12:36.000Z'),
(E'cmvy9o5k0016obogy1a3yi5xc', E'entrepreneurship', E'Entrepreneurship', E'cmvy9o5jv0162bogy0mvlb00d', E'#059669', E'briefcase', 10, NULL, E'Entrepreneurship,Entreprenuership', TRUE, '2026-11-01T20:12:36.000Z', '2026-11-01T20:12:36.000Z'),
(E'cmvy9o5k1016qbogyc8lp1xex', E'agriculture', E'Agriculture', E'cmvy9o5jv0162bogy0mvlb00d', E'#65A30D', E'leaf', 11, NULL, E'Agriculture', TRUE, '2026-11-01T20:12:36.001Z', '2026-11-01T20:12:36.001Z'),
(E'cmvy9o5k1016sbogy2t49nr13', E'ict', E'ICT', E'cmvy9o5jv0162bogy0mvlb00d', E'#4A5568', E'monitor', 12, NULL, E'ICT', TRUE, '2026-11-01T20:12:36.002Z', '2026-11-01T20:12:36.002Z'),
(E'cmvy9o5k1016ubogy5u7rfhn9', E'literature', E'Literature in English', E'cmvy9o5jv0162bogy0mvlb00d', E'#BE185D', E'book-open', 13, NULL, E'Literature', TRUE, '2026-11-01T20:12:36.002Z', '2026-11-01T20:12:36.002Z'),
(E'cmvy9o5k2016wbogy7qg78jim', E'art', E'Art & Design', E'cmvy9o5jv0162bogy0mvlb00d', E'#D26B3F', E'palette', 14, NULL, E'Art', TRUE, '2026-11-01T20:12:36.002Z', '2026-11-01T20:12:36.002Z'),
(E'cmvy9o5k2016ybogye0p2wn7e', E'commerce', E'Commerce', E'cmvy9o5jv0162bogy0mvlb00d', E'#0369A1', E'briefcase', 15, NULL, E'Commerce', TRUE, '2026-11-01T20:12:36.003Z', '2026-11-01T20:12:36.003Z'),
(E'cmvy9o5k30170bogy0dwcg4cv', E'accounts', E'Accounts', E'cmvy9o5jv0162bogy0mvlb00d', E'#0369A1', E'briefcase', 16, NULL, E'Accounts', TRUE, '2026-11-01T20:12:36.003Z', '2026-11-01T20:12:36.003Z'),
(E'cmvy9o5k30172bogy1zi5z8ex', E'food-and-nutrition', E'Nutrition & Food Technology', E'cmvy9o5jv0162bogy0mvlb00d', E'#E07A28', E'utensils', 17, NULL, E'FN', TRUE, '2026-11-01T20:12:36.004Z', '2026-11-01T20:12:36.004Z'),
(E'cmvy9o5k40174bogy5m7c8ce3', E'technology-and-design', E'Technology & Design', E'cmvy9o5jv0162bogy0mvlb00d', E'#475569', E'wrench', 18, NULL, E'TD,TechnologyandDesign,TechnicalDrawing', TRUE, '2026-11-01T20:12:36.004Z', '2026-11-01T20:12:36.004Z'),
(E'cmvy9o5k60176bogyk2y4szpp', E'luganda', E'Luganda', E'cmvy9o5jv0162bogy0mvlb00d', E'#8A66D9', E'speech', 19, NULL, E'Luganda', TRUE, '2026-11-01T20:12:36.006Z', '2026-11-01T20:12:36.006Z'),
(E'cmvy9o5k70178bogykl7iq0r6', E'french', E'French', E'cmvy9o5jv0162bogy0mvlb00d', E'#2563EB', E'languages', 20, NULL, E'French', TRUE, '2026-11-01T20:12:36.007Z', '2026-11-01T20:12:36.007Z'),
(E'cmvy9o5k7017abogyod2bj6fp', E'german', E'German', E'cmvy9o5jv0162bogy0mvlb00d', E'#334155', E'languages', 21, NULL, E'German', TRUE, '2026-11-01T20:12:36.008Z', '2026-11-01T20:12:36.008Z'),
(E'cmvy9o5k8017cbogyv3ndc6ef', E'arabic', E'Arabic', E'cmvy9o5jv0162bogy0mvlb00d', E'#047857', E'languages', 22, NULL, E'Arabic', TRUE, '2026-11-01T20:12:36.008Z', '2026-11-01T20:12:36.008Z'),
(E'cmvy9o5k8017ebogyi5cwg8od', E'physical-education', E'Physical Education', E'cmvy9o5jv0162bogy0mvlb00d', E'#D26B3F', E'dumbbell', 23, NULL, E'PhysicalEducation', TRUE, '2026-11-01T20:12:36.009Z', '2026-11-01T20:12:36.009Z'),
(E'cmvy9o5k9017gbogy30xzuf9w', E'music', E'Music', E'cmvy9o5jv0162bogy0mvlb00d', E'#D26B3F', E'music', 24, NULL, E'Music', TRUE, '2026-11-01T20:12:36.009Z', '2026-11-01T20:12:36.009Z'),
(E'cmvy9o5k9017kbogy6apwshxg', E'mathematics', E'Mathematics', E'cmvy9o5k9017ibogy2iuia862', E'#4F6BED', E'calculator', 0, NULL, E'Mathematics', TRUE, '2026-11-01T20:12:36.010Z', '2026-11-01T20:12:36.010Z'),
(E'cmvy9o5ka017mbogyhjj8xk45', E'english', E'English', E'cmvy9o5k9017ibogy2iuia862', E'#E0564A', E'languages', 1, NULL, E'English', TRUE, '2026-11-01T20:12:36.010Z', '2026-11-01T20:12:36.010Z'),
(E'cmvy9o5ka017obogyhq273c3a', E'biology', E'Biology', E'cmvy9o5k9017ibogy2iuia862', E'#0E9F8A', E'flask-conical', 2, NULL, E'Biology', TRUE, '2026-11-01T20:12:36.010Z', '2026-11-01T20:12:36.010Z'),
(E'cmvy9o5ka017qbogy4ey5wae8', E'chemistry', E'Chemistry', E'cmvy9o5k9017ibogy2iuia862', E'#0F766E', E'flask-conical', 3, NULL, E'Chemistry', TRUE, '2026-11-01T20:12:36.011Z', '2026-11-01T20:12:36.011Z'),
(E'cmvy9o5kb017sbogybmvfrdnq', E'physics', E'Physics', E'cmvy9o5k9017ibogy2iuia862', E'#1D4ED8', E'atom', 4, NULL, E'Physics', TRUE, '2026-11-01T20:12:36.011Z', '2026-11-01T20:12:36.011Z'),
(E'cmvy9o5kb017ubogyyr2ptzae', E'geography', E'Geography', E'cmvy9o5k9017ibogy2iuia862', E'#D08A1A', E'map', 5, NULL, E'Geography', TRUE, '2026-11-01T20:12:36.012Z', '2026-11-01T20:12:36.012Z'),
(E'cmvy9o5kb017wbogyvcm3o6c1', E'history', E'History & Political Education', E'cmvy9o5k9017ibogy2iuia862', E'#B45309', E'landmark', 6, NULL, E'History', TRUE, '2026-11-01T20:12:36.012Z', '2026-11-01T20:12:36.012Z'),
(E'cmvy9o5kc017ybogy6q76cb7n', E'cre', E'Christian Religious Education', E'cmvy9o5k9017ibogy2iuia862', E'#9B59B6', E'sparkles', 7, NULL, E'CRE', TRUE, '2026-11-01T20:12:36.012Z', '2026-11-01T20:12:36.012Z'),
(E'cmvy9o5kc0180bogy6udxot4c', E'ire', E'Islamic Religious Education', E'cmvy9o5k9017ibogy2iuia862', E'#7C3AED', E'sparkles', 8, NULL, E'IRE', TRUE, '2026-11-01T20:12:36.012Z', '2026-11-01T20:12:36.012Z'),
(E'cmvy9o5kc0182bogyp7rcqkgs', E'kiswahili', E'Kiswahili', E'cmvy9o5k9017ibogy2iuia862', E'#2C7A7B', E'speech', 9, NULL, E'Kiswahili', TRUE, '2026-11-01T20:12:36.013Z', '2026-11-01T20:12:36.013Z'),
(E'cmvy9o5kd0184bogygtd1exx2', E'entrepreneurship', E'Entrepreneurship', E'cmvy9o5k9017ibogy2iuia862', E'#059669', E'briefcase', 10, NULL, E'Entrepreneurship,Entreprenuership', TRUE, '2026-11-01T20:12:36.013Z', '2026-11-01T20:12:36.013Z'),
(E'cmvy9o5kd0186bogyd2qyp8lp', E'agriculture', E'Agriculture', E'cmvy9o5k9017ibogy2iuia862', E'#65A30D', E'leaf', 11, NULL, E'Agriculture', TRUE, '2026-11-01T20:12:36.013Z', '2026-11-01T20:12:36.013Z'),
(E'cmvy9o5kd0188bogyhyyesqzb', E'ict', E'ICT', E'cmvy9o5k9017ibogy2iuia862', E'#4A5568', E'monitor', 12, NULL, E'ICT', TRUE, '2026-11-01T20:12:36.014Z', '2026-11-01T20:12:36.014Z'),
(E'cmvy9o5ke018abogyv5zh69xe', E'literature', E'Literature in English', E'cmvy9o5k9017ibogy2iuia862', E'#BE185D', E'book-open', 13, NULL, E'Literature', TRUE, '2026-11-01T20:12:36.014Z', '2026-11-01T20:12:36.014Z'),
(E'cmvy9o5ke018cbogy7z3d4a6v', E'art', E'Art & Design', E'cmvy9o5k9017ibogy2iuia862', E'#D26B3F', E'palette', 14, NULL, E'Art', TRUE, '2026-11-01T20:12:36.014Z', '2026-11-01T20:12:36.014Z'),
(E'cmvy9o5ke018ebogykodp144n', E'commerce', E'Commerce', E'cmvy9o5k9017ibogy2iuia862', E'#0369A1', E'briefcase', 15, NULL, E'Commerce', TRUE, '2026-11-01T20:12:36.015Z', '2026-11-01T20:12:36.015Z'),
(E'cmvy9o5kf018gbogy229qgvq8', E'accounts', E'Accounts', E'cmvy9o5k9017ibogy2iuia862', E'#0369A1', E'briefcase', 16, NULL, E'Accounts', TRUE, '2026-11-01T20:12:36.015Z', '2026-11-01T20:12:36.015Z'),
(E'cmvy9o5kf018ibogyag527ra8', E'food-and-nutrition', E'Nutrition & Food Technology', E'cmvy9o5k9017ibogy2iuia862', E'#E07A28', E'utensils', 17, NULL, E'FN', TRUE, '2026-11-01T20:12:36.015Z', '2026-11-01T20:12:36.015Z'),
(E'cmvy9o5kf018kbogyizhage9n', E'technology-and-design', E'Technology & Design', E'cmvy9o5k9017ibogy2iuia862', E'#475569', E'wrench', 18, NULL, E'TD,TechnologyandDesign,TechnicalDrawing', TRUE, '2026-11-01T20:12:36.016Z', '2026-11-01T20:12:36.016Z'),
(E'cmvy9o5kg018mbogy1bdy0xwv', E'luganda', E'Luganda', E'cmvy9o5k9017ibogy2iuia862', E'#8A66D9', E'speech', 19, NULL, E'Luganda', TRUE, '2026-11-01T20:12:36.016Z', '2026-11-01T20:12:36.016Z'),
(E'cmvy9o5kg018obogyz8snu7ux', E'french', E'French', E'cmvy9o5k9017ibogy2iuia862', E'#2563EB', E'languages', 20, NULL, E'French', TRUE, '2026-11-01T20:12:36.016Z', '2026-11-01T20:12:36.016Z'),
(E'cmvy9o5kg018qbogypoqkc50v', E'german', E'German', E'cmvy9o5k9017ibogy2iuia862', E'#334155', E'languages', 21, NULL, E'German', TRUE, '2026-11-01T20:12:36.017Z', '2026-11-01T20:12:36.017Z'),
(E'cmvy9o5kh018sbogyt8y36vv3', E'arabic', E'Arabic', E'cmvy9o5k9017ibogy2iuia862', E'#047857', E'languages', 22, NULL, E'Arabic', TRUE, '2026-11-01T20:12:36.017Z', '2026-11-01T20:12:36.017Z'),
(E'cmvy9o5kh018ubogynsk0wqnz', E'physical-education', E'Physical Education', E'cmvy9o5k9017ibogy2iuia862', E'#D26B3F', E'dumbbell', 23, NULL, E'PhysicalEducation', TRUE, '2026-11-01T20:12:36.017Z', '2026-11-01T20:12:36.017Z'),
(E'cmvy9o5kh018wbogyz7em81yl', E'music', E'Music', E'cmvy9o5k9017ibogy2iuia862', E'#D26B3F', E'music', 24, NULL, E'Music', TRUE, '2026-11-01T20:12:36.018Z', '2026-11-01T20:12:36.018Z'),
(E'cmvy9o5ki0190bogy29m5gtp6', E'mathematics', E'Mathematics', E'cmvy9o5ki018ybogy1td0z7hx', E'#4F6BED', E'calculator', 0, NULL, E'Mathematics', TRUE, '2026-11-01T20:12:36.019Z', '2026-11-01T20:12:36.019Z'),
(E'cmvy9o5ki0192bogyyleilyyb', E'english', E'English', E'cmvy9o5ki018ybogy1td0z7hx', E'#E0564A', E'languages', 1, NULL, E'English', TRUE, '2026-11-01T20:12:36.019Z', '2026-11-01T20:12:36.019Z'),
(E'cmvy9o5kj0194bogypgzh71wl', E'biology', E'Biology', E'cmvy9o5ki018ybogy1td0z7hx', E'#0E9F8A', E'flask-conical', 2, NULL, E'Biology', TRUE, '2026-11-01T20:12:36.019Z', '2026-11-01T20:12:36.019Z'),
(E'cmvy9o5kj0196bogyrmjg6wsw', E'chemistry', E'Chemistry', E'cmvy9o5ki018ybogy1td0z7hx', E'#0F766E', E'flask-conical', 3, NULL, E'Chemistry', TRUE, '2026-11-01T20:12:36.020Z', '2026-11-01T20:12:36.020Z'),
(E'cmvy9o5kk0198bogyi5k0av49', E'physics', E'Physics', E'cmvy9o5ki018ybogy1td0z7hx', E'#1D4ED8', E'atom', 4, NULL, E'Physics', TRUE, '2026-11-01T20:12:36.020Z', '2026-11-01T20:12:36.020Z'),
(E'cmvy9o5kk019abogyivr4547q', E'geography', E'Geography', E'cmvy9o5ki018ybogy1td0z7hx', E'#D08A1A', E'map', 5, NULL, E'Geography', TRUE, '2026-11-01T20:12:36.020Z', '2026-11-01T20:12:36.020Z'),
(E'cmvy9o5kk019cbogy2opuyg1g', E'history', E'History & Political Education', E'cmvy9o5ki018ybogy1td0z7hx', E'#B45309', E'landmark', 6, NULL, E'History', TRUE, '2026-11-01T20:12:36.021Z', '2026-11-01T20:12:36.021Z'),
(E'cmvy9o5kn019ebogyttawk8ir', E'cre', E'Christian Religious Education', E'cmvy9o5ki018ybogy1td0z7hx', E'#9B59B6', E'sparkles', 7, NULL, E'CRE', TRUE, '2026-11-01T20:12:36.024Z', '2026-11-01T20:12:36.024Z'),
(E'cmvy9o5ko019gbogyzkygth21', E'ire', E'Islamic Religious Education', E'cmvy9o5ki018ybogy1td0z7hx', E'#7C3AED', E'sparkles', 8, NULL, E'IRE', TRUE, '2026-11-01T20:12:36.024Z', '2026-11-01T20:12:36.024Z'),
(E'cmvy9o5ko019ibogy7lmc6m1u', E'kiswahili', E'Kiswahili', E'cmvy9o5ki018ybogy1td0z7hx', E'#2C7A7B', E'speech', 9, NULL, E'Kiswahili', TRUE, '2026-11-01T20:12:36.025Z', '2026-11-01T20:12:36.025Z'),
(E'cmvy9o5kp019kbogyepxwomn8', E'entrepreneurship', E'Entrepreneurship', E'cmvy9o5ki018ybogy1td0z7hx', E'#059669', E'briefcase', 10, NULL, E'Entrepreneurship,Entreprenuership', TRUE, '2026-11-01T20:12:36.026Z', '2026-11-01T20:12:36.026Z'),
(E'cmvy9o5kq019mbogystbxadya', E'agriculture', E'Agriculture', E'cmvy9o5ki018ybogy1td0z7hx', E'#65A30D', E'leaf', 11, NULL, E'Agriculture', TRUE, '2026-11-01T20:12:36.026Z', '2026-11-01T20:12:36.026Z'),
(E'cmvy9o5kq019obogy0tgqhv0c', E'ict', E'ICT', E'cmvy9o5ki018ybogy1td0z7hx', E'#4A5568', E'monitor', 12, NULL, E'ICT', TRUE, '2026-11-01T20:12:36.026Z', '2026-11-01T20:12:36.026Z'),
(E'cmvy9o5kq019qbogyn1hc1s7s', E'literature', E'Literature in English', E'cmvy9o5ki018ybogy1td0z7hx', E'#BE185D', E'book-open', 13, NULL, E'Literature', TRUE, '2026-11-01T20:12:36.027Z', '2026-11-01T20:12:36.027Z'),
(E'cmvy9o5kr019sbogy248d9y2y', E'art', E'Art & Design', E'cmvy9o5ki018ybogy1td0z7hx', E'#D26B3F', E'palette', 14, NULL, E'Art', TRUE, '2026-11-01T20:12:36.027Z', '2026-11-01T20:12:36.027Z'),
(E'cmvy9o5kr019ubogyo0mwp79e', E'commerce', E'Commerce', E'cmvy9o5ki018ybogy1td0z7hx', E'#0369A1', E'briefcase', 15, NULL, E'Commerce', TRUE, '2026-11-01T20:12:36.027Z', '2026-11-01T20:12:36.027Z'),
(E'cmvy9o5kr019wbogynkffejno', E'accounts', E'Accounts', E'cmvy9o5ki018ybogy1td0z7hx', E'#0369A1', E'briefcase', 16, NULL, E'Accounts', TRUE, '2026-11-01T20:12:36.028Z', '2026-11-01T20:12:36.028Z'),
(E'cmvy9o5ks019ybogyaevk7qub', E'food-and-nutrition', E'Nutrition & Food Technology', E'cmvy9o5ki018ybogy1td0z7hx', E'#E07A28', E'utensils', 17, NULL, E'FN', TRUE, '2026-11-01T20:12:36.028Z', '2026-11-01T20:12:36.028Z'),
(E'cmvy9o5ks01a0bogydx6k522k', E'technology-and-design', E'Technology & Design', E'cmvy9o5ki018ybogy1td0z7hx', E'#475569', E'wrench', 18, NULL, E'TD,TechnologyandDesign,TechnicalDrawing', TRUE, '2026-11-01T20:12:36.028Z', '2026-11-01T20:12:36.028Z'),
(E'cmvy9o5ks01a2bogyj6wte9d5', E'luganda', E'Luganda', E'cmvy9o5ki018ybogy1td0z7hx', E'#8A66D9', E'speech', 19, NULL, E'Luganda', TRUE, '2026-11-01T20:12:36.029Z', '2026-11-01T20:12:36.029Z'),
(E'cmvy9o5kt01a4bogygzvy4tth', E'french', E'French', E'cmvy9o5ki018ybogy1td0z7hx', E'#2563EB', E'languages', 20, NULL, E'French', TRUE, '2026-11-01T20:12:36.029Z', '2026-11-01T20:12:36.029Z'),
(E'cmvy9o5kt01a6bogy4jilytm9', E'german', E'German', E'cmvy9o5ki018ybogy1td0z7hx', E'#334155', E'languages', 21, NULL, E'German', TRUE, '2026-11-01T20:12:36.029Z', '2026-11-01T20:12:36.029Z'),
(E'cmvy9o5kt01a8bogy9zbyp5b5', E'arabic', E'Arabic', E'cmvy9o5ki018ybogy1td0z7hx', E'#047857', E'languages', 22, NULL, E'Arabic', TRUE, '2026-11-01T20:12:36.030Z', '2026-11-01T20:12:36.030Z'),
(E'cmvy9o5ku01aabogyohum1co3', E'physical-education', E'Physical Education', E'cmvy9o5ki018ybogy1td0z7hx', E'#D26B3F', E'dumbbell', 23, NULL, E'PhysicalEducation', TRUE, '2026-11-01T20:12:36.030Z', '2026-11-01T20:12:36.030Z'),
(E'cmvy9o5ku01acbogyn5rlr0ah', E'music', E'Music', E'cmvy9o5ki018ybogy1td0z7hx', E'#D26B3F', E'music', 24, NULL, E'Music', TRUE, '2026-11-01T20:12:36.031Z', '2026-11-01T20:12:36.031Z'),
(E'cmvy9o5kv01agbogypu2nyy6p', E'mathematics', E'Mathematics', E'cmvy9o5ku01aebogygit99696', E'#4F6BED', E'calculator', 0, NULL, E'Mathematics', TRUE, '2026-11-01T20:12:36.031Z', '2026-11-01T20:12:36.031Z'),
(E'cmvy9o5kv01aibogy1zrzgj8m', E'english', E'English', E'cmvy9o5ku01aebogygit99696', E'#E0564A', E'languages', 1, NULL, E'English', TRUE, '2026-11-01T20:12:36.032Z', '2026-11-01T20:12:36.032Z'),
(E'cmvy9o5kv01akbogycw34yx36', E'biology', E'Biology', E'cmvy9o5ku01aebogygit99696', E'#0E9F8A', E'flask-conical', 2, NULL, E'Biology', TRUE, '2026-11-01T20:12:36.032Z', '2026-11-01T20:12:36.032Z'),
(E'cmvy9o5kw01ambogytm61wkso', E'chemistry', E'Chemistry', E'cmvy9o5ku01aebogygit99696', E'#0F766E', E'flask-conical', 3, NULL, E'Chemistry', TRUE, '2026-11-01T20:12:36.032Z', '2026-11-01T20:12:36.032Z'),
(E'cmvy9o5kw01aobogyme44izid', E'physics', E'Physics', E'cmvy9o5ku01aebogygit99696', E'#1D4ED8', E'atom', 4, NULL, E'Physics', TRUE, '2026-11-01T20:12:36.033Z', '2026-11-01T20:12:36.033Z'),
(E'cmvy9o5kx01asbogympc93im2', E'history', E'History & Political Education', E'cmvy9o5ku01aebogygit99696', E'#B45309', E'landmark', 6, NULL, E'History', TRUE, '2026-11-01T20:12:36.033Z', '2026-11-01T20:12:36.033Z'),
(E'cmvy9o5kx01aubogyiqt1l2vv', E'cre', E'Christian Religious Education', E'cmvy9o5ku01aebogygit99696', E'#9B59B6', E'sparkles', 7, NULL, E'CRE', TRUE, '2026-11-01T20:12:36.034Z', '2026-11-01T20:12:36.034Z'),
(E'cmvy9o5ky01awbogysk1xcuz2', E'ire', E'Islamic Religious Education', E'cmvy9o5ku01aebogygit99696', E'#7C3AED', E'sparkles', 8, NULL, E'IRE', TRUE, '2026-11-01T20:12:36.034Z', '2026-11-01T20:12:36.034Z'),
(E'cmvy9o5ky01aybogyr6q0sxdc', E'kiswahili', E'Kiswahili', E'cmvy9o5ku01aebogygit99696', E'#2C7A7B', E'speech', 9, NULL, E'Kiswahili', TRUE, '2026-11-01T20:12:36.035Z', '2026-11-01T20:12:36.035Z'),
(E'cmvy9o5kz01b0bogy92b946ut', E'entrepreneurship', E'Entrepreneurship', E'cmvy9o5ku01aebogygit99696', E'#059669', E'briefcase', 10, NULL, E'Entrepreneurship,Entreprenuership', TRUE, '2026-11-01T20:12:36.035Z', '2026-11-01T20:12:36.035Z'),
(E'cmvy9o5kz01b2bogylfd613gh', E'agriculture', E'Agriculture', E'cmvy9o5ku01aebogygit99696', E'#65A30D', E'leaf', 11, NULL, E'Agriculture', TRUE, '2026-11-01T20:12:36.035Z', '2026-11-01T20:12:36.035Z'),
(E'cmvy9o5kz01b4bogyv6r76mi2', E'ict', E'ICT', E'cmvy9o5ku01aebogygit99696', E'#4A5568', E'monitor', 12, NULL, E'ICT', TRUE, '2026-11-01T20:12:36.036Z', '2026-11-01T20:12:36.036Z'),
(E'cmvy9o5l001b6bogyelg02v1q', E'literature', E'Literature in English', E'cmvy9o5ku01aebogygit99696', E'#BE185D', E'book-open', 13, NULL, E'Literature', TRUE, '2026-11-01T20:12:36.036Z', '2026-11-01T20:12:36.036Z'),
(E'cmvy9o5l001b8bogy5wi1ukns', E'art', E'Art & Design', E'cmvy9o5ku01aebogygit99696', E'#D26B3F', E'palette', 14, NULL, E'Art', TRUE, '2026-11-01T20:12:36.037Z', '2026-11-01T20:12:36.037Z'),
(E'cmvy9o5l101babogyv989akm5', E'commerce', E'Commerce', E'cmvy9o5ku01aebogygit99696', E'#0369A1', E'briefcase', 15, NULL, E'Commerce', TRUE, '2026-11-01T20:12:36.037Z', '2026-11-01T20:12:36.037Z'),
(E'cmvy9o5l101bcbogyvluv3ftc', E'accounts', E'Accounts', E'cmvy9o5ku01aebogygit99696', E'#0369A1', E'briefcase', 16, NULL, E'Accounts', TRUE, '2026-11-01T20:12:36.038Z', '2026-11-01T20:12:36.038Z'),
(E'cmvy9o5l301bebogyow0qbn0k', E'food-and-nutrition', E'Nutrition & Food Technology', E'cmvy9o5ku01aebogygit99696', E'#E07A28', E'utensils', 17, NULL, E'FN', TRUE, '2026-11-01T20:12:36.040Z', '2026-11-01T20:12:36.040Z'),
(E'cmvy9o5l401bgbogy0m603eew', E'technology-and-design', E'Technology & Design', E'cmvy9o5ku01aebogygit99696', E'#475569', E'wrench', 18, NULL, E'TD,TechnologyandDesign,TechnicalDrawing', TRUE, '2026-11-01T20:12:36.041Z', '2026-11-01T20:12:36.041Z'),
(E'cmvy9o5l501bibogyvtlue37e', E'luganda', E'Luganda', E'cmvy9o5ku01aebogygit99696', E'#8A66D9', E'speech', 19, NULL, E'Luganda', TRUE, '2026-11-01T20:12:36.042Z', '2026-11-01T20:12:36.042Z'),
(E'cmvy9o5l601bkbogyjjmavk74', E'french', E'French', E'cmvy9o5ku01aebogygit99696', E'#2563EB', E'languages', 20, NULL, E'French', TRUE, '2026-11-01T20:12:36.042Z', '2026-11-01T20:12:36.042Z'),
(E'cmvy9o5l601bmbogy1wbu26hw', E'german', E'German', E'cmvy9o5ku01aebogygit99696', E'#334155', E'languages', 21, NULL, E'German', TRUE, '2026-11-01T20:12:36.043Z', '2026-11-01T20:12:36.043Z'),
(E'cmvy9o5l601bobogyg46z63fy', E'arabic', E'Arabic', E'cmvy9o5ku01aebogygit99696', E'#047857', E'languages', 22, NULL, E'Arabic', TRUE, '2026-11-01T20:12:36.043Z', '2026-11-01T20:12:36.043Z'),
(E'cmvy9o5l701bqbogy0unm1m9s', E'physical-education', E'Physical Education', E'cmvy9o5ku01aebogygit99696', E'#D26B3F', E'dumbbell', 23, NULL, E'PhysicalEducation', TRUE, '2026-11-01T20:12:36.043Z', '2026-11-01T20:12:36.043Z'),
(E'cmvy9o5l701bsbogy64m49s3k', E'music', E'Music', E'cmvy9o5ku01aebogygit99696', E'#D26B3F', E'music', 24, NULL, E'Music', TRUE, '2026-11-01T20:12:36.044Z', '2026-11-01T20:12:36.044Z'),
(E'cmvy9o5l801bwbogycli5b7pm', E'general-paper', E'General Paper', E'cmvy9o5l801bubogytor1mdeb', E'#3B82F6', E'newspaper', 0, NULL, E'GeneralPaper,GP', TRUE, '2026-11-01T20:12:36.044Z', '2026-11-01T20:12:36.044Z'),
(E'cmvy9o5l801bybogy6wei8qfs', E'mathematics', E'Mathematics', E'cmvy9o5l801bubogytor1mdeb', E'#4F6BED', E'calculator', 1, NULL, E'Mathematics', TRUE, '2026-11-01T20:12:36.045Z', '2026-11-01T20:12:36.045Z'),
(E'cmvy9o5l901c0bogyyrwm1ngz', E'physics', E'Physics', E'cmvy9o5l801bubogytor1mdeb', E'#1D4ED8', E'atom', 2, NULL, E'Physics', TRUE, '2026-11-01T20:12:36.045Z', '2026-11-01T20:12:36.045Z'),
(E'cmvy9o5l901c2bogydegm484o', E'chemistry', E'Chemistry', E'cmvy9o5l801bubogytor1mdeb', E'#0F766E', E'flask-conical', 3, NULL, E'Chemistry', TRUE, '2026-11-01T20:12:36.046Z', '2026-11-01T20:12:36.046Z'),
(E'cmvy9o5la01c4bogy5p8v9fvv', E'biology', E'Biology', E'cmvy9o5l801bubogytor1mdeb', E'#0E9F8A', E'flask-conical', 4, NULL, E'Biology', TRUE, '2026-11-01T20:12:36.046Z', '2026-11-01T20:12:36.046Z'),
(E'cmvy9o5la01c6bogybniog5cn', E'economics', E'Economics', E'cmvy9o5l801bubogytor1mdeb', E'#0369A1', E'trending-up', 5, NULL, E'Economics', TRUE, '2026-11-01T20:12:36.046Z', '2026-11-01T20:12:36.046Z'),
(E'cmvy9o5la01c8bogykakktif0', E'geography', E'Geography', E'cmvy9o5l801bubogytor1mdeb', E'#D08A1A', E'map', 6, NULL, E'Geography', TRUE, '2026-11-01T20:12:36.047Z', '2026-11-01T20:12:36.047Z'),
(E'cmvy9o5la01cabogy7f41xxbu', E'history', E'History', E'cmvy9o5l801bubogytor1mdeb', E'#B45309', E'landmark', 7, NULL, E'History', TRUE, '2026-11-01T20:12:36.047Z', '2026-11-01T20:12:36.047Z'),
(E'cmvy9o5lb01ccbogyirvr257n', E'divinity', E'Divinity', E'cmvy9o5l801bubogytor1mdeb', E'#9B59B6', E'sparkles', 8, NULL, E'Divinity,Divity', TRUE, '2026-11-01T20:12:36.047Z', '2026-11-01T20:12:36.047Z'),
(E'cmvy9o5lb01cebogy8p4oylgu', E'ire', E'Islamic Religious Education', E'cmvy9o5l801bubogytor1mdeb', E'#7C3AED', E'sparkles', 9, NULL, E'IRE', TRUE, '2026-11-01T20:12:36.048Z', '2026-11-01T20:12:36.048Z'),
(E'cmvy9o5lb01cgbogyb3wune5u', E'literature', E'Literature in English', E'cmvy9o5l801bubogytor1mdeb', E'#BE185D', E'book-open', 10, NULL, E'Literature', TRUE, '2026-11-01T20:12:36.048Z', '2026-11-01T20:12:36.048Z'),
(E'cmvy9o5lc01cibogyrw2bhaxk', E'entrepreneurship', E'Entrepreneurship', E'cmvy9o5l801bubogytor1mdeb', E'#059669', E'briefcase', 11, NULL, E'Entrepreneurship', TRUE, '2026-11-01T20:12:36.048Z', '2026-11-01T20:12:36.048Z'),
(E'cmvy9o5lc01ckbogyhvp0vo2w', E'agriculture', E'Agriculture', E'cmvy9o5l801bubogytor1mdeb', E'#65A30D', E'leaf', 12, NULL, E'Agriculture', TRUE, '2026-11-01T20:12:36.048Z', '2026-11-01T20:12:36.048Z'),
(E'cmvy9o5lc01cmbogy143404px', E'art', E'Art', E'cmvy9o5l801bubogytor1mdeb', E'#D26B3F', E'palette', 13, NULL, E'Art', TRUE, '2026-11-01T20:12:36.049Z', '2026-11-01T20:12:36.049Z'),
(E'cmvy9o5ld01cobogyqxtg02zl', E'ict', E'Sub-ICT', E'cmvy9o5l801bubogytor1mdeb', E'#4A5568', E'monitor', 14, NULL, E'ICT,IPS', TRUE, '2026-11-01T20:12:36.049Z', '2026-11-01T20:12:36.049Z'),
(E'cmvy9o5ld01cqbogynb5rdjvb', E'kiswahili', E'Kiswahili', E'cmvy9o5l801bubogytor1mdeb', E'#2C7A7B', E'speech', 15, NULL, E'Kiswahili', TRUE, '2026-11-01T20:12:36.049Z', '2026-11-01T20:12:36.049Z'),
(E'cmvy9o5ld01csbogyruo3qign', E'luganda', E'Luganda', E'cmvy9o5l801bubogytor1mdeb', E'#8A66D9', E'speech', 16, NULL, E'Luganda', TRUE, '2026-11-01T20:12:36.050Z', '2026-11-01T20:12:36.050Z'),
(E'cmvy9o5ld01cubogygd983ekw', E'french', E'French', E'cmvy9o5l801bubogytor1mdeb', E'#2563EB', E'languages', 17, NULL, E'French', TRUE, '2026-11-01T20:12:36.050Z', '2026-11-01T20:12:36.050Z'),
(E'cmvy9o5le01cwbogy2th41j7s', E'german', E'German', E'cmvy9o5l801bubogytor1mdeb', E'#334155', E'languages', 18, NULL, E'German', TRUE, '2026-11-01T20:12:36.050Z', '2026-11-01T20:12:36.050Z'),
(E'cmvy9o5le01cybogyj64h8qlu', E'food-and-nutrition', E'Foods & Nutrition', E'cmvy9o5l801bubogytor1mdeb', E'#E07A28', E'utensils', 19, NULL, E'FN', TRUE, '2026-11-01T20:12:36.051Z', '2026-11-01T20:12:36.051Z'),
(E'cmvy9o5lf01d0bogygklg8tes', E'technical-drawing', E'Technical Drawing', E'cmvy9o5l801bubogytor1mdeb', E'#475569', E'wrench', 20, NULL, E'TD,TechnicalDrawing', TRUE, '2026-11-01T20:12:36.051Z', '2026-11-01T20:12:36.051Z'),
(E'cmvy9o5lf01d2bogyi80xh4cg', E'commerce', E'Commerce', E'cmvy9o5l801bubogytor1mdeb', E'#0369A1', E'briefcase', 21, NULL, E'Commerce', TRUE, '2026-11-01T20:12:36.051Z', '2026-11-01T20:12:36.051Z'),
(E'cmvy9o5lf01d4bogy75qkm901', E'music', E'Music', E'cmvy9o5l801bubogytor1mdeb', E'#D26B3F', E'music', 22, NULL, E'Music', TRUE, '2026-11-01T20:12:36.052Z', '2026-11-01T20:12:36.052Z'),
(E'cmvy9o5lg01d8bogypnmumsx6', E'general-paper', E'General Paper', E'cmvy9o5lg01d6bogyu8kqhywc', E'#3B82F6', E'newspaper', 0, NULL, E'GeneralPaper,GP', TRUE, '2026-11-01T20:12:36.053Z', '2026-11-01T20:12:36.053Z'),
(E'cmvy9o5lh01dabogy8ki0f238', E'mathematics', E'Mathematics', E'cmvy9o5lg01d6bogyu8kqhywc', E'#4F6BED', E'calculator', 1, NULL, E'Mathematics', TRUE, '2026-11-01T20:12:36.053Z', '2026-11-01T20:12:36.053Z'),
(E'cmvy9o5li01dcbogyglco9yba', E'physics', E'Physics', E'cmvy9o5lg01d6bogyu8kqhywc', E'#1D4ED8', E'atom', 2, NULL, E'Physics', TRUE, '2026-11-01T20:12:36.054Z', '2026-11-01T20:12:36.054Z'),
(E'cmvy9o5ll01debogyr5ej2dmi', E'chemistry', E'Chemistry', E'cmvy9o5lg01d6bogyu8kqhywc', E'#0F766E', E'flask-conical', 3, NULL, E'Chemistry', TRUE, '2026-11-01T20:12:36.058Z', '2026-11-01T20:12:36.058Z'),
(E'cmvy9o5lm01dgbogyt48i506e', E'biology', E'Biology', E'cmvy9o5lg01d6bogyu8kqhywc', E'#0E9F8A', E'flask-conical', 4, NULL, E'Biology', TRUE, '2026-11-01T20:12:36.059Z', '2026-11-01T20:12:36.059Z'),
(E'cmvy9o5ln01dibogy6xvci64j', E'economics', E'Economics', E'cmvy9o5lg01d6bogyu8kqhywc', E'#0369A1', E'trending-up', 5, NULL, E'Economics', TRUE, '2026-11-01T20:12:36.059Z', '2026-11-01T20:12:36.059Z'),
(E'cmvy9o5ln01dkbogyofu5lwkv', E'geography', E'Geography', E'cmvy9o5lg01d6bogyu8kqhywc', E'#D08A1A', E'map', 6, NULL, E'Geography', TRUE, '2026-11-01T20:12:36.059Z', '2026-11-01T20:12:36.059Z'),
(E'cmvy9o5ln01dmbogylinotobc', E'history', E'History', E'cmvy9o5lg01d6bogyu8kqhywc', E'#B45309', E'landmark', 7, NULL, E'History', TRUE, '2026-11-01T20:12:36.060Z', '2026-11-01T20:12:36.060Z'),
(E'cmvy9o5lo01dobogygsvqvb86', E'divinity', E'Divinity', E'cmvy9o5lg01d6bogyu8kqhywc', E'#9B59B6', E'sparkles', 8, NULL, E'Divinity,Divity', TRUE, '2026-11-01T20:12:36.060Z', '2026-11-01T20:12:36.060Z'),
(E'cmvy9o5lo01dqbogybe86cj03', E'ire', E'Islamic Religious Education', E'cmvy9o5lg01d6bogyu8kqhywc', E'#7C3AED', E'sparkles', 9, NULL, E'IRE', TRUE, '2026-11-01T20:12:36.061Z', '2026-11-01T20:12:36.061Z'),
(E'cmvy9o5lp01dsbogy11hbh49x', E'literature', E'Literature in English', E'cmvy9o5lg01d6bogyu8kqhywc', E'#BE185D', E'book-open', 10, NULL, E'Literature', TRUE, '2026-11-01T20:12:36.061Z', '2026-11-01T20:12:36.061Z'),
(E'cmvy9o5lp01dubogye3jzbzvd', E'entrepreneurship', E'Entrepreneurship', E'cmvy9o5lg01d6bogyu8kqhywc', E'#059669', E'briefcase', 11, NULL, E'Entrepreneurship', TRUE, '2026-11-01T20:12:36.061Z', '2026-11-01T20:12:36.061Z'),
(E'cmvy9o5lp01dwbogy20n6gv5c', E'agriculture', E'Agriculture', E'cmvy9o5lg01d6bogyu8kqhywc', E'#65A30D', E'leaf', 12, NULL, E'Agriculture', TRUE, '2026-11-01T20:12:36.062Z', '2026-11-01T20:12:36.062Z'),
(E'cmvy9o5lq01dybogyyixms5pj', E'art', E'Art', E'cmvy9o5lg01d6bogyu8kqhywc', E'#D26B3F', E'palette', 13, NULL, E'Art', TRUE, '2026-11-01T20:12:36.062Z', '2026-11-01T20:12:36.062Z'),
(E'cmvy9o5lq01e0bogy2x1iubvp', E'ict', E'Sub-ICT', E'cmvy9o5lg01d6bogyu8kqhywc', E'#4A5568', E'monitor', 14, NULL, E'ICT,IPS', TRUE, '2026-11-01T20:12:36.063Z', '2026-11-01T20:12:36.063Z'),
(E'cmvy9o5lr01e2bogyqlhpwypp', E'kiswahili', E'Kiswahili', E'cmvy9o5lg01d6bogyu8kqhywc', E'#2C7A7B', E'speech', 15, NULL, E'Kiswahili', TRUE, '2026-11-01T20:12:36.063Z', '2026-11-01T20:12:36.063Z'),
(E'cmvy9o5lr01e4bogymes066qq', E'luganda', E'Luganda', E'cmvy9o5lg01d6bogyu8kqhywc', E'#8A66D9', E'speech', 16, NULL, E'Luganda', TRUE, '2026-11-01T20:12:36.063Z', '2026-11-01T20:12:36.063Z'),
(E'cmvy9o5lr01e6bogyh9v9kts3', E'french', E'French', E'cmvy9o5lg01d6bogyu8kqhywc', E'#2563EB', E'languages', 17, NULL, E'French', TRUE, '2026-11-01T20:12:36.064Z', '2026-11-01T20:12:36.064Z'),
(E'cmvy9o5ls01e8bogy76onfqtu', E'german', E'German', E'cmvy9o5lg01d6bogyu8kqhywc', E'#334155', E'languages', 18, NULL, E'German', TRUE, '2026-11-01T20:12:36.064Z', '2026-11-01T20:12:36.064Z'),
(E'cmvy9o5ls01eabogyprtlcwzo', E'food-and-nutrition', E'Foods & Nutrition', E'cmvy9o5lg01d6bogyu8kqhywc', E'#E07A28', E'utensils', 19, NULL, E'FN', TRUE, '2026-11-01T20:12:36.064Z', '2026-11-01T20:12:36.064Z'),
(E'cmvy9o5ls01ecbogy7tgbanm7', E'technical-drawing', E'Technical Drawing', E'cmvy9o5lg01d6bogyu8kqhywc', E'#475569', E'wrench', 20, NULL, E'TD,TechnicalDrawing', TRUE, '2026-11-01T20:12:36.065Z', '2026-11-01T20:12:36.065Z'),
(E'cmvy9o5lt01eebogyar0e0qsd', E'commerce', E'Commerce', E'cmvy9o5lg01d6bogyu8kqhywc', E'#0369A1', E'briefcase', 21, NULL, E'Commerce', TRUE, '2026-11-01T20:12:36.065Z', '2026-11-01T20:12:36.065Z'),
(E'cmvy9o5lt01egbogygi463231', E'music', E'Music', E'cmvy9o5lg01d6bogyu8kqhywc', E'#D26B3F', E'music', 22, NULL, E'Music', TRUE, '2026-11-01T20:12:36.066Z', '2026-11-01T20:12:36.066Z')
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "Topic" ("id", "slug", "name", "subjectId", "term", "order", "summary", "createdAt", "updatedAt") VALUES
(E'cmvy9o59l000abogyz1458hxp', E'greetings-and-names', E'Greetings and Names', E'cmvy9o59g0008bogyf7kym6wn', 1, 0, NULL, '2026-11-01T20:12:35.625Z', '2026-11-01T20:12:35.625Z'),
(E'cmvy9o59m000cbogy03769fgn', E'rhymes-and-songs', E'Rhymes and Songs', E'cmvy9o59g0008bogyf7kym6wn', 1, 1, NULL, '2026-11-01T20:12:35.627Z', '2026-11-01T20:12:35.627Z'),
(E'cmvy9o59n000ebogyk7osqtxt', E'naming-things-around-us', E'Naming Things Around Us', E'cmvy9o59g0008bogyf7kym6wn', 1, 2, NULL, '2026-11-01T20:12:35.628Z', '2026-11-01T20:12:35.628Z'),
(E'cmvy9o59o000gbogyriwbxr46', E'listening-to-stories', E'Listening to Stories', E'cmvy9o59g0008bogyf7kym6wn', 2, 3, NULL, '2026-11-01T20:12:35.628Z', '2026-11-01T20:12:35.628Z'),
(E'cmvy9o59o000ibogyu43r773r', E'colours', E'Colours', E'cmvy9o59g0008bogyf7kym6wn', 2, 4, NULL, '2026-11-01T20:12:35.629Z', '2026-11-01T20:12:35.629Z'),
(E'cmvy9o59p000kbogyd2wpg9og', E'parts-of-the-body', E'Parts of the Body', E'cmvy9o59g0008bogyf7kym6wn', 2, 5, NULL, '2026-11-01T20:12:35.629Z', '2026-11-01T20:12:35.629Z'),
(E'cmvy9o59p000mbogyp7ztta3i', E'animals-and-their-sounds', E'Animals and Their Sounds', E'cmvy9o59g0008bogyf7kym6wn', 3, 6, NULL, '2026-11-01T20:12:35.629Z', '2026-11-01T20:12:35.629Z'),
(E'cmvy9o59p000obogywj7i7sqy', E'family-words', E'Family Words', E'cmvy9o59g0008bogyf7kym6wn', 3, 7, NULL, '2026-11-01T20:12:35.630Z', '2026-11-01T20:12:35.630Z'),
(E'cmvy9o59q000qbogyf5g2xdf6', E'action-words', E'Action Words', E'cmvy9o59g0008bogyf7kym6wn', 3, 8, NULL, '2026-11-01T20:12:35.630Z', '2026-11-01T20:12:35.630Z'),
(E'cmvy9o59r000ubogyf7fw3tfw', E'sorting-and-matching', E'Sorting and Matching', E'cmvy9o59q000sbogy1rnuql4y', 1, 0, NULL, '2026-11-01T20:12:35.631Z', '2026-11-01T20:12:35.631Z'),
(E'cmvy9o59r000wbogy9tc84rmw', E'counting-1-to-10', E'Counting 1 to 10', E'cmvy9o59q000sbogy1rnuql4y', 1, 1, NULL, '2026-11-01T20:12:35.632Z', '2026-11-01T20:12:35.632Z'),
(E'cmvy9o59r000ybogyjse4tg35', E'shapes-around-us', E'Shapes Around Us', E'cmvy9o59q000sbogy1rnuql4y', 1, 2, NULL, '2026-11-01T20:12:35.632Z', '2026-11-01T20:12:35.632Z'),
(E'cmvy9o59s0010bogyowp6d842', E'big-and-small', E'Big and Small', E'cmvy9o59q000sbogy1rnuql4y', 2, 3, NULL, '2026-11-01T20:12:35.632Z', '2026-11-01T20:12:35.632Z'),
(E'cmvy9o59s0012bogyv1tlill1', E'patterns', E'Patterns', E'cmvy9o59q000sbogy1rnuql4y', 2, 4, NULL, '2026-11-01T20:12:35.632Z', '2026-11-01T20:12:35.632Z'),
(E'cmvy9o59s0014bogyurkjejyv', E'number-writing', E'Number Writing', E'cmvy9o59q000sbogy1rnuql4y', 2, 5, NULL, '2026-11-01T20:12:35.633Z', '2026-11-01T20:12:35.633Z'),
(E'cmvy9o59t0016bogydegcjb5t', E'more-and-less', E'More and Less', E'cmvy9o59q000sbogy1rnuql4y', 3, 6, NULL, '2026-11-01T20:12:35.633Z', '2026-11-01T20:12:35.633Z'),
(E'cmvy9o59t0018bogycao9ox3w', E'counting-to-20', E'Counting to 20', E'cmvy9o59q000sbogy1rnuql4y', 3, 7, NULL, '2026-11-01T20:12:35.633Z', '2026-11-01T20:12:35.633Z'),
(E'cmvy9o59t001abogytea1nr41', E'simple-addition', E'Simple Addition', E'cmvy9o59q000sbogy1rnuql4y', 3, 8, NULL, '2026-11-01T20:12:35.634Z', '2026-11-01T20:12:35.634Z'),
(E'cmvy9o59u001ebogyopigdbru', E'picture-reading', E'Picture Reading', E'cmvy9o59t001cbogytt2lkajg', 1, 0, NULL, '2026-11-01T20:12:35.634Z', '2026-11-01T20:12:35.634Z'),
(E'cmvy9o59u001gbogyylc03lhh', E'letter-sounds-a-m', E'Letter Sounds a–m', E'cmvy9o59t001cbogytt2lkajg', 1, 1, NULL, '2026-11-01T20:12:35.635Z', '2026-11-01T20:12:35.635Z'),
(E'cmvy9o59v001ibogyq2808vdd', E'letter-sounds-n-z', E'Letter Sounds n–z', E'cmvy9o59t001cbogytt2lkajg', 2, 2, NULL, '2026-11-01T20:12:35.635Z', '2026-11-01T20:12:35.635Z'),
(E'cmvy9o59v001kbogy3gw75nvm', E'two-letter-words', E'Two-letter Words', E'cmvy9o59t001cbogytt2lkajg', 2, 3, NULL, '2026-11-01T20:12:35.636Z', '2026-11-01T20:12:35.636Z'),
(E'cmvy9o59v001mbogyu2lkm7kf', E'three-letter-words', E'Three-letter Words', E'cmvy9o59t001cbogytt2lkajg', 3, 4, NULL, '2026-11-01T20:12:35.636Z', '2026-11-01T20:12:35.636Z'),
(E'cmvy9o59w001obogyrcd2c7r7', E'simple-sentences', E'Simple Sentences', E'cmvy9o59t001cbogytt2lkajg', 3, 5, NULL, '2026-11-01T20:12:35.636Z', '2026-11-01T20:12:35.636Z'),
(E'cmvy9o59x001sbogyv1h72wvp', E'scribbling-and-patterns', E'Scribbling and Patterns', E'cmvy9o59w001qbogy8v7vyte1', 1, 0, NULL, '2026-11-01T20:12:35.637Z', '2026-11-01T20:12:35.637Z'),
(E'cmvy9o59z001ubogyxzfjm8nc', E'tracing-lines-and-curves', E'Tracing Lines and Curves', E'cmvy9o59w001qbogy8v7vyte1', 1, 1, NULL, '2026-11-01T20:12:35.639Z', '2026-11-01T20:12:35.639Z'),
(E'cmvy9o59z001wbogygoqtreud', E'writing-letters', E'Writing Letters', E'cmvy9o59w001qbogy8v7vyte1', 2, 2, NULL, '2026-11-01T20:12:35.640Z', '2026-11-01T20:12:35.640Z'),
(E'cmvy9o5a0001ybogy2vb0vgwt', E'writing-numbers', E'Writing Numbers', E'cmvy9o59w001qbogy8v7vyte1', 2, 3, NULL, '2026-11-01T20:12:35.641Z', '2026-11-01T20:12:35.641Z'),
(E'cmvy9o5a10020bogy57lt94kv', E'writing-my-name', E'Writing My Name', E'cmvy9o59w001qbogy8v7vyte1', 3, 4, NULL, '2026-11-01T20:12:35.642Z', '2026-11-01T20:12:35.642Z'),
(E'cmvy9o5a10022bogyfo0vuga3', E'copying-words', E'Copying Words', E'cmvy9o59w001qbogy8v7vyte1', 3, 5, NULL, '2026-11-01T20:12:35.642Z', '2026-11-01T20:12:35.642Z'),
(E'cmvy9o5a20026bogyerd9yynb', E'washing-hands', E'Washing Hands', E'cmvy9o5a20024bogylq4715ld', 1, 0, NULL, '2026-11-01T20:12:35.643Z', '2026-11-01T20:12:35.643Z'),
(E'cmvy9o5a30028bogysq9ui2c4', E'brushing-teeth', E'Brushing Teeth', E'cmvy9o5a20024bogylq4715ld', 1, 1, NULL, '2026-11-01T20:12:35.643Z', '2026-11-01T20:12:35.643Z'),
(E'cmvy9o5a3002abogyjlyeartw', E'healthy-foods', E'Healthy Foods', E'cmvy9o5a20024bogylq4715ld', 2, 2, NULL, '2026-11-01T20:12:35.643Z', '2026-11-01T20:12:35.643Z'),
(E'cmvy9o5a3002cbogyfwxjiczr', E'keeping-clean', E'Keeping Clean', E'cmvy9o5a20024bogylq4715ld', 2, 3, NULL, '2026-11-01T20:12:35.644Z', '2026-11-01T20:12:35.644Z'),
(E'cmvy9o5a4002ebogyzidepvok', E'safety-at-home', E'Safety at Home', E'cmvy9o5a20024bogylq4715ld', 3, 4, NULL, '2026-11-01T20:12:35.644Z', '2026-11-01T20:12:35.644Z'),
(E'cmvy9o5a4002gbogygb849ju6', E'safety-at-school', E'Safety at School', E'cmvy9o5a20024bogylq4715ld', 3, 5, NULL, '2026-11-01T20:12:35.644Z', '2026-11-01T20:12:35.644Z'),
(E'cmvy9o5a5002kbogy2wuvbsdl', E'myself', E'Myself', E'cmvy9o5a4002ibogydm13e0gz', 1, 0, NULL, '2026-11-01T20:12:35.645Z', '2026-11-01T20:12:35.645Z'),
(E'cmvy9o5a5002mbogynz833e1z', E'my-family', E'My Family', E'cmvy9o5a4002ibogydm13e0gz', 1, 1, NULL, '2026-11-01T20:12:35.646Z', '2026-11-01T20:12:35.646Z'),
(E'cmvy9o5a6002obogyx53yof5i', E'my-friends', E'My Friends', E'cmvy9o5a4002ibogydm13e0gz', 2, 2, NULL, '2026-11-01T20:12:35.646Z', '2026-11-01T20:12:35.646Z'),
(E'cmvy9o5a6002qbogyubykort8', E'good-manners', E'Good Manners', E'cmvy9o5a4002ibogydm13e0gz', 2, 3, NULL, '2026-11-01T20:12:35.646Z', '2026-11-01T20:12:35.646Z'),
(E'cmvy9o5a6002sbogyv0law6t7', E'people-who-help-us', E'People Who Help Us', E'cmvy9o5a4002ibogydm13e0gz', 3, 4, NULL, '2026-11-01T20:12:35.647Z', '2026-11-01T20:12:35.647Z'),
(E'cmvy9o5a6002ubogyoumrj8us', E'our-school', E'Our School', E'cmvy9o5a4002ibogydm13e0gz', 3, 5, NULL, '2026-11-01T20:12:35.647Z', '2026-11-01T20:12:35.647Z'),
(E'cmvy9o5a7002ybogyygwzgd9s', E'greetings', E'Greetings', E'cmvy9o5a7002wbogyfdw3jsqs', 1, 0, NULL, '2026-11-01T20:12:35.647Z', '2026-11-01T20:12:35.647Z'),
(E'cmvy9o5a70030bogynazk85ed', E'naming-objects', E'Naming Objects', E'cmvy9o5a7002wbogyfdw3jsqs', 1, 1, NULL, '2026-11-01T20:12:35.648Z', '2026-11-01T20:12:35.648Z'),
(E'cmvy9o5a80032bogy1to4cezg', E'colours-and-shapes', E'Colours and Shapes', E'cmvy9o5a7002wbogyfdw3jsqs', 2, 2, NULL, '2026-11-01T20:12:35.648Z', '2026-11-01T20:12:35.648Z'),
(E'cmvy9o5a80034bogy10xk6hb5', E'numbers-in-english', E'Numbers in English', E'cmvy9o5a7002wbogyfdw3jsqs', 2, 3, NULL, '2026-11-01T20:12:35.648Z', '2026-11-01T20:12:35.648Z'),
(E'cmvy9o5a80036bogyvwo8hrkh', E'simple-commands', E'Simple Commands', E'cmvy9o5a7002wbogyfdw3jsqs', 3, 4, NULL, '2026-11-01T20:12:35.649Z', '2026-11-01T20:12:35.649Z'),
(E'cmvy9o5a80038bogy1o0b0k67', E'my-body', E'My Body', E'cmvy9o5a7002wbogyfdw3jsqs', 3, 5, NULL, '2026-11-01T20:12:35.649Z', '2026-11-01T20:12:35.649Z'),
(E'cmvy9o5a9003cbogy0amyc6dp', E'weather', E'Weather', E'cmvy9o5a9003abogy1vpi1j2e', 1, 0, NULL, '2026-11-01T20:12:35.650Z', '2026-11-01T20:12:35.650Z'),
(E'cmvy9o5a9003ebogy59babqvb', E'domestic-animals', E'Domestic Animals', E'cmvy9o5a9003abogy1vpi1j2e', 1, 1, NULL, '2026-11-01T20:12:35.650Z', '2026-11-01T20:12:35.650Z'),
(E'cmvy9o5aa003gbogyquyyborn', E'wild-animals', E'Wild Animals', E'cmvy9o5a9003abogy1vpi1j2e', 2, 2, NULL, '2026-11-01T20:12:35.650Z', '2026-11-01T20:12:35.650Z'),
(E'cmvy9o5aa003ibogy0k6vndsu', E'plants-around-us', E'Plants Around Us', E'cmvy9o5a9003abogy1vpi1j2e', 2, 3, NULL, '2026-11-01T20:12:35.651Z', '2026-11-01T20:12:35.651Z'),
(E'cmvy9o5aa003kbogyqq7y82pb', E'means-of-transport', E'Means of Transport', E'cmvy9o5a9003abogy1vpi1j2e', 3, 4, NULL, '2026-11-01T20:12:35.651Z', '2026-11-01T20:12:35.651Z'),
(E'cmvy9o5ab003mbogyb4zw0pcx', E'our-country-uganda', E'Our Country Uganda', E'cmvy9o5a9003abogy1vpi1j2e', 3, 5, NULL, '2026-11-01T20:12:35.651Z', '2026-11-01T20:12:35.651Z'),
(E'cmvy9o5ab003qbogyspu8neod', E'god-made-me', E'God Made Me', E'cmvy9o5ab003obogykd2k88x5', 1, 0, NULL, '2026-11-01T20:12:35.652Z', '2026-11-01T20:12:35.652Z'),
(E'cmvy9o5ac003sbogy424ey5pi', E'prayers', E'Prayers', E'cmvy9o5ab003obogykd2k88x5', 1, 1, NULL, '2026-11-01T20:12:35.652Z', '2026-11-01T20:12:35.652Z'),
(E'cmvy9o5ac003ubogyb3mnro7r', E'bible-quran-stories', E'Bible / Quran Stories', E'cmvy9o5ab003obogykd2k88x5', 2, 2, NULL, '2026-11-01T20:12:35.653Z', '2026-11-01T20:12:35.653Z'),
(E'cmvy9o5ad003wbogyqfxo6s5r', E'being-kind', E'Being Kind', E'cmvy9o5ab003obogykd2k88x5', 2, 3, NULL, '2026-11-01T20:12:35.653Z', '2026-11-01T20:12:35.653Z'),
(E'cmvy9o5ad003ybogyd7ksvo58', E'sharing', E'Sharing', E'cmvy9o5ab003obogykd2k88x5', 3, 4, NULL, '2026-11-01T20:12:35.654Z', '2026-11-01T20:12:35.654Z'),
(E'cmvy9o5ah0040bogyabgun7cy', E'thanking-god', E'Thanking God', E'cmvy9o5ab003obogykd2k88x5', 3, 5, NULL, '2026-11-01T20:12:35.657Z', '2026-11-01T20:12:35.657Z'),
(E'cmvy9o5aj0046bogyrdwb5op0', E'greetings-and-names', E'Greetings and Names', E'cmvy9o5ai0044bogyhgyg2jis', 1, 0, NULL, '2026-11-01T20:12:35.659Z', '2026-11-01T20:12:35.659Z'),
(E'cmvy9o5aj0048bogyq38n17dl', E'rhymes-and-songs', E'Rhymes and Songs', E'cmvy9o5ai0044bogyhgyg2jis', 1, 1, NULL, '2026-11-01T20:12:35.660Z', '2026-11-01T20:12:35.660Z'),
(E'cmvy9o5ak004abogy4y3icf60', E'naming-things-around-us', E'Naming Things Around Us', E'cmvy9o5ai0044bogyhgyg2jis', 1, 2, NULL, '2026-11-01T20:12:35.660Z', '2026-11-01T20:12:35.660Z'),
(E'cmvy9o5ak004cbogy474dtowr', E'listening-to-stories', E'Listening to Stories', E'cmvy9o5ai0044bogyhgyg2jis', 2, 3, NULL, '2026-11-01T20:12:35.660Z', '2026-11-01T20:12:35.660Z'),
(E'cmvy9o5ak004ebogyyetzi82p', E'colours', E'Colours', E'cmvy9o5ai0044bogyhgyg2jis', 2, 4, NULL, '2026-11-01T20:12:35.661Z', '2026-11-01T20:12:35.661Z'),
(E'cmvy9o5al004gbogy72nq87xn', E'parts-of-the-body', E'Parts of the Body', E'cmvy9o5ai0044bogyhgyg2jis', 2, 5, NULL, '2026-11-01T20:12:35.661Z', '2026-11-01T20:12:35.661Z'),
(E'cmvy9o5al004ibogyur0uimce', E'animals-and-their-sounds', E'Animals and Their Sounds', E'cmvy9o5ai0044bogyhgyg2jis', 3, 6, NULL, '2026-11-01T20:12:35.661Z', '2026-11-01T20:12:35.661Z'),
(E'cmvy9o5al004kbogyzltssout', E'family-words', E'Family Words', E'cmvy9o5ai0044bogyhgyg2jis', 3, 7, NULL, '2026-11-01T20:12:35.662Z', '2026-11-01T20:12:35.662Z'),
(E'cmvy9o5am004mbogy9w89gic5', E'action-words', E'Action Words', E'cmvy9o5ai0044bogyhgyg2jis', 3, 8, NULL, '2026-11-01T20:12:35.662Z', '2026-11-01T20:12:35.662Z'),
(E'cmvy9o5am004qbogyew6xa215', E'sorting-and-matching', E'Sorting and Matching', E'cmvy9o5am004obogy7hkwase4', 1, 0, NULL, '2026-11-01T20:12:35.663Z', '2026-11-01T20:12:35.663Z'),
(E'cmvy9o5an004sbogy3ffn20x9', E'counting-1-to-10', E'Counting 1 to 10', E'cmvy9o5am004obogy7hkwase4', 1, 1, NULL, '2026-11-01T20:12:35.663Z', '2026-11-01T20:12:35.663Z'),
(E'cmvy9o5an004ubogyl6v0qsqn', E'shapes-around-us', E'Shapes Around Us', E'cmvy9o5am004obogy7hkwase4', 1, 2, NULL, '2026-11-01T20:12:35.664Z', '2026-11-01T20:12:35.664Z'),
(E'cmvy9o5an004wbogy1wpie6ij', E'big-and-small', E'Big and Small', E'cmvy9o5am004obogy7hkwase4', 2, 3, NULL, '2026-11-01T20:12:35.664Z', '2026-11-01T20:12:35.664Z'),
(E'cmvy9o5ao004ybogyiphxizxn', E'patterns', E'Patterns', E'cmvy9o5am004obogy7hkwase4', 2, 4, NULL, '2026-11-01T20:12:35.664Z', '2026-11-01T20:12:35.664Z'),
(E'cmvy9o5ao0050bogyu6i5zt4p', E'number-writing', E'Number Writing', E'cmvy9o5am004obogy7hkwase4', 2, 5, NULL, '2026-11-01T20:12:35.664Z', '2026-11-01T20:12:35.664Z'),
(E'cmvy9o5ao0052bogyxzikdd59', E'more-and-less', E'More and Less', E'cmvy9o5am004obogy7hkwase4', 3, 6, NULL, '2026-11-01T20:12:35.665Z', '2026-11-01T20:12:35.665Z'),
(E'cmvy9o5ap0054bogy2vg0eyda', E'counting-to-20', E'Counting to 20', E'cmvy9o5am004obogy7hkwase4', 3, 7, NULL, '2026-11-01T20:12:35.665Z', '2026-11-01T20:12:35.665Z'),
(E'cmvy9o5ap0056bogypgje2gp1', E'simple-addition', E'Simple Addition', E'cmvy9o5am004obogy7hkwase4', 3, 8, NULL, '2026-11-01T20:12:35.665Z', '2026-11-01T20:12:35.665Z'),
(E'cmvy9o5aq005abogybyuhj9tx', E'picture-reading', E'Picture Reading', E'cmvy9o5ap0058bogy5jve1q4p', 1, 0, NULL, '2026-11-01T20:12:35.666Z', '2026-11-01T20:12:35.666Z'),
(E'cmvy9o5aq005cbogyohkg422o', E'letter-sounds-a-m', E'Letter Sounds a–m', E'cmvy9o5ap0058bogy5jve1q4p', 1, 1, NULL, '2026-11-01T20:12:35.666Z', '2026-11-01T20:12:35.666Z'),
(E'cmvy9o5aq005ebogypa9vlu96', E'letter-sounds-n-z', E'Letter Sounds n–z', E'cmvy9o5ap0058bogy5jve1q4p', 2, 2, NULL, '2026-11-01T20:12:35.667Z', '2026-11-01T20:12:35.667Z'),
(E'cmvy9o5ar005gbogyrph01a7i', E'two-letter-words', E'Two-letter Words', E'cmvy9o5ap0058bogy5jve1q4p', 2, 3, NULL, '2026-11-01T20:12:35.667Z', '2026-11-01T20:12:35.667Z'),
(E'cmvy9o5ar005ibogyl6muq65c', E'three-letter-words', E'Three-letter Words', E'cmvy9o5ap0058bogy5jve1q4p', 3, 4, NULL, '2026-11-01T20:12:35.667Z', '2026-11-01T20:12:35.667Z'),
(E'cmvy9o5ar005kbogys71msw6t', E'simple-sentences', E'Simple Sentences', E'cmvy9o5ap0058bogy5jve1q4p', 3, 5, NULL, '2026-11-01T20:12:35.668Z', '2026-11-01T20:12:35.668Z'),
(E'cmvy9o5as005obogy0kp48cin', E'scribbling-and-patterns', E'Scribbling and Patterns', E'cmvy9o5as005mbogy5rfx3n6p', 1, 0, NULL, '2026-11-01T20:12:35.668Z', '2026-11-01T20:12:35.668Z'),
(E'cmvy9o5as005qbogy3ylziri5', E'tracing-lines-and-curves', E'Tracing Lines and Curves', E'cmvy9o5as005mbogy5rfx3n6p', 1, 1, NULL, '2026-11-01T20:12:35.669Z', '2026-11-01T20:12:35.669Z'),
(E'cmvy9o5at005sbogyvpddwv4c', E'writing-letters', E'Writing Letters', E'cmvy9o5as005mbogy5rfx3n6p', 2, 2, NULL, '2026-11-01T20:12:35.669Z', '2026-11-01T20:12:35.669Z'),
(E'cmvy9o5at005ubogymfmk4bo5', E'writing-numbers', E'Writing Numbers', E'cmvy9o5as005mbogy5rfx3n6p', 2, 3, NULL, '2026-11-01T20:12:35.669Z', '2026-11-01T20:12:35.669Z'),
(E'cmvy9o5at005wbogyo0c00ive', E'writing-my-name', E'Writing My Name', E'cmvy9o5as005mbogy5rfx3n6p', 3, 4, NULL, '2026-11-01T20:12:35.670Z', '2026-11-01T20:12:35.670Z'),
(E'cmvy9o5au005ybogys23pjg49', E'copying-words', E'Copying Words', E'cmvy9o5as005mbogy5rfx3n6p', 3, 5, NULL, '2026-11-01T20:12:35.670Z', '2026-11-01T20:12:35.670Z'),
(E'cmvy9o5aw0062bogymjdq7j29', E'washing-hands', E'Washing Hands', E'cmvy9o5au0060bogyqcbb1p25', 1, 0, NULL, '2026-11-01T20:12:35.672Z', '2026-11-01T20:12:35.672Z'),
(E'cmvy9o5aw0064bogy09hiq7yn', E'brushing-teeth', E'Brushing Teeth', E'cmvy9o5au0060bogyqcbb1p25', 1, 1, NULL, '2026-11-01T20:12:35.673Z', '2026-11-01T20:12:35.673Z'),
(E'cmvy9o5ax0066bogyv277xv2l', E'healthy-foods', E'Healthy Foods', E'cmvy9o5au0060bogyqcbb1p25', 2, 2, NULL, '2026-11-01T20:12:35.674Z', '2026-11-01T20:12:35.674Z'),
(E'cmvy9o5ay0068bogy31c0534w', E'keeping-clean', E'Keeping Clean', E'cmvy9o5au0060bogyqcbb1p25', 2, 3, NULL, '2026-11-01T20:12:35.674Z', '2026-11-01T20:12:35.674Z'),
(E'cmvy9o5ay006abogy8v55qlh1', E'safety-at-home', E'Safety at Home', E'cmvy9o5au0060bogyqcbb1p25', 3, 4, NULL, '2026-11-01T20:12:35.675Z', '2026-11-01T20:12:35.675Z'),
(E'cmvy9o5az006cbogypxux2bqv', E'safety-at-school', E'Safety at School', E'cmvy9o5au0060bogyqcbb1p25', 3, 5, NULL, '2026-11-01T20:12:35.675Z', '2026-11-01T20:12:35.675Z'),
(E'cmvy9o5b0006gbogy1zjovzv9', E'myself', E'Myself', E'cmvy9o5az006ebogy72t0rwzu', 1, 0, NULL, '2026-11-01T20:12:35.676Z', '2026-11-01T20:12:35.676Z'),
(E'cmvy9o5b0006ibogyyto95jdf', E'my-family', E'My Family', E'cmvy9o5az006ebogy72t0rwzu', 1, 1, NULL, '2026-11-01T20:12:35.676Z', '2026-11-01T20:12:35.676Z'),
(E'cmvy9o5b0006kbogyl3s1qaku', E'my-friends', E'My Friends', E'cmvy9o5az006ebogy72t0rwzu', 2, 2, NULL, '2026-11-01T20:12:35.677Z', '2026-11-01T20:12:35.677Z'),
(E'cmvy9o5b0006mbogym0gk8jjt', E'good-manners', E'Good Manners', E'cmvy9o5az006ebogy72t0rwzu', 2, 3, NULL, '2026-11-01T20:12:35.677Z', '2026-11-01T20:12:35.677Z'),
(E'cmvy9o5b1006obogy8bpxme6f', E'people-who-help-us', E'People Who Help Us', E'cmvy9o5az006ebogy72t0rwzu', 3, 4, NULL, '2026-11-01T20:12:35.677Z', '2026-11-01T20:12:35.677Z'),
(E'cmvy9o5b1006qbogy02tkxcki', E'our-school', E'Our School', E'cmvy9o5az006ebogy72t0rwzu', 3, 5, NULL, '2026-11-01T20:12:35.678Z', '2026-11-01T20:12:35.678Z'),
(E'cmvy9o5b2006ubogyo0n4spyu', E'greetings', E'Greetings', E'cmvy9o5b1006sbogygfab43it', 1, 0, NULL, '2026-11-01T20:12:35.678Z', '2026-11-01T20:12:35.678Z'),
(E'cmvy9o5b2006wbogyuj8nd7ax', E'naming-objects', E'Naming Objects', E'cmvy9o5b1006sbogygfab43it', 1, 1, NULL, '2026-11-01T20:12:35.679Z', '2026-11-01T20:12:35.679Z'),
(E'cmvy9o5b2006ybogy5tqhvq8f', E'colours-and-shapes', E'Colours and Shapes', E'cmvy9o5b1006sbogygfab43it', 2, 2, NULL, '2026-11-01T20:12:35.679Z', '2026-11-01T20:12:35.679Z'),
(E'cmvy9o5b30070bogykl0bg13d', E'numbers-in-english', E'Numbers in English', E'cmvy9o5b1006sbogygfab43it', 2, 3, NULL, '2026-11-01T20:12:35.679Z', '2026-11-01T20:12:35.679Z'),
(E'cmvy9o5b30072bogykvn4t5n5', E'simple-commands', E'Simple Commands', E'cmvy9o5b1006sbogygfab43it', 3, 4, NULL, '2026-11-01T20:12:35.679Z', '2026-11-01T20:12:35.679Z'),
(E'cmvy9o5b30074bogyrp8b2y8d', E'my-body', E'My Body', E'cmvy9o5b1006sbogygfab43it', 3, 5, NULL, '2026-11-01T20:12:35.680Z', '2026-11-01T20:12:35.680Z'),
(E'cmvy9o5b40078bogyq5ek1ozu', E'weather', E'Weather', E'cmvy9o5b40076bogysxne7wx8', 1, 0, NULL, '2026-11-01T20:12:35.680Z', '2026-11-01T20:12:35.680Z'),
(E'cmvy9o5b4007abogynvej0psm', E'domestic-animals', E'Domestic Animals', E'cmvy9o5b40076bogysxne7wx8', 1, 1, NULL, '2026-11-01T20:12:35.681Z', '2026-11-01T20:12:35.681Z'),
(E'cmvy9o5b5007cbogypcjwzqe3', E'wild-animals', E'Wild Animals', E'cmvy9o5b40076bogysxne7wx8', 2, 2, NULL, '2026-11-01T20:12:35.681Z', '2026-11-01T20:12:35.681Z'),
(E'cmvy9o5b5007ebogyqi1hc6jq', E'plants-around-us', E'Plants Around Us', E'cmvy9o5b40076bogysxne7wx8', 2, 3, NULL, '2026-11-01T20:12:35.681Z', '2026-11-01T20:12:35.681Z'),
(E'cmvy9o5b5007gbogyuzcw2xo4', E'means-of-transport', E'Means of Transport', E'cmvy9o5b40076bogysxne7wx8', 3, 4, NULL, '2026-11-01T20:12:35.682Z', '2026-11-01T20:12:35.682Z'),
(E'cmvy9o5b6007ibogyq2de04sv', E'our-country-uganda', E'Our Country Uganda', E'cmvy9o5b40076bogysxne7wx8', 3, 5, NULL, '2026-11-01T20:12:35.682Z', '2026-11-01T20:12:35.682Z'),
(E'cmvy9o5b6007mbogyxcqxjjxz', E'god-made-me', E'God Made Me', E'cmvy9o5b6007kbogyogsos5la', 1, 0, NULL, '2026-11-01T20:12:35.683Z', '2026-11-01T20:12:35.683Z'),
(E'cmvy9o5b7007obogyjhavcv24', E'prayers', E'Prayers', E'cmvy9o5b6007kbogyogsos5la', 1, 1, NULL, '2026-11-01T20:12:35.683Z', '2026-11-01T20:12:35.683Z'),
(E'cmvy9o5b7007qbogyudi7u6bj', E'bible-quran-stories', E'Bible / Quran Stories', E'cmvy9o5b6007kbogyogsos5la', 2, 2, NULL, '2026-11-01T20:12:35.683Z', '2026-11-01T20:12:35.683Z'),
(E'cmvy9o5b7007sbogybh2ylulj', E'being-kind', E'Being Kind', E'cmvy9o5b6007kbogyogsos5la', 2, 3, NULL, '2026-11-01T20:12:35.684Z', '2026-11-01T20:12:35.684Z'),
(E'cmvy9o5b8007ubogyjh8xy8g4', E'sharing', E'Sharing', E'cmvy9o5b6007kbogyogsos5la', 3, 4, NULL, '2026-11-01T20:12:35.684Z', '2026-11-01T20:12:35.684Z'),
(E'cmvy9o5b8007wbogyjmepmjrf', E'thanking-god', E'Thanking God', E'cmvy9o5b6007kbogyogsos5la', 3, 5, NULL, '2026-11-01T20:12:35.684Z', '2026-11-01T20:12:35.684Z'),
(E'cmvy9o5b90082bogym3iq1msw', E'greetings-and-names', E'Greetings and Names', E'cmvy9o5b90080bogymvis8q9n', 1, 0, NULL, '2026-11-01T20:12:35.686Z', '2026-11-01T20:12:35.686Z'),
(E'cmvy9o5ba0084bogyjtwou7jg', E'rhymes-and-songs', E'Rhymes and Songs', E'cmvy9o5b90080bogymvis8q9n', 1, 1, NULL, '2026-11-01T20:12:35.686Z', '2026-11-01T20:12:35.686Z'),
(E'cmvy9o5ba0086bogy6dyum1vf', E'naming-things-around-us', E'Naming Things Around Us', E'cmvy9o5b90080bogymvis8q9n', 1, 2, NULL, '2026-11-01T20:12:35.686Z', '2026-11-01T20:12:35.686Z'),
(E'cmvy9o5ba0088bogy3t1irtza', E'listening-to-stories', E'Listening to Stories', E'cmvy9o5b90080bogymvis8q9n', 2, 3, NULL, '2026-11-01T20:12:35.687Z', '2026-11-01T20:12:35.687Z'),
(E'cmvy9o5bb008abogy1zarb983', E'colours', E'Colours', E'cmvy9o5b90080bogymvis8q9n', 2, 4, NULL, '2026-11-01T20:12:35.687Z', '2026-11-01T20:12:35.687Z'),
(E'cmvy9o5bd008cbogycyvx7ny7', E'parts-of-the-body', E'Parts of the Body', E'cmvy9o5b90080bogymvis8q9n', 2, 5, NULL, '2026-11-01T20:12:35.689Z', '2026-11-01T20:12:35.689Z'),
(E'cmvy9o5bd008ebogyyj0ijdbr', E'animals-and-their-sounds', E'Animals and Their Sounds', E'cmvy9o5b90080bogymvis8q9n', 3, 6, NULL, '2026-11-01T20:12:35.690Z', '2026-11-01T20:12:35.690Z'),
(E'cmvy9o5bd008gbogymorclmq4', E'family-words', E'Family Words', E'cmvy9o5b90080bogymvis8q9n', 3, 7, NULL, '2026-11-01T20:12:35.690Z', '2026-11-01T20:12:35.690Z'),
(E'cmvy9o5be008ibogycnxrwc4h', E'action-words', E'Action Words', E'cmvy9o5b90080bogymvis8q9n', 3, 8, NULL, '2026-11-01T20:12:35.690Z', '2026-11-01T20:12:35.690Z'),
(E'cmvy9o5bf008mbogy3v3lgeal', E'sorting-and-matching', E'Sorting and Matching', E'cmvy9o5be008kbogy6a21ec64', 1, 0, NULL, '2026-11-01T20:12:35.691Z', '2026-11-01T20:12:35.691Z'),
(E'cmvy9o5bf008obogy5agbz1c5', E'counting-1-to-10', E'Counting 1 to 10', E'cmvy9o5be008kbogy6a21ec64', 1, 1, NULL, '2026-11-01T20:12:35.691Z', '2026-11-01T20:12:35.691Z'),
(E'cmvy9o5bf008qbogyz41mqb7e', E'shapes-around-us', E'Shapes Around Us', E'cmvy9o5be008kbogy6a21ec64', 1, 2, NULL, '2026-11-01T20:12:35.692Z', '2026-11-01T20:12:35.692Z'),
(E'cmvy9o5bg008sbogy2l6zpazw', E'big-and-small', E'Big and Small', E'cmvy9o5be008kbogy6a21ec64', 2, 3, NULL, '2026-11-01T20:12:35.692Z', '2026-11-01T20:12:35.692Z'),
(E'cmvy9o5bg008ubogyf8ez31ez', E'patterns', E'Patterns', E'cmvy9o5be008kbogy6a21ec64', 2, 4, NULL, '2026-11-01T20:12:35.692Z', '2026-11-01T20:12:35.692Z'),
(E'cmvy9o5bg008wbogybmvbxysp', E'number-writing', E'Number Writing', E'cmvy9o5be008kbogy6a21ec64', 2, 5, NULL, '2026-11-01T20:12:35.693Z', '2026-11-01T20:12:35.693Z'),
(E'cmvy9o5bh008ybogy5tg0bxe2', E'more-and-less', E'More and Less', E'cmvy9o5be008kbogy6a21ec64', 3, 6, NULL, '2026-11-01T20:12:35.693Z', '2026-11-01T20:12:35.693Z'),
(E'cmvy9o5bh0090bogyu5by3hby', E'counting-to-20', E'Counting to 20', E'cmvy9o5be008kbogy6a21ec64', 3, 7, NULL, '2026-11-01T20:12:35.693Z', '2026-11-01T20:12:35.693Z'),
(E'cmvy9o5bh0092bogyc9mqczpo', E'simple-addition', E'Simple Addition', E'cmvy9o5be008kbogy6a21ec64', 3, 8, NULL, '2026-11-01T20:12:35.694Z', '2026-11-01T20:12:35.694Z'),
(E'cmvy9o5bi0096bogy4a2xojd6', E'picture-reading', E'Picture Reading', E'cmvy9o5bi0094bogydnwdniyw', 1, 0, NULL, '2026-11-01T20:12:35.694Z', '2026-11-01T20:12:35.694Z'),
(E'cmvy9o5bi0098bogy8nr3pj2v', E'letter-sounds-a-m', E'Letter Sounds a–m', E'cmvy9o5bi0094bogydnwdniyw', 1, 1, NULL, '2026-11-01T20:12:35.695Z', '2026-11-01T20:12:35.695Z'),
(E'cmvy9o5bj009abogyzxwu1u8c', E'letter-sounds-n-z', E'Letter Sounds n–z', E'cmvy9o5bi0094bogydnwdniyw', 2, 2, NULL, '2026-11-01T20:12:35.695Z', '2026-11-01T20:12:35.695Z'),
(E'cmvy9o5bj009cbogyl8z0wzqe', E'two-letter-words', E'Two-letter Words', E'cmvy9o5bi0094bogydnwdniyw', 2, 3, NULL, '2026-11-01T20:12:35.696Z', '2026-11-01T20:12:35.696Z'),
(E'cmvy9o5bk009ebogyxgl6rjov', E'three-letter-words', E'Three-letter Words', E'cmvy9o5bi0094bogydnwdniyw', 3, 4, NULL, '2026-11-01T20:12:35.696Z', '2026-11-01T20:12:35.696Z'),
(E'cmvy9o5bk009gbogyhy661hry', E'simple-sentences', E'Simple Sentences', E'cmvy9o5bi0094bogydnwdniyw', 3, 5, NULL, '2026-11-01T20:12:35.696Z', '2026-11-01T20:12:35.696Z'),
(E'cmvy9o5bk009kbogypup2bdhk', E'scribbling-and-patterns', E'Scribbling and Patterns', E'cmvy9o5bk009ibogylit0hl1o', 1, 0, NULL, '2026-11-01T20:12:35.697Z', '2026-11-01T20:12:35.697Z'),
(E'cmvy9o5bl009mbogyhu8bh85c', E'tracing-lines-and-curves', E'Tracing Lines and Curves', E'cmvy9o5bk009ibogylit0hl1o', 1, 1, NULL, '2026-11-01T20:12:35.697Z', '2026-11-01T20:12:35.697Z'),
(E'cmvy9o5bl009obogyta7lns9n', E'writing-letters', E'Writing Letters', E'cmvy9o5bk009ibogylit0hl1o', 2, 2, NULL, '2026-11-01T20:12:35.697Z', '2026-11-01T20:12:35.697Z'),
(E'cmvy9o5bl009qbogyy3v4gqdj', E'writing-numbers', E'Writing Numbers', E'cmvy9o5bk009ibogylit0hl1o', 2, 3, NULL, '2026-11-01T20:12:35.698Z', '2026-11-01T20:12:35.698Z'),
(E'cmvy9o5bm009sbogy5ex5bufq', E'writing-my-name', E'Writing My Name', E'cmvy9o5bk009ibogylit0hl1o', 3, 4, NULL, '2026-11-01T20:12:35.698Z', '2026-11-01T20:12:35.698Z'),
(E'cmvy9o5bm009ubogyll0tyl92', E'copying-words', E'Copying Words', E'cmvy9o5bk009ibogylit0hl1o', 3, 5, NULL, '2026-11-01T20:12:35.698Z', '2026-11-01T20:12:35.698Z'),
(E'cmvy9o5bm009ybogy5azs9f5r', E'washing-hands', E'Washing Hands', E'cmvy9o5bm009wbogypqbmxsnt', 1, 0, NULL, '2026-11-01T20:12:35.699Z', '2026-11-01T20:12:35.699Z'),
(E'cmvy9o5bn00a0bogy5fpudwhr', E'brushing-teeth', E'Brushing Teeth', E'cmvy9o5bm009wbogypqbmxsnt', 1, 1, NULL, '2026-11-01T20:12:35.699Z', '2026-11-01T20:12:35.699Z'),
(E'cmvy9o5bn00a2bogyk8tdzygo', E'healthy-foods', E'Healthy Foods', E'cmvy9o5bm009wbogypqbmxsnt', 2, 2, NULL, '2026-11-01T20:12:35.700Z', '2026-11-01T20:12:35.700Z'),
(E'cmvy9o5bn00a4bogy3b4topm2', E'keeping-clean', E'Keeping Clean', E'cmvy9o5bm009wbogypqbmxsnt', 2, 3, NULL, '2026-11-01T20:12:35.700Z', '2026-11-01T20:12:35.700Z'),
(E'cmvy9o5bo00a6bogy0d71mbvu', E'safety-at-home', E'Safety at Home', E'cmvy9o5bm009wbogypqbmxsnt', 3, 4, NULL, '2026-11-01T20:12:35.700Z', '2026-11-01T20:12:35.700Z'),
(E'cmvy9o5bo00a8bogybw1r0xmp', E'safety-at-school', E'Safety at School', E'cmvy9o5bm009wbogypqbmxsnt', 3, 5, NULL, '2026-11-01T20:12:35.700Z', '2026-11-01T20:12:35.700Z'),
(E'cmvy9o5bp00acbogyhd0lu0od', E'myself', E'Myself', E'cmvy9o5bo00aabogyf315dgku', 1, 0, NULL, '2026-11-01T20:12:35.701Z', '2026-11-01T20:12:35.701Z'),
(E'cmvy9o5bp00aebogytgowhdpz', E'my-family', E'My Family', E'cmvy9o5bo00aabogyf315dgku', 1, 1, NULL, '2026-11-01T20:12:35.701Z', '2026-11-01T20:12:35.701Z'),
(E'cmvy9o5bp00agbogy5ydqn3yv', E'my-friends', E'My Friends', E'cmvy9o5bo00aabogyf315dgku', 2, 2, NULL, '2026-11-01T20:12:35.702Z', '2026-11-01T20:12:35.702Z'),
(E'cmvy9o5bq00aibogyun3zmj3d', E'good-manners', E'Good Manners', E'cmvy9o5bo00aabogyf315dgku', 2, 3, NULL, '2026-11-01T20:12:35.702Z', '2026-11-01T20:12:35.702Z'),
(E'cmvy9o5bq00akbogy3ylhm2a9', E'people-who-help-us', E'People Who Help Us', E'cmvy9o5bo00aabogyf315dgku', 3, 4, NULL, '2026-11-01T20:12:35.702Z', '2026-11-01T20:12:35.702Z'),
(E'cmvy9o5br00ambogy5p69u48n', E'our-school', E'Our School', E'cmvy9o5bo00aabogyf315dgku', 3, 5, NULL, '2026-11-01T20:12:35.703Z', '2026-11-01T20:12:35.703Z'),
(E'cmvy9o5bt00aqbogyrkd53v7a', E'greetings', E'Greetings', E'cmvy9o5br00aobogymwmr6xfn', 1, 0, NULL, '2026-11-01T20:12:35.706Z', '2026-11-01T20:12:35.706Z'),
(E'cmvy9o5bu00asbogyuwod6wrl', E'naming-objects', E'Naming Objects', E'cmvy9o5br00aobogymwmr6xfn', 1, 1, NULL, '2026-11-01T20:12:35.706Z', '2026-11-01T20:12:35.706Z'),
(E'cmvy9o5bu00aubogyy7bguqf6', E'colours-and-shapes', E'Colours and Shapes', E'cmvy9o5br00aobogymwmr6xfn', 2, 2, NULL, '2026-11-01T20:12:35.707Z', '2026-11-01T20:12:35.707Z'),
(E'cmvy9o5bv00awbogy31khf2fp', E'numbers-in-english', E'Numbers in English', E'cmvy9o5br00aobogymwmr6xfn', 2, 3, NULL, '2026-11-01T20:12:35.707Z', '2026-11-01T20:12:35.707Z'),
(E'cmvy9o5bv00aybogyn9i49agw', E'simple-commands', E'Simple Commands', E'cmvy9o5br00aobogymwmr6xfn', 3, 4, NULL, '2026-11-01T20:12:35.708Z', '2026-11-01T20:12:35.708Z'),
(E'cmvy9o5bv00b0bogyeata9njw', E'my-body', E'My Body', E'cmvy9o5br00aobogymwmr6xfn', 3, 5, NULL, '2026-11-01T20:12:35.708Z', '2026-11-01T20:12:35.708Z'),
(E'cmvy9o5bw00b4bogykacb121f', E'weather', E'Weather', E'cmvy9o5bw00b2bogypdxs6oz8', 1, 0, NULL, '2026-11-01T20:12:35.709Z', '2026-11-01T20:12:35.709Z'),
(E'cmvy9o5bw00b6bogy2a0vap0g', E'domestic-animals', E'Domestic Animals', E'cmvy9o5bw00b2bogypdxs6oz8', 1, 1, NULL, '2026-11-01T20:12:35.709Z', '2026-11-01T20:12:35.709Z'),
(E'cmvy9o5bx00b8bogy71kby4bh', E'wild-animals', E'Wild Animals', E'cmvy9o5bw00b2bogypdxs6oz8', 2, 2, NULL, '2026-11-01T20:12:35.709Z', '2026-11-01T20:12:35.709Z'),
(E'cmvy9o5bx00babogyxwbfds1a', E'plants-around-us', E'Plants Around Us', E'cmvy9o5bw00b2bogypdxs6oz8', 2, 3, NULL, '2026-11-01T20:12:35.710Z', '2026-11-01T20:12:35.710Z'),
(E'cmvy9o5bx00bcbogykinw0h63', E'means-of-transport', E'Means of Transport', E'cmvy9o5bw00b2bogypdxs6oz8', 3, 4, NULL, '2026-11-01T20:12:35.710Z', '2026-11-01T20:12:35.710Z'),
(E'cmvy9o5by00bebogyv81rxlcq', E'our-country-uganda', E'Our Country Uganda', E'cmvy9o5bw00b2bogypdxs6oz8', 3, 5, NULL, '2026-11-01T20:12:35.710Z', '2026-11-01T20:12:35.710Z'),
(E'cmvy9o5by00bibogyo4oilbuu', E'god-made-me', E'God Made Me', E'cmvy9o5by00bgbogy6dw2pim2', 1, 0, NULL, '2026-11-01T20:12:35.711Z', '2026-11-01T20:12:35.711Z'),
(E'cmvy9o5bz00bkbogyq2n6p1pw', E'prayers', E'Prayers', E'cmvy9o5by00bgbogy6dw2pim2', 1, 1, NULL, '2026-11-01T20:12:35.711Z', '2026-11-01T20:12:35.711Z'),
(E'cmvy9o5bz00bmbogyko5lnli2', E'bible-quran-stories', E'Bible / Quran Stories', E'cmvy9o5by00bgbogy6dw2pim2', 2, 2, NULL, '2026-11-01T20:12:35.712Z', '2026-11-01T20:12:35.712Z'),
(E'cmvy9o5bz00bobogyg7qp5ji7', E'being-kind', E'Being Kind', E'cmvy9o5by00bgbogy6dw2pim2', 2, 3, NULL, '2026-11-01T20:12:35.712Z', '2026-11-01T20:12:35.712Z'),
(E'cmvy9o5c000bqbogyijojo45k', E'sharing', E'Sharing', E'cmvy9o5by00bgbogy6dw2pim2', 3, 4, NULL, '2026-11-01T20:12:35.712Z', '2026-11-01T20:12:35.712Z'),
(E'cmvy9o5c000bsbogyef9updpy', E'thanking-god', E'Thanking God', E'cmvy9o5by00bgbogy6dw2pim2', 3, 5, NULL, '2026-11-01T20:12:35.713Z', '2026-11-01T20:12:35.713Z'),
(E'cmvy9o5c200bybogy4z8z86s8', E'theme-1-our-school', E'Theme 1: Our School', E'cmvy9o5c100bwbogyrtqn7cf4', 1, 0, NULL, '2026-11-01T20:12:35.714Z', '2026-11-01T20:12:35.714Z'),
(E'cmvy9o5c200c0bogywqzi30du', E'theme-2-our-home', E'Theme 2: Our Home', E'cmvy9o5c100bwbogyrtqn7cf4', 1, 1, NULL, '2026-11-01T20:12:35.714Z', '2026-11-01T20:12:35.714Z'),
(E'cmvy9o5c200c2bogymkfksota', E'theme-3-our-community', E'Theme 3: Our Community', E'cmvy9o5c100bwbogyrtqn7cf4', 1, 2, NULL, '2026-11-01T20:12:35.715Z', '2026-11-01T20:12:35.715Z'),
(E'cmvy9o5c300c4bogy6bh7jg0n', E'theme-4-the-human-body-and-health', E'Theme 4: The Human Body and Health', E'cmvy9o5c100bwbogyrtqn7cf4', 1, 3, NULL, '2026-11-01T20:12:35.715Z', '2026-11-01T20:12:35.715Z'),
(E'cmvy9o5c300c6bogy7bh1u5ap', E'theme-5-weather', E'Theme 5: Weather', E'cmvy9o5c100bwbogyrtqn7cf4', 2, 4, NULL, '2026-11-01T20:12:35.715Z', '2026-11-01T20:12:35.715Z'),
(E'cmvy9o5c300c8bogyx7abmskx', E'theme-6-accidents-and-safety', E'Theme 6: Accidents and Safety', E'cmvy9o5c100bwbogyrtqn7cf4', 2, 5, NULL, '2026-11-01T20:12:35.716Z', '2026-11-01T20:12:35.716Z'),
(E'cmvy9o5c400cabogyb6ft1uuv', E'theme-7-living-together', E'Theme 7: Living Together', E'cmvy9o5c100bwbogyrtqn7cf4', 2, 6, NULL, '2026-11-01T20:12:35.716Z', '2026-11-01T20:12:35.716Z'),
(E'cmvy9o5c400ccbogyuksn4mdl', E'theme-8-food-and-nutrition', E'Theme 8: Food and Nutrition', E'cmvy9o5c100bwbogyrtqn7cf4', 2, 7, NULL, '2026-11-01T20:12:35.716Z', '2026-11-01T20:12:35.716Z'),
(E'cmvy9o5c400cebogyxljtro0x', E'theme-9-transport-in-our-community', E'Theme 9: Transport in Our Community', E'cmvy9o5c100bwbogyrtqn7cf4', 3, 8, NULL, '2026-11-01T20:12:35.717Z', '2026-11-01T20:12:35.717Z'),
(E'cmvy9o5c400cgbogyd3uq0cu8', E'theme-10-things-we-make', E'Theme 10: Things We Make', E'cmvy9o5c100bwbogyrtqn7cf4', 3, 9, NULL, '2026-11-01T20:12:35.717Z', '2026-11-01T20:12:35.717Z'),
(E'cmvy9o5c500cibogyfw5b5j2o', E'theme-11-our-environment', E'Theme 11: Our Environment', E'cmvy9o5c100bwbogyrtqn7cf4', 3, 10, NULL, '2026-11-01T20:12:35.717Z', '2026-11-01T20:12:35.717Z'),
(E'cmvy9o5c500ckbogyjjhfip1c', E'theme-12-peace-and-security', E'Theme 12: Peace and Security', E'cmvy9o5c100bwbogyrtqn7cf4', 3, 11, NULL, '2026-11-01T20:12:35.718Z', '2026-11-01T20:12:35.718Z'),
(E'cmvy9o5c600cobogy6y4ss1bo', E'letter-sounds-and-blends', E'Letter Sounds and Blends', E'cmvy9o5c500cmbogyyxjlfhzz', 1, 0, NULL, '2026-11-01T20:12:35.718Z', '2026-11-01T20:12:35.718Z'),
(E'cmvy9o5c600cqbogynyqazzw0', E'reading-words-and-sentences', E'Reading Words and Sentences', E'cmvy9o5c500cmbogyyxjlfhzz', 1, 1, NULL, '2026-11-01T20:12:35.718Z', '2026-11-01T20:12:35.718Z'),
(E'cmvy9o5c600csbogy7629vhjz', E'reading-short-passages', E'Reading Short Passages', E'cmvy9o5c500cmbogyyxjlfhzz', 1, 2, NULL, '2026-11-01T20:12:35.719Z', '2026-11-01T20:12:35.719Z'),
(E'cmvy9o5c700cubogy8qf9v157', E'handwriting', E'Handwriting', E'cmvy9o5c500cmbogyyxjlfhzz', 2, 3, NULL, '2026-11-01T20:12:35.719Z', '2026-11-01T20:12:35.719Z'),
(E'cmvy9o5c700cwbogyf1ggg7vk', E'spelling', E'Spelling', E'cmvy9o5c500cmbogyyxjlfhzz', 2, 4, NULL, '2026-11-01T20:12:35.720Z', '2026-11-01T20:12:35.720Z'),
(E'cmvy9o5c700cybogy4smvf7rn', E'dictation', E'Dictation', E'cmvy9o5c500cmbogyyxjlfhzz', 2, 5, NULL, '2026-11-01T20:12:35.720Z', '2026-11-01T20:12:35.720Z'),
(E'cmvy9o5c800d0bogyms2hfmnp', E'writing-sentences', E'Writing Sentences', E'cmvy9o5c500cmbogyyxjlfhzz', 3, 6, NULL, '2026-11-01T20:12:35.720Z', '2026-11-01T20:12:35.720Z'),
(E'cmvy9o5c800d2bogyjdwh11ty', E'reading-comprehension', E'Reading Comprehension', E'cmvy9o5c500cmbogyyxjlfhzz', 3, 7, NULL, '2026-11-01T20:12:35.721Z', '2026-11-01T20:12:35.721Z'),
(E'cmvy9o5ca00d4bogyvs78r3d6', E'writing-short-stories', E'Writing Short Stories', E'cmvy9o5c500cmbogyyxjlfhzz', 3, 8, NULL, '2026-11-01T20:12:35.723Z', '2026-11-01T20:12:35.723Z'),
(E'cmvy9o5cc00d8bogyzu5s4ev8', E'greetings-and-introductions', E'Greetings and Introductions', E'cmvy9o5cb00d6bogyl7x6p8v4', 1, 0, NULL, '2026-11-01T20:12:35.724Z', '2026-11-01T20:12:35.724Z'),
(E'cmvy9o5cc00dabogyfdhunexs', E'alphabet-and-letter-sounds', E'Alphabet and Letter Sounds', E'cmvy9o5cb00d6bogyl7x6p8v4', 1, 1, NULL, '2026-11-01T20:12:35.724Z', '2026-11-01T20:12:35.724Z'),
(E'cmvy9o5cc00dcbogyf1kppo5r', E'naming-words-nouns', E'Naming Words (Nouns)', E'cmvy9o5cb00d6bogyl7x6p8v4', 1, 2, NULL, '2026-11-01T20:12:35.725Z', '2026-11-01T20:12:35.725Z'),
(E'cmvy9o5cd00debogyj0tmhh5i', E'colours-and-shapes', E'Colours and Shapes', E'cmvy9o5cb00d6bogyl7x6p8v4', 1, 3, NULL, '2026-11-01T20:12:35.725Z', '2026-11-01T20:12:35.725Z'),
(E'cmvy9o5cd00dgbogywwqsjw1h', E'my-body', E'My Body', E'cmvy9o5cb00d6bogyl7x6p8v4', 2, 4, NULL, '2026-11-01T20:12:35.726Z', '2026-11-01T20:12:35.726Z'),
(E'cmvy9o5cd00dibogy8xmnq75r', E'action-words', E'Action Words', E'cmvy9o5cb00d6bogyl7x6p8v4', 2, 5, NULL, '2026-11-01T20:12:35.726Z', '2026-11-01T20:12:35.726Z'),
(E'cmvy9o5ce00dkbogy063fctbd', E'simple-sentences', E'Simple Sentences', E'cmvy9o5cb00d6bogyl7x6p8v4', 2, 6, NULL, '2026-11-01T20:12:35.727Z', '2026-11-01T20:12:35.727Z'),
(E'cmvy9o5cf00dmbogyb9g3emug', E'describing-words', E'Describing Words', E'cmvy9o5cb00d6bogyl7x6p8v4', 2, 7, NULL, '2026-11-01T20:12:35.727Z', '2026-11-01T20:12:35.727Z'),
(E'cmvy9o5cf00dobogy52xsa0wo', E'plurals-adding-s', E'Plurals: Adding -s', E'cmvy9o5cb00d6bogyl7x6p8v4', 3, 8, NULL, '2026-11-01T20:12:35.727Z', '2026-11-01T20:12:35.727Z'),
(E'cmvy9o5cf00dqbogypm4vkmyn', E'reading-short-stories', E'Reading Short Stories', E'cmvy9o5cb00d6bogyl7x6p8v4', 3, 9, NULL, '2026-11-01T20:12:35.728Z', '2026-11-01T20:12:35.728Z'),
(E'cmvy9o5cg00dsbogywb1m5rs2', E'days-and-months', E'Days and Months', E'cmvy9o5cb00d6bogyl7x6p8v4', 3, 10, NULL, '2026-11-01T20:12:35.728Z', '2026-11-01T20:12:35.728Z'),
(E'cmvy9o5cg00dubogyx8mmyomm', E'picture-composition', E'Picture Composition', E'cmvy9o5cb00d6bogyl7x6p8v4', 3, 11, NULL, '2026-11-01T20:12:35.729Z', '2026-11-01T20:12:35.729Z'),
(E'cmvy9o5ch00dybogybhtgyh2k', E'sorting-and-matching', E'Sorting and Matching', E'cmvy9o5cg00dwbogyh9lmye1w', 1, 0, NULL, '2026-11-01T20:12:35.729Z', '2026-11-01T20:12:35.729Z'),
(E'cmvy9o5ch00e0bogy83340a1m', E'numbers-1-20', E'Numbers 1–20', E'cmvy9o5cg00dwbogyh9lmye1w', 1, 1, NULL, '2026-11-01T20:12:35.730Z', '2026-11-01T20:12:35.730Z'),
(E'cmvy9o5ci00e2bogy1n4gwjy3', E'addition-within-20', E'Addition within 20', E'cmvy9o5cg00dwbogyh9lmye1w', 1, 2, NULL, '2026-11-01T20:12:35.730Z', '2026-11-01T20:12:35.730Z'),
(E'cmvy9o5ci00e4bogyjvguf1p4', E'subtraction-within-20', E'Subtraction within 20', E'cmvy9o5cg00dwbogyh9lmye1w', 1, 3, NULL, '2026-11-01T20:12:35.730Z', '2026-11-01T20:12:35.730Z'),
(E'cmvy9o5ci00e6bogyibttv841', E'shapes', E'Shapes', E'cmvy9o5cg00dwbogyh9lmye1w', 2, 4, NULL, '2026-11-01T20:12:35.731Z', '2026-11-01T20:12:35.731Z'),
(E'cmvy9o5ci00e8bogyzih5732n', E'numbers-21-99', E'Numbers 21–99', E'cmvy9o5cg00dwbogyh9lmye1w', 2, 5, NULL, '2026-11-01T20:12:35.731Z', '2026-11-01T20:12:35.731Z'),
(E'cmvy9o5cj00eabogy430hv27d', E'measurement-length-and-mass', E'Measurement: Length and Mass', E'cmvy9o5cg00dwbogyh9lmye1w', 2, 6, NULL, '2026-11-01T20:12:35.731Z', '2026-11-01T20:12:35.731Z'),
(E'cmvy9o5cj00ecbogyj06g68ws', E'time-days-of-the-week', E'Time: Days of the Week', E'cmvy9o5cg00dwbogyh9lmye1w', 2, 7, NULL, '2026-11-01T20:12:35.732Z', '2026-11-01T20:12:35.732Z'),
(E'cmvy9o5cj00eebogyms2dzhkv', E'money-coins', E'Money: Coins', E'cmvy9o5cg00dwbogyh9lmye1w', 3, 8, NULL, '2026-11-01T20:12:35.732Z', '2026-11-01T20:12:35.732Z'),
(E'cmvy9o5ck00egbogy9zigzchf', E'patterns', E'Patterns', E'cmvy9o5cg00dwbogyh9lmye1w', 3, 9, NULL, '2026-11-01T20:12:35.732Z', '2026-11-01T20:12:35.732Z'),
(E'cmvy9o5ck00eibogyg3a3safw', E'fractions-halves', E'Fractions: Halves', E'cmvy9o5cg00dwbogyh9lmye1w', 3, 10, NULL, '2026-11-01T20:12:35.732Z', '2026-11-01T20:12:35.732Z'),
(E'cmvy9o5ck00ekbogyidn7cbfh', E'data-pictographs', E'Data: Pictographs', E'cmvy9o5cg00dwbogyh9lmye1w', 3, 11, NULL, '2026-11-01T20:12:35.733Z', '2026-11-01T20:12:35.733Z'),
(E'cmvy9o5cl00eobogyprcmdt1e', E'creation', E'Creation', E'cmvy9o5cl00embogyurkrxlpw', 1, 0, NULL, '2026-11-01T20:12:35.734Z', '2026-11-01T20:12:35.734Z'),
(E'cmvy9o5cl00eqbogynfch210x', E'my-family-and-god', E'My Family and God', E'cmvy9o5cl00embogyurkrxlpw', 1, 1, NULL, '2026-11-01T20:12:35.734Z', '2026-11-01T20:12:35.734Z'),
(E'cmvy9o5cm00esbogyazxaeky9', E'prayer-and-worship', E'Prayer and Worship', E'cmvy9o5cl00embogyurkrxlpw', 2, 2, NULL, '2026-11-01T20:12:35.734Z', '2026-11-01T20:12:35.734Z'),
(E'cmvy9o5cm00eubogyyufvonpt', E'stories-of-faith', E'Stories of Faith', E'cmvy9o5cl00embogyurkrxlpw', 2, 3, NULL, '2026-11-01T20:12:35.734Z', '2026-11-01T20:12:35.734Z'),
(E'cmvy9o5cm00ewbogy0h4rdjvw', E'caring-for-others', E'Caring for Others', E'cmvy9o5cl00embogyurkrxlpw', 3, 4, NULL, '2026-11-01T20:12:35.735Z', '2026-11-01T20:12:35.735Z'),
(E'cmvy9o5cn00eybogy490659f1', E'festivals-and-celebrations', E'Festivals and Celebrations', E'cmvy9o5cl00embogyurkrxlpw', 3, 5, NULL, '2026-11-01T20:12:35.735Z', '2026-11-01T20:12:35.735Z'),
(E'cmvy9o5cn00f2bogyyasiq08r', E'greetings', E'Greetings', E'cmvy9o5cn00f0bogygo0rd9sh', 1, 0, NULL, '2026-11-01T20:12:35.736Z', '2026-11-01T20:12:35.736Z'),
(E'cmvy9o5co00f4bogysqq68por', E'naming-things', E'Naming Things', E'cmvy9o5cn00f0bogygo0rd9sh', 1, 1, NULL, '2026-11-01T20:12:35.736Z', '2026-11-01T20:12:35.736Z'),
(E'cmvy9o5co00f6bogy4aw2xkv9', E'reading-words', E'Reading Words', E'cmvy9o5cn00f0bogygo0rd9sh', 2, 2, NULL, '2026-11-01T20:12:35.737Z', '2026-11-01T20:12:35.737Z'),
(E'cmvy9o5cp00f8bogy1rd7d19j', E'writing-sentences', E'Writing Sentences', E'cmvy9o5cn00f0bogygo0rd9sh', 2, 3, NULL, '2026-11-01T20:12:35.737Z', '2026-11-01T20:12:35.737Z'),
(E'cmvy9o5cp00fabogygmikycqr', E'stories-and-proverbs', E'Stories and Proverbs', E'cmvy9o5cn00f0bogygo0rd9sh', 3, 4, NULL, '2026-11-01T20:12:35.737Z', '2026-11-01T20:12:35.737Z'),
(E'cmvy9o5cr00fcbogy7r3hsoqi', E'songs-and-rhymes', E'Songs and Rhymes', E'cmvy9o5cn00f0bogygo0rd9sh', 3, 5, NULL, '2026-11-01T20:12:35.739Z', '2026-11-01T20:12:35.739Z'),
(E'cmvy9o5cs00fgbogys1r9ocrf', E'parts-of-a-computer', E'Parts of a Computer', E'cmvy9o5cs00febogyo3jxrns1', 1, 0, NULL, '2026-11-01T20:12:35.741Z', '2026-11-01T20:12:35.741Z'),
(E'cmvy9o5cs00fibogyld5r7cxm', E'using-a-mouse-and-keyboard', E'Using a Mouse and Keyboard', E'cmvy9o5cs00febogyo3jxrns1', 1, 1, NULL, '2026-11-01T20:12:35.741Z', '2026-11-01T20:12:35.741Z'),
(E'cmvy9o5ct00fkbogyn4hx0z8r', E'drawing-on-a-computer', E'Drawing on a Computer', E'cmvy9o5cs00febogyo3jxrns1', 2, 2, NULL, '2026-11-01T20:12:35.741Z', '2026-11-01T20:12:35.741Z'),
(E'cmvy9o5ct00fmbogyj37jnw2n', E'keeping-devices-safe', E'Keeping Devices Safe', E'cmvy9o5cs00febogyo3jxrns1', 3, 3, NULL, '2026-11-01T20:12:35.742Z', '2026-11-01T20:12:35.742Z'),
(E'cmvy9o5cu00fqbogycu7o6eu8', E'telling-news', E'Telling News', E'cmvy9o5ct00fobogydz2hq3jr', 1, 0, NULL, '2026-11-01T20:12:35.742Z', '2026-11-01T20:12:35.742Z'),
(E'cmvy9o5cu00fsbogy2n7dzzyf', E'riddles', E'Riddles', E'cmvy9o5ct00fobogydz2hq3jr', 1, 1, NULL, '2026-11-01T20:12:35.743Z', '2026-11-01T20:12:35.743Z'),
(E'cmvy9o5cv00fubogyi7t6c17t', E'rhymes-and-songs', E'Rhymes and Songs', E'cmvy9o5ct00fobogydz2hq3jr', 2, 2, NULL, '2026-11-01T20:12:35.743Z', '2026-11-01T20:12:35.743Z'),
(E'cmvy9o5cv00fwbogyei7bulas', E'folk-stories', E'Folk Stories', E'cmvy9o5ct00fobogydz2hq3jr', 3, 3, NULL, '2026-11-01T20:12:35.743Z', '2026-11-01T20:12:35.743Z'),
(E'cmvy9o5cw00g2bogyunfcv68w', E'theme-1-our-school-and-neighbourhood', E'Theme 1: Our School and Neighbourhood', E'cmvy9o5cw00g0bogya4oaoqqx', 1, 0, NULL, '2026-11-01T20:12:35.745Z', '2026-11-01T20:12:35.745Z'),
(E'cmvy9o5cx00g4bogy8nc4mriz', E'theme-2-our-home-and-community', E'Theme 2: Our Home and Community', E'cmvy9o5cw00g0bogya4oaoqqx', 1, 1, NULL, '2026-11-01T20:12:35.745Z', '2026-11-01T20:12:35.745Z'),
(E'cmvy9o5cx00g6bogyw32gyh6g', E'theme-3-our-community', E'Theme 3: Our Community', E'cmvy9o5cw00g0bogya4oaoqqx', 1, 2, NULL, '2026-11-01T20:12:35.746Z', '2026-11-01T20:12:35.746Z'),
(E'cmvy9o5cx00g8bogyv6mlt7cd', E'theme-4-the-human-body-and-health', E'Theme 4: The Human Body and Health', E'cmvy9o5cw00g0bogya4oaoqqx', 1, 3, NULL, '2026-11-01T20:12:35.746Z', '2026-11-01T20:12:35.746Z'),
(E'cmvy9o5cy00gabogyf5fne2r5', E'theme-5-weather', E'Theme 5: Weather', E'cmvy9o5cw00g0bogya4oaoqqx', 2, 4, NULL, '2026-11-01T20:12:35.746Z', '2026-11-01T20:12:35.746Z'),
(E'cmvy9o5cy00gcbogywokuvcps', E'theme-6-accidents-and-safety', E'Theme 6: Accidents and Safety', E'cmvy9o5cw00g0bogya4oaoqqx', 2, 5, NULL, '2026-11-01T20:12:35.746Z', '2026-11-01T20:12:35.746Z'),
(E'cmvy9o5cy00gebogyw8sy5cyw', E'theme-7-living-together', E'Theme 7: Living Together', E'cmvy9o5cw00g0bogya4oaoqqx', 2, 6, NULL, '2026-11-01T20:12:35.747Z', '2026-11-01T20:12:35.747Z'),
(E'cmvy9o5cy00ggbogy4aevmr70', E'theme-8-food-and-nutrition', E'Theme 8: Food and Nutrition', E'cmvy9o5cw00g0bogya4oaoqqx', 2, 7, NULL, '2026-11-01T20:12:35.747Z', '2026-11-01T20:12:35.747Z'),
(E'cmvy9o5cz00gibogy7jncx563', E'theme-9-transport-in-our-community', E'Theme 9: Transport in Our Community', E'cmvy9o5cw00g0bogya4oaoqqx', 3, 8, NULL, '2026-11-01T20:12:35.747Z', '2026-11-01T20:12:35.747Z'),
(E'cmvy9o5cz00gkbogyposrt4yi', E'theme-10-things-we-make', E'Theme 10: Things We Make', E'cmvy9o5cw00g0bogya4oaoqqx', 3, 9, NULL, '2026-11-01T20:12:35.747Z', '2026-11-01T20:12:35.747Z'),
(E'cmvy9o5cz00gmbogy2f2afs6r', E'theme-11-our-environment', E'Theme 11: Our Environment', E'cmvy9o5cw00g0bogya4oaoqqx', 3, 10, NULL, '2026-11-01T20:12:35.748Z', '2026-11-01T20:12:35.748Z'),
(E'cmvy9o5cz00gobogy97ur1bi1', E'theme-12-peace-and-security', E'Theme 12: Peace and Security', E'cmvy9o5cw00g0bogya4oaoqqx', 3, 11, NULL, '2026-11-01T20:12:35.748Z', '2026-11-01T20:12:35.748Z'),
(E'cmvy9o5d000gsbogyjiuha5gg', E'letter-sounds-and-blends', E'Letter Sounds and Blends', E'cmvy9o5d000gqbogyfpv05t7g', 1, 0, NULL, '2026-11-01T20:12:35.749Z', '2026-11-01T20:12:35.749Z'),
(E'cmvy9o5d100gubogyuic1msqm', E'reading-words-and-sentences', E'Reading Words and Sentences', E'cmvy9o5d000gqbogyfpv05t7g', 1, 1, NULL, '2026-11-01T20:12:35.749Z', '2026-11-01T20:12:35.749Z'),
(E'cmvy9o5d100gwbogyp5qo05kc', E'reading-short-passages', E'Reading Short Passages', E'cmvy9o5d000gqbogyfpv05t7g', 1, 2, NULL, '2026-11-01T20:12:35.749Z', '2026-11-01T20:12:35.749Z'),
(E'cmvy9o5d100gybogykujmg7si', E'handwriting', E'Handwriting', E'cmvy9o5d000gqbogyfpv05t7g', 2, 3, NULL, '2026-11-01T20:12:35.750Z', '2026-11-01T20:12:35.750Z'),
(E'cmvy9o5d100h0bogyf1qtnc8u', E'spelling', E'Spelling', E'cmvy9o5d000gqbogyfpv05t7g', 2, 4, NULL, '2026-11-01T20:12:35.750Z', '2026-11-01T20:12:35.750Z'),
(E'cmvy9o5d200h2bogyh3xiz0ux', E'dictation', E'Dictation', E'cmvy9o5d000gqbogyfpv05t7g', 2, 5, NULL, '2026-11-01T20:12:35.750Z', '2026-11-01T20:12:35.750Z'),
(E'cmvy9o5d200h4bogyenuht1k1', E'writing-sentences', E'Writing Sentences', E'cmvy9o5d000gqbogyfpv05t7g', 3, 6, NULL, '2026-11-01T20:12:35.751Z', '2026-11-01T20:12:35.751Z'),
(E'cmvy9o5d300h6bogyd00q4lv9', E'reading-comprehension', E'Reading Comprehension', E'cmvy9o5d000gqbogyfpv05t7g', 3, 7, NULL, '2026-11-01T20:12:35.751Z', '2026-11-01T20:12:35.751Z'),
(E'cmvy9o5d300h8bogy0hedzs03', E'writing-short-stories', E'Writing Short Stories', E'cmvy9o5d000gqbogyfpv05t7g', 3, 8, NULL, '2026-11-01T20:12:35.751Z', '2026-11-01T20:12:35.751Z'),
(E'cmvy9o5d400hcbogy13ojs1sx', E'nouns-common-and-proper', E'Nouns: Common and Proper', E'cmvy9o5d300habogyookpbn9c', 1, 0, NULL, '2026-11-01T20:12:35.752Z', '2026-11-01T20:12:35.752Z'),
(E'cmvy9o5d400hebogyl8l1klee', E'pronouns-i-you-he-she', E'Pronouns: I, You, He, She', E'cmvy9o5d300habogyookpbn9c', 1, 1, NULL, '2026-11-01T20:12:35.752Z', '2026-11-01T20:12:35.752Z'),
(E'cmvy9o5d500hgbogyuozzqref', E'verbs-present-tense', E'Verbs: Present Tense', E'cmvy9o5d300habogyookpbn9c', 1, 2, NULL, '2026-11-01T20:12:35.753Z', '2026-11-01T20:12:35.753Z'),
(E'cmvy9o5d500hibogy3n6gd008', E'verbs-past-tense', E'Verbs: Past Tense', E'cmvy9o5d300habogyookpbn9c', 1, 3, NULL, '2026-11-01T20:12:35.753Z', '2026-11-01T20:12:35.753Z'),
(E'cmvy9o5d500hkbogyb39tnjuo', E'adjectives', E'Adjectives', E'cmvy9o5d300habogyookpbn9c', 2, 4, NULL, '2026-11-01T20:12:35.754Z', '2026-11-01T20:12:35.754Z'),
(E'cmvy9o5d800hmbogycxqib99r', E'prepositions-in-on-under', E'Prepositions: in, on, under', E'cmvy9o5d300habogyookpbn9c', 2, 5, NULL, '2026-11-01T20:12:35.757Z', '2026-11-01T20:12:35.757Z'),
(E'cmvy9o5d900hobogyrefrjfik', E'opposites', E'Opposites', E'cmvy9o5d300habogyookpbn9c', 2, 6, NULL, '2026-11-01T20:12:35.757Z', '2026-11-01T20:12:35.757Z'),
(E'cmvy9o5d900hqbogy6b4xqw8b', E'plurals', E'Plurals', E'cmvy9o5d300habogyookpbn9c', 2, 7, NULL, '2026-11-01T20:12:35.758Z', '2026-11-01T20:12:35.758Z'),
(E'cmvy9o5da00hsbogy3r28tdpe', E'punctuation-capital-letters-and-full-stops', E'Punctuation: Capital Letters and Full Stops', E'cmvy9o5d300habogyookpbn9c', 3, 8, NULL, '2026-11-01T20:12:35.758Z', '2026-11-01T20:12:35.758Z'),
(E'cmvy9o5da00hubogyvnpepmpn', E'comprehension', E'Comprehension', E'cmvy9o5d300habogyookpbn9c', 3, 9, NULL, '2026-11-01T20:12:35.758Z', '2026-11-01T20:12:35.758Z'),
(E'cmvy9o5da00hwbogypjse6vqe', E'guided-composition', E'Guided Composition', E'cmvy9o5d300habogyookpbn9c', 3, 10, NULL, '2026-11-01T20:12:35.759Z', '2026-11-01T20:12:35.759Z'),
(E'cmvy9o5db00hybogysxm8mch7', E'rhymes-and-poems', E'Rhymes and Poems', E'cmvy9o5d300habogyookpbn9c', 3, 11, NULL, '2026-11-01T20:12:35.759Z', '2026-11-01T20:12:35.759Z'),
(E'cmvy9o5db00i2bogy6ds9pq9w', E'sets-and-sorting', E'Sets and Sorting', E'cmvy9o5db00i0bogyxud66mz1', 1, 0, NULL, '2026-11-01T20:12:35.760Z', '2026-11-01T20:12:35.760Z'),
(E'cmvy9o5dc00i4bogycnke2lz8', E'numbers-up-to-999', E'Numbers up to 999', E'cmvy9o5db00i0bogyxud66mz1', 1, 1, NULL, '2026-11-01T20:12:35.760Z', '2026-11-01T20:12:35.760Z'),
(E'cmvy9o5dc00i6bogyc57p8y3r', E'addition-with-carrying', E'Addition with Carrying', E'cmvy9o5db00i0bogyxud66mz1', 1, 2, NULL, '2026-11-01T20:12:35.760Z', '2026-11-01T20:12:35.760Z'),
(E'cmvy9o5dc00i8bogybmlnnme6', E'subtraction-with-borrowing', E'Subtraction with Borrowing', E'cmvy9o5db00i0bogyxud66mz1', 1, 3, NULL, '2026-11-01T20:12:35.761Z', '2026-11-01T20:12:35.761Z'),
(E'cmvy9o5dd00iabogyep2sxwch', E'multiplication-2-3-5-10', E'Multiplication: 2, 3, 5, 10', E'cmvy9o5db00i0bogyxud66mz1', 2, 4, NULL, '2026-11-01T20:12:35.761Z', '2026-11-01T20:12:35.761Z'),
(E'cmvy9o5dd00icbogy6ok9ci48', E'division-as-sharing', E'Division as Sharing', E'cmvy9o5db00i0bogyxud66mz1', 2, 5, NULL, '2026-11-01T20:12:35.761Z', '2026-11-01T20:12:35.761Z'),
(E'cmvy9o5dd00iebogy1cy547zl', E'fractions-halves-and-quarters', E'Fractions: Halves and Quarters', E'cmvy9o5db00i0bogyxud66mz1', 2, 6, NULL, '2026-11-01T20:12:35.762Z', '2026-11-01T20:12:35.762Z'),
(E'cmvy9o5de00igbogyjy1mc0ta', E'shapes-and-lines', E'Shapes and Lines', E'cmvy9o5db00i0bogyxud66mz1', 2, 7, NULL, '2026-11-01T20:12:35.762Z', '2026-11-01T20:12:35.762Z'),
(E'cmvy9o5de00iibogy3p3wzar8', E'measurement-length-mass-capacity', E'Measurement: Length, Mass, Capacity', E'cmvy9o5db00i0bogyxud66mz1', 3, 8, NULL, '2026-11-01T20:12:35.763Z', '2026-11-01T20:12:35.763Z'),
(E'cmvy9o5de00ikbogyb1trsyx5', E'time-clock-and-calendar', E'Time: Clock and Calendar', E'cmvy9o5db00i0bogyxud66mz1', 3, 9, NULL, '2026-11-01T20:12:35.763Z', '2026-11-01T20:12:35.763Z'),
(E'cmvy9o5df00imbogyy8zsoo91', E'money-shopping', E'Money: Shopping', E'cmvy9o5db00i0bogyxud66mz1', 3, 10, NULL, '2026-11-01T20:12:35.763Z', '2026-11-01T20:12:35.763Z'),
(E'cmvy9o5df00iobogyolsrwy7n', E'graphs-bar-graphs', E'Graphs: Bar Graphs', E'cmvy9o5db00i0bogyxud66mz1', 3, 11, NULL, '2026-11-01T20:12:35.764Z', '2026-11-01T20:12:35.764Z'),
(E'cmvy9o5dg00isbogyt76pofzi', E'creation', E'Creation', E'cmvy9o5dg00iqbogy75157zh5', 1, 0, NULL, '2026-11-01T20:12:35.765Z', '2026-11-01T20:12:35.765Z'),
(E'cmvy9o5dg00iubogytn8gug4h', E'my-family-and-god', E'My Family and God', E'cmvy9o5dg00iqbogy75157zh5', 1, 1, NULL, '2026-11-01T20:12:35.765Z', '2026-11-01T20:12:35.765Z'),
(E'cmvy9o5dh00iwbogyyyalejx7', E'prayer-and-worship', E'Prayer and Worship', E'cmvy9o5dg00iqbogy75157zh5', 2, 2, NULL, '2026-11-01T20:12:35.765Z', '2026-11-01T20:12:35.765Z'),
(E'cmvy9o5dh00iybogy2cclrzjt', E'stories-of-faith', E'Stories of Faith', E'cmvy9o5dg00iqbogy75157zh5', 2, 3, NULL, '2026-11-01T20:12:35.766Z', '2026-11-01T20:12:35.766Z'),
(E'cmvy9o5dh00j0bogy2wejoc4h', E'caring-for-others', E'Caring for Others', E'cmvy9o5dg00iqbogy75157zh5', 3, 4, NULL, '2026-11-01T20:12:35.766Z', '2026-11-01T20:12:35.766Z'),
(E'cmvy9o5di00j2bogykt640nj1', E'festivals-and-celebrations', E'Festivals and Celebrations', E'cmvy9o5dg00iqbogy75157zh5', 3, 5, NULL, '2026-11-01T20:12:35.766Z', '2026-11-01T20:12:35.766Z'),
(E'cmvy9o5di00j6bogyrlrtxgg4', E'greetings', E'Greetings', E'cmvy9o5di00j4bogyc11byvii', 1, 0, NULL, '2026-11-01T20:12:35.767Z', '2026-11-01T20:12:35.767Z'),
(E'cmvy9o5dj00j8bogys2r2d2py', E'naming-things', E'Naming Things', E'cmvy9o5di00j4bogyc11byvii', 1, 1, NULL, '2026-11-01T20:12:35.767Z', '2026-11-01T20:12:35.767Z'),
(E'cmvy9o5dj00jabogy947exui5', E'reading-words', E'Reading Words', E'cmvy9o5di00j4bogyc11byvii', 2, 2, NULL, '2026-11-01T20:12:35.767Z', '2026-11-01T20:12:35.767Z'),
(E'cmvy9o5dj00jcbogycjgy9ie3', E'writing-sentences', E'Writing Sentences', E'cmvy9o5di00j4bogyc11byvii', 2, 3, NULL, '2026-11-01T20:12:35.768Z', '2026-11-01T20:12:35.768Z'),
(E'cmvy9o5dk00jebogycyeqxwtn', E'stories-and-proverbs', E'Stories and Proverbs', E'cmvy9o5di00j4bogyc11byvii', 3, 4, NULL, '2026-11-01T20:12:35.768Z', '2026-11-01T20:12:35.768Z'),
(E'cmvy9o5dk00jgbogyjubwf11y', E'songs-and-rhymes', E'Songs and Rhymes', E'cmvy9o5di00j4bogyc11byvii', 3, 5, NULL, '2026-11-01T20:12:35.768Z', '2026-11-01T20:12:35.768Z'),
(E'cmvy9o5dl00jkbogyiiaokg7z', E'parts-of-a-computer', E'Parts of a Computer', E'cmvy9o5dk00jibogy77e7hh6c', 1, 0, NULL, '2026-11-01T20:12:35.769Z', '2026-11-01T20:12:35.769Z'),
(E'cmvy9o5dl00jmbogylhn8flzx', E'using-a-mouse-and-keyboard', E'Using a Mouse and Keyboard', E'cmvy9o5dk00jibogy77e7hh6c', 1, 1, NULL, '2026-11-01T20:12:35.769Z', '2026-11-01T20:12:35.769Z'),
(E'cmvy9o5dl00jobogyexvhy9n2', E'drawing-on-a-computer', E'Drawing on a Computer', E'cmvy9o5dk00jibogy77e7hh6c', 2, 2, NULL, '2026-11-01T20:12:35.770Z', '2026-11-01T20:12:35.770Z'),
(E'cmvy9o5dm00jqbogyapu757gc', E'keeping-devices-safe', E'Keeping Devices Safe', E'cmvy9o5dk00jibogy77e7hh6c', 3, 3, NULL, '2026-11-01T20:12:35.770Z', '2026-11-01T20:12:35.770Z'),
(E'cmvy9o5dm00jubogy54rvltch', E'telling-news', E'Telling News', E'cmvy9o5dm00jsbogywslhtsxc', 1, 0, NULL, '2026-11-01T20:12:35.771Z', '2026-11-01T20:12:35.771Z'),
(E'cmvy9o5dp00jwbogypjhmjxzk', E'riddles', E'Riddles', E'cmvy9o5dm00jsbogywslhtsxc', 1, 1, NULL, '2026-11-01T20:12:35.774Z', '2026-11-01T20:12:35.774Z'),
(E'cmvy9o5dq00jybogyzcd107lw', E'rhymes-and-songs', E'Rhymes and Songs', E'cmvy9o5dm00jsbogywslhtsxc', 2, 2, NULL, '2026-11-01T20:12:35.774Z', '2026-11-01T20:12:35.774Z'),
(E'cmvy9o5dq00k0bogybpixkdcn', E'folk-stories', E'Folk Stories', E'cmvy9o5dm00jsbogywslhtsxc', 3, 3, NULL, '2026-11-01T20:12:35.775Z', '2026-11-01T20:12:35.775Z'),
(E'cmvy9o5ds00k6bogy3itvhwj4', E'theme-1-our-sub-county-division', E'Theme 1: Our Sub-county / Division', E'cmvy9o5dr00k4bogy3jk9huwe', 1, 0, NULL, '2026-11-01T20:12:35.776Z', '2026-11-01T20:12:35.776Z'),
(E'cmvy9o5ds00k8bogys5nvexzt', E'theme-2-livelihood-in-our-sub-county', E'Theme 2: Livelihood in Our Sub-county', E'cmvy9o5dr00k4bogy3jk9huwe', 1, 1, NULL, '2026-11-01T20:12:35.776Z', '2026-11-01T20:12:35.776Z'),
(E'cmvy9o5ds00kabogyvmdpfaq7', E'theme-3-our-environment', E'Theme 3: Our Environment', E'cmvy9o5dr00k4bogy3jk9huwe', 1, 2, NULL, '2026-11-01T20:12:35.777Z', '2026-11-01T20:12:35.777Z'),
(E'cmvy9o5dt00kcbogykxk577v7', E'theme-4-environment-and-weather', E'Theme 4: Environment and Weather', E'cmvy9o5dr00k4bogy3jk9huwe', 1, 3, NULL, '2026-11-01T20:12:35.777Z', '2026-11-01T20:12:35.777Z'),
(E'cmvy9o5dt00kebogyiaobv45l', E'theme-5-living-things-plants', E'Theme 5: Living Things: Plants', E'cmvy9o5dr00k4bogy3jk9huwe', 2, 4, NULL, '2026-11-01T20:12:35.777Z', '2026-11-01T20:12:35.777Z'),
(E'cmvy9o5dt00kgbogy52hxm112', E'theme-6-living-things-animals', E'Theme 6: Living Things: Animals', E'cmvy9o5dr00k4bogy3jk9huwe', 2, 5, NULL, '2026-11-01T20:12:35.778Z', '2026-11-01T20:12:35.778Z'),
(E'cmvy9o5du00kibogypplkg1zp', E'theme-7-managing-resources-in-our-sub-county', E'Theme 7: Managing Resources in Our Sub-county', E'cmvy9o5dr00k4bogy3jk9huwe', 2, 6, NULL, '2026-11-01T20:12:35.778Z', '2026-11-01T20:12:35.778Z'),
(E'cmvy9o5du00kkbogyhxqabbv8', E'theme-8-keeping-peace-in-our-sub-county', E'Theme 8: Keeping Peace in Our Sub-county', E'cmvy9o5dr00k4bogy3jk9huwe', 2, 7, NULL, '2026-11-01T20:12:35.778Z', '2026-11-01T20:12:35.778Z'),
(E'cmvy9o5du00kmbogy16asrj36', E'theme-9-culture-and-gender-in-our-sub-county', E'Theme 9: Culture and Gender in Our Sub-county', E'cmvy9o5dr00k4bogy3jk9huwe', 3, 8, NULL, '2026-11-01T20:12:35.779Z', '2026-11-01T20:12:35.779Z'),
(E'cmvy9o5du00kobogyw20xd3ms', E'theme-10-health-in-our-sub-county', E'Theme 10: Health in Our Sub-county', E'cmvy9o5dr00k4bogy3jk9huwe', 3, 9, NULL, '2026-11-01T20:12:35.779Z', '2026-11-01T20:12:35.779Z'),
(E'cmvy9o5eq00o2bogyr286ul3s', E'rhymes-and-songs', E'Rhymes and Songs', E'cmvy9o5ej00nwbogy8qq6k56n', 2, 2, NULL, '2026-11-01T20:12:35.810Z', '2026-11-01T20:12:35.810Z'),
(E'cmvy9o5dv00kqbogyg3i7cgk2', E'theme-11-basic-technology-in-our-sub-county', E'Theme 11: Basic Technology in Our Sub-county', E'cmvy9o5dr00k4bogy3jk9huwe', 3, 10, NULL, '2026-11-01T20:12:35.779Z', '2026-11-01T20:12:35.779Z'),
(E'cmvy9o5dv00ksbogy6nsh8q9d', E'theme-12-energy-in-our-sub-county', E'Theme 12: Energy in Our Sub-county', E'cmvy9o5dr00k4bogy3jk9huwe', 3, 11, NULL, '2026-11-01T20:12:35.780Z', '2026-11-01T20:12:35.780Z'),
(E'cmvy9o5dw00kwbogy2nip43th', E'letter-sounds-and-blends', E'Letter Sounds and Blends', E'cmvy9o5dv00kubogyor87i053', 1, 0, NULL, '2026-11-01T20:12:35.780Z', '2026-11-01T20:12:35.780Z'),
(E'cmvy9o5dw00kybogy0r51vshc', E'reading-words-and-sentences', E'Reading Words and Sentences', E'cmvy9o5dv00kubogyor87i053', 1, 1, NULL, '2026-11-01T20:12:35.781Z', '2026-11-01T20:12:35.781Z'),
(E'cmvy9o5dw00l0bogyf8jdnhs9', E'reading-short-passages', E'Reading Short Passages', E'cmvy9o5dv00kubogyor87i053', 1, 2, NULL, '2026-11-01T20:12:35.781Z', '2026-11-01T20:12:35.781Z'),
(E'cmvy9o5dx00l2bogy9tu4xqmb', E'handwriting', E'Handwriting', E'cmvy9o5dv00kubogyor87i053', 2, 3, NULL, '2026-11-01T20:12:35.781Z', '2026-11-01T20:12:35.781Z'),
(E'cmvy9o5dx00l4bogyzujiy2y3', E'spelling', E'Spelling', E'cmvy9o5dv00kubogyor87i053', 2, 4, NULL, '2026-11-01T20:12:35.782Z', '2026-11-01T20:12:35.782Z'),
(E'cmvy9o5dy00l6bogy37zkclzs', E'dictation', E'Dictation', E'cmvy9o5dv00kubogyor87i053', 2, 5, NULL, '2026-11-01T20:12:35.782Z', '2026-11-01T20:12:35.782Z'),
(E'cmvy9o5dy00l8bogy6axgvrkh', E'writing-sentences', E'Writing Sentences', E'cmvy9o5dv00kubogyor87i053', 3, 6, NULL, '2026-11-01T20:12:35.782Z', '2026-11-01T20:12:35.782Z'),
(E'cmvy9o5dy00labogycus3e2c4', E'reading-comprehension', E'Reading Comprehension', E'cmvy9o5dv00kubogyor87i053', 3, 7, NULL, '2026-11-01T20:12:35.783Z', '2026-11-01T20:12:35.783Z'),
(E'cmvy9o5dz00lcbogyk84zhrce', E'writing-short-stories', E'Writing Short Stories', E'cmvy9o5dv00kubogyor87i053', 3, 8, NULL, '2026-11-01T20:12:35.783Z', '2026-11-01T20:12:35.783Z'),
(E'cmvy9o5dz00lgbogydxpnkst3', E'nouns-and-articles-a-an-the', E'Nouns and Articles (a, an, the)', E'cmvy9o5dz00lebogyox84kgx9', 1, 0, NULL, '2026-11-01T20:12:35.784Z', '2026-11-01T20:12:35.784Z'),
(E'cmvy9o5e000libogy5gr2150m', E'pronouns', E'Pronouns', E'cmvy9o5dz00lebogyox84kgx9', 1, 1, NULL, '2026-11-01T20:12:35.784Z', '2026-11-01T20:12:35.784Z'),
(E'cmvy9o5e000lkbogye679gu6x', E'present-and-past-tenses', E'Present and Past Tenses', E'cmvy9o5dz00lebogyox84kgx9', 1, 2, NULL, '2026-11-01T20:12:35.784Z', '2026-11-01T20:12:35.784Z'),
(E'cmvy9o5e000lmbogym6b532xw', E'future-tense', E'Future Tense', E'cmvy9o5dz00lebogyox84kgx9', 1, 3, NULL, '2026-11-01T20:12:35.785Z', '2026-11-01T20:12:35.785Z'),
(E'cmvy9o5e100lobogy49v9lnye', E'adjectives-and-comparison', E'Adjectives and Comparison', E'cmvy9o5dz00lebogyox84kgx9', 2, 4, NULL, '2026-11-01T20:12:35.785Z', '2026-11-01T20:12:35.785Z'),
(E'cmvy9o5e100lqbogymnik4t97', E'adverbs', E'Adverbs', E'cmvy9o5dz00lebogyox84kgx9', 2, 5, NULL, '2026-11-01T20:12:35.786Z', '2026-11-01T20:12:35.786Z'),
(E'cmvy9o5e200lsbogyhvptxgb1', E'prepositions', E'Prepositions', E'cmvy9o5dz00lebogyox84kgx9', 2, 6, NULL, '2026-11-01T20:12:35.786Z', '2026-11-01T20:12:35.786Z'),
(E'cmvy9o5e200lubogyxmyzi6j9', E'conjunctions-and-but-because', E'Conjunctions: and, but, because', E'cmvy9o5dz00lebogyox84kgx9', 2, 7, NULL, '2026-11-01T20:12:35.786Z', '2026-11-01T20:12:35.786Z'),
(E'cmvy9o5e200lwbogyulhd5wbz', E'question-words', E'Question Words', E'cmvy9o5dz00lebogyox84kgx9', 3, 8, NULL, '2026-11-01T20:12:35.787Z', '2026-11-01T20:12:35.787Z'),
(E'cmvy9o5e300lybogyr4b4kosl', E'punctuation', E'Punctuation', E'cmvy9o5dz00lebogyox84kgx9', 3, 9, NULL, '2026-11-01T20:12:35.787Z', '2026-11-01T20:12:35.787Z'),
(E'cmvy9o5e300m0bogy8309yabu', E'comprehension', E'Comprehension', E'cmvy9o5dz00lebogyox84kgx9', 3, 10, NULL, '2026-11-01T20:12:35.787Z', '2026-11-01T20:12:35.787Z'),
(E'cmvy9o5e500m2bogyqku2nwyr', E'composition-and-letter-writing', E'Composition and Letter Writing', E'cmvy9o5dz00lebogyox84kgx9', 3, 11, NULL, '2026-11-01T20:12:35.790Z', '2026-11-01T20:12:35.790Z'),
(E'cmvy9o5e600m6bogymtm98n9p', E'sets', E'Sets', E'cmvy9o5e600m4bogyennjiqe1', 1, 0, NULL, '2026-11-01T20:12:35.791Z', '2026-11-01T20:12:35.791Z'),
(E'cmvy9o5e700m8bogyc8giyzwc', E'numbers-up-to-9-999-and-place-value', E'Numbers up to 9,999 and Place Value', E'cmvy9o5e600m4bogyennjiqe1', 1, 1, NULL, '2026-11-01T20:12:35.792Z', '2026-11-01T20:12:35.792Z'),
(E'cmvy9o5e800mabogytx3y3269', E'addition-and-subtraction', E'Addition and Subtraction', E'cmvy9o5e600m4bogyennjiqe1', 1, 2, NULL, '2026-11-01T20:12:35.792Z', '2026-11-01T20:12:35.792Z'),
(E'cmvy9o5e800mcbogyecgo7tjj', E'multiplication-tables-to-12', E'Multiplication Tables to 12', E'cmvy9o5e600m4bogyennjiqe1', 1, 3, NULL, '2026-11-01T20:12:35.792Z', '2026-11-01T20:12:35.792Z'),
(E'cmvy9o5e800mebogy4a8fovas', E'division', E'Division', E'cmvy9o5e600m4bogyennjiqe1', 2, 4, NULL, '2026-11-01T20:12:35.793Z', '2026-11-01T20:12:35.793Z'),
(E'cmvy9o5e900mgbogy5s4wehag', E'fractions', E'Fractions', E'cmvy9o5e600m4bogyennjiqe1', 2, 5, NULL, '2026-11-01T20:12:35.793Z', '2026-11-01T20:12:35.793Z'),
(E'cmvy9o5e900mibogyfyj0gigi', E'geometry-shapes-and-angles', E'Geometry: Shapes and Angles', E'cmvy9o5e600m4bogyennjiqe1', 2, 6, NULL, '2026-11-01T20:12:35.793Z', '2026-11-01T20:12:35.793Z'),
(E'cmvy9o5e900mkbogyzwm1wnw0', E'measurement-length-mass-capacity', E'Measurement: Length, Mass, Capacity', E'cmvy9o5e600m4bogyennjiqe1', 2, 7, NULL, '2026-11-01T20:12:35.794Z', '2026-11-01T20:12:35.794Z'),
(E'cmvy9o5ea00mmbogyfmso5sss', E'time', E'Time', E'cmvy9o5e600m4bogyennjiqe1', 3, 8, NULL, '2026-11-01T20:12:35.794Z', '2026-11-01T20:12:35.794Z'),
(E'cmvy9o5ea00mobogy7qmkmd82', E'money', E'Money', E'cmvy9o5e600m4bogyennjiqe1', 3, 9, NULL, '2026-11-01T20:12:35.795Z', '2026-11-01T20:12:35.795Z'),
(E'cmvy9o5ea00mqbogyxeagc6kx', E'algebra-missing-numbers', E'Algebra: Missing Numbers', E'cmvy9o5e600m4bogyennjiqe1', 3, 10, NULL, '2026-11-01T20:12:35.795Z', '2026-11-01T20:12:35.795Z'),
(E'cmvy9o5eb00msbogyi3mjhr5c', E'data-handling', E'Data Handling', E'cmvy9o5e600m4bogyennjiqe1', 3, 11, NULL, '2026-11-01T20:12:35.795Z', '2026-11-01T20:12:35.795Z'),
(E'cmvy9o5ec00mwbogyvsty734m', E'creation', E'Creation', E'cmvy9o5eb00mubogygb7rrcn2', 1, 0, NULL, '2026-11-01T20:12:35.796Z', '2026-11-01T20:12:35.796Z'),
(E'cmvy9o5ec00mybogy9on6yv0s', E'my-family-and-god', E'My Family and God', E'cmvy9o5eb00mubogygb7rrcn2', 1, 1, NULL, '2026-11-01T20:12:35.797Z', '2026-11-01T20:12:35.797Z'),
(E'cmvy9o5ec00n0bogyq2ui3vz9', E'prayer-and-worship', E'Prayer and Worship', E'cmvy9o5eb00mubogygb7rrcn2', 2, 2, NULL, '2026-11-01T20:12:35.797Z', '2026-11-01T20:12:35.797Z'),
(E'cmvy9o5ed00n2bogyg323k511', E'stories-of-faith', E'Stories of Faith', E'cmvy9o5eb00mubogygb7rrcn2', 2, 3, NULL, '2026-11-01T20:12:35.797Z', '2026-11-01T20:12:35.797Z'),
(E'cmvy9o5ed00n4bogy3akq62ck', E'caring-for-others', E'Caring for Others', E'cmvy9o5eb00mubogygb7rrcn2', 3, 4, NULL, '2026-11-01T20:12:35.797Z', '2026-11-01T20:12:35.797Z'),
(E'cmvy9o5ed00n6bogyueklgkhu', E'festivals-and-celebrations', E'Festivals and Celebrations', E'cmvy9o5eb00mubogygb7rrcn2', 3, 5, NULL, '2026-11-01T20:12:35.798Z', '2026-11-01T20:12:35.798Z'),
(E'cmvy9o5ee00nabogygzzv1d8j', E'greetings', E'Greetings', E'cmvy9o5ee00n8bogyhwagls9f', 1, 0, NULL, '2026-11-01T20:12:35.798Z', '2026-11-01T20:12:35.798Z'),
(E'cmvy9o5ee00ncbogykgpkfv78', E'naming-things', E'Naming Things', E'cmvy9o5ee00n8bogyhwagls9f', 1, 1, NULL, '2026-11-01T20:12:35.799Z', '2026-11-01T20:12:35.799Z'),
(E'cmvy9o5ef00nebogypgwgpy2u', E'reading-words', E'Reading Words', E'cmvy9o5ee00n8bogyhwagls9f', 2, 2, NULL, '2026-11-01T20:12:35.800Z', '2026-11-01T20:12:35.800Z'),
(E'cmvy9o5eg00ngbogy6v8q9nmg', E'writing-sentences', E'Writing Sentences', E'cmvy9o5ee00n8bogyhwagls9f', 2, 3, NULL, '2026-11-01T20:12:35.800Z', '2026-11-01T20:12:35.800Z'),
(E'cmvy9o5eg00nibogyyw7q2xgy', E'stories-and-proverbs', E'Stories and Proverbs', E'cmvy9o5ee00n8bogyhwagls9f', 3, 4, NULL, '2026-11-01T20:12:35.800Z', '2026-11-01T20:12:35.800Z'),
(E'cmvy9o5eg00nkbogyc30q2z95', E'songs-and-rhymes', E'Songs and Rhymes', E'cmvy9o5ee00n8bogyhwagls9f', 3, 5, NULL, '2026-11-01T20:12:35.801Z', '2026-11-01T20:12:35.801Z'),
(E'cmvy9o5eh00nobogyldahy1ko', E'parts-of-a-computer', E'Parts of a Computer', E'cmvy9o5eh00nmbogy5pq1rxpy', 1, 0, NULL, '2026-11-01T20:12:35.801Z', '2026-11-01T20:12:35.801Z'),
(E'cmvy9o5eh00nqbogyheh71oy8', E'using-a-mouse-and-keyboard', E'Using a Mouse and Keyboard', E'cmvy9o5eh00nmbogy5pq1rxpy', 1, 1, NULL, '2026-11-01T20:12:35.802Z', '2026-11-01T20:12:35.802Z'),
(E'cmvy9o5ei00nsbogy8sh37b93', E'drawing-on-a-computer', E'Drawing on a Computer', E'cmvy9o5eh00nmbogy5pq1rxpy', 2, 2, NULL, '2026-11-01T20:12:35.802Z', '2026-11-01T20:12:35.802Z'),
(E'cmvy9o5ei00nubogyz9w7frq6', E'keeping-devices-safe', E'Keeping Devices Safe', E'cmvy9o5eh00nmbogy5pq1rxpy', 3, 3, NULL, '2026-11-01T20:12:35.802Z', '2026-11-01T20:12:35.802Z'),
(E'cmvy9o5ej00nybogybjt3u3v7', E'telling-news', E'Telling News', E'cmvy9o5ej00nwbogy8qq6k56n', 1, 0, NULL, '2026-11-01T20:12:35.804Z', '2026-11-01T20:12:35.804Z'),
(E'cmvy9o5ek00o0bogyrqu26c3l', E'riddles', E'Riddles', E'cmvy9o5ej00nwbogy8qq6k56n', 1, 1, NULL, '2026-11-01T20:12:35.804Z', '2026-11-01T20:12:35.804Z'),
(E'cmvy9o5er00o4bogyixjj8c28', E'folk-stories', E'Folk Stories', E'cmvy9o5ej00nwbogy8qq6k56n', 3, 3, NULL, '2026-11-01T20:12:35.812Z', '2026-11-01T20:12:35.812Z'),
(E'cmvy9o5ev00oabogy7g4em16w', E'sets', E'Sets', E'cmvy9o5eu00o8bogygh9plo8b', 1, 0, NULL, '2026-11-01T20:12:35.815Z', '2026-11-01T20:12:35.815Z'),
(E'cmvy9o5f200ocbogyh1rtfg3n', E'whole-numbers-and-place-value', E'Whole Numbers and Place Value', E'cmvy9o5eu00o8bogygh9plo8b', 1, 1, NULL, '2026-11-01T20:12:35.822Z', '2026-11-01T20:12:35.822Z'),
(E'cmvy9o5fb00oebogykqxnv056', E'operations-on-whole-numbers', E'Operations on Whole Numbers', E'cmvy9o5eu00o8bogygh9plo8b', 1, 2, NULL, '2026-11-01T20:12:35.831Z', '2026-11-01T20:12:35.831Z'),
(E'cmvy9o5fc00ogbogyjho5impi', E'number-patterns', E'Number Patterns and Sequences', E'cmvy9o5eu00o8bogygh9plo8b', 1, 3, NULL, '2026-11-01T20:12:35.833Z', '2026-11-01T20:12:35.833Z'),
(E'cmvy9o5fd00oibogyt0sney8j', E'fractions', E'Fractions', E'cmvy9o5eu00o8bogygh9plo8b', 2, 4, NULL, '2026-11-01T20:12:35.834Z', '2026-11-01T20:12:35.834Z'),
(E'cmvy9o5fe00okbogyrk6k8srb', E'geometry', E'Geometry: Lines, Angles and Shapes', E'cmvy9o5eu00o8bogygh9plo8b', 2, 5, NULL, '2026-11-01T20:12:35.835Z', '2026-11-01T20:12:35.835Z'),
(E'cmvy9o5fh00ombogyld8gjlj4', E'data-handling', E'Data Handling: Graphs', E'cmvy9o5eu00o8bogygh9plo8b', 2, 6, NULL, '2026-11-01T20:12:35.837Z', '2026-11-01T20:12:35.837Z'),
(E'cmvy9o5fj00oobogyefdbmaxo', E'measurement', E'Measurement: Length, Mass and Capacity', E'cmvy9o5eu00o8bogygh9plo8b', 2, 7, NULL, '2026-11-01T20:12:35.839Z', '2026-11-01T20:12:35.839Z'),
(E'cmvy9o5fl00oqbogy1bginhat', E'money', E'Money', E'cmvy9o5eu00o8bogygh9plo8b', 3, 8, NULL, '2026-11-01T20:12:35.841Z', '2026-11-01T20:12:35.841Z'),
(E'cmvy9o5fm00osbogyopdbosr7', E'time', E'Time', E'cmvy9o5eu00o8bogygh9plo8b', 3, 9, NULL, '2026-11-01T20:12:35.842Z', '2026-11-01T20:12:35.842Z'),
(E'cmvy9o5fn00oubogyd5594ihc', E'algebra', E'Algebra: Simple Equations', E'cmvy9o5eu00o8bogygh9plo8b', 3, 10, NULL, '2026-11-01T20:12:35.843Z', '2026-11-01T20:12:35.843Z'),
(E'cmvy9o5fo00oybogyam62r6t9', E'nouns-and-articles', E'Nouns and Articles', E'cmvy9o5fn00owbogy90vuop2s', 1, 0, NULL, '2026-11-01T20:12:35.844Z', '2026-11-01T20:12:35.844Z'),
(E'cmvy9o5fo00p0bogyge1qond1', E'pronouns', E'Pronouns', E'cmvy9o5fn00owbogy90vuop2s', 1, 1, NULL, '2026-11-01T20:12:35.845Z', '2026-11-01T20:12:35.845Z'),
(E'cmvy9o5fp00p2bogymr2bury8', E'verbs-and-tenses', E'Verbs and Tenses', E'cmvy9o5fn00owbogy90vuop2s', 1, 2, NULL, '2026-11-01T20:12:35.845Z', '2026-11-01T20:12:35.845Z'),
(E'cmvy9o5fp00p4bogyny4xgfub', E'adjectives', E'Adjectives and Comparison', E'cmvy9o5fn00owbogy90vuop2s', 1, 3, NULL, '2026-11-01T20:12:35.845Z', '2026-11-01T20:12:35.845Z'),
(E'cmvy9o5fp00p6bogy98vthvyg', E'adverbs', E'Adverbs', E'cmvy9o5fn00owbogy90vuop2s', 2, 4, NULL, '2026-11-01T20:12:35.846Z', '2026-11-01T20:12:35.846Z'),
(E'cmvy9o5fp00p8bogy8z2t49o4', E'prepositions', E'Prepositions', E'cmvy9o5fn00owbogy90vuop2s', 2, 5, NULL, '2026-11-01T20:12:35.846Z', '2026-11-01T20:12:35.846Z'),
(E'cmvy9o5fq00pabogy1j6xp6iy', E'punctuation', E'Punctuation and Capitalisation', E'cmvy9o5fn00owbogy90vuop2s', 2, 6, NULL, '2026-11-01T20:12:35.846Z', '2026-11-01T20:12:35.846Z'),
(E'cmvy9o5fq00pcbogyg2nat9ba', E'comprehension', E'Reading Comprehension', E'cmvy9o5fn00owbogy90vuop2s', 2, 7, NULL, '2026-11-01T20:12:35.846Z', '2026-11-01T20:12:35.846Z'),
(E'cmvy9o5fq00pebogydx3udst3', E'vocabulary', E'Vocabulary: School, Home and Community', E'cmvy9o5fn00owbogy90vuop2s', 3, 8, NULL, '2026-11-01T20:12:35.847Z', '2026-11-01T20:12:35.847Z'),
(E'cmvy9o5fq00pgbogyle3yv6do', E'composition', E'Guided Composition', E'cmvy9o5fn00owbogy90vuop2s', 3, 9, NULL, '2026-11-01T20:12:35.847Z', '2026-11-01T20:12:35.847Z'),
(E'cmvy9o5fr00pibogyqnr803tn', E'letter-writing', E'Informal Letter Writing', E'cmvy9o5fn00owbogy90vuop2s', 3, 10, NULL, '2026-11-01T20:12:35.847Z', '2026-11-01T20:12:35.847Z'),
(E'cmvy9o5fr00pmbogy7gstdtp2', E'weather', E'Weather', E'cmvy9o5fr00pkbogycyzvb3zq', 1, 0, NULL, '2026-11-01T20:12:35.848Z', '2026-11-01T20:12:35.848Z'),
(E'cmvy9o5fs00pobogyt3mpnmf2', E'soil', E'Soil', E'cmvy9o5fr00pkbogycyzvb3zq', 1, 1, NULL, '2026-11-01T20:12:35.848Z', '2026-11-01T20:12:35.848Z'),
(E'cmvy9o5fs00pqbogyjdt9ugma', E'plants', E'Plants: Parts and Their Functions', E'cmvy9o5fr00pkbogycyzvb3zq', 1, 2, NULL, '2026-11-01T20:12:35.848Z', '2026-11-01T20:12:35.848Z'),
(E'cmvy9o5fs00psbogywg0q4q35', E'sanitation', E'Sanitation and Personal Hygiene', E'cmvy9o5fr00pkbogycyzvb3zq', 2, 3, NULL, '2026-11-01T20:12:35.848Z', '2026-11-01T20:12:35.848Z'),
(E'cmvy9o5fs00pubogyyj89cywr', E'teeth', E'Teeth and Dental Care', E'cmvy9o5fr00pkbogycyzvb3zq', 2, 4, NULL, '2026-11-01T20:12:35.849Z', '2026-11-01T20:12:35.849Z'),
(E'cmvy9o5ft00pwbogy84cg0q7q', E'water', E'Water', E'cmvy9o5fr00pkbogycyzvb3zq', 2, 5, NULL, '2026-11-01T20:12:35.849Z', '2026-11-01T20:12:35.849Z'),
(E'cmvy9o5ft00pybogy4ulyj3ck', E'food-and-nutrition', E'Food and Nutrition', E'cmvy9o5fr00pkbogycyzvb3zq', 2, 6, NULL, '2026-11-01T20:12:35.849Z', '2026-11-01T20:12:35.849Z'),
(E'cmvy9o5ft00q0bogysnp9r2fz', E'energy', E'Energy: Heat and Light', E'cmvy9o5fr00pkbogycyzvb3zq', 3, 7, NULL, '2026-11-01T20:12:35.850Z', '2026-11-01T20:12:35.850Z'),
(E'cmvy9o5ft00q2bogyyi23k6xe', E'animals', E'Animals Around Us', E'cmvy9o5fr00pkbogycyzvb3zq', 3, 8, NULL, '2026-11-01T20:12:35.850Z', '2026-11-01T20:12:35.850Z'),
(E'cmvy9o5fu00q4bogy8w1uoqnu', E'common-diseases', E'Common Diseases and Prevention', E'cmvy9o5fr00pkbogycyzvb3zq', 3, 9, NULL, '2026-11-01T20:12:35.850Z', '2026-11-01T20:12:35.850Z'),
(E'cmvy9o5fu00q6bogyhbux9p17', E'materials', E'Materials and Their Uses', E'cmvy9o5fr00pkbogycyzvb3zq', 3, 10, NULL, '2026-11-01T20:12:35.851Z', '2026-11-01T20:12:35.851Z'),
(E'cmvy9o5fv00qabogy6ji0ow45', E'our-district', E'Location of Our District', E'cmvy9o5fv00q8bogykbaxiig1', 1, 0, NULL, '2026-11-01T20:12:35.851Z', '2026-11-01T20:12:35.851Z'),
(E'cmvy9o5fv00qcbogymjt0fdcs', E'map-work', E'Map Work: Symbols, Directions and Compass', E'cmvy9o5fv00q8bogykbaxiig1', 1, 1, NULL, '2026-11-01T20:12:35.852Z', '2026-11-01T20:12:35.852Z'),
(E'cmvy9o5fw00qebogylvvvgnkc', E'physical-features', E'Physical Features of Our District', E'cmvy9o5fv00q8bogykbaxiig1', 1, 2, NULL, '2026-11-01T20:12:35.852Z', '2026-11-01T20:12:35.852Z'),
(E'cmvy9o5fw00qgbogyhjge6q45', E'climate-and-vegetation', E'Climate and Vegetation of Our District', E'cmvy9o5fv00q8bogykbaxiig1', 2, 3, NULL, '2026-11-01T20:12:35.852Z', '2026-11-01T20:12:35.852Z'),
(E'cmvy9o5fw00qibogyvhhapi8z', E'people-and-occupations', E'People of Our District and Their Work', E'cmvy9o5fv00q8bogykbaxiig1', 2, 4, NULL, '2026-11-01T20:12:35.853Z', '2026-11-01T20:12:35.853Z'),
(E'cmvy9o5fx00qkbogyrksl4tfm', E'leaders', E'Leaders and Services in Our District', E'cmvy9o5fv00q8bogykbaxiig1', 2, 5, NULL, '2026-11-01T20:12:35.853Z', '2026-11-01T20:12:35.853Z'),
(E'cmvy9o5fx00qmbogypwrldwjz', E'culture', E'Culture in Our District', E'cmvy9o5fv00q8bogykbaxiig1', 3, 6, NULL, '2026-11-01T20:12:35.854Z', '2026-11-01T20:12:35.854Z'),
(E'cmvy9o5fy00qobogy3iu5bdpx', E'resources', E'Resources in Our District', E'cmvy9o5fv00q8bogykbaxiig1', 3, 7, NULL, '2026-11-01T20:12:35.854Z', '2026-11-01T20:12:35.854Z'),
(E'cmvy9o5fz00qqbogygaqk6yz9', E'history', E'History of Our District', E'cmvy9o5fv00q8bogykbaxiig1', 3, 8, NULL, '2026-11-01T20:12:35.856Z', '2026-11-01T20:12:35.856Z'),
(E'cmvy9o5g200qubogy78z86bxv', E'god-s-creation', E'God''s Creation', E'cmvy9o5g000qsbogyepxufuh1', 1, 0, NULL, '2026-11-01T20:12:35.858Z', '2026-11-01T20:12:35.858Z'),
(E'cmvy9o5g300qwbogyxwigphxi', E'faith-and-worship', E'Faith and Worship', E'cmvy9o5g000qsbogyepxufuh1', 1, 1, NULL, '2026-11-01T20:12:35.859Z', '2026-11-01T20:12:35.859Z'),
(E'cmvy9o5g300qybogys2ab00n8', E'prophets-and-leaders', E'Prophets and Leaders', E'cmvy9o5g000qsbogyepxufuh1', 1, 2, NULL, '2026-11-01T20:12:35.859Z', '2026-11-01T20:12:35.859Z'),
(E'cmvy9o5g300r0bogynpbo73p1', E'values-and-conduct', E'Values and Conduct', E'cmvy9o5g000qsbogyepxufuh1', 2, 3, NULL, '2026-11-01T20:12:35.860Z', '2026-11-01T20:12:35.860Z'),
(E'cmvy9o5g400r2bogyrrbwz78f', E'sacred-texts', E'Sacred Texts', E'cmvy9o5g000qsbogyepxufuh1', 2, 4, NULL, '2026-11-01T20:12:35.860Z', '2026-11-01T20:12:35.860Z'),
(E'cmvy9o5g400r4bogydwhppiga', E'festivals-and-celebrations', E'Festivals and Celebrations', E'cmvy9o5g000qsbogyepxufuh1', 2, 5, NULL, '2026-11-01T20:12:35.860Z', '2026-11-01T20:12:35.860Z'),
(E'cmvy9o5g400r6bogyhd47i4uy', E'community-life', E'Community Life', E'cmvy9o5g000qsbogyepxufuh1', 3, 6, NULL, '2026-11-01T20:12:35.861Z', '2026-11-01T20:12:35.861Z'),
(E'cmvy9o5g500r8bogyce724w2b', E'service-to-others', E'Service to Others', E'cmvy9o5g000qsbogyepxufuh1', 3, 7, NULL, '2026-11-01T20:12:35.861Z', '2026-11-01T20:12:35.861Z'),
(E'cmvy9o5g500rabogy1t6pfy3k', E'preparing-for-ple-re', E'Preparing for PLE RE', E'cmvy9o5g000qsbogyepxufuh1', 3, 8, NULL, '2026-11-01T20:12:35.862Z', '2026-11-01T20:12:35.862Z'),
(E'cmvy9o5g600rebogycj9mqd0q', E'salamu-greetings', E'Salamu (Greetings)', E'cmvy9o5g500rcbogyjg69sh2h', 1, 0, NULL, '2026-11-01T20:12:35.862Z', '2026-11-01T20:12:35.862Z'),
(E'cmvy9o5g600rgbogyfm7ucj8m', E'nambari-numbers', E'Nambari (Numbers)', E'cmvy9o5g500rcbogyjg69sh2h', 1, 1, NULL, '2026-11-01T20:12:35.862Z', '2026-11-01T20:12:35.862Z'),
(E'cmvy9o5g600ribogyen0se9wi', E'familia-family', E'Familia (Family)', E'cmvy9o5g500rcbogyjg69sh2h', 2, 2, NULL, '2026-11-01T20:12:35.863Z', '2026-11-01T20:12:35.863Z'),
(E'cmvy9o5g700rkbogy0kqapqri', E'shuleni-at-school', E'Shuleni (At School)', E'cmvy9o5g500rcbogyjg69sh2h', 2, 3, NULL, '2026-11-01T20:12:35.863Z', '2026-11-01T20:12:35.863Z'),
(E'cmvy9o5g700rmbogy1h4xj65g', E'vitenzi-verbs', E'Vitenzi (Verbs)', E'cmvy9o5g500rcbogyjg69sh2h', 3, 4, NULL, '2026-11-01T20:12:35.863Z', '2026-11-01T20:12:35.863Z'),
(E'cmvy9o5g700robogyxrply9wi', E'wakati-time', E'Wakati (Time)', E'cmvy9o5g500rcbogyjg69sh2h', 3, 5, NULL, '2026-11-01T20:12:35.864Z', '2026-11-01T20:12:35.864Z'),
(E'cmvy9o5g800rsbogy8pa0pcie', E'parts-of-a-computer', E'Parts of a Computer', E'cmvy9o5g800rqbogy4iyktdvx', 1, 0, NULL, '2026-11-01T20:12:35.864Z', '2026-11-01T20:12:35.864Z'),
(E'cmvy9o5g800rubogycrb458u2', E'keyboard-and-mouse-skills', E'Keyboard and Mouse Skills', E'cmvy9o5g800rqbogy4iyktdvx', 1, 1, NULL, '2026-11-01T20:12:35.865Z', '2026-11-01T20:12:35.865Z'),
(E'cmvy9o5g800rwbogynct60853', E'word-processing', E'Word Processing', E'cmvy9o5g800rqbogy4iyktdvx', 2, 2, NULL, '2026-11-01T20:12:35.865Z', '2026-11-01T20:12:35.865Z'),
(E'cmvy9o5g900rybogytddcuzt2', E'internet-safety', E'Internet Safety', E'cmvy9o5g800rqbogy4iyktdvx', 3, 3, NULL, '2026-11-01T20:12:35.865Z', '2026-11-01T20:12:35.865Z'),
(E'cmvy9o5g900s2bogyosposky4', E'drawing-and-colour', E'Drawing and Colour', E'cmvy9o5g900s0bogyn0jqm6k0', 1, 0, NULL, '2026-11-01T20:12:35.866Z', '2026-11-01T20:12:35.866Z'),
(E'cmvy9o5ga00s4bogy4mohj0n1', E'crafts', E'Crafts', E'cmvy9o5g900s0bogyn0jqm6k0', 1, 1, NULL, '2026-11-01T20:12:35.866Z', '2026-11-01T20:12:35.866Z'),
(E'cmvy9o5ga00s6bogydf7h0u0a', E'songs-and-dance', E'Songs and Dance', E'cmvy9o5g900s0bogyn0jqm6k0', 2, 2, NULL, '2026-11-01T20:12:35.867Z', '2026-11-01T20:12:35.867Z'),
(E'cmvy9o5ga00s8bogyt40nnbcr', E'games-and-athletics', E'Games and Athletics', E'cmvy9o5g900s0bogyn0jqm6k0', 3, 3, NULL, '2026-11-01T20:12:35.867Z', '2026-11-01T20:12:35.867Z'),
(E'cmvy9o5gc00sgbogy4nducmc4', E'sets', E'Sets', E'cmvy9o5gc00sebogyqi6qlbkx', 1, 0, NULL, '2026-11-01T20:12:35.868Z', '2026-11-01T20:12:35.868Z'),
(E'cmvy9o5gc00sibogy1fb0bg50', E'numeration-and-place-value', E'Numeration Systems and Place Value', E'cmvy9o5gc00sebogyqi6qlbkx', 1, 1, NULL, '2026-11-01T20:12:35.869Z', '2026-11-01T20:12:35.869Z'),
(E'cmvy9o5gd00skbogya3fiq6qz', E'operations-on-whole-numbers', E'Operations on Whole Numbers', E'cmvy9o5gc00sebogyqi6qlbkx', 1, 2, NULL, '2026-11-01T20:12:35.869Z', '2026-11-01T20:12:35.869Z'),
(E'cmvy9o5gd00smbogyq8445ewn', E'number-patterns', E'Number Patterns and Sequences', E'cmvy9o5gc00sebogyqi6qlbkx', 1, 3, NULL, '2026-11-01T20:12:35.870Z', '2026-11-01T20:12:35.870Z'),
(E'cmvy9o5ge00sobogyzwn4skqf', E'fractions', E'Fractions', E'cmvy9o5gc00sebogyqi6qlbkx', 2, 4, NULL, '2026-11-01T20:12:35.870Z', '2026-11-01T20:12:35.870Z'),
(E'cmvy9o5gf00sqbogykwsui0y6', E'decimals-and-percentages', E'Decimals and Percentages', E'cmvy9o5gc00sebogyqi6qlbkx', 2, 5, NULL, '2026-11-01T20:12:35.871Z', '2026-11-01T20:12:35.871Z'),
(E'cmvy9o5gf00ssbogyelw5drmw', E'geometry', E'Geometry: Construction and Angles', E'cmvy9o5gc00sebogyqi6qlbkx', 2, 6, NULL, '2026-11-01T20:12:35.872Z', '2026-11-01T20:12:35.872Z'),
(E'cmvy9o5gg00subogyr75rj08z', E'data-handling', E'Data Handling', E'cmvy9o5gc00sebogyqi6qlbkx', 2, 7, NULL, '2026-11-01T20:12:35.872Z', '2026-11-01T20:12:35.872Z'),
(E'cmvy9o5gg00swbogy7zh1ot9m', E'measurement', E'Measurement: Perimeter and Area', E'cmvy9o5gc00sebogyqi6qlbkx', 2, 8, NULL, '2026-11-01T20:12:35.872Z', '2026-11-01T20:12:35.872Z'),
(E'cmvy9o5gg00sybogyj9frhdkg', E'money', E'Money', E'cmvy9o5gc00sebogyqi6qlbkx', 3, 9, NULL, '2026-11-01T20:12:35.873Z', '2026-11-01T20:12:35.873Z'),
(E'cmvy9o5gg00t0bogy7wkajd0k', E'time', E'Time', E'cmvy9o5gc00sebogyqi6qlbkx', 3, 10, NULL, '2026-11-01T20:12:35.873Z', '2026-11-01T20:12:35.873Z'),
(E'cmvy9o5gh00t2bogypcasbt0b', E'integers', E'Integers', E'cmvy9o5gc00sebogyqi6qlbkx', 3, 11, NULL, '2026-11-01T20:12:35.873Z', '2026-11-01T20:12:35.873Z'),
(E'cmvy9o5gi00t4bogyj0wy86sp', E'algebra', E'Algebra', E'cmvy9o5gc00sebogyqi6qlbkx', 3, 12, NULL, '2026-11-01T20:12:35.874Z', '2026-11-01T20:12:35.874Z'),
(E'cmvy9o5gi00t6bogy8l0k9jzh', E'number-bases', E'Number Bases', E'cmvy9o5gc00sebogyqi6qlbkx', 3, 13, NULL, '2026-11-01T20:12:35.875Z', '2026-11-01T20:12:35.875Z'),
(E'cmvy9o5gj00tabogybw16y9bs', E'nouns-and-articles', E'Nouns, Articles and Plurals', E'cmvy9o5gj00t8bogy6oatig5k', 1, 0, NULL, '2026-11-01T20:12:35.876Z', '2026-11-01T20:12:35.876Z'),
(E'cmvy9o5gk00tcbogysocaqp9n', E'pronouns', E'Pronouns', E'cmvy9o5gj00t8bogy6oatig5k', 1, 1, NULL, '2026-11-01T20:12:35.876Z', '2026-11-01T20:12:35.876Z'),
(E'cmvy9o5gk00tebogyep6e63lu', E'verbs-and-tenses', E'Verbs and Tenses', E'cmvy9o5gj00t8bogy6oatig5k', 1, 2, NULL, '2026-11-01T20:12:35.876Z', '2026-11-01T20:12:35.876Z'),
(E'cmvy9o5gk00tgbogysxmh92j9', E'adjectives', E'Adjectives and Comparison', E'cmvy9o5gj00t8bogy6oatig5k', 1, 3, NULL, '2026-11-01T20:12:35.877Z', '2026-11-01T20:12:35.877Z'),
(E'cmvy9o5gk00tibogygtpy36mg', E'adverbs', E'Adverbs', E'cmvy9o5gj00t8bogy6oatig5k', 2, 4, NULL, '2026-11-01T20:12:35.877Z', '2026-11-01T20:12:35.877Z'),
(E'cmvy9o5gl00tkbogyx3xq9heo', E'prepositions-and-conjunctions', E'Prepositions and Conjunctions', E'cmvy9o5gj00t8bogy6oatig5k', 2, 5, NULL, '2026-11-01T20:12:35.877Z', '2026-11-01T20:12:35.877Z'),
(E'cmvy9o5gl00tmbogyjcndn4jd', E'question-tags', E'Question Tags', E'cmvy9o5gj00t8bogy6oatig5k', 2, 6, NULL, '2026-11-01T20:12:35.878Z', '2026-11-01T20:12:35.878Z'),
(E'cmvy9o5gl00tobogyrwil3zwa', E'comprehension', E'Reading Comprehension', E'cmvy9o5gj00t8bogy6oatig5k', 2, 7, NULL, '2026-11-01T20:12:35.878Z', '2026-11-01T20:12:35.878Z'),
(E'cmvy9o5gm00tqbogysanfqo0p', E'vocabulary', E'Vocabulary by Theme', E'cmvy9o5gj00t8bogy6oatig5k', 3, 8, NULL, '2026-11-01T20:12:35.878Z', '2026-11-01T20:12:35.878Z'),
(E'cmvy9o5gm00tsbogyadvkyzns', E'composition', E'Composition Writing', E'cmvy9o5gj00t8bogy6oatig5k', 3, 9, NULL, '2026-11-01T20:12:35.878Z', '2026-11-01T20:12:35.878Z'),
(E'cmvy9o5gm00tubogydc2ta9hf', E'letter-writing', E'Letter Writing', E'cmvy9o5gj00t8bogy6oatig5k', 3, 10, NULL, '2026-11-01T20:12:35.879Z', '2026-11-01T20:12:35.879Z'),
(E'cmvy9o5gn00twbogy5i860bwj', E'punctuation', E'Punctuation', E'cmvy9o5gj00t8bogy6oatig5k', 3, 11, NULL, '2026-11-01T20:12:35.879Z', '2026-11-01T20:12:35.879Z'),
(E'cmvy9o5go00u0bogyqpwate18', E'keeping-poultry', E'Keeping Poultry', E'cmvy9o5gn00tybogybrqnqg16', 1, 0, NULL, '2026-11-01T20:12:35.880Z', '2026-11-01T20:12:35.880Z'),
(E'cmvy9o5go00u2bogy3abnsyxy', E'insects', E'Insects', E'cmvy9o5gn00tybogybrqnqg16', 1, 1, NULL, '2026-11-01T20:12:35.880Z', '2026-11-01T20:12:35.880Z'),
(E'cmvy9o5go00u4bogyoeebiafo', E'immunisation', E'Immunisation and Childhood Diseases', E'cmvy9o5gn00tybogybrqnqg16', 1, 2, NULL, '2026-11-01T20:12:35.881Z', '2026-11-01T20:12:35.881Z'),
(E'cmvy9o5gp00u6bogyjtnogki3', E'digestive-system', E'The Digestive System', E'cmvy9o5gn00tybogybrqnqg16', 1, 3, NULL, '2026-11-01T20:12:35.881Z', '2026-11-01T20:12:35.881Z'),
(E'cmvy9o5gp00u8bogyoxgcpxb6', E'skeletal-system', E'The Skeleton and Muscles', E'cmvy9o5gn00tybogybrqnqg16', 2, 4, NULL, '2026-11-01T20:12:35.881Z', '2026-11-01T20:12:35.881Z'),
(E'cmvy9o5gp00uabogy7jqoauw0', E'plant-reproduction', E'Reproduction in Flowering Plants', E'cmvy9o5gn00tybogybrqnqg16', 2, 5, NULL, '2026-11-01T20:12:35.882Z', '2026-11-01T20:12:35.882Z'),
(E'cmvy9o5gq00ucbogym7t9850x', E'weather-and-climate', E'Weather and Climate', E'cmvy9o5gn00tybogybrqnqg16', 2, 6, NULL, '2026-11-01T20:12:35.882Z', '2026-11-01T20:12:35.882Z'),
(E'cmvy9o5gq00uebogydntoiql6', E'soil-erosion', E'Soil Erosion and Conservation', E'cmvy9o5gn00tybogybrqnqg16', 2, 7, NULL, '2026-11-01T20:12:35.882Z', '2026-11-01T20:12:35.882Z'),
(E'cmvy9o5gq00ugbogy0bstetf4', E'water-and-purification', E'Water: Sources and Purification', E'cmvy9o5gn00tybogybrqnqg16', 2, 8, NULL, '2026-11-01T20:12:35.883Z', '2026-11-01T20:12:35.883Z'),
(E'cmvy9o5gr00uibogyebu0t0yt', E'light-and-sound', E'Energy: Light and Sound', E'cmvy9o5gn00tybogybrqnqg16', 3, 9, NULL, '2026-11-01T20:12:35.883Z', '2026-11-01T20:12:35.883Z'),
(E'cmvy9o5gr00ukbogywg06k3j3', E'simple-machines', E'Simple Machines', E'cmvy9o5gn00tybogybrqnqg16', 3, 10, NULL, '2026-11-01T20:12:35.884Z', '2026-11-01T20:12:35.884Z'),
(E'cmvy9o5gs00umbogy3ub83oa8', E'vectors-and-diseases', E'Vectors and Diseases', E'cmvy9o5gn00tybogybrqnqg16', 3, 11, NULL, '2026-11-01T20:12:35.884Z', '2026-11-01T20:12:35.884Z'),
(E'cmvy9o5gs00uobogyskxstsyw', E'accidents-and-first-aid', E'Accidents and First Aid', E'cmvy9o5gn00tybogybrqnqg16', 3, 12, NULL, '2026-11-01T20:12:35.884Z', '2026-11-01T20:12:35.884Z'),
(E'cmvy9o5gt00usbogyyobd6by1', E'location-of-uganda', E'Location and Size of Uganda', E'cmvy9o5gs00uqbogyilx6aa2a', 1, 0, NULL, '2026-11-01T20:12:35.885Z', '2026-11-01T20:12:35.885Z'),
(E'cmvy9o5gt00uubogyq12u4kya', E'physical-features', E'Physical Features of Uganda', E'cmvy9o5gs00uqbogyilx6aa2a', 1, 1, NULL, '2026-11-01T20:12:35.885Z', '2026-11-01T20:12:35.885Z'),
(E'cmvy9o5gt00uwbogybfw8kpjd', E'climate-and-vegetation', E'Climate and Vegetation of Uganda', E'cmvy9o5gs00uqbogyilx6aa2a', 1, 2, NULL, '2026-11-01T20:12:35.886Z', '2026-11-01T20:12:35.886Z'),
(E'cmvy9o5gu00uybogysqm4mlqf', E'map-reading', E'Map Reading: Grid, Scale and Symbols', E'cmvy9o5gs00uqbogyilx6aa2a', 1, 3, NULL, '2026-11-01T20:12:35.886Z', '2026-11-01T20:12:35.886Z'),
(E'cmvy9o5gu00v0bogykpym5z8w', E'people-of-uganda', E'The People of Uganda', E'cmvy9o5gs00uqbogyilx6aa2a', 2, 4, NULL, '2026-11-01T20:12:35.887Z', '2026-11-01T20:12:35.887Z'),
(E'cmvy9o5gv00v2bogyzupgq3e0', E'pre-colonial-uganda', E'Pre-colonial Kingdoms and Chiefdoms', E'cmvy9o5gs00uqbogyilx6aa2a', 2, 5, NULL, '2026-11-01T20:12:35.887Z', '2026-11-01T20:12:35.887Z'),
(E'cmvy9o5gv00v4bogycqogggj6', E'colonial-rule', E'Foreigners and Colonial Rule in Uganda', E'cmvy9o5gs00uqbogyilx6aa2a', 2, 6, NULL, '2026-11-01T20:12:35.887Z', '2026-11-01T20:12:35.887Z'),
(E'cmvy9o5gy00v6bogyy2w7rv31', E'government', E'Government of Uganda', E'cmvy9o5gs00uqbogyilx6aa2a', 3, 7, NULL, '2026-11-01T20:12:35.891Z', '2026-11-01T20:12:35.891Z'),
(E'cmvy9o5gz00v8bogy727tm14k', E'economic-activities', E'Resources and Economic Activities', E'cmvy9o5gs00uqbogyilx6aa2a', 3, 8, NULL, '2026-11-01T20:12:35.891Z', '2026-11-01T20:12:35.891Z'),
(E'cmvy9o5h000vabogyk4ebe5as', E'transport-and-communication', E'Transport and Communication', E'cmvy9o5gs00uqbogyilx6aa2a', 3, 9, NULL, '2026-11-01T20:12:35.892Z', '2026-11-01T20:12:35.892Z'),
(E'cmvy9o5h000vcbogytk6o8kq8', E'population', E'Population of Uganda', E'cmvy9o5gs00uqbogyilx6aa2a', 3, 10, NULL, '2026-11-01T20:12:35.893Z', '2026-11-01T20:12:35.893Z'),
(E'cmvy9o5h300vgbogye30witmx', E'god-s-creation', E'God''s Creation', E'cmvy9o5h200vebogyma6r8mvw', 1, 0, NULL, '2026-11-01T20:12:35.895Z', '2026-11-01T20:12:35.895Z'),
(E'cmvy9o5h300vibogy6fy53htb', E'faith-and-worship', E'Faith and Worship', E'cmvy9o5h200vebogyma6r8mvw', 1, 1, NULL, '2026-11-01T20:12:35.896Z', '2026-11-01T20:12:35.896Z'),
(E'cmvy9o5h400vkbogy9k5i5m3h', E'prophets-and-leaders', E'Prophets and Leaders', E'cmvy9o5h200vebogyma6r8mvw', 1, 2, NULL, '2026-11-01T20:12:35.897Z', '2026-11-01T20:12:35.897Z'),
(E'cmvy9o5h500vmbogyad8erqi2', E'values-and-conduct', E'Values and Conduct', E'cmvy9o5h200vebogyma6r8mvw', 2, 3, NULL, '2026-11-01T20:12:35.897Z', '2026-11-01T20:12:35.897Z'),
(E'cmvy9o5h600vobogy591blf8y', E'sacred-texts', E'Sacred Texts', E'cmvy9o5h200vebogyma6r8mvw', 2, 4, NULL, '2026-11-01T20:12:35.898Z', '2026-11-01T20:12:35.898Z'),
(E'cmvy9o5h700vqbogy7y1pghdd', E'festivals-and-celebrations', E'Festivals and Celebrations', E'cmvy9o5h200vebogyma6r8mvw', 2, 5, NULL, '2026-11-01T20:12:35.899Z', '2026-11-01T20:12:35.899Z'),
(E'cmvy9o5h700vsbogy6gz2moql', E'community-life', E'Community Life', E'cmvy9o5h200vebogyma6r8mvw', 3, 6, NULL, '2026-11-01T20:12:35.900Z', '2026-11-01T20:12:35.900Z'),
(E'cmvy9o5h800vubogyradt3sfq', E'service-to-others', E'Service to Others', E'cmvy9o5h200vebogyma6r8mvw', 3, 7, NULL, '2026-11-01T20:12:35.901Z', '2026-11-01T20:12:35.901Z'),
(E'cmvy9o5h900vwbogy7r0d1aub', E'preparing-for-ple-re', E'Preparing for PLE RE', E'cmvy9o5h200vebogyma6r8mvw', 3, 8, NULL, '2026-11-01T20:12:35.902Z', '2026-11-01T20:12:35.902Z'),
(E'cmvy9o5hj00w0bogynvy7k8co', E'salamu-greetings', E'Salamu (Greetings)', E'cmvy9o5hd00vybogyywijp63d', 1, 0, NULL, '2026-11-01T20:12:35.911Z', '2026-11-01T20:12:35.911Z'),
(E'cmvy9o5hk00w2bogyfmzzd17r', E'nambari-numbers', E'Nambari (Numbers)', E'cmvy9o5hd00vybogyywijp63d', 1, 1, NULL, '2026-11-01T20:12:35.913Z', '2026-11-01T20:12:35.913Z'),
(E'cmvy9o5hl00w4bogyni6du214', E'familia-family', E'Familia (Family)', E'cmvy9o5hd00vybogyywijp63d', 2, 2, NULL, '2026-11-01T20:12:35.914Z', '2026-11-01T20:12:35.914Z'),
(E'cmvy9o5hm00w6bogypfi7091y', E'shuleni-at-school', E'Shuleni (At School)', E'cmvy9o5hd00vybogyywijp63d', 2, 3, NULL, '2026-11-01T20:12:35.914Z', '2026-11-01T20:12:35.914Z'),
(E'cmvy9o5hm00w8bogyhsb7im9k', E'vitenzi-verbs', E'Vitenzi (Verbs)', E'cmvy9o5hd00vybogyywijp63d', 3, 4, NULL, '2026-11-01T20:12:35.915Z', '2026-11-01T20:12:35.915Z'),
(E'cmvy9o5hn00wabogyjn9s0706', E'wakati-time', E'Wakati (Time)', E'cmvy9o5hd00vybogyywijp63d', 3, 5, NULL, '2026-11-01T20:12:35.915Z', '2026-11-01T20:12:35.915Z'),
(E'cmvy9o5ho00webogy0k23944i', E'parts-of-a-computer', E'Parts of a Computer', E'cmvy9o5hn00wcbogyyu8yrlxz', 1, 0, NULL, '2026-11-01T20:12:35.916Z', '2026-11-01T20:12:35.916Z'),
(E'cmvy9o5ho00wgbogyuq7ry9wg', E'keyboard-and-mouse-skills', E'Keyboard and Mouse Skills', E'cmvy9o5hn00wcbogyyu8yrlxz', 1, 1, NULL, '2026-11-01T20:12:35.917Z', '2026-11-01T20:12:35.917Z'),
(E'cmvy9o5ho00wibogy9sxsuq9s', E'word-processing', E'Word Processing', E'cmvy9o5hn00wcbogyyu8yrlxz', 2, 2, NULL, '2026-11-01T20:12:35.917Z', '2026-11-01T20:12:35.917Z'),
(E'cmvy9o5hp00wkbogyoo9od4ak', E'internet-safety', E'Internet Safety', E'cmvy9o5hn00wcbogyyu8yrlxz', 3, 3, NULL, '2026-11-01T20:12:35.917Z', '2026-11-01T20:12:35.917Z'),
(E'cmvy9o5hp00wobogyqoqw7apn', E'drawing-and-colour', E'Drawing and Colour', E'cmvy9o5hp00wmbogy8pucucvc', 1, 0, NULL, '2026-11-01T20:12:35.918Z', '2026-11-01T20:12:35.918Z'),
(E'cmvy9o5hq00wqbogy99hjqtyd', E'crafts', E'Crafts', E'cmvy9o5hp00wmbogy8pucucvc', 1, 1, NULL, '2026-11-01T20:12:35.918Z', '2026-11-01T20:12:35.918Z'),
(E'cmvy9o5hq00wsbogy02g586ml', E'songs-and-dance', E'Songs and Dance', E'cmvy9o5hp00wmbogy8pucucvc', 2, 2, NULL, '2026-11-01T20:12:35.919Z', '2026-11-01T20:12:35.919Z'),
(E'cmvy9o5hq00wubogy912gxb7f', E'games-and-athletics', E'Games and Athletics', E'cmvy9o5hp00wmbogy8pucucvc', 3, 3, NULL, '2026-11-01T20:12:35.919Z', '2026-11-01T20:12:35.919Z'),
(E'cmvy9o5hv00x2bogyl0l9iy3d', E'sets', E'Sets', E'cmvy9o5hu00x0bogydcfxqrp2', 1, 0, NULL, '2026-11-01T20:12:35.923Z', '2026-11-01T20:12:35.923Z'),
(E'cmvy9o5hw00x4bogyg2qgo6xc', E'numeration-and-bases', E'Numeration Systems and Number Bases', E'cmvy9o5hu00x0bogydcfxqrp2', 1, 1, NULL, '2026-11-01T20:12:35.924Z', '2026-11-01T20:12:35.924Z'),
(E'cmvy9o5hx00x6bogyb34ljx5f', E'operations-on-whole-numbers', E'Operations on Whole Numbers', E'cmvy9o5hu00x0bogydcfxqrp2', 1, 2, NULL, '2026-11-01T20:12:35.926Z', '2026-11-01T20:12:35.926Z'),
(E'cmvy9o5hy00x8bogyjfucxxs9', E'number-patterns', E'Number Patterns and Sequences', E'cmvy9o5hu00x0bogydcfxqrp2', 1, 3, NULL, '2026-11-01T20:12:35.926Z', '2026-11-01T20:12:35.926Z'),
(E'cmvy9o5hz00xabogyoyecgzk1', E'fractions-decimals-percentages', E'Fractions, Decimals and Percentages', E'cmvy9o5hu00x0bogydcfxqrp2', 2, 4, NULL, '2026-11-01T20:12:35.927Z', '2026-11-01T20:12:35.927Z'),
(E'cmvy9o5hz00xcbogyz0m236zo', E'ratio-and-proportion', E'Ratio and Proportion', E'cmvy9o5hu00x0bogydcfxqrp2', 2, 5, NULL, '2026-11-01T20:12:35.927Z', '2026-11-01T20:12:35.927Z'),
(E'cmvy9o5hz00xebogysgs2z0oa', E'geometry', E'Geometry: Construction and Properties', E'cmvy9o5hu00x0bogydcfxqrp2', 2, 6, NULL, '2026-11-01T20:12:35.928Z', '2026-11-01T20:12:35.928Z'),
(E'cmvy9o5i000xgbogyo2hgc2vq', E'data-handling', E'Data Handling: Mean, Mode and Median', E'cmvy9o5hu00x0bogydcfxqrp2', 2, 7, NULL, '2026-11-01T20:12:35.928Z', '2026-11-01T20:12:35.928Z'),
(E'cmvy9o5i000xibogymljzvwqc', E'measurement', E'Measurement: Area, Volume and Capacity', E'cmvy9o5hu00x0bogydcfxqrp2', 2, 8, NULL, '2026-11-01T20:12:35.928Z', '2026-11-01T20:12:35.928Z'),
(E'cmvy9o5i000xkbogyoao4sfw9', E'money-profit-and-loss', E'Money: Profit, Loss and Simple Interest', E'cmvy9o5hu00x0bogydcfxqrp2', 3, 9, NULL, '2026-11-01T20:12:35.929Z', '2026-11-01T20:12:35.929Z'),
(E'cmvy9o5i000xmbogyn3x94rg7', E'time-distance-speed', E'Time, Distance and Speed', E'cmvy9o5hu00x0bogydcfxqrp2', 3, 10, NULL, '2026-11-01T20:12:35.929Z', '2026-11-01T20:12:35.929Z'),
(E'cmvy9o5i100xobogypeyb1vq8', E'integers', E'Integers', E'cmvy9o5hu00x0bogydcfxqrp2', 3, 11, NULL, '2026-11-01T20:12:35.929Z', '2026-11-01T20:12:35.929Z'),
(E'cmvy9o5i100xqbogyl66003pp', E'algebra', E'Algebra', E'cmvy9o5hu00x0bogydcfxqrp2', 3, 12, NULL, '2026-11-01T20:12:35.929Z', '2026-11-01T20:12:35.929Z'),
(E'cmvy9o5i200xubogyr9rz0cxg', E'nouns-and-articles', E'Nouns, Articles and Plurals', E'cmvy9o5i100xsbogy2vbxdigr', 1, 0, NULL, '2026-11-01T20:12:35.930Z', '2026-11-01T20:12:35.930Z'),
(E'cmvy9o5i200xwbogynhmnjk1x', E'pronouns', E'Pronouns and Possessives', E'cmvy9o5i100xsbogy2vbxdigr', 1, 1, NULL, '2026-11-01T20:12:35.930Z', '2026-11-01T20:12:35.930Z'),
(E'cmvy9o5i200xybogy379pmtx8', E'verbs-and-tenses', E'Tenses', E'cmvy9o5i100xsbogy2vbxdigr', 1, 2, NULL, '2026-11-01T20:12:35.931Z', '2026-11-01T20:12:35.931Z'),
(E'cmvy9o5i200y0bogy2fsj63gg', E'adjectives-and-adverbs', E'Adjectives and Adverbs', E'cmvy9o5i100xsbogy2vbxdigr', 1, 3, NULL, '2026-11-01T20:12:35.931Z', '2026-11-01T20:12:35.931Z'),
(E'cmvy9o5i300y2bogybhsvwfsz', E'prepositions-and-conjunctions', E'Prepositions and Conjunctions', E'cmvy9o5i100xsbogy2vbxdigr', 2, 4, NULL, '2026-11-01T20:12:35.931Z', '2026-11-01T20:12:35.931Z'),
(E'cmvy9o5i300y4bogyj3c6rwzv', E'direct-and-indirect-speech', E'Direct and Indirect Speech', E'cmvy9o5i100xsbogy2vbxdigr', 2, 5, NULL, '2026-11-01T20:12:35.932Z', '2026-11-01T20:12:35.932Z'),
(E'cmvy9o5i400y6bogyujvjm7pa', E'comprehension', E'Comprehension and Summary', E'cmvy9o5i100xsbogy2vbxdigr', 2, 6, NULL, '2026-11-01T20:12:35.932Z', '2026-11-01T20:12:35.932Z'),
(E'cmvy9o5i400y8bogyvq3d2gqw', E'vocabulary', E'Vocabulary by Theme', E'cmvy9o5i100xsbogy2vbxdigr', 2, 7, NULL, '2026-11-01T20:12:35.932Z', '2026-11-01T20:12:35.932Z'),
(E'cmvy9o5i400yabogylmtguphr', E'composition', E'Composition: Narrative and Descriptive', E'cmvy9o5i100xsbogy2vbxdigr', 3, 8, NULL, '2026-11-01T20:12:35.933Z', '2026-11-01T20:12:35.933Z'),
(E'cmvy9o5i500ycbogyccjr36qu', E'letter-writing', E'Formal and Informal Letters', E'cmvy9o5i100xsbogy2vbxdigr', 3, 9, NULL, '2026-11-01T20:12:35.933Z', '2026-11-01T20:12:35.933Z'),
(E'cmvy9o5i500yebogyvr423t1f', E'punctuation', E'Punctuation', E'cmvy9o5i100xsbogy2vbxdigr', 3, 10, NULL, '2026-11-01T20:12:35.933Z', '2026-11-01T20:12:35.933Z'),
(E'cmvy9o5i500ygbogyrbv79lie', E'question-tags', E'Question Tags and Rewrites', E'cmvy9o5i100xsbogy2vbxdigr', 3, 11, NULL, '2026-11-01T20:12:35.934Z', '2026-11-01T20:12:35.934Z'),
(E'cmvy9o5i600ykbogyazece0in', E'classification', E'Classification of Living Things', E'cmvy9o5i600yibogyz9epzoab', 1, 0, NULL, '2026-11-01T20:12:35.934Z', '2026-11-01T20:12:35.934Z'),
(E'cmvy9o5i600ymbogyxelu21bf', E'circulatory-system', E'The Circulatory System', E'cmvy9o5i600yibogyz9epzoab', 1, 1, NULL, '2026-11-01T20:12:35.935Z', '2026-11-01T20:12:35.935Z'),
(E'cmvy9o5i700yobogyouxrt3uy', E'respiratory-system', E'The Respiratory System', E'cmvy9o5i600yibogyz9epzoab', 1, 2, NULL, '2026-11-01T20:12:35.935Z', '2026-11-01T20:12:35.935Z'),
(E'cmvy9o5i700yqbogy1iifk0ow', E'animal-reproduction', E'Reproduction in Animals', E'cmvy9o5i600yibogyz9epzoab', 1, 3, NULL, '2026-11-01T20:12:35.935Z', '2026-11-01T20:12:35.935Z'),
(E'cmvy9o5i700ysbogysy7np3rf', E'food-chains', E'Living Things and Their Environment', E'cmvy9o5i600yibogyz9epzoab', 2, 4, NULL, '2026-11-01T20:12:35.936Z', '2026-11-01T20:12:35.936Z'),
(E'cmvy9o5i800yubogyj0z5o59q', E'hiv-aids', E'HIV/AIDS and Immunity', E'cmvy9o5i600yibogyz9epzoab', 2, 5, NULL, '2026-11-01T20:12:35.936Z', '2026-11-01T20:12:35.936Z'),
(E'cmvy9o5i800ywbogyot5mb3pj', E'drugs-and-medicine', E'Drugs and Medicine', E'cmvy9o5i600yibogyz9epzoab', 2, 6, NULL, '2026-11-01T20:12:35.937Z', '2026-11-01T20:12:35.937Z'),
(E'cmvy9o5i900yybogy95w4s4tg', E'matter', E'Matter: Solids, Liquids and Gases', E'cmvy9o5i600yibogyz9epzoab', 2, 7, NULL, '2026-11-01T20:12:35.937Z', '2026-11-01T20:12:35.937Z'),
(E'cmvy9o5i900z0bogyuf8is8op', E'magnetism', E'Energy: Magnetism', E'cmvy9o5i600yibogyz9epzoab', 2, 8, NULL, '2026-11-01T20:12:35.937Z', '2026-11-01T20:12:35.937Z'),
(E'cmvy9o5i900z2bogy0tdlvpd7', E'livestock', E'Keeping Cattle, Goats and Pigs', E'cmvy9o5i600yibogyz9epzoab', 3, 9, NULL, '2026-11-01T20:12:35.938Z', '2026-11-01T20:12:35.938Z'),
(E'cmvy9o5ib00z4bogyf27ugpb3', E'beekeeping', E'Bee Keeping', E'cmvy9o5i600yibogyz9epzoab', 3, 10, NULL, '2026-11-01T20:12:35.940Z', '2026-11-01T20:12:35.940Z'),
(E'cmvy9o5ic00z6bogypat1vcro', E'fish-farming', E'Fish Farming', E'cmvy9o5i600yibogyz9epzoab', 3, 11, NULL, '2026-11-01T20:12:35.940Z', '2026-11-01T20:12:35.940Z'),
(E'cmvy9o5id00z8bogyfea5lzm1', E'crop-growing', E'Crop Growing', E'cmvy9o5i600yibogyz9epzoab', 3, 12, NULL, '2026-11-01T20:12:35.941Z', '2026-11-01T20:12:35.941Z'),
(E'cmvy9o5id00zcbogy4dyfqal3', E'location-of-east-africa', E'Location and Size of East Africa', E'cmvy9o5id00zabogydgno1szr', 1, 0, NULL, '2026-11-01T20:12:35.942Z', '2026-11-01T20:12:35.942Z'),
(E'cmvy9o5ie00zebogyvcbo0rd1', E'physical-features', E'Physical Features of East Africa', E'cmvy9o5id00zabogydgno1szr', 1, 1, NULL, '2026-11-01T20:12:35.942Z', '2026-11-01T20:12:35.942Z'),
(E'cmvy9o5ie00zgbogyy5t871wx', E'climate-and-vegetation', E'Climate and Vegetation of East Africa', E'cmvy9o5id00zabogydgno1szr', 1, 2, NULL, '2026-11-01T20:12:35.942Z', '2026-11-01T20:12:35.942Z'),
(E'cmvy9o5ie00zibogy5abqg5vz', E'people-and-settlement', E'Peoples of East Africa and Migrations', E'cmvy9o5id00zabogydgno1szr', 2, 3, NULL, '2026-11-01T20:12:35.943Z', '2026-11-01T20:12:35.943Z'),
(E'cmvy9o5if00zkbogycm5pd23i', E'coastal-trade', E'Early Visitors and Coastal Trade', E'cmvy9o5id00zabogydgno1szr', 2, 4, NULL, '2026-11-01T20:12:35.943Z', '2026-11-01T20:12:35.943Z'),
(E'cmvy9o5if00zmbogye2ziqywg', E'colonial-east-africa', E'Colonial Rule and Independence in East Africa', E'cmvy9o5id00zabogydgno1szr', 2, 5, NULL, '2026-11-01T20:12:35.944Z', '2026-11-01T20:12:35.944Z'),
(E'cmvy9o5if00zobogyep7qh0ax', E'east-african-community', E'The East African Community', E'cmvy9o5id00zabogydgno1szr', 3, 6, NULL, '2026-11-01T20:12:35.944Z', '2026-11-01T20:12:35.944Z'),
(E'cmvy9o5ig00zqbogy5ris67b0', E'economic-activities', E'Economic Activities in East Africa', E'cmvy9o5id00zabogydgno1szr', 3, 7, NULL, '2026-11-01T20:12:35.944Z', '2026-11-01T20:12:35.944Z'),
(E'cmvy9o5ig00zsbogy94z5v0yf', E'transport-and-trade', E'Transport, Communication and Trade', E'cmvy9o5id00zabogydgno1szr', 3, 8, NULL, '2026-11-01T20:12:35.944Z', '2026-11-01T20:12:35.944Z'),
(E'cmvy9o5ig00zubogymbnecf0s', E'governments', E'Governments of East Africa', E'cmvy9o5id00zabogydgno1szr', 3, 9, NULL, '2026-11-01T20:12:35.945Z', '2026-11-01T20:12:35.945Z'),
(E'cmvy9o5ih00zybogycm2a9c9h', E'god-s-creation', E'God''s Creation', E'cmvy9o5ig00zwbogysbrs0341', 1, 0, NULL, '2026-11-01T20:12:35.945Z', '2026-11-01T20:12:35.945Z'),
(E'cmvy9o5ih0100bogy0fjavet1', E'faith-and-worship', E'Faith and Worship', E'cmvy9o5ig00zwbogysbrs0341', 1, 1, NULL, '2026-11-01T20:12:35.946Z', '2026-11-01T20:12:35.946Z'),
(E'cmvy9o5ii0102bogyny8weviz', E'prophets-and-leaders', E'Prophets and Leaders', E'cmvy9o5ig00zwbogysbrs0341', 1, 2, NULL, '2026-11-01T20:12:35.946Z', '2026-11-01T20:12:35.946Z'),
(E'cmvy9o5ii0104bogyaqyqmuct', E'values-and-conduct', E'Values and Conduct', E'cmvy9o5ig00zwbogysbrs0341', 2, 3, NULL, '2026-11-01T20:12:35.947Z', '2026-11-01T20:12:35.947Z'),
(E'cmvy9o5ii0106bogyhxz05s4n', E'sacred-texts', E'Sacred Texts', E'cmvy9o5ig00zwbogysbrs0341', 2, 4, NULL, '2026-11-01T20:12:35.947Z', '2026-11-01T20:12:35.947Z'),
(E'cmvy9o5ij0108bogyp2lav67c', E'festivals-and-celebrations', E'Festivals and Celebrations', E'cmvy9o5ig00zwbogysbrs0341', 2, 5, NULL, '2026-11-01T20:12:35.947Z', '2026-11-01T20:12:35.947Z'),
(E'cmvy9o5ij010abogydpln2fdy', E'community-life', E'Community Life', E'cmvy9o5ig00zwbogysbrs0341', 3, 6, NULL, '2026-11-01T20:12:35.947Z', '2026-11-01T20:12:35.947Z'),
(E'cmvy9o5ij010cbogyhhm5jl5u', E'service-to-others', E'Service to Others', E'cmvy9o5ig00zwbogysbrs0341', 3, 7, NULL, '2026-11-01T20:12:35.948Z', '2026-11-01T20:12:35.948Z'),
(E'cmvy9o5ik010ebogyb4o5oafk', E'preparing-for-ple-re', E'Preparing for PLE RE', E'cmvy9o5ig00zwbogysbrs0341', 3, 8, NULL, '2026-11-01T20:12:35.948Z', '2026-11-01T20:12:35.948Z'),
(E'cmvy9o5ik010ibogybxcucfkc', E'salamu-greetings', E'Salamu (Greetings)', E'cmvy9o5ik010gbogytbwxr3uy', 1, 0, NULL, '2026-11-01T20:12:35.949Z', '2026-11-01T20:12:35.949Z'),
(E'cmvy9o5ik010kbogy466tpspv', E'nambari-numbers', E'Nambari (Numbers)', E'cmvy9o5ik010gbogytbwxr3uy', 1, 1, NULL, '2026-11-01T20:12:35.949Z', '2026-11-01T20:12:35.949Z'),
(E'cmvy9o5il010mbogyjggy20e6', E'familia-family', E'Familia (Family)', E'cmvy9o5ik010gbogytbwxr3uy', 2, 2, NULL, '2026-11-01T20:12:35.949Z', '2026-11-01T20:12:35.949Z'),
(E'cmvy9o5il010obogy4rqimig4', E'shuleni-at-school', E'Shuleni (At School)', E'cmvy9o5ik010gbogytbwxr3uy', 2, 3, NULL, '2026-11-01T20:12:35.950Z', '2026-11-01T20:12:35.950Z'),
(E'cmvy9o5il010qbogyv6w5300p', E'vitenzi-verbs', E'Vitenzi (Verbs)', E'cmvy9o5ik010gbogytbwxr3uy', 3, 4, NULL, '2026-11-01T20:12:35.950Z', '2026-11-01T20:12:35.950Z'),
(E'cmvy9o5im010sbogy5rfjgq9j', E'wakati-time', E'Wakati (Time)', E'cmvy9o5ik010gbogytbwxr3uy', 3, 5, NULL, '2026-11-01T20:12:35.950Z', '2026-11-01T20:12:35.950Z'),
(E'cmvy9o5im010wbogydvuu1iqj', E'parts-of-a-computer', E'Parts of a Computer', E'cmvy9o5im010ubogyrmhfvbdn', 1, 0, NULL, '2026-11-01T20:12:35.951Z', '2026-11-01T20:12:35.951Z'),
(E'cmvy9o5in010ybogymxvm8tc0', E'keyboard-and-mouse-skills', E'Keyboard and Mouse Skills', E'cmvy9o5im010ubogyrmhfvbdn', 1, 1, NULL, '2026-11-01T20:12:35.951Z', '2026-11-01T20:12:35.951Z'),
(E'cmvy9o5in0110bogyiwvnepwb', E'word-processing', E'Word Processing', E'cmvy9o5im010ubogyrmhfvbdn', 2, 2, NULL, '2026-11-01T20:12:35.951Z', '2026-11-01T20:12:35.951Z'),
(E'cmvy9o5in0112bogyjz2mrgly', E'internet-safety', E'Internet Safety', E'cmvy9o5im010ubogyrmhfvbdn', 3, 3, NULL, '2026-11-01T20:12:35.952Z', '2026-11-01T20:12:35.952Z'),
(E'cmvy9o5io0116bogyp04z850a', E'drawing-and-colour', E'Drawing and Colour', E'cmvy9o5io0114bogysrkw7py3', 1, 0, NULL, '2026-11-01T20:12:35.953Z', '2026-11-01T20:12:35.953Z'),
(E'cmvy9o5ip0118bogyccxuj1d4', E'crafts', E'Crafts', E'cmvy9o5io0114bogysrkw7py3', 1, 1, NULL, '2026-11-01T20:12:35.953Z', '2026-11-01T20:12:35.953Z'),
(E'cmvy9o5ip011abogy0jt07yha', E'songs-and-dance', E'Songs and Dance', E'cmvy9o5io0114bogysrkw7py3', 2, 2, NULL, '2026-11-01T20:12:35.954Z', '2026-11-01T20:12:35.954Z'),
(E'cmvy9o5ir011cbogyytwefp23', E'games-and-athletics', E'Games and Athletics', E'cmvy9o5io0114bogysrkw7py3', 3, 3, NULL, '2026-11-01T20:12:35.955Z', '2026-11-01T20:12:35.955Z'),
(E'cmvy9o5iu011kbogyj21wboqk', E'sets', E'Sets', E'cmvy9o5it011ibogyoeiiouhk', 1, 0, NULL, '2026-11-01T20:12:35.958Z', '2026-11-01T20:12:35.958Z'),
(E'cmvy9o5iu011mbogy38bnor6o', E'numeration-and-bases', E'Numeration Systems and Number Bases', E'cmvy9o5it011ibogyoeiiouhk', 1, 1, NULL, '2026-11-01T20:12:35.959Z', '2026-11-01T20:12:35.959Z'),
(E'cmvy9o5iv011obogy2gr0c8ji', E'operations-and-patterns', E'Operations on Numbers and Number Patterns', E'cmvy9o5it011ibogyoeiiouhk', 1, 2, NULL, '2026-11-01T20:12:35.959Z', '2026-11-01T20:12:35.959Z'),
(E'cmvy9o5iv011qbogys3gd4n0c', E'fractions-decimals-percentages', E'Fractions, Decimals and Percentages', E'cmvy9o5it011ibogyoeiiouhk', 1, 3, NULL, '2026-11-01T20:12:35.960Z', '2026-11-01T20:12:35.960Z'),
(E'cmvy9o5iw011sbogyko62vvjf', E'ratio-and-proportion', E'Ratio and Proportion', E'cmvy9o5it011ibogyoeiiouhk', 2, 4, NULL, '2026-11-01T20:12:35.960Z', '2026-11-01T20:12:35.960Z'),
(E'cmvy9o5iw011ubogyss3yw2sm', E'geometry', E'Geometry: Construction, Angles and Polygons', E'cmvy9o5it011ibogyoeiiouhk', 2, 5, NULL, '2026-11-01T20:12:35.960Z', '2026-11-01T20:12:35.960Z'),
(E'cmvy9o5iw011wbogy3nzm0nfz', E'data-handling', E'Data Handling and Graphs', E'cmvy9o5it011ibogyoeiiouhk', 2, 6, NULL, '2026-11-01T20:12:35.961Z', '2026-11-01T20:12:35.961Z'),
(E'cmvy9o5ix011ybogyxzjnbjy7', E'measurement', E'Measurement: Area, Volume and Circumference', E'cmvy9o5it011ibogyoeiiouhk', 2, 7, NULL, '2026-11-01T20:12:35.961Z', '2026-11-01T20:12:35.961Z'),
(E'cmvy9o5ix0120bogy4l72qn33', E'commercial-arithmetic', E'Commercial Arithmetic', E'cmvy9o5it011ibogyoeiiouhk', 2, 8, NULL, '2026-11-01T20:12:35.961Z', '2026-11-01T20:12:35.961Z'),
(E'cmvy9o5ix0122bogyhq3tvxbi', E'time-distance-speed', E'Time, Distance and Speed', E'cmvy9o5it011ibogyoeiiouhk', 3, 9, NULL, '2026-11-01T20:12:35.962Z', '2026-11-01T20:12:35.962Z'),
(E'cmvy9o5ix0124bogyrdxkmfmr', E'integers', E'Integers', E'cmvy9o5it011ibogyoeiiouhk', 3, 10, NULL, '2026-11-01T20:12:35.962Z', '2026-11-01T20:12:35.962Z'),
(E'cmvy9o5iy0126bogy3gc1ptrk', E'algebra', E'Algebra: Equations and Inequalities', E'cmvy9o5it011ibogyoeiiouhk', 3, 11, NULL, '2026-11-01T20:12:35.962Z', '2026-11-01T20:12:35.962Z'),
(E'cmvy9o5iy0128bogyeo9bq995', E'probability', E'Probability', E'cmvy9o5it011ibogyoeiiouhk', 3, 12, NULL, '2026-11-01T20:12:35.963Z', '2026-11-01T20:12:35.963Z'),
(E'cmvy9o5iz012cbogyy97y483u', E'nouns-and-articles', E'Nouns, Articles and Plurals', E'cmvy9o5iy012abogy57nynjx4', 1, 0, NULL, '2026-11-01T20:12:35.963Z', '2026-11-01T20:12:35.963Z'),
(E'cmvy9o5iz012ebogyiravuqzn', E'pronouns', E'Pronouns', E'cmvy9o5iy012abogy57nynjx4', 1, 1, NULL, '2026-11-01T20:12:35.963Z', '2026-11-01T20:12:35.963Z'),
(E'cmvy9o5iz012gbogyu7nca9f6', E'tenses', E'Tenses', E'cmvy9o5iy012abogy57nynjx4', 1, 2, NULL, '2026-11-01T20:12:35.964Z', '2026-11-01T20:12:35.964Z'),
(E'cmvy9o5j0012ibogymj1mx01w', E'adjectives-and-adverbs', E'Adjectives and Adverbs', E'cmvy9o5iy012abogy57nynjx4', 1, 3, NULL, '2026-11-01T20:12:35.964Z', '2026-11-01T20:12:35.964Z'),
(E'cmvy9o5j0012kbogybvrgemhl', E'prepositions-and-conjunctions', E'Prepositions and Conjunctions', E'cmvy9o5iy012abogy57nynjx4', 1, 4, NULL, '2026-11-01T20:12:35.964Z', '2026-11-01T20:12:35.964Z'),
(E'cmvy9o5j0012mbogyg0afmu2y', E'direct-and-indirect-speech', E'Direct and Indirect Speech', E'cmvy9o5iy012abogy57nynjx4', 2, 5, NULL, '2026-11-01T20:12:35.965Z', '2026-11-01T20:12:35.965Z'),
(E'cmvy9o5j0012obogyb8y8hivp', E'active-and-passive-voice', E'Active and Passive Voice', E'cmvy9o5iy012abogy57nynjx4', 2, 6, NULL, '2026-11-01T20:12:35.965Z', '2026-11-01T20:12:35.965Z'),
(E'cmvy9o5j1012qbogykv5gieny', E'question-tags', E'Question Tags and Sentence Rewrites', E'cmvy9o5iy012abogy57nynjx4', 2, 7, NULL, '2026-11-01T20:12:35.965Z', '2026-11-01T20:12:35.965Z'),
(E'cmvy9o5j1012sbogyqw6b89bb', E'comprehension', E'Comprehension and Summary', E'cmvy9o5iy012abogy57nynjx4', 2, 8, NULL, '2026-11-01T20:12:35.966Z', '2026-11-01T20:12:35.966Z'),
(E'cmvy9o5j1012ubogyvdidt6r5', E'vocabulary', E'Vocabulary by Theme', E'cmvy9o5iy012abogy57nynjx4', 3, 9, NULL, '2026-11-01T20:12:35.966Z', '2026-11-01T20:12:35.966Z'),
(E'cmvy9o5j2012wbogy73eqvhx1', E'composition', E'Composition Writing', E'cmvy9o5iy012abogy57nynjx4', 3, 10, NULL, '2026-11-01T20:12:35.966Z', '2026-11-01T20:12:35.966Z'),
(E'cmvy9o5j2012ybogyjzr2kuvs', E'functional-writing', E'Functional Writing: Letters, Notices and Dialogues', E'cmvy9o5iy012abogy57nynjx4', 3, 11, NULL, '2026-11-01T20:12:35.967Z', '2026-11-01T20:12:35.967Z'),
(E'cmvy9o5j30132bogy4n1qk37k', E'human-body-systems', E'Human Body Systems', E'cmvy9o5j20130bogyj0oufl7o', 1, 0, NULL, '2026-11-01T20:12:35.967Z', '2026-11-01T20:12:35.967Z'),
(E'cmvy9o5j30134bogyj7hlke4n', E'excretory-system', E'The Excretory System and Skin', E'cmvy9o5j20130bogyj0oufl7o', 1, 1, NULL, '2026-11-01T20:12:35.968Z', '2026-11-01T20:12:35.968Z'),
(E'cmvy9o5j30136bogy2cvv8xz7', E'nervous-system', E'The Nervous System and Sense Organs', E'cmvy9o5j20130bogyj0oufl7o', 1, 2, NULL, '2026-11-01T20:12:35.968Z', '2026-11-01T20:12:35.968Z'),
(E'cmvy9o5j40138bogywo1v7buj', E'communicable-diseases', E'Communicable Diseases and PHC', E'cmvy9o5j20130bogyj0oufl7o', 1, 3, NULL, '2026-11-01T20:12:35.968Z', '2026-11-01T20:12:35.968Z'),
(E'cmvy9o5j4013abogyaisg8hc1', E'plants-and-classification', E'Plants: Classification and Growth', E'cmvy9o5j20130bogyj0oufl7o', 2, 4, NULL, '2026-11-01T20:12:35.969Z', '2026-11-01T20:12:35.969Z'),
(E'cmvy9o5j4013cbogyqct535jm', E'animals-and-classification', E'Animals: Classification and Adaptation', E'cmvy9o5j20130bogyj0oufl7o', 2, 5, NULL, '2026-11-01T20:12:35.969Z', '2026-11-01T20:12:35.969Z'),
(E'cmvy9o5j5013ebogywukqkzne', E'environment-and-interdependence', E'Environment and Interdependence', E'cmvy9o5j20130bogyj0oufl7o', 2, 6, NULL, '2026-11-01T20:12:35.969Z', '2026-11-01T20:12:35.969Z'),
(E'cmvy9o5j5013gbogyli7vi5v1', E'matter-and-energy', E'Matter and Energy', E'cmvy9o5j20130bogyj0oufl7o', 2, 7, NULL, '2026-11-01T20:12:35.970Z', '2026-11-01T20:12:35.970Z'),
(E'cmvy9o5j5013ibogyqvsh5fvi', E'electricity', E'Electricity and Magnetism', E'cmvy9o5j20130bogyj0oufl7o', 2, 8, NULL, '2026-11-01T20:12:35.970Z', '2026-11-01T20:12:35.970Z'),
(E'cmvy9o5j6013kbogy24dwx3u2', E'light-and-sound', E'Light and Sound', E'cmvy9o5j20130bogyj0oufl7o', 3, 9, NULL, '2026-11-01T20:12:35.970Z', '2026-11-01T20:12:35.970Z'),
(E'cmvy9o5j6013mbogyd3bymglw', E'machines', E'Simple Machines and Technology', E'cmvy9o5j20130bogyj0oufl7o', 3, 10, NULL, '2026-11-01T20:12:35.971Z', '2026-11-01T20:12:35.971Z'),
(E'cmvy9o5j9013obogyklt6doin', E'agriculture', E'Crop and Animal Husbandry', E'cmvy9o5j20130bogyj0oufl7o', 3, 11, NULL, '2026-11-01T20:12:35.974Z', '2026-11-01T20:12:35.974Z'),
(E'cmvy9o5ja013qbogylngu99ar', E'population-and-health', E'Population, Health and Science in Society', E'cmvy9o5j20130bogyj0oufl7o', 3, 12, NULL, '2026-11-01T20:12:35.975Z', '2026-11-01T20:12:35.975Z'),
(E'cmvy9o5jb013ubogy3gfs6bdc', E'location-of-africa', E'Location and Size of Africa', E'cmvy9o5jb013sbogy22txr9li', 1, 0, NULL, '2026-11-01T20:12:35.976Z', '2026-11-01T20:12:35.976Z'),
(E'cmvy9o5jc013wbogyqrpa7yie', E'physical-features', E'Physical Features of Africa', E'cmvy9o5jb013sbogy22txr9li', 1, 1, NULL, '2026-11-01T20:12:35.976Z', '2026-11-01T20:12:35.976Z'),
(E'cmvy9o5jc013ybogy7n8lcknq', E'climate-and-vegetation', E'Climate and Vegetation of Africa', E'cmvy9o5jb013sbogy22txr9li', 1, 2, NULL, '2026-11-01T20:12:35.977Z', '2026-11-01T20:12:35.977Z'),
(E'cmvy9o5jd0140bogy431yfr08', E'peoples-of-africa', E'Peoples of Africa and Early Civilisations', E'cmvy9o5jb013sbogy22txr9li', 1, 3, NULL, '2026-11-01T20:12:35.977Z', '2026-11-01T20:12:35.977Z'),
(E'cmvy9o5jd0142bogyl6gnolwm', E'foreign-influence', E'Foreign Influence: Explorers, Missionaries and Traders', E'cmvy9o5jb013sbogy22txr9li', 2, 4, NULL, '2026-11-01T20:12:35.977Z', '2026-11-01T20:12:35.977Z'),
(E'cmvy9o5jd0144bogynt4aqtb0', E'colonialism', E'Colonialism and the Partition of Africa', E'cmvy9o5jb013sbogy22txr9li', 2, 5, NULL, '2026-11-01T20:12:35.978Z', '2026-11-01T20:12:35.978Z'),
(E'cmvy9o5jd0146bogyukll6qzs', E'independence', E'Nationalism and Independence Struggles', E'cmvy9o5jb013sbogy22txr9li', 2, 6, NULL, '2026-11-01T20:12:35.978Z', '2026-11-01T20:12:35.978Z'),
(E'cmvy9o5je0148bogyuwscv653', E'post-independence', E'Post-independence Africa', E'cmvy9o5jb013sbogy22txr9li', 2, 7, NULL, '2026-11-01T20:12:35.978Z', '2026-11-01T20:12:35.978Z'),
(E'cmvy9o5je014abogy5rakx6qh', E'regional-cooperation', E'Regional Co-operation: AU, EAC, ECOWAS, SADC', E'cmvy9o5jb013sbogy22txr9li', 3, 8, NULL, '2026-11-01T20:12:35.979Z', '2026-11-01T20:12:35.979Z'),
(E'cmvy9o5jf014cbogyd8m7ttkd', E'economic-development', E'Economic Development in Africa', E'cmvy9o5jb013sbogy22txr9li', 3, 9, NULL, '2026-11-01T20:12:35.980Z', '2026-11-01T20:12:35.980Z'),
(E'cmvy9o5jg014ebogysonigzpt', E'population', E'Population of Africa', E'cmvy9o5jb013sbogy22txr9li', 3, 10, NULL, '2026-11-01T20:12:35.980Z', '2026-11-01T20:12:35.980Z'),
(E'cmvy9o5jg014gbogyxycycjm7', E'world-organisations', E'Uganda and the World: UN and Commonwealth', E'cmvy9o5jb013sbogy22txr9li', 3, 11, NULL, '2026-11-01T20:12:35.980Z', '2026-11-01T20:12:35.980Z'),
(E'cmvy9o5jh014kbogyun4xac7w', E'god-s-creation', E'God''s Creation', E'cmvy9o5jg014ibogyzjbjhl1r', 1, 0, NULL, '2026-11-01T20:12:35.981Z', '2026-11-01T20:12:35.981Z'),
(E'cmvy9o5jh014mbogyqw9vaiku', E'faith-and-worship', E'Faith and Worship', E'cmvy9o5jg014ibogyzjbjhl1r', 1, 1, NULL, '2026-11-01T20:12:35.982Z', '2026-11-01T20:12:35.982Z'),
(E'cmvy9o5ji014obogyb4k35fjk', E'prophets-and-leaders', E'Prophets and Leaders', E'cmvy9o5jg014ibogyzjbjhl1r', 1, 2, NULL, '2026-11-01T20:12:35.982Z', '2026-11-01T20:12:35.982Z'),
(E'cmvy9o5ji014qbogyuem5klne', E'values-and-conduct', E'Values and Conduct', E'cmvy9o5jg014ibogyzjbjhl1r', 2, 3, NULL, '2026-11-01T20:12:35.982Z', '2026-11-01T20:12:35.982Z'),
(E'cmvy9o5ji014sbogy2vf3mjxq', E'sacred-texts', E'Sacred Texts', E'cmvy9o5jg014ibogyzjbjhl1r', 2, 4, NULL, '2026-11-01T20:12:35.983Z', '2026-11-01T20:12:35.983Z'),
(E'cmvy9o5jj014ubogynirwvc3o', E'festivals-and-celebrations', E'Festivals and Celebrations', E'cmvy9o5jg014ibogyzjbjhl1r', 2, 5, NULL, '2026-11-01T20:12:35.983Z', '2026-11-01T20:12:35.983Z'),
(E'cmvy9o5jj014wbogyplh2hecz', E'community-life', E'Community Life', E'cmvy9o5jg014ibogyzjbjhl1r', 3, 6, NULL, '2026-11-01T20:12:35.983Z', '2026-11-01T20:12:35.983Z'),
(E'cmvy9o5jj014ybogy1ur1g86t', E'service-to-others', E'Service to Others', E'cmvy9o5jg014ibogyzjbjhl1r', 3, 7, NULL, '2026-11-01T20:12:35.984Z', '2026-11-01T20:12:35.984Z'),
(E'cmvy9o5jk0150bogyolzelul8', E'preparing-for-ple-re', E'Preparing for PLE RE', E'cmvy9o5jg014ibogyzjbjhl1r', 3, 8, NULL, '2026-11-01T20:12:35.984Z', '2026-11-01T20:12:35.984Z'),
(E'cmvy9o5jk0154bogy26ruucnd', E'salamu-greetings', E'Salamu (Greetings)', E'cmvy9o5jk0152bogy712qcrtn', 1, 0, NULL, '2026-11-01T20:12:35.985Z', '2026-11-01T20:12:35.985Z'),
(E'cmvy9o5jl0156bogyd776qjje', E'nambari-numbers', E'Nambari (Numbers)', E'cmvy9o5jk0152bogy712qcrtn', 1, 1, NULL, '2026-11-01T20:12:35.985Z', '2026-11-01T20:12:35.985Z'),
(E'cmvy9o5jl0158bogyvqorg8kz', E'familia-family', E'Familia (Family)', E'cmvy9o5jk0152bogy712qcrtn', 2, 2, NULL, '2026-11-01T20:12:35.986Z', '2026-11-01T20:12:35.986Z'),
(E'cmvy9o5jm015abogyz05f47ef', E'shuleni-at-school', E'Shuleni (At School)', E'cmvy9o5jk0152bogy712qcrtn', 2, 3, NULL, '2026-11-01T20:12:35.986Z', '2026-11-01T20:12:35.986Z'),
(E'cmvy9o5jm015cbogyqobidzna', E'vitenzi-verbs', E'Vitenzi (Verbs)', E'cmvy9o5jk0152bogy712qcrtn', 3, 4, NULL, '2026-11-01T20:12:35.987Z', '2026-11-01T20:12:35.987Z'),
(E'cmvy9o5jn015ebogybrxqc9l3', E'wakati-time', E'Wakati (Time)', E'cmvy9o5jk0152bogy712qcrtn', 3, 5, NULL, '2026-11-01T20:12:35.987Z', '2026-11-01T20:12:35.987Z'),
(E'cmvy9o5jq015ibogyyberkauf', E'parts-of-a-computer', E'Parts of a Computer', E'cmvy9o5jn015gbogymdkooia5', 1, 0, NULL, '2026-11-01T20:12:35.991Z', '2026-11-01T20:12:35.991Z'),
(E'cmvy9o5jr015kbogyxd0opzf6', E'keyboard-and-mouse-skills', E'Keyboard and Mouse Skills', E'cmvy9o5jn015gbogymdkooia5', 1, 1, NULL, '2026-11-01T20:12:35.992Z', '2026-11-01T20:12:35.992Z'),
(E'cmvy9o5js015mbogye435b9wo', E'word-processing', E'Word Processing', E'cmvy9o5jn015gbogymdkooia5', 2, 2, NULL, '2026-11-01T20:12:35.992Z', '2026-11-01T20:12:35.992Z'),
(E'cmvy9o5jt015obogymjg2ocjc', E'internet-safety', E'Internet Safety', E'cmvy9o5jn015gbogymdkooia5', 3, 3, NULL, '2026-11-01T20:12:35.993Z', '2026-11-01T20:12:35.993Z'),
(E'cmvy9o5ju015sbogyi0h92n80', E'drawing-and-colour', E'Drawing and Colour', E'cmvy9o5jt015qbogyzvygwmz4', 1, 0, NULL, '2026-11-01T20:12:35.994Z', '2026-11-01T20:12:35.994Z'),
(E'cmvy9o5ju015ubogyag0vndzs', E'crafts', E'Crafts', E'cmvy9o5jt015qbogyzvygwmz4', 1, 1, NULL, '2026-11-01T20:12:35.995Z', '2026-11-01T20:12:35.995Z'),
(E'cmvy9o5ju015wbogyhvx4dvuq', E'songs-and-dance', E'Songs and Dance', E'cmvy9o5jt015qbogyzvygwmz4', 2, 2, NULL, '2026-11-01T20:12:35.995Z', '2026-11-01T20:12:35.995Z'),
(E'cmvy9o5jv015ybogy38q9fjqd', E'games-and-athletics', E'Games and Athletics', E'cmvy9o5jt015qbogyzvygwmz4', 3, 3, NULL, '2026-11-01T20:12:35.995Z', '2026-11-01T20:12:35.995Z')
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "Note" ("id", "slug", "title", "subjectId", "topicId", "summary", "content", "readingMinutes", "order", "sourceType", "sourceUrl", "pdfUrl", "attribution", "status", "authorId", "createdAt", "updatedAt") VALUES
(E'cmvy9o5lu01ekbogy6c8gf2gy', E'let-s-count-1-to-10', E'Let''s Count 1 to 10', E'cmvy9o59q000sbogy1rnuql4y', E'cmvy9o59r000wbogy9tc84rmw', E'Count with songs, fingers and pictures.', E'# Let''s Count! 🎈

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
', 3, 0, E'LOCAL', NULL, NULL, E'School Quest · NCDC-aligned notes', E'PUBLISHED', NULL, '2026-11-01T20:12:36.067Z', '2026-11-01T20:12:36.067Z'),
(E'cmvy9o5ma01fibogymvfyp5xz', E'clean-hands-happy-me', E'Clean Hands, Happy Me!', E'cmvy9o5a20024bogylq4715ld', E'cmvy9o5a20026bogyerd9yynb', E'When and how to wash hands.', E'# Clean Hands 🧼

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
', 3, 0, E'LOCAL', NULL, NULL, E'School Quest · NCDC-aligned notes', E'PUBLISHED', NULL, '2026-11-01T20:12:36.083Z', '2026-11-01T20:12:36.083Z'),
(E'cmvy9o5md01fwbogy1p81h41j', E'shapes-around-us', E'Shapes Around Us', E'cmvy9o5am004obogy7hkwase4', E'cmvy9o5an004ubogyl6v0qsqn', E'Circle, square, triangle and rectangle.', E'# Shapes 🔵🟥🔺

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
', 3, 0, E'LOCAL', NULL, NULL, E'School Quest · NCDC-aligned notes', E'PUBLISHED', NULL, '2026-11-01T20:12:36.086Z', '2026-11-01T20:12:36.086Z'),
(E'cmvy9o5mo01gubogy0a73wor9', E'letter-sounds-a-to-m', E'Letter Sounds a to m', E'cmvy9o5ap0058bogy5jve1q4p', E'cmvy9o5aq005cbogyohkg422o', E'Say the sound of each letter with a picture word.', E'# Letter Sounds 🔤

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
', 4, 0, E'LOCAL', NULL, NULL, E'School Quest · NCDC-aligned notes', E'PUBLISHED', NULL, '2026-11-01T20:12:36.097Z', '2026-11-01T20:12:36.097Z'),
(E'cmvy9o5mw01hobogyw65j7qff', E'adding-small-numbers', E'Adding Small Numbers', E'cmvy9o5be008kbogy6a21ec64', E'cmvy9o5bh0092bogyc9mqczpo', E'Put groups together and count all.', E'# Adding ➕

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
', 4, 0, E'LOCAL', NULL, NULL, E'School Quest · NCDC-aligned notes', E'PUBLISHED', NULL, '2026-11-01T20:12:36.104Z', '2026-11-01T20:12:36.104Z'),
(E'cmvy9o5n801iobogyvdzdbkg9', E'reading-three-letter-words', E'Reading Three-letter Words', E'cmvy9o5bi0094bogydnwdniyw', E'cmvy9o5bk009ebogyxgl6rjov', E'Blend sounds to read short words.', E'# Three-letter Words 📖

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
', 4, 0, E'LOCAL', NULL, NULL, E'School Quest · NCDC-aligned notes', E'PUBLISHED', NULL, '2026-11-01T20:12:36.117Z', '2026-11-01T20:12:36.117Z'),
(E'cmvy9o5nn01k0bogy9iq2a3ys', E'counting-and-writing-numbers-1-to-20', E'Counting and Writing Numbers 1 to 20', E'cmvy9o5cg00dwbogyh9lmye1w', E'cmvy9o5ch00e0bogy83340a1m', E'Count objects, read and write numbers and number names up to 20.', E'# Numbers 1 to 20

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
', 5, 0, E'LOCAL', NULL, NULL, E'School Quest · NCDC-aligned notes', E'PUBLISHED', NULL, '2026-11-01T20:12:36.131Z', '2026-11-01T20:12:36.131Z'),
(E'cmvy9o5o001labogyzdapoytu', E'naming-words', E'Naming Words', E'cmvy9o5cb00d6bogyl7x6p8v4', E'cmvy9o5cc00dcbogyf1kppo5r', E'Names of people, animals, places and things around us.', E'# Naming Words

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
', 4, 0, E'LOCAL', NULL, NULL, E'School Quest · NCDC-aligned notes', E'PUBLISHED', NULL, '2026-11-01T20:12:36.144Z', '2026-11-01T20:12:36.144Z'),
(E'cmvy9o5o501lybogyrrsl49ay', E'parts-of-my-body', E'Parts of My Body', E'cmvy9o5c100bwbogyrtqn7cf4', E'cmvy9o5c300c4bogy6bh7jg0n', E'Name the parts of the body, what they do, and how to keep them clean.', E'# Parts of My Body

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
', 5, 0, E'LOCAL', NULL, NULL, E'School Quest · NCDC-aligned notes', E'PUBLISHED', NULL, '2026-11-01T20:12:36.150Z', '2026-11-01T20:12:36.150Z'),
(E'cmvy9o5ob01mmbogyj7pf6w6t', E'multiplication-tables-of-2-3-5-and-10', E'Multiplication: Tables of 2, 3, 5 and 10', E'cmvy9o5db00i0bogyxud66mz1', E'cmvy9o5dd00iabogyep2sxwch', E'Multiplication as repeated addition, and the first multiplication tables.', E'# Multiplication

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
', 6, 0, E'LOCAL', NULL, NULL, E'School Quest · NCDC-aligned notes', E'PUBLISHED', NULL, '2026-11-01T20:12:36.156Z', '2026-11-01T20:12:36.156Z'),
(E'cmvy9o5on01nwbogyz6dc86pi', E'doing-words-yesterday-past-tense', E'Doing Words: Yesterday (Past Tense)', E'cmvy9o5d300habogyookpbn9c', E'cmvy9o5d500hibogy3n6gd008', E'Change doing words to tell about things that happened yesterday.', E'# Doing Words in the Past

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
', 5, 0, E'LOCAL', NULL, NULL, E'School Quest · NCDC-aligned notes', E'PUBLISHED', NULL, '2026-11-01T20:12:36.167Z', '2026-11-01T20:12:36.167Z'),
(E'cmvy9o5or01okbogyd4aqazvd', E'weather', E'Weather', E'cmvy9o5cw00g0bogya4oaoqqx', E'cmvy9o5cy00gabogyf5fne2r5', E'Types of weather, weather words and how weather affects what we do.', E'# Weather

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
', 5, 0, E'LOCAL', NULL, NULL, E'School Quest · NCDC-aligned notes', E'PUBLISHED', NULL, '2026-11-01T20:12:36.172Z', '2026-11-01T20:12:36.172Z'),
(E'cmvy9o5oz01p8bogycf7c1e7u', E'numbers-up-to-9-999-and-place-value', E'Numbers up to 9,999 and Place Value', E'cmvy9o5e600m4bogyennjiqe1', E'cmvy9o5e700m8bogyc8giyzwc', E'Read, write and break down numbers using thousands, hundreds, tens and ones.', E'# Numbers up to 9,999

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
', 6, 0, E'LOCAL', NULL, NULL, E'School Quest · NCDC-aligned notes', E'PUBLISHED', NULL, '2026-11-01T20:12:36.180Z', '2026-11-01T20:12:36.180Z'),
(E'cmvy9o5pb01qibogyftql7685', E'describing-words-and-comparing', E'Describing Words and Comparing', E'cmvy9o5dz00lebogyox84kgx9', E'cmvy9o5e100lobogy49v9lnye', E'Use adjectives and the -er / -est endings to compare two or more things.', E'# Describing Words (Adjectives)

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
', 5, 0, E'LOCAL', NULL, NULL, E'School Quest · NCDC-aligned notes', E'PUBLISHED', NULL, '2026-11-01T20:12:36.191Z', '2026-11-01T20:12:36.191Z'),
(E'cmvy9o5pl01robogyujae8pi6', E'living-things-plants', E'Living Things: Plants', E'cmvy9o5dr00k4bogy3jk9huwe', E'cmvy9o5dt00kebogyiaobv45l', E'Parts of a plant and their work, what plants need, and how plants are useful.', E'# Plants

Plants are **living things**. They grow, make food, and produce seeds.

## Parts of a plant and their work
| Part | Work |
|---|---|
| **Roots** | hold the plant firmly in the soil; take in water and mineral salts |
| **Stem** | holds up the leaves and flowers; carries water from roots to leaves |
| **Leaves** | make food for the plant using sunlight (the plant''s "kitchen") |
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
', 6, 0, E'LOCAL', NULL, NULL, E'School Quest · NCDC-aligned notes', E'PUBLISHED', NULL, '2026-11-01T20:12:36.201Z', '2026-11-01T20:12:36.201Z'),
(E'cmvy9o5pr01scbogywdyorfig', E'whole-numbers-and-place-value-up-to-99-999', E'Whole Numbers and Place Value (up to 99,999)', E'cmvy9o5eu00o8bogygh9plo8b', E'cmvy9o5f200ocbogyh1rtfg3n', E'Read, write, order and round whole numbers; understand place value and total value.', E'# Whole Numbers and Place Value

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
', 8, 0, E'LOCAL', NULL, NULL, E'School Quest · NCDC-aligned notes', E'PUBLISHED', NULL, '2026-11-01T20:12:36.207Z', '2026-11-01T20:12:36.207Z'),
(E'cmvy9o5pw01t4bogy75nlwdm2', E'fractions', E'Fractions', E'cmvy9o5eu00o8bogygh9plo8b', E'cmvy9o5fd00oibogyt0sney8j', E'Naming fractions, equivalent fractions, comparing, and adding/subtracting fractions with the same denominator.', E'# Fractions

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
', 8, 0, E'LOCAL', NULL, NULL, E'School Quest · NCDC-aligned notes', E'PUBLISHED', NULL, '2026-11-01T20:12:36.213Z', '2026-11-01T20:12:36.213Z'),
(E'cmvy9o5qh01ucbogypfbt5xs3', E'nouns-and-articles', E'Nouns and Articles', E'cmvy9o5fn00owbogy90vuop2s', E'cmvy9o5fo00oybogyam62r6t9', E'Common, proper, collective and abstract nouns; singular and plural; using a, an and the.', E'# Nouns

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
', 7, 0, E'LOCAL', NULL, NULL, E'School Quest · NCDC-aligned notes', E'PUBLISHED', NULL, '2026-11-01T20:12:36.233Z', '2026-11-01T20:12:36.233Z'),
(E'cmvy9o5s6020abogyh530qm8u', E'adjectives-and-comparison', E'Adjectives and Comparison', E'cmvy9o5gj00t8bogy6oatig5k', E'cmvy9o5gk00tgbogysxmh92j9', E'Describing words and the three degrees of comparison, including irregular forms.', E'# Adjectives

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
', 7, 0, E'LOCAL', NULL, NULL, E'School Quest · NCDC-aligned notes', E'PUBLISHED', NULL, '2026-11-01T20:12:36.294Z', '2026-11-01T20:12:36.294Z'),
(E'cmvy9o5qz01w8bogy6jyhzmoh', E'soil', E'Soil', E'cmvy9o5fr00pkbogycyzvb3zq', E'cmvy9o5fs00pobogyt3mpnmf2', E'What soil is made of, the three main types of soil, and how to keep soil fertile.', E'# Soil

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
', 7, 0, E'LOCAL', NULL, NULL, E'School Quest · NCDC-aligned notes', E'PUBLISHED', NULL, '2026-11-01T20:12:36.251Z', '2026-11-01T20:12:36.251Z'),
(E'cmvy9o5re01xibogy2wlnyt0f', E'map-work-symbols-directions-and-the-compass', E'Map Work: Symbols, Directions and the Compass', E'cmvy9o5fv00q8bogykbaxiig1', E'cmvy9o5fv00qcbogymjt0fdcs', E'Read simple maps, use the eight compass points, and understand symbols and the key.', E'# Map Work

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
', 7, 0, E'LOCAL', NULL, NULL, E'School Quest · NCDC-aligned notes', E'PUBLISHED', NULL, '2026-11-01T20:12:36.266Z', '2026-11-01T20:12:36.266Z'),
(E'cmvy9o5rp01ysbogydb5y2xld', E'decimals-and-percentages', E'Decimals and Percentages', E'cmvy9o5gc00sebogyqi6qlbkx', E'cmvy9o5gf00sqbogykwsui0y6', E'Place value of decimals, the four operations with decimals, and changing between decimals, fractions and percentages.', E'# Decimals

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
```
  12.50
+  3.75
-------
  16.25
```

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
', 9, 0, E'LOCAL', NULL, NULL, E'School Quest · NCDC-aligned notes', E'PUBLISHED', NULL, '2026-11-01T20:12:36.278Z', '2026-11-01T20:12:36.278Z'),
(E'cmvy9o5rv01zkbogy5aprkae6', E'measurement-perimeter-and-area', E'Measurement: Perimeter and Area', E'cmvy9o5gc00sebogyqi6qlbkx', E'cmvy9o5gg00swbogy7zh1ot9m', E'Units of length, converting between them, and finding perimeter and area of rectangles, squares and triangles.', E'# Measurement

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
', 8, 0, E'LOCAL', NULL, NULL, E'School Quest · NCDC-aligned notes', E'PUBLISHED', NULL, '2026-11-01T20:12:36.283Z', '2026-11-01T20:12:36.283Z'),
(E'cmvy9o5sb0210bogyzhyhqslj', E'informal-and-formal-letters', E'Informal and Formal Letters', E'cmvy9o5gj00t8bogy6oatig5k', E'cmvy9o5gm00tubogydc2ta9hf', E'The parts of a letter, the correct layout, and useful phrases for PLE composition.', E'# Letter Writing

## Informal (friendly) letter
Written to friends and relatives.

```
                                        St. Mary''s Primary School,
                                        P.O. Box 123,
                                        Mbarara.
                                        14th March, 2026.

Dear Grandmother,

[Paragraph 1: greeting and reason for writing]
[Paragraph 2–3: the body — news, description]
[Last paragraph: closing wishes]

                                        Your loving granddaughter,
                                        Joan
```
- **One address** (the writer''s) at the top right.
- **Date** under the address.
- **Salutation**: *Dear Mother, / Dear Peter,*
- **Ending**: *Yours sincerely, / Your loving son, / Your friend,*

## Formal (official) letter
Written to people in offices — head teacher, LC chairperson, a company.
- **Two addresses**: writer''s (top right) and receiver''s (left, below the date).
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
', 8, 0, E'LOCAL', NULL, NULL, E'School Quest · NCDC-aligned notes', E'PUBLISHED', NULL, '2026-11-01T20:12:36.300Z', '2026-11-01T20:12:36.300Z'),
(E'cmvy9o5sf021kbogy12iwh34j', E'the-digestive-system', E'The Digestive System', E'cmvy9o5gn00tybogybrqnqg16', E'cmvy9o5gp00u6bogyjtnogki3', E'The alimentary canal, what happens in each part, enzymes, and care of the digestive system.', E'# The Digestive System

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
Eat a balanced diet with fibre, chew food well, drink clean water, wash hands and fruits, avoid eating too fast, don''t skip meals, deworm regularly.
', 9, 0, E'LOCAL', NULL, NULL, E'School Quest · NCDC-aligned notes', E'PUBLISHED', NULL, '2026-11-01T20:12:36.304Z', '2026-11-01T20:12:36.304Z'),
(E'cmvy9o5sv0230bogyxr4ujxrb', E'physical-features-of-uganda', E'Physical Features of Uganda', E'cmvy9o5gs00uqbogyilx6aa2a', E'cmvy9o5gt00uubogyq12u4kya', E'Relief, drainage, mountains, lakes, rivers and how they were formed.', E'# Physical Features of Uganda

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
', 9, 0, E'LOCAL', NULL, NULL, E'School Quest · NCDC-aligned notes', E'PUBLISHED', NULL, '2026-11-01T20:12:36.320Z', '2026-11-01T20:12:36.320Z'),
(E'cmvy9o5t8024ibogyuiiowv18', E'ratio-and-proportion', E'Ratio and Proportion', E'cmvy9o5hu00x0bogydcfxqrp2', E'cmvy9o5hz00xcbogyz0m236zo', E'Simplify ratios, share quantities in a given ratio, and solve direct and inverse proportion problems.', E'# Ratio

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
', 9, 0, E'LOCAL', NULL, NULL, E'School Quest · NCDC-aligned notes', E'PUBLISHED', NULL, '2026-11-01T20:12:36.332Z', '2026-11-01T20:12:36.332Z'),
(E'cmvy9o5tc0258bogyxmpvs0mk', E'data-handling-mean-mode-median-and-graphs', E'Data Handling: Mean, Mode, Median and Graphs', E'cmvy9o5hu00x0bogydcfxqrp2', E'cmvy9o5i000xgbogyo2hgc2vq', E'Averages, range, and reading and drawing bar graphs, pie charts and line graphs.', E'# Data Handling

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
', 8, 0, E'LOCAL', NULL, NULL, E'School Quest · NCDC-aligned notes', E'PUBLISHED', NULL, '2026-11-01T20:12:36.337Z', '2026-11-01T20:12:36.337Z'),
(E'cmvy9o5tt026gbogyd8duwnts', E'composition-writing-narrative-and-descriptive', E'Composition Writing: Narrative and Descriptive', E'cmvy9o5i100xsbogy2vbxdigr', E'cmvy9o5i400yabogylmtguphr', E'Plan, write and check a good composition — the structure examiners reward.', E'# Composition Writing

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
', 8, 0, E'LOCAL', NULL, NULL, E'School Quest · NCDC-aligned notes', E'PUBLISHED', NULL, '2026-11-01T20:12:36.353Z', '2026-11-01T20:12:36.353Z'),
(E'cmvy9o5u0026wbogylsoi5da1', E'classification-of-living-things', E'Classification of Living Things', E'cmvy9o5i600yibogyz9epzoab', E'cmvy9o5i600ykbogyazece0in', E'The characteristics of living things and the main groups of plants and animals.', E'# Classification of Living Things

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
', 9, 0, E'LOCAL', NULL, NULL, E'School Quest · NCDC-aligned notes', E'PUBLISHED', NULL, '2026-11-01T20:12:36.360Z', '2026-11-01T20:12:36.360Z'),
(E'cmvy9o5uq029ibogyalx48fx6', E'sets-symbols-venn-diagrams-and-problems', E'Sets: Symbols, Venn Diagrams and Problems', E'cmvy9o5it011ibogyoeiiouhk', E'cmvy9o5iu011kbogyj21wboqk', E'Revise set language, Venn diagrams with two sets, and the PLE style ''n(A ∪ B)'' problems.', E'# Sets

A **set** is a well-defined collection of objects called **members** or **elements**. We write sets with curly brackets, e.g. `A = {2, 4, 6, 8}`.

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
| A'' | complement of A (members not in A) | |

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
', 10, 0, E'LOCAL', NULL, NULL, E'School Quest · NCDC-aligned notes', E'PUBLISHED', NULL, '2026-11-01T20:12:36.387Z', '2026-11-01T20:12:36.387Z'),
(E'cmvy9o5uz02a6bogy74x74767', E'fractions-decimals-and-percentages', E'Fractions, Decimals and Percentages', E'cmvy9o5it011ibogyoeiiouhk', E'cmvy9o5iv011qbogys3gd4n0c', E'Convert between the three forms, operate with fractions, and solve PLE word problems.', E'# Fractions, Decimals and Percentages

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
', 12, 0, E'LOCAL', NULL, NULL, E'School Quest · NCDC-aligned notes', E'PUBLISHED', NULL, '2026-11-01T20:12:36.396Z', '2026-11-01T20:12:36.396Z'),
(E'cmvy9o5v502aubogyx8tjgqt8', E'algebra-equations-and-inequalities', E'Algebra: Equations and Inequalities', E'cmvy9o5it011ibogyoeiiouhk', E'cmvy9o5iy0126bogy3gc1ptrk', E'Simplify expressions, solve linear equations and inequalities, and form equations from word problems.', E'# Algebra

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
"Okello is 3 years older than twice Amina''s age. Their total age is 27."
- Let Amina = a. Okello = 2a + 3.
- a + 2a + 3 = 27 → 3a = 24 → **a = 8**, Okello = 19.

## Angles and algebra
Angles on a straight line add to 180°: (2x + 30)° + x° = 180° → 3x = 150 → **x = 50**.
', 10, 0, E'LOCAL', NULL, NULL, E'School Quest · NCDC-aligned notes', E'PUBLISHED', NULL, '2026-11-01T20:12:36.402Z', '2026-11-01T20:12:36.402Z'),
(E'cmvy9o5ve02bibogykk7cn9es', E'commercial-arithmetic-profit-loss-discount-and-interest', E'Commercial Arithmetic: Profit, Loss, Discount and Interest', E'cmvy9o5it011ibogyoeiiouhk', E'cmvy9o5ix0120bogy4l72qn33', E'Money problems that appear every year in PLE Section B.', E'# Commercial Arithmetic

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
', 10, 0, E'LOCAL', NULL, NULL, E'School Quest · NCDC-aligned notes', E'PUBLISHED', NULL, '2026-11-01T20:12:36.410Z', '2026-11-01T20:12:36.410Z'),
(E'cmvy9o5vj02c6bogyx4aruii5', E'tenses-present-past-future-and-perfect', E'Tenses: Present, Past, Future and Perfect', E'cmvy9o5iy012abogy57nynjx4', E'cmvy9o5iz012gbogyu7nca9f6', E'Master the 12 tenses tested in PLE Section A with signal words and sentence patterns.', E'# Tenses

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
- Future: She **will be walking** at 8 o''clock.

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
', 10, 0, E'LOCAL', NULL, NULL, E'School Quest · NCDC-aligned notes', E'PUBLISHED', NULL, '2026-11-01T20:12:36.415Z', '2026-11-01T20:12:36.415Z'),
(E'cmvy9o5vo02cubogydbfbhoni', E'active-and-passive-voice', E'Active and Passive Voice', E'cmvy9o5iy012abogy57nynjx4', E'cmvy9o5j0012obogyb8y8hivp', E'Change sentences from active to passive in all common tenses.', E'# Active and Passive Voice

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
', 8, 0, E'LOCAL', NULL, NULL, E'School Quest · NCDC-aligned notes', E'PUBLISHED', NULL, '2026-11-01T20:12:36.421Z', '2026-11-01T20:12:36.421Z'),
(E'cmvy9o5vx02debogyuq6muplp', E'direct-and-indirect-reported-speech', E'Direct and Indirect (Reported) Speech', E'cmvy9o5iy012abogy57nynjx4', E'cmvy9o5j0012mbogyg0afmu2y', E'Change what people said into reported speech with the correct tense and pronoun shifts.', E'# Direct and Indirect Speech

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
*"Don''t make noise," she said.* → *She told us not to make noise.*
', 8, 0, E'LOCAL', NULL, NULL, E'School Quest · NCDC-aligned notes', E'PUBLISHED', NULL, '2026-11-01T20:12:36.430Z', '2026-11-01T20:12:36.430Z'),
(E'cmvy9o5w602eibogy2ezd93qr', E'the-circulatory-and-respiratory-systems', E'The Circulatory and Respiratory Systems', E'cmvy9o5j20130bogyj0oufl7o', E'cmvy9o5j30132bogy4n1qk37k', E'The heart, blood, blood vessels, breathing and gaseous exchange — PLE essentials.', E'# The Circulatory System

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
', 12, 0, E'LOCAL', NULL, NULL, E'School Quest · NCDC-aligned notes', E'PUBLISHED', NULL, '2026-11-01T20:12:36.438Z', '2026-11-01T20:12:36.438Z'),
(E'cmvy9o5we02fcbogyqjr08odx', E'electricity-and-magnetism', E'Electricity and Magnetism', E'cmvy9o5j20130bogyj0oufl7o', E'cmvy9o5j5013ibogyqvsh5fvi', E'Static and current electricity, circuits, conductors, safety and magnets.', E'# Electricity

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
', 10, 0, E'LOCAL', NULL, NULL, E'School Quest · NCDC-aligned notes', E'PUBLISHED', NULL, '2026-11-01T20:12:36.447Z', '2026-11-01T20:12:36.447Z'),
(E'cmvy9o5wl02g4bogyg7zb4gs0', E'communicable-diseases-and-primary-health-care', E'Communicable Diseases and Primary Health Care', E'cmvy9o5j20130bogyj0oufl7o', E'cmvy9o5j40138bogywo1v7buj', E'Germs, how diseases spread, the big disease groups and the eight elements of PHC.', E'# Communicable Diseases

A **communicable disease** can be passed from one person to another. It is caused by **germs** (pathogens): **bacteria, viruses, fungi and protozoa**.

## How diseases spread and examples
| Route | Examples | Prevention |
|---|---|---|
| **Air (droplets)** | TB, measles, influenza, whooping cough, COVID-19 | ventilation, cover the mouth, immunisation |
| **Contaminated food and water (faecal–oral)** | cholera, typhoid, dysentery, polio, diarrhoea | boil water, wash hands, use latrines, cover food |
| **Vectors** | malaria (female *Anopheles* mosquito), sleeping sickness (tsetse fly), plague (fleas), bilharzia (water snail) | mosquito nets, clear bushes, drain stagnant water |
| **Direct contact / body fluids** | HIV/AIDS, scabies, ringworm, trachoma | avoid sharing sharp objects, personal hygiene |
| **Soil (bare feet)** | hookworm, tetanus | wear shoes, immunise |

## Immunisable diseases (Uganda''s routine schedule)
Tuberculosis (BCG), polio (OPV), diphtheria, whooping cough (pertussis), tetanus, hepatitis B, *Haemophilus influenzae* type b (the **pentavalent** vaccine covers the last five), pneumonia (PCV), rotavirus diarrhoea, measles-rubella, yellow fever, HPV for girls.

- **Immunity** is the body''s ability to resist disease. **Natural** immunity comes from recovering from a disease or from breast milk; **artificial** immunity comes from vaccines.

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
', 10, 0, E'LOCAL', NULL, NULL, E'School Quest · NCDC-aligned notes', E'PUBLISHED', NULL, '2026-11-01T20:12:36.453Z', '2026-11-01T20:12:36.453Z'),
(E'cmvy9o5ws02gubogyl8b02xb7', E'location-size-and-position-of-africa', E'Location, Size and Position of Africa', E'cmvy9o5jb013sbogy22txr9li', E'cmvy9o5jb013ubogy3gfs6bdc', E'Africa''s position on the globe, its neighbours, lines of latitude and longitude, and map skills.', E'# Location of Africa

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
', 8, 0, E'LOCAL', NULL, NULL, E'School Quest · NCDC-aligned notes', E'PUBLISHED', NULL, '2026-11-01T20:12:36.460Z', '2026-11-01T20:12:36.460Z'),
(E'cmvy9o5x102hmbogyc5k973jc', E'foreign-influence-explorers-missionaries-and-traders', E'Foreign Influence: Explorers, Missionaries and Traders', E'cmvy9o5jb013sbogy22txr9li', E'cmvy9o5jd0142bogyl6gnolwm', E'Who came to Africa before colonial rule, why they came and what they changed.', E'# Foreign Influence in Africa

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
**Negative effects:** religious wars (1888–1892 in Buganda), undermined African culture and chiefs'' authority, paved the way for colonial rule.

## 4. The Slave Trade
- **Trans-Atlantic** (West Africa → Americas, 15th–19th century, "triangular trade"). 
- **Indian Ocean / East African** trade run by Arabs via Zanzibar.
- Abolished through efforts of **William Wilberforce**, Granville Sharp; the 1807 British Act; Frere Treaty with Sultan Barghash (1873) closed the Zanzibar slave market.
', 10, 0, E'LOCAL', NULL, NULL, E'School Quest · NCDC-aligned notes', E'PUBLISHED', NULL, '2026-11-01T20:12:36.469Z', '2026-11-01T20:12:36.469Z'),
(E'cmvy9o5x802iebogyvcst721a', E'regional-co-operation-eac-au-and-others', E'Regional Co-operation: EAC, AU and Others', E'cmvy9o5jb013sbogy22txr9li', E'cmvy9o5je014abogy5rakx6qh', E'The organisations Africa uses to work together, their aims, members and headquarters.', E'# Regional Co-operation in Africa

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
', 8, 0, E'LOCAL', NULL, NULL, E'School Quest · NCDC-aligned notes', E'PUBLISHED', NULL, '2026-11-01T20:12:36.477Z', '2026-11-01T20:12:36.477Z')
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "Paper" ("id", "title", "description", "kind", "year", "term", "examBody", "subjectId", "classGradeId", "topicId", "pdfUrl", "sourceUrl", "sourceType", "attribution", "externalId", "status", "durationMinutes", "difficulty", "authorId", "createdAt", "updatedAt") VALUES
(E'cmvy9o5lw01embogyhx8ag78r', E'Counting fun', NULL, E'TOPIC_QUIZ', NULL, NULL, NULL, E'cmvy9o59q000sbogy1rnuql4y', E'cmvy9o59e0006bogycgciciu8', E'cmvy9o59r000wbogy9tc84rmw', NULL, NULL, E'LOCAL', E'School Quest practice set', E'quiz:baby:mathematical-concepts:counting-1-to-10', E'PUBLISHED', 16, E'MEDIUM', NULL, '2026-11-01T20:12:36.069Z', '2026-11-01T20:12:36.069Z'),
(E'cmvy9o5m701f4bogycj0cn4fa', E'My body', NULL, E'TOPIC_QUIZ', NULL, NULL, NULL, E'cmvy9o59g0008bogyf7kym6wn', E'cmvy9o59e0006bogycgciciu8', E'cmvy9o59p000kbogyd2wpg9og', NULL, NULL, E'LOCAL', E'School Quest practice set', E'quiz:baby:language-development:parts-of-the-body', E'PUBLISHED', 12, E'MEDIUM', NULL, '2026-11-01T20:12:36.080Z', '2026-11-01T20:12:36.080Z'),
(E'cmvy9o5mb01fkbogyruwwe57z', E'Topic practice', NULL, E'TOPIC_QUIZ', NULL, NULL, NULL, E'cmvy9o5a20024bogylq4715ld', E'cmvy9o59e0006bogycgciciu8', E'cmvy9o5a20026bogyerd9yynb', NULL, NULL, E'LOCAL', E'School Quest practice set', E'quiz:baby:health-habits:washing-hands', E'PUBLISHED', 10, E'MEDIUM', NULL, '2026-11-01T20:12:36.083Z', '2026-11-01T20:12:36.083Z'),
(E'cmvy9o5mh01fybogyvlc6xo83', E'Topic practice', NULL, E'TOPIC_QUIZ', NULL, NULL, NULL, E'cmvy9o5am004obogy7hkwase4', E'cmvy9o5ai0042bogya4q2rot5', E'cmvy9o5an004ubogyl6v0qsqn', NULL, NULL, E'LOCAL', E'School Quest practice set', E'quiz:middle:mathematical-concepts:shapes-around-us', E'PUBLISHED', 14, E'MEDIUM', NULL, '2026-11-01T20:12:36.089Z', '2026-11-01T20:12:36.089Z'),
(E'cmvy9o5ml01gebogynm2sutry', E'Counting to 20', NULL, E'TOPIC_QUIZ', NULL, NULL, NULL, E'cmvy9o5am004obogy7hkwase4', E'cmvy9o5ai0042bogya4q2rot5', E'cmvy9o5ap0054bogy2vg0eyda', NULL, NULL, E'LOCAL', E'School Quest practice set', E'quiz:middle:mathematical-concepts:counting-to-20', E'PUBLISHED', 14, E'MEDIUM', NULL, '2026-11-01T20:12:36.094Z', '2026-11-01T20:12:36.094Z'),
(E'cmvy9o5mp01gwbogy2kjxks8l', E'Topic practice', NULL, E'TOPIC_QUIZ', NULL, NULL, NULL, E'cmvy9o5ap0058bogy5jve1q4p', E'cmvy9o5ai0042bogya4q2rot5', E'cmvy9o5aq005cbogyohkg422o', NULL, NULL, E'LOCAL', E'School Quest practice set', E'quiz:middle:reading:letter-sounds-a-m', E'PUBLISHED', 12, E'MEDIUM', NULL, '2026-11-01T20:12:36.097Z', '2026-11-01T20:12:36.097Z'),
(E'cmvy9o5ms01habogy3mlhdsnh', E'My family', NULL, E'TOPIC_QUIZ', NULL, NULL, NULL, E'cmvy9o5az006ebogy72t0rwzu', E'cmvy9o5ai0042bogya4q2rot5', E'cmvy9o5b0006ibogyyto95jdf', NULL, NULL, E'LOCAL', E'School Quest practice set', E'quiz:middle:social-development:my-family', E'PUBLISHED', 12, E'MEDIUM', NULL, '2026-11-01T20:12:36.101Z', '2026-11-01T20:12:36.101Z'),
(E'cmvy9o5n001hqbogy8uqcmmiq', E'Topic practice', NULL, E'TOPIC_QUIZ', NULL, NULL, NULL, E'cmvy9o5be008kbogy6a21ec64', E'cmvy9o5b8007ybogy0eothz8e', E'cmvy9o5bh0092bogyc9mqczpo', NULL, NULL, E'LOCAL', E'School Quest practice set', E'quiz:top:mathematical-concepts:simple-addition', E'PUBLISHED', 16, E'MEDIUM', NULL, '2026-11-01T20:12:36.108Z', '2026-11-01T20:12:36.108Z'),
(E'cmvy9o5n501i8bogy0lkktgtm', E'Writing numbers', NULL, E'TOPIC_QUIZ', NULL, NULL, NULL, E'cmvy9o5be008kbogy6a21ec64', E'cmvy9o5b8007ybogy0eothz8e', E'cmvy9o5bg008wbogybmvbxysp', NULL, NULL, E'LOCAL', E'School Quest practice set', E'quiz:top:mathematical-concepts:number-writing', E'PUBLISHED', 14, E'MEDIUM', NULL, '2026-11-01T20:12:36.113Z', '2026-11-01T20:12:36.113Z'),
(E'cmvy9o5n901iqbogytmn9sje8', E'Topic practice', NULL, E'TOPIC_QUIZ', NULL, NULL, NULL, E'cmvy9o5bi0094bogydnwdniyw', E'cmvy9o5b8007ybogy0eothz8e', E'cmvy9o5bk009ebogyxgl6rjov', NULL, NULL, E'LOCAL', E'School Quest practice set', E'quiz:top:reading:three-letter-words', E'PUBLISHED', 16, E'MEDIUM', NULL, '2026-11-01T20:12:36.117Z', '2026-11-01T20:12:36.117Z'),
(E'cmvy9o5nf01j8bogy7ec2hex2', E'Writing letters and my name', NULL, E'TOPIC_QUIZ', NULL, NULL, NULL, E'cmvy9o5bk009ibogylit0hl1o', E'cmvy9o5b8007ybogy0eothz8e', E'cmvy9o5bm009sbogy5ex5bufq', NULL, NULL, E'LOCAL', E'School Quest practice set', E'quiz:top:writing:writing-my-name', E'PUBLISHED', 12, E'MEDIUM', NULL, '2026-11-01T20:12:36.124Z', '2026-11-01T20:12:36.124Z'),
(E'cmvy9o5nk01jmbogygm2y7x7q', E'Greetings', NULL, E'TOPIC_QUIZ', NULL, NULL, NULL, E'cmvy9o5br00aobogymwmr6xfn', E'cmvy9o5b8007ybogy0eothz8e', E'cmvy9o5bt00aqbogyrkd53v7a', NULL, NULL, E'LOCAL', E'School Quest practice set', E'quiz:top:english:greetings', E'PUBLISHED', 12, E'MEDIUM', NULL, '2026-11-01T20:12:36.129Z', '2026-11-01T20:12:36.129Z'),
(E'cmvy9o5nn01k2bogy8xgls6po', E'Topic practice', NULL, E'TOPIC_QUIZ', NULL, NULL, NULL, E'cmvy9o5cg00dwbogyh9lmye1w', E'cmvy9o5c100bubogyxobqklrl', E'cmvy9o5ch00e0bogy83340a1m', NULL, NULL, E'LOCAL', E'School Quest practice set', E'quiz:p1:mathematics:numbers-1-20', E'PUBLISHED', 20, E'MEDIUM', NULL, '2026-11-01T20:12:36.132Z', '2026-11-01T20:12:36.132Z'),
(E'cmvy9o5ns01kobogydwl7j6em', E'Addition within 20', NULL, E'TOPIC_QUIZ', NULL, NULL, NULL, E'cmvy9o5cg00dwbogyh9lmye1w', E'cmvy9o5c100bubogyxobqklrl', E'cmvy9o5ci00e2bogy1n4gwjy3', NULL, NULL, E'LOCAL', E'School Quest practice set', E'quiz:p1:mathematics:addition-within-20', E'PUBLISHED', 20, E'MEDIUM', NULL, '2026-11-01T20:12:36.137Z', '2026-11-01T20:12:36.137Z'),
(E'cmvy9o5o101lcbogyfi63xpgn', E'Topic practice', NULL, E'TOPIC_QUIZ', NULL, NULL, NULL, E'cmvy9o5cb00d6bogyl7x6p8v4', E'cmvy9o5c100bubogyxobqklrl', E'cmvy9o5cc00dcbogyf1kppo5r', NULL, NULL, E'LOCAL', E'School Quest practice set', E'quiz:p1:english:naming-words-nouns', E'PUBLISHED', 20, E'MEDIUM', NULL, '2026-11-01T20:12:36.145Z', '2026-11-01T20:12:36.145Z'),
(E'cmvy9o5o601m0bogyplfgidpj', E'Topic practice', NULL, E'TOPIC_QUIZ', NULL, NULL, NULL, E'cmvy9o5c100bwbogyrtqn7cf4', E'cmvy9o5c100bubogyxobqklrl', E'cmvy9o5c300c4bogy6bh7jg0n', NULL, NULL, E'LOCAL', E'School Quest practice set', E'quiz:p1:literacy-1:theme-4-the-human-body-and-health', E'PUBLISHED', 20, E'MEDIUM', NULL, '2026-11-01T20:12:36.151Z', '2026-11-01T20:12:36.151Z'),
(E'cmvy9o5oc01mobogysjjm2biv', E'Topic practice', NULL, E'TOPIC_QUIZ', NULL, NULL, NULL, E'cmvy9o5db00i0bogyxud66mz1', E'cmvy9o5cv00fybogyd4k5smyq', E'cmvy9o5dd00iabogyep2sxwch', NULL, NULL, E'LOCAL', E'School Quest practice set', E'quiz:p2:mathematics:multiplication-2-3-5-10', E'PUBLISHED', 20, E'MEDIUM', NULL, '2026-11-01T20:12:36.156Z', '2026-11-01T20:12:36.156Z'),
(E'cmvy9o5oj01nabogye3prrpbr', E'Time: clock and calendar', NULL, E'TOPIC_QUIZ', NULL, NULL, NULL, E'cmvy9o5db00i0bogyxud66mz1', E'cmvy9o5cv00fybogyd4k5smyq', E'cmvy9o5de00ikbogyb1trsyx5', NULL, NULL, E'LOCAL', E'School Quest practice set', E'quiz:p2:mathematics:time-clock-and-calendar', E'PUBLISHED', 20, E'MEDIUM', NULL, '2026-11-01T20:12:36.163Z', '2026-11-01T20:12:36.163Z'),
(E'cmvy9o5on01nybogy3fmg5wsc', E'Topic practice', NULL, E'TOPIC_QUIZ', NULL, NULL, NULL, E'cmvy9o5d300habogyookpbn9c', E'cmvy9o5cv00fybogyd4k5smyq', E'cmvy9o5d500hibogy3n6gd008', NULL, NULL, E'LOCAL', E'School Quest practice set', E'quiz:p2:english:verbs-past-tense', E'PUBLISHED', 20, E'MEDIUM', NULL, '2026-11-01T20:12:36.168Z', '2026-11-01T20:12:36.168Z'),
(E'cmvy9o5os01ombogyg3wvt4b5', E'Topic practice', NULL, E'TOPIC_QUIZ', NULL, NULL, NULL, E'cmvy9o5cw00g0bogya4oaoqqx', E'cmvy9o5cv00fybogyd4k5smyq', E'cmvy9o5cy00gabogyf5fne2r5', NULL, NULL, E'LOCAL', E'School Quest practice set', E'quiz:p2:literacy-1:theme-5-weather', E'PUBLISHED', 20, E'MEDIUM', NULL, '2026-11-01T20:12:36.173Z', '2026-11-01T20:12:36.173Z'),
(E'cmvy9o5p001pabogyhw1qz6xs', E'Topic practice', NULL, E'TOPIC_QUIZ', NULL, NULL, NULL, E'cmvy9o5e600m4bogyennjiqe1', E'cmvy9o5dq00k2bogyi7qvvpui', E'cmvy9o5e700m8bogyc8giyzwc', NULL, NULL, E'LOCAL', E'School Quest practice set', E'quiz:p3:mathematics:numbers-up-to-9-999-and-place-value', E'PUBLISHED', 20, E'MEDIUM', NULL, '2026-11-01T20:12:36.180Z', '2026-11-01T20:12:36.180Z'),
(E'cmvy9o5p401pwbogy4jxvca9h', E'Fractions', NULL, E'TOPIC_QUIZ', NULL, NULL, NULL, E'cmvy9o5e600m4bogyennjiqe1', E'cmvy9o5dq00k2bogyi7qvvpui', E'cmvy9o5e900mgbogy5s4wehag', NULL, NULL, E'LOCAL', E'School Quest practice set', E'quiz:p3:mathematics:fractions', E'PUBLISHED', 20, E'MEDIUM', NULL, '2026-11-01T20:12:36.184Z', '2026-11-01T20:12:36.184Z'),
(E'cmvy9o5pc01qkbogy6a17d1py', E'Topic practice', NULL, E'TOPIC_QUIZ', NULL, NULL, NULL, E'cmvy9o5dz00lebogyox84kgx9', E'cmvy9o5dq00k2bogyi7qvvpui', E'cmvy9o5e100lobogy49v9lnye', NULL, NULL, E'LOCAL', E'School Quest practice set', E'quiz:p3:english:adjectives-and-comparison', E'PUBLISHED', 20, E'MEDIUM', NULL, '2026-11-01T20:12:36.192Z', '2026-11-01T20:12:36.192Z'),
(E'cmvy9o5pg01r6bogyzii5491h', E'Comprehension: Kato''s Goat', NULL, E'TOPIC_QUIZ', NULL, NULL, NULL, E'cmvy9o5dz00lebogyox84kgx9', E'cmvy9o5dq00k2bogyi7qvvpui', E'cmvy9o5e300m0bogy8309yabu', NULL, NULL, E'LOCAL', E'School Quest practice set', E'quiz:p3:english:comprehension', E'PUBLISHED', 16, E'MEDIUM', NULL, '2026-11-01T20:12:36.196Z', '2026-11-01T20:12:36.196Z'),
(E'cmvy9o5pl01rqbogyvaey9ick', E'Topic practice', NULL, E'TOPIC_QUIZ', NULL, NULL, NULL, E'cmvy9o5dr00k4bogy3jk9huwe', E'cmvy9o5dq00k2bogyi7qvvpui', E'cmvy9o5dt00kebogyiaobv45l', NULL, NULL, E'LOCAL', E'School Quest practice set', E'quiz:p3:literacy-1:theme-5-living-things-plants', E'PUBLISHED', 20, E'MEDIUM', NULL, '2026-11-01T20:12:36.202Z', '2026-11-01T20:12:36.202Z'),
(E'cmvy9o5ps01sebogy6r9vazw0', E'Topic practice', NULL, E'TOPIC_QUIZ', NULL, NULL, NULL, E'cmvy9o5eu00o8bogygh9plo8b', E'cmvy9o5et00o6bogyd5iiymt2', E'cmvy9o5f200ocbogyh1rtfg3n', NULL, NULL, E'LOCAL', E'School Quest practice set', E'quiz:p4:mathematics:whole-numbers-and-place-value', E'PUBLISHED', 24, E'MEDIUM', NULL, '2026-11-01T20:12:36.208Z', '2026-11-01T20:12:36.208Z'),
(E'cmvy9o5px01t6bogyzf1hr42g', E'Topic practice', NULL, E'TOPIC_QUIZ', NULL, NULL, NULL, E'cmvy9o5eu00o8bogygh9plo8b', E'cmvy9o5et00o6bogyd5iiymt2', E'cmvy9o5fd00oibogyt0sney8j', NULL, NULL, E'LOCAL', E'School Quest practice set', E'quiz:p4:mathematics:fractions', E'PUBLISHED', 22, E'MEDIUM', NULL, '2026-11-01T20:12:36.213Z', '2026-11-01T20:12:36.213Z'),
(E'cmvy9o5qc01tubogykukgn4ar', E'Money practice', NULL, E'TOPIC_QUIZ', NULL, NULL, NULL, E'cmvy9o5eu00o8bogygh9plo8b', E'cmvy9o5et00o6bogyd5iiymt2', E'cmvy9o5fl00oqbogy1bginhat', NULL, NULL, E'LOCAL', E'School Quest practice set', E'quiz:p4:mathematics:money', E'PUBLISHED', 16, E'MEDIUM', NULL, '2026-11-01T20:12:36.228Z', '2026-11-01T20:12:36.228Z'),
(E'cmvy9o5qh01uebogyk7enenph', E'Topic practice', NULL, E'TOPIC_QUIZ', NULL, NULL, NULL, E'cmvy9o5fn00owbogy90vuop2s', E'cmvy9o5et00o6bogyd5iiymt2', E'cmvy9o5fo00oybogyam62r6t9', NULL, NULL, E'LOCAL', E'School Quest practice set', E'quiz:p4:english:nouns-and-articles', E'PUBLISHED', 24, E'MEDIUM', NULL, '2026-11-01T20:12:36.234Z', '2026-11-01T20:12:36.234Z'),
(E'cmvy9o5qr01v4bogy6ywo9o1t', E'Verbs and tenses practice', NULL, E'TOPIC_QUIZ', NULL, NULL, NULL, E'cmvy9o5fn00owbogy90vuop2s', E'cmvy9o5et00o6bogyd5iiymt2', E'cmvy9o5fp00p2bogymr2bury8', NULL, NULL, E'LOCAL', E'School Quest practice set', E'quiz:p4:english:verbs-and-tenses', E'PUBLISHED', 20, E'MEDIUM', NULL, '2026-11-01T20:12:36.243Z', '2026-11-01T20:12:36.243Z'),
(E'cmvy9o5qv01vqbogy1fwvbuwz', E'Comprehension: Market Day', NULL, E'TOPIC_QUIZ', NULL, NULL, NULL, E'cmvy9o5fn00owbogy90vuop2s', E'cmvy9o5et00o6bogyd5iiymt2', E'cmvy9o5fq00pcbogyg2nat9ba', NULL, NULL, E'LOCAL', E'School Quest practice set', E'quiz:p4:english:comprehension', E'PUBLISHED', 16, E'MEDIUM', NULL, '2026-11-01T20:12:36.247Z', '2026-11-01T20:12:36.247Z'),
(E'cmvy9o5qz01wabogyc8p2eowm', E'Topic practice', NULL, E'TOPIC_QUIZ', NULL, NULL, NULL, E'cmvy9o5fr00pkbogycyzvb3zq', E'cmvy9o5et00o6bogyd5iiymt2', E'cmvy9o5fs00pobogyt3mpnmf2', NULL, NULL, E'LOCAL', E'School Quest practice set', E'quiz:p4:science:soil', E'PUBLISHED', 20, E'MEDIUM', NULL, '2026-11-01T20:12:36.252Z', '2026-11-01T20:12:36.252Z'),
(E'cmvy9o5ra01wwbogy4m2xb2ea', E'Sanitation and personal hygiene', NULL, E'TOPIC_QUIZ', NULL, NULL, NULL, E'cmvy9o5fr00pkbogycyzvb3zq', E'cmvy9o5et00o6bogyd5iiymt2', E'cmvy9o5fs00psbogywg0q4q35', NULL, NULL, E'LOCAL', E'School Quest practice set', E'quiz:p4:science:sanitation', E'PUBLISHED', 20, E'MEDIUM', NULL, '2026-11-01T20:12:36.262Z', '2026-11-01T20:12:36.262Z'),
(E'cmvy9o5re01xkbogyqt53tjxn', E'Topic practice', NULL, E'TOPIC_QUIZ', NULL, NULL, NULL, E'cmvy9o5fv00q8bogykbaxiig1', E'cmvy9o5et00o6bogyd5iiymt2', E'cmvy9o5fv00qcbogymjt0fdcs', NULL, NULL, E'LOCAL', E'School Quest practice set', E'quiz:p4:social-studies:map-work', E'PUBLISHED', 20, E'MEDIUM', NULL, '2026-11-01T20:12:36.267Z', '2026-11-01T20:12:36.267Z'),
(E'cmvy9o5rj01y6bogyjnila8my', E'Leaders and services in our district', NULL, E'TOPIC_QUIZ', NULL, NULL, NULL, E'cmvy9o5fv00q8bogykbaxiig1', E'cmvy9o5et00o6bogyd5iiymt2', E'cmvy9o5fx00qkbogyrksl4tfm', NULL, NULL, E'LOCAL', E'School Quest practice set', E'quiz:p4:social-studies:leaders', E'PUBLISHED', 20, E'MEDIUM', NULL, '2026-11-01T20:12:36.271Z', '2026-11-01T20:12:36.271Z'),
(E'cmvy9o5rq01yubogylmibpkd6', E'Topic practice', NULL, E'TOPIC_QUIZ', NULL, NULL, NULL, E'cmvy9o5gc00sebogyqi6qlbkx', E'cmvy9o5gb00scbogyihv5h2tq', E'cmvy9o5gf00sqbogykwsui0y6', NULL, NULL, E'LOCAL', E'School Quest practice set', E'quiz:p5:mathematics:decimals-and-percentages', E'PUBLISHED', 24, E'MEDIUM', NULL, '2026-11-01T20:12:36.278Z', '2026-11-01T20:12:36.278Z'),
(E'cmvy9o5rv01zmbogy0qlxketd', E'Topic practice', NULL, E'TOPIC_QUIZ', NULL, NULL, NULL, E'cmvy9o5gc00sebogyqi6qlbkx', E'cmvy9o5gb00scbogyihv5h2tq', E'cmvy9o5gg00swbogy7zh1ot9m', NULL, NULL, E'LOCAL', E'School Quest practice set', E'quiz:p5:mathematics:measurement', E'PUBLISHED', 22, E'MEDIUM', NULL, '2026-11-01T20:12:36.284Z', '2026-11-01T20:12:36.284Z'),
(E'cmvy9o5s6020cbogyp4tk7t5w', E'Topic practice', NULL, E'TOPIC_QUIZ', NULL, NULL, NULL, E'cmvy9o5gj00t8bogy6oatig5k', E'cmvy9o5gb00scbogyihv5h2tq', E'cmvy9o5gk00tgbogysxmh92j9', NULL, NULL, E'LOCAL', E'School Quest practice set', E'quiz:p5:english:adjectives', E'PUBLISHED', 22, E'MEDIUM', NULL, '2026-11-01T20:12:36.295Z', '2026-11-01T20:12:36.295Z'),
(E'cmvy9o5sc0212bogy2t5wy4wz', E'Topic practice', NULL, E'TOPIC_QUIZ', NULL, NULL, NULL, E'cmvy9o5gj00t8bogy6oatig5k', E'cmvy9o5gb00scbogyihv5h2tq', E'cmvy9o5gm00tubogydc2ta9hf', NULL, NULL, E'LOCAL', E'School Quest practice set', E'quiz:p5:english:letter-writing', E'PUBLISHED', 16, E'MEDIUM', NULL, '2026-11-01T20:12:36.300Z', '2026-11-01T20:12:36.300Z'),
(E'cmvy9o5si021mbogylb5cyeal', E'Topic practice', NULL, E'TOPIC_QUIZ', NULL, NULL, NULL, E'cmvy9o5gn00tybogybrqnqg16', E'cmvy9o5gb00scbogyihv5h2tq', E'cmvy9o5gp00u6bogyjtnogki3', NULL, NULL, E'LOCAL', E'School Quest practice set', E'quiz:p5:science:digestive-system', E'PUBLISHED', 24, E'MEDIUM', NULL, '2026-11-01T20:12:36.307Z', '2026-11-01T20:12:36.307Z'),
(E'cmvy9o5sq022cbogyry2ylnz6', E'Reproduction in flowering plants', NULL, E'TOPIC_QUIZ', NULL, NULL, NULL, E'cmvy9o5gn00tybogybrqnqg16', E'cmvy9o5gb00scbogyihv5h2tq', E'cmvy9o5gp00uabogy7jqoauw0', NULL, NULL, E'LOCAL', E'School Quest practice set', E'quiz:p5:science:plant-reproduction', E'PUBLISHED', 22, E'MEDIUM', NULL, '2026-11-01T20:12:36.315Z', '2026-11-01T20:12:36.315Z'),
(E'cmvy9o5sw0232bogyl7nz4zml', E'Topic practice', NULL, E'TOPIC_QUIZ', NULL, NULL, NULL, E'cmvy9o5gs00uqbogyilx6aa2a', E'cmvy9o5gb00scbogyihv5h2tq', E'cmvy9o5gt00uubogyq12u4kya', NULL, NULL, E'LOCAL', E'School Quest practice set', E'quiz:p5:social-studies:physical-features', E'PUBLISHED', 24, E'MEDIUM', NULL, '2026-11-01T20:12:36.320Z', '2026-11-01T20:12:36.320Z'),
(E'cmvy9o5t3023sbogykhisk8yc', E'Pre-colonial kingdoms and chiefdoms', NULL, E'TOPIC_QUIZ', NULL, NULL, NULL, E'cmvy9o5gs00uqbogyilx6aa2a', E'cmvy9o5gb00scbogyihv5h2tq', E'cmvy9o5gv00v2bogyzupgq3e0', NULL, NULL, E'LOCAL', E'School Quest practice set', E'quiz:p5:social-studies:pre-colonial-uganda', E'PUBLISHED', 24, E'MEDIUM', NULL, '2026-11-01T20:12:36.328Z', '2026-11-01T20:12:36.328Z'),
(E'cmvy9o5t8024kbogy04d1nnhr', E'Topic practice', NULL, E'TOPIC_QUIZ', NULL, NULL, NULL, E'cmvy9o5hu00x0bogydcfxqrp2', E'cmvy9o5hs00wybogyi61erru2', E'cmvy9o5hz00xcbogyz0m236zo', NULL, NULL, E'LOCAL', E'School Quest practice set', E'quiz:p6:mathematics:ratio-and-proportion', E'PUBLISHED', 22, E'MEDIUM', NULL, '2026-11-01T20:12:36.333Z', '2026-11-01T20:12:36.333Z'),
(E'cmvy9o5td025abogyts9e0syf', E'Topic practice', NULL, E'TOPIC_QUIZ', NULL, NULL, NULL, E'cmvy9o5hu00x0bogydcfxqrp2', E'cmvy9o5hs00wybogyi61erru2', E'cmvy9o5i000xgbogyo2hgc2vq', NULL, NULL, E'LOCAL', E'School Quest practice set', E'quiz:p6:mathematics:data-handling', E'PUBLISHED', 22, E'MEDIUM', NULL, '2026-11-01T20:12:36.337Z', '2026-11-01T20:12:36.337Z'),
(E'cmvy9o5tp025ybogy2usmfu3b', E'Reported speech practice', NULL, E'TOPIC_QUIZ', NULL, NULL, NULL, E'cmvy9o5i100xsbogy2vbxdigr', E'cmvy9o5hs00wybogyi61erru2', E'cmvy9o5i300y4bogyj3c6rwzv', NULL, NULL, E'LOCAL', E'School Quest practice set', E'quiz:p6:english:direct-and-indirect-speech', E'PUBLISHED', 16, E'MEDIUM', NULL, '2026-11-01T20:12:36.349Z', '2026-11-01T20:12:36.349Z'),
(E'cmvy9o5tt026ibogyme5ft7v0', E'Topic practice', NULL, E'TOPIC_QUIZ', NULL, NULL, NULL, E'cmvy9o5i100xsbogy2vbxdigr', E'cmvy9o5hs00wybogyi61erru2', E'cmvy9o5i400yabogylmtguphr', NULL, NULL, E'LOCAL', E'School Quest practice set', E'quiz:p6:english:composition', E'PUBLISHED', 12, E'MEDIUM', NULL, '2026-11-01T20:12:36.354Z', '2026-11-01T20:12:36.354Z'),
(E'cmvy9o5u1026ybogy4liwwjq5', E'Topic practice', NULL, E'TOPIC_QUIZ', NULL, NULL, NULL, E'cmvy9o5i600yibogyz9epzoab', E'cmvy9o5hs00wybogyi61erru2', E'cmvy9o5i600ykbogyazece0in', NULL, NULL, E'LOCAL', E'School Quest practice set', E'quiz:p6:science:classification', E'PUBLISHED', 24, E'MEDIUM', NULL, '2026-11-01T20:12:36.361Z', '2026-11-01T20:12:36.361Z'),
(E'cmvy9o5u6027obogysjapto9c', E'The circulatory system', NULL, E'TOPIC_QUIZ', NULL, NULL, NULL, E'cmvy9o5i600yibogyz9epzoab', E'cmvy9o5hs00wybogyi61erru2', E'cmvy9o5i600ymbogyxelu21bf', NULL, NULL, E'LOCAL', E'School Quest practice set', E'quiz:p6:science:circulatory-system', E'PUBLISHED', 20, E'MEDIUM', NULL, '2026-11-01T20:12:36.367Z', '2026-11-01T20:12:36.367Z'),
(E'cmvy9o5ui028abogyptpj607v', E'The East African Community', NULL, E'TOPIC_QUIZ', NULL, NULL, NULL, E'cmvy9o5id00zabogydgno1szr', E'cmvy9o5hs00wybogyi61erru2', E'cmvy9o5if00zobogyep7qh0ax', NULL, NULL, E'LOCAL', E'School Quest practice set', E'quiz:p6:social-studies:east-african-community', E'PUBLISHED', 20, E'MEDIUM', NULL, '2026-11-01T20:12:36.378Z', '2026-11-01T20:12:36.378Z'),
(E'cmvy9o5um028wbogysg99k3px', E'Physical features of East Africa', NULL, E'TOPIC_QUIZ', NULL, NULL, NULL, E'cmvy9o5id00zabogydgno1szr', E'cmvy9o5hs00wybogyi61erru2', E'cmvy9o5ie00zebogyvcbo0rd1', NULL, NULL, E'LOCAL', E'School Quest practice set', E'quiz:p6:social-studies:physical-features', E'PUBLISHED', 20, E'MEDIUM', NULL, '2026-11-01T20:12:36.383Z', '2026-11-01T20:12:36.383Z'),
(E'cmvy9o5ur029kbogy2xxyypg4', E'Sets practice', NULL, E'TOPIC_QUIZ', NULL, NULL, NULL, E'cmvy9o5it011ibogyoeiiouhk', E'cmvy9o5is011gbogyesyu81sm', E'cmvy9o5iu011kbogyj21wboqk', NULL, NULL, E'LOCAL', E'School Quest practice set', E'quiz:p7:mathematics:sets', E'PUBLISHED', 20, E'MEDIUM', NULL, '2026-11-01T20:12:36.387Z', '2026-11-01T20:12:36.387Z'),
(E'cmvy9o5v002a8bogyb26oqnwy', E'Fractions, decimals & percentages practice', NULL, E'TOPIC_QUIZ', NULL, NULL, NULL, E'cmvy9o5it011ibogyoeiiouhk', E'cmvy9o5is011gbogyesyu81sm', E'cmvy9o5iv011qbogys3gd4n0c', NULL, NULL, E'LOCAL', E'School Quest practice set', E'quiz:p7:mathematics:fractions-decimals-percentages', E'PUBLISHED', 20, E'MEDIUM', NULL, '2026-11-01T20:12:36.397Z', '2026-11-01T20:12:36.397Z'),
(E'cmvy9o5v602awbogy7bmqrwxb', E'Topic practice', NULL, E'TOPIC_QUIZ', NULL, NULL, NULL, E'cmvy9o5it011ibogyoeiiouhk', E'cmvy9o5is011gbogyesyu81sm', E'cmvy9o5iy0126bogy3gc1ptrk', NULL, NULL, E'LOCAL', E'School Quest practice set', E'quiz:p7:mathematics:algebra', E'PUBLISHED', 20, E'MEDIUM', NULL, '2026-11-01T20:12:36.402Z', '2026-11-01T20:12:36.402Z'),
(E'cmvy9o5vf02bkbogyoq8l6ter', E'Topic practice', NULL, E'TOPIC_QUIZ', NULL, NULL, NULL, E'cmvy9o5it011ibogyoeiiouhk', E'cmvy9o5is011gbogyesyu81sm', E'cmvy9o5ix0120bogy4l72qn33', NULL, NULL, E'LOCAL', E'School Quest practice set', E'quiz:p7:mathematics:commercial-arithmetic', E'PUBLISHED', 20, E'MEDIUM', NULL, '2026-11-01T20:12:36.411Z', '2026-11-01T20:12:36.411Z'),
(E'cmvy9o5vk02c8bogysxhnlzjf', E'Topic practice', NULL, E'TOPIC_QUIZ', NULL, NULL, NULL, E'cmvy9o5iy012abogy57nynjx4', E'cmvy9o5is011gbogyesyu81sm', E'cmvy9o5iz012gbogyu7nca9f6', NULL, NULL, E'LOCAL', E'School Quest practice set', E'quiz:p7:english:tenses', E'PUBLISHED', 20, E'MEDIUM', NULL, '2026-11-01T20:12:36.416Z', '2026-11-01T20:12:36.416Z'),
(E'cmvy9o5vp02cwbogyvvvx5ht1', E'Topic practice', NULL, E'TOPIC_QUIZ', NULL, NULL, NULL, E'cmvy9o5iy012abogy57nynjx4', E'cmvy9o5is011gbogyesyu81sm', E'cmvy9o5j0012obogyb8y8hivp', NULL, NULL, E'LOCAL', E'School Quest practice set', E'quiz:p7:english:active-and-passive-voice', E'PUBLISHED', 16, E'MEDIUM', NULL, '2026-11-01T20:12:36.421Z', '2026-11-01T20:12:36.421Z'),
(E'cmvy9o5vy02dgbogy2wkrorpm', E'Topic practice', NULL, E'TOPIC_QUIZ', NULL, NULL, NULL, E'cmvy9o5iy012abogy57nynjx4', E'cmvy9o5is011gbogyesyu81sm', E'cmvy9o5j0012mbogyg0afmu2y', NULL, NULL, E'LOCAL', E'School Quest practice set', E'quiz:p7:english:direct-and-indirect-speech', E'PUBLISHED', 14, E'MEDIUM', NULL, '2026-11-01T20:12:36.430Z', '2026-11-01T20:12:36.430Z'),
(E'cmvy9o5w102dwbogyldlpedwe', E'Comprehension: The Village Well', NULL, E'TOPIC_QUIZ', NULL, NULL, NULL, E'cmvy9o5iy012abogy57nynjx4', E'cmvy9o5is011gbogyesyu81sm', E'cmvy9o5j1012sbogyqw6b89bb', NULL, NULL, E'LOCAL', E'School Quest practice set', E'quiz:p7:english:comprehension', E'PUBLISHED', 20, E'MEDIUM', NULL, '2026-11-01T20:12:36.433Z', '2026-11-01T20:12:36.433Z'),
(E'cmvy9o5w602ekbogychxc1jgd', E'Topic practice', NULL, E'TOPIC_QUIZ', NULL, NULL, NULL, E'cmvy9o5j20130bogyj0oufl7o', E'cmvy9o5is011gbogyesyu81sm', E'cmvy9o5j30132bogy4n1qk37k', NULL, NULL, E'LOCAL', E'School Quest practice set', E'quiz:p7:science:human-body-systems', E'PUBLISHED', 26, E'MEDIUM', NULL, '2026-11-01T20:12:36.439Z', '2026-11-01T20:12:36.439Z'),
(E'cmvy9o5wf02febogyb2i70si2', E'Topic practice', NULL, E'TOPIC_QUIZ', NULL, NULL, NULL, E'cmvy9o5j20130bogyj0oufl7o', E'cmvy9o5is011gbogyesyu81sm', E'cmvy9o5j5013ibogyqvsh5fvi', NULL, NULL, E'LOCAL', E'School Quest practice set', E'quiz:p7:science:electricity', E'PUBLISHED', 24, E'MEDIUM', NULL, '2026-11-01T20:12:36.447Z', '2026-11-01T20:12:36.447Z'),
(E'cmvy9o5wl02g6bogyicydx4m1', E'Topic practice', NULL, E'TOPIC_QUIZ', NULL, NULL, NULL, E'cmvy9o5j20130bogyj0oufl7o', E'cmvy9o5is011gbogyesyu81sm', E'cmvy9o5j40138bogywo1v7buj', NULL, NULL, E'LOCAL', E'School Quest practice set', E'quiz:p7:science:communicable-diseases', E'PUBLISHED', 22, E'MEDIUM', NULL, '2026-11-01T20:12:36.454Z', '2026-11-01T20:12:36.454Z'),
(E'cmvy9o5ws02gwbogyyx7cnq37', E'Topic practice', NULL, E'TOPIC_QUIZ', NULL, NULL, NULL, E'cmvy9o5jb013sbogy22txr9li', E'cmvy9o5is011gbogyesyu81sm', E'cmvy9o5jb013ubogy3gfs6bdc', NULL, NULL, E'LOCAL', E'School Quest practice set', E'quiz:p7:social-studies:location-of-africa', E'PUBLISHED', 24, E'MEDIUM', NULL, '2026-11-01T20:12:36.461Z', '2026-11-01T20:12:36.461Z'),
(E'cmvy9o5x202hobogyfbvnxzzm', E'Topic practice', NULL, E'TOPIC_QUIZ', NULL, NULL, NULL, E'cmvy9o5jb013sbogy22txr9li', E'cmvy9o5is011gbogyesyu81sm', E'cmvy9o5jd0142bogyl6gnolwm', NULL, NULL, E'LOCAL', E'School Quest practice set', E'quiz:p7:social-studies:foreign-influence', E'PUBLISHED', 24, E'MEDIUM', NULL, '2026-11-01T20:12:36.471Z', '2026-11-01T20:12:36.471Z'),
(E'cmvy9o5x902igbogy33fmvilh', E'Topic practice', NULL, E'TOPIC_QUIZ', NULL, NULL, NULL, E'cmvy9o5jb013sbogy22txr9li', E'cmvy9o5is011gbogyesyu81sm', E'cmvy9o5je014abogy5rakx6qh', NULL, NULL, E'LOCAL', E'School Quest practice set', E'quiz:p7:social-studies:regional-cooperation', E'PUBLISHED', 22, E'MEDIUM', NULL, '2026-11-01T20:12:36.477Z', '2026-11-01T20:12:36.477Z')
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "Question" ("id", "paperId", "topicId", "type", "displayNumber", "section", "stimulus", "imageUrl", "prompt", "options", "correctAnswer", "acceptedAnswers", "explanation", "markingGuide", "numericTolerance", "caseSensitive", "requiresTeacher", "points", "order", "parentId", "unit", "partialRule", "createdAt", "updatedAt") VALUES
(E'cmvy9o5m201eobogyai3ldqsg', E'cmvy9o5lw01embogyhx8ag78r', E'cmvy9o59r000wbogy9tc84rmw', E'MULTIPLE_CHOICE', E'1', NULL, NULL, NULL, E'How many bananas? 🍌🍌🍌', E'["2","3","4"]', E'"3"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 1, NULL, NULL, NULL, '2026-11-01T20:12:36.074Z', '2026-11-01T20:12:36.074Z'),
(E'cmvy9o5m301eqbogyoskhdluw', E'cmvy9o5lw01embogyhx8ag78r', E'cmvy9o59r000wbogy9tc84rmw', E'MULTIPLE_CHOICE', E'2', NULL, NULL, NULL, E'How many balls? ⚽⚽', E'["1","2","3"]', E'"2"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 2, NULL, NULL, NULL, '2026-11-01T20:12:36.076Z', '2026-11-01T20:12:36.076Z'),
(E'cmvy9o5m401esbogyanekz91g', E'cmvy9o5lw01embogyhx8ag78r', E'cmvy9o59r000wbogy9tc84rmw', E'MULTIPLE_CHOICE', E'3', NULL, NULL, NULL, E'How many cats? 🐱🐱🐱🐱🐱', E'["4","5","6"]', E'"5"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 3, NULL, NULL, NULL, '2026-11-01T20:12:36.077Z', '2026-11-01T20:12:36.077Z'),
(E'cmvy9o5m501eubogyy3vwczzp', E'cmvy9o5lw01embogyhx8ag78r', E'cmvy9o59r000wbogy9tc84rmw', E'MULTIPLE_CHOICE', E'4', NULL, NULL, NULL, E'Which number comes after 2?', E'["1","3","5"]', E'"3"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 4, NULL, NULL, NULL, '2026-11-01T20:12:36.077Z', '2026-11-01T20:12:36.077Z'),
(E'cmvy9o5m501ewbogyu0czzg00', E'cmvy9o5lw01embogyhx8ag78r', E'cmvy9o59r000wbogy9tc84rmw', E'MULTIPLE_CHOICE', E'5', NULL, NULL, NULL, E'How many fingers are on one hand?', E'["3","5","10"]', E'"5"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 5, NULL, NULL, NULL, '2026-11-01T20:12:36.078Z', '2026-11-01T20:12:36.078Z'),
(E'cmvy9o5m601eybogyqwll5ky6', E'cmvy9o5lw01embogyhx8ag78r', E'cmvy9o59r000wbogy9tc84rmw', E'MULTIPLE_CHOICE', E'6', NULL, NULL, NULL, E'How many eggs? 🥚', E'["1","2","3"]', E'"1"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 6, NULL, NULL, NULL, '2026-11-01T20:12:36.078Z', '2026-11-01T20:12:36.078Z'),
(E'cmvy9o5m601f0bogyhrqndw99', E'cmvy9o5lw01embogyhx8ag78r', E'cmvy9o59r000wbogy9tc84rmw', E'MULTIPLE_CHOICE', E'7', NULL, NULL, NULL, E'Which group has MORE? 🍎🍎🍎🍎 or 🍎🍎', E'["🍎🍎🍎🍎","🍎🍎"]', E'"🍎🍎🍎🍎"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 7, NULL, NULL, NULL, '2026-11-01T20:12:36.079Z', '2026-11-01T20:12:36.079Z'),
(E'cmvy9o5m601f2bogy1wbjmvpl', E'cmvy9o5lw01embogyhx8ag78r', E'cmvy9o59r000wbogy9tc84rmw', E'DRAWING', E'8', NULL, NULL, NULL, E'Draw 3 circles.', NULL, E'"Three circle shapes drawn."', NULL, NULL, E'Three circle shapes drawn.', NULL, FALSE, FALSE, 2, 8, NULL, NULL, NULL, '2026-11-01T20:12:36.079Z', '2026-11-01T20:12:36.079Z'),
(E'cmvy9o5m801f6bogyazcgw3mg', E'cmvy9o5m701f4bogycj0cn4fa', E'cmvy9o59p000kbogyd2wpg9og', E'MULTIPLE_CHOICE', E'1', NULL, NULL, NULL, E'What do we use to see? 👀', E'["eyes","ears","feet"]', E'"eyes"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 1, NULL, NULL, NULL, '2026-11-01T20:12:36.080Z', '2026-11-01T20:12:36.080Z'),
(E'cmvy9o5m801f8bogyydjq21ow', E'cmvy9o5m701f4bogycj0cn4fa', E'cmvy9o59p000kbogyd2wpg9og', E'MULTIPLE_CHOICE', E'2', NULL, NULL, NULL, E'What do we use to hear? 👂', E'["nose","ears","hands"]', E'"ears"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 2, NULL, NULL, NULL, '2026-11-01T20:12:36.081Z', '2026-11-01T20:12:36.081Z'),
(E'cmvy9o5m901fabogyx7bw1zt0', E'cmvy9o5m701f4bogycj0cn4fa', E'cmvy9o59p000kbogyd2wpg9og', E'MULTIPLE_CHOICE', E'3', NULL, NULL, NULL, E'What do we use to walk?', E'["hands","legs","mouth"]', E'"legs"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 3, NULL, NULL, NULL, '2026-11-01T20:12:36.081Z', '2026-11-01T20:12:36.081Z'),
(E'cmvy9o5m901fcbogyye66j8s3', E'cmvy9o5m701f4bogycj0cn4fa', E'cmvy9o59p000kbogyd2wpg9og', E'MULTIPLE_CHOICE', E'4', NULL, NULL, NULL, E'What do we use to smell a flower?', E'["nose","eyes","ears"]', E'"nose"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 4, NULL, NULL, NULL, '2026-11-01T20:12:36.081Z', '2026-11-01T20:12:36.081Z'),
(E'cmvy9o5m901febogy318wqi5l', E'cmvy9o5m701f4bogycj0cn4fa', E'cmvy9o59p000kbogyd2wpg9og', E'MULTIPLE_CHOICE', E'5', NULL, NULL, NULL, E'How many hands do you have?', E'["1","2","3"]', E'"2"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 5, NULL, NULL, NULL, '2026-11-01T20:12:36.082Z', '2026-11-01T20:12:36.082Z'),
(E'cmvy9o5ma01fgbogyxepy6ds2', E'cmvy9o5m701f4bogycj0cn4fa', E'cmvy9o59p000kbogyd2wpg9og', E'DRAWING', E'6', NULL, NULL, NULL, E'Draw your face with two eyes.', NULL, E'"A face with two eyes."', NULL, NULL, E'A face with two eyes.', NULL, FALSE, FALSE, 2, 6, NULL, NULL, NULL, '2026-11-01T20:12:36.082Z', '2026-11-01T20:12:36.082Z'),
(E'cmvy9o5mc01fmbogy1qof2fwt', E'cmvy9o5mb01fkbogyruwwe57z', E'cmvy9o5a20026bogyerd9yynb', E'MULTIPLE_CHOICE', E'1', NULL, NULL, NULL, E'What do we use to wash our hands?', E'["soap and water","sand","milk"]', E'"soap and water"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 1, NULL, NULL, NULL, '2026-11-01T20:12:36.084Z', '2026-11-01T20:12:36.084Z'),
(E'cmvy9o5mc01fobogyjr26e2na', E'cmvy9o5mb01fkbogyruwwe57z', E'cmvy9o5a20026bogyerd9yynb', E'MULTIPLE_CHOICE', E'2', NULL, NULL, NULL, E'When should we wash our hands?', E'["before eating","while sleeping","never"]', E'"before eating"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 2, NULL, NULL, NULL, '2026-11-01T20:12:36.084Z', '2026-11-01T20:12:36.084Z'),
(E'cmvy9o5mc01fqbogy4d2l1q6i', E'cmvy9o5mb01fkbogyruwwe57z', E'cmvy9o5a20026bogyerd9yynb', E'MULTIPLE_CHOICE', E'3', NULL, NULL, NULL, E'After using the toilet we should...', E'["wash our hands","eat","sleep"]', E'"wash our hands"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 3, NULL, NULL, NULL, '2026-11-01T20:12:36.085Z', '2026-11-01T20:12:36.085Z'),
(E'cmvy9o5md01fsbogy2yfoxkiy', E'cmvy9o5mb01fkbogyruwwe57z', E'cmvy9o5a20026bogyerd9yynb', E'MULTIPLE_CHOICE', E'4', NULL, NULL, NULL, E'What do we use to dry our hands?', E'["a clean towel","a shoe","a book"]', E'"a clean towel"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 4, NULL, NULL, NULL, '2026-11-01T20:12:36.085Z', '2026-11-01T20:12:36.085Z'),
(E'cmvy9o5md01fubogyetvfwer5', E'cmvy9o5mb01fkbogyruwwe57z', E'cmvy9o5a20026bogyerd9yynb', E'MULTIPLE_CHOICE', E'5', NULL, NULL, NULL, E'Who can see germs?', E'["nobody, they are too small","everyone","only babies"]', E'"nobody, they are too small"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 5, NULL, NULL, NULL, '2026-11-01T20:12:36.086Z', '2026-11-01T20:12:36.086Z'),
(E'cmvy9o5mi01g0bogydai83n4p', E'cmvy9o5mh01fybogyvlc6xo83', E'cmvy9o5an004ubogyl6v0qsqn', E'MULTIPLE_CHOICE', E'1', NULL, NULL, NULL, E'Which shape is round like a ball?', E'["circle","square","triangle"]', E'"circle"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 1, NULL, NULL, NULL, '2026-11-01T20:12:36.091Z', '2026-11-01T20:12:36.091Z'),
(E'cmvy9o5mj01g2bogy3uiqxb5d', E'cmvy9o5mh01fybogyvlc6xo83', E'cmvy9o5an004ubogyl6v0qsqn', E'MULTIPLE_CHOICE', E'2', NULL, NULL, NULL, E'How many sides does a triangle have?', E'["2","3","4"]', E'"3"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 2, NULL, NULL, NULL, '2026-11-01T20:12:36.091Z', '2026-11-01T20:12:36.091Z'),
(E'cmvy9o5mj01g4bogy9l5w566t', E'cmvy9o5mh01fybogyvlc6xo83', E'cmvy9o5an004ubogyl6v0qsqn', E'MULTIPLE_CHOICE', E'3', NULL, NULL, NULL, E'A door looks like a...', E'["circle","rectangle","triangle"]', E'"rectangle"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 3, NULL, NULL, NULL, '2026-11-01T20:12:36.092Z', '2026-11-01T20:12:36.092Z'),
(E'cmvy9o5mk01g6bogywno0mx2h', E'cmvy9o5mh01fybogyvlc6xo83', E'cmvy9o5an004ubogyl6v0qsqn', E'MULTIPLE_CHOICE', E'4', NULL, NULL, NULL, E'Which shape has 4 equal sides?', E'["square","circle","triangle"]', E'"square"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 4, NULL, NULL, NULL, '2026-11-01T20:12:36.092Z', '2026-11-01T20:12:36.092Z'),
(E'cmvy9o5mk01g8bogywqhn5zmw', E'cmvy9o5mh01fybogyvlc6xo83', E'cmvy9o5an004ubogyl6v0qsqn', E'MULTIPLE_CHOICE', E'5', NULL, NULL, NULL, E'The roof of a house looks like a...', E'["triangle","circle","rectangle"]', E'"triangle"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 5, NULL, NULL, NULL, '2026-11-01T20:12:36.093Z', '2026-11-01T20:12:36.093Z'),
(E'cmvy9o5mk01gabogyp5lprumh', E'cmvy9o5mh01fybogyvlc6xo83', E'cmvy9o5an004ubogyl6v0qsqn', E'MULTIPLE_CHOICE', E'6', NULL, NULL, NULL, E'How many sides does a circle have?', E'["0","3","4"]', E'"0"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 6, NULL, NULL, NULL, '2026-11-01T20:12:36.093Z', '2026-11-01T20:12:36.093Z'),
(E'cmvy9o5ml01gcbogyciclan1l', E'cmvy9o5mh01fybogyvlc6xo83', E'cmvy9o5an004ubogyl6v0qsqn', E'DRAWING', E'7', NULL, NULL, NULL, E'Draw a square and a circle.', NULL, E'"A four-sided square and a round circle drawn."', NULL, NULL, E'A four-sided square and a round circle drawn.', NULL, FALSE, FALSE, 2, 7, NULL, NULL, NULL, '2026-11-01T20:12:36.093Z', '2026-11-01T20:12:36.093Z'),
(E'cmvy9o5mm01ggbogya89qbaij', E'cmvy9o5ml01gebogynm2sutry', E'cmvy9o5ap0054bogy2vg0eyda', E'MULTIPLE_CHOICE', E'1', NULL, NULL, NULL, E'What comes after 9?', E'["8","10","11"]', E'"10"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 1, NULL, NULL, NULL, '2026-11-01T20:12:36.095Z', '2026-11-01T20:12:36.095Z'),
(E'cmvy9o5mm01gibogyely5cuom', E'cmvy9o5ml01gebogynm2sutry', E'cmvy9o5ap0054bogy2vg0eyda', E'MULTIPLE_CHOICE', E'2', NULL, NULL, NULL, E'What comes after 14?', E'["13","15","16"]', E'"15"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 2, NULL, NULL, NULL, '2026-11-01T20:12:36.095Z', '2026-11-01T20:12:36.095Z'),
(E'cmvy9o5mn01gkbogylkqm8ers', E'cmvy9o5ml01gebogynm2sutry', E'cmvy9o5ap0054bogy2vg0eyda', E'MULTIPLE_CHOICE', E'3', NULL, NULL, NULL, E'Count: 🌟🌟🌟🌟🌟🌟🌟🌟', E'["7","8","9"]', E'"8"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 3, NULL, NULL, NULL, '2026-11-01T20:12:36.095Z', '2026-11-01T20:12:36.095Z'),
(E'cmvy9o5mn01gmbogyojszz6tf', E'cmvy9o5ml01gebogynm2sutry', E'cmvy9o5ap0054bogy2vg0eyda', E'MULTIPLE_CHOICE', E'4', NULL, NULL, NULL, E'Which is more: 12 or 7?', E'["12","7"]', E'"12"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 4, NULL, NULL, NULL, '2026-11-01T20:12:36.096Z', '2026-11-01T20:12:36.096Z'),
(E'cmvy9o5mn01gobogyunvuyg1e', E'cmvy9o5ml01gebogynm2sutry', E'cmvy9o5ap0054bogy2vg0eyda', E'MULTIPLE_CHOICE', E'5', NULL, NULL, NULL, E'Which number is missing? 16, 17, __, 19', E'["18","20","15"]', E'"18"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 5, NULL, NULL, NULL, '2026-11-01T20:12:36.096Z', '2026-11-01T20:12:36.096Z'),
(E'cmvy9o5mo01gqbogyd0ttz6u4', E'cmvy9o5ml01gebogynm2sutry', E'cmvy9o5ap0054bogy2vg0eyda', E'FILL_BLANK', E'6', NULL, NULL, NULL, E'Write the number ten in figures.', NULL, E'"10"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 6, NULL, NULL, NULL, '2026-11-01T20:12:36.096Z', '2026-11-01T20:12:36.096Z'),
(E'cmvy9o5mo01gsbogyfxkucqh3', E'cmvy9o5ml01gebogynm2sutry', E'cmvy9o5ap0054bogy2vg0eyda', E'MULTIPLE_CHOICE', E'7', NULL, NULL, NULL, E'How many toes do you have on both feet?', E'["5","10","20"]', E'"10"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 7, NULL, NULL, NULL, '2026-11-01T20:12:36.096Z', '2026-11-01T20:12:36.096Z'),
(E'cmvy9o5mq01gybogyros6ssgp', E'cmvy9o5mp01gwbogy2kjxks8l', E'cmvy9o5aq005cbogyohkg422o', E'MULTIPLE_CHOICE', E'1', NULL, NULL, NULL, E'Which word starts with the sound ''b''?', E'["ball","cat","dog"]', E'"ball"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 1, NULL, NULL, NULL, '2026-11-01T20:12:36.098Z', '2026-11-01T20:12:36.098Z'),
(E'cmvy9o5mq01h0bogyv5c0q930', E'cmvy9o5mp01gwbogy2kjxks8l', E'cmvy9o5aq005cbogyohkg422o', E'MULTIPLE_CHOICE', E'2', NULL, NULL, NULL, E'Which word starts with the sound ''m''?', E'["fish","mango","egg"]', E'"mango"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 2, NULL, NULL, NULL, '2026-11-01T20:12:36.099Z', '2026-11-01T20:12:36.099Z'),
(E'cmvy9o5mr01h2bogywlt84ped', E'cmvy9o5mp01gwbogy2kjxks8l', E'cmvy9o5aq005cbogyohkg422o', E'MULTIPLE_CHOICE', E'3', NULL, NULL, NULL, E'What is the first sound in ''goat''?', E'["g","d","k"]', E'"g"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 3, NULL, NULL, NULL, '2026-11-01T20:12:36.099Z', '2026-11-01T20:12:36.099Z'),
(E'cmvy9o5mr01h4bogypsre1i2t', E'cmvy9o5mp01gwbogy2kjxks8l', E'cmvy9o5aq005cbogyohkg422o', E'MULTIPLE_CHOICE', E'4', NULL, NULL, NULL, E'Which picture word goes with the letter ''f''?', E'["fish 🐟","hen 🐔","leaf 🍃"]', E'"fish 🐟"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 4, NULL, NULL, NULL, '2026-11-01T20:12:36.100Z', '2026-11-01T20:12:36.100Z'),
(E'cmvy9o5ms01h6bogyawg0m078', E'cmvy9o5mp01gwbogy2kjxks8l', E'cmvy9o5aq005cbogyohkg422o', E'MULTIPLE_CHOICE', E'5', NULL, NULL, NULL, E'Which letter comes after ''c'' in the alphabet?', E'["b","d","e"]', E'"d"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 5, NULL, NULL, NULL, '2026-11-01T20:12:36.100Z', '2026-11-01T20:12:36.100Z'),
(E'cmvy9o5ms01h8bogy61ofkobr', E'cmvy9o5mp01gwbogy2kjxks8l', E'cmvy9o5aq005cbogyohkg422o', E'MULTIPLE_CHOICE', E'6', NULL, NULL, NULL, E'Which word starts with ''a''?', E'["apple","jug","kite"]', E'"apple"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 6, NULL, NULL, NULL, '2026-11-01T20:12:36.101Z', '2026-11-01T20:12:36.101Z'),
(E'cmvy9o5mt01hcbogy2dqc0sp9', E'cmvy9o5ms01habogy3mlhdsnh', E'cmvy9o5b0006ibogyyto95jdf', E'MULTIPLE_CHOICE', E'1', NULL, NULL, NULL, E'Who is your mother''s mother?', E'["grandmother","sister","aunt"]', E'"grandmother"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 1, NULL, NULL, NULL, '2026-11-01T20:12:36.102Z', '2026-11-01T20:12:36.102Z'),
(E'cmvy9o5mt01hebogyx68nr6kh', E'cmvy9o5ms01habogy3mlhdsnh', E'cmvy9o5b0006ibogyyto95jdf', E'MULTIPLE_CHOICE', E'2', NULL, NULL, NULL, E'A boy born to your parents is your...', E'["brother","uncle","father"]', E'"brother"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 2, NULL, NULL, NULL, '2026-11-01T20:12:36.102Z', '2026-11-01T20:12:36.102Z'),
(E'cmvy9o5mu01hgbogyksgo7eyh', E'cmvy9o5ms01habogy3mlhdsnh', E'cmvy9o5b0006ibogyyto95jdf', E'MULTIPLE_CHOICE', E'3', NULL, NULL, NULL, E'Your father''s brother is your...', E'["uncle","cousin","grandfather"]', E'"uncle"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 3, NULL, NULL, NULL, '2026-11-01T20:12:36.102Z', '2026-11-01T20:12:36.102Z'),
(E'cmvy9o5mu01hibogy53pdrm8f', E'cmvy9o5ms01habogy3mlhdsnh', E'cmvy9o5b0006ibogyyto95jdf', E'MULTIPLE_CHOICE', E'4', NULL, NULL, NULL, E'Who cooks food and takes care of you at home?', E'["parents","a stranger","a dog"]', E'"parents"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 4, NULL, NULL, NULL, '2026-11-01T20:12:36.103Z', '2026-11-01T20:12:36.103Z'),
(E'cmvy9o5mv01hkbogyuuv5dyrm', E'cmvy9o5ms01habogy3mlhdsnh', E'cmvy9o5b0006ibogyyto95jdf', E'MULTIPLE_CHOICE', E'5', NULL, NULL, NULL, E'What do we say when someone gives us something?', E'["thank you","go away","nothing"]', E'"thank you"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 5, NULL, NULL, NULL, '2026-11-01T20:12:36.103Z', '2026-11-01T20:12:36.103Z'),
(E'cmvy9o5mv01hmbogyryix2zkg', E'cmvy9o5ms01habogy3mlhdsnh', E'cmvy9o5b0006ibogyyto95jdf', E'MULTIPLE_CHOICE', E'6', NULL, NULL, NULL, E'What do we say when we meet someone in the morning?', E'["good morning","good night","goodbye"]', E'"good morning"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 6, NULL, NULL, NULL, '2026-11-01T20:12:36.104Z', '2026-11-01T20:12:36.104Z'),
(E'cmvy9o5n201hsbogyafd30x8q', E'cmvy9o5n001hqbogy8uqcmmiq', E'cmvy9o5bh0092bogyc9mqczpo', E'NUMERIC', E'1', NULL, NULL, NULL, E'2 + 3 =', NULL, E'5', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 1, NULL, NULL, NULL, '2026-11-01T20:12:36.110Z', '2026-11-01T20:12:36.110Z'),
(E'cmvy9o5n201hubogy51ninzwd', E'cmvy9o5n001hqbogy8uqcmmiq', E'cmvy9o5bh0092bogyc9mqczpo', E'NUMERIC', E'2', NULL, NULL, NULL, E'4 + 1 =', NULL, E'5', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 2, NULL, NULL, NULL, '2026-11-01T20:12:36.111Z', '2026-11-01T20:12:36.111Z'),
(E'cmvy9o5n301hwbogy2uyl2hwv', E'cmvy9o5n001hqbogy8uqcmmiq', E'cmvy9o5bh0092bogyc9mqczpo', E'NUMERIC', E'3', NULL, NULL, NULL, E'5 + 2 =', NULL, E'7', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 3, NULL, NULL, NULL, '2026-11-01T20:12:36.111Z', '2026-11-01T20:12:36.111Z'),
(E'cmvy9o5n301hybogy1ab114dl', E'cmvy9o5n001hqbogy8uqcmmiq', E'cmvy9o5bh0092bogyc9mqczpo', E'NUMERIC', E'4', NULL, NULL, NULL, E'3 + 3 =', NULL, E'6', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 4, NULL, NULL, NULL, '2026-11-01T20:12:36.112Z', '2026-11-01T20:12:36.112Z'),
(E'cmvy9o5n401i0bogyybgva92r', E'cmvy9o5n001hqbogy8uqcmmiq', E'cmvy9o5bh0092bogyc9mqczpo', E'NUMERIC', E'5', NULL, NULL, NULL, E'6 + 0 =', NULL, E'6', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 5, NULL, NULL, NULL, '2026-11-01T20:12:36.112Z', '2026-11-01T20:12:36.112Z')
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "Question" ("id", "paperId", "topicId", "type", "displayNumber", "section", "stimulus", "imageUrl", "prompt", "options", "correctAnswer", "acceptedAnswers", "explanation", "markingGuide", "numericTolerance", "caseSensitive", "requiresTeacher", "points", "order", "parentId", "unit", "partialRule", "createdAt", "updatedAt") VALUES
(E'cmvy9o5n401i2bogy36q4269u', E'cmvy9o5n001hqbogy8uqcmmiq', E'cmvy9o5bh0092bogyc9mqczpo', E'NUMERIC', E'6', NULL, NULL, NULL, E'🐥🐥 + 🐥🐥🐥 = ?', NULL, E'5', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 6, NULL, NULL, NULL, '2026-11-01T20:12:36.112Z', '2026-11-01T20:12:36.112Z'),
(E'cmvy9o5n401i4bogye2x5r8h8', E'cmvy9o5n001hqbogy8uqcmmiq', E'cmvy9o5bh0092bogyc9mqczpo', E'NUMERIC', E'7', NULL, NULL, NULL, E'Amina has 4 sweets. Her friend gives her 3 more. How many sweets does she have?', NULL, E'7', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 7, NULL, NULL, NULL, '2026-11-01T20:12:36.113Z', '2026-11-01T20:12:36.113Z'),
(E'cmvy9o5n501i6bogyfpklu9bj', E'cmvy9o5n001hqbogy8uqcmmiq', E'cmvy9o5bh0092bogyc9mqczpo', E'NUMERIC', E'8', NULL, NULL, NULL, E'1 + 8 =', NULL, E'9', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 8, NULL, NULL, NULL, '2026-11-01T20:12:36.113Z', '2026-11-01T20:12:36.113Z'),
(E'cmvy9o5n601iabogykttf9u2p', E'cmvy9o5n501i8bogy0lkktgtm', E'cmvy9o5bg008wbogybmvbxysp', E'FILL_BLANK', E'1', NULL, NULL, NULL, E'Write the number six in figures.', NULL, E'"6"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 1, NULL, NULL, NULL, '2026-11-01T20:12:36.114Z', '2026-11-01T20:12:36.114Z'),
(E'cmvy9o5n601icbogynekjcswj', E'cmvy9o5n501i8bogy0lkktgtm', E'cmvy9o5bg008wbogybmvbxysp', E'FILL_BLANK', E'2', NULL, NULL, NULL, E'Write the number that comes after 7.', NULL, E'"8"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 2, NULL, NULL, NULL, '2026-11-01T20:12:36.115Z', '2026-11-01T20:12:36.115Z'),
(E'cmvy9o5n601iebogyfnx6v5qk', E'cmvy9o5n501i8bogy0lkktgtm', E'cmvy9o5bg008wbogybmvbxysp', E'FILL_BLANK', E'3', NULL, NULL, NULL, E'Write the number before 5.', NULL, E'"4"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 3, NULL, NULL, NULL, '2026-11-01T20:12:36.115Z', '2026-11-01T20:12:36.115Z'),
(E'cmvy9o5n701igbogyjta7wxdy', E'cmvy9o5n501i8bogy0lkktgtm', E'cmvy9o5bg008wbogybmvbxysp', E'MULTIPLE_CHOICE', E'4', NULL, NULL, NULL, E'Which number is ''three''?', E'["3","8","5"]', E'"3"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 4, NULL, NULL, NULL, '2026-11-01T20:12:36.115Z', '2026-11-01T20:12:36.115Z'),
(E'cmvy9o5n701iibogysm40cind', E'cmvy9o5n501i8bogy0lkktgtm', E'cmvy9o5bg008wbogybmvbxysp', E'FILL_BLANK', E'5', NULL, NULL, NULL, E'Write ''ten'' in figures.', NULL, E'"10"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 5, NULL, NULL, NULL, '2026-11-01T20:12:36.116Z', '2026-11-01T20:12:36.116Z'),
(E'cmvy9o5n801ikbogys055my45', E'cmvy9o5n501i8bogy0lkktgtm', E'cmvy9o5bg008wbogybmvbxysp', E'MULTIPLE_CHOICE', E'6', NULL, NULL, NULL, E'Which is the number ''nine''?', E'["6","9","4"]', E'"9"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 6, NULL, NULL, NULL, '2026-11-01T20:12:36.116Z', '2026-11-01T20:12:36.116Z'),
(E'cmvy9o5n801imbogy1s4wzop1', E'cmvy9o5n501i8bogy0lkktgtm', E'cmvy9o5bg008wbogybmvbxysp', E'DRAWING', E'7', NULL, NULL, NULL, E'Write the numbers 1 to 5 in order.', NULL, E'"Digits 1, 2, 3, 4, 5 written in order and correctly formed."', NULL, NULL, E'Digits 1, 2, 3, 4, 5 written in order and correctly formed.', NULL, FALSE, FALSE, 2, 7, NULL, NULL, NULL, '2026-11-01T20:12:36.116Z', '2026-11-01T20:12:36.116Z'),
(E'cmvy9o5na01isbogyz4zdck0u', E'cmvy9o5n901iqbogytmn9sje8', E'cmvy9o5bk009ebogyxgl6rjov', E'MULTIPLE_CHOICE', E'1', NULL, NULL, NULL, E'Which word is ''c-a-t''?', E'["cat","cot","cut"]', E'"cat"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 1, NULL, NULL, NULL, '2026-11-01T20:12:36.118Z', '2026-11-01T20:12:36.118Z'),
(E'cmvy9o5na01iubogy63uecuo3', E'cmvy9o5n901iqbogytmn9sje8', E'cmvy9o5bk009ebogyxgl6rjov', E'MULTIPLE_CHOICE', E'2', NULL, NULL, NULL, E'Which picture matches ''hen''?', E'["🐔","🐶","🐷"]', E'"🐔"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 2, NULL, NULL, NULL, '2026-11-01T20:12:36.118Z', '2026-11-01T20:12:36.118Z'),
(E'cmvy9o5na01iwbogyblkem9lc', E'cmvy9o5n901iqbogytmn9sje8', E'cmvy9o5bk009ebogyxgl6rjov', E'MULTIPLE_CHOICE', E'3', NULL, NULL, NULL, E'Which word rhymes with ''dog''?', E'["log","cat","sun"]', E'"log"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 3, NULL, NULL, NULL, '2026-11-01T20:12:36.119Z', '2026-11-01T20:12:36.119Z'),
(E'cmvy9o5nb01iybogy2ilfpww2', E'cmvy9o5n901iqbogytmn9sje8', E'cmvy9o5bk009ebogyxgl6rjov', E'MULTIPLE_CHOICE', E'4', NULL, NULL, NULL, E'What is the middle sound in ''pig''?', E'["i","a","o"]', E'"i"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 4, NULL, NULL, NULL, '2026-11-01T20:12:36.119Z', '2026-11-01T20:12:36.119Z'),
(E'cmvy9o5nb01j0bogywqd29pxs', E'cmvy9o5n901iqbogytmn9sje8', E'cmvy9o5bk009ebogyxgl6rjov', E'MULTIPLE_CHOICE', E'5', NULL, NULL, NULL, E'Which word is the name of something hot in the sky?', E'["sun","mat","pen"]', E'"sun"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 5, NULL, NULL, NULL, '2026-11-01T20:12:36.120Z', '2026-11-01T20:12:36.120Z'),
(E'cmvy9o5nb01j2bogy8mzzkjlo', E'cmvy9o5n901iqbogytmn9sje8', E'cmvy9o5bk009ebogyxgl6rjov', E'FILL_BLANK', E'6', NULL, NULL, NULL, E'Finish the word: p _ g (a farm animal)', NULL, E'"pig"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 6, NULL, NULL, NULL, '2026-11-01T20:12:36.120Z', '2026-11-01T20:12:36.120Z'),
(E'cmvy9o5nc01j4bogyto14aw85', E'cmvy9o5n901iqbogytmn9sje8', E'cmvy9o5bk009ebogyxgl6rjov', E'FILL_BLANK', E'7', NULL, NULL, NULL, E'Finish the word: h _ t (you wear it on your head)', NULL, E'"hat"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 7, NULL, NULL, NULL, '2026-11-01T20:12:36.120Z', '2026-11-01T20:12:36.120Z'),
(E'cmvy9o5nc01j6bogyivkpxnkl', E'cmvy9o5n901iqbogytmn9sje8', E'cmvy9o5bk009ebogyxgl6rjov', E'MULTIPLE_CHOICE', E'8', NULL, NULL, NULL, E'Read: ''The cat sat on the ___.'' Which word fits?', E'["mat","sun","jug"]', E'"mat"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 8, NULL, NULL, NULL, '2026-11-01T20:12:36.121Z', '2026-11-01T20:12:36.121Z'),
(E'cmvy9o5nh01jabogy1uanimyw', E'cmvy9o5nf01j8bogy7ec2hex2', E'cmvy9o5bm009sbogy5ex5bufq', E'MULTIPLE_CHOICE', E'1', NULL, NULL, NULL, E'Which letter is the capital (big) ''a''?', E'["A","a","e"]', E'"A"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 1, NULL, NULL, NULL, '2026-11-01T20:12:36.126Z', '2026-11-01T20:12:36.126Z'),
(E'cmvy9o5ni01jcbogyz2xxkpnr', E'cmvy9o5nf01j8bogy7ec2hex2', E'cmvy9o5bm009sbogy5ex5bufq', E'MULTIPLE_CHOICE', E'2', NULL, NULL, NULL, E'Names of people begin with a...', E'["capital letter","small letter","number"]', E'"capital letter"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 2, NULL, NULL, NULL, '2026-11-01T20:12:36.126Z', '2026-11-01T20:12:36.126Z'),
(E'cmvy9o5ni01jebogysnzpk2rm', E'cmvy9o5nf01j8bogy7ec2hex2', E'cmvy9o5bm009sbogy5ex5bufq', E'MULTIPLE_CHOICE', E'3', NULL, NULL, NULL, E'Which is written correctly?', E'["Musa","musa","MUsa"]', E'"Musa"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 3, NULL, NULL, NULL, '2026-11-01T20:12:36.127Z', '2026-11-01T20:12:36.127Z'),
(E'cmvy9o5nj01jgbogymjf3powp', E'cmvy9o5nf01j8bogy7ec2hex2', E'cmvy9o5bm009sbogy5ex5bufq', E'MULTIPLE_CHOICE', E'4', NULL, NULL, NULL, E'Which hand do most people write with?', E'["right hand","foot","head"]', E'"right hand"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 4, NULL, NULL, NULL, '2026-11-01T20:12:36.127Z', '2026-11-01T20:12:36.127Z'),
(E'cmvy9o5nj01jibogyiy9bsuna', E'cmvy9o5nf01j8bogy7ec2hex2', E'cmvy9o5bm009sbogy5ex5bufq', E'DRAWING', E'5', NULL, NULL, NULL, E'Write your name neatly on the line.', NULL, E'"Name written with a capital first letter and clear letter forms."', NULL, NULL, E'Name written with a capital first letter and clear letter forms.', NULL, FALSE, FALSE, 2, 5, NULL, NULL, NULL, '2026-11-01T20:12:36.128Z', '2026-11-01T20:12:36.128Z'),
(E'cmvy9o5nk01jkbogyll9x75vc', E'cmvy9o5nf01j8bogy7ec2hex2', E'cmvy9o5bm009sbogy5ex5bufq', E'DRAWING', E'6', NULL, NULL, NULL, E'Write the small letters a, b, c.', NULL, E'"Letters a, b, c correctly formed."', NULL, NULL, E'Letters a, b, c correctly formed.', NULL, FALSE, FALSE, 2, 6, NULL, NULL, NULL, '2026-11-01T20:12:36.128Z', '2026-11-01T20:12:36.128Z'),
(E'cmvy9o5nl01jobogy5maka3nz', E'cmvy9o5nk01jmbogygm2y7x7q', E'cmvy9o5bt00aqbogyrkd53v7a', E'MULTIPLE_CHOICE', E'1', NULL, NULL, NULL, E'What do we say in the morning?', E'["Good morning","Good night","Goodbye"]', E'"Good morning"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 1, NULL, NULL, NULL, '2026-11-01T20:12:36.129Z', '2026-11-01T20:12:36.129Z'),
(E'cmvy9o5nl01jqbogyq3ls8704', E'cmvy9o5nk01jmbogygm2y7x7q', E'cmvy9o5bt00aqbogyrkd53v7a', E'MULTIPLE_CHOICE', E'2', NULL, NULL, NULL, E'What do we say in the afternoon?', E'["Good afternoon","Good morning","Good night"]', E'"Good afternoon"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 2, NULL, NULL, NULL, '2026-11-01T20:12:36.130Z', '2026-11-01T20:12:36.130Z'),
(E'cmvy9o5nl01jsbogyz36pcefq', E'cmvy9o5nk01jmbogygm2y7x7q', E'cmvy9o5bt00aqbogyrkd53v7a', E'MULTIPLE_CHOICE', E'3', NULL, NULL, NULL, E'What do we say before we sleep?', E'["Good night","Good morning","Hello"]', E'"Good night"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 3, NULL, NULL, NULL, '2026-11-01T20:12:36.130Z', '2026-11-01T20:12:36.130Z'),
(E'cmvy9o5nm01jubogykrpzz5pd', E'cmvy9o5nk01jmbogygm2y7x7q', E'cmvy9o5bt00aqbogyrkd53v7a', E'MULTIPLE_CHOICE', E'4', NULL, NULL, NULL, E'Someone says ''How are you?'' You say...', E'["I am fine, thank you.","Good night.","Sit down."]', E'"I am fine, thank you."', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 4, NULL, NULL, NULL, '2026-11-01T20:12:36.130Z', '2026-11-01T20:12:36.130Z'),
(E'cmvy9o5nm01jwbogy5v65n2jh', E'cmvy9o5nk01jmbogygm2y7x7q', E'cmvy9o5bt00aqbogyrkd53v7a', E'MULTIPLE_CHOICE', E'5', NULL, NULL, NULL, E'When you leave school you say...', E'["Goodbye","Good morning","Come in"]', E'"Goodbye"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 5, NULL, NULL, NULL, '2026-11-01T20:12:36.131Z', '2026-11-01T20:12:36.131Z'),
(E'cmvy9o5nm01jybogy2pr3v60s', E'cmvy9o5nk01jmbogygm2y7x7q', E'cmvy9o5bt00aqbogyrkd53v7a', E'MULTIPLE_CHOICE', E'6', NULL, NULL, NULL, E'What do we say when we want something?', E'["Please","No","Go"]', E'"Please"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 6, NULL, NULL, NULL, '2026-11-01T20:12:36.131Z', '2026-11-01T20:12:36.131Z'),
(E'cmvy9o5no01k4bogy3vw68zq1', E'cmvy9o5nn01k2bogy8xgls6po', E'cmvy9o5ch00e0bogy83340a1m', E'MULTIPLE_CHOICE', E'1', NULL, NULL, NULL, E'How many stars are here? ★ ★ ★ ★ ★ ★ ★', E'["6","7","8","5"]', E'"7"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 1, NULL, NULL, NULL, '2026-11-01T20:12:36.132Z', '2026-11-01T20:12:36.132Z'),
(E'cmvy9o5no01k6bogy1n8r5yvs', E'cmvy9o5nn01k2bogy8xgls6po', E'cmvy9o5ch00e0bogy83340a1m', E'FILL_BLANK', E'2', NULL, NULL, NULL, E'Write the number ''fourteen'' in figures.', NULL, E'"14"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 2, NULL, NULL, NULL, '2026-11-01T20:12:36.133Z', '2026-11-01T20:12:36.133Z'),
(E'cmvy9o5np01k8bogylsarmzrp', E'cmvy9o5nn01k2bogy8xgls6po', E'cmvy9o5ch00e0bogy83340a1m', E'FILL_BLANK', E'3', NULL, NULL, NULL, E'Write 9 in words.', NULL, E'"nine"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 3, NULL, NULL, NULL, '2026-11-01T20:12:36.133Z', '2026-11-01T20:12:36.133Z'),
(E'cmvy9o5np01kabogyoqobebqh', E'cmvy9o5nn01k2bogy8xgls6po', E'cmvy9o5ch00e0bogy83340a1m', E'NUMERIC', E'4', NULL, NULL, NULL, E'What number comes after 16?', NULL, E'17', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 4, NULL, NULL, NULL, '2026-11-01T20:12:36.134Z', '2026-11-01T20:12:36.134Z'),
(E'cmvy9o5np01kcbogyelldoo1m', E'cmvy9o5nn01k2bogy8xgls6po', E'cmvy9o5ch00e0bogy83340a1m', E'NUMERIC', E'5', NULL, NULL, NULL, E'What number comes before 11?', NULL, E'10', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 5, NULL, NULL, NULL, '2026-11-01T20:12:36.134Z', '2026-11-01T20:12:36.134Z'),
(E'cmvy9o5nq01kebogy4rx4ordj', E'cmvy9o5nn01k2bogy8xgls6po', E'cmvy9o5ch00e0bogy83340a1m', E'NUMERIC', E'6', NULL, NULL, NULL, E'What number is between 18 and 20?', NULL, E'19', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 6, NULL, NULL, NULL, '2026-11-01T20:12:36.134Z', '2026-11-01T20:12:36.134Z'),
(E'cmvy9o5nq01kgbogyzs3lt5j1', E'cmvy9o5nn01k2bogy8xgls6po', E'cmvy9o5ch00e0bogy83340a1m', E'MULTIPLE_CHOICE', E'7', NULL, NULL, NULL, E'Which number is bigger?', E'["8","12","5","3"]', E'"12"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 7, NULL, NULL, NULL, '2026-11-01T20:12:36.135Z', '2026-11-01T20:12:36.135Z'),
(E'cmvy9o5nr01kibogygimdxcch', E'cmvy9o5nn01k2bogy8xgls6po', E'cmvy9o5ch00e0bogy83340a1m', E'FILL_BLANK', E'8', NULL, NULL, NULL, E'Fill in the missing number: 2, 4, 6, ___, 10', NULL, E'"8"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 8, NULL, NULL, NULL, '2026-11-01T20:12:36.135Z', '2026-11-01T20:12:36.135Z'),
(E'cmvy9o5nr01kkbogykwqxlzzl', E'cmvy9o5nn01k2bogy8xgls6po', E'cmvy9o5ch00e0bogy83340a1m', E'FILL_BLANK', E'9', NULL, NULL, NULL, E'Fill in the missing number: 20, 19, 18, ___, 16', NULL, E'"17"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 9, NULL, NULL, NULL, '2026-11-01T20:12:36.136Z', '2026-11-01T20:12:36.136Z'),
(E'cmvy9o5ns01kmbogylqpnf8x3', E'cmvy9o5nn01k2bogy8xgls6po', E'cmvy9o5ch00e0bogy83340a1m', E'NUMERIC', E'10', NULL, NULL, NULL, E'Count the fingers on both your hands. How many are there?', NULL, E'10', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 10, NULL, NULL, NULL, '2026-11-01T20:12:36.136Z', '2026-11-01T20:12:36.136Z'),
(E'cmvy9o5nt01kqbogykap7595h', E'cmvy9o5ns01kobogydwl7j6em', E'cmvy9o5ci00e2bogy1n4gwjy3', E'NUMERIC', E'1', NULL, NULL, NULL, E'3 + 4 =', NULL, E'7', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 1, NULL, NULL, NULL, '2026-11-01T20:12:36.137Z', '2026-11-01T20:12:36.137Z'),
(E'cmvy9o5nv01ksbogyc968q3l4', E'cmvy9o5ns01kobogydwl7j6em', E'cmvy9o5ci00e2bogy1n4gwjy3', E'NUMERIC', E'2', NULL, NULL, NULL, E'5 + 5 =', NULL, E'10', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 2, NULL, NULL, NULL, '2026-11-01T20:12:36.139Z', '2026-11-01T20:12:36.139Z'),
(E'cmvy9o5nx01kubogyvb2lsxeb', E'cmvy9o5ns01kobogydwl7j6em', E'cmvy9o5ci00e2bogy1n4gwjy3', E'NUMERIC', E'3', NULL, NULL, NULL, E'8 + 6 =', NULL, E'14', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 3, NULL, NULL, NULL, '2026-11-01T20:12:36.141Z', '2026-11-01T20:12:36.141Z'),
(E'cmvy9o5nx01kwbogypxag1cfg', E'cmvy9o5ns01kobogydwl7j6em', E'cmvy9o5ci00e2bogy1n4gwjy3', E'NUMERIC', E'4', NULL, NULL, NULL, E'9 + 9 =', NULL, E'18', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 4, NULL, NULL, NULL, '2026-11-01T20:12:36.142Z', '2026-11-01T20:12:36.142Z'),
(E'cmvy9o5ny01kybogywpg8t9nn', E'cmvy9o5ns01kobogydwl7j6em', E'cmvy9o5ci00e2bogy1n4gwjy3', E'NUMERIC', E'5', NULL, NULL, NULL, E'Mary has 6 mangoes. Her mother gives her 5 more. How many mangoes does she have now?', NULL, E'11', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 5, NULL, NULL, NULL, '2026-11-01T20:12:36.142Z', '2026-11-01T20:12:36.142Z'),
(E'cmvy9o5ny01l0bogyis0hch3x', E'cmvy9o5ns01kobogydwl7j6em', E'cmvy9o5ci00e2bogy1n4gwjy3', E'NUMERIC', E'6', NULL, NULL, NULL, E'12 + 7 =', NULL, E'19', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 6, NULL, NULL, NULL, '2026-11-01T20:12:36.143Z', '2026-11-01T20:12:36.143Z'),
(E'cmvy9o5ny01l2bogya3130ix1', E'cmvy9o5ns01kobogydwl7j6em', E'cmvy9o5ci00e2bogy1n4gwjy3', E'NUMERIC', E'7', NULL, NULL, NULL, E'There are 4 goats and 3 cows. How many animals are there altogether?', NULL, E'7', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 7, NULL, NULL, NULL, '2026-11-01T20:12:36.143Z', '2026-11-01T20:12:36.143Z'),
(E'cmvy9o5nz01l4bogypqoqd4yu', E'cmvy9o5ns01kobogydwl7j6em', E'cmvy9o5ci00e2bogy1n4gwjy3', E'NUMERIC', E'8', NULL, NULL, NULL, E'0 + 15 =', NULL, E'15', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 8, NULL, NULL, NULL, '2026-11-01T20:12:36.143Z', '2026-11-01T20:12:36.143Z'),
(E'cmvy9o5nz01l6bogyn93omkvi', E'cmvy9o5ns01kobogydwl7j6em', E'cmvy9o5ci00e2bogy1n4gwjy3', E'FILL_BLANK', E'9', NULL, NULL, NULL, E'Fill in the missing number: 6 + ___ = 10', NULL, E'"4"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 9, NULL, NULL, NULL, '2026-11-01T20:12:36.144Z', '2026-11-01T20:12:36.144Z'),
(E'cmvy9o5nz01l8bogybkv5wevn', E'cmvy9o5ns01kobogydwl7j6em', E'cmvy9o5ci00e2bogy1n4gwjy3', E'NUMERIC', E'10', NULL, NULL, NULL, E'Tom had 7 sweets. He got 3 more from his friend and 2 more from his aunt. How many sweets does he have?', NULL, E'12', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 10, NULL, NULL, NULL, '2026-11-01T20:12:36.144Z', '2026-11-01T20:12:36.144Z')
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "Question" ("id", "paperId", "topicId", "type", "displayNumber", "section", "stimulus", "imageUrl", "prompt", "options", "correctAnswer", "acceptedAnswers", "explanation", "markingGuide", "numericTolerance", "caseSensitive", "requiresTeacher", "points", "order", "parentId", "unit", "partialRule", "createdAt", "updatedAt") VALUES
(E'cmvy9o5o101lebogyx0a1ekff', E'cmvy9o5o101lcbogyfi63xpgn', E'cmvy9o5cc00dcbogyf1kppo5r', E'MULTIPLE_CHOICE', E'1', NULL, NULL, NULL, E'Which word is the name of an animal?', E'["desk","goat","run","big"]', E'"goat"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 1, NULL, NULL, NULL, '2026-11-01T20:12:36.146Z', '2026-11-01T20:12:36.146Z'),
(E'cmvy9o5o201lgbogy31kscaer', E'cmvy9o5o101lcbogyfi63xpgn', E'cmvy9o5cc00dcbogyf1kppo5r', E'MULTIPLE_CHOICE', E'2', NULL, NULL, NULL, E'Which word is the name of a person?', E'["chair","teacher","eat","red"]', E'"teacher"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 2, NULL, NULL, NULL, '2026-11-01T20:12:36.146Z', '2026-11-01T20:12:36.146Z'),
(E'cmvy9o5o201libogyml03od5v', E'cmvy9o5o101lcbogyfi63xpgn', E'cmvy9o5cc00dcbogyf1kppo5r', E'FILL_BLANK', E'3', NULL, NULL, NULL, E'Write the plural (many): one cup, two ______.', NULL, E'"cups"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 3, NULL, NULL, NULL, '2026-11-01T20:12:36.146Z', '2026-11-01T20:12:36.146Z'),
(E'cmvy9o5o201lkbogyxzf52ev4', E'cmvy9o5o101lcbogyfi63xpgn', E'cmvy9o5cc00dcbogyf1kppo5r', E'FILL_BLANK', E'4', NULL, NULL, NULL, E'Write the plural: one book, three ______.', NULL, E'"books"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 4, NULL, NULL, NULL, '2026-11-01T20:12:36.147Z', '2026-11-01T20:12:36.147Z'),
(E'cmvy9o5o201lmbogyqdll9p1h', E'cmvy9o5o101lcbogyfi63xpgn', E'cmvy9o5cc00dcbogyf1kppo5r', E'MULTIPLE_CHOICE', E'5', NULL, NULL, NULL, E'Which of these is found in a classroom?', E'["desk","cow","river","moon"]', E'"desk"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 5, NULL, NULL, NULL, '2026-11-01T20:12:36.147Z', '2026-11-01T20:12:36.147Z'),
(E'cmvy9o5o301lobogyf52a7vwr', E'cmvy9o5o101lcbogyfi63xpgn', E'cmvy9o5cc00dcbogyf1kppo5r', E'FILL_BLANK', E'6', NULL, NULL, NULL, E'Complete: This is a ______. (a thing we write with)', NULL, E'"pen"', E'["pencil"]', NULL, NULL, NULL, FALSE, FALSE, 1, 6, NULL, NULL, NULL, '2026-11-01T20:12:36.147Z', '2026-11-01T20:12:36.147Z'),
(E'cmvy9o5o301lqbogyqxbyg9xk', E'cmvy9o5o101lcbogyfi63xpgn', E'cmvy9o5cc00dcbogyf1kppo5r', E'MULTIPLE_CHOICE', E'7', NULL, NULL, NULL, E'Choose the naming word in this sentence: ''The dog is running.''', E'["is","running","dog","the"]', E'"dog"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 7, NULL, NULL, NULL, '2026-11-01T20:12:36.148Z', '2026-11-01T20:12:36.148Z'),
(E'cmvy9o5o401lsbogyslyx2hkx', E'cmvy9o5o101lcbogyfi63xpgn', E'cmvy9o5cc00dcbogyf1kppo5r', E'FILL_BLANK', E'8', NULL, NULL, NULL, E'Where do sick people go to see a doctor? A ______.', NULL, E'"hospital"', E'["clinic"]', NULL, NULL, NULL, FALSE, FALSE, 1, 8, NULL, NULL, NULL, '2026-11-01T20:12:36.148Z', '2026-11-01T20:12:36.148Z'),
(E'cmvy9o5o401lubogyp2si3an0', E'cmvy9o5o101lcbogyfi63xpgn', E'cmvy9o5cc00dcbogyf1kppo5r', E'MULTIPLE_CHOICE', E'9', NULL, NULL, NULL, E'Which word names a place?', E'["market","cat","sleep","sweet"]', E'"market"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 9, NULL, NULL, NULL, '2026-11-01T20:12:36.148Z', '2026-11-01T20:12:36.148Z'),
(E'cmvy9o5o501lwbogyjq2cgxt5', E'cmvy9o5o101lcbogyfi63xpgn', E'cmvy9o5cc00dcbogyf1kppo5r', E'DRAWING', E'10', NULL, NULL, NULL, E'Draw a cup and write its name under it.', NULL, E'"A recognisable cup drawing with the word ''cup'' written."', NULL, NULL, E'A recognisable cup drawing with the word ''cup'' written.', NULL, FALSE, FALSE, 2, 10, NULL, NULL, NULL, '2026-11-01T20:12:36.149Z', '2026-11-01T20:12:36.149Z'),
(E'cmvy9o5o701m2bogyt5krpahz', E'cmvy9o5o601m0bogyplfgidpj', E'cmvy9o5c300c4bogy6bh7jg0n', E'MULTIPLE_CHOICE', E'1', NULL, NULL, NULL, E'Which part of the body do we use for seeing?', E'["ears","eyes","nose","legs"]', E'"eyes"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 1, NULL, NULL, NULL, '2026-11-01T20:12:36.152Z', '2026-11-01T20:12:36.152Z'),
(E'cmvy9o5o801m4bogydi7n88fr', E'cmvy9o5o601m0bogyplfgidpj', E'cmvy9o5c300c4bogy6bh7jg0n', E'MULTIPLE_CHOICE', E'2', NULL, NULL, NULL, E'Which part of the body do we use for hearing?', E'["eyes","mouth","ears","hands"]', E'"ears"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 2, NULL, NULL, NULL, '2026-11-01T20:12:36.152Z', '2026-11-01T20:12:36.152Z'),
(E'cmvy9o5o801m6bogyfdpscahq', E'cmvy9o5o601m0bogyplfgidpj', E'cmvy9o5c300c4bogy6bh7jg0n', E'NUMERIC', E'3', NULL, NULL, NULL, E'How many fingers do you have on both hands?', NULL, E'10', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 3, NULL, NULL, NULL, '2026-11-01T20:12:36.152Z', '2026-11-01T20:12:36.152Z'),
(E'cmvy9o5o801m8bogyi5aae1p2', E'cmvy9o5o601m0bogyplfgidpj', E'cmvy9o5c300c4bogy6bh7jg0n', E'NUMERIC', E'4', NULL, NULL, NULL, E'How many eyes do you have?', NULL, E'2', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 4, NULL, NULL, NULL, '2026-11-01T20:12:36.153Z', '2026-11-01T20:12:36.153Z'),
(E'cmvy9o5o901mabogyjoxtwcmb', E'cmvy9o5o601m0bogyplfgidpj', E'cmvy9o5c300c4bogy6bh7jg0n', E'SHORT_ANSWER', E'5', NULL, NULL, NULL, E'Which part of the body do we use to smell?', NULL, E'"Nose"', E'["the nose"]', NULL, NULL, NULL, FALSE, FALSE, 2, 5, NULL, NULL, NULL, '2026-11-01T20:12:36.153Z', '2026-11-01T20:12:36.153Z'),
(E'cmvy9o5o901mcbogyuzmtqep0', E'cmvy9o5o601m0bogyplfgidpj', E'cmvy9o5c300c4bogy6bh7jg0n', E'MULTIPLE_CHOICE', E'6', NULL, NULL, NULL, E'What do we use to brush our teeth?', E'["a spoon","a toothbrush","a comb","a pencil"]', E'"a toothbrush"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 6, NULL, NULL, NULL, '2026-11-01T20:12:36.154Z', '2026-11-01T20:12:36.154Z'),
(E'cmvy9o5oa01mebogyzs8eps1d', E'cmvy9o5o601m0bogyplfgidpj', E'cmvy9o5c300c4bogy6bh7jg0n', E'SHORT_ANSWER', E'7', NULL, NULL, NULL, E'Name one thing we need to bathe.', NULL, E'"Water (and soap)"', E'["soap","water","soap and water","a basin","a towel"]', NULL, NULL, NULL, FALSE, FALSE, 2, 7, NULL, NULL, NULL, '2026-11-01T20:12:36.154Z', '2026-11-01T20:12:36.154Z'),
(E'cmvy9o5oa01mgbogyuzshg8rn', E'cmvy9o5o601m0bogyplfgidpj', E'cmvy9o5c300c4bogy6bh7jg0n', E'SHORT_ANSWER', E'8', NULL, NULL, NULL, E'When should we wash our hands?', NULL, E'"Before eating and after using the toilet."', E'["before eating","after visiting the toilet","after using the latrine","before eating food","after toilet"]', NULL, NULL, NULL, FALSE, FALSE, 2, 8, NULL, NULL, NULL, '2026-11-01T20:12:36.154Z', '2026-11-01T20:12:36.154Z'),
(E'cmvy9o5oa01mibogyeqi506re', E'cmvy9o5o601m0bogyplfgidpj', E'cmvy9o5c300c4bogy6bh7jg0n', E'MULTIPLE_CHOICE', E'9', NULL, NULL, NULL, E'Which part of the body do we use for walking?', E'["hands","head","legs","ears"]', E'"legs"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 9, NULL, NULL, NULL, '2026-11-01T20:12:36.155Z', '2026-11-01T20:12:36.155Z'),
(E'cmvy9o5ob01mkbogy8i02jl5r', E'cmvy9o5o601m0bogyplfgidpj', E'cmvy9o5c300c4bogy6bh7jg0n', E'DRAWING', E'10', NULL, NULL, NULL, E'Draw a face and show the eyes, nose and mouth.', NULL, E'"A face with two eyes, a nose and a mouth drawn."', NULL, NULL, E'A face with two eyes, a nose and a mouth drawn.', NULL, FALSE, FALSE, 2, 10, NULL, NULL, NULL, '2026-11-01T20:12:36.155Z', '2026-11-01T20:12:36.155Z'),
(E'cmvy9o5of01mqbogyxv4rg2xm', E'cmvy9o5oc01mobogysjjm2biv', E'cmvy9o5dd00iabogyep2sxwch', E'NUMERIC', E'1', NULL, NULL, NULL, E'2 × 6 =', NULL, E'12', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 1, NULL, NULL, NULL, '2026-11-01T20:12:36.160Z', '2026-11-01T20:12:36.160Z'),
(E'cmvy9o5of01msbogyazwo2v1z', E'cmvy9o5oc01mobogysjjm2biv', E'cmvy9o5dd00iabogyep2sxwch', E'NUMERIC', E'2', NULL, NULL, NULL, E'3 × 4 =', NULL, E'12', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 2, NULL, NULL, NULL, '2026-11-01T20:12:36.160Z', '2026-11-01T20:12:36.160Z'),
(E'cmvy9o5og01mubogyxf8omuq5', E'cmvy9o5oc01mobogysjjm2biv', E'cmvy9o5dd00iabogyep2sxwch', E'NUMERIC', E'3', NULL, NULL, NULL, E'5 × 7 =', NULL, E'35', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 3, NULL, NULL, NULL, '2026-11-01T20:12:36.160Z', '2026-11-01T20:12:36.160Z'),
(E'cmvy9o5og01mwbogysa15x6vg', E'cmvy9o5oc01mobogysjjm2biv', E'cmvy9o5dd00iabogyep2sxwch', E'NUMERIC', E'4', NULL, NULL, NULL, E'10 × 8 =', NULL, E'80', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 4, NULL, NULL, NULL, '2026-11-01T20:12:36.161Z', '2026-11-01T20:12:36.161Z'),
(E'cmvy9o5oh01mybogy9yjal6ab', E'cmvy9o5oc01mobogysjjm2biv', E'cmvy9o5dd00iabogyep2sxwch', E'NUMERIC', E'5', NULL, NULL, NULL, E'3 × 9 =', NULL, E'27', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 5, NULL, NULL, NULL, '2026-11-01T20:12:36.161Z', '2026-11-01T20:12:36.161Z'),
(E'cmvy9o5oh01n0bogyir3mwr8y', E'cmvy9o5oc01mobogysjjm2biv', E'cmvy9o5dd00iabogyep2sxwch', E'NUMERIC', E'6', NULL, NULL, NULL, E'There are 4 bicycles. Each bicycle has 2 wheels. How many wheels are there altogether?', NULL, E'8', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 6, NULL, NULL, NULL, '2026-11-01T20:12:36.161Z', '2026-11-01T20:12:36.161Z'),
(E'cmvy9o5oh01n2bogyjb9vvtu8', E'cmvy9o5oc01mobogysjjm2biv', E'cmvy9o5dd00iabogyep2sxwch', E'NUMERIC', E'7', NULL, NULL, NULL, E'A hen has 2 legs. How many legs do 7 hens have?', NULL, E'14', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 7, NULL, NULL, NULL, '2026-11-01T20:12:36.162Z', '2026-11-01T20:12:36.162Z'),
(E'cmvy9o5oi01n4bogyo8lm909p', E'cmvy9o5oc01mobogysjjm2biv', E'cmvy9o5dd00iabogyep2sxwch', E'NUMERIC', E'8', NULL, NULL, NULL, E'Each pupil has 5 fingers on one hand. How many fingers do 6 pupils have on one hand each?', NULL, E'30', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 8, NULL, NULL, NULL, '2026-11-01T20:12:36.162Z', '2026-11-01T20:12:36.162Z'),
(E'cmvy9o5oi01n6bogygag0tjwd', E'cmvy9o5oc01mobogysjjm2biv', E'cmvy9o5dd00iabogyep2sxwch', E'FILL_BLANK', E'9', NULL, NULL, NULL, E'Fill in the missing number: 3 × ___ = 15', NULL, E'"5"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 9, NULL, NULL, NULL, '2026-11-01T20:12:36.162Z', '2026-11-01T20:12:36.162Z'),
(E'cmvy9o5oi01n8bogye2id0qgp', E'cmvy9o5oc01mobogysjjm2biv', E'cmvy9o5dd00iabogyep2sxwch', E'MULTIPLE_CHOICE', E'10', NULL, NULL, NULL, E'Which of these is the same as 4 + 4 + 4?', E'["3 × 4","4 × 4","3 + 4","4 × 2"]', E'"3 × 4"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 10, NULL, NULL, NULL, '2026-11-01T20:12:36.163Z', '2026-11-01T20:12:36.163Z'),
(E'cmvy9o5oj01ncbogy5b70ursw', E'cmvy9o5oj01nabogye3prrpbr', E'cmvy9o5de00ikbogyb1trsyx5', E'NUMERIC', E'1', NULL, NULL, NULL, E'How many days are there in a week?', NULL, E'7', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 1, NULL, NULL, NULL, '2026-11-01T20:12:36.164Z', '2026-11-01T20:12:36.164Z'),
(E'cmvy9o5ok01nebogyixrvvh78', E'cmvy9o5oj01nabogye3prrpbr', E'cmvy9o5de00ikbogyb1trsyx5', E'NUMERIC', E'2', NULL, NULL, NULL, E'How many months are there in a year?', NULL, E'12', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 2, NULL, NULL, NULL, '2026-11-01T20:12:36.164Z', '2026-11-01T20:12:36.164Z'),
(E'cmvy9o5ok01ngbogyqx8uwnqk', E'cmvy9o5oj01nabogye3prrpbr', E'cmvy9o5de00ikbogyb1trsyx5', E'MULTIPLE_CHOICE', E'3', NULL, NULL, NULL, E'Which day comes after Tuesday?', E'["Monday","Wednesday","Thursday","Sunday"]', E'"Wednesday"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 3, NULL, NULL, NULL, '2026-11-01T20:12:36.165Z', '2026-11-01T20:12:36.165Z'),
(E'cmvy9o5ok01nibogyld55isy0', E'cmvy9o5oj01nabogye3prrpbr', E'cmvy9o5de00ikbogyb1trsyx5', E'MULTIPLE_CHOICE', E'4', NULL, NULL, NULL, E'Which month comes before March?', E'["April","January","February","May"]', E'"February"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 4, NULL, NULL, NULL, '2026-11-01T20:12:36.165Z', '2026-11-01T20:12:36.165Z'),
(E'cmvy9o5ol01nkbogyinozi8bl', E'cmvy9o5oj01nabogye3prrpbr', E'cmvy9o5de00ikbogyb1trsyx5', E'NUMERIC', E'5', NULL, NULL, NULL, E'How many hours are there in a day?', NULL, E'24', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 5, NULL, NULL, NULL, '2026-11-01T20:12:36.165Z', '2026-11-01T20:12:36.165Z'),
(E'cmvy9o5ol01nmbogy7eqlw4qg', E'cmvy9o5oj01nabogye3prrpbr', E'cmvy9o5de00ikbogyb1trsyx5', E'MULTIPLE_CHOICE', E'6', NULL, NULL, NULL, E'When the long hand points to 12 and the short hand points to 3, the time is:', E'["12 o''clock","3 o''clock","half past 3","6 o''clock"]', E'"3 o''clock"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 6, NULL, NULL, NULL, '2026-11-01T20:12:36.166Z', '2026-11-01T20:12:36.166Z'),
(E'cmvy9o5ol01nobogyi66fkrvw', E'cmvy9o5oj01nabogye3prrpbr', E'cmvy9o5de00ikbogyb1trsyx5', E'NUMERIC', E'7', NULL, NULL, NULL, E'How many minutes are there in one hour?', NULL, E'60', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 7, NULL, NULL, NULL, '2026-11-01T20:12:36.166Z', '2026-11-01T20:12:36.166Z'),
(E'cmvy9o5om01nqbogy8qus85fv', E'cmvy9o5oj01nabogye3prrpbr', E'cmvy9o5de00ikbogyb1trsyx5', E'MULTIPLE_CHOICE', E'8', NULL, NULL, NULL, E'Which is the first month of the year?', E'["December","January","March","June"]', E'"January"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 8, NULL, NULL, NULL, '2026-11-01T20:12:36.166Z', '2026-11-01T20:12:36.166Z'),
(E'cmvy9o5om01nsbogyw80ul7o9', E'cmvy9o5oj01nabogye3prrpbr', E'cmvy9o5de00ikbogyb1trsyx5', E'MULTIPLE_CHOICE', E'9', NULL, NULL, NULL, E'Which day of the week do most pupils not go to school?', E'["Monday","Tuesday","Sunday","Thursday"]', E'"Sunday"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 9, NULL, NULL, NULL, '2026-11-01T20:12:36.166Z', '2026-11-01T20:12:36.166Z'),
(E'cmvy9o5om01nubogyfqh0xbz3', E'cmvy9o5oj01nabogye3prrpbr', E'cmvy9o5de00ikbogyb1trsyx5', E'FILL_BLANK', E'10', NULL, NULL, NULL, E'Half past 7 can also be written as 7:______.', NULL, E'"30"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 10, NULL, NULL, NULL, '2026-11-01T20:12:36.167Z', '2026-11-01T20:12:36.167Z'),
(E'cmvy9o5oo01o0bogy4vkaac2b', E'cmvy9o5on01nybogy3fmg5wsc', E'cmvy9o5d500hibogy3n6gd008', E'FILL_BLANK', E'1', NULL, NULL, NULL, E'Yesterday I ______ (play) football.', NULL, E'"played"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 1, NULL, NULL, NULL, '2026-11-01T20:12:36.168Z', '2026-11-01T20:12:36.168Z'),
(E'cmvy9o5oo01o2bogyifgrcv2q', E'cmvy9o5on01nybogy3fmg5wsc', E'cmvy9o5d500hibogy3n6gd008', E'FILL_BLANK', E'2', NULL, NULL, NULL, E'Last week we ______ (go) to Jinja.', NULL, E'"went"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 2, NULL, NULL, NULL, '2026-11-01T20:12:36.169Z', '2026-11-01T20:12:36.169Z'),
(E'cmvy9o5op01o4bogy16itwwm5', E'cmvy9o5on01nybogy3fmg5wsc', E'cmvy9o5d500hibogy3n6gd008', E'FILL_BLANK', E'3', NULL, NULL, NULL, E'She ______ (eat) a mango yesterday.', NULL, E'"ate"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 3, NULL, NULL, NULL, '2026-11-01T20:12:36.169Z', '2026-11-01T20:12:36.169Z'),
(E'cmvy9o5op01o6bogyolikuo6o', E'cmvy9o5on01nybogy3fmg5wsc', E'cmvy9o5d500hibogy3n6gd008', E'FILL_BLANK', E'4', NULL, NULL, NULL, E'The boys ______ (wash) the plates last night.', NULL, E'"washed"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 4, NULL, NULL, NULL, '2026-11-01T20:12:36.169Z', '2026-11-01T20:12:36.169Z'),
(E'cmvy9o5op01o8bogyv63jpfms', E'cmvy9o5on01nybogy3fmg5wsc', E'cmvy9o5d500hibogy3n6gd008', E'FILL_BLANK', E'5', NULL, NULL, NULL, E'Yesterday Tom ______ (see) a big snake.', NULL, E'"saw"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 5, NULL, NULL, NULL, '2026-11-01T20:12:36.170Z', '2026-11-01T20:12:36.170Z'),
(E'cmvy9o5oq01oabogycyciv6hz', E'cmvy9o5on01nybogy3fmg5wsc', E'cmvy9o5d500hibogy3n6gd008', E'FILL_BLANK', E'6', NULL, NULL, NULL, E'Mother ______ (cook) matooke yesterday.', NULL, E'"cooked"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 6, NULL, NULL, NULL, '2026-11-01T20:12:36.170Z', '2026-11-01T20:12:36.170Z'),
(E'cmvy9o5oq01ocbogyco18vxg1', E'cmvy9o5on01nybogy3fmg5wsc', E'cmvy9o5d500hibogy3n6gd008', E'FILL_BLANK', E'7', NULL, NULL, NULL, E'The baby ______ (sleep) well last night.', NULL, E'"slept"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 7, NULL, NULL, NULL, '2026-11-01T20:12:36.170Z', '2026-11-01T20:12:36.170Z'),
(E'cmvy9o5oq01oebogykjcrgdqm', E'cmvy9o5on01nybogy3fmg5wsc', E'cmvy9o5d500hibogy3n6gd008', E'FILL_BLANK', E'8', NULL, NULL, NULL, E'We ______ (sing) a song in class yesterday.', NULL, E'"sang"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 8, NULL, NULL, NULL, '2026-11-01T20:12:36.171Z', '2026-11-01T20:12:36.171Z'),
(E'cmvy9o5or01ogbogymsbs8etw', E'cmvy9o5on01nybogy3fmg5wsc', E'cmvy9o5d500hibogy3n6gd008', E'MULTIPLE_CHOICE', E'9', NULL, NULL, NULL, E'Choose the correct sentence.', E'["Yesterday I goed home.","Yesterday I went home.","Yesterday I go home.","Yesterday I going home."]', E'"Yesterday I went home."', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 9, NULL, NULL, NULL, '2026-11-01T20:12:36.171Z', '2026-11-01T20:12:36.171Z'),
(E'cmvy9o5or01oibogyuliph5rl', E'cmvy9o5on01nybogy3fmg5wsc', E'cmvy9o5d500hibogy3n6gd008', E'FILL_BLANK', E'10', NULL, NULL, NULL, E'Father ______ (buy) me a new bag last week.', NULL, E'"bought"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 10, NULL, NULL, NULL, '2026-11-01T20:12:36.171Z', '2026-11-01T20:12:36.171Z')
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "Question" ("id", "paperId", "topicId", "type", "displayNumber", "section", "stimulus", "imageUrl", "prompt", "options", "correctAnswer", "acceptedAnswers", "explanation", "markingGuide", "numericTolerance", "caseSensitive", "requiresTeacher", "points", "order", "parentId", "unit", "partialRule", "createdAt", "updatedAt") VALUES
(E'cmvy9o5ow01oobogynvpy615f', E'cmvy9o5os01ombogyg3wvt4b5', E'cmvy9o5cy00gabogyf5fne2r5', E'MULTIPLE_CHOICE', E'1', NULL, NULL, NULL, E'What do we use to measure rainfall?', E'["thermometer","rain gauge","wind vane","ruler"]', E'"rain gauge"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 1, NULL, NULL, NULL, '2026-11-01T20:12:36.176Z', '2026-11-01T20:12:36.176Z'),
(E'cmvy9o5ow01oqbogy5wmaikor', E'cmvy9o5os01ombogyg3wvt4b5', E'cmvy9o5cy00gabogyf5fne2r5', E'MULTIPLE_CHOICE', E'2', NULL, NULL, NULL, E'Which instrument shows the direction of the wind?', E'["rain gauge","wind vane","thermometer","clock"]', E'"wind vane"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 2, NULL, NULL, NULL, '2026-11-01T20:12:36.177Z', '2026-11-01T20:12:36.177Z'),
(E'cmvy9o5ox01osbogyeodit0vh', E'cmvy9o5os01ombogyg3wvt4b5', E'cmvy9o5cy00gabogyf5fne2r5', E'SHORT_ANSWER', E'3', NULL, NULL, NULL, E'What do we carry when it is raining so that we do not get wet?', NULL, E'"An umbrella"', E'["umbrella","a raincoat","raincoat"]', NULL, NULL, NULL, FALSE, FALSE, 2, 3, NULL, NULL, NULL, '2026-11-01T20:12:36.177Z', '2026-11-01T20:12:36.177Z'),
(E'cmvy9o5ox01oubogynhd5hxlr', E'cmvy9o5os01ombogyg3wvt4b5', E'cmvy9o5cy00gabogyf5fne2r5', E'MULTIPLE_CHOICE', E'4', NULL, NULL, NULL, E'When the sun shines brightly and it is hot, the weather is:', E'["rainy","windy","sunny","cloudy"]', E'"sunny"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 4, NULL, NULL, NULL, '2026-11-01T20:12:36.177Z', '2026-11-01T20:12:36.177Z'),
(E'cmvy9o5ox01owbogymq5k1k6h', E'cmvy9o5os01ombogyg3wvt4b5', E'cmvy9o5cy00gabogyf5fne2r5', E'SHORT_ANSWER', E'5', NULL, NULL, NULL, E'Name one thing we can do when the weather is windy.', NULL, E'"Fly a kite"', E'["flying kites","dry clothes","fly kites","winnow grain"]', NULL, NULL, NULL, FALSE, FALSE, 2, 5, NULL, NULL, NULL, '2026-11-01T20:12:36.178Z', '2026-11-01T20:12:36.178Z'),
(E'cmvy9o5oy01oybogywh3k1zbs', E'cmvy9o5os01ombogyg3wvt4b5', E'cmvy9o5cy00gabogyf5fne2r5', E'SHORT_ANSWER', E'6', NULL, NULL, NULL, E'What do we wear when it is cold?', NULL, E'"A sweater or jacket"', E'["sweater","jacket","a sweater","warm clothes","a jacket"]', NULL, NULL, NULL, FALSE, FALSE, 2, 6, NULL, NULL, NULL, '2026-11-01T20:12:36.178Z', '2026-11-01T20:12:36.178Z'),
(E'cmvy9o5oy01p0bogyj8tj1s2t', E'cmvy9o5os01ombogyg3wvt4b5', E'cmvy9o5cy00gabogyf5fne2r5', E'MULTIPLE_CHOICE', E'7', NULL, NULL, NULL, E'Too much rain can cause:', E'["drought","floods","sunshine","dust"]', E'"floods"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 7, NULL, NULL, NULL, '2026-11-01T20:12:36.178Z', '2026-11-01T20:12:36.178Z'),
(E'cmvy9o5oy01p2bogyxvuqmd2f', E'cmvy9o5os01ombogyg3wvt4b5', E'cmvy9o5cy00gabogyf5fne2r5', E'MULTIPLE_CHOICE', E'8', NULL, NULL, NULL, E'In which season do farmers plant seeds?', E'["dry season","rainy season","night","holiday"]', E'"rainy season"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 8, NULL, NULL, NULL, '2026-11-01T20:12:36.179Z', '2026-11-01T20:12:36.179Z'),
(E'cmvy9o5oy01p4bogy73p80ujm', E'cmvy9o5os01ombogyg3wvt4b5', E'cmvy9o5cy00gabogyf5fne2r5', E'SHORT_ANSWER', E'9', NULL, NULL, NULL, E'Name the instrument that measures how hot or cold it is.', NULL, E'"Thermometer"', E'["a thermometer"]', NULL, NULL, NULL, FALSE, FALSE, 2, 9, NULL, NULL, NULL, '2026-11-01T20:12:36.179Z', '2026-11-01T20:12:36.179Z'),
(E'cmvy9o5oz01p6bogyr6egojoa', E'cmvy9o5os01ombogyg3wvt4b5', E'cmvy9o5cy00gabogyf5fne2r5', E'DRAWING', E'10', NULL, NULL, NULL, E'Draw a weather symbol for a rainy day.', NULL, E'"A cloud with rain drops falling."', NULL, NULL, E'A cloud with rain drops falling.', NULL, FALSE, FALSE, 2, 10, NULL, NULL, NULL, '2026-11-01T20:12:36.179Z', '2026-11-01T20:12:36.179Z'),
(E'cmvy9o5p001pcbogyevw9nip2', E'cmvy9o5p001pabogyhw1qz6xs', E'cmvy9o5e700m8bogyc8giyzwc', E'MULTIPLE_CHOICE', E'1', NULL, NULL, NULL, E'What is the place value of 7 in 4,732?', E'["ones","tens","hundreds","thousands"]', E'"hundreds"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 1, NULL, NULL, NULL, '2026-11-01T20:12:36.181Z', '2026-11-01T20:12:36.181Z'),
(E'cmvy9o5p101pebogya1db7tv9', E'cmvy9o5p001pabogyhw1qz6xs', E'cmvy9o5e700m8bogyc8giyzwc', E'NUMERIC', E'2', NULL, NULL, NULL, E'What is the value of 9 in 2,915?', NULL, E'900', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 2, NULL, NULL, NULL, '2026-11-01T20:12:36.181Z', '2026-11-01T20:12:36.181Z'),
(E'cmvy9o5p101pgbogybglwp2gf', E'cmvy9o5p001pabogyhw1qz6xs', E'cmvy9o5e700m8bogyc8giyzwc', E'SHORT_ANSWER', E'3', NULL, NULL, NULL, E'Write 6,054 in words.', NULL, E'"Six thousand fifty-four"', E'["six thousand and fifty four","six thousand fifty four","six thousand and fifty-four"]', NULL, NULL, NULL, FALSE, FALSE, 2, 3, NULL, NULL, NULL, '2026-11-01T20:12:36.181Z', '2026-11-01T20:12:36.181Z'),
(E'cmvy9o5p101pibogy2l0mm8s7', E'cmvy9o5p001pabogyhw1qz6xs', E'cmvy9o5e700m8bogyc8giyzwc', E'NUMERIC', E'4', NULL, NULL, NULL, E'Write ''three thousand two hundred seven'' in figures.', NULL, E'3207', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 4, NULL, NULL, NULL, '2026-11-01T20:12:36.182Z', '2026-11-01T20:12:36.182Z'),
(E'cmvy9o5p201pkbogybxesvk4h', E'cmvy9o5p001pabogyhw1qz6xs', E'cmvy9o5e700m8bogyc8giyzwc', E'SHORT_ANSWER', E'5', NULL, NULL, NULL, E'Write 5,381 in expanded form.', NULL, E'"5,000 + 300 + 80 + 1"', E'["5000 + 300 + 80 + 1","5000+300+80+1"]', NULL, NULL, NULL, FALSE, FALSE, 2, 5, NULL, NULL, NULL, '2026-11-01T20:12:36.182Z', '2026-11-01T20:12:36.182Z'),
(E'cmvy9o5p201pmbogy16oiee0k', E'cmvy9o5p001pabogyhw1qz6xs', E'cmvy9o5e700m8bogyc8giyzwc', E'MULTIPLE_CHOICE', E'6', NULL, NULL, NULL, E'Which number is the smallest?', E'["3,456","3,465","3,546","3,445"]', E'"3,445"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 6, NULL, NULL, NULL, '2026-11-01T20:12:36.183Z', '2026-11-01T20:12:36.183Z'),
(E'cmvy9o5p201pobogy4d2m7n2e', E'cmvy9o5p001pabogyhw1qz6xs', E'cmvy9o5e700m8bogyc8giyzwc', E'NUMERIC', E'7', NULL, NULL, NULL, E'Round off 672 to the nearest ten.', NULL, E'670', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 7, NULL, NULL, NULL, '2026-11-01T20:12:36.183Z', '2026-11-01T20:12:36.183Z'),
(E'cmvy9o5p301pqbogyxjsruyx5', E'cmvy9o5p001pabogyhw1qz6xs', E'cmvy9o5e700m8bogyc8giyzwc', E'NUMERIC', E'8', NULL, NULL, NULL, E'Round off 1,250 to the nearest hundred.', NULL, E'1300', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 8, NULL, NULL, NULL, '2026-11-01T20:12:36.183Z', '2026-11-01T20:12:36.183Z'),
(E'cmvy9o5p301psbogyemo6bn1n', E'cmvy9o5p001pabogyhw1qz6xs', E'cmvy9o5e700m8bogyc8giyzwc', E'NUMERIC', E'9', NULL, NULL, NULL, E'What number comes just after 2,999?', NULL, E'3000', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 9, NULL, NULL, NULL, '2026-11-01T20:12:36.184Z', '2026-11-01T20:12:36.184Z'),
(E'cmvy9o5p401pubogyusnkrgyz', E'cmvy9o5p001pabogyhw1qz6xs', E'cmvy9o5e700m8bogyc8giyzwc', E'NUMERIC', E'10', NULL, NULL, NULL, E'Form the largest 4-digit number using 4, 9, 1, 6 once each.', NULL, E'9641', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 10, NULL, NULL, NULL, '2026-11-01T20:12:36.184Z', '2026-11-01T20:12:36.184Z'),
(E'cmvy9o5p501pybogylty2eyqk', E'cmvy9o5p401pwbogy4jxvca9h', E'cmvy9o5e900mgbogy5s4wehag', E'MULTIPLE_CHOICE', E'1', NULL, NULL, NULL, E'A cake is cut into 4 equal parts. One part is:', E'["½","¼","⅓","1"]', E'"¼"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 1, NULL, NULL, NULL, '2026-11-01T20:12:36.185Z', '2026-11-01T20:12:36.185Z'),
(E'cmvy9o5p501q0bogyqq9mosdm', E'cmvy9o5p401pwbogy4jxvca9h', E'cmvy9o5e900mgbogy5s4wehag', E'FILL_BLANK', E'2', NULL, NULL, NULL, E'Shade half of 8 circles. How many circles are shaded?', NULL, E'"4"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 2, NULL, NULL, NULL, '2026-11-01T20:12:36.185Z', '2026-11-01T20:12:36.185Z'),
(E'cmvy9o5p501q2bogyom2jr46f', E'cmvy9o5p401pwbogy4jxvca9h', E'cmvy9o5e900mgbogy5s4wehag', E'NUMERIC', E'3', NULL, NULL, NULL, E'What is ½ of 10?', NULL, E'5', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 3, NULL, NULL, NULL, '2026-11-01T20:12:36.186Z', '2026-11-01T20:12:36.186Z'),
(E'cmvy9o5p601q4bogyhy8ks07q', E'cmvy9o5p401pwbogy4jxvca9h', E'cmvy9o5e900mgbogy5s4wehag', E'NUMERIC', E'4', NULL, NULL, NULL, E'What is ¼ of 12?', NULL, E'3', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 4, NULL, NULL, NULL, '2026-11-01T20:12:36.186Z', '2026-11-01T20:12:36.186Z'),
(E'cmvy9o5p601q6bogyj9prdkjy', E'cmvy9o5p401pwbogy4jxvca9h', E'cmvy9o5e900mgbogy5s4wehag', E'MULTIPLE_CHOICE', E'5', NULL, NULL, NULL, E'Which fraction is bigger?', E'["½","¼"]', E'"½"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 5, NULL, NULL, NULL, '2026-11-01T20:12:36.187Z', '2026-11-01T20:12:36.187Z'),
(E'cmvy9o5p601q8bogy16r3v8xa', E'cmvy9o5p401pwbogy4jxvca9h', E'cmvy9o5e900mgbogy5s4wehag', E'FILL_BLANK', E'6', NULL, NULL, NULL, E'In the fraction ⅔, the number on top is called the ______.', NULL, E'"numerator"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 6, NULL, NULL, NULL, '2026-11-01T20:12:36.187Z', '2026-11-01T20:12:36.187Z'),
(E'cmvy9o5p701qabogy5fy493gk', E'cmvy9o5p401pwbogy4jxvca9h', E'cmvy9o5e900mgbogy5s4wehag', E'FILL_BLANK', E'7', NULL, NULL, NULL, E'Work out: ⅕ + ⅖', NULL, E'"3/5"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 7, NULL, NULL, NULL, '2026-11-01T20:12:36.187Z', '2026-11-01T20:12:36.187Z'),
(E'cmvy9o5p701qcbogy69toqsg8', E'cmvy9o5p401pwbogy4jxvca9h', E'cmvy9o5e900mgbogy5s4wehag', E'NUMERIC', E'8', NULL, NULL, NULL, E'A mother shares 1 bread equally among her 2 children. Each child gets ___ of the bread. (Enter the denominator.)', NULL, E'2', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 8, NULL, NULL, NULL, '2026-11-01T20:12:36.188Z', '2026-11-01T20:12:36.188Z'),
(E'cmvy9o5p801qebogy1sncobk1', E'cmvy9o5p401pwbogy4jxvca9h', E'cmvy9o5e900mgbogy5s4wehag', E'FILL_BLANK', E'9', NULL, NULL, NULL, E'Write ''three quarters'' as a fraction.', NULL, E'"3/4"', E'["¾"]', NULL, NULL, NULL, FALSE, FALSE, 1, 9, NULL, NULL, NULL, '2026-11-01T20:12:36.188Z', '2026-11-01T20:12:36.188Z'),
(E'cmvy9o5p801qgbogyb5lh5gtw', E'cmvy9o5p401pwbogy4jxvca9h', E'cmvy9o5e900mgbogy5s4wehag', E'DRAWING', E'10', NULL, NULL, NULL, E'Draw a circle and shade ½ of it.', NULL, E'"A circle divided into two equal parts with one half shaded."', NULL, NULL, E'A circle divided into two equal parts with one half shaded.', NULL, FALSE, FALSE, 2, 10, NULL, NULL, NULL, '2026-11-01T20:12:36.189Z', '2026-11-01T20:12:36.189Z'),
(E'cmvy9o5pc01qmbogyae9zchk9', E'cmvy9o5pc01qkbogy6a17d1py', E'cmvy9o5e100lobogy49v9lnye', E'MULTIPLE_CHOICE', E'1', NULL, NULL, NULL, E'Choose the describing word: ''The small cat is sleeping.''', E'["cat","small","sleeping","is"]', E'"small"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 1, NULL, NULL, NULL, '2026-11-01T20:12:36.193Z', '2026-11-01T20:12:36.193Z'),
(E'cmvy9o5pd01qobogyu5n5bz2k', E'cmvy9o5pc01qkbogy6a17d1py', E'cmvy9o5e100lobogy49v9lnye', E'FILL_BLANK', E'2', NULL, NULL, NULL, E'Complete: An elephant is ______ (big) than a goat.', NULL, E'"bigger"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 2, NULL, NULL, NULL, '2026-11-01T20:12:36.193Z', '2026-11-01T20:12:36.193Z'),
(E'cmvy9o5pd01qqbogyiowk305d', E'cmvy9o5pc01qkbogy6a17d1py', E'cmvy9o5e100lobogy49v9lnye', E'FILL_BLANK', E'3', NULL, NULL, NULL, E'Complete: Kato is the ______ (tall) boy in our class.', NULL, E'"tallest"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 3, NULL, NULL, NULL, '2026-11-01T20:12:36.193Z', '2026-11-01T20:12:36.193Z'),
(E'cmvy9o5pd01qsbogyp77qi2b3', E'cmvy9o5pc01qkbogy6a17d1py', E'cmvy9o5e100lobogy49v9lnye', E'FILL_BLANK', E'4', NULL, NULL, NULL, E'Complete: This road is ______ (long) than that one.', NULL, E'"longer"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 4, NULL, NULL, NULL, '2026-11-01T20:12:36.194Z', '2026-11-01T20:12:36.194Z'),
(E'cmvy9o5pe01qubogybmgr0ib6', E'cmvy9o5pc01qkbogy6a17d1py', E'cmvy9o5e100lobogy49v9lnye', E'FILL_BLANK', E'5', NULL, NULL, NULL, E'Give the opposite of ''hot''.', NULL, E'"cold"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 5, NULL, NULL, NULL, '2026-11-01T20:12:36.194Z', '2026-11-01T20:12:36.194Z'),
(E'cmvy9o5pe01qwbogy67obcgqv', E'cmvy9o5pc01qkbogy6a17d1py', E'cmvy9o5e100lobogy49v9lnye', E'FILL_BLANK', E'6', NULL, NULL, NULL, E'Give the opposite of ''clean''.', NULL, E'"dirty"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 6, NULL, NULL, NULL, '2026-11-01T20:12:36.194Z', '2026-11-01T20:12:36.194Z'),
(E'cmvy9o5pe01qybogyr866n2pp', E'cmvy9o5pc01qkbogy6a17d1py', E'cmvy9o5e100lobogy49v9lnye', E'FILL_BLANK', E'7', NULL, NULL, NULL, E'Complete: My drawing is good, but yours is ______.', NULL, E'"better"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 7, NULL, NULL, NULL, '2026-11-01T20:12:36.195Z', '2026-11-01T20:12:36.195Z'),
(E'cmvy9o5pf01r0bogyuyrk9vxs', E'cmvy9o5pc01qkbogy6a17d1py', E'cmvy9o5e100lobogy49v9lnye', E'FILL_BLANK', E'8', NULL, NULL, NULL, E'Complete: Today is the ______ (happy) day of my life.', NULL, E'"happiest"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 8, NULL, NULL, NULL, '2026-11-01T20:12:36.195Z', '2026-11-01T20:12:36.195Z'),
(E'cmvy9o5pf01r2bogy1gcqknu0', E'cmvy9o5pc01qkbogy6a17d1py', E'cmvy9o5e100lobogy49v9lnye', E'MULTIPLE_CHOICE', E'9', NULL, NULL, NULL, E'Choose the correct sentence.', E'["A mouse is smaller than a cat.","A mouse is smallest than a cat.","A mouse is more small than a cat.","A mouse is small than a cat."]', E'"A mouse is smaller than a cat."', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 9, NULL, NULL, NULL, '2026-11-01T20:12:36.196Z', '2026-11-01T20:12:36.196Z'),
(E'cmvy9o5pf01r4bogy5lufjcla', E'cmvy9o5pc01qkbogy6a17d1py', E'cmvy9o5e100lobogy49v9lnye', E'FILL_BLANK', E'10', NULL, NULL, NULL, E'Give the opposite of ''fast''.', NULL, E'"slow"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 10, NULL, NULL, NULL, '2026-11-01T20:12:36.196Z', '2026-11-01T20:12:36.196Z'),
(E'cmvy9o5pg01r8bogy7fg7qffv', E'cmvy9o5pg01r6bogyzii5491h', E'cmvy9o5e300m0bogy8309yabu', E'COMPREHENSION', E'1', NULL, E'Kato has a brown goat called Kakoko. Every morning before school, Kato takes Kakoko to the field to eat grass. He ties the goat to a tree with a long rope so that it does not eat the neighbour''s beans.

One day, Kato forgot to tie the rope well. Kakoko ran into Mrs Namutebi''s garden and ate many cabbages. Mrs Namutebi was very angry. Kato said sorry and helped her to plant new cabbages. After that, Kato always checked the rope twice.', NULL, E'What is the name of Kato''s goat?', NULL, E'"Kakoko"', NULL, NULL, E'Kakoko', NULL, FALSE, FALSE, 2, 1, NULL, NULL, NULL, '2026-11-01T20:12:36.197Z', '2026-11-01T20:12:36.197Z'),
(E'cmvy9o5ph01rabogyqd36l515', E'cmvy9o5pg01r6bogyzii5491h', E'cmvy9o5e300m0bogy8309yabu', E'COMPREHENSION', E'2', NULL, E'Kato has a brown goat called Kakoko. Every morning before school, Kato takes Kakoko to the field to eat grass. He ties the goat to a tree with a long rope so that it does not eat the neighbour''s beans.

One day, Kato forgot to tie the rope well. Kakoko ran into Mrs Namutebi''s garden and ate many cabbages. Mrs Namutebi was very angry. Kato said sorry and helped her to plant new cabbages. After that, Kato always checked the rope twice.', NULL, E'What colour is the goat?', NULL, E'"Brown"', NULL, NULL, E'Brown', NULL, FALSE, FALSE, 2, 2, NULL, NULL, NULL, '2026-11-01T20:12:36.198Z', '2026-11-01T20:12:36.198Z'),
(E'cmvy9o5pi01rcbogyr7htf5f9', E'cmvy9o5pg01r6bogyzii5491h', E'cmvy9o5e300m0bogy8309yabu', E'COMPREHENSION', E'3', NULL, E'Kato has a brown goat called Kakoko. Every morning before school, Kato takes Kakoko to the field to eat grass. He ties the goat to a tree with a long rope so that it does not eat the neighbour''s beans.

One day, Kato forgot to tie the rope well. Kakoko ran into Mrs Namutebi''s garden and ate many cabbages. Mrs Namutebi was very angry. Kato said sorry and helped her to plant new cabbages. After that, Kato always checked the rope twice.', NULL, E'Where does Kato take the goat every morning?', NULL, E'"To the field"', E'["the field","to the field to eat grass","field"]', NULL, E'To the field', NULL, FALSE, FALSE, 2, 3, NULL, NULL, NULL, '2026-11-01T20:12:36.198Z', '2026-11-01T20:12:36.198Z'),
(E'cmvy9o5pi01rebogyna5qjqcw', E'cmvy9o5pg01r6bogyzii5491h', E'cmvy9o5e300m0bogy8309yabu', E'COMPREHENSION', E'4', NULL, E'Kato has a brown goat called Kakoko. Every morning before school, Kato takes Kakoko to the field to eat grass. He ties the goat to a tree with a long rope so that it does not eat the neighbour''s beans.

One day, Kato forgot to tie the rope well. Kakoko ran into Mrs Namutebi''s garden and ate many cabbages. Mrs Namutebi was very angry. Kato said sorry and helped her to plant new cabbages. After that, Kato always checked the rope twice.', NULL, E'Why does Kato tie the goat to a tree?', NULL, E'"So that it does not eat the neighbour''s beans."', E'["so it does not eat the neighbour''s beans","to stop it eating the beans","so that it does not eat beans"]', NULL, E'So that it does not eat the neighbour''s beans.', NULL, FALSE, FALSE, 2, 4, NULL, NULL, NULL, '2026-11-01T20:12:36.198Z', '2026-11-01T20:12:36.198Z'),
(E'cmvy9o5pj01rgbogyldldhk5e', E'cmvy9o5pg01r6bogyzii5491h', E'cmvy9o5e300m0bogy8309yabu', E'COMPREHENSION', E'5', NULL, E'Kato has a brown goat called Kakoko. Every morning before school, Kato takes Kakoko to the field to eat grass. He ties the goat to a tree with a long rope so that it does not eat the neighbour''s beans.

One day, Kato forgot to tie the rope well. Kakoko ran into Mrs Namutebi''s garden and ate many cabbages. Mrs Namutebi was very angry. Kato said sorry and helped her to plant new cabbages. After that, Kato always checked the rope twice.', NULL, E'Whose garden did the goat run into?', NULL, E'"Mrs Namutebi''s garden"', E'["Mrs Namutebi","Namutebi''s garden","Namutebi"]', NULL, E'Mrs Namutebi''s garden', NULL, FALSE, FALSE, 2, 5, NULL, NULL, NULL, '2026-11-01T20:12:36.199Z', '2026-11-01T20:12:36.199Z'),
(E'cmvy9o5px01t8bogy6dh4rt50', E'cmvy9o5px01t6bogyzf1hr42g', E'cmvy9o5fd00oibogyt0sney8j', E'MULTIPLE_CHOICE', E'1', NULL, NULL, NULL, E'In the fraction 5/8, which number is the denominator?', E'["5","8","13","3"]', E'"8"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 1, NULL, NULL, NULL, '2026-11-01T20:12:36.214Z', '2026-11-01T20:12:36.214Z'),
(E'cmvy9o5pj01ribogyzxysx2zo', E'cmvy9o5pg01r6bogyzii5491h', E'cmvy9o5e300m0bogy8309yabu', E'COMPREHENSION', E'6', NULL, E'Kato has a brown goat called Kakoko. Every morning before school, Kato takes Kakoko to the field to eat grass. He ties the goat to a tree with a long rope so that it does not eat the neighbour''s beans.

One day, Kato forgot to tie the rope well. Kakoko ran into Mrs Namutebi''s garden and ate many cabbages. Mrs Namutebi was very angry. Kato said sorry and helped her to plant new cabbages. After that, Kato always checked the rope twice.', NULL, E'What did the goat eat in the garden?', NULL, E'"Cabbages"', E'["many cabbages","cabbage"]', NULL, E'Cabbages', NULL, FALSE, FALSE, 2, 6, NULL, NULL, NULL, '2026-11-01T20:12:36.200Z', '2026-11-01T20:12:36.200Z'),
(E'cmvy9o5pk01rkbogyyrcxoky2', E'cmvy9o5pg01r6bogyzii5491h', E'cmvy9o5e300m0bogy8309yabu', E'COMPREHENSION', E'7', NULL, E'Kato has a brown goat called Kakoko. Every morning before school, Kato takes Kakoko to the field to eat grass. He ties the goat to a tree with a long rope so that it does not eat the neighbour''s beans.

One day, Kato forgot to tie the rope well. Kakoko ran into Mrs Namutebi''s garden and ate many cabbages. Mrs Namutebi was very angry. Kato said sorry and helped her to plant new cabbages. After that, Kato always checked the rope twice.', NULL, E'How did Kato help Mrs Namutebi?', NULL, E'"He said sorry and helped her to plant new cabbages."', E'["he helped her plant new cabbages","planting new cabbages","he planted new cabbages"]', NULL, E'He said sorry and helped her to plant new cabbages.', NULL, FALSE, FALSE, 2, 7, NULL, NULL, NULL, '2026-11-01T20:12:36.200Z', '2026-11-01T20:12:36.200Z'),
(E'cmvy9o5pk01rmbogytgdiuhvf', E'cmvy9o5pg01r6bogyzii5491h', E'cmvy9o5e300m0bogy8309yabu', E'COMPREHENSION', E'8', NULL, E'Kato has a brown goat called Kakoko. Every morning before school, Kato takes Kakoko to the field to eat grass. He ties the goat to a tree with a long rope so that it does not eat the neighbour''s beans.

One day, Kato forgot to tie the rope well. Kakoko ran into Mrs Namutebi''s garden and ate many cabbages. Mrs Namutebi was very angry. Kato said sorry and helped her to plant new cabbages. After that, Kato always checked the rope twice.', NULL, E'What did Kato do after that day?', NULL, E'"He always checked the rope twice."', E'["checked the rope twice","he checked the rope twice","always checked the rope"]', NULL, E'He always checked the rope twice.', NULL, FALSE, FALSE, 2, 8, NULL, NULL, NULL, '2026-11-01T20:12:36.201Z', '2026-11-01T20:12:36.201Z'),
(E'cmvy9o5pm01rsbogysy56pvj5', E'cmvy9o5pl01rqbogyvaey9ick', E'cmvy9o5dt00kebogyiaobv45l', E'MULTIPLE_CHOICE', E'1', NULL, NULL, NULL, E'Which part of a plant takes in water from the soil?', E'["leaves","flowers","roots","fruits"]', E'"roots"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 1, NULL, NULL, NULL, '2026-11-01T20:12:36.202Z', '2026-11-01T20:12:36.202Z')
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "Question" ("id", "paperId", "topicId", "type", "displayNumber", "section", "stimulus", "imageUrl", "prompt", "options", "correctAnswer", "acceptedAnswers", "explanation", "markingGuide", "numericTolerance", "caseSensitive", "requiresTeacher", "points", "order", "parentId", "unit", "partialRule", "createdAt", "updatedAt") VALUES
(E'cmvy9o5pm01rubogyymm2osoi', E'cmvy9o5pl01rqbogyvaey9ick', E'cmvy9o5dt00kebogyiaobv45l', E'MULTIPLE_CHOICE', E'2', NULL, NULL, NULL, E'Which part of a plant makes food?', E'["roots","stem","leaves","seeds"]', E'"leaves"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 2, NULL, NULL, NULL, '2026-11-01T20:12:36.202Z', '2026-11-01T20:12:36.202Z'),
(E'cmvy9o5pm01rwbogy4zxal60o', E'cmvy9o5pl01rqbogyvaey9ick', E'cmvy9o5dt00kebogyiaobv45l', E'SHORT_ANSWER', E'3', NULL, NULL, NULL, E'Which part of the plant becomes the fruit?', NULL, E'"The flower"', E'["flower","flowers"]', NULL, NULL, NULL, FALSE, FALSE, 2, 3, NULL, NULL, NULL, '2026-11-01T20:12:36.203Z', '2026-11-01T20:12:36.203Z'),
(E'cmvy9o5pn01rybogynfxzk780', E'cmvy9o5pl01rqbogyvaey9ick', E'cmvy9o5dt00kebogyiaobv45l', E'SHORT_ANSWER', E'4', NULL, NULL, NULL, E'Name one thing a plant needs to grow.', NULL, E'"Water"', E'["sunlight","air","soil","warmth","light","sun"]', NULL, NULL, NULL, FALSE, FALSE, 2, 4, NULL, NULL, NULL, '2026-11-01T20:12:36.203Z', '2026-11-01T20:12:36.203Z'),
(E'cmvy9o5pn01s0bogy56qelrlv', E'cmvy9o5pl01rqbogyvaey9ick', E'cmvy9o5dt00kebogyiaobv45l', E'MULTIPLE_CHOICE', E'5', NULL, NULL, NULL, E'Which of these is a cash crop?', E'["beans","coffee","cassava","sweet potatoes"]', E'"coffee"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 5, NULL, NULL, NULL, '2026-11-01T20:12:36.203Z', '2026-11-01T20:12:36.203Z'),
(E'cmvy9o5pn01s2bogy6n8kd2lc', E'cmvy9o5pl01rqbogyvaey9ick', E'cmvy9o5dt00kebogyiaobv45l', E'SHORT_ANSWER', E'6', NULL, NULL, NULL, E'Give one use of plants to people.', NULL, E'"Food"', E'["medicine","timber","firewood","shade","fodder","clean air","building materials","fruits"]', NULL, NULL, NULL, FALSE, FALSE, 2, 6, NULL, NULL, NULL, '2026-11-01T20:12:36.204Z', '2026-11-01T20:12:36.204Z'),
(E'cmvy9o5po01s4bogy9bdhaiwf', E'cmvy9o5pl01rqbogyvaey9ick', E'cmvy9o5dt00kebogyiaobv45l', E'FILL_BLANK', E'7', NULL, NULL, NULL, E'A young plant that has just grown from a seed is called a ______.', NULL, E'"seedling"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 7, NULL, NULL, NULL, '2026-11-01T20:12:36.204Z', '2026-11-01T20:12:36.204Z'),
(E'cmvy9o5po01s6bogyl2dppyq9', E'cmvy9o5pl01rqbogyvaey9ick', E'cmvy9o5dt00kebogyiaobv45l', E'SHORT_ANSWER', E'8', NULL, NULL, NULL, E'Name one thing a seed needs to germinate.', NULL, E'"Water"', E'["air","warmth","moisture","heat"]', NULL, NULL, NULL, FALSE, FALSE, 2, 8, NULL, NULL, NULL, '2026-11-01T20:12:36.204Z', '2026-11-01T20:12:36.204Z'),
(E'cmvy9o5po01s8bogyidm20mi9', E'cmvy9o5pl01rqbogyvaey9ick', E'cmvy9o5dt00kebogyiaobv45l', E'MULTIPLE_CHOICE', E'9', NULL, NULL, NULL, E'Which part of a plant protects the seeds?', E'["root","fruit","stem","leaf"]', E'"fruit"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 9, NULL, NULL, NULL, '2026-11-01T20:12:36.205Z', '2026-11-01T20:12:36.205Z'),
(E'cmvy9o5pr01sabogytvpr9rnc', E'cmvy9o5pl01rqbogyvaey9ick', E'cmvy9o5dt00kebogyiaobv45l', E'DRAWING', E'10', NULL, NULL, NULL, E'Draw a bean plant and label the roots, stem and leaves.', NULL, E'"Plant drawing with roots below, a stem and leaves labelled (1 mark per correct label, max 3)."', NULL, NULL, E'Plant drawing with roots below, a stem and leaves labelled (1 mark per correct label, max 3).', NULL, FALSE, FALSE, 2, 10, NULL, NULL, NULL, '2026-11-01T20:12:36.207Z', '2026-11-01T20:12:36.207Z'),
(E'cmvy9o5ps01sgbogyr97gcrgz', E'cmvy9o5ps01sebogy6r9vazw0', E'cmvy9o5f200ocbogyh1rtfg3n', E'MULTIPLE_CHOICE', E'1', NULL, NULL, NULL, E'What is the place value of 6 in 36,482?', E'["Hundreds","Thousands","Ten thousands","Tens"]', E'"Thousands"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 1, NULL, NULL, NULL, '2026-11-01T20:12:36.209Z', '2026-11-01T20:12:36.209Z'),
(E'cmvy9o5pt01sibogy4gdw6m8j', E'cmvy9o5ps01sebogy6r9vazw0', E'cmvy9o5f200ocbogyh1rtfg3n', E'NUMERIC', E'2', NULL, NULL, NULL, E'What is the value of the digit 8 in 58,214?', NULL, E'8000', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 2, NULL, NULL, NULL, '2026-11-01T20:12:36.209Z', '2026-11-01T20:12:36.209Z'),
(E'cmvy9o5pt01skbogym2b4s4zy', E'cmvy9o5ps01sebogy6r9vazw0', E'cmvy9o5f200ocbogyh1rtfg3n', E'SHORT_ANSWER', E'3', NULL, NULL, NULL, E'Write 70,305 in words.', NULL, E'"Seventy thousand three hundred five"', E'["seventy thousand, three hundred and five","seventy thousand three hundred and five","seventy thousand, three hundred five"]', NULL, NULL, NULL, FALSE, FALSE, 2, 3, NULL, NULL, NULL, '2026-11-01T20:12:36.210Z', '2026-11-01T20:12:36.210Z'),
(E'cmvy9o5pt01smbogy212sjoh6', E'cmvy9o5ps01sebogy6r9vazw0', E'cmvy9o5f200ocbogyh1rtfg3n', E'NUMERIC', E'4', NULL, NULL, NULL, E'Write ''forty-two thousand, six hundred'' in figures.', NULL, E'42600', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 4, NULL, NULL, NULL, '2026-11-01T20:12:36.210Z', '2026-11-01T20:12:36.210Z'),
(E'cmvy9o5pu01sobogy4cjvawad', E'cmvy9o5ps01sebogy6r9vazw0', E'cmvy9o5f200ocbogyh1rtfg3n', E'NUMERIC', E'5', NULL, NULL, NULL, E'Round off 3,864 to the nearest hundred.', NULL, E'3900', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 5, NULL, NULL, NULL, '2026-11-01T20:12:36.210Z', '2026-11-01T20:12:36.210Z'),
(E'cmvy9o5pu01sqbogyazec353o', E'cmvy9o5ps01sebogy6r9vazw0', E'cmvy9o5f200ocbogyh1rtfg3n', E'NUMERIC', E'6', NULL, NULL, NULL, E'Round off 7,245 to the nearest ten.', NULL, E'7250', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 6, NULL, NULL, NULL, '2026-11-01T20:12:36.210Z', '2026-11-01T20:12:36.210Z'),
(E'cmvy9o5pu01ssbogyxkuv4mdq', E'cmvy9o5ps01sebogy6r9vazw0', E'cmvy9o5f200ocbogyh1rtfg3n', E'MULTIPLE_CHOICE', E'7', NULL, NULL, NULL, E'Which number is the largest?', E'["45,678","45,876","45,687","45,768"]', E'"45,876"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 7, NULL, NULL, NULL, '2026-11-01T20:12:36.211Z', '2026-11-01T20:12:36.211Z'),
(E'cmvy9o5pv01subogyrsfvlddh', E'cmvy9o5ps01sebogy6r9vazw0', E'cmvy9o5f200ocbogyh1rtfg3n', E'FILL_BLANK', E'8', NULL, NULL, NULL, E'Write XLIV in Hindu-Arabic numerals.', NULL, E'"44"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 8, NULL, NULL, NULL, '2026-11-01T20:12:36.211Z', '2026-11-01T20:12:36.211Z'),
(E'cmvy9o5pv01swbogyb3b1bdov', E'cmvy9o5ps01sebogy6r9vazw0', E'cmvy9o5f200ocbogyh1rtfg3n', E'FILL_BLANK', E'9', NULL, NULL, NULL, E'Write 29 in Roman numerals.', NULL, E'"XXIX"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 9, NULL, NULL, NULL, '2026-11-01T20:12:36.211Z', '2026-11-01T20:12:36.211Z'),
(E'cmvy9o5pv01sybogym7wwtynm', E'cmvy9o5ps01sebogy6r9vazw0', E'cmvy9o5f200ocbogyh1rtfg3n', E'MULTIPLE_CHOICE', E'10', NULL, NULL, NULL, E'Which of these is a prime number?', E'["9","15","17","21"]', E'"17"', NULL, E'17 has only two factors: 1 and 17.', NULL, NULL, FALSE, FALSE, 1, 10, NULL, NULL, NULL, '2026-11-01T20:12:36.212Z', '2026-11-01T20:12:36.212Z'),
(E'cmvy9o5pw01t0bogycua56vn7', E'cmvy9o5ps01sebogy6r9vazw0', E'cmvy9o5f200ocbogyh1rtfg3n', E'SHORT_ANSWER', E'11', NULL, NULL, NULL, E'Write 5,037 in expanded form.', NULL, E'"5,000 + 0 + 30 + 7"', E'["5000 + 30 + 7","5,000 + 30 + 7","5000+30+7"]', NULL, NULL, NULL, FALSE, FALSE, 2, 11, NULL, NULL, NULL, '2026-11-01T20:12:36.212Z', '2026-11-01T20:12:36.212Z'),
(E'cmvy9o5pw01t2bogyo5jx076k', E'cmvy9o5ps01sebogy6r9vazw0', E'cmvy9o5f200ocbogyh1rtfg3n', E'NUMERIC', E'12', NULL, NULL, NULL, E'What is the smallest 4-digit number you can form using the digits 7, 0, 3 and 5 once each?', NULL, E'3057', NULL, E'Zero cannot be first, so start with 3, then 0, 5, 7.', NULL, 0, FALSE, FALSE, 2, 12, NULL, NULL, NULL, '2026-11-01T20:12:36.212Z', '2026-11-01T20:12:36.212Z'),
(E'cmvy9o5px01tabogysoptntoo', E'cmvy9o5px01t6bogyzf1hr42g', E'cmvy9o5fd00oibogyt0sney8j', E'FILL_BLANK', E'2', NULL, NULL, NULL, E'Write an equivalent fraction for ½ with denominator 10.', NULL, E'"5/10"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 2, NULL, NULL, NULL, '2026-11-01T20:12:36.214Z', '2026-11-01T20:12:36.214Z'),
(E'cmvy9o5py01tcbogy279ykwqu', E'cmvy9o5px01t6bogyzf1hr42g', E'cmvy9o5fd00oibogyt0sney8j', E'FILL_BLANK', E'3', NULL, NULL, NULL, E'Simplify 6/9 to its lowest terms.', NULL, E'"2/3"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 3, NULL, NULL, NULL, '2026-11-01T20:12:36.214Z', '2026-11-01T20:12:36.214Z'),
(E'cmvy9o5py01tebogy09lxtqpw', E'cmvy9o5px01t6bogyzf1hr42g', E'cmvy9o5fd00oibogyt0sney8j', E'MULTIPLE_CHOICE', E'4', NULL, NULL, NULL, E'Which fraction is bigger?', E'["2/5","2/3","2/7","2/9"]', E'"2/3"', NULL, E'Same numerator → smaller denominator is bigger.', NULL, NULL, FALSE, FALSE, 1, 4, NULL, NULL, NULL, '2026-11-01T20:12:36.215Z', '2026-11-01T20:12:36.215Z'),
(E'cmvy9o5pz01tgbogyrhn7jmtb', E'cmvy9o5px01t6bogyzf1hr42g', E'cmvy9o5fd00oibogyt0sney8j', E'FILL_BLANK', E'5', NULL, NULL, NULL, E'Change 9/4 to a mixed number.', NULL, E'"2 1/4"', E'["2¼"]', NULL, NULL, NULL, FALSE, FALSE, 1, 5, NULL, NULL, NULL, '2026-11-01T20:12:36.215Z', '2026-11-01T20:12:36.215Z'),
(E'cmvy9o5pz01tibogy6tqtuijw', E'cmvy9o5px01t6bogyzf1hr42g', E'cmvy9o5fd00oibogyt0sney8j', E'FILL_BLANK', E'6', NULL, NULL, NULL, E'Change 3⅖ to an improper fraction.', NULL, E'"17/5"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 6, NULL, NULL, NULL, '2026-11-01T20:12:36.216Z', '2026-11-01T20:12:36.216Z'),
(E'cmvy9o5q401tkbogy3malqt6q', E'cmvy9o5px01t6bogyzf1hr42g', E'cmvy9o5fd00oibogyt0sney8j', E'FILL_BLANK', E'7', NULL, NULL, NULL, E'Work out 3/8 + 4/8.', NULL, E'"7/8"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 7, NULL, NULL, NULL, '2026-11-01T20:12:36.220Z', '2026-11-01T20:12:36.220Z'),
(E'cmvy9o5q401tmbogy5qh33qzo', E'cmvy9o5px01t6bogyzf1hr42g', E'cmvy9o5fd00oibogyt0sney8j', E'NUMERIC', E'8', NULL, NULL, NULL, E'Find ¾ of 32.', NULL, E'24', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 8, NULL, NULL, NULL, '2026-11-01T20:12:36.221Z', '2026-11-01T20:12:36.221Z'),
(E'cmvy9o5q501tobogyz8ctmi8z', E'cmvy9o5px01t6bogyzf1hr42g', E'cmvy9o5fd00oibogyt0sney8j', E'NUMERIC', E'9', NULL, NULL, NULL, E'There are 30 pupils in a class and ⅖ of them are boys. How many boys are there?', NULL, E'12', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 9, NULL, NULL, NULL, '2026-11-01T20:12:36.222Z', '2026-11-01T20:12:36.222Z'),
(E'cmvy9o5qb01tqbogybmvsvfeo', E'cmvy9o5px01t6bogyzf1hr42g', E'cmvy9o5fd00oibogyt0sney8j', E'FILL_BLANK', E'10', NULL, NULL, NULL, E'Work out 7/10 − 3/10 (simplify your answer).', NULL, E'"2/5"', E'["4/10"]', NULL, NULL, NULL, FALSE, FALSE, 1, 10, NULL, NULL, NULL, '2026-11-01T20:12:36.227Z', '2026-11-01T20:12:36.227Z'),
(E'cmvy9o5qb01tsbogyccykd9ak', E'cmvy9o5px01t6bogyzf1hr42g', E'cmvy9o5fd00oibogyt0sney8j', E'DRAWING', E'11', NULL, NULL, NULL, E'Shade ⅗ of a rectangle divided into 5 equal parts.', NULL, E'"A rectangle split into 5 equal parts with exactly 3 shaded."', NULL, NULL, E'A rectangle split into 5 equal parts with exactly 3 shaded.', NULL, FALSE, FALSE, 2, 11, NULL, NULL, NULL, '2026-11-01T20:12:36.228Z', '2026-11-01T20:12:36.228Z'),
(E'cmvy9o5qd01twbogy01mx3vd6', E'cmvy9o5qc01tubogykukgn4ar', E'cmvy9o5fl00oqbogy1bginhat', E'NUMERIC', E'1', NULL, NULL, NULL, E'Amina bought a book at UGX 3,500 and a pen at UGX 800. How much did she spend in total (UGX)?', NULL, E'4300', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 1, NULL, NULL, NULL, '2026-11-01T20:12:36.230Z', '2026-11-01T20:12:36.230Z'),
(E'cmvy9o5qe01tybogysvlqnj1x', E'cmvy9o5qc01tubogykukgn4ar', E'cmvy9o5fl00oqbogy1bginhat', E'NUMERIC', E'2', NULL, NULL, NULL, E'A loaf of bread costs UGX 4,500. How much change do you get from UGX 5,000?', NULL, E'500', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 2, NULL, NULL, NULL, '2026-11-01T20:12:36.230Z', '2026-11-01T20:12:36.230Z'),
(E'cmvy9o5qe01u0bogyu3tn3lds', E'cmvy9o5qc01tubogykukgn4ar', E'cmvy9o5fl00oqbogy1bginhat', E'NUMERIC', E'3', NULL, NULL, NULL, E'One exercise book costs UGX 1,200. Find the cost of 6 exercise books (UGX).', NULL, E'7200', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 3, NULL, NULL, NULL, '2026-11-01T20:12:36.230Z', '2026-11-01T20:12:36.230Z'),
(E'cmvy9o5qf01u2bogygtx1yjxa', E'cmvy9o5qc01tubogykukgn4ar', E'cmvy9o5fl00oqbogy1bginhat', E'NUMERIC', E'4', NULL, NULL, NULL, E'Mother gave Kato UGX 10,000. He bought 3 pencils at UGX 500 each. How much money remained (UGX)?', NULL, E'8500', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 4, NULL, NULL, NULL, '2026-11-01T20:12:36.231Z', '2026-11-01T20:12:36.231Z'),
(E'cmvy9o5qf01u4bogyu9x6yiwb', E'cmvy9o5qc01tubogykukgn4ar', E'cmvy9o5fl00oqbogy1bginhat', E'NUMERIC', E'5', NULL, NULL, NULL, E'A trader bought a hen at UGX 15,000 and sold it at UGX 18,000. What was the profit (UGX)?', NULL, E'3000', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 5, NULL, NULL, NULL, '2026-11-01T20:12:36.231Z', '2026-11-01T20:12:36.231Z'),
(E'cmvy9o5qf01u6bogywiqechhm', E'cmvy9o5qc01tubogykukgn4ar', E'cmvy9o5fl00oqbogy1bginhat', E'MULTIPLE_CHOICE', E'6', NULL, NULL, NULL, E'Which of these is the currency of Uganda?', E'["Dollar","Shilling","Rand","Franc"]', E'"Shilling"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 6, NULL, NULL, NULL, '2026-11-01T20:12:36.232Z', '2026-11-01T20:12:36.232Z'),
(E'cmvy9o5qg01u8bogyissp61pb', E'cmvy9o5qc01tubogykukgn4ar', E'cmvy9o5fl00oqbogy1bginhat', E'NUMERIC', E'7', NULL, NULL, NULL, E'If 4 mangoes cost UGX 2,000, how much does one mango cost (UGX)?', NULL, E'500', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 7, NULL, NULL, NULL, '2026-11-01T20:12:36.232Z', '2026-11-01T20:12:36.232Z'),
(E'cmvy9o5qg01uabogy8ey1kscc', E'cmvy9o5qc01tubogykukgn4ar', E'cmvy9o5fl00oqbogy1bginhat', E'LONG_ANSWER', E'8', NULL, NULL, NULL, E'Complete the shopping bill: 2 kg of sugar at UGX 4,000 per kg, 3 bars of soap at UGX 2,500 each, and 1 litre of cooking oil at UGX 7,000. Find the total.', NULL, E'"Sugar 8,000 + soap 7,500 + oil 7,000 = UGX 22,500. 1 mark per line, 1 for total."', NULL, NULL, E'Sugar 8,000 + soap 7,500 + oil 7,000 = UGX 22,500. 1 mark per line, 1 for total.', NULL, FALSE, FALSE, 4, 8, NULL, NULL, NULL, '2026-11-01T20:12:36.233Z', '2026-11-01T20:12:36.233Z'),
(E'cmvy9o5qi01ugbogyq3rrjiw9', E'cmvy9o5qh01uebogyk7enenph', E'cmvy9o5fo00oybogyam62r6t9', E'MULTIPLE_CHOICE', E'1', NULL, NULL, NULL, E'Which of these is a proper noun?', E'["river","Kampala","teacher","school"]', E'"Kampala"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 1, NULL, NULL, NULL, '2026-11-01T20:12:36.234Z', '2026-11-01T20:12:36.234Z'),
(E'cmvy9o5qj01uibogyubvkveq5', E'cmvy9o5qh01uebogyk7enenph', E'cmvy9o5fo00oybogyam62r6t9', E'FILL_BLANK', E'2', NULL, NULL, NULL, E'Give the plural of ''child''.', NULL, E'"children"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 2, NULL, NULL, NULL, '2026-11-01T20:12:36.235Z', '2026-11-01T20:12:36.235Z'),
(E'cmvy9o5qj01ukbogybvjpn7w9', E'cmvy9o5qh01uebogyk7enenph', E'cmvy9o5fo00oybogyam62r6t9', E'FILL_BLANK', E'3', NULL, NULL, NULL, E'Give the plural of ''knife''.', NULL, E'"knives"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 3, NULL, NULL, NULL, '2026-11-01T20:12:36.236Z', '2026-11-01T20:12:36.236Z'),
(E'cmvy9o5qk01umbogy94n6feuk', E'cmvy9o5qh01uebogyk7enenph', E'cmvy9o5fo00oybogyam62r6t9', E'FILL_BLANK', E'4', NULL, NULL, NULL, E'Give the plural of ''mango''.', NULL, E'"mangoes"', E'["mangos"]', NULL, NULL, NULL, FALSE, FALSE, 1, 4, NULL, NULL, NULL, '2026-11-01T20:12:36.236Z', '2026-11-01T20:12:36.236Z'),
(E'cmvy9o5qk01uobogy8j2bbhl6', E'cmvy9o5qh01uebogyk7enenph', E'cmvy9o5fo00oybogyam62r6t9', E'FILL_BLANK', E'5', NULL, NULL, NULL, E'Give the plural of ''tooth''.', NULL, E'"teeth"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 5, NULL, NULL, NULL, '2026-11-01T20:12:36.237Z', '2026-11-01T20:12:36.237Z'),
(E'cmvy9o5ql01uqbogy6tpvf324', E'cmvy9o5qh01uebogyk7enenph', E'cmvy9o5fo00oybogyam62r6t9', E'FILL_BLANK', E'6', NULL, NULL, NULL, E'Give the plural of ''baby''.', NULL, E'"babies"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 6, NULL, NULL, NULL, '2026-11-01T20:12:36.237Z', '2026-11-01T20:12:36.237Z'),
(E'cmvy9o5qn01usbogyioypj2rk', E'cmvy9o5qh01uebogyk7enenph', E'cmvy9o5fo00oybogyam62r6t9', E'MULTIPLE_CHOICE', E'7', NULL, NULL, NULL, E'Choose the correct article: She ate ______ orange.', E'["a","an","the","no article"]', E'"an"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 7, NULL, NULL, NULL, '2026-11-01T20:12:36.240Z', '2026-11-01T20:12:36.240Z'),
(E'cmvy9o5qo01uubogypywsr2s1', E'cmvy9o5qh01uebogyk7enenph', E'cmvy9o5fo00oybogyam62r6t9', E'MULTIPLE_CHOICE', E'8', NULL, NULL, NULL, E'Choose the correct article: He is ______ honest boy.', E'["a","an","the","some"]', E'"an"', NULL, E'''Honest'' starts with a vowel SOUND because the h is silent.', NULL, NULL, FALSE, FALSE, 1, 8, NULL, NULL, NULL, '2026-11-01T20:12:36.241Z', '2026-11-01T20:12:36.241Z'),
(E'cmvy9o5qp01uwbogyf5l3dhfy', E'cmvy9o5qh01uebogyk7enenph', E'cmvy9o5fo00oybogyam62r6t9', E'FILL_BLANK', E'9', NULL, NULL, NULL, E'Complete the collective noun: a ______ of bees.', NULL, E'"swarm"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 9, NULL, NULL, NULL, '2026-11-01T20:12:36.241Z', '2026-11-01T20:12:36.241Z'),
(E'cmvy9o5qp01uybogy274l3xi9', E'cmvy9o5qh01uebogyk7enenph', E'cmvy9o5fo00oybogyam62r6t9', E'FILL_BLANK', E'10', NULL, NULL, NULL, E'Complete the collective noun: a ______ of cattle.', NULL, E'"herd"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 10, NULL, NULL, NULL, '2026-11-01T20:12:36.241Z', '2026-11-01T20:12:36.241Z'),
(E'cmvy9o5qq01v0bogya31t78il', E'cmvy9o5qh01uebogyk7enenph', E'cmvy9o5fo00oybogyam62r6t9', E'MULTIPLE_CHOICE', E'11', NULL, NULL, NULL, E'Which word is an abstract noun?', E'["table","kindness","dog","Kampala"]', E'"kindness"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 11, NULL, NULL, NULL, '2026-11-01T20:12:36.242Z', '2026-11-01T20:12:36.242Z')
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "Question" ("id", "paperId", "topicId", "type", "displayNumber", "section", "stimulus", "imageUrl", "prompt", "options", "correctAnswer", "acceptedAnswers", "explanation", "markingGuide", "numericTolerance", "caseSensitive", "requiresTeacher", "points", "order", "parentId", "unit", "partialRule", "createdAt", "updatedAt") VALUES
(E'cmvy9o5qq01v2bogyd2t7u8sy', E'cmvy9o5qh01uebogyk7enenph', E'cmvy9o5fo00oybogyam62r6t9', E'FILL_BLANK', E'12', NULL, NULL, NULL, E'Give the plural of ''sheep''.', NULL, E'"sheep"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 12, NULL, NULL, NULL, '2026-11-01T20:12:36.242Z', '2026-11-01T20:12:36.242Z'),
(E'cmvy9o5qs01v6bogys6g8u34e', E'cmvy9o5qr01v4bogy6ywo9o1t', E'cmvy9o5fp00p2bogymr2bury8', E'FILL_BLANK', E'1', NULL, NULL, NULL, E'Use the correct form: Every day my mother ______ (cook) supper.', NULL, E'"cooks"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 1, NULL, NULL, NULL, '2026-11-01T20:12:36.244Z', '2026-11-01T20:12:36.244Z'),
(E'cmvy9o5qs01v8bogyrc3dk9qa', E'cmvy9o5qr01v4bogy6ywo9o1t', E'cmvy9o5fp00p2bogymr2bury8', E'FILL_BLANK', E'2', NULL, NULL, NULL, E'Yesterday we ______ (go) to the market.', NULL, E'"went"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 2, NULL, NULL, NULL, '2026-11-01T20:12:36.244Z', '2026-11-01T20:12:36.244Z'),
(E'cmvy9o5qs01vabogylwv8vap5', E'cmvy9o5qr01v4bogy6ywo9o1t', E'cmvy9o5fp00p2bogymr2bury8', E'FILL_BLANK', E'3', NULL, NULL, NULL, E'Look! The baby ______ (cry).', NULL, E'"is crying"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 3, NULL, NULL, NULL, '2026-11-01T20:12:36.245Z', '2026-11-01T20:12:36.245Z'),
(E'cmvy9o5qt01vcbogy6s2ecopt', E'cmvy9o5qr01v4bogy6ywo9o1t', E'cmvy9o5fp00p2bogymr2bury8', E'FILL_BLANK', E'4', NULL, NULL, NULL, E'Tomorrow the pupils ______ (visit) the zoo.', NULL, E'"will visit"', E'["shall visit","are going to visit"]', NULL, NULL, NULL, FALSE, FALSE, 1, 4, NULL, NULL, NULL, '2026-11-01T20:12:36.245Z', '2026-11-01T20:12:36.245Z'),
(E'cmvy9o5qt01vebogyyupbhifn', E'cmvy9o5qr01v4bogy6ywo9o1t', E'cmvy9o5fp00p2bogymr2bury8', E'FILL_BLANK', E'5', NULL, NULL, NULL, E'Last week Okello ______ (eat) a big mango.', NULL, E'"ate"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 5, NULL, NULL, NULL, '2026-11-01T20:12:36.245Z', '2026-11-01T20:12:36.245Z'),
(E'cmvy9o5qt01vgbogynn5ue1rh', E'cmvy9o5qr01v4bogy6ywo9o1t', E'cmvy9o5fp00p2bogymr2bury8', E'MULTIPLE_CHOICE', E'6', NULL, NULL, NULL, E'Choose the correct sentence.', E'["She go to school every day.","She goes to school every day.","She going to school every day.","She gone to school every day."]', E'"She goes to school every day."', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 6, NULL, NULL, NULL, '2026-11-01T20:12:36.246Z', '2026-11-01T20:12:36.246Z'),
(E'cmvy9o5qu01vibogys2a9sczc', E'cmvy9o5qr01v4bogy6ywo9o1t', E'cmvy9o5fp00p2bogymr2bury8', E'FILL_BLANK', E'7', NULL, NULL, NULL, E'The sun ______ (rise) in the east.', NULL, E'"rises"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 7, NULL, NULL, NULL, '2026-11-01T20:12:36.246Z', '2026-11-01T20:12:36.246Z'),
(E'cmvy9o5qu01vkbogy2dg6a897', E'cmvy9o5qr01v4bogy6ywo9o1t', E'cmvy9o5fp00p2bogymr2bury8', E'FILL_BLANK', E'8', NULL, NULL, NULL, E'The dog ______ (bark) loudly last night.', NULL, E'"barked"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 8, NULL, NULL, NULL, '2026-11-01T20:12:36.246Z', '2026-11-01T20:12:36.246Z'),
(E'cmvy9o5qu01vmbogycftxzyht', E'cmvy9o5qr01v4bogy6ywo9o1t', E'cmvy9o5fp00p2bogymr2bury8', E'FILL_BLANK', E'9', NULL, NULL, NULL, E'Give the past tense of ''write''.', NULL, E'"wrote"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 9, NULL, NULL, NULL, '2026-11-01T20:12:36.247Z', '2026-11-01T20:12:36.247Z'),
(E'cmvy9o5qv01vobogyhpekvt9r', E'cmvy9o5qr01v4bogy6ywo9o1t', E'cmvy9o5fp00p2bogymr2bury8', E'FILL_BLANK', E'10', NULL, NULL, NULL, E'Give the past tense of ''run''.', NULL, E'"ran"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 10, NULL, NULL, NULL, '2026-11-01T20:12:36.247Z', '2026-11-01T20:12:36.247Z'),
(E'cmvy9o5qw01vsbogylgwn1ojb', E'cmvy9o5qv01vqbogy1fwvbuwz', E'cmvy9o5fq00pcbogyg2nat9ba', E'COMPREHENSION', E'1', NULL, E'Every Saturday, Nakato goes to the market with her mother. They wake up early and walk for thirty minutes to reach Nakasero market. The market is full of people selling tomatoes, onions, bananas and fish.

Nakato''s mother sells pineapples. She grows them on their small farm in Mukono. Nakato helps her mother to arrange the pineapples on a wooden table. She also counts the money when customers pay.

At midday, they eat chapati and drink juice. Nakato likes market day because she learns how to count money and meet many people. When they go home in the evening, her mother always buys her a sweet for working hard.', NULL, E'On which day does Nakato go to the market?', NULL, E'"Saturday"', E'["every Saturday","on Saturday"]', NULL, E'Saturday', NULL, FALSE, FALSE, 2, 1, NULL, NULL, NULL, '2026-11-01T20:12:36.248Z', '2026-11-01T20:12:36.248Z'),
(E'cmvy9o5qw01vubogywnoojdw2', E'cmvy9o5qv01vqbogy1fwvbuwz', E'cmvy9o5fq00pcbogyg2nat9ba', E'COMPREHENSION', E'2', NULL, E'Every Saturday, Nakato goes to the market with her mother. They wake up early and walk for thirty minutes to reach Nakasero market. The market is full of people selling tomatoes, onions, bananas and fish.

Nakato''s mother sells pineapples. She grows them on their small farm in Mukono. Nakato helps her mother to arrange the pineapples on a wooden table. She also counts the money when customers pay.

At midday, they eat chapati and drink juice. Nakato likes market day because she learns how to count money and meet many people. When they go home in the evening, her mother always buys her a sweet for working hard.', NULL, E'How long do they walk to reach the market?', NULL, E'"Thirty minutes"', E'["30 minutes","half an hour"]', NULL, E'Thirty minutes', NULL, FALSE, FALSE, 2, 2, NULL, NULL, NULL, '2026-11-01T20:12:36.249Z', '2026-11-01T20:12:36.249Z'),
(E'cmvy9o5qw01vwbogydkpsqgzo', E'cmvy9o5qv01vqbogy1fwvbuwz', E'cmvy9o5fq00pcbogyg2nat9ba', E'COMPREHENSION', E'3', NULL, E'Every Saturday, Nakato goes to the market with her mother. They wake up early and walk for thirty minutes to reach Nakasero market. The market is full of people selling tomatoes, onions, bananas and fish.

Nakato''s mother sells pineapples. She grows them on their small farm in Mukono. Nakato helps her mother to arrange the pineapples on a wooden table. She also counts the money when customers pay.

At midday, they eat chapati and drink juice. Nakato likes market day because she learns how to count money and meet many people. When they go home in the evening, her mother always buys her a sweet for working hard.', NULL, E'What does Nakato''s mother sell?', NULL, E'"Pineapples"', NULL, NULL, E'Pineapples', NULL, FALSE, FALSE, 2, 3, NULL, NULL, NULL, '2026-11-01T20:12:36.249Z', '2026-11-01T20:12:36.249Z'),
(E'cmvy9o5qx01vybogyymh7q413', E'cmvy9o5qv01vqbogy1fwvbuwz', E'cmvy9o5fq00pcbogyg2nat9ba', E'COMPREHENSION', E'4', NULL, E'Every Saturday, Nakato goes to the market with her mother. They wake up early and walk for thirty minutes to reach Nakasero market. The market is full of people selling tomatoes, onions, bananas and fish.

Nakato''s mother sells pineapples. She grows them on their small farm in Mukono. Nakato helps her mother to arrange the pineapples on a wooden table. She also counts the money when customers pay.

At midday, they eat chapati and drink juice. Nakato likes market day because she learns how to count money and meet many people. When they go home in the evening, her mother always buys her a sweet for working hard.', NULL, E'Where does Nakato''s mother grow the pineapples?', NULL, E'"On their small farm in Mukono"', E'["Mukono","on their farm in Mukono","their farm"]', NULL, E'On their small farm in Mukono', NULL, FALSE, FALSE, 2, 4, NULL, NULL, NULL, '2026-11-01T20:12:36.249Z', '2026-11-01T20:12:36.249Z'),
(E'cmvy9o5qx01w0bogyssjk03tv', E'cmvy9o5qv01vqbogy1fwvbuwz', E'cmvy9o5fq00pcbogyg2nat9ba', E'COMPREHENSION', E'5', NULL, E'Every Saturday, Nakato goes to the market with her mother. They wake up early and walk for thirty minutes to reach Nakasero market. The market is full of people selling tomatoes, onions, bananas and fish.

Nakato''s mother sells pineapples. She grows them on their small farm in Mukono. Nakato helps her mother to arrange the pineapples on a wooden table. She also counts the money when customers pay.

At midday, they eat chapati and drink juice. Nakato likes market day because she learns how to count money and meet many people. When they go home in the evening, her mother always buys her a sweet for working hard.', NULL, E'Give two ways Nakato helps her mother.', NULL, E'"She arranges the pineapples on the table and counts the money."', E'["arranges pineapples and counts money","arranging pineapples","counting money","she arranges the pineapples","she counts the money"]', NULL, E'She arranges the pineapples on the table and counts the money.', NULL, FALSE, FALSE, 2, 5, NULL, NULL, NULL, '2026-11-01T20:12:36.250Z', '2026-11-01T20:12:36.250Z'),
(E'cmvy9o5qx01w2bogy3ovkhl2p', E'cmvy9o5qv01vqbogy1fwvbuwz', E'cmvy9o5fq00pcbogyg2nat9ba', E'COMPREHENSION', E'6', NULL, E'Every Saturday, Nakato goes to the market with her mother. They wake up early and walk for thirty minutes to reach Nakasero market. The market is full of people selling tomatoes, onions, bananas and fish.

Nakato''s mother sells pineapples. She grows them on their small farm in Mukono. Nakato helps her mother to arrange the pineapples on a wooden table. She also counts the money when customers pay.

At midday, they eat chapati and drink juice. Nakato likes market day because she learns how to count money and meet many people. When they go home in the evening, her mother always buys her a sweet for working hard.', NULL, E'What do they eat at midday?', NULL, E'"Chapati and juice"', E'["chapati","chapati and drink juice"]', NULL, E'Chapati and juice', NULL, FALSE, FALSE, 2, 6, NULL, NULL, NULL, '2026-11-01T20:12:36.250Z', '2026-11-01T20:12:36.250Z'),
(E'cmvy9o5rd01xebogyyve3f96r', E'cmvy9o5ra01wwbogy4m2xb2ea', E'cmvy9o5fs00psbogywg0q4q35', E'SHORT_ANSWER', E'9', NULL, NULL, NULL, E'Give one way of keeping our school compound clean.', NULL, E'"Sweeping / picking rubbish / using a rubbish pit."', E'["sweeping","slashing","picking rubbish","using dustbins","burning rubbish in a pit","collecting rubbish"]', NULL, NULL, NULL, FALSE, FALSE, 2, 9, NULL, NULL, NULL, '2026-11-01T20:12:36.265Z', '2026-11-01T20:12:36.265Z'),
(E'cmvy9o5rd01xgbogyl8a481b9', E'cmvy9o5ra01wwbogy4m2xb2ea', E'cmvy9o5fs00psbogywg0q4q35', E'FILL_BLANK', E'10', NULL, NULL, NULL, E'A ______ is a hole in the ground where rubbish is thrown and later burnt or covered.', NULL, E'"rubbish pit"', E'["compost pit"]', NULL, NULL, NULL, FALSE, FALSE, 1, 10, NULL, NULL, NULL, '2026-11-01T20:12:36.266Z', '2026-11-01T20:12:36.266Z'),
(E'cmvy9o5rf01xmbogyih12kkzr', E'cmvy9o5re01xkbogyqt53tjxn', E'cmvy9o5fv00qcbogymjt0fdcs', E'MULTIPLE_CHOICE', E'1', NULL, NULL, NULL, E'What do we call the part of a map that explains the symbols?', E'["Title","Key","Scale","Frame"]', E'"Key"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 1, NULL, NULL, NULL, '2026-11-01T20:12:36.267Z', '2026-11-01T20:12:36.267Z'),
(E'cmvy9o5qy01w4bogykcpcoh6i', E'cmvy9o5qv01vqbogy1fwvbuwz', E'cmvy9o5fq00pcbogyg2nat9ba', E'COMPREHENSION', E'7', NULL, E'Every Saturday, Nakato goes to the market with her mother. They wake up early and walk for thirty minutes to reach Nakasero market. The market is full of people selling tomatoes, onions, bananas and fish.

Nakato''s mother sells pineapples. She grows them on their small farm in Mukono. Nakato helps her mother to arrange the pineapples on a wooden table. She also counts the money when customers pay.

At midday, they eat chapati and drink juice. Nakato likes market day because she learns how to count money and meet many people. When they go home in the evening, her mother always buys her a sweet for working hard.', NULL, E'Why does Nakato like market day?', NULL, E'"Because she learns how to count money and meets many people."', E'["she learns to count money","she meets many people","learns how to count money and meet many people"]', NULL, E'Because she learns how to count money and meets many people.', NULL, FALSE, FALSE, 2, 7, NULL, NULL, NULL, '2026-11-01T20:12:36.250Z', '2026-11-01T20:12:36.250Z'),
(E'cmvy9o5qy01w6bogyaiyjho0h', E'cmvy9o5qv01vqbogy1fwvbuwz', E'cmvy9o5fq00pcbogyg2nat9ba', E'COMPREHENSION', E'8', NULL, E'Every Saturday, Nakato goes to the market with her mother. They wake up early and walk for thirty minutes to reach Nakasero market. The market is full of people selling tomatoes, onions, bananas and fish.

Nakato''s mother sells pineapples. She grows them on their small farm in Mukono. Nakato helps her mother to arrange the pineapples on a wooden table. She also counts the money when customers pay.

At midday, they eat chapati and drink juice. Nakato likes market day because she learns how to count money and meet many people. When they go home in the evening, her mother always buys her a sweet for working hard.', NULL, E'What does her mother buy her in the evening?', NULL, E'"A sweet"', E'["sweet","sweets"]', NULL, E'A sweet', NULL, FALSE, FALSE, 2, 8, NULL, NULL, NULL, '2026-11-01T20:12:36.251Z', '2026-11-01T20:12:36.251Z'),
(E'cmvy9o5r001wcbogyiakytylc', E'cmvy9o5qz01wabogyc8p2eowm', E'cmvy9o5fs00pobogyt3mpnmf2', E'MULTIPLE_CHOICE', E'1', NULL, NULL, NULL, E'Which type of soil is best for growing crops?', E'["Sandy soil","Clay soil","Loam soil","Gravel"]', E'"Loam soil"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 1, NULL, NULL, NULL, '2026-11-01T20:12:36.252Z', '2026-11-01T20:12:36.252Z'),
(E'cmvy9o5r001webogywyv8kqeb', E'cmvy9o5qz01wabogyc8p2eowm', E'cmvy9o5fs00pobogyt3mpnmf2', E'SHORT_ANSWER', E'2', NULL, NULL, NULL, E'Name the component of soil that gives it a dark colour and makes it fertile.', NULL, E'"Humus"', NULL, NULL, NULL, NULL, FALSE, FALSE, 2, 2, NULL, NULL, NULL, '2026-11-01T20:12:36.253Z', '2026-11-01T20:12:36.253Z'),
(E'cmvy9o5r101wgbogyywke48pe', E'cmvy9o5qz01wabogyc8p2eowm', E'cmvy9o5fs00pobogyt3mpnmf2', E'MULTIPLE_CHOICE', E'3', NULL, NULL, NULL, E'Which soil is used for making pots and bricks?', E'["Sandy","Clay","Loam","Stony"]', E'"Clay"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 3, NULL, NULL, NULL, '2026-11-01T20:12:36.253Z', '2026-11-01T20:12:36.253Z'),
(E'cmvy9o5r101wibogy4mosxjn0', E'cmvy9o5qz01wabogyc8p2eowm', E'cmvy9o5fs00pobogyt3mpnmf2', E'SHORT_ANSWER', E'4', NULL, NULL, NULL, E'Give one way of controlling soil erosion.', NULL, E'"Planting trees / mulching / terracing / crop rotation."', E'["planting trees","mulching","terracing","crop rotation","contour ploughing","planting grass","afforestation","avoid over-grazing"]', NULL, NULL, NULL, FALSE, FALSE, 2, 4, NULL, NULL, NULL, '2026-11-01T20:12:36.254Z', '2026-11-01T20:12:36.254Z'),
(E'cmvy9o5r201wkbogyiliigwe2', E'cmvy9o5qz01wabogyc8p2eowm', E'cmvy9o5fs00pobogyt3mpnmf2', E'TRUE_FALSE', E'5', NULL, NULL, NULL, E'Sandy soil holds water for a long time.', E'["True","False"]', E'false', NULL, E'Sandy soil drains water very fast.', NULL, NULL, FALSE, FALSE, 1, 5, NULL, NULL, NULL, '2026-11-01T20:12:36.254Z', '2026-11-01T20:12:36.254Z'),
(E'cmvy9o5r601wmbogyzbk14k0z', E'cmvy9o5qz01wabogyc8p2eowm', E'cmvy9o5fs00pobogyt3mpnmf2', E'SHORT_ANSWER', E'6', NULL, NULL, NULL, E'What happens when soil is shaken in water and bubbles come out? What does this show?', NULL, E'"Soil contains air."', E'["it shows soil has air","there is air in soil","air"]', NULL, NULL, NULL, FALSE, FALSE, 2, 6, NULL, NULL, NULL, '2026-11-01T20:12:36.258Z', '2026-11-01T20:12:36.258Z'),
(E'cmvy9o5r701wobogyko2f7ev9', E'cmvy9o5qz01wabogyc8p2eowm', E'cmvy9o5fs00pobogyt3mpnmf2', E'SHORT_ANSWER', E'7', NULL, NULL, NULL, E'Name one living organism found in soil that helps to make it fertile.', NULL, E'"Earthworm"', E'["earthworms","termites","bacteria","ants"]', NULL, NULL, NULL, FALSE, FALSE, 2, 7, NULL, NULL, NULL, '2026-11-01T20:12:36.260Z', '2026-11-01T20:12:36.260Z'),
(E'cmvy9o5r901wqbogyzaz1wwcb', E'cmvy9o5qz01wabogyc8p2eowm', E'cmvy9o5fs00pobogyt3mpnmf2', E'FILL_BLANK', E'8', NULL, NULL, NULL, E'The washing away of top soil by water or wind is called soil ______.', NULL, E'"erosion"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 8, NULL, NULL, NULL, '2026-11-01T20:12:36.261Z', '2026-11-01T20:12:36.261Z'),
(E'cmvy9o5r901wsbogykmhvypli', E'cmvy9o5qz01wabogyc8p2eowm', E'cmvy9o5fs00pobogyt3mpnmf2', E'SHORT_ANSWER', E'9', NULL, NULL, NULL, E'Why do farmers practise mulching?', NULL, E'"To keep moisture in the soil, control weeds and add humus when the mulch rots."', E'["to keep water in the soil","to conserve moisture","to control weeds","to prevent evaporation","to add humus"]', NULL, NULL, NULL, FALSE, FALSE, 2, 9, NULL, NULL, NULL, '2026-11-01T20:12:36.262Z', '2026-11-01T20:12:36.262Z'),
(E'cmvy9o5ra01wubogycp21efs1', E'cmvy9o5qz01wabogyc8p2eowm', E'cmvy9o5fs00pobogyt3mpnmf2', E'LONG_ANSWER', E'10', NULL, NULL, NULL, E'Describe an experiment to show that soil contains water.', NULL, E'"Heat soil in a tin/test tube with a cold lid or glass above it. Water droplets form on the cold surface (condensation), showing soil contains water. Marks: apparatus (1), method (1), observation (1), conclusion (1)."', NULL, NULL, E'Heat soil in a tin/test tube with a cold lid or glass above it. Water droplets form on the cold surface (condensation), showing soil contains water. Marks: apparatus (1), method (1), observation (1), conclusion (1).', NULL, FALSE, FALSE, 4, 10, NULL, NULL, NULL, '2026-11-01T20:12:36.262Z', '2026-11-01T20:12:36.262Z'),
(E'cmvy9o5rb01wybogycywixz73', E'cmvy9o5ra01wwbogy4m2xb2ea', E'cmvy9o5fs00psbogywg0q4q35', E'SHORT_ANSWER', E'1', NULL, NULL, NULL, E'What is personal hygiene?', NULL, E'"Keeping our body clean."', E'["keeping the body clean","keeping ourselves clean","cleanliness of the body"]', NULL, NULL, NULL, FALSE, FALSE, 2, 1, NULL, NULL, NULL, '2026-11-01T20:12:36.263Z', '2026-11-01T20:12:36.263Z'),
(E'cmvy9o5rb01x0bogy8kkepgcj', E'cmvy9o5ra01wwbogy4m2xb2ea', E'cmvy9o5fs00psbogywg0q4q35', E'MULTIPLE_CHOICE', E'2', NULL, NULL, NULL, E'Which of these is a good hygiene practice?', E'["Sharing a toothbrush","Washing hands after visiting the latrine","Eating food from the floor","Drinking unboiled water"]', E'"Washing hands after visiting the latrine"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 2, NULL, NULL, NULL, '2026-11-01T20:12:36.263Z', '2026-11-01T20:12:36.263Z'),
(E'cmvy9o5rb01x2bogyr0apupcb', E'cmvy9o5ra01wwbogy4m2xb2ea', E'cmvy9o5fs00psbogywg0q4q35', E'SHORT_ANSWER', E'3', NULL, NULL, NULL, E'Give one reason why we should brush our teeth after meals.', NULL, E'"To remove food particles that cause tooth decay / to prevent bad breath."', E'["to prevent tooth decay","to remove food particles","to prevent bad breath","to keep teeth clean","to prevent dental caries"]', NULL, NULL, NULL, FALSE, FALSE, 2, 3, NULL, NULL, NULL, '2026-11-01T20:12:36.264Z', '2026-11-01T20:12:36.264Z'),
(E'cmvy9o5rb01x4bogys8724fkv', E'cmvy9o5ra01wwbogy4m2xb2ea', E'cmvy9o5fs00psbogywg0q4q35', E'SHORT_ANSWER', E'4', NULL, NULL, NULL, E'Name one disease caused by poor sanitation.', NULL, E'"Cholera"', E'["typhoid","dysentery","diarrhoea","bilharzia","worms"]', NULL, NULL, NULL, FALSE, FALSE, 2, 4, NULL, NULL, NULL, '2026-11-01T20:12:36.264Z', '2026-11-01T20:12:36.264Z'),
(E'cmvy9o5rc01x6bogyov9hcxff', E'cmvy9o5ra01wwbogy4m2xb2ea', E'cmvy9o5fs00psbogywg0q4q35', E'SHORT_ANSWER', E'5', NULL, NULL, NULL, E'Give one way of making water safe for drinking.', NULL, E'"Boiling"', E'["boil it","filtering","using water guard","chlorination","boiling it"]', NULL, NULL, NULL, FALSE, FALSE, 2, 5, NULL, NULL, NULL, '2026-11-01T20:12:36.264Z', '2026-11-01T20:12:36.264Z'),
(E'cmvy9o5rc01x8bogyj4xafmtg', E'cmvy9o5ra01wwbogy4m2xb2ea', E'cmvy9o5fs00psbogywg0q4q35', E'SHORT_ANSWER', E'6', NULL, NULL, NULL, E'Why should a latrine be built far from a water source?', NULL, E'"To prevent faeces from contaminating the water."', E'["to avoid contaminating water","so that germs do not enter the water","to prevent diseases","to avoid polluting the water source"]', NULL, NULL, NULL, FALSE, FALSE, 2, 6, NULL, NULL, NULL, '2026-11-01T20:12:36.265Z', '2026-11-01T20:12:36.265Z'),
(E'cmvy9o5rc01xabogydqnsdhfp', E'cmvy9o5ra01wwbogy4m2xb2ea', E'cmvy9o5fs00psbogywg0q4q35', E'MULTIPLE_CHOICE', E'7', NULL, NULL, NULL, E'Which item should every latrine have to keep flies away?', E'["A window","A cover/lid on the hole","A radio","A carpet"]', E'"A cover/lid on the hole"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 7, NULL, NULL, NULL, '2026-11-01T20:12:36.265Z', '2026-11-01T20:12:36.265Z'),
(E'cmvy9o5rd01xcbogyfu4tr84r', E'cmvy9o5ra01wwbogy4m2xb2ea', E'cmvy9o5fs00psbogywg0q4q35', E'SHORT_ANSWER', E'8', NULL, NULL, NULL, E'Name two things we need to wash our hands properly.', NULL, E'"Clean water and soap"', E'["water and soap","soap and water","soap and clean water"]', NULL, NULL, NULL, FALSE, FALSE, 2, 8, NULL, NULL, NULL, '2026-11-01T20:12:36.265Z', '2026-11-01T20:12:36.265Z'),
(E'cmvy9o5rf01xobogy4dcuh8va', E'cmvy9o5re01xkbogyqt53tjxn', E'cmvy9o5fv00qcbogymjt0fdcs', E'SHORT_ANSWER', E'2', NULL, NULL, NULL, E'In which direction does the sun rise?', NULL, E'"East"', NULL, NULL, NULL, NULL, FALSE, FALSE, 2, 2, NULL, NULL, NULL, '2026-11-01T20:12:36.268Z', '2026-11-01T20:12:36.268Z'),
(E'cmvy9o5rg01xqbogyvk4uc5yd', E'cmvy9o5re01xkbogyqt53tjxn', E'cmvy9o5fv00qcbogymjt0fdcs', E'MULTIPLE_CHOICE', E'3', NULL, NULL, NULL, E'Which compass point is between North and East?', E'["North-West","South-East","North-East","South-West"]', E'"North-East"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 3, NULL, NULL, NULL, '2026-11-01T20:12:36.268Z', '2026-11-01T20:12:36.268Z'),
(E'cmvy9o5rg01xsbogyg2z4gerr', E'cmvy9o5re01xkbogyqt53tjxn', E'cmvy9o5fv00qcbogymjt0fdcs', E'SHORT_ANSWER', E'4', NULL, NULL, NULL, E'If you face north, which direction is on your right?', NULL, E'"East"', NULL, NULL, NULL, NULL, FALSE, FALSE, 2, 4, NULL, NULL, NULL, '2026-11-01T20:12:36.268Z', '2026-11-01T20:12:36.268Z'),
(E'cmvy9o5rg01xubogyl4ekuezk', E'cmvy9o5re01xkbogyqt53tjxn', E'cmvy9o5fv00qcbogymjt0fdcs', E'SHORT_ANSWER', E'5', NULL, NULL, NULL, E'What is a map?', NULL, E'"A drawing of a place as seen from above."', E'["a drawing of a place from above","drawing of an area as seen from above","representation of a place on paper as seen from above"]', NULL, NULL, NULL, FALSE, FALSE, 2, 5, NULL, NULL, NULL, '2026-11-01T20:12:36.269Z', '2026-11-01T20:12:36.269Z'),
(E'cmvy9o5rh01xwbogyvblugbou', E'cmvy9o5re01xkbogyqt53tjxn', E'cmvy9o5fv00qcbogymjt0fdcs', E'SHORT_ANSWER', E'6', NULL, NULL, NULL, E'Give one use of maps.', NULL, E'"Finding places / showing directions / planning journeys."', E'["finding places","showing direction","planning journeys","locating places","showing distribution of things","to find direction"]', NULL, NULL, NULL, FALSE, FALSE, 2, 6, NULL, NULL, NULL, '2026-11-01T20:12:36.269Z', '2026-11-01T20:12:36.269Z'),
(E'cmvy9o5rh01xybogya1iv8g4v', E'cmvy9o5re01xkbogyqt53tjxn', E'cmvy9o5fv00qcbogymjt0fdcs', E'MULTIPLE_CHOICE', E'7', NULL, NULL, NULL, E'Which symbol usually shows a hospital on a map?', E'["A plus sign (+)","A circle","A triangle","A wavy line"]', E'"A plus sign (+)"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 7, NULL, NULL, NULL, '2026-11-01T20:12:36.269Z', '2026-11-01T20:12:36.269Z'),
(E'cmvy9o5rh01y0bogy0tsyu6zn', E'cmvy9o5re01xkbogyqt53tjxn', E'cmvy9o5fv00qcbogymjt0fdcs', E'FILL_BLANK', E'8', NULL, NULL, NULL, E'The opposite of North-West is ______.', NULL, E'"South-East"', E'["south east","SE"]', NULL, NULL, NULL, FALSE, FALSE, 1, 8, NULL, NULL, NULL, '2026-11-01T20:12:36.270Z', '2026-11-01T20:12:36.270Z'),
(E'cmvy9o5ri01y2bogyryebwba2', E'cmvy9o5re01xkbogyqt53tjxn', E'cmvy9o5fv00qcbogymjt0fdcs', E'SHORT_ANSWER', E'9', NULL, NULL, NULL, E'Name the four cardinal points of the compass.', NULL, E'"North, East, South, West"', E'["north, south, east, west","N, E, S, W","north east south west"]', NULL, NULL, NULL, FALSE, FALSE, 2, 9, NULL, NULL, NULL, '2026-11-01T20:12:36.270Z', '2026-11-01T20:12:36.270Z'),
(E'cmvy9o5ri01y4bogy2qxf1mv2', E'cmvy9o5re01xkbogyqt53tjxn', E'cmvy9o5fv00qcbogymjt0fdcs', E'DRAWING', E'10', NULL, NULL, NULL, E'Draw a compass showing the four cardinal points.', NULL, E'"A cross/star with N at top, S at bottom, E on the right and W on the left."', NULL, NULL, E'A cross/star with N at top, S at bottom, E on the right and W on the left.', NULL, FALSE, FALSE, 2, 10, NULL, NULL, NULL, '2026-11-01T20:12:36.271Z', '2026-11-01T20:12:36.271Z'),
(E'cmvy9o5rl01y8bogytl4oiwjz', E'cmvy9o5rj01y6bogyjnila8my', E'cmvy9o5fx00qkbogyrksl4tfm', E'SHORT_ANSWER', E'1', NULL, NULL, NULL, E'Who is the political head of a district in Uganda?', NULL, E'"The LC5 Chairperson (District Chairperson)"', E'["LC5 chairperson","LC V chairperson","district chairperson","LCV chairman","LC5 chairman"]', NULL, NULL, NULL, FALSE, FALSE, 2, 1, NULL, NULL, NULL, '2026-11-01T20:12:36.273Z', '2026-11-01T20:12:36.273Z')
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "Question" ("id", "paperId", "topicId", "type", "displayNumber", "section", "stimulus", "imageUrl", "prompt", "options", "correctAnswer", "acceptedAnswers", "explanation", "markingGuide", "numericTolerance", "caseSensitive", "requiresTeacher", "points", "order", "parentId", "unit", "partialRule", "createdAt", "updatedAt") VALUES
(E'cmvy9o5rm01yabogy3oancdcr', E'cmvy9o5rj01y6bogyjnila8my', E'cmvy9o5fx00qkbogyrksl4tfm', E'SHORT_ANSWER', E'2', NULL, NULL, NULL, E'Who is the head of the civil servants in a district?', NULL, E'"The Chief Administrative Officer (CAO)"', E'["CAO","Chief Administrative Officer"]', NULL, NULL, NULL, FALSE, FALSE, 2, 2, NULL, NULL, NULL, '2026-11-01T20:12:36.274Z', '2026-11-01T20:12:36.274Z'),
(E'cmvy9o5rm01ycbogyhzspzm2p', E'cmvy9o5rj01y6bogyjnila8my', E'cmvy9o5fx00qkbogyrksl4tfm', E'SHORT_ANSWER', E'3', NULL, NULL, NULL, E'Who represents the President in a district?', NULL, E'"The Resident District Commissioner (RDC)"', E'["RDC","Resident District Commissioner"]', NULL, NULL, NULL, FALSE, FALSE, 2, 3, NULL, NULL, NULL, '2026-11-01T20:12:36.275Z', '2026-11-01T20:12:36.275Z'),
(E'cmvy9o5rm01yebogyerarfcd1', E'cmvy9o5rj01y6bogyjnila8my', E'cmvy9o5fx00qkbogyrksl4tfm', E'MULTIPLE_CHOICE', E'4', NULL, NULL, NULL, E'Which local council is in charge of a village?', E'["LC1","LC3","LC5","LC2"]', E'"LC1"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 4, NULL, NULL, NULL, '2026-11-01T20:12:36.275Z', '2026-11-01T20:12:36.275Z'),
(E'cmvy9o5rn01ygbogybeosflbb', E'cmvy9o5rj01y6bogyjnila8my', E'cmvy9o5fx00qkbogyrksl4tfm', E'MULTIPLE_CHOICE', E'5', NULL, NULL, NULL, E'Which local council is in charge of a sub-county?', E'["LC1","LC2","LC3","LC4"]', E'"LC3"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 5, NULL, NULL, NULL, '2026-11-01T20:12:36.275Z', '2026-11-01T20:12:36.275Z'),
(E'cmvy9o5rn01yibogy8g73ofy0', E'cmvy9o5rj01y6bogyjnila8my', E'cmvy9o5fx00qkbogyrksl4tfm', E'SHORT_ANSWER', E'6', NULL, NULL, NULL, E'Give one quality of a good leader.', NULL, E'"Honesty"', E'["honest","fair","hardworking","responsible","kind","respectful","trustworthy","patient"]', NULL, NULL, NULL, FALSE, FALSE, 2, 6, NULL, NULL, NULL, '2026-11-01T20:12:36.276Z', '2026-11-01T20:12:36.276Z'),
(E'cmvy9o5rn01ykbogy7fphs144', E'cmvy9o5rj01y6bogyjnila8my', E'cmvy9o5fx00qkbogyrksl4tfm', E'SHORT_ANSWER', E'7', NULL, NULL, NULL, E'Give one social service provided by the district.', NULL, E'"Health services / education / roads / clean water."', E'["health","education","roads","water","security","hospitals","schools","clean water"]', NULL, NULL, NULL, FALSE, FALSE, 2, 7, NULL, NULL, NULL, '2026-11-01T20:12:36.276Z', '2026-11-01T20:12:36.276Z'),
(E'cmvy9o5ro01ymbogyvsb8szi7', E'cmvy9o5rj01y6bogyjnila8my', E'cmvy9o5fx00qkbogyrksl4tfm', E'SHORT_ANSWER', E'8', NULL, NULL, NULL, E'Who is the head of a school?', NULL, E'"The head teacher"', E'["headteacher","headmaster","headmistress","head teacher"]', NULL, NULL, NULL, FALSE, FALSE, 2, 8, NULL, NULL, NULL, '2026-11-01T20:12:36.276Z', '2026-11-01T20:12:36.276Z'),
(E'cmvy9o5ro01yobogy40xg006j', E'cmvy9o5rj01y6bogyjnila8my', E'cmvy9o5fx00qkbogyrksl4tfm', E'SHORT_ANSWER', E'9', NULL, NULL, NULL, E'Give one duty of the police.', NULL, E'"Keeping law and order / protecting people and property / arresting criminals."', E'["keeping law and order","arresting criminals","protecting people","controlling traffic","maintaining peace","protecting property"]', NULL, NULL, NULL, FALSE, FALSE, 2, 9, NULL, NULL, NULL, '2026-11-01T20:12:36.277Z', '2026-11-01T20:12:36.277Z'),
(E'cmvy9o5rp01yqbogymx47n1oz', E'cmvy9o5rj01y6bogyjnila8my', E'cmvy9o5fx00qkbogyrksl4tfm', E'MATCHING', E'10', NULL, NULL, NULL, E'Match the leader to the area they lead.', NULL, E'[["LC1 Chairperson","Village"],["LC3 Chairperson","Sub-county"],["LC5 Chairperson","District"],["Head teacher","School"]]', NULL, NULL, NULL, NULL, FALSE, FALSE, 4, 10, NULL, NULL, NULL, '2026-11-01T20:12:36.277Z', '2026-11-01T20:12:36.277Z'),
(E'cmvy9o5rq01ywbogy0u94nn35', E'cmvy9o5rq01yubogylmibpkd6', E'cmvy9o5gf00sqbogykwsui0y6', E'MULTIPLE_CHOICE', E'1', NULL, NULL, NULL, E'What is the place value of 8 in 3.482?', E'["Tenths","Hundredths","Thousandths","Ones"]', E'"Hundredths"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 1, NULL, NULL, NULL, '2026-11-01T20:12:36.279Z', '2026-11-01T20:12:36.279Z'),
(E'cmvy9o5rr01yybogyju4ztt2p', E'cmvy9o5rq01yubogylmibpkd6', E'cmvy9o5gf00sqbogykwsui0y6', E'NUMERIC', E'2', NULL, NULL, NULL, E'Work out 4.75 + 2.8.', NULL, E'7.55', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 2, NULL, NULL, NULL, '2026-11-01T20:12:36.279Z', '2026-11-01T20:12:36.279Z'),
(E'cmvy9o5rr01z0bogy635a52zp', E'cmvy9o5rq01yubogylmibpkd6', E'cmvy9o5gf00sqbogykwsui0y6', E'NUMERIC', E'3', NULL, NULL, NULL, E'Work out 9.3 − 4.65.', NULL, E'4.65', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 3, NULL, NULL, NULL, '2026-11-01T20:12:36.279Z', '2026-11-01T20:12:36.279Z'),
(E'cmvy9o5rr01z2bogynv0ps940', E'cmvy9o5rq01yubogylmibpkd6', E'cmvy9o5gf00sqbogykwsui0y6', E'NUMERIC', E'4', NULL, NULL, NULL, E'Work out 1.2 × 0.5.', NULL, E'0.6', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 4, NULL, NULL, NULL, '2026-11-01T20:12:36.280Z', '2026-11-01T20:12:36.280Z'),
(E'cmvy9o5rs01z4bogyol4y0lsl', E'cmvy9o5rq01yubogylmibpkd6', E'cmvy9o5gf00sqbogykwsui0y6', E'NUMERIC', E'5', NULL, NULL, NULL, E'Work out 7.2 ÷ 0.9.', NULL, E'8', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 5, NULL, NULL, NULL, '2026-11-01T20:12:36.280Z', '2026-11-01T20:12:36.280Z'),
(E'cmvy9o5rs01z6bogyaa4r2x11', E'cmvy9o5rq01yubogylmibpkd6', E'cmvy9o5gf00sqbogykwsui0y6', E'NUMERIC', E'6', NULL, NULL, NULL, E'Change ⅜ to a decimal.', NULL, E'0.375', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 6, NULL, NULL, NULL, '2026-11-01T20:12:36.280Z', '2026-11-01T20:12:36.280Z'),
(E'cmvy9o5rs01z8bogy2fjgoz0m', E'cmvy9o5rq01yubogylmibpkd6', E'cmvy9o5gf00sqbogykwsui0y6', E'FILL_BLANK', E'7', NULL, NULL, NULL, E'Change 0.35 to a fraction in its lowest terms.', NULL, E'"7/20"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 7, NULL, NULL, NULL, '2026-11-01T20:12:36.281Z', '2026-11-01T20:12:36.281Z'),
(E'cmvy9o5rt01zabogy6wkzk62d', E'cmvy9o5rq01yubogylmibpkd6', E'cmvy9o5gf00sqbogykwsui0y6', E'NUMERIC', E'8', NULL, NULL, NULL, E'Change ⅗ to a percentage (enter the number only).', NULL, E'60', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 8, NULL, NULL, NULL, '2026-11-01T20:12:36.281Z', '2026-11-01T20:12:36.281Z'),
(E'cmvy9o5rt01zcbogys4a48557', E'cmvy9o5rq01yubogylmibpkd6', E'cmvy9o5gf00sqbogykwsui0y6', E'NUMERIC', E'9', NULL, NULL, NULL, E'Find 25% of 80.', NULL, E'20', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 9, NULL, NULL, NULL, '2026-11-01T20:12:36.282Z', '2026-11-01T20:12:36.282Z'),
(E'cmvy9o5ru01zebogyx6w1yjhx', E'cmvy9o5rq01yubogylmibpkd6', E'cmvy9o5gf00sqbogykwsui0y6', E'NUMERIC', E'10', NULL, NULL, NULL, E'In a class of 50 pupils, 20 are girls. What percentage of the class are girls?', NULL, E'40', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 10, NULL, NULL, NULL, '2026-11-01T20:12:36.282Z', '2026-11-01T20:12:36.282Z'),
(E'cmvy9o5ru01zgbogyw9wi07lo', E'cmvy9o5rq01yubogylmibpkd6', E'cmvy9o5gf00sqbogykwsui0y6', E'NUMERIC', E'11', NULL, NULL, NULL, E'Work out 3.14 × 100.', NULL, E'314', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 11, NULL, NULL, NULL, '2026-11-01T20:12:36.282Z', '2026-11-01T20:12:36.282Z'),
(E'cmvy9o5ru01zibogykc06ijf0', E'cmvy9o5rq01yubogylmibpkd6', E'cmvy9o5gf00sqbogykwsui0y6', E'MULTIPLE_CHOICE', E'12', NULL, NULL, NULL, E'Arrange in ascending order: 0.7, 0.07, 0.77, 0.707', E'["0.07, 0.7, 0.707, 0.77","0.7, 0.07, 0.77, 0.707","0.77, 0.707, 0.7, 0.07","0.07, 0.707, 0.7, 0.77"]', E'"0.07, 0.7, 0.707, 0.77"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 12, NULL, NULL, NULL, '2026-11-01T20:12:36.283Z', '2026-11-01T20:12:36.283Z'),
(E'cmvy9o5rw01zobogyweuf887y', E'cmvy9o5rv01zmbogy0qlxketd', E'cmvy9o5gg00swbogy7zh1ot9m', E'NUMERIC', E'1', NULL, NULL, NULL, E'Change 4.5 km to metres.', NULL, E'4500', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 1, NULL, NULL, NULL, '2026-11-01T20:12:36.284Z', '2026-11-01T20:12:36.284Z'),
(E'cmvy9o5rw01zqbogynlyz9wca', E'cmvy9o5rv01zmbogy0qlxketd', E'cmvy9o5gg00swbogy7zh1ot9m', E'NUMERIC', E'2', NULL, NULL, NULL, E'Change 850 cm to metres.', NULL, E'8.5', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 2, NULL, NULL, NULL, '2026-11-01T20:12:36.285Z', '2026-11-01T20:12:36.285Z'),
(E'cmvy9o5rx01zsbogy5ieezziy', E'cmvy9o5rv01zmbogy0qlxketd', E'cmvy9o5gg00swbogy7zh1ot9m', E'NUMERIC', E'3', NULL, NULL, NULL, E'Find the perimeter of a rectangle 15 cm long and 9 cm wide (cm).', NULL, E'48', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 3, NULL, NULL, NULL, '2026-11-01T20:12:36.285Z', '2026-11-01T20:12:36.285Z'),
(E'cmvy9o5rx01zubogy373pnhjx', E'cmvy9o5rv01zmbogy0qlxketd', E'cmvy9o5gg00swbogy7zh1ot9m', E'NUMERIC', E'4', NULL, NULL, NULL, E'Find the area of a square whose side is 11 cm (cm²).', NULL, E'121', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 4, NULL, NULL, NULL, '2026-11-01T20:12:36.285Z', '2026-11-01T20:12:36.285Z'),
(E'cmvy9o5ry01zwbogylhk0foup', E'cmvy9o5rv01zmbogy0qlxketd', E'cmvy9o5gg00swbogy7zh1ot9m', E'NUMERIC', E'5', NULL, NULL, NULL, E'Find the area of a rectangle 14 m by 6 m (m²).', NULL, E'84', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 5, NULL, NULL, NULL, '2026-11-01T20:12:36.286Z', '2026-11-01T20:12:36.286Z'),
(E'cmvy9o5rz01zybogy2q5trpkv', E'cmvy9o5rv01zmbogy0qlxketd', E'cmvy9o5gg00swbogy7zh1ot9m', E'NUMERIC', E'6', NULL, NULL, NULL, E'A triangle has a base of 12 cm and a height of 5 cm. Find its area (cm²).', NULL, E'30', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 6, NULL, NULL, NULL, '2026-11-01T20:12:36.287Z', '2026-11-01T20:12:36.287Z'),
(E'cmvy9o5s30200bogylijtnkq6', E'cmvy9o5rv01zmbogy0qlxketd', E'cmvy9o5gg00swbogy7zh1ot9m', E'NUMERIC', E'7', NULL, NULL, NULL, E'The area of a rectangle is 96 cm² and its width is 8 cm. Find its length (cm).', NULL, E'12', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 7, NULL, NULL, NULL, '2026-11-01T20:12:36.292Z', '2026-11-01T20:12:36.292Z'),
(E'cmvy9o5s40202bogyhsh9fxv8', E'cmvy9o5rv01zmbogy0qlxketd', E'cmvy9o5gg00swbogy7zh1ot9m', E'NUMERIC', E'8', NULL, NULL, NULL, E'A square has a perimeter of 48 cm. Find the length of one side (cm).', NULL, E'12', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 8, NULL, NULL, NULL, '2026-11-01T20:12:36.293Z', '2026-11-01T20:12:36.293Z'),
(E'cmvy9o5s50204bogylb1daei8', E'cmvy9o5rv01zmbogy0qlxketd', E'cmvy9o5gg00swbogy7zh1ot9m', E'NUMERIC', E'9', NULL, NULL, NULL, E'A rectangular garden is 25 m long and 18 m wide. Find the total length of fence needed to go round it (m).', NULL, E'86', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 9, NULL, NULL, NULL, '2026-11-01T20:12:36.293Z', '2026-11-01T20:12:36.293Z'),
(E'cmvy9o5s50206bogyf44oeuw7', E'cmvy9o5rv01zmbogy0qlxketd', E'cmvy9o5gg00swbogy7zh1ot9m', E'NUMERIC', E'10', NULL, NULL, NULL, E'A rectangular floor 6 m by 4 m is covered with square tiles of side 1 m. How many tiles are needed?', NULL, E'24', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 10, NULL, NULL, NULL, '2026-11-01T20:12:36.294Z', '2026-11-01T20:12:36.294Z'),
(E'cmvy9o5s60208bogyrbstn91g', E'cmvy9o5rv01zmbogy0qlxketd', E'cmvy9o5gg00swbogy7zh1ot9m', E'LONG_ANSWER', E'11', NULL, NULL, NULL, E'A rectangular plot 30 m by 20 m has a path 2 m wide inside along all four sides. Find the area of the path.', NULL, E'"Outer area 600 m². Inner rectangle 26 m × 16 m = 416 m². Path = 600 − 416 = 184 m². Marks: outer (1), inner dimensions (1), inner area (1), answer (1)."', NULL, NULL, E'Outer area 600 m². Inner rectangle 26 m × 16 m = 416 m². Path = 600 − 416 = 184 m². Marks: outer (1), inner dimensions (1), inner area (1), answer (1).', NULL, FALSE, FALSE, 4, 11, NULL, NULL, NULL, '2026-11-01T20:12:36.294Z', '2026-11-01T20:12:36.294Z'),
(E'cmvy9o5s7020ebogymhj5d9vw', E'cmvy9o5s6020cbogyp4tk7t5w', E'cmvy9o5gk00tgbogysxmh92j9', E'FILL_BLANK', E'1', NULL, NULL, NULL, E'Give the comparative form of ''big''.', NULL, E'"bigger"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 1, NULL, NULL, NULL, '2026-11-01T20:12:36.295Z', '2026-11-01T20:12:36.295Z'),
(E'cmvy9o5s7020gbogysl843430', E'cmvy9o5s6020cbogyp4tk7t5w', E'cmvy9o5gk00tgbogysxmh92j9', E'FILL_BLANK', E'2', NULL, NULL, NULL, E'Give the superlative form of ''happy''.', NULL, E'"happiest"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 2, NULL, NULL, NULL, '2026-11-01T20:12:36.296Z', '2026-11-01T20:12:36.296Z'),
(E'cmvy9o5s8020ibogyqdqax8ob', E'cmvy9o5s6020cbogyp4tk7t5w', E'cmvy9o5gk00tgbogysxmh92j9', E'FILL_BLANK', E'3', NULL, NULL, NULL, E'Give the superlative form of ''good''.', NULL, E'"best"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 3, NULL, NULL, NULL, '2026-11-01T20:12:36.296Z', '2026-11-01T20:12:36.296Z'),
(E'cmvy9o5s8020kbogy3um3yd6p', E'cmvy9o5s6020cbogyp4tk7t5w', E'cmvy9o5gk00tgbogysxmh92j9', E'FILL_BLANK', E'4', NULL, NULL, NULL, E'Give the comparative form of ''bad''.', NULL, E'"worse"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 4, NULL, NULL, NULL, '2026-11-01T20:12:36.296Z', '2026-11-01T20:12:36.296Z'),
(E'cmvy9o5s8020mbogyj29r3db6', E'cmvy9o5s6020cbogyp4tk7t5w', E'cmvy9o5gk00tgbogysxmh92j9', E'FILL_BLANK', E'5', NULL, NULL, NULL, E'Complete: Kampala is the ______ (large) city in Uganda.', NULL, E'"largest"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 5, NULL, NULL, NULL, '2026-11-01T20:12:36.297Z', '2026-11-01T20:12:36.297Z'),
(E'cmvy9o5s9020obogyxgwpc1i7', E'cmvy9o5s6020cbogyp4tk7t5w', E'cmvy9o5gk00tgbogysxmh92j9', E'FILL_BLANK', E'6', NULL, NULL, NULL, E'Complete: This road is ______ (dangerous) than that one.', NULL, E'"more dangerous"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 6, NULL, NULL, NULL, '2026-11-01T20:12:36.297Z', '2026-11-01T20:12:36.297Z'),
(E'cmvy9o5s9020qbogyl1pekwws', E'cmvy9o5s6020cbogyp4tk7t5w', E'cmvy9o5gk00tgbogysxmh92j9', E'MULTIPLE_CHOICE', E'7', NULL, NULL, NULL, E'Choose the correct sentence.', E'["Of the two girls, Amina is the tallest.","Of the two girls, Amina is the taller.","Of the two girls, Amina is more tall.","Of the two girls, Amina is tall."]', E'"Of the two girls, Amina is the taller."', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 7, NULL, NULL, NULL, '2026-11-01T20:12:36.298Z', '2026-11-01T20:12:36.298Z'),
(E'cmvy9o5s9020sbogympmyi1xy', E'cmvy9o5s6020cbogyp4tk7t5w', E'cmvy9o5gk00tgbogysxmh92j9', E'FILL_BLANK', E'8', NULL, NULL, NULL, E'Complete: My bag is as ______ (heavy) as yours.', NULL, E'"heavy"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 8, NULL, NULL, NULL, '2026-11-01T20:12:36.298Z', '2026-11-01T20:12:36.298Z'),
(E'cmvy9o5sa020ubogy9b9yu2v7', E'cmvy9o5s6020cbogyp4tk7t5w', E'cmvy9o5gk00tgbogysxmh92j9', E'FILL_BLANK', E'9', NULL, NULL, NULL, E'Complete: Of all the pupils, Opio ran the ______ (far).', NULL, E'"farthest"', E'["furthest"]', NULL, NULL, NULL, FALSE, FALSE, 1, 9, NULL, NULL, NULL, '2026-11-01T20:12:36.298Z', '2026-11-01T20:12:36.298Z'),
(E'cmvy9o5sa020wbogyzydzvqzk', E'cmvy9o5s6020cbogyp4tk7t5w', E'cmvy9o5gk00tgbogysxmh92j9', E'FILL_BLANK', E'10', NULL, NULL, NULL, E'Complete: She has ______ (little) money than her brother.', NULL, E'"less"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 10, NULL, NULL, NULL, '2026-11-01T20:12:36.299Z', '2026-11-01T20:12:36.299Z'),
(E'cmvy9o5sb020ybogyev0glo40', E'cmvy9o5s6020cbogyp4tk7t5w', E'cmvy9o5gk00tgbogysxmh92j9', E'MULTIPLE_CHOICE', E'11', NULL, NULL, NULL, E'Choose the correct order: She bought a ______ dress.', E'["red beautiful long","beautiful long red","long red beautiful","red long beautiful"]', E'"beautiful long red"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 11, NULL, NULL, NULL, '2026-11-01T20:12:36.299Z', '2026-11-01T20:12:36.299Z'),
(E'cmvy9o5sc0214bogy10u0oqck', E'cmvy9o5sc0212bogy2t5wy4wz', E'cmvy9o5gm00tubogydc2ta9hf', E'MULTIPLE_CHOICE', E'1', NULL, NULL, NULL, E'How many addresses does a formal letter have?', E'["None","One","Two","Three"]', E'"Two"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 1, NULL, NULL, NULL, '2026-11-01T20:12:36.301Z', '2026-11-01T20:12:36.301Z'),
(E'cmvy9o5sd0216bogy3cjri7kl', E'cmvy9o5sc0212bogy2t5wy4wz', E'cmvy9o5gm00tubogydc2ta9hf', E'MULTIPLE_CHOICE', E'2', NULL, NULL, NULL, E'Which ending is correct after ''Dear Sir/Madam''?', E'["Yours sincerely,","Yours faithfully,","Your friend,","With love,"]', E'"Yours faithfully,"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 2, NULL, NULL, NULL, '2026-11-01T20:12:36.301Z', '2026-11-01T20:12:36.301Z'),
(E'cmvy9o5sd0218bogyyvm5kzzz', E'cmvy9o5sc0212bogy2t5wy4wz', E'cmvy9o5gm00tubogydc2ta9hf', E'SHORT_ANSWER', E'3', NULL, NULL, NULL, E'Where is the writer''s address placed in a letter?', NULL, E'"At the top right-hand corner"', E'["top right","top right corner","on the right at the top","right hand side at the top"]', NULL, NULL, NULL, FALSE, FALSE, 2, 3, NULL, NULL, NULL, '2026-11-01T20:12:36.302Z', '2026-11-01T20:12:36.302Z'),
(E'cmvy9o5sd021abogyx2ng2zk3', E'cmvy9o5sc0212bogy2t5wy4wz', E'cmvy9o5gm00tubogydc2ta9hf', E'FILL_BLANK', E'4', NULL, NULL, NULL, E'The part of a letter that says ''Dear Uncle,'' is called the ______.', NULL, E'"salutation"', E'["greeting"]', NULL, NULL, NULL, FALSE, FALSE, 1, 4, NULL, NULL, NULL, '2026-11-01T20:12:36.302Z', '2026-11-01T20:12:36.302Z'),
(E'cmvy9o5se021cbogyzk7591b6', E'cmvy9o5sc0212bogy2t5wy4wz', E'cmvy9o5gm00tubogydc2ta9hf', E'MULTIPLE_CHOICE', E'5', NULL, NULL, NULL, E'Which of these is a correct salutation for a letter to your friend?', E'["Dear Sir,","Dear Madam,","Dear Aisha,","To whom it may concern,"]', E'"Dear Aisha,"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 5, NULL, NULL, NULL, '2026-11-01T20:12:36.302Z', '2026-11-01T20:12:36.302Z'),
(E'cmvy9o5se021ebogyrez1uygi', E'cmvy9o5sc0212bogy2t5wy4wz', E'cmvy9o5gm00tubogydc2ta9hf', E'SHORT_ANSWER', E'6', NULL, NULL, NULL, E'What comes immediately below the address in a letter?', NULL, E'"The date"', E'["date"]', NULL, NULL, NULL, FALSE, FALSE, 2, 6, NULL, NULL, NULL, '2026-11-01T20:12:36.303Z', '2026-11-01T20:12:36.303Z'),
(E'cmvy9o5sf021gbogydqu7377b', E'cmvy9o5sc0212bogy2t5wy4wz', E'cmvy9o5gm00tubogydc2ta9hf', E'MULTIPLE_CHOICE', E'7', NULL, NULL, NULL, E'A letter to the head teacher asking for permission is a:', E'["friendly letter","formal letter","poem","story"]', E'"formal letter"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 7, NULL, NULL, NULL, '2026-11-01T20:12:36.303Z', '2026-11-01T20:12:36.303Z')
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "Question" ("id", "paperId", "topicId", "type", "displayNumber", "section", "stimulus", "imageUrl", "prompt", "options", "correctAnswer", "acceptedAnswers", "explanation", "markingGuide", "numericTolerance", "caseSensitive", "requiresTeacher", "points", "order", "parentId", "unit", "partialRule", "createdAt", "updatedAt") VALUES
(E'cmvy9o5sf021ibogys86r5usf', E'cmvy9o5sc0212bogy2t5wy4wz', E'cmvy9o5gm00tubogydc2ta9hf', E'LONG_ANSWER', E'8', NULL, NULL, NULL, E'Write a letter to your friend telling him or her about your school sports day. (Marks for layout: address and date, salutation, three paragraphs, ending; and for content, grammar and spelling.)', NULL, E'"Layout 4 marks (address/date 1, salutation 1, paragraphing 1, ending 1). Content and language 6 marks: describes events of sports day, correct tenses, clear sentences, few spelling errors."', NULL, NULL, E'Layout 4 marks (address/date 1, salutation 1, paragraphing 1, ending 1). Content and language 6 marks: describes events of sports day, correct tenses, clear sentences, few spelling errors.', NULL, FALSE, FALSE, 10, 8, NULL, NULL, NULL, '2026-11-01T20:12:36.303Z', '2026-11-01T20:12:36.303Z'),
(E'cmvy9o5sj021obogythyf9rxf', E'cmvy9o5si021mbogylb5cyeal', E'cmvy9o5gp00u6bogyjtnogki3', E'SHORT_ANSWER', E'1', NULL, NULL, NULL, E'Name the enzyme in saliva.', NULL, E'"Ptyalin (salivary amylase)"', E'["ptyalin","amylase","salivary amylase"]', NULL, NULL, NULL, FALSE, FALSE, 2, 1, NULL, NULL, NULL, '2026-11-01T20:12:36.308Z', '2026-11-01T20:12:36.308Z'),
(E'cmvy9o5sl021qbogycd128ek5', E'cmvy9o5si021mbogylb5cyeal', E'cmvy9o5gp00u6bogyjtnogki3', E'MULTIPLE_CHOICE', E'2', NULL, NULL, NULL, E'Where does digestion begin?', E'["Stomach","Mouth","Small intestine","Oesophagus"]', E'"Mouth"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 2, NULL, NULL, NULL, '2026-11-01T20:12:36.309Z', '2026-11-01T20:12:36.309Z'),
(E'cmvy9o5sm021sbogyzc8jh0wk', E'cmvy9o5si021mbogylb5cyeal', E'cmvy9o5gp00u6bogyjtnogki3', E'FILL_BLANK', E'3', NULL, NULL, NULL, E'The wave-like movement that pushes food along the gut is called ______.', NULL, E'"peristalsis"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 3, NULL, NULL, NULL, '2026-11-01T20:12:36.311Z', '2026-11-01T20:12:36.311Z'),
(E'cmvy9o5sn021ubogy4b8vo4gv', E'cmvy9o5si021mbogylb5cyeal', E'cmvy9o5gp00u6bogyjtnogki3', E'SHORT_ANSWER', E'4', NULL, NULL, NULL, E'What is the function of hydrochloric acid in the stomach?', NULL, E'"It kills germs in food (and provides an acidic medium for pepsin)."', E'["kills germs","to kill germs in food","kills bacteria","kill germs"]', NULL, NULL, NULL, FALSE, FALSE, 2, 4, NULL, NULL, NULL, '2026-11-01T20:12:36.311Z', '2026-11-01T20:12:36.311Z'),
(E'cmvy9o5so021wbogy8c5j0uul', E'cmvy9o5si021mbogylb5cyeal', E'cmvy9o5gp00u6bogyjtnogki3', E'MULTIPLE_CHOICE', E'5', NULL, NULL, NULL, E'Which food is digested by the enzyme pepsin?', E'["Starch","Fat","Protein","Vitamins"]', E'"Protein"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 5, NULL, NULL, NULL, '2026-11-01T20:12:36.312Z', '2026-11-01T20:12:36.312Z'),
(E'cmvy9o5so021ybogy65545yqa', E'cmvy9o5si021mbogylb5cyeal', E'cmvy9o5gp00u6bogyjtnogki3', E'SHORT_ANSWER', E'6', NULL, NULL, NULL, E'Where is bile stored?', NULL, E'"In the gall bladder"', E'["gall bladder","gallbladder"]', NULL, NULL, NULL, FALSE, FALSE, 2, 6, NULL, NULL, NULL, '2026-11-01T20:12:36.312Z', '2026-11-01T20:12:36.312Z'),
(E'cmvy9o5so0220bogyb755la7q', E'cmvy9o5si021mbogylb5cyeal', E'cmvy9o5gp00u6bogyjtnogki3', E'SHORT_ANSWER', E'7', NULL, NULL, NULL, E'Name the end product of the digestion of proteins.', NULL, E'"Amino acids"', E'["amino acid"]', NULL, NULL, NULL, FALSE, FALSE, 2, 7, NULL, NULL, NULL, '2026-11-01T20:12:36.313Z', '2026-11-01T20:12:36.313Z'),
(E'cmvy9o5sp0222bogypk9kq3wi', E'cmvy9o5si021mbogylb5cyeal', E'cmvy9o5gp00u6bogyjtnogki3', E'MULTIPLE_CHOICE', E'8', NULL, NULL, NULL, E'Most absorption of digested food takes place in the:', E'["stomach","large intestine","small intestine","mouth"]', E'"small intestine"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 8, NULL, NULL, NULL, '2026-11-01T20:12:36.313Z', '2026-11-01T20:12:36.313Z'),
(E'cmvy9o5sp0224bogylnfynuod', E'cmvy9o5si021mbogylb5cyeal', E'cmvy9o5gp00u6bogyjtnogki3', E'SHORT_ANSWER', E'9', NULL, NULL, NULL, E'What is absorbed in the large intestine?', NULL, E'"Water (and mineral salts)"', E'["water","water and mineral salts","water and salts"]', NULL, NULL, NULL, FALSE, FALSE, 2, 9, NULL, NULL, NULL, '2026-11-01T20:12:36.313Z', '2026-11-01T20:12:36.313Z'),
(E'cmvy9o5sp0226bogymuavj6es', E'cmvy9o5si021mbogylb5cyeal', E'cmvy9o5gp00u6bogyjtnogki3', E'SHORT_ANSWER', E'10', NULL, NULL, NULL, E'Name the finger-like structures in the small intestine that absorb digested food.', NULL, E'"Villi"', E'["villus"]', NULL, NULL, NULL, FALSE, FALSE, 2, 10, NULL, NULL, NULL, '2026-11-01T20:12:36.314Z', '2026-11-01T20:12:36.314Z'),
(E'cmvy9o5sq0228bogydgmzpgp2', E'cmvy9o5si021mbogylb5cyeal', E'cmvy9o5gp00u6bogyjtnogki3', E'SHORT_ANSWER', E'11', NULL, NULL, NULL, E'Give one way of preventing constipation.', NULL, E'"Eating food with roughage/fibre and drinking plenty of water."', E'["eating roughage","eat fibre","eating vegetables and fruits","drinking plenty of water","eating fibre"]', NULL, NULL, NULL, FALSE, FALSE, 2, 11, NULL, NULL, NULL, '2026-11-01T20:12:36.314Z', '2026-11-01T20:12:36.314Z'),
(E'cmvy9o5sq022abogyix7onddh', E'cmvy9o5si021mbogylb5cyeal', E'cmvy9o5gp00u6bogyjtnogki3', E'DRAWING', E'12', NULL, NULL, NULL, E'Draw and label the stomach and small intestine on a simple outline of the digestive system.', NULL, E'"Recognisable J-shaped stomach labelled (1) and coiled small intestine labelled (1)."', NULL, NULL, E'Recognisable J-shaped stomach labelled (1) and coiled small intestine labelled (1).', NULL, FALSE, FALSE, 2, 12, NULL, NULL, NULL, '2026-11-01T20:12:36.314Z', '2026-11-01T20:12:36.314Z'),
(E'cmvy9o5sr022ebogysdq7na2o', E'cmvy9o5sq022cbogyry2ylnz6', E'cmvy9o5gp00uabogy7jqoauw0', E'SHORT_ANSWER', E'1', NULL, NULL, NULL, E'Name the male part of a flower.', NULL, E'"Stamen"', E'["stamens","the stamen"]', NULL, NULL, NULL, FALSE, FALSE, 2, 1, NULL, NULL, NULL, '2026-11-01T20:12:36.315Z', '2026-11-01T20:12:36.315Z'),
(E'cmvy9o5sr022gbogyzwuqi7mz', E'cmvy9o5sq022cbogyry2ylnz6', E'cmvy9o5gp00uabogy7jqoauw0', E'SHORT_ANSWER', E'2', NULL, NULL, NULL, E'Name the female part of a flower.', NULL, E'"Pistil (carpel)"', E'["pistil","carpel"]', NULL, NULL, NULL, FALSE, FALSE, 2, 2, NULL, NULL, NULL, '2026-11-01T20:12:36.316Z', '2026-11-01T20:12:36.316Z'),
(E'cmvy9o5ss022ibogyf6gsejpb', E'cmvy9o5sq022cbogyry2ylnz6', E'cmvy9o5gp00uabogy7jqoauw0', E'FILL_BLANK', E'3', NULL, NULL, NULL, E'The transfer of pollen grains from the anther to the stigma is called ______.', NULL, E'"pollination"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 3, NULL, NULL, NULL, '2026-11-01T20:12:36.316Z', '2026-11-01T20:12:36.316Z'),
(E'cmvy9o5ss022kbogy9211t9kr', E'cmvy9o5sq022cbogyry2ylnz6', E'cmvy9o5gp00uabogy7jqoauw0', E'MULTIPLE_CHOICE', E'4', NULL, NULL, NULL, E'Which part of the flower produces pollen?', E'["Stigma","Anther","Ovary","Petal"]', E'"Anther"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 4, NULL, NULL, NULL, '2026-11-01T20:12:36.316Z', '2026-11-01T20:12:36.316Z'),
(E'cmvy9o5ss022mbogybnu1ah0q', E'cmvy9o5sq022cbogyry2ylnz6', E'cmvy9o5gp00uabogy7jqoauw0', E'SHORT_ANSWER', E'5', NULL, NULL, NULL, E'Give one agent of pollination.', NULL, E'"Insects"', E'["wind","insects","birds","water","bees","animals","butterflies"]', NULL, NULL, NULL, FALSE, FALSE, 2, 5, NULL, NULL, NULL, '2026-11-01T20:12:36.317Z', '2026-11-01T20:12:36.317Z'),
(E'cmvy9o5ss022obogyjbwus8el', E'cmvy9o5sq022cbogyry2ylnz6', E'cmvy9o5gp00uabogy7jqoauw0', E'SHORT_ANSWER', E'6', NULL, NULL, NULL, E'Why do flowers have brightly coloured petals?', NULL, E'"To attract insects for pollination."', E'["to attract insects","attract pollinators","to attract insects and birds"]', NULL, NULL, NULL, FALSE, FALSE, 2, 6, NULL, NULL, NULL, '2026-11-01T20:12:36.317Z', '2026-11-01T20:12:36.317Z'),
(E'cmvy9o5st022qbogyn1sipn93', E'cmvy9o5sq022cbogyry2ylnz6', E'cmvy9o5gp00uabogy7jqoauw0', E'SHORT_ANSWER', E'7', NULL, NULL, NULL, E'What does the ovary become after fertilisation?', NULL, E'"The fruit"', E'["fruit","a fruit"]', NULL, NULL, NULL, FALSE, FALSE, 2, 7, NULL, NULL, NULL, '2026-11-01T20:12:36.317Z', '2026-11-01T20:12:36.317Z'),
(E'cmvy9o5st022sbogy3jzqb4jf', E'cmvy9o5sq022cbogyry2ylnz6', E'cmvy9o5gp00uabogy7jqoauw0', E'SHORT_ANSWER', E'8', NULL, NULL, NULL, E'What does the ovule become after fertilisation?', NULL, E'"The seed"', E'["seed","a seed"]', NULL, NULL, NULL, FALSE, FALSE, 2, 8, NULL, NULL, NULL, '2026-11-01T20:12:36.318Z', '2026-11-01T20:12:36.318Z'),
(E'cmvy9o5st022ubogyyy26658y', E'cmvy9o5sq022cbogyry2ylnz6', E'cmvy9o5gp00uabogy7jqoauw0', E'MULTIPLE_CHOICE', E'9', NULL, NULL, NULL, E'Pollination within the same flower or the same plant is called:', E'["cross pollination","self pollination","wind pollination","insect pollination"]', E'"self pollination"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 9, NULL, NULL, NULL, '2026-11-01T20:12:36.318Z', '2026-11-01T20:12:36.318Z'),
(E'cmvy9o5su022wbogycbfngupl', E'cmvy9o5sq022cbogyry2ylnz6', E'cmvy9o5gp00uabogy7jqoauw0', E'SHORT_ANSWER', E'10', NULL, NULL, NULL, E'Give one difference between a wind-pollinated and an insect-pollinated flower.', NULL, E'"Wind-pollinated flowers are small, dull, have no scent or nectar and produce lots of light pollen; insect-pollinated flowers are large, bright, scented and have nectar."', E'["wind pollinated flowers are dull","insect pollinated flowers are brightly coloured","wind pollinated flowers have no scent","insect pollinated flowers have nectar","wind pollinated produce more pollen"]', NULL, NULL, NULL, FALSE, FALSE, 2, 10, NULL, NULL, NULL, '2026-11-01T20:12:36.319Z', '2026-11-01T20:12:36.319Z'),
(E'cmvy9o5sv022ybogy6x3jzyso', E'cmvy9o5sq022cbogyry2ylnz6', E'cmvy9o5gp00uabogy7jqoauw0', E'SHORT_ANSWER', E'11', NULL, NULL, NULL, E'Name the part of a flower that protects the flower when it is still a bud.', NULL, E'"Sepals (calyx)"', E'["sepal","sepals","calyx"]', NULL, NULL, NULL, FALSE, FALSE, 2, 11, NULL, NULL, NULL, '2026-11-01T20:12:36.319Z', '2026-11-01T20:12:36.319Z'),
(E'cmvy9o5ta024ubogy2ychq1vc', E'cmvy9o5t8024kbogy04d1nnhr', E'cmvy9o5hz00xcbogyz0m236zo', E'NUMERIC', E'5', NULL, NULL, NULL, E'Increase 36 in the ratio 7 : 4.', NULL, E'63', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 5, NULL, NULL, NULL, '2026-11-01T20:12:36.334Z', '2026-11-01T20:12:36.334Z'),
(E'cmvy9o5sy0234bogyvr05fm9t', E'cmvy9o5sw0232bogyl7nz4zml', E'cmvy9o5gt00uubogyq12u4kya', E'SHORT_ANSWER', E'1', NULL, NULL, NULL, E'Name the highest mountain in Uganda.', NULL, E'"Mount Rwenzori"', E'["Rwenzori","Mt Rwenzori","Rwenzori mountains"]', NULL, NULL, NULL, FALSE, FALSE, 2, 1, NULL, NULL, NULL, '2026-11-01T20:12:36.323Z', '2026-11-01T20:12:36.323Z'),
(E'cmvy9o5sz0236bogyoa6a65ti', E'cmvy9o5sw0232bogyl7nz4zml', E'cmvy9o5gt00uubogyq12u4kya', E'SHORT_ANSWER', E'2', NULL, NULL, NULL, E'Name the highest peak of Mount Rwenzori.', NULL, E'"Margherita"', E'["Margherita peak"]', NULL, NULL, NULL, FALSE, FALSE, 2, 2, NULL, NULL, NULL, '2026-11-01T20:12:36.323Z', '2026-11-01T20:12:36.323Z'),
(E'cmvy9o5t00238bogylzcxae4w', E'cmvy9o5sw0232bogyl7nz4zml', E'cmvy9o5gt00uubogyq12u4kya', E'MULTIPLE_CHOICE', E'3', NULL, NULL, NULL, E'Mount Elgon was formed by:', E'["faulting","folding","volcanic action","down-warping"]', E'"volcanic action"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 3, NULL, NULL, NULL, '2026-11-01T20:12:36.324Z', '2026-11-01T20:12:36.324Z'),
(E'cmvy9o5t0023abogyhamlqa7n', E'cmvy9o5sw0232bogyl7nz4zml', E'cmvy9o5gt00uubogyq12u4kya', E'MULTIPLE_CHOICE', E'4', NULL, NULL, NULL, E'Mount Rwenzori is an example of a:', E'["volcanic mountain","block mountain","fold mountain","residual mountain"]', E'"block mountain"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 4, NULL, NULL, NULL, '2026-11-01T20:12:36.324Z', '2026-11-01T20:12:36.324Z'),
(E'cmvy9o5t0023cbogy7r1bna0k', E'cmvy9o5sw0232bogyl7nz4zml', E'cmvy9o5gt00uubogyq12u4kya', E'SHORT_ANSWER', E'5', NULL, NULL, NULL, E'Name the largest lake in Africa.', NULL, E'"Lake Victoria"', E'["Victoria"]', NULL, NULL, NULL, FALSE, FALSE, 2, 5, NULL, NULL, NULL, '2026-11-01T20:12:36.325Z', '2026-11-01T20:12:36.325Z'),
(E'cmvy9o5t1023ebogyigsgzgaa', E'cmvy9o5sw0232bogyl7nz4zml', E'cmvy9o5gt00uubogyq12u4kya', E'SHORT_ANSWER', E'6', NULL, NULL, NULL, E'In which town does the River Nile start its journey from Lake Victoria?', NULL, E'"Jinja"', NULL, NULL, NULL, NULL, FALSE, FALSE, 2, 6, NULL, NULL, NULL, '2026-11-01T20:12:36.325Z', '2026-11-01T20:12:36.325Z'),
(E'cmvy9o5t1023gbogyfmu20wk8', E'cmvy9o5sw0232bogyl7nz4zml', E'cmvy9o5gt00uubogyq12u4kya', E'SHORT_ANSWER', E'7', NULL, NULL, NULL, E'Give one example of a Rift Valley lake in Uganda.', NULL, E'"Lake Albert"', E'["Albert","Lake Edward","Edward","Lake George","George"]', NULL, NULL, NULL, FALSE, FALSE, 2, 7, NULL, NULL, NULL, '2026-11-01T20:12:36.326Z', '2026-11-01T20:12:36.326Z'),
(E'cmvy9o5t1023ibogyryqrcpi7', E'cmvy9o5sw0232bogyl7nz4zml', E'cmvy9o5gt00uubogyq12u4kya', E'SHORT_ANSWER', E'8', NULL, NULL, NULL, E'How was Lake Bunyonyi formed?', NULL, E'"By lava blocking/damming a river valley."', E'["lava damming","lava blocked a river","lava dammed lake","lava blocking a river"]', NULL, NULL, NULL, FALSE, FALSE, 2, 8, NULL, NULL, NULL, '2026-11-01T20:12:36.326Z', '2026-11-01T20:12:36.326Z'),
(E'cmvy9o5t2023kbogyts3jnzxa', E'cmvy9o5sw0232bogyl7nz4zml', E'cmvy9o5gt00uubogyq12u4kya', E'SHORT_ANSWER', E'9', NULL, NULL, NULL, E'Name the longest river in Africa.', NULL, E'"River Nile"', E'["Nile","the Nile"]', NULL, NULL, NULL, FALSE, FALSE, 2, 9, NULL, NULL, NULL, '2026-11-01T20:12:36.326Z', '2026-11-01T20:12:36.326Z'),
(E'cmvy9o5t2023mbogy7mv1q273', E'cmvy9o5sw0232bogyl7nz4zml', E'cmvy9o5gt00uubogyq12u4kya', E'SHORT_ANSWER', E'10', NULL, NULL, NULL, E'Give one importance of mountains to the people of Uganda.', NULL, E'"Tourism / fertile soils for farming / rainfall / minerals."', E'["tourism","fertile soils","farming","rainfall","attract tourists","source of rivers","minerals","cool climate"]', NULL, NULL, NULL, FALSE, FALSE, 2, 10, NULL, NULL, NULL, '2026-11-01T20:12:36.327Z', '2026-11-01T20:12:36.327Z'),
(E'cmvy9o5t3023obogy52q7vbyk', E'cmvy9o5sw0232bogyl7nz4zml', E'cmvy9o5gt00uubogyq12u4kya', E'SHORT_ANSWER', E'11', NULL, NULL, NULL, E'Name the falls found on the Victoria Nile between Lake Kyoga and Lake Albert.', NULL, E'"Murchison Falls"', E'["Murchison","Kabalega Falls"]', NULL, NULL, NULL, FALSE, FALSE, 2, 11, NULL, NULL, NULL, '2026-11-01T20:12:36.327Z', '2026-11-01T20:12:36.327Z'),
(E'cmvy9o5t3023qbogy09y8qgak', E'cmvy9o5sw0232bogyl7nz4zml', E'cmvy9o5gt00uubogyq12u4kya', E'SHORT_ANSWER', E'12', NULL, NULL, NULL, E'Name the process that formed the Western Rift Valley.', NULL, E'"Faulting"', NULL, NULL, NULL, NULL, FALSE, FALSE, 2, 12, NULL, NULL, NULL, '2026-11-01T20:12:36.327Z', '2026-11-01T20:12:36.327Z'),
(E'cmvy9o5t4023ubogyfeh94kck', E'cmvy9o5t3023sbogykhisk8yc', E'cmvy9o5gv00v2bogyzupgq3e0', E'SHORT_ANSWER', E'1', NULL, NULL, NULL, E'Who was the first Kabaka of Buganda?', NULL, E'"Kintu"', E'["Kabaka Kintu"]', NULL, NULL, NULL, FALSE, FALSE, 2, 1, NULL, NULL, NULL, '2026-11-01T20:12:36.328Z', '2026-11-01T20:12:36.328Z'),
(E'cmvy9o5t4023wbogyz315bjoq', E'cmvy9o5t3023sbogykhisk8yc', E'cmvy9o5gv00v2bogyzupgq3e0', E'SHORT_ANSWER', E'2', NULL, NULL, NULL, E'Name the title of the king of Bunyoro-Kitara.', NULL, E'"Omukama"', NULL, NULL, NULL, NULL, FALSE, FALSE, 2, 2, NULL, NULL, NULL, '2026-11-01T20:12:36.329Z', '2026-11-01T20:12:36.329Z'),
(E'cmvy9o5t5023ybogybzny8x0c', E'cmvy9o5t3023sbogykhisk8yc', E'cmvy9o5gv00v2bogyzupgq3e0', E'SHORT_ANSWER', E'3', NULL, NULL, NULL, E'Name the title of the king of Tooro.', NULL, E'"Omukama"', E'["Omukama of Tooro"]', NULL, NULL, NULL, FALSE, FALSE, 2, 3, NULL, NULL, NULL, '2026-11-01T20:12:36.329Z', '2026-11-01T20:12:36.329Z'),
(E'cmvy9o5t50240bogyvf8yx61z', E'cmvy9o5t3023sbogykhisk8yc', E'cmvy9o5gv00v2bogyzupgq3e0', E'MULTIPLE_CHOICE', E'4', NULL, NULL, NULL, E'The Omugabe was the title of the king of:', E'["Buganda","Bunyoro","Ankole","Busoga"]', E'"Ankole"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 4, NULL, NULL, NULL, '2026-11-01T20:12:36.329Z', '2026-11-01T20:12:36.329Z'),
(E'cmvy9o5t50242bogydgfn7lnt', E'cmvy9o5t3023sbogykhisk8yc', E'cmvy9o5gv00v2bogyzupgq3e0', E'SHORT_ANSWER', E'5', NULL, NULL, NULL, E'Name the title of the cultural leader of Busoga.', NULL, E'"Kyabazinga"', E'["Isebantu Kyabazinga"]', NULL, NULL, NULL, FALSE, FALSE, 2, 5, NULL, NULL, NULL, '2026-11-01T20:12:36.330Z', '2026-11-01T20:12:36.330Z'),
(E'cmvy9o5t60244bogytlo5ng72', E'cmvy9o5t3023sbogykhisk8yc', E'cmvy9o5gv00v2bogyzupgq3e0', E'SHORT_ANSWER', E'6', NULL, NULL, NULL, E'Who founded the Tooro Kingdom after breaking away from Bunyoro?', NULL, E'"Prince Kaboyo"', E'["Kaboyo","Olimi Kaboyo"]', NULL, NULL, NULL, FALSE, FALSE, 2, 6, NULL, NULL, NULL, '2026-11-01T20:12:36.330Z', '2026-11-01T20:12:36.330Z'),
(E'cmvy9o5t60246bogy0s91v2so', E'cmvy9o5t3023sbogykhisk8yc', E'cmvy9o5gv00v2bogyzupgq3e0', E'SHORT_ANSWER', E'7', NULL, NULL, NULL, E'Name the Omukama of Bunyoro who resisted the British.', NULL, E'"Kabalega"', E'["Omukama Kabalega","Chwa II Kabalega"]', NULL, NULL, NULL, FALSE, FALSE, 2, 7, NULL, NULL, NULL, '2026-11-01T20:12:36.330Z', '2026-11-01T20:12:36.330Z'),
(E'cmvy9o5t60248bogy957un220', E'cmvy9o5t3023sbogykhisk8yc', E'cmvy9o5gv00v2bogyzupgq3e0', E'SHORT_ANSWER', E'8', NULL, NULL, NULL, E'Give one reason why Buganda became powerful before the coming of Europeans.', NULL, E'"Strong central government under the Kabaka / fertile soils / strong army / trade with Arabs."', E'["strong leadership","centralised government","fertile soils","strong army","trade","good climate","unity","trade with Arabs"]', NULL, NULL, NULL, FALSE, FALSE, 2, 8, NULL, NULL, NULL, '2026-11-01T20:12:36.331Z', '2026-11-01T20:12:36.331Z'),
(E'cmvy9o5t6024abogyiw6biz1q', E'cmvy9o5t3023sbogykhisk8yc', E'cmvy9o5gv00v2bogyzupgq3e0', E'MULTIPLE_CHOICE', E'9', NULL, NULL, NULL, E'Which Kabaka welcomed H.M. Stanley and invited missionaries?', E'["Mwanga","Muteesa I","Suuna","Daudi Chwa"]', E'"Muteesa I"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 9, NULL, NULL, NULL, '2026-11-01T20:12:36.331Z', '2026-11-01T20:12:36.331Z'),
(E'cmvy9o5t7024cbogy1ipt54xx', E'cmvy9o5t3023sbogykhisk8yc', E'cmvy9o5gv00v2bogyzupgq3e0', E'SHORT_ANSWER', E'10', NULL, NULL, NULL, E'Name the clan system head in Buganda who sits on the Lukiiko.', NULL, E'"Katikkiro (Prime Minister)"', E'["Katikkiro","Katikiro"]', NULL, NULL, NULL, FALSE, FALSE, 2, 10, NULL, NULL, NULL, '2026-11-01T20:12:36.331Z', '2026-11-01T20:12:36.331Z'),
(E'cmvy9o5t7024ebogyeldanza5', E'cmvy9o5t3023sbogykhisk8yc', E'cmvy9o5gv00v2bogyzupgq3e0', E'SHORT_ANSWER', E'11', NULL, NULL, NULL, E'Which pre-colonial people in northern Uganda had chiefdoms led by Rwot?', NULL, E'"The Acholi"', E'["Acholi"]', NULL, NULL, NULL, FALSE, FALSE, 2, 11, NULL, NULL, NULL, '2026-11-01T20:12:36.331Z', '2026-11-01T20:12:36.331Z'),
(E'cmvy9o5t7024gbogycss0w6p9', E'cmvy9o5t3023sbogykhisk8yc', E'cmvy9o5gv00v2bogyzupgq3e0', E'LONG_ANSWER', E'12', NULL, NULL, NULL, E'Explain two ways in which the pre-colonial kingdoms of Uganda were governed.', NULL, E'"Any two: hereditary king (Kabaka/Omukama) with absolute power; council of chiefs/Lukiiko advised the king; county (saza) and sub-county (gombolola) chiefs appointed by the king collected tribute; clan heads handled clan matters. 2 marks each."', NULL, NULL, E'Any two: hereditary king (Kabaka/Omukama) with absolute power; council of chiefs/Lukiiko advised the king; county (saza) and sub-county (gombolola) chiefs appointed by the king collected tribute; clan heads handled clan matters. 2 marks each.', NULL, FALSE, FALSE, 4, 12, NULL, NULL, NULL, '2026-11-01T20:12:36.332Z', '2026-11-01T20:12:36.332Z'),
(E'cmvy9o5t9024mbogy1b296rhe', E'cmvy9o5t8024kbogy04d1nnhr', E'cmvy9o5hz00xcbogyz0m236zo', E'FILL_BLANK', E'1', NULL, NULL, NULL, E'Simplify the ratio 24 : 36.', NULL, E'"2:3"', E'["2 : 3"]', NULL, NULL, NULL, FALSE, FALSE, 1, 1, NULL, NULL, NULL, '2026-11-01T20:12:36.333Z', '2026-11-01T20:12:36.333Z')
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "Question" ("id", "paperId", "topicId", "type", "displayNumber", "section", "stimulus", "imageUrl", "prompt", "options", "correctAnswer", "acceptedAnswers", "explanation", "markingGuide", "numericTolerance", "caseSensitive", "requiresTeacher", "points", "order", "parentId", "unit", "partialRule", "createdAt", "updatedAt") VALUES
(E'cmvy9o5t9024obogyioyv7q53', E'cmvy9o5t8024kbogy04d1nnhr', E'cmvy9o5hz00xcbogyz0m236zo', E'FILL_BLANK', E'2', NULL, NULL, NULL, E'Express 75 cm : 3 m as a ratio in its simplest form.', NULL, E'"1:4"', E'["1 : 4"]', NULL, NULL, NULL, FALSE, FALSE, 1, 2, NULL, NULL, NULL, '2026-11-01T20:12:36.333Z', '2026-11-01T20:12:36.333Z'),
(E'cmvy9o5t9024qbogy9jgvhl86', E'cmvy9o5t8024kbogy04d1nnhr', E'cmvy9o5hz00xcbogyz0m236zo', E'NUMERIC', E'3', NULL, NULL, NULL, E'Share UGX 45,000 between Jane and Mary in the ratio 2 : 3. How much does Mary get (UGX)?', NULL, E'27000', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 3, NULL, NULL, NULL, '2026-11-01T20:12:36.334Z', '2026-11-01T20:12:36.334Z'),
(E'cmvy9o5ta024sbogyh9b6yjk4', E'cmvy9o5t8024kbogy04d1nnhr', E'cmvy9o5hz00xcbogyz0m236zo', E'NUMERIC', E'4', NULL, NULL, NULL, E'The ratio of boys to girls in a class is 4 : 5. If there are 20 boys, how many girls are there?', NULL, E'25', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 4, NULL, NULL, NULL, '2026-11-01T20:12:36.334Z', '2026-11-01T20:12:36.334Z'),
(E'cmvy9o5ta024wbogyghgafbzz', E'cmvy9o5t8024kbogy04d1nnhr', E'cmvy9o5hz00xcbogyz0m236zo', E'NUMERIC', E'6', NULL, NULL, NULL, E'Decrease 90 in the ratio 3 : 5.', NULL, E'54', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 6, NULL, NULL, NULL, '2026-11-01T20:12:36.335Z', '2026-11-01T20:12:36.335Z'),
(E'cmvy9o5tb024ybogyww67mcty', E'cmvy9o5t8024kbogy04d1nnhr', E'cmvy9o5hz00xcbogyz0m236zo', E'NUMERIC', E'7', NULL, NULL, NULL, E'3 pens cost UGX 2,400. Find the cost of 7 pens (UGX).', NULL, E'5600', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 7, NULL, NULL, NULL, '2026-11-01T20:12:36.335Z', '2026-11-01T20:12:36.335Z'),
(E'cmvy9o5tb0250bogym2rcre7y', E'cmvy9o5t8024kbogy04d1nnhr', E'cmvy9o5hz00xcbogyz0m236zo', E'NUMERIC', E'8', NULL, NULL, NULL, E'8 workers can build a wall in 12 days. How many days will 6 workers take?', NULL, E'16', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 8, NULL, NULL, NULL, '2026-11-01T20:12:36.335Z', '2026-11-01T20:12:36.335Z'),
(E'cmvy9o5tb0252bogyny823v2l', E'cmvy9o5t8024kbogy04d1nnhr', E'cmvy9o5hz00xcbogyz0m236zo', E'NUMERIC', E'9', NULL, NULL, NULL, E'A map has a scale of 1 : 100,000. A river is 7 cm long on the map. Find its actual length in km.', NULL, E'7', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 9, NULL, NULL, NULL, '2026-11-01T20:12:36.336Z', '2026-11-01T20:12:36.336Z'),
(E'cmvy9o5tc0254bogyvqlngdwy', E'cmvy9o5t8024kbogy04d1nnhr', E'cmvy9o5hz00xcbogyz0m236zo', E'NUMERIC', E'10', NULL, NULL, NULL, E'A car uses 6 litres of fuel for 90 km. How far can it travel on 10 litres (km)?', NULL, E'150', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 10, NULL, NULL, NULL, '2026-11-01T20:12:36.336Z', '2026-11-01T20:12:36.336Z'),
(E'cmvy9o5tc0256bogy95np27t5', E'cmvy9o5t8024kbogy04d1nnhr', E'cmvy9o5hz00xcbogyz0m236zo', E'LONG_ANSWER', E'11', NULL, NULL, NULL, E'Musa, Amos and Joy shared UGX 120,000 in the ratio 2 : 3 : 5. How much more did Joy get than Musa?', NULL, E'"Total parts 10; one part 12,000. Joy 60,000; Musa 24,000; difference UGX 36,000. Marks: total parts (1), one part (1), shares (1), difference (1)."', NULL, NULL, E'Total parts 10; one part 12,000. Joy 60,000; Musa 24,000; difference UGX 36,000. Marks: total parts (1), one part (1), shares (1), difference (1).', NULL, FALSE, FALSE, 4, 11, NULL, NULL, NULL, '2026-11-01T20:12:36.336Z', '2026-11-01T20:12:36.336Z'),
(E'cmvy9o5tk025cbogy3z813h6c', E'cmvy9o5td025abogyts9e0syf', E'cmvy9o5i000xgbogyo2hgc2vq', E'NUMERIC', E'1', NULL, NULL, NULL, E'Find the mean of 12, 15, 9, 20 and 14.', NULL, E'14', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 1, NULL, NULL, NULL, '2026-11-01T20:12:36.345Z', '2026-11-01T20:12:36.345Z'),
(E'cmvy9o5tl025ebogyn80n5voi', E'cmvy9o5td025abogyts9e0syf', E'cmvy9o5i000xgbogyo2hgc2vq', E'NUMERIC', E'2', NULL, NULL, NULL, E'Find the median of 7, 3, 9, 12, 5.', NULL, E'7', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 2, NULL, NULL, NULL, '2026-11-01T20:12:36.345Z', '2026-11-01T20:12:36.345Z'),
(E'cmvy9o5tl025gbogyevjgadwu', E'cmvy9o5td025abogyts9e0syf', E'cmvy9o5i000xgbogyo2hgc2vq', E'NUMERIC', E'3', NULL, NULL, NULL, E'Find the mode of 2, 5, 3, 5, 7, 5, 2.', NULL, E'5', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 3, NULL, NULL, NULL, '2026-11-01T20:12:36.346Z', '2026-11-01T20:12:36.346Z'),
(E'cmvy9o5tm025ibogyo6rbx6hh', E'cmvy9o5td025abogyts9e0syf', E'cmvy9o5i000xgbogyo2hgc2vq', E'NUMERIC', E'4', NULL, NULL, NULL, E'Find the range of 23, 17, 31, 12, 28.', NULL, E'19', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 4, NULL, NULL, NULL, '2026-11-01T20:12:36.346Z', '2026-11-01T20:12:36.346Z'),
(E'cmvy9o5tm025kbogydytd19b1', E'cmvy9o5td025abogyts9e0syf', E'cmvy9o5i000xgbogyo2hgc2vq', E'NUMERIC', E'5', NULL, NULL, NULL, E'The mean of 4 numbers is 15. Three of the numbers are 12, 18 and 10. Find the fourth number.', NULL, E'20', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 5, NULL, NULL, NULL, '2026-11-01T20:12:36.346Z', '2026-11-01T20:12:36.346Z'),
(E'cmvy9o5tm025mbogy13u7ofjh', E'cmvy9o5td025abogyts9e0syf', E'cmvy9o5i000xgbogyo2hgc2vq', E'NUMERIC', E'6', NULL, NULL, NULL, E'Find the median of 4, 8, 10, 14 (even number of values).', NULL, E'9', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 6, NULL, NULL, NULL, '2026-11-01T20:12:36.347Z', '2026-11-01T20:12:36.347Z'),
(E'cmvy9o5tn025obogyoqqgjovw', E'cmvy9o5td025abogyts9e0syf', E'cmvy9o5i000xgbogyo2hgc2vq', E'NUMERIC', E'7', NULL, NULL, NULL, E'In a pie chart showing how 90 pupils travel to school, 30 pupils walk. What angle represents those who walk (degrees)?', NULL, E'120', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 7, NULL, NULL, NULL, '2026-11-01T20:12:36.347Z', '2026-11-01T20:12:36.347Z'),
(E'cmvy9o5tn025qbogyhdp29sj8', E'cmvy9o5td025abogyts9e0syf', E'cmvy9o5i000xgbogyo2hgc2vq', E'NUMERIC', E'8', NULL, NULL, NULL, E'A pie chart has a sector of 60° representing pupils who like maize out of a total of 72 pupils. How many pupils like maize?', NULL, E'12', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 8, NULL, NULL, NULL, '2026-11-01T20:12:36.347Z', '2026-11-01T20:12:36.347Z'),
(E'cmvy9o5tn025sbogygozyogt3', E'cmvy9o5td025abogyts9e0syf', E'cmvy9o5i000xgbogyo2hgc2vq', E'NUMERIC', E'9', NULL, NULL, NULL, E'A bag contains 4 green and 6 yellow balls. What is the probability of picking a green ball? (Enter as a decimal.)', NULL, E'0.4', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 9, NULL, NULL, NULL, '2026-11-01T20:12:36.348Z', '2026-11-01T20:12:36.348Z'),
(E'cmvy9o5to025ubogy94a57vid', E'cmvy9o5td025abogyts9e0syf', E'cmvy9o5i000xgbogyo2hgc2vq', E'MULTIPLE_CHOICE', E'10', NULL, NULL, NULL, E'Which graph is best for showing how temperature changes during a day?', E'["Bar graph","Pie chart","Line graph","Pictograph"]', E'"Line graph"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 10, NULL, NULL, NULL, '2026-11-01T20:12:36.348Z', '2026-11-01T20:12:36.348Z'),
(E'cmvy9o5to025wbogytor2fxah', E'cmvy9o5td025abogyts9e0syf', E'cmvy9o5i000xgbogyo2hgc2vq', E'LONG_ANSWER', E'11', NULL, NULL, NULL, E'The marks of 10 pupils were: 45, 60, 55, 70, 60, 80, 65, 60, 50, 75. Find (a) the mode, (b) the median, (c) the mean.', NULL, E'"Mode = 60. Ordered: 45,50,55,60,60,60,65,70,75,80 → median = (60+60)/2 = 60. Mean = 620/10 = 62. 1 mark mode, 2 marks median (ordering + value), 1 mark mean."', NULL, NULL, E'Mode = 60. Ordered: 45,50,55,60,60,60,65,70,75,80 → median = (60+60)/2 = 60. Mean = 620/10 = 62. 1 mark mode, 2 marks median (ordering + value), 1 mark mean.', NULL, FALSE, FALSE, 4, 11, NULL, NULL, NULL, '2026-11-01T20:12:36.349Z', '2026-11-01T20:12:36.349Z'),
(E'cmvy9o5tp0260bogy1mvvjz2n', E'cmvy9o5tp025ybogy2usmfu3b', E'cmvy9o5i300y4bogyj3c6rwzv', E'SHORT_ANSWER', E'1', NULL, NULL, NULL, E'Change to indirect speech: "I am hungry," said Tom.', NULL, E'"Tom said that he was hungry."', E'["Tom said he was hungry"]', NULL, NULL, NULL, FALSE, FALSE, 2, 1, NULL, NULL, NULL, '2026-11-01T20:12:36.350Z', '2026-11-01T20:12:36.350Z'),
(E'cmvy9o5tq0262bogywmeojc3x', E'cmvy9o5tp025ybogy2usmfu3b', E'cmvy9o5i300y4bogyj3c6rwzv', E'SHORT_ANSWER', E'2', NULL, NULL, NULL, E'Change to indirect speech: "We will visit you next week," they said.', NULL, E'"They said that they would visit us the following week."', E'["They said they would visit us the following week","They said that they would visit us the next week"]', NULL, NULL, NULL, FALSE, FALSE, 2, 2, NULL, NULL, NULL, '2026-11-01T20:12:36.350Z', '2026-11-01T20:12:36.350Z'),
(E'cmvy9o5tq0264bogyel5jrv29', E'cmvy9o5tp025ybogy2usmfu3b', E'cmvy9o5i300y4bogyj3c6rwzv', E'SHORT_ANSWER', E'3', NULL, NULL, NULL, E'Change to indirect speech: "Do you like mangoes?" she asked me.', NULL, E'"She asked me if I liked mangoes."', E'["She asked me whether I liked mangoes","She asked if I liked mangoes"]', NULL, NULL, NULL, FALSE, FALSE, 2, 3, NULL, NULL, NULL, '2026-11-01T20:12:36.351Z', '2026-11-01T20:12:36.351Z'),
(E'cmvy9o5tr0266bogy7ob0kjby', E'cmvy9o5tp025ybogy2usmfu3b', E'cmvy9o5i300y4bogyj3c6rwzv', E'SHORT_ANSWER', E'4', NULL, NULL, NULL, E'Change to indirect speech: "Close the door," the teacher told Peter.', NULL, E'"The teacher told Peter to close the door."', E'["The teacher told Peter to close the door"]', NULL, NULL, NULL, FALSE, FALSE, 2, 4, NULL, NULL, NULL, '2026-11-01T20:12:36.351Z', '2026-11-01T20:12:36.351Z'),
(E'cmvy9o5tr0268bogy9r9s124m', E'cmvy9o5tp025ybogy2usmfu3b', E'cmvy9o5i300y4bogyj3c6rwzv', E'SHORT_ANSWER', E'5', NULL, NULL, NULL, E'Change to indirect speech: "I have finished my work," Jane said.', NULL, E'"Jane said that she had finished her work."', E'["Jane said she had finished her work"]', NULL, NULL, NULL, FALSE, FALSE, 2, 5, NULL, NULL, NULL, '2026-11-01T20:12:36.351Z', '2026-11-01T20:12:36.351Z'),
(E'cmvy9o5tr026abogyzw8hwafm', E'cmvy9o5tp025ybogy2usmfu3b', E'cmvy9o5i300y4bogyj3c6rwzv', E'MULTIPLE_CHOICE', E'6', NULL, NULL, NULL, E'"Where are you going?" Mother asked. → Mother asked ______.', E'["where I was going","where was I going","where am I going","where I am going"]', E'"where I was going"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 6, NULL, NULL, NULL, '2026-11-01T20:12:36.352Z', '2026-11-01T20:12:36.352Z'),
(E'cmvy9o5ts026cbogycvn8bwh3', E'cmvy9o5tp025ybogy2usmfu3b', E'cmvy9o5i300y4bogyj3c6rwzv', E'SHORT_ANSWER', E'7', NULL, NULL, NULL, E'Change to direct speech: He said that he was reading a book.', NULL, E'"He said, \\"I am reading a book.\\""', E'["\\"I am reading a book,\\" he said.","He said, \\"I am reading a book\\""]', NULL, NULL, NULL, FALSE, FALSE, 2, 7, NULL, NULL, NULL, '2026-11-01T20:12:36.352Z', '2026-11-01T20:12:36.352Z'),
(E'cmvy9o5ts026ebogyna29q52r', E'cmvy9o5tp025ybogy2usmfu3b', E'cmvy9o5i300y4bogyj3c6rwzv', E'SHORT_ANSWER', E'8', NULL, NULL, NULL, E'Change to indirect speech: "Don''t run in the corridor," the prefect told us.', NULL, E'"The prefect told us not to run in the corridor."', E'["The prefect told us not to run in the corridor"]', NULL, NULL, NULL, FALSE, FALSE, 2, 8, NULL, NULL, NULL, '2026-11-01T20:12:36.353Z', '2026-11-01T20:12:36.353Z'),
(E'cmvy9o5tx026kbogybvoqatd1', E'cmvy9o5tt026ibogyme5ft7v0', E'cmvy9o5i400yabogylmtguphr', E'MULTIPLE_CHOICE', E'1', NULL, NULL, NULL, E'Which tense is mostly used when writing a story about something that happened last holiday?', E'["Present tense","Past tense","Future tense","Present continuous"]', E'"Past tense"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 1, NULL, NULL, NULL, '2026-11-01T20:12:36.357Z', '2026-11-01T20:12:36.357Z'),
(E'cmvy9o5tx026mbogyk65dm2em', E'cmvy9o5tt026ibogyme5ft7v0', E'cmvy9o5i400yabogylmtguphr', E'SHORT_ANSWER', E'2', NULL, NULL, NULL, E'What should the introduction of a story tell the reader?', NULL, E'"Who, where and when — it sets the scene."', E'["who where when","sets the scene","the setting","who, where and when"]', NULL, NULL, NULL, FALSE, FALSE, 2, 2, NULL, NULL, NULL, '2026-11-01T20:12:36.358Z', '2026-11-01T20:12:36.358Z'),
(E'cmvy9o5ty026obogy152zfhxi', E'cmvy9o5tt026ibogyme5ft7v0', E'cmvy9o5i400yabogylmtguphr', E'MULTIPLE_CHOICE', E'3', NULL, NULL, NULL, E'Which of these is a linking word?', E'["Banana","Suddenly","Kampala","Quickly ran"]', E'"Suddenly"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 3, NULL, NULL, NULL, '2026-11-01T20:12:36.359Z', '2026-11-01T20:12:36.359Z'),
(E'cmvy9o5tz026qbogy6egmi3fa', E'cmvy9o5tt026ibogyme5ft7v0', E'cmvy9o5i400yabogylmtguphr', E'SHORT_ANSWER', E'4', NULL, NULL, NULL, E'Punctuate correctly: run shouted opio', NULL, E'"\\"Run!\\" shouted Opio."', E'["\\"Run!\\" shouted Opio"]', NULL, NULL, NULL, FALSE, FALSE, 2, 4, NULL, NULL, NULL, '2026-11-01T20:12:36.359Z', '2026-11-01T20:12:36.359Z'),
(E'cmvy9o5tz026sbogydh4ouo98', E'cmvy9o5tt026ibogyme5ft7v0', E'cmvy9o5i400yabogylmtguphr', E'MULTIPLE_CHOICE', E'5', NULL, NULL, NULL, E'Which sentence uses a simile?', E'["The night was dark.","The night was as dark as coal.","The dark night came.","It was night."]', E'"The night was as dark as coal."', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 5, NULL, NULL, NULL, '2026-11-01T20:12:36.359Z', '2026-11-01T20:12:36.359Z'),
(E'cmvy9o5tz026ubogy9351hj9q', E'cmvy9o5tt026ibogyme5ft7v0', E'cmvy9o5i400yabogylmtguphr', E'LONG_ANSWER', E'6', NULL, NULL, NULL, E'Write a composition of about 150 words entitled: ''The day I will never forget''.', NULL, E'"Marks: relevance to title (2), introduction with setting (1), body with 2–3 paragraphs and clear sequence (3), conclusion with lesson/feelings (1), grammar and tense consistency (2), spelling and punctuation (1)."', NULL, NULL, E'Marks: relevance to title (2), introduction with setting (1), body with 2–3 paragraphs and clear sequence (3), conclusion with lesson/feelings (1), grammar and tense consistency (2), spelling and punctuation (1).', NULL, FALSE, FALSE, 10, 6, NULL, NULL, NULL, '2026-11-01T20:12:36.360Z', '2026-11-01T20:12:36.360Z'),
(E'cmvy9o5u20270bogyq8q4cts8', E'cmvy9o5u1026ybogy4liwwjq5', E'cmvy9o5i600ykbogyazece0in', E'MULTIPLE_CHOICE', E'1', NULL, NULL, NULL, E'Which group of animals has feathers?', E'["Mammals","Reptiles","Birds","Amphibians"]', E'"Birds"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 1, NULL, NULL, NULL, '2026-11-01T20:12:36.362Z', '2026-11-01T20:12:36.362Z'),
(E'cmvy9o5u20272bogy7tc1arha', E'cmvy9o5u1026ybogy4liwwjq5', E'cmvy9o5i600ykbogyazece0in', E'MULTIPLE_CHOICE', E'2', NULL, NULL, NULL, E'A frog belongs to which group?', E'["Reptiles","Amphibians","Fish","Mammals"]', E'"Amphibians"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 2, NULL, NULL, NULL, '2026-11-01T20:12:36.363Z', '2026-11-01T20:12:36.363Z'),
(E'cmvy9o5u30274bogyaqsr5wpc', E'cmvy9o5u1026ybogy4liwwjq5', E'cmvy9o5i600ykbogyazece0in', E'SHORT_ANSWER', E'3', NULL, NULL, NULL, E'How many legs does an insect have?', NULL, E'"Six"', E'["6","six legs"]', NULL, NULL, NULL, FALSE, FALSE, 2, 3, NULL, NULL, NULL, '2026-11-01T20:12:36.363Z', '2026-11-01T20:12:36.363Z'),
(E'cmvy9o5u30276bogyl3uxo2mm', E'cmvy9o5u1026ybogy4liwwjq5', E'cmvy9o5i600ykbogyazece0in', E'MULTIPLE_CHOICE', E'4', NULL, NULL, NULL, E'Which of these is a mammal?', E'["Crocodile","Bat","Tilapia","Ostrich"]', E'"Bat"', NULL, E'Bats have fur, give birth and suckle their young.', NULL, NULL, FALSE, FALSE, 1, 4, NULL, NULL, NULL, '2026-11-01T20:12:36.363Z', '2026-11-01T20:12:36.363Z'),
(E'cmvy9o5u30278bogyolqkhotv', E'cmvy9o5u1026ybogy4liwwjq5', E'cmvy9o5i600ykbogyazece0in', E'SHORT_ANSWER', E'5', NULL, NULL, NULL, E'Name the three body parts of an insect.', NULL, E'"Head, thorax and abdomen"', E'["head thorax abdomen","head, thorax, abdomen"]', NULL, NULL, NULL, FALSE, FALSE, 2, 5, NULL, NULL, NULL, '2026-11-01T20:12:36.364Z', '2026-11-01T20:12:36.364Z'),
(E'cmvy9o5u4027abogy7j5adcum', E'cmvy9o5u1026ybogy4liwwjq5', E'cmvy9o5i600ykbogyazece0in', E'MULTIPLE_CHOICE', E'6', NULL, NULL, NULL, E'Which plant is a monocotyledon?', E'["Bean","Mango","Maize","Groundnut"]', E'"Maize"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 6, NULL, NULL, NULL, '2026-11-01T20:12:36.364Z', '2026-11-01T20:12:36.364Z'),
(E'cmvy9o5u4027cbogy35m39fad', E'cmvy9o5u1026ybogy4liwwjq5', E'cmvy9o5i600ykbogyazece0in', E'SHORT_ANSWER', E'7', NULL, NULL, NULL, E'Give one characteristic of dicotyledonous plants.', NULL, E'"Two seed leaves / network veins / tap root."', E'["two cotyledons","two seed leaves","network veins","tap root","net veined leaves"]', NULL, NULL, NULL, FALSE, FALSE, 2, 7, NULL, NULL, NULL, '2026-11-01T20:12:36.364Z', '2026-11-01T20:12:36.364Z'),
(E'cmvy9o5u4027ebogyw1n9kyy8', E'cmvy9o5u1026ybogy4liwwjq5', E'cmvy9o5i600ykbogyazece0in', E'SHORT_ANSWER', E'8', NULL, NULL, NULL, E'How do ferns reproduce?', NULL, E'"By spores"', E'["spores"]', NULL, NULL, NULL, FALSE, FALSE, 2, 8, NULL, NULL, NULL, '2026-11-01T20:12:36.365Z', '2026-11-01T20:12:36.365Z'),
(E'cmvy9o5u5027gbogy9xytw86s', E'cmvy9o5u1026ybogy4liwwjq5', E'cmvy9o5i600ykbogyazece0in', E'SHORT_ANSWER', E'9', NULL, NULL, NULL, E'Give one reason why a spider is not an insect.', NULL, E'"It has eight legs (insects have six) / it has two body parts."', E'["it has 8 legs","eight legs","two body parts","it has no antennae","it has no wings"]', NULL, NULL, NULL, FALSE, FALSE, 2, 9, NULL, NULL, NULL, '2026-11-01T20:12:36.365Z', '2026-11-01T20:12:36.365Z'),
(E'cmvy9o5u5027ibogyrxh0m6o1', E'cmvy9o5u1026ybogy4liwwjq5', E'cmvy9o5i600ykbogyazece0in', E'FILL_BLANK', E'10', NULL, NULL, NULL, E'Animals with a backbone are called ______.', NULL, E'"vertebrates"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 10, NULL, NULL, NULL, '2026-11-01T20:12:36.366Z', '2026-11-01T20:12:36.366Z'),
(E'cmvy9o5u5027kbogyrwf6cw0g', E'cmvy9o5u1026ybogy4liwwjq5', E'cmvy9o5i600ykbogyazece0in', E'SHORT_ANSWER', E'11', NULL, NULL, NULL, E'Why are fungi not regarded as true plants?', NULL, E'"They have no chlorophyll so cannot make their own food."', E'["they lack chlorophyll","no chlorophyll","they do not make their own food","cannot photosynthesise"]', NULL, NULL, NULL, FALSE, FALSE, 2, 11, NULL, NULL, NULL, '2026-11-01T20:12:36.366Z', '2026-11-01T20:12:36.366Z'),
(E'cmvy9o5u6027mbogyuoxx7mm9', E'cmvy9o5u1026ybogy4liwwjq5', E'cmvy9o5i600ykbogyazece0in', E'SHORT_ANSWER', E'12', NULL, NULL, NULL, E'Write what the letter ''R'' stands for in MRS GREN (give one).', NULL, E'"Respiration (or Reproduction)"', E'["respiration","reproduction"]', NULL, NULL, NULL, FALSE, FALSE, 2, 12, NULL, NULL, NULL, '2026-11-01T20:12:36.366Z', '2026-11-01T20:12:36.366Z'),
(E'cmvy9o5u7027qbogyq74f2r7t', E'cmvy9o5u6027obogysjapto9c', E'cmvy9o5i600ymbogyxelu21bf', E'NUMERIC', E'1', NULL, NULL, NULL, E'How many chambers does the human heart have?', NULL, E'4', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 1, NULL, NULL, NULL, '2026-11-01T20:12:36.367Z', '2026-11-01T20:12:36.367Z'),
(E'cmvy9o5u7027sbogy7fd3btkf', E'cmvy9o5u6027obogysjapto9c', E'cmvy9o5i600ymbogyxelu21bf', E'SHORT_ANSWER', E'2', NULL, NULL, NULL, E'Name the liquid part of blood.', NULL, E'"Plasma"', NULL, NULL, NULL, NULL, FALSE, FALSE, 2, 2, NULL, NULL, NULL, '2026-11-01T20:12:36.368Z', '2026-11-01T20:12:36.368Z'),
(E'cmvy9o5u8027ubogy6umd7qy1', E'cmvy9o5u6027obogysjapto9c', E'cmvy9o5i600ymbogyxelu21bf', E'MULTIPLE_CHOICE', E'3', NULL, NULL, NULL, E'Which blood cells help in clotting?', E'["Red blood cells","White blood cells","Platelets","Plasma"]', E'"Platelets"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 3, NULL, NULL, NULL, '2026-11-01T20:12:36.368Z', '2026-11-01T20:12:36.368Z'),
(E'cmvy9o5u8027wbogynaf9rhnt', E'cmvy9o5u6027obogysjapto9c', E'cmvy9o5i600ymbogyxelu21bf', E'SHORT_ANSWER', E'4', NULL, NULL, NULL, E'Name the blood vessels that carry blood back to the heart.', NULL, E'"Veins"', E'["vein"]', NULL, NULL, NULL, FALSE, FALSE, 2, 4, NULL, NULL, NULL, '2026-11-01T20:12:36.368Z', '2026-11-01T20:12:36.368Z')
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "Question" ("id", "paperId", "topicId", "type", "displayNumber", "section", "stimulus", "imageUrl", "prompt", "options", "correctAnswer", "acceptedAnswers", "explanation", "markingGuide", "numericTolerance", "caseSensitive", "requiresTeacher", "points", "order", "parentId", "unit", "partialRule", "createdAt", "updatedAt") VALUES
(E'cmvy9o5u8027ybogyia0vdkqu', E'cmvy9o5u6027obogysjapto9c', E'cmvy9o5i600ymbogyxelu21bf', E'SHORT_ANSWER', E'5', NULL, NULL, NULL, E'Which part of the body makes red blood cells?', NULL, E'"The bone marrow"', E'["bone marrow","marrow"]', NULL, NULL, NULL, FALSE, FALSE, 2, 5, NULL, NULL, NULL, '2026-11-01T20:12:36.369Z', '2026-11-01T20:12:36.369Z'),
(E'cmvy9o5u90280bogyea2zur5h', E'cmvy9o5u6027obogysjapto9c', E'cmvy9o5i600ymbogyxelu21bf', E'SHORT_ANSWER', E'6', NULL, NULL, NULL, E'Name the artery that carries deoxygenated blood from the heart to the lungs.', NULL, E'"Pulmonary artery"', E'["the pulmonary artery"]', NULL, NULL, NULL, FALSE, FALSE, 2, 6, NULL, NULL, NULL, '2026-11-01T20:12:36.370Z', '2026-11-01T20:12:36.370Z'),
(E'cmvy9o5ua0282bogy8heed7x3', E'cmvy9o5u6027obogysjapto9c', E'cmvy9o5i600ymbogyxelu21bf', E'SHORT_ANSWER', E'7', NULL, NULL, NULL, E'What is a pulse?', NULL, E'"The throbbing of arteries as the heart pumps blood."', E'["heart beat felt in arteries","throbbing of arteries","beating of the heart felt in the arteries","the beat of the heart"]', NULL, NULL, NULL, FALSE, FALSE, 2, 7, NULL, NULL, NULL, '2026-11-01T20:12:36.370Z', '2026-11-01T20:12:36.370Z'),
(E'cmvy9o5uf0284bogyy96alidm', E'cmvy9o5u6027obogysjapto9c', E'cmvy9o5i600ymbogyxelu21bf', E'SHORT_ANSWER', E'8', NULL, NULL, NULL, E'Give one way of keeping the heart healthy.', NULL, E'"Regular exercise / eating less fat and salt / not smoking."', E'["exercise","regular exercise","eating less fat","avoid smoking","eating a balanced diet","avoiding fatty foods","not smoking"]', NULL, NULL, NULL, FALSE, FALSE, 2, 8, NULL, NULL, NULL, '2026-11-01T20:12:36.376Z', '2026-11-01T20:12:36.376Z'),
(E'cmvy9o5uh0286bogyox8u0san', E'cmvy9o5u6027obogysjapto9c', E'cmvy9o5i600ymbogyxelu21bf', E'SHORT_ANSWER', E'9', NULL, NULL, NULL, E'Name the disease caused by lack of enough red blood cells or haemoglobin.', NULL, E'"Anaemia"', E'["anemia"]', NULL, NULL, NULL, FALSE, FALSE, 2, 9, NULL, NULL, NULL, '2026-11-01T20:12:36.377Z', '2026-11-01T20:12:36.377Z'),
(E'cmvy9o5uh0288bogywq4owyso', E'cmvy9o5u6027obogysjapto9c', E'cmvy9o5i600ymbogyxelu21bf', E'MULTIPLE_CHOICE', E'10', NULL, NULL, NULL, E'Which blood group can donate blood to all other groups?', E'["A","B","AB","O"]', E'"O"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 10, NULL, NULL, NULL, '2026-11-01T20:12:36.378Z', '2026-11-01T20:12:36.378Z'),
(E'cmvy9o5ui028cbogycukmn734', E'cmvy9o5ui028abogyptpj607v', E'cmvy9o5if00zobogyep7qh0ax', E'SHORT_ANSWER', E'1', NULL, NULL, NULL, E'Name the three founder members of the East African Community.', NULL, E'"Kenya, Uganda and Tanzania"', E'["Uganda, Kenya and Tanzania","Kenya Uganda Tanzania","Uganda Kenya Tanzania","Tanzania, Kenya and Uganda"]', NULL, NULL, NULL, FALSE, FALSE, 2, 1, NULL, NULL, NULL, '2026-11-01T20:12:36.379Z', '2026-11-01T20:12:36.379Z'),
(E'cmvy9o5uj028ebogy8zc0xa6x', E'cmvy9o5ui028abogyptpj607v', E'cmvy9o5if00zobogyep7qh0ax', E'SHORT_ANSWER', E'2', NULL, NULL, NULL, E'In which year was the first East African Community formed?', NULL, E'"1967"', NULL, NULL, NULL, NULL, FALSE, FALSE, 2, 2, NULL, NULL, NULL, '2026-11-01T20:12:36.379Z', '2026-11-01T20:12:36.379Z'),
(E'cmvy9o5uj028gbogy36io4jsv', E'cmvy9o5ui028abogyptpj607v', E'cmvy9o5if00zobogyep7qh0ax', E'SHORT_ANSWER', E'3', NULL, NULL, NULL, E'In which year did the first East African Community collapse?', NULL, E'"1977"', NULL, NULL, NULL, NULL, FALSE, FALSE, 2, 3, NULL, NULL, NULL, '2026-11-01T20:12:36.380Z', '2026-11-01T20:12:36.380Z'),
(E'cmvy9o5uk028ibogy5eguig5v', E'cmvy9o5ui028abogyptpj607v', E'cmvy9o5if00zobogyep7qh0ax', E'SHORT_ANSWER', E'4', NULL, NULL, NULL, E'Where is the headquarters of the EAC?', NULL, E'"Arusha, Tanzania"', E'["Arusha"]', NULL, NULL, NULL, FALSE, FALSE, 2, 4, NULL, NULL, NULL, '2026-11-01T20:12:36.380Z', '2026-11-01T20:12:36.380Z'),
(E'cmvy9o5uk028kbogytvcq40c2', E'cmvy9o5ui028abogyptpj607v', E'cmvy9o5if00zobogyep7qh0ax', E'MULTIPLE_CHOICE', E'5', NULL, NULL, NULL, E'Which two countries joined the EAC in 2007?', E'["Rwanda and Burundi","South Sudan and DRC","Somalia and Ethiopia","Rwanda and South Sudan"]', E'"Rwanda and Burundi"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 5, NULL, NULL, NULL, '2026-11-01T20:12:36.380Z', '2026-11-01T20:12:36.380Z'),
(E'cmvy9o5uk028mbogy9ihhxg6x', E'cmvy9o5ui028abogyptpj607v', E'cmvy9o5if00zobogyep7qh0ax', E'SHORT_ANSWER', E'6', NULL, NULL, NULL, E'Give one advantage of the East African Community to Uganda.', NULL, E'"Wider market / free movement of people / shared services."', E'["wider market","free movement","trade","market for goods","shared infrastructure","peace","cooperation","employment opportunities"]', NULL, NULL, NULL, FALSE, FALSE, 2, 6, NULL, NULL, NULL, '2026-11-01T20:12:36.381Z', '2026-11-01T20:12:36.381Z'),
(E'cmvy9o5ul028obogyndc2e8cw', E'cmvy9o5ui028abogyptpj607v', E'cmvy9o5if00zobogyep7qh0ax', E'SHORT_ANSWER', E'7', NULL, NULL, NULL, E'Name the EAC organ made up of the Presidents of member states.', NULL, E'"The Summit"', E'["Summit of Heads of State","the summit"]', NULL, NULL, NULL, FALSE, FALSE, 2, 7, NULL, NULL, NULL, '2026-11-01T20:12:36.381Z', '2026-11-01T20:12:36.381Z'),
(E'cmvy9o5ul028qbogyxtlzvg95', E'cmvy9o5ui028abogyptpj607v', E'cmvy9o5if00zobogyep7qh0ax', E'SHORT_ANSWER', E'8', NULL, NULL, NULL, E'Name the common language spoken across East Africa.', NULL, E'"Kiswahili"', E'["Swahili"]', NULL, NULL, NULL, FALSE, FALSE, 2, 8, NULL, NULL, NULL, '2026-11-01T20:12:36.382Z', '2026-11-01T20:12:36.382Z'),
(E'cmvy9o5ul028sbogytfyh3mj5', E'cmvy9o5ui028abogyptpj607v', E'cmvy9o5if00zobogyep7qh0ax', E'SHORT_ANSWER', E'9', NULL, NULL, NULL, E'Give one problem facing the East African Community.', NULL, E'"Different currencies / political differences / smuggling / border conflicts."', E'["different currencies","political instability","smuggling","border conflicts","language differences","unequal development","political differences"]', NULL, NULL, NULL, FALSE, FALSE, 2, 9, NULL, NULL, NULL, '2026-11-01T20:12:36.382Z', '2026-11-01T20:12:36.382Z'),
(E'cmvy9o5um028ubogyuu9fe8oe', E'cmvy9o5ui028abogyptpj607v', E'cmvy9o5if00zobogyep7qh0ax', E'LONG_ANSWER', E'10', NULL, NULL, NULL, E'Explain two reasons why the first East African Community collapsed.', NULL, E'"Any two: ideological differences (capitalist Kenya vs socialist Tanzania); personal differences between Amin and Nyerere; unequal distribution of benefits (Kenya gained most); lack of a common currency; closure of the Kenya–Tanzania border in 1977. 2 marks each."', NULL, NULL, E'Any two: ideological differences (capitalist Kenya vs socialist Tanzania); personal differences between Amin and Nyerere; unequal distribution of benefits (Kenya gained most); lack of a common currency; closure of the Kenya–Tanzania border in 1977. 2 marks each.', NULL, FALSE, FALSE, 4, 10, NULL, NULL, NULL, '2026-11-01T20:12:36.382Z', '2026-11-01T20:12:36.382Z'),
(E'cmvy9o5un028ybogy1h3im9tg', E'cmvy9o5um028wbogysg99k3px', E'cmvy9o5ie00zebogyvcbo0rd1', E'SHORT_ANSWER', E'1', NULL, NULL, NULL, E'Name the highest mountain in East Africa.', NULL, E'"Mount Kilimanjaro"', E'["Kilimanjaro","Mt Kilimanjaro"]', NULL, NULL, NULL, FALSE, FALSE, 2, 1, NULL, NULL, NULL, '2026-11-01T20:12:36.383Z', '2026-11-01T20:12:36.383Z'),
(E'cmvy9o5un0290bogyxc3ew5ef', E'cmvy9o5um028wbogysg99k3px', E'cmvy9o5ie00zebogyvcbo0rd1', E'SHORT_ANSWER', E'2', NULL, NULL, NULL, E'Name the highest peak of Mount Kilimanjaro.', NULL, E'"Kibo (Uhuru Peak)"', E'["Kibo","Uhuru peak","Uhuru"]', NULL, NULL, NULL, FALSE, FALSE, 2, 2, NULL, NULL, NULL, '2026-11-01T20:12:36.384Z', '2026-11-01T20:12:36.384Z'),
(E'cmvy9o5un0292bogya23k6eme', E'cmvy9o5um028wbogysg99k3px', E'cmvy9o5ie00zebogyvcbo0rd1', E'SHORT_ANSWER', E'3', NULL, NULL, NULL, E'Name the highest mountain in Kenya.', NULL, E'"Mount Kenya"', E'["Mt Kenya"]', NULL, NULL, NULL, FALSE, FALSE, 2, 3, NULL, NULL, NULL, '2026-11-01T20:12:36.384Z', '2026-11-01T20:12:36.384Z'),
(E'cmvy9o5uo0294bogyoquvzay3', E'cmvy9o5um028wbogysg99k3px', E'cmvy9o5ie00zebogyvcbo0rd1', E'MULTIPLE_CHOICE', E'4', NULL, NULL, NULL, E'Which lake is the deepest in East Africa?', E'["Lake Victoria","Lake Tanganyika","Lake Turkana","Lake Kyoga"]', E'"Lake Tanganyika"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 4, NULL, NULL, NULL, '2026-11-01T20:12:36.384Z', '2026-11-01T20:12:36.384Z'),
(E'cmvy9o5uo0296bogyla4wf6v7', E'cmvy9o5um028wbogysg99k3px', E'cmvy9o5ie00zebogyvcbo0rd1', E'SHORT_ANSWER', E'5', NULL, NULL, NULL, E'Name the two arms of the Great Rift Valley in East Africa.', NULL, E'"The Eastern (Gregory) Rift Valley and the Western (Albertine) Rift Valley"', E'["eastern and western","Gregory and Albertine","the eastern arm and the western arm"]', NULL, NULL, NULL, FALSE, FALSE, 2, 5, NULL, NULL, NULL, '2026-11-01T20:12:36.385Z', '2026-11-01T20:12:36.385Z'),
(E'cmvy9o5uo0298bogymmr5bkzo', E'cmvy9o5um028wbogysg99k3px', E'cmvy9o5ie00zebogyvcbo0rd1', E'SHORT_ANSWER', E'6', NULL, NULL, NULL, E'Give one example of a lake found in the Eastern Rift Valley.', NULL, E'"Lake Turkana"', E'["Turkana","Lake Nakuru","Nakuru","Lake Naivasha","Naivasha","Lake Natron","Natron","Lake Eyasi","Lake Manyara","Lake Baringo","Bogoria"]', NULL, NULL, NULL, FALSE, FALSE, 2, 6, NULL, NULL, NULL, '2026-11-01T20:12:36.385Z', '2026-11-01T20:12:36.385Z'),
(E'cmvy9o5up029abogymkcu3064', E'cmvy9o5um028wbogysg99k3px', E'cmvy9o5ie00zebogyvcbo0rd1', E'SHORT_ANSWER', E'7', NULL, NULL, NULL, E'Name the river that flows through Tanzania and is its longest.', NULL, E'"River Rufiji"', E'["Rufiji"]', NULL, NULL, NULL, FALSE, FALSE, 2, 7, NULL, NULL, NULL, '2026-11-01T20:12:36.385Z', '2026-11-01T20:12:36.385Z'),
(E'cmvy9o5up029cbogyh3txae2j', E'cmvy9o5um028wbogysg99k3px', E'cmvy9o5ie00zebogyvcbo0rd1', E'SHORT_ANSWER', E'8', NULL, NULL, NULL, E'Name the longest river in Kenya.', NULL, E'"River Tana"', E'["Tana"]', NULL, NULL, NULL, FALSE, FALSE, 2, 8, NULL, NULL, NULL, '2026-11-01T20:12:36.386Z', '2026-11-01T20:12:36.386Z'),
(E'cmvy9o5uq029ebogyflloemmd', E'cmvy9o5um028wbogysg99k3px', E'cmvy9o5ie00zebogyvcbo0rd1', E'SHORT_ANSWER', E'9', NULL, NULL, NULL, E'Which East African mountain lies on the border of Uganda and Kenya?', NULL, E'"Mount Elgon"', E'["Elgon","Mt Elgon"]', NULL, NULL, NULL, FALSE, FALSE, 2, 9, NULL, NULL, NULL, '2026-11-01T20:12:36.386Z', '2026-11-01T20:12:36.386Z'),
(E'cmvy9o5uq029gbogy545obnn4', E'cmvy9o5um028wbogysg99k3px', E'cmvy9o5ie00zebogyvcbo0rd1', E'SHORT_ANSWER', E'10', NULL, NULL, NULL, E'What is a plateau?', NULL, E'"A large, fairly flat, raised area of land."', E'["a raised flat land","flat raised land","high flat land","a raised area of flat land"]', NULL, NULL, NULL, FALSE, FALSE, 2, 10, NULL, NULL, NULL, '2026-11-01T20:12:36.386Z', '2026-11-01T20:12:36.386Z'),
(E'cmvy9o5us029mbogybp9nfm78', E'cmvy9o5ur029kbogy2xxyypg4', E'cmvy9o5iu011kbogyj21wboqk', E'MULTIPLE_CHOICE', E'1', NULL, NULL, NULL, E'Given A = {1, 2, 3, 4} and B = {3, 4, 5}, find A ∩ B.', E'["{1, 2}","{3, 4}","{1, 2, 3, 4, 5}","{5}"]', E'"{3, 4}"', NULL, E'The intersection contains members found in BOTH sets.', NULL, NULL, FALSE, FALSE, 1, 1, NULL, NULL, NULL, '2026-11-01T20:12:36.388Z', '2026-11-01T20:12:36.388Z'),
(E'cmvy9o5us029obogybfu3cnm5', E'cmvy9o5ur029kbogy2xxyypg4', E'cmvy9o5iu011kbogyj21wboqk', E'MULTIPLE_CHOICE', E'2', NULL, NULL, NULL, E'How many subsets does the set {p, q, r} have?', E'["3","6","8","9"]', E'"8"', NULL, E'A set with n members has 2ⁿ subsets: 2³ = 8.', NULL, NULL, FALSE, FALSE, 1, 2, NULL, NULL, NULL, '2026-11-01T20:12:36.388Z', '2026-11-01T20:12:36.388Z'),
(E'cmvy9o5ut029qbogys6v12kfw', E'cmvy9o5ur029kbogy2xxyypg4', E'cmvy9o5iu011kbogyj21wboqk', E'NUMERIC', E'3', NULL, NULL, NULL, E'If n(P) = 18, n(Q) = 14 and n(P ∩ Q) = 6, find n(P ∪ Q).', NULL, E'26', NULL, E'n(P ∪ Q) = 18 + 14 − 6 = 26.', NULL, 0, FALSE, FALSE, 2, 3, NULL, NULL, NULL, '2026-11-01T20:12:36.389Z', '2026-11-01T20:12:36.389Z'),
(E'cmvy9o5uw029sbogyqf9d6pvo', E'cmvy9o5ur029kbogy2xxyypg4', E'cmvy9o5iu011kbogyj21wboqk', E'NUMERIC', E'4', NULL, NULL, NULL, E'In a class of 45 pupils, 30 play football, 25 play netball and 5 play neither. How many pupils play both games?', NULL, E'15', NULL, E'At least one = 40. 30 + 25 − x = 40 → x = 15.', NULL, 0, FALSE, FALSE, 2, 4, NULL, NULL, NULL, '2026-11-01T20:12:36.392Z', '2026-11-01T20:12:36.392Z'),
(E'cmvy9o5ux029ubogyyhcoo9m3', E'cmvy9o5ur029kbogy2xxyypg4', E'cmvy9o5iu011kbogyj21wboqk', E'FILL_BLANK', E'5', NULL, NULL, NULL, E'A set with no members is called an ______ set.', NULL, E'"empty"', E'["null"]', E'The empty set is written { } or ∅.', NULL, NULL, FALSE, FALSE, 1, 5, NULL, NULL, NULL, '2026-11-01T20:12:36.393Z', '2026-11-01T20:12:36.393Z'),
(E'cmvy9o5ux029wbogyq2mxvmoi', E'cmvy9o5ur029kbogy2xxyypg4', E'cmvy9o5iu011kbogyj21wboqk', E'SHORT_ANSWER', E'6', NULL, NULL, NULL, E'List the members of the set of even numbers between 1 and 11.', NULL, E'"{2, 4, 6, 8, 10}"', E'["2, 4, 6, 8, 10","2,4,6,8,10"]', E'Even numbers are divisible by 2.', NULL, NULL, FALSE, FALSE, 2, 6, NULL, NULL, NULL, '2026-11-01T20:12:36.394Z', '2026-11-01T20:12:36.394Z'),
(E'cmvy9o5uy029ybogyqgxwudsl', E'cmvy9o5ur029kbogy2xxyypg4', E'cmvy9o5iu011kbogyj21wboqk', E'TRUE_FALSE', E'7', NULL, NULL, NULL, E'The sets {1, 2, 3} and {a, b, c} are equal sets.', E'["True","False"]', E'false', NULL, E'They are equivalent (same number of members) but not equal.', NULL, NULL, FALSE, FALSE, 1, 7, NULL, NULL, NULL, '2026-11-01T20:12:36.394Z', '2026-11-01T20:12:36.394Z'),
(E'cmvy9o5uy02a0bogydku0c338', E'cmvy9o5ur029kbogy2xxyypg4', E'cmvy9o5iu011kbogyj21wboqk', E'MULTIPLE_CHOICE', E'8', NULL, NULL, NULL, E'Which symbol means ''is a subset of''?', E'["∈","∩","⊂","∪"]', E'"⊂"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 8, NULL, NULL, NULL, '2026-11-01T20:12:36.395Z', '2026-11-01T20:12:36.395Z'),
(E'cmvy9o5uz02a2bogy52s6ivd3', E'cmvy9o5ur029kbogy2xxyypg4', E'cmvy9o5iu011kbogyj21wboqk', E'NUMERIC', E'9', NULL, NULL, NULL, E'Set K has 5 members. How many subsets of K have at least one member?', NULL, E'31', NULL, E'2⁵ = 32 subsets, minus the empty set = 31.', NULL, 0, FALSE, FALSE, 2, 9, NULL, NULL, NULL, '2026-11-01T20:12:36.395Z', '2026-11-01T20:12:36.395Z'),
(E'cmvy9o5uz02a4bogy5dkve9yu', E'cmvy9o5ur029kbogy2xxyypg4', E'cmvy9o5iu011kbogyj21wboqk', E'LONG_ANSWER', E'10', NULL, NULL, NULL, E'A survey of 50 farmers found that 32 grow maize, 28 grow beans and 6 grow neither. Draw a Venn diagram and find how many farmers grow only beans.', NULL, E'"Both = 32 + 28 − 44 = 16. Beans only = 28 − 16 = 12. Award marks for a correctly labelled Venn diagram (2), correct value for both (1) and final answer 12 (1)."', NULL, NULL, E'Both = 32 + 28 − 44 = 16. Beans only = 28 − 16 = 12. Award marks for a correctly labelled Venn diagram (2), correct value for both (1) and final answer 12 (1).', NULL, FALSE, FALSE, 4, 10, NULL, NULL, NULL, '2026-11-01T20:12:36.395Z', '2026-11-01T20:12:36.395Z'),
(E'cmvy9o5v102aabogyg8p4lfe1', E'cmvy9o5v002a8bogyb26oqnwy', E'cmvy9o5iv011qbogys3gd4n0c', E'MULTIPLE_CHOICE', E'1', NULL, NULL, NULL, E'Change ⅝ to a decimal.', E'["0.58","0.625","0.65","0.8"]', E'"0.625"', NULL, E'5 ÷ 8 = 0.625.', NULL, NULL, FALSE, FALSE, 1, 1, NULL, NULL, NULL, '2026-11-01T20:12:36.398Z', '2026-11-01T20:12:36.398Z'),
(E'cmvy9o5v202acbogyfqrp7r49', E'cmvy9o5v002a8bogyb26oqnwy', E'cmvy9o5iv011qbogys3gd4n0c', E'MULTIPLE_CHOICE', E'2', NULL, NULL, NULL, E'Express 0.45 as a fraction in its lowest terms.', E'["45/100","9/20","4/5","9/25"]', E'"9/20"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 2, NULL, NULL, NULL, '2026-11-01T20:12:36.399Z', '2026-11-01T20:12:36.399Z'),
(E'cmvy9o5v302aebogygdtqcsra', E'cmvy9o5v002a8bogyb26oqnwy', E'cmvy9o5iv011qbogys3gd4n0c', E'NUMERIC', E'3', NULL, NULL, NULL, E'Work out: ⅔ + ¼. Give your answer as a fraction in twelfths (enter the numerator only).', NULL, E'11', NULL, E'8/12 + 3/12 = 11/12.', NULL, 0, FALSE, FALSE, 2, 3, NULL, NULL, NULL, '2026-11-01T20:12:36.399Z', '2026-11-01T20:12:36.399Z'),
(E'cmvy9o5v302agbogyqcqkhojt', E'cmvy9o5v002a8bogyb26oqnwy', E'cmvy9o5iv011qbogys3gd4n0c', E'NUMERIC', E'4', NULL, NULL, NULL, E'Find 35% of 240.', NULL, E'84', NULL, E'35/100 × 240 = 84.', NULL, 0, FALSE, FALSE, 2, 4, NULL, NULL, NULL, '2026-11-01T20:12:36.400Z', '2026-11-01T20:12:36.400Z'),
(E'cmvy9o5v302aibogyq54yzpmb', E'cmvy9o5v002a8bogyb26oqnwy', E'cmvy9o5iv011qbogys3gd4n0c', E'NUMERIC', E'5', NULL, NULL, NULL, E'A dress costing UGX 50,000 is sold at a discount of 12%. Find the selling price in UGX.', NULL, E'44000', NULL, E'50,000 × 88/100 = 44,000.', NULL, 0, FALSE, FALSE, 2, 5, NULL, NULL, NULL, '2026-11-01T20:12:36.400Z', '2026-11-01T20:12:36.400Z'),
(E'cmvy9o5v402akbogyvajjmjl7', E'cmvy9o5v002a8bogyb26oqnwy', E'cmvy9o5iv011qbogys3gd4n0c', E'NUMERIC', E'6', NULL, NULL, NULL, E'If 40% of a number is 60, find the number.', NULL, E'150', NULL, E'60 ÷ 40 × 100 = 150.', NULL, 0, FALSE, FALSE, 2, 6, NULL, NULL, NULL, '2026-11-01T20:12:36.400Z', '2026-11-01T20:12:36.400Z'),
(E'cmvy9o5v402ambogy8h9f10js', E'cmvy9o5v002a8bogyb26oqnwy', E'cmvy9o5iv011qbogys3gd4n0c', E'NUMERIC', E'7', NULL, NULL, NULL, E'Work out ⅗ ÷ 9/10 and give your answer as a fraction a/b (enter the numerator of the simplified fraction).', NULL, E'2', NULL, E'⅗ × 10/9 = 30/45 = ⅔. Numerator is 2.', NULL, 0, FALSE, FALSE, 2, 7, NULL, NULL, NULL, '2026-11-01T20:12:36.401Z', '2026-11-01T20:12:36.401Z'),
(E'cmvy9o5v402aobogyb5yb9n7l', E'cmvy9o5v002a8bogyb26oqnwy', E'cmvy9o5iv011qbogys3gd4n0c', E'SHORT_ANSWER', E'8', NULL, NULL, NULL, E'Simplify 2⅓ × 1½ (give a mixed number or improper fraction).', NULL, E'"3½"', E'["7/2","3 1/2","3.5"]', E'7/3 × 3/2 = 21/6 = 7/2 = 3½.', NULL, NULL, FALSE, FALSE, 2, 8, NULL, NULL, NULL, '2026-11-01T20:12:36.401Z', '2026-11-01T20:12:36.401Z'),
(E'cmvy9o5v502aqbogyznnu4mz3', E'cmvy9o5v002a8bogyb26oqnwy', E'cmvy9o5iv011qbogys3gd4n0c', E'NUMERIC', E'9', NULL, NULL, NULL, E'Nambi spent ¼ of her money on books and ⅓ of the remainder on transport. If she remained with UGX 24,000, how much money did she have at first (UGX)?', NULL, E'48000', NULL, E'After books ¾ remains; transport = ⅓ × ¾ = ¼; left = ¾ − ¼ = ½ → 24,000 × 2 = 48,000.', NULL, 0, FALSE, FALSE, 2, 9, NULL, NULL, NULL, '2026-11-01T20:12:36.401Z', '2026-11-01T20:12:36.401Z'),
(E'cmvy9o5v502asbogy6ym2ch8z', E'cmvy9o5v002a8bogyb26oqnwy', E'cmvy9o5iv011qbogys3gd4n0c', E'MULTIPLE_CHOICE', E'10', NULL, NULL, NULL, E'The price of sugar rose from UGX 4,000 to UGX 5,000 per kg. What is the percentage increase?', E'["20%","25%","10%","50%"]', E'"25%"', NULL, E'Increase = 1,000. 1,000/4,000 × 100% = 25%.', NULL, NULL, FALSE, FALSE, 1, 10, NULL, NULL, NULL, '2026-11-01T20:12:36.401Z', '2026-11-01T20:12:36.401Z'),
(E'cmvy9o5v702aybogy7twqcp8v', E'cmvy9o5v602awbogy7bmqrwxb', E'cmvy9o5iy0126bogy3gc1ptrk', E'MULTIPLE_CHOICE', E'1', NULL, NULL, NULL, E'Simplify 5m + 3n − 2m + n.', E'["3m + 4n","7m + 2n","3m + 2n","7m + 4n"]', E'"3m + 4n"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 1, NULL, NULL, NULL, '2026-11-01T20:12:36.403Z', '2026-11-01T20:12:36.403Z'),
(E'cmvy9o5v702b0bogylzbz2b7a', E'cmvy9o5v602awbogy7bmqrwxb', E'cmvy9o5iy0126bogy3gc1ptrk', E'NUMERIC', E'2', NULL, NULL, NULL, E'Solve for x: 4x − 9 = 15.', NULL, E'6', NULL, E'4x = 24, x = 6.', NULL, 0, FALSE, FALSE, 2, 2, NULL, NULL, NULL, '2026-11-01T20:12:36.404Z', '2026-11-01T20:12:36.404Z'),
(E'cmvy9o5v802b2bogy7fc1ob4p', E'cmvy9o5v602awbogy7bmqrwxb', E'cmvy9o5iy0126bogy3gc1ptrk', E'NUMERIC', E'3', NULL, NULL, NULL, E'Solve: 2(y + 3) = 16.', NULL, E'5', NULL, E'2y + 6 = 16 → y = 5.', NULL, 0, FALSE, FALSE, 2, 3, NULL, NULL, NULL, '2026-11-01T20:12:36.404Z', '2026-11-01T20:12:36.404Z'),
(E'cmvy9o5v802b4bogymuwg7xbc', E'cmvy9o5v602awbogy7bmqrwxb', E'cmvy9o5iy0126bogy3gc1ptrk', E'NUMERIC', E'4', NULL, NULL, NULL, E'Solve: p/3 + 4 = 7.', NULL, E'9', NULL, E'p/3 = 3 → p = 9.', NULL, 0, FALSE, FALSE, 2, 4, NULL, NULL, NULL, '2026-11-01T20:12:36.405Z', '2026-11-01T20:12:36.405Z')
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "Question" ("id", "paperId", "topicId", "type", "displayNumber", "section", "stimulus", "imageUrl", "prompt", "options", "correctAnswer", "acceptedAnswers", "explanation", "markingGuide", "numericTolerance", "caseSensitive", "requiresTeacher", "points", "order", "parentId", "unit", "partialRule", "createdAt", "updatedAt") VALUES
(E'cmvy9o5vb02b6bogytoxjk586', E'cmvy9o5v602awbogy7bmqrwxb', E'cmvy9o5iy0126bogy3gc1ptrk', E'NUMERIC', E'5', NULL, NULL, NULL, E'If a = 4 and b = 3, find the value of 2a² − 3b.', NULL, E'23', NULL, E'2(16) − 9 = 23.', NULL, 0, FALSE, FALSE, 2, 5, NULL, NULL, NULL, '2026-11-01T20:12:36.407Z', '2026-11-01T20:12:36.407Z'),
(E'cmvy9o5vc02b8bogy9xpd9zsw', E'cmvy9o5v602awbogy7bmqrwxb', E'cmvy9o5iy0126bogy3gc1ptrk', E'NUMERIC', E'6', NULL, NULL, NULL, E'Solve: 7k − 5 = 3k + 11.', NULL, E'4', NULL, E'4k = 16, k = 4.', NULL, 0, FALSE, FALSE, 2, 6, NULL, NULL, NULL, '2026-11-01T20:12:36.408Z', '2026-11-01T20:12:36.408Z'),
(E'cmvy9o5vc02babogy63c6265q', E'cmvy9o5v602awbogy7bmqrwxb', E'cmvy9o5iy0126bogy3gc1ptrk', E'MULTIPLE_CHOICE', E'7', NULL, NULL, NULL, E'Solve the inequality 3x − 2 < 10.', E'["x < 4","x > 4","x < 6","x ≤ 4"]', E'"x < 4"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 7, NULL, NULL, NULL, '2026-11-01T20:12:36.409Z', '2026-11-01T20:12:36.409Z'),
(E'cmvy9o5vd02bcbogy8b9knnss', E'cmvy9o5v602awbogy7bmqrwxb', E'cmvy9o5iy0126bogy3gc1ptrk', E'NUMERIC', E'8', NULL, NULL, NULL, E'The sum of three consecutive numbers is 48. Find the smallest number.', NULL, E'15', NULL, E'n + (n+1) + (n+2) = 48 → 3n = 45 → n = 15.', NULL, 0, FALSE, FALSE, 2, 8, NULL, NULL, NULL, '2026-11-01T20:12:36.409Z', '2026-11-01T20:12:36.409Z'),
(E'cmvy9o5vd02bebogyfkl4ude8', E'cmvy9o5v602awbogy7bmqrwxb', E'cmvy9o5iy0126bogy3gc1ptrk', E'NUMERIC', E'9', NULL, NULL, NULL, E'Two angles on a straight line are (3x + 20)° and (x + 40)°. Find the value of x.', NULL, E'30', NULL, E'4x + 60 = 180 → x = 30.', NULL, 0, FALSE, FALSE, 2, 9, NULL, NULL, NULL, '2026-11-01T20:12:36.410Z', '2026-11-01T20:12:36.410Z'),
(E'cmvy9o5ve02bgbogy2jw4w0e9', E'cmvy9o5v602awbogy7bmqrwxb', E'cmvy9o5iy0126bogy3gc1ptrk', E'LONG_ANSWER', E'10', NULL, NULL, NULL, E'Mukasa bought 3 pens and 2 books for UGX 11,000. A book costs UGX 1,000 more than a pen. Form an equation and find the cost of a pen.', NULL, E'"Let pen = p; book = p + 1000. 3p + 2(p + 1000) = 11000 → 5p = 9000 → p = 1800. Marks: equation (2), solution (2)."', NULL, NULL, E'Let pen = p; book = p + 1000. 3p + 2(p + 1000) = 11000 → 5p = 9000 → p = 1800. Marks: equation (2), solution (2).', NULL, FALSE, FALSE, 4, 10, NULL, NULL, NULL, '2026-11-01T20:12:36.410Z', '2026-11-01T20:12:36.410Z'),
(E'cmvy9o5vf02bmbogywwn01l22', E'cmvy9o5vf02bkbogyoq8l6ter', E'cmvy9o5ix0120bogy4l72qn33', E'NUMERIC', E'1', NULL, NULL, NULL, E'A trader bought a bicycle at UGX 150,000 and sold it at UGX 180,000. Find the percentage profit.', NULL, E'20', NULL, E'Profit 30,000; 30,000/150,000 × 100 = 20%.', NULL, 0, FALSE, FALSE, 2, 1, NULL, NULL, NULL, '2026-11-01T20:12:36.412Z', '2026-11-01T20:12:36.412Z'),
(E'cmvy9o5vg02bobogyeku5tt2w', E'cmvy9o5vf02bkbogyoq8l6ter', E'cmvy9o5ix0120bogy4l72qn33', E'NUMERIC', E'2', NULL, NULL, NULL, E'A dress marked at UGX 60,000 is sold at a 15% discount. How much does a customer pay (UGX)?', NULL, E'51000', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 2, NULL, NULL, NULL, '2026-11-01T20:12:36.412Z', '2026-11-01T20:12:36.412Z'),
(E'cmvy9o5vg02bqbogy4fhiswse', E'cmvy9o5vf02bkbogyoq8l6ter', E'cmvy9o5ix0120bogy4l72qn33', E'NUMERIC', E'3', NULL, NULL, NULL, E'Find the simple interest on UGX 300,000 at 8% per annum for 3 years (UGX).', NULL, E'72000', NULL, E'I = 300,000 × 8 × 3 ÷ 100.', NULL, 0, FALSE, FALSE, 2, 3, NULL, NULL, NULL, '2026-11-01T20:12:36.412Z', '2026-11-01T20:12:36.412Z'),
(E'cmvy9o5vg02bsbogyr9rqsn4b', E'cmvy9o5vf02bkbogyoq8l6ter', E'cmvy9o5ix0120bogy4l72qn33', E'NUMERIC', E'4', NULL, NULL, NULL, E'Achen sold a goat at UGX 92,000 making a profit of 15%. What was the cost price (UGX)?', NULL, E'80000', NULL, E'92,000 ÷ 115 × 100 = 80,000.', NULL, 0, FALSE, FALSE, 2, 4, NULL, NULL, NULL, '2026-11-01T20:12:36.413Z', '2026-11-01T20:12:36.413Z'),
(E'cmvy9o5vh02bubogyn0t6en3q', E'cmvy9o5vf02bkbogyoq8l6ter', E'cmvy9o5ix0120bogy4l72qn33', E'NUMERIC', E'5', NULL, NULL, NULL, E'Find the simple interest on UGX 120,000 at 10% per year for 9 months (UGX).', NULL, E'9000', NULL, E'T = 9/12 = ¾ year. I = 120,000 × 10 × 0.75 ÷ 100 = 9,000.', NULL, 0, FALSE, FALSE, 2, 5, NULL, NULL, NULL, '2026-11-01T20:12:36.413Z', '2026-11-01T20:12:36.413Z'),
(E'cmvy9o5vh02bwbogy4oev832n', E'cmvy9o5vf02bkbogyoq8l6ter', E'cmvy9o5ix0120bogy4l72qn33', E'NUMERIC', E'6', NULL, NULL, NULL, E'If 1 US dollar costs UGX 3,750, how many shillings is US$ 40?', NULL, E'150000', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 6, NULL, NULL, NULL, '2026-11-01T20:12:36.414Z', '2026-11-01T20:12:36.414Z'),
(E'cmvy9o5vi02bybogyvwohgl18', E'cmvy9o5vf02bkbogyoq8l6ter', E'cmvy9o5ix0120bogy4l72qn33', E'MULTIPLE_CHOICE', E'7', NULL, NULL, NULL, E'A shopkeeper bought 5 trays of eggs at UGX 12,000 each and sold all at UGX 13,500 each. His total profit was:', E'["UGX 1,500","UGX 7,500","UGX 6,000","UGX 67,500"]', E'"UGX 7,500"', NULL, E'Profit per tray 1,500 × 5 = 7,500.', NULL, NULL, FALSE, FALSE, 1, 7, NULL, NULL, NULL, '2026-11-01T20:12:36.414Z', '2026-11-01T20:12:36.414Z'),
(E'cmvy9o5vi02c0bogyrgf65p53', E'cmvy9o5vf02bkbogyoq8l6ter', E'cmvy9o5ix0120bogy4l72qn33', E'NUMERIC', E'8', NULL, NULL, NULL, E'A TV costs UGX 900,000 cash. On hire purchase one pays a deposit of UGX 300,000 and 6 instalments of UGX 120,000. How much more is paid on hire purchase (UGX)?', NULL, E'120000', NULL, E'300,000 + 720,000 = 1,020,000; extra = 120,000.', NULL, 0, FALSE, FALSE, 2, 8, NULL, NULL, NULL, '2026-11-01T20:12:36.414Z', '2026-11-01T20:12:36.414Z'),
(E'cmvy9o5vi02c2bogyesfv9yor', E'cmvy9o5vf02bkbogyoq8l6ter', E'cmvy9o5ix0120bogy4l72qn33', E'NUMERIC', E'9', NULL, NULL, NULL, E'Mugisha deposited money in a bank at 5% p.a. simple interest. After 2 years the interest was UGX 30,000. How much did he deposit (UGX)?', NULL, E'300000', NULL, E'P = I × 100 ÷ (R × T) = 30,000 × 100 ÷ 10.', NULL, 0, FALSE, FALSE, 2, 9, NULL, NULL, NULL, '2026-11-01T20:12:36.415Z', '2026-11-01T20:12:36.415Z'),
(E'cmvy9o5vi02c4bogyy4qao2bk', E'cmvy9o5vf02bkbogyoq8l6ter', E'cmvy9o5ix0120bogy4l72qn33', E'LONG_ANSWER', E'10', NULL, NULL, NULL, E'A trader bought 40 kg of beans at UGX 2,500 per kg. He sold 30 kg at UGX 3,200 per kg and the rest at UGX 2,000 per kg. Find his percentage profit.', NULL, E'"CP = 100,000. SP = 96,000 + 20,000 = 116,000. Profit = 16,000. % = 16%. Marks: CP (1), SP (1), profit (1), % (1)."', NULL, NULL, E'CP = 100,000. SP = 96,000 + 20,000 = 116,000. Profit = 16,000. % = 16%. Marks: CP (1), SP (1), profit (1), % (1).', NULL, FALSE, FALSE, 4, 10, NULL, NULL, NULL, '2026-11-01T20:12:36.415Z', '2026-11-01T20:12:36.415Z'),
(E'cmvy9o5vl02cabogyq08074dd', E'cmvy9o5vk02c8bogysxhnlzjf', E'cmvy9o5iz012gbogyu7nca9f6', E'MULTIPLE_CHOICE', E'1', NULL, NULL, NULL, E'Choose the correct word: The children ______ football every Saturday.', E'["play","plays","playing","played"]', E'"play"', NULL, E'Plural subject + simple present → no -s.', NULL, NULL, FALSE, FALSE, 1, 1, NULL, NULL, NULL, '2026-11-01T20:12:36.417Z', '2026-11-01T20:12:36.417Z'),
(E'cmvy9o5vl02ccbogyxqoo4mp6', E'cmvy9o5vk02c8bogysxhnlzjf', E'cmvy9o5iz012gbogyu7nca9f6', E'FILL_BLANK', E'2', NULL, NULL, NULL, E'Use the correct form of the verb in brackets: By the time the teacher came, the pupils ______ (finish) the work.', NULL, E'"had finished"', NULL, E'''By the time'' + past → past perfect.', NULL, NULL, FALSE, FALSE, 1, 2, NULL, NULL, NULL, '2026-11-01T20:12:36.417Z', '2026-11-01T20:12:36.417Z'),
(E'cmvy9o5vl02cebogyg6jnju7d', E'cmvy9o5vk02c8bogysxhnlzjf', E'cmvy9o5iz012gbogyu7nca9f6', E'FILL_BLANK', E'3', NULL, NULL, NULL, E'Rewrite with the verb in brackets correctly: We ______ (live) in Mbale since 2018.', NULL, E'"have lived"', E'["have been living"]', E'''Since'' → present perfect.', NULL, NULL, FALSE, FALSE, 1, 3, NULL, NULL, NULL, '2026-11-01T20:12:36.418Z', '2026-11-01T20:12:36.418Z'),
(E'cmvy9o5vm02cgbogyvrpon9w0', E'cmvy9o5vk02c8bogysxhnlzjf', E'cmvy9o5iz012gbogyu7nca9f6', E'MULTIPLE_CHOICE', E'4', NULL, NULL, NULL, E'While I ______ my homework, the lights went off.', E'["do","did","was doing","am doing"]', E'"was doing"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 4, NULL, NULL, NULL, '2026-11-01T20:12:36.418Z', '2026-11-01T20:12:36.418Z'),
(E'cmvy9o5vm02cibogysb37kktt', E'cmvy9o5vk02c8bogysxhnlzjf', E'cmvy9o5iz012gbogyu7nca9f6', E'FILL_BLANK', E'5', NULL, NULL, NULL, E'Give the past participle of ''write''.', NULL, E'"written"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 5, NULL, NULL, NULL, '2026-11-01T20:12:36.419Z', '2026-11-01T20:12:36.419Z'),
(E'cmvy9o5vn02ckbogyjge7tp87', E'cmvy9o5vk02c8bogysxhnlzjf', E'cmvy9o5iz012gbogyu7nca9f6', E'FILL_BLANK', E'6', NULL, NULL, NULL, E'Complete: If it rains tomorrow, we ______ (stay) at home.', NULL, E'"shall stay"', E'["will stay"]', NULL, NULL, NULL, FALSE, FALSE, 1, 6, NULL, NULL, NULL, '2026-11-01T20:12:36.419Z', '2026-11-01T20:12:36.419Z'),
(E'cmvy9o5vn02cmbogya08ip7qw', E'cmvy9o5vk02c8bogysxhnlzjf', E'cmvy9o5iz012gbogyu7nca9f6', E'MULTIPLE_CHOICE', E'7', NULL, NULL, NULL, E'Choose the correct sentence.', E'["She has went to the market.","She has gone to the market.","She have gone to the market.","She has go to the market."]', E'"She has gone to the market."', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 7, NULL, NULL, NULL, '2026-11-01T20:12:36.419Z', '2026-11-01T20:12:36.419Z'),
(E'cmvy9o5vn02cobogyzoh01gsy', E'cmvy9o5vk02c8bogysxhnlzjf', E'cmvy9o5iz012gbogyu7nca9f6', E'FILL_BLANK', E'8', NULL, NULL, NULL, E'I wish I ______ (have) a new school bag.', NULL, E'"had"', NULL, E'''Wish'' takes the past tense for present wishes.', NULL, NULL, FALSE, FALSE, 1, 8, NULL, NULL, NULL, '2026-11-01T20:12:36.420Z', '2026-11-01T20:12:36.420Z'),
(E'cmvy9o5vo02cqbogyu0ibnr8v', E'cmvy9o5vk02c8bogysxhnlzjf', E'cmvy9o5iz012gbogyu7nca9f6', E'FILL_BLANK', E'9', NULL, NULL, NULL, E'The baby ______ (sleep) now, so keep quiet.', NULL, E'"is sleeping"', NULL, E'''Now'' → present continuous.', NULL, NULL, FALSE, FALSE, 1, 9, NULL, NULL, NULL, '2026-11-01T20:12:36.420Z', '2026-11-01T20:12:36.420Z'),
(E'cmvy9o5vo02csbogydngjno5u', E'cmvy9o5vk02c8bogysxhnlzjf', E'cmvy9o5iz012gbogyu7nca9f6', E'FILL_BLANK', E'10', NULL, NULL, NULL, E'Yesterday the bell ______ (ring) at exactly 8 o''clock.', NULL, E'"rang"', NULL, E'Past tense of ring is rang.', NULL, NULL, FALSE, FALSE, 1, 10, NULL, NULL, NULL, '2026-11-01T20:12:36.420Z', '2026-11-01T20:12:36.420Z'),
(E'cmvy9o5vq02cybogyu5hqgdee', E'cmvy9o5vp02cwbogyvvvx5ht1', E'cmvy9o5j0012obogyb8y8hivp', E'SHORT_ANSWER', E'1', NULL, NULL, NULL, E'Rewrite in the passive voice: The teacher punished the boy.', NULL, E'"The boy was punished by the teacher."', E'["The boy was punished by the teacher"]', NULL, NULL, NULL, FALSE, FALSE, 2, 1, NULL, NULL, NULL, '2026-11-01T20:12:36.422Z', '2026-11-01T20:12:36.422Z'),
(E'cmvy9o5vq02d0bogysxhajk1u', E'cmvy9o5vp02cwbogyvvvx5ht1', E'cmvy9o5j0012obogyb8y8hivp', E'SHORT_ANSWER', E'2', NULL, NULL, NULL, E'Rewrite in the passive voice: Mary is cooking supper.', NULL, E'"Supper is being cooked by Mary."', E'["Supper is being cooked by Mary"]', NULL, NULL, NULL, FALSE, FALSE, 2, 2, NULL, NULL, NULL, '2026-11-01T20:12:36.423Z', '2026-11-01T20:12:36.423Z'),
(E'cmvy9o5vr02d2bogyuw87v8ov', E'cmvy9o5vp02cwbogyvvvx5ht1', E'cmvy9o5j0012obogyb8y8hivp', E'SHORT_ANSWER', E'3', NULL, NULL, NULL, E'Rewrite in the passive voice: They have built a new bridge.', NULL, E'"A new bridge has been built by them."', E'["A new bridge has been built","A new bridge has been built by them"]', NULL, NULL, NULL, FALSE, FALSE, 2, 3, NULL, NULL, NULL, '2026-11-01T20:12:36.423Z', '2026-11-01T20:12:36.423Z'),
(E'cmvy9o5vs02d4bogyx8cygn37', E'cmvy9o5vp02cwbogyvvvx5ht1', E'cmvy9o5j0012obogyb8y8hivp', E'SHORT_ANSWER', E'4', NULL, NULL, NULL, E'Rewrite in the passive voice: The pupils will clean the classroom.', NULL, E'"The classroom will be cleaned by the pupils."', E'["The classroom will be cleaned by the pupils"]', NULL, NULL, NULL, FALSE, FALSE, 2, 4, NULL, NULL, NULL, '2026-11-01T20:12:36.424Z', '2026-11-01T20:12:36.424Z'),
(E'cmvy9o5vt02d6bogyqzdg8l8u', E'cmvy9o5vp02cwbogyvvvx5ht1', E'cmvy9o5j0012obogyb8y8hivp', E'SHORT_ANSWER', E'5', NULL, NULL, NULL, E'Rewrite in the active voice: The letter was written by Ali.', NULL, E'"Ali wrote the letter."', E'["Ali wrote the letter"]', NULL, NULL, NULL, FALSE, FALSE, 2, 5, NULL, NULL, NULL, '2026-11-01T20:12:36.425Z', '2026-11-01T20:12:36.425Z'),
(E'cmvy9o5vv02d8bogyws048too', E'cmvy9o5vp02cwbogyvvvx5ht1', E'cmvy9o5j0012obogyb8y8hivp', E'MULTIPLE_CHOICE', E'6', NULL, NULL, NULL, E'Choose the passive form: ''Who painted this picture?''', E'["By whom was this picture painted?","Who was painted this picture?","This picture painted by whom?","By who this picture was painted?"]', E'"By whom was this picture painted?"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 6, NULL, NULL, NULL, '2026-11-01T20:12:36.428Z', '2026-11-01T20:12:36.428Z'),
(E'cmvy9o5vw02dabogyue5te2p1', E'cmvy9o5vp02cwbogyvvvx5ht1', E'cmvy9o5j0012obogyb8y8hivp', E'SHORT_ANSWER', E'7', NULL, NULL, NULL, E'Rewrite in the passive: She helped me.', NULL, E'"I was helped by her."', E'["I was helped by her"]', NULL, NULL, NULL, FALSE, FALSE, 2, 7, NULL, NULL, NULL, '2026-11-01T20:12:36.429Z', '2026-11-01T20:12:36.429Z'),
(E'cmvy9o5wz02hcbogyk6sbwrlr', E'cmvy9o5ws02gwbogyyx7cnq37', E'cmvy9o5jb013ubogy3gfs6bdc', E'NUMERIC', E'8', NULL, NULL, NULL, E'How many countries are there in Africa?', NULL, E'54', NULL, NULL, NULL, 0, FALSE, FALSE, 2, 8, NULL, NULL, NULL, '2026-11-01T20:12:36.468Z', '2026-11-01T20:12:36.468Z'),
(E'cmvy9o5vx02dcbogy4za0kwi0', E'cmvy9o5vp02cwbogyvvvx5ht1', E'cmvy9o5j0012obogyb8y8hivp', E'SHORT_ANSWER', E'8', NULL, NULL, NULL, E'Rewrite beginning with the given words: Someone has stolen my bag. → My bag ...', NULL, E'"My bag has been stolen."', E'["My bag has been stolen","My bag has been stolen by someone"]', NULL, NULL, NULL, FALSE, FALSE, 2, 8, NULL, NULL, NULL, '2026-11-01T20:12:36.429Z', '2026-11-01T20:12:36.429Z'),
(E'cmvy9o5vz02dibogydet2gxto', E'cmvy9o5vy02dgbogy2wkrorpm', E'cmvy9o5j0012mbogyg0afmu2y', E'SHORT_ANSWER', E'1', NULL, NULL, NULL, E'Change to indirect speech: "I am going to Jinja," said Paul.', NULL, E'"Paul said that he was going to Jinja."', E'["Paul said that he was going to Jinja","Paul said he was going to Jinja"]', NULL, NULL, NULL, FALSE, FALSE, 2, 1, NULL, NULL, NULL, '2026-11-01T20:12:36.431Z', '2026-11-01T20:12:36.431Z'),
(E'cmvy9o5vz02dkbogykz0hd2e1', E'cmvy9o5vy02dgbogy2wkrorpm', E'cmvy9o5j0012mbogyg0afmu2y', E'SHORT_ANSWER', E'2', NULL, NULL, NULL, E'Change to indirect speech: "Where do you live?" the man asked me.', NULL, E'"The man asked me where I lived."', E'["The man asked me where I lived","The man asked where I lived"]', NULL, NULL, NULL, FALSE, FALSE, 2, 2, NULL, NULL, NULL, '2026-11-01T20:12:36.431Z', '2026-11-01T20:12:36.431Z'),
(E'cmvy9o5vz02dmbogy2p4k11td', E'cmvy9o5vy02dgbogy2wkrorpm', E'cmvy9o5j0012mbogyg0afmu2y', E'SHORT_ANSWER', E'3', NULL, NULL, NULL, E'Change to indirect speech: "Don''t touch the wire," the teacher told the boys.', NULL, E'"The teacher told the boys not to touch the wire."', E'["The teacher told the boys not to touch the wire"]', NULL, NULL, NULL, FALSE, FALSE, 2, 3, NULL, NULL, NULL, '2026-11-01T20:12:36.432Z', '2026-11-01T20:12:36.432Z'),
(E'cmvy9o5vz02dobogycy7sh4xg', E'cmvy9o5vy02dgbogy2wkrorpm', E'cmvy9o5j0012mbogyg0afmu2y', E'SHORT_ANSWER', E'4', NULL, NULL, NULL, E'Change to indirect speech: "I will see you tomorrow," she said.', NULL, E'"She said that she would see me the following day."', E'["She said that she would see me the next day","She said she would see me the following day","She said she would see me the next day"]', NULL, NULL, NULL, FALSE, FALSE, 2, 4, NULL, NULL, NULL, '2026-11-01T20:12:36.432Z', '2026-11-01T20:12:36.432Z'),
(E'cmvy9o5w002dqbogyne42htqq', E'cmvy9o5vy02dgbogy2wkrorpm', E'cmvy9o5j0012mbogyg0afmu2y', E'MULTIPLE_CHOICE', E'5', NULL, NULL, NULL, E'"Can you swim?" Joy asked Tom. → Joy asked Tom ______.', E'["if he could swim","can he swim","if he can swim","whether can he swim"]', E'"if he could swim"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 5, NULL, NULL, NULL, '2026-11-01T20:12:36.432Z', '2026-11-01T20:12:36.432Z'),
(E'cmvy9o5w002dsbogym6abc1kn', E'cmvy9o5vy02dgbogy2wkrorpm', E'cmvy9o5j0012mbogyg0afmu2y', E'SHORT_ANSWER', E'6', NULL, NULL, NULL, E'Change to direct speech: Mother told me to wash the plates.', NULL, E'"\\"Wash the plates,\\" Mother told me."', E'["Mother said, \\"Wash the plates.\\"","\\"Wash the plates,\\" said Mother.","Mother told me, \\"Wash the plates.\\""]', NULL, NULL, NULL, FALSE, FALSE, 2, 6, NULL, NULL, NULL, '2026-11-01T20:12:36.433Z', '2026-11-01T20:12:36.433Z'),
(E'cmvy9o5w102dubogyqxp4gmy0', E'cmvy9o5vy02dgbogy2wkrorpm', E'cmvy9o5j0012mbogyg0afmu2y', E'SHORT_ANSWER', E'7', NULL, NULL, NULL, E'Change to indirect speech: "We visited the zoo yesterday," the pupils said.', NULL, E'"The pupils said that they had visited the zoo the previous day."', E'["The pupils said that they had visited the zoo the day before","The pupils said they had visited the zoo the previous day"]', NULL, NULL, NULL, FALSE, FALSE, 2, 7, NULL, NULL, NULL, '2026-11-01T20:12:36.433Z', '2026-11-01T20:12:36.433Z'),
(E'cmvy9o5w202dybogyrwb12432', E'cmvy9o5w102dwbogyldlpedwe', E'cmvy9o5j1012sbogyqw6b89bb', E'COMPREHENSION', E'1', NULL, E'Every morning before the sun rose, Akello carried a yellow jerrycan to the village well. The well was two kilometres away, and the path went through a eucalyptus forest where monkeys chattered in the trees. Akello did not mind the long walk because she met her friend Opio there, and they always raced each other back home.

One day, the well was dry. The long dry season had lasted four months, and the water level had dropped below the pump. The villagers gathered around and talked worriedly. Without water, the children could not bathe before school, the cattle grew thin, and the gardens of cassava and beans began to wither.

Akello''s grandmother, Nyakato, remembered a spring at the foot of Ongom Hill that her own mother had used long ago. She led the elders there, and after clearing away the bushes and stones, clean water bubbled out of the ground. The villagers built a small concrete wall around the spring to protect it, and the local council promised to dig a borehole before the next dry season.

Akello learnt an important lesson: the knowledge of old people can save a whole village.', NULL, E'Where did Akello go every morning?', NULL, E'"To the village well"', E'["the village well","village well","to the well","the well"]', NULL, E'To the village well', NULL, FALSE, FALSE, 2, 1, NULL, NULL, NULL, '2026-11-01T20:12:36.434Z', '2026-11-01T20:12:36.434Z'),
(E'cmvy9o5w202e0bogyn87mff1e', E'cmvy9o5w102dwbogyldlpedwe', E'cmvy9o5j1012sbogyqw6b89bb', E'COMPREHENSION', E'2', NULL, E'Every morning before the sun rose, Akello carried a yellow jerrycan to the village well. The well was two kilometres away, and the path went through a eucalyptus forest where monkeys chattered in the trees. Akello did not mind the long walk because she met her friend Opio there, and they always raced each other back home.

One day, the well was dry. The long dry season had lasted four months, and the water level had dropped below the pump. The villagers gathered around and talked worriedly. Without water, the children could not bathe before school, the cattle grew thin, and the gardens of cassava and beans began to wither.

Akello''s grandmother, Nyakato, remembered a spring at the foot of Ongom Hill that her own mother had used long ago. She led the elders there, and after clearing away the bushes and stones, clean water bubbled out of the ground. The villagers built a small concrete wall around the spring to protect it, and the local council promised to dig a borehole before the next dry season.

Akello learnt an important lesson: the knowledge of old people can save a whole village.', NULL, E'How far was the well from Akello''s home?', NULL, E'"Two kilometres"', E'["2 kilometres","2 km","two km","two kilometers"]', NULL, E'Two kilometres', NULL, FALSE, FALSE, 2, 2, NULL, NULL, NULL, '2026-11-01T20:12:36.434Z', '2026-11-01T20:12:36.434Z'),
(E'cmvy9o5w202e2bogyydarfw01', E'cmvy9o5w102dwbogyldlpedwe', E'cmvy9o5j1012sbogyqw6b89bb', E'COMPREHENSION', E'3', NULL, E'Every morning before the sun rose, Akello carried a yellow jerrycan to the village well. The well was two kilometres away, and the path went through a eucalyptus forest where monkeys chattered in the trees. Akello did not mind the long walk because she met her friend Opio there, and they always raced each other back home.

One day, the well was dry. The long dry season had lasted four months, and the water level had dropped below the pump. The villagers gathered around and talked worriedly. Without water, the children could not bathe before school, the cattle grew thin, and the gardens of cassava and beans began to wither.

Akello''s grandmother, Nyakato, remembered a spring at the foot of Ongom Hill that her own mother had used long ago. She led the elders there, and after clearing away the bushes and stones, clean water bubbled out of the ground. The villagers built a small concrete wall around the spring to protect it, and the local council promised to dig a borehole before the next dry season.

Akello learnt an important lesson: the knowledge of old people can save a whole village.', NULL, E'Why didn''t Akello mind the long walk?', NULL, E'"Because she met her friend Opio there and they raced each other home."', E'["she met her friend Opio","because she met Opio","she met her friend"]', NULL, E'Because she met her friend Opio there and they raced each other home.', NULL, FALSE, FALSE, 2, 3, NULL, NULL, NULL, '2026-11-01T20:12:36.435Z', '2026-11-01T20:12:36.435Z'),
(E'cmvy9o5wh02fmbogyx4t9tqau', E'cmvy9o5wf02febogyb2i70si2', E'cmvy9o5j5013ibogyqvsh5fvi', E'SHORT_ANSWER', E'4', NULL, NULL, NULL, E'State one safety precaution when using electricity at home.', NULL, E'"Do not touch switches with wet hands / do not overload sockets / use fuses."', E'["do not touch switches with wet hands","never touch electrical appliances with wet hands","do not overload sockets","use fuses","switch off the mains before repairs","avoid overloading sockets"]', NULL, NULL, NULL, FALSE, FALSE, 2, 4, NULL, NULL, NULL, '2026-11-01T20:12:36.449Z', '2026-11-01T20:12:36.449Z'),
(E'cmvy9o5wh02fobogy7tc1ugcp', E'cmvy9o5wf02febogyb2i70si2', E'cmvy9o5j5013ibogyqvsh5fvi', E'FILL_BLANK', E'5', NULL, NULL, NULL, E'Like poles of a magnet ______ each other.', NULL, E'"repel"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 5, NULL, NULL, NULL, '2026-11-01T20:12:36.449Z', '2026-11-01T20:12:36.449Z'),
(E'cmvy9o5w302e4bogyare8xpo5', E'cmvy9o5w102dwbogyldlpedwe', E'cmvy9o5j1012sbogyqw6b89bb', E'COMPREHENSION', E'4', NULL, E'Every morning before the sun rose, Akello carried a yellow jerrycan to the village well. The well was two kilometres away, and the path went through a eucalyptus forest where monkeys chattered in the trees. Akello did not mind the long walk because she met her friend Opio there, and they always raced each other back home.

One day, the well was dry. The long dry season had lasted four months, and the water level had dropped below the pump. The villagers gathered around and talked worriedly. Without water, the children could not bathe before school, the cattle grew thin, and the gardens of cassava and beans began to wither.

Akello''s grandmother, Nyakato, remembered a spring at the foot of Ongom Hill that her own mother had used long ago. She led the elders there, and after clearing away the bushes and stones, clean water bubbled out of the ground. The villagers built a small concrete wall around the spring to protect it, and the local council promised to dig a borehole before the next dry season.

Akello learnt an important lesson: the knowledge of old people can save a whole village.', NULL, E'What caused the well to dry up?', NULL, E'"The long dry season that lasted four months made the water level drop below the pump."', E'["the long dry season","dry season","the water level dropped"]', NULL, E'The long dry season that lasted four months made the water level drop below the pump.', NULL, FALSE, FALSE, 2, 4, NULL, NULL, NULL, '2026-11-01T20:12:36.435Z', '2026-11-01T20:12:36.435Z'),
(E'cmvy9o5w302e6bogydm3jan63', E'cmvy9o5w102dwbogyldlpedwe', E'cmvy9o5j1012sbogyqw6b89bb', E'COMPREHENSION', E'5', NULL, E'Every morning before the sun rose, Akello carried a yellow jerrycan to the village well. The well was two kilometres away, and the path went through a eucalyptus forest where monkeys chattered in the trees. Akello did not mind the long walk because she met her friend Opio there, and they always raced each other back home.

One day, the well was dry. The long dry season had lasted four months, and the water level had dropped below the pump. The villagers gathered around and talked worriedly. Without water, the children could not bathe before school, the cattle grew thin, and the gardens of cassava and beans began to wither.

Akello''s grandmother, Nyakato, remembered a spring at the foot of Ongom Hill that her own mother had used long ago. She led the elders there, and after clearing away the bushes and stones, clean water bubbled out of the ground. The villagers built a small concrete wall around the spring to protect it, and the local council promised to dig a borehole before the next dry season.

Akello learnt an important lesson: the knowledge of old people can save a whole village.', NULL, E'Give one problem the villagers faced without water.', NULL, E'"Children could not bathe before school / cattle grew thin / gardens withered."', E'["children could not bathe","cattle grew thin","gardens withered","the gardens began to wither","cattle became thin"]', NULL, E'Children could not bathe before school / cattle grew thin / gardens withered.', NULL, FALSE, FALSE, 2, 5, NULL, NULL, NULL, '2026-11-01T20:12:36.436Z', '2026-11-01T20:12:36.436Z'),
(E'cmvy9o5w402e8bogyzs6ynda6', E'cmvy9o5w102dwbogyldlpedwe', E'cmvy9o5j1012sbogyqw6b89bb', E'COMPREHENSION', E'6', NULL, E'Every morning before the sun rose, Akello carried a yellow jerrycan to the village well. The well was two kilometres away, and the path went through a eucalyptus forest where monkeys chattered in the trees. Akello did not mind the long walk because she met her friend Opio there, and they always raced each other back home.

One day, the well was dry. The long dry season had lasted four months, and the water level had dropped below the pump. The villagers gathered around and talked worriedly. Without water, the children could not bathe before school, the cattle grew thin, and the gardens of cassava and beans began to wither.

Akello''s grandmother, Nyakato, remembered a spring at the foot of Ongom Hill that her own mother had used long ago. She led the elders there, and after clearing away the bushes and stones, clean water bubbled out of the ground. The villagers built a small concrete wall around the spring to protect it, and the local council promised to dig a borehole before the next dry season.

Akello learnt an important lesson: the knowledge of old people can save a whole village.', NULL, E'Who remembered the spring at the foot of Ongom Hill?', NULL, E'"Akello''s grandmother, Nyakato"', E'["Nyakato","Akello''s grandmother","her grandmother","the grandmother"]', NULL, E'Akello''s grandmother, Nyakato', NULL, FALSE, FALSE, 2, 6, NULL, NULL, NULL, '2026-11-01T20:12:36.436Z', '2026-11-01T20:12:36.436Z')
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "Question" ("id", "paperId", "topicId", "type", "displayNumber", "section", "stimulus", "imageUrl", "prompt", "options", "correctAnswer", "acceptedAnswers", "explanation", "markingGuide", "numericTolerance", "caseSensitive", "requiresTeacher", "points", "order", "parentId", "unit", "partialRule", "createdAt", "updatedAt") VALUES
(E'cmvy9o5w402eabogy7vlc3661', E'cmvy9o5w102dwbogyldlpedwe', E'cmvy9o5j1012sbogyqw6b89bb', E'COMPREHENSION', E'7', NULL, E'Every morning before the sun rose, Akello carried a yellow jerrycan to the village well. The well was two kilometres away, and the path went through a eucalyptus forest where monkeys chattered in the trees. Akello did not mind the long walk because she met her friend Opio there, and they always raced each other back home.

One day, the well was dry. The long dry season had lasted four months, and the water level had dropped below the pump. The villagers gathered around and talked worriedly. Without water, the children could not bathe before school, the cattle grew thin, and the gardens of cassava and beans began to wither.

Akello''s grandmother, Nyakato, remembered a spring at the foot of Ongom Hill that her own mother had used long ago. She led the elders there, and after clearing away the bushes and stones, clean water bubbled out of the ground. The villagers built a small concrete wall around the spring to protect it, and the local council promised to dig a borehole before the next dry season.

Akello learnt an important lesson: the knowledge of old people can save a whole village.', NULL, E'What did the local council promise to do?', NULL, E'"To dig a borehole before the next dry season"', E'["dig a borehole","to dig a borehole"]', NULL, E'To dig a borehole before the next dry season', NULL, FALSE, FALSE, 2, 7, NULL, NULL, NULL, '2026-11-01T20:12:36.436Z', '2026-11-01T20:12:36.436Z'),
(E'cmvy9o5w402ecbogy26vycueo', E'cmvy9o5w102dwbogyldlpedwe', E'cmvy9o5j1012sbogyqw6b89bb', E'COMPREHENSION', E'8', NULL, E'Every morning before the sun rose, Akello carried a yellow jerrycan to the village well. The well was two kilometres away, and the path went through a eucalyptus forest where monkeys chattered in the trees. Akello did not mind the long walk because she met her friend Opio there, and they always raced each other back home.

One day, the well was dry. The long dry season had lasted four months, and the water level had dropped below the pump. The villagers gathered around and talked worriedly. Without water, the children could not bathe before school, the cattle grew thin, and the gardens of cassava and beans began to wither.

Akello''s grandmother, Nyakato, remembered a spring at the foot of Ongom Hill that her own mother had used long ago. She led the elders there, and after clearing away the bushes and stones, clean water bubbled out of the ground. The villagers built a small concrete wall around the spring to protect it, and the local council promised to dig a borehole before the next dry season.

Akello learnt an important lesson: the knowledge of old people can save a whole village.', NULL, E'Write another word or phrase that means the same as ''wither'' as used in the passage.', NULL, E'"dry up"', E'["dry up","shrivel","die","become dry","wilt"]', NULL, E'dry up', NULL, FALSE, FALSE, 2, 8, NULL, NULL, NULL, '2026-11-01T20:12:36.437Z', '2026-11-01T20:12:36.437Z'),
(E'cmvy9o5wh02fqbogyjx0wly5q', E'cmvy9o5wf02febogyb2i70si2', E'cmvy9o5j5013ibogyqvsh5fvi', E'MULTIPLE_CHOICE', E'6', NULL, NULL, NULL, E'Which of these materials is attracted by a magnet?', E'["Aluminium","Copper","Iron","Brass"]', E'"Iron"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 6, NULL, NULL, NULL, '2026-11-01T20:12:36.450Z', '2026-11-01T20:12:36.450Z'),
(E'cmvy9o5wi02fsbogyevf67mhe', E'cmvy9o5wf02febogyb2i70si2', E'cmvy9o5j5013ibogyqvsh5fvi', E'SHORT_ANSWER', E'7', NULL, NULL, NULL, E'What energy change takes place in an electric bulb?', NULL, E'"Electrical energy to light and heat energy."', E'["electrical to light and heat","electrical to light","electric energy to light energy and heat energy"]', NULL, NULL, NULL, FALSE, FALSE, 2, 7, NULL, NULL, NULL, '2026-11-01T20:12:36.450Z', '2026-11-01T20:12:36.450Z'),
(E'cmvy9o5w502eebogy633wu15w', E'cmvy9o5w102dwbogyldlpedwe', E'cmvy9o5j1012sbogyqw6b89bb', E'COMPREHENSION', E'9', NULL, E'Every morning before the sun rose, Akello carried a yellow jerrycan to the village well. The well was two kilometres away, and the path went through a eucalyptus forest where monkeys chattered in the trees. Akello did not mind the long walk because she met her friend Opio there, and they always raced each other back home.

One day, the well was dry. The long dry season had lasted four months, and the water level had dropped below the pump. The villagers gathered around and talked worriedly. Without water, the children could not bathe before school, the cattle grew thin, and the gardens of cassava and beans began to wither.

Akello''s grandmother, Nyakato, remembered a spring at the foot of Ongom Hill that her own mother had used long ago. She led the elders there, and after clearing away the bushes and stones, clean water bubbled out of the ground. The villagers built a small concrete wall around the spring to protect it, and the local council promised to dig a borehole before the next dry season.

Akello learnt an important lesson: the knowledge of old people can save a whole village.', NULL, E'What lesson did Akello learn?', NULL, E'"The knowledge of old people can save a whole village."', E'["knowledge of old people can save a village","old people''s knowledge is important","the knowledge of elders can save a village"]', NULL, E'The knowledge of old people can save a whole village.', NULL, FALSE, FALSE, 2, 9, NULL, NULL, NULL, '2026-11-01T20:12:36.437Z', '2026-11-01T20:12:36.437Z'),
(E'cmvy9o5w502egbogy5zi7gys9', E'cmvy9o5w102dwbogyldlpedwe', E'cmvy9o5j1012sbogyqw6b89bb', E'COMPREHENSION', E'10', NULL, E'Every morning before the sun rose, Akello carried a yellow jerrycan to the village well. The well was two kilometres away, and the path went through a eucalyptus forest where monkeys chattered in the trees. Akello did not mind the long walk because she met her friend Opio there, and they always raced each other back home.

One day, the well was dry. The long dry season had lasted four months, and the water level had dropped below the pump. The villagers gathered around and talked worriedly. Without water, the children could not bathe before school, the cattle grew thin, and the gardens of cassava and beans began to wither.

Akello''s grandmother, Nyakato, remembered a spring at the foot of Ongom Hill that her own mother had used long ago. She led the elders there, and after clearing away the bushes and stones, clean water bubbled out of the ground. The villagers built a small concrete wall around the spring to protect it, and the local council promised to dig a borehole before the next dry season.

Akello learnt an important lesson: the knowledge of old people can save a whole village.', NULL, E'Suggest a suitable title for this passage.', NULL, E'"The Village Well"', E'["The Dry Well","Akello and the Well","The Spring at Ongom Hill","Water for the Village","The Village Well"]', NULL, E'The Village Well', NULL, FALSE, FALSE, 2, 10, NULL, NULL, NULL, '2026-11-01T20:12:36.438Z', '2026-11-01T20:12:36.438Z'),
(E'cmvy9o5w702embogy3y13ksw7', E'cmvy9o5w602ekbogychxc1jgd', E'cmvy9o5j30132bogy4n1qk37k', E'MULTIPLE_CHOICE', E'1', NULL, NULL, NULL, E'Which blood vessels carry blood away from the heart?', E'["Veins","Arteries","Capillaries","Valves"]', E'"Arteries"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 1, NULL, NULL, NULL, '2026-11-01T20:12:36.439Z', '2026-11-01T20:12:36.439Z'),
(E'cmvy9o5w702eobogy47ups7gt', E'cmvy9o5w602ekbogychxc1jgd', E'cmvy9o5j30132bogy4n1qk37k', E'SHORT_ANSWER', E'2', NULL, NULL, NULL, E'Name the substance in red blood cells that carries oxygen.', NULL, E'"Haemoglobin"', E'["hemoglobin"]', NULL, NULL, NULL, FALSE, FALSE, 2, 2, NULL, NULL, NULL, '2026-11-01T20:12:36.440Z', '2026-11-01T20:12:36.440Z'),
(E'cmvy9o5w802eqbogys8qa11o6', E'cmvy9o5w602ekbogychxc1jgd', E'cmvy9o5j30132bogy4n1qk37k', E'MULTIPLE_CHOICE', E'3', NULL, NULL, NULL, E'Which chamber of the heart has the thickest wall?', E'["Right atrium","Left atrium","Right ventricle","Left ventricle"]', E'"Left ventricle"', NULL, E'It pumps blood to the whole body.', NULL, NULL, FALSE, FALSE, 1, 3, NULL, NULL, NULL, '2026-11-01T20:12:36.440Z', '2026-11-01T20:12:36.440Z'),
(E'cmvy9o5w802esbogyvtiy6y1y', E'cmvy9o5w602ekbogychxc1jgd', E'cmvy9o5j30132bogy4n1qk37k', E'SHORT_ANSWER', E'4', NULL, NULL, NULL, E'State the function of white blood cells.', NULL, E'"They fight germs / defend the body against disease."', E'["fight germs","fight diseases","defend the body against disease","kill germs","protect the body against diseases"]', NULL, NULL, NULL, FALSE, FALSE, 2, 4, NULL, NULL, NULL, '2026-11-01T20:12:36.441Z', '2026-11-01T20:12:36.441Z'),
(E'cmvy9o5w802eubogy9e8zhn34', E'cmvy9o5w602ekbogychxc1jgd', E'cmvy9o5j30132bogy4n1qk37k', E'FILL_BLANK', E'5', NULL, NULL, NULL, E'Blood group ______ is called the universal donor.', NULL, E'"O"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 5, NULL, NULL, NULL, '2026-11-01T20:12:36.441Z', '2026-11-01T20:12:36.441Z'),
(E'cmvy9o5w902ewbogyh3dvhjvd', E'cmvy9o5w602ekbogychxc1jgd', E'cmvy9o5j30132bogy4n1qk37k', E'SHORT_ANSWER', E'6', NULL, NULL, NULL, E'Why do veins have valves?', NULL, E'"To prevent the backflow of blood."', E'["to stop blood flowing backwards","prevent backflow of blood","to prevent blood from flowing back"]', NULL, NULL, NULL, FALSE, FALSE, 2, 6, NULL, NULL, NULL, '2026-11-01T20:12:36.441Z', '2026-11-01T20:12:36.441Z'),
(E'cmvy9o5w902eybogy0c9h6ly4', E'cmvy9o5w602ekbogychxc1jgd', E'cmvy9o5j30132bogy4n1qk37k', E'MULTIPLE_CHOICE', E'7', NULL, NULL, NULL, E'Which structure closes the windpipe when swallowing food?', E'["Larynx","Epiglottis","Trachea","Diaphragm"]', E'"Epiglottis"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 7, NULL, NULL, NULL, '2026-11-01T20:12:36.442Z', '2026-11-01T20:12:36.442Z'),
(E'cmvy9o5wc02f0bogyobl5jg0g', E'cmvy9o5w602ekbogychxc1jgd', E'cmvy9o5j30132bogy4n1qk37k', E'SHORT_ANSWER', E'8', NULL, NULL, NULL, E'Name the tiny air sacs in the lungs where gaseous exchange takes place.', NULL, E'"Alveoli"', E'["alveolus","air sacs"]', NULL, NULL, NULL, FALSE, FALSE, 2, 8, NULL, NULL, NULL, '2026-11-01T20:12:36.444Z', '2026-11-01T20:12:36.444Z'),
(E'cmvy9o5wc02f2bogy6lb1ru4q', E'cmvy9o5w602ekbogychxc1jgd', E'cmvy9o5j30132bogy4n1qk37k', E'MULTIPLE_CHOICE', E'9', NULL, NULL, NULL, E'What happens to the diaphragm when we breathe in?', E'["It relaxes and moves up","It contracts and flattens","It does not move","It moves sideways"]', E'"It contracts and flattens"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 9, NULL, NULL, NULL, '2026-11-01T20:12:36.445Z', '2026-11-01T20:12:36.445Z'),
(E'cmvy9o5wd02f4bogytmijajiu', E'cmvy9o5w602ekbogychxc1jgd', E'cmvy9o5j30132bogy4n1qk37k', E'SHORT_ANSWER', E'10', NULL, NULL, NULL, E'Give one way in which alveoli are adapted for gaseous exchange.', NULL, E'"They have thin walls / are moist / are many / are surrounded by many capillaries."', E'["thin walls","moist","many capillaries","large surface area","they are many","surrounded by capillaries"]', NULL, NULL, NULL, FALSE, FALSE, 2, 10, NULL, NULL, NULL, '2026-11-01T20:12:36.445Z', '2026-11-01T20:12:36.445Z'),
(E'cmvy9o5wd02f6bogy7mkoxgol', E'cmvy9o5w602ekbogychxc1jgd', E'cmvy9o5j30132bogy4n1qk37k', E'SHORT_ANSWER', E'11', NULL, NULL, NULL, E'Name the disease prevented by the BCG vaccine.', NULL, E'"Tuberculosis"', E'["TB"]', NULL, NULL, NULL, FALSE, FALSE, 2, 11, NULL, NULL, NULL, '2026-11-01T20:12:36.446Z', '2026-11-01T20:12:36.446Z'),
(E'cmvy9o5wd02f8bogygupxfgdo', E'cmvy9o5w602ekbogychxc1jgd', E'cmvy9o5j30132bogy4n1qk37k', E'SHORT_ANSWER', E'12', NULL, NULL, NULL, E'Give one way of preventing anaemia.', NULL, E'"Eating iron-rich foods such as liver, greens and beans."', E'["eating iron rich foods","eating food rich in iron","eat liver","eat green vegetables","eating greens"]', NULL, NULL, NULL, FALSE, FALSE, 2, 12, NULL, NULL, NULL, '2026-11-01T20:12:36.446Z', '2026-11-01T20:12:36.446Z'),
(E'cmvy9o5we02fabogy7c74u0ms', E'cmvy9o5w602ekbogychxc1jgd', E'cmvy9o5j30132bogy4n1qk37k', E'DRAWING', E'13', NULL, NULL, NULL, E'Draw a simple diagram of the heart and label the left ventricle.', NULL, E'"Award marks for a four-chambered shape (1) and left ventricle correctly labelled on the viewer''s right-hand lower chamber (1)."', NULL, NULL, E'Award marks for a four-chambered shape (1) and left ventricle correctly labelled on the viewer''s right-hand lower chamber (1).', NULL, FALSE, FALSE, 2, 13, NULL, NULL, NULL, '2026-11-01T20:12:36.446Z', '2026-11-01T20:12:36.446Z'),
(E'cmvy9o5wg02fgbogyog9qjw03', E'cmvy9o5wf02febogyb2i70si2', E'cmvy9o5j5013ibogyqvsh5fvi', E'MULTIPLE_CHOICE', E'1', NULL, NULL, NULL, E'Which of these is a good conductor of electricity?', E'["Rubber","Copper","Dry wood","Glass"]', E'"Copper"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 1, NULL, NULL, NULL, '2026-11-01T20:12:36.448Z', '2026-11-01T20:12:36.448Z'),
(E'cmvy9o5wg02fibogyufii2th5', E'cmvy9o5wf02febogyb2i70si2', E'cmvy9o5j5013ibogyqvsh5fvi', E'SHORT_ANSWER', E'2', NULL, NULL, NULL, E'Name the part of a dry cell that acts as the positive terminal.', NULL, E'"Carbon rod"', E'["the carbon rod","carbon"]', NULL, NULL, NULL, FALSE, FALSE, 2, 2, NULL, NULL, NULL, '2026-11-01T20:12:36.448Z', '2026-11-01T20:12:36.448Z'),
(E'cmvy9o5wg02fkbogy52zaegp3', E'cmvy9o5wf02febogyb2i70si2', E'cmvy9o5j5013ibogyqvsh5fvi', E'MULTIPLE_CHOICE', E'3', NULL, NULL, NULL, E'In a series circuit with three bulbs, what happens when one bulb blows?', E'["The other two become brighter","The other two stay the same","All the bulbs go off","Only the blown bulb goes off"]', E'"All the bulbs go off"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 3, NULL, NULL, NULL, '2026-11-01T20:12:36.449Z', '2026-11-01T20:12:36.449Z'),
(E'cmvy9o5wi02fubogyn2im39si', E'cmvy9o5wf02febogyb2i70si2', E'cmvy9o5j5013ibogyqvsh5fvi', E'SHORT_ANSWER', E'8', NULL, NULL, NULL, E'Why are house circuits wired in parallel?', NULL, E'"So that if one bulb or appliance fails, the others keep working, and each receives full voltage."', E'["so that other bulbs stay on when one blows","each appliance can be switched independently","bulbs remain bright","if one bulb blows others remain on"]', NULL, NULL, NULL, FALSE, FALSE, 2, 8, NULL, NULL, NULL, '2026-11-01T20:12:36.451Z', '2026-11-01T20:12:36.451Z'),
(E'cmvy9o5wj02fwbogyiuvcfvby', E'cmvy9o5wf02febogyb2i70si2', E'cmvy9o5j5013ibogyqvsh5fvi', E'SHORT_ANSWER', E'9', NULL, NULL, NULL, E'What is the function of a fuse in a circuit?', NULL, E'"It melts and breaks the circuit when too much current flows, protecting appliances."', E'["breaks the circuit when there is too much current","protects appliances from excess current","it melts when current is too high","cuts off excess current"]', NULL, NULL, NULL, FALSE, FALSE, 2, 9, NULL, NULL, NULL, '2026-11-01T20:12:36.451Z', '2026-11-01T20:12:36.451Z'),
(E'cmvy9o5wj02fybogydh18tvwo', E'cmvy9o5wf02febogyb2i70si2', E'cmvy9o5j5013ibogyqvsh5fvi', E'SHORT_ANSWER', E'10', NULL, NULL, NULL, E'Name one hydro-electric power station in Uganda.', NULL, E'"Nalubaale (Owen Falls)"', E'["Owen Falls","Bujagali","Karuma","Isimba","Kiira","Nalubaale"]', NULL, NULL, NULL, FALSE, FALSE, 2, 10, NULL, NULL, NULL, '2026-11-01T20:12:36.452Z', '2026-11-01T20:12:36.452Z'),
(E'cmvy9o5wk02g0bogyr3ej3jlh', E'cmvy9o5wf02febogyb2i70si2', E'cmvy9o5j5013ibogyqvsh5fvi', E'SHORT_ANSWER', E'11', NULL, NULL, NULL, E'Give one way of destroying the magnetism of a magnet.', NULL, E'"Heating it / hammering it / dropping it."', E'["heating","hammering","dropping","heating it strongly","hammering it"]', NULL, NULL, NULL, FALSE, FALSE, 2, 11, NULL, NULL, NULL, '2026-11-01T20:12:36.452Z', '2026-11-01T20:12:36.452Z'),
(E'cmvy9o5wk02g2bogyxo576un3', E'cmvy9o5wf02febogyb2i70si2', E'cmvy9o5j5013ibogyqvsh5fvi', E'DRAWING', E'12', NULL, NULL, NULL, E'Draw a simple circuit with one cell, a switch and a bulb, using symbols.', NULL, E'"Award marks for correct cell symbol (long and short line) (1), switch and bulb symbols connected in a closed loop (1)."', NULL, NULL, E'Award marks for correct cell symbol (long and short line) (1), switch and bulb symbols connected in a closed loop (1).', NULL, FALSE, FALSE, 2, 12, NULL, NULL, NULL, '2026-11-01T20:12:36.453Z', '2026-11-01T20:12:36.453Z'),
(E'cmvy9o5wm02g8bogygv4v0mcb', E'cmvy9o5wl02g6bogyicydx4m1', E'cmvy9o5j40138bogywo1v7buj', E'MULTIPLE_CHOICE', E'1', NULL, NULL, NULL, E'Which germ causes malaria?', E'["Bacteria","Virus","Protozoa","Fungus"]', E'"Protozoa"', NULL, E'Plasmodium is a protozoan carried by the female Anopheles mosquito.', NULL, NULL, FALSE, FALSE, 1, 1, NULL, NULL, NULL, '2026-11-01T20:12:36.454Z', '2026-11-01T20:12:36.454Z'),
(E'cmvy9o5wm02gabogycvc8ghvv', E'cmvy9o5wl02g6bogyicydx4m1', E'cmvy9o5j40138bogywo1v7buj', E'SHORT_ANSWER', E'2', NULL, NULL, NULL, E'Name the vector that spreads sleeping sickness.', NULL, E'"Tsetse fly"', E'["tsetse","tse tse fly"]', NULL, NULL, NULL, FALSE, FALSE, 2, 2, NULL, NULL, NULL, '2026-11-01T20:12:36.455Z', '2026-11-01T20:12:36.455Z'),
(E'cmvy9o5wn02gcbogyhma30esq', E'cmvy9o5wl02g6bogyicydx4m1', E'cmvy9o5j40138bogywo1v7buj', E'MULTIPLE_CHOICE', E'3', NULL, NULL, NULL, E'Which of these diseases is spread through contaminated water?', E'["Measles","Cholera","Tuberculosis","Scabies"]', E'"Cholera"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 3, NULL, NULL, NULL, '2026-11-01T20:12:36.456Z', '2026-11-01T20:12:36.456Z'),
(E'cmvy9o5wn02gebogyoz6ln0xk', E'cmvy9o5wl02g6bogyicydx4m1', E'cmvy9o5j40138bogywo1v7buj', E'SHORT_ANSWER', E'4', NULL, NULL, NULL, E'Give one way of preventing the spread of airborne diseases.', NULL, E'"Covering the mouth when coughing / good ventilation / immunisation."', E'["cover the mouth when coughing","good ventilation","immunisation","opening windows","isolating the sick","wearing a mask"]', NULL, NULL, NULL, FALSE, FALSE, 2, 4, NULL, NULL, NULL, '2026-11-01T20:12:36.456Z', '2026-11-01T20:12:36.456Z'),
(E'cmvy9o5wo02ggbogygtobglq7', E'cmvy9o5wl02g6bogyicydx4m1', E'cmvy9o5j40138bogywo1v7buj', E'SHORT_ANSWER', E'5', NULL, NULL, NULL, E'Name the vaccine that protects against tuberculosis.', NULL, E'"BCG"', NULL, NULL, NULL, NULL, FALSE, FALSE, 2, 5, NULL, NULL, NULL, '2026-11-01T20:12:36.456Z', '2026-11-01T20:12:36.456Z'),
(E'cmvy9o5wo02gibogygj2ghmzn', E'cmvy9o5wl02g6bogyicydx4m1', E'cmvy9o5j40138bogywo1v7buj', E'FILL_BLANK', E'6', NULL, NULL, NULL, E'The ability of the body to resist disease is called ______.', NULL, E'"immunity"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 6, NULL, NULL, NULL, '2026-11-01T20:12:36.457Z', '2026-11-01T20:12:36.457Z'),
(E'cmvy9o5wp02gkbogyix3geewb', E'cmvy9o5wl02g6bogyicydx4m1', E'cmvy9o5j40138bogywo1v7buj', E'SHORT_ANSWER', E'7', NULL, NULL, NULL, E'State any two elements of Primary Health Care.', NULL, E'"Any two of: health education, nutrition, safe water and sanitation, maternal and child health, immunisation, control of endemic diseases, treatment of common diseases, essential drugs."', E'["health education","immunisation","proper nutrition","safe water","maternal and child health","essential drugs","sanitation","treatment of common diseases"]', NULL, NULL, NULL, FALSE, FALSE, 2, 7, NULL, NULL, NULL, '2026-11-01T20:12:36.458Z', '2026-11-01T20:12:36.458Z'),
(E'cmvy9o5wq02gmbogyzsej5kcx', E'cmvy9o5wl02g6bogyicydx4m1', E'cmvy9o5j40138bogywo1v7buj', E'SHORT_ANSWER', E'8', NULL, NULL, NULL, E'Why should a person complete the full dose of malaria medicine even when they feel better?', NULL, E'"To kill all the germs and prevent the disease from returning or becoming resistant to the drug."', E'["to kill all the germs","to prevent drug resistance","so that the disease does not come back","to kill all the parasites"]', NULL, NULL, NULL, FALSE, FALSE, 2, 8, NULL, NULL, NULL, '2026-11-01T20:12:36.458Z', '2026-11-01T20:12:36.458Z'),
(E'cmvy9o5wq02gobogy31up8txw', E'cmvy9o5wl02g6bogyicydx4m1', E'cmvy9o5j40138bogywo1v7buj', E'MULTIPLE_CHOICE', E'9', NULL, NULL, NULL, E'Hookworms enter the body mainly through:', E'["the mouth","the nose","bare feet","the eyes"]', E'"bare feet"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 9, NULL, NULL, NULL, '2026-11-01T20:12:36.459Z', '2026-11-01T20:12:36.459Z'),
(E'cmvy9o5wr02gqbogy339a89i8', E'cmvy9o5wl02g6bogyicydx4m1', E'cmvy9o5j40138bogywo1v7buj', E'SHORT_ANSWER', E'10', NULL, NULL, NULL, E'Give one sign of malaria.', NULL, E'"Fever"', E'["high temperature","shivering","headache","vomiting","joint pains","loss of appetite"]', NULL, NULL, NULL, FALSE, FALSE, 2, 10, NULL, NULL, NULL, '2026-11-01T20:12:36.459Z', '2026-11-01T20:12:36.459Z'),
(E'cmvy9o5wr02gsbogygjeuni28', E'cmvy9o5wl02g6bogyicydx4m1', E'cmvy9o5j40138bogywo1v7buj', E'LONG_ANSWER', E'11', NULL, NULL, NULL, E'Explain three ways a community can control malaria.', NULL, E'"Any three with explanation: sleeping under treated nets (prevents bites), draining stagnant water (removes breeding places), clearing bushes near homes (removes resting places), indoor residual spraying, early treatment with ACTs. 1 mark per point + 1 for explanation quality."', NULL, NULL, E'Any three with explanation: sleeping under treated nets (prevents bites), draining stagnant water (removes breeding places), clearing bushes near homes (removes resting places), indoor residual spraying, early treatment with ACTs. 1 mark per point + 1 for explanation quality.', NULL, FALSE, FALSE, 4, 11, NULL, NULL, NULL, '2026-11-01T20:12:36.460Z', '2026-11-01T20:12:36.460Z'),
(E'cmvy9o5wt02gybogygyvhdnkr', E'cmvy9o5ws02gwbogyyx7cnq37', E'cmvy9o5jb013ubogy3gfs6bdc', E'MULTIPLE_CHOICE', E'1', NULL, NULL, NULL, E'Which is the largest continent in the world?', E'["Africa","Asia","Europe","America"]', E'"Asia"', NULL, E'Africa is the second largest.', NULL, NULL, FALSE, FALSE, 1, 1, NULL, NULL, NULL, '2026-11-01T20:12:36.462Z', '2026-11-01T20:12:36.462Z'),
(E'cmvy9o5wv02h0bogy7p2y9itk', E'cmvy9o5ws02gwbogyyx7cnq37', E'cmvy9o5jb013ubogy3gfs6bdc', E'SHORT_ANSWER', E'2', NULL, NULL, NULL, E'Name the sea that separates Africa from Europe.', NULL, E'"Mediterranean Sea"', E'["the Mediterranean Sea","Mediterranean"]', NULL, NULL, NULL, FALSE, FALSE, 2, 2, NULL, NULL, NULL, '2026-11-01T20:12:36.464Z', '2026-11-01T20:12:36.464Z'),
(E'cmvy9o5ww02h2bogy3yuvq1r2', E'cmvy9o5ws02gwbogyyx7cnq37', E'cmvy9o5jb013ubogy3gfs6bdc', E'FILL_BLANK', E'3', NULL, NULL, NULL, E'The ______ Canal joins the Mediterranean Sea to the Red Sea.', NULL, E'"Suez"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 3, NULL, NULL, NULL, '2026-11-01T20:12:36.465Z', '2026-11-01T20:12:36.465Z'),
(E'cmvy9o5wy02h4bogydmdqjdic', E'cmvy9o5ws02gwbogyyx7cnq37', E'cmvy9o5jb013ubogy3gfs6bdc', E'MULTIPLE_CHOICE', E'4', NULL, NULL, NULL, E'Which line of latitude passes through Uganda?', E'["Tropic of Cancer","Equator","Tropic of Capricorn","Greenwich Meridian"]', E'"Equator"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 4, NULL, NULL, NULL, '2026-11-01T20:12:36.466Z', '2026-11-01T20:12:36.466Z'),
(E'cmvy9o5wy02h6bogy8b3ubl3e', E'cmvy9o5ws02gwbogyyx7cnq37', E'cmvy9o5jb013ubogy3gfs6bdc', E'SHORT_ANSWER', E'5', NULL, NULL, NULL, E'Give one example of a landlocked country in Africa.', NULL, E'"Uganda"', E'["Rwanda","Burundi","South Sudan","Ethiopia","Chad","Niger","Mali","Zambia","Zimbabwe","Malawi","Botswana","Lesotho","Eswatini","Burkina Faso","Central African Republic"]', NULL, NULL, NULL, FALSE, FALSE, 2, 5, NULL, NULL, NULL, '2026-11-01T20:12:36.467Z', '2026-11-01T20:12:36.467Z'),
(E'cmvy9o5wy02h8bogywvto599h', E'cmvy9o5ws02gwbogyyx7cnq37', E'cmvy9o5jb013ubogy3gfs6bdc', E'SHORT_ANSWER', E'6', NULL, NULL, NULL, E'Which country has the largest population in Africa?', NULL, E'"Nigeria"', NULL, NULL, NULL, NULL, FALSE, FALSE, 2, 6, NULL, NULL, NULL, '2026-11-01T20:12:36.467Z', '2026-11-01T20:12:36.467Z'),
(E'cmvy9o5wz02habogymfrm2zw2', E'cmvy9o5ws02gwbogyyx7cnq37', E'cmvy9o5jb013ubogy3gfs6bdc', E'SHORT_ANSWER', E'7', NULL, NULL, NULL, E'Name the largest island in Africa.', NULL, E'"Madagascar"', NULL, NULL, NULL, NULL, FALSE, FALSE, 2, 7, NULL, NULL, NULL, '2026-11-01T20:12:36.467Z', '2026-11-01T20:12:36.467Z'),
(E'cmvy9o5x002hebogygp7ud6rz', E'cmvy9o5ws02gwbogyyx7cnq37', E'cmvy9o5jb013ubogy3gfs6bdc', E'SHORT_ANSWER', E'9', NULL, NULL, NULL, E'What is the difference in time between two places that are 45° of longitude apart (in hours)?', NULL, E'"3 hours"', E'["3","three hours","three"]', E'15° = 1 hour, so 45° = 3 hours.', NULL, NULL, FALSE, FALSE, 2, 9, NULL, NULL, NULL, '2026-11-01T20:12:36.468Z', '2026-11-01T20:12:36.468Z'),
(E'cmvy9o5x002hgbogypvv66wpx', E'cmvy9o5ws02gwbogyyx7cnq37', E'cmvy9o5jb013ubogy3gfs6bdc', E'SHORT_ANSWER', E'10', NULL, NULL, NULL, E'Why is the Suez Canal important to world trade?', NULL, E'"It shortens the sea route between Europe and Asia so ships do not have to go around the Cape of Good Hope."', E'["it shortens the sea route between Europe and Asia","ships do not go around Africa","shorter route from Europe to Asia","reduces distance between Europe and Asia"]', NULL, NULL, NULL, FALSE, FALSE, 2, 10, NULL, NULL, NULL, '2026-11-01T20:12:36.468Z', '2026-11-01T20:12:36.468Z'),
(E'cmvy9o5x002hibogydj8hp6e5', E'cmvy9o5ws02gwbogyyx7cnq37', E'cmvy9o5jb013ubogy3gfs6bdc', E'SHORT_ANSWER', E'11', NULL, NULL, NULL, E'Name the strait that separates Africa from Europe.', NULL, E'"Strait of Gibraltar"', E'["Gibraltar"]', NULL, NULL, NULL, FALSE, FALSE, 2, 11, NULL, NULL, NULL, '2026-11-01T20:12:36.469Z', '2026-11-01T20:12:36.469Z'),
(E'cmvy9o5x102hkbogyy7vmrlq9', E'cmvy9o5ws02gwbogyyx7cnq37', E'cmvy9o5jb013ubogy3gfs6bdc', E'MULTIPLE_CHOICE', E'12', NULL, NULL, NULL, E'Lines of longitude are mainly used to find:', E'["temperature","rainfall","time","altitude"]', E'"time"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 12, NULL, NULL, NULL, '2026-11-01T20:12:36.469Z', '2026-11-01T20:12:36.469Z'),
(E'cmvy9o5x302hqbogy7bp2w20z', E'cmvy9o5x202hobogyfbvnxzzm', E'cmvy9o5jd0142bogyl6gnolwm', E'SHORT_ANSWER', E'1', NULL, NULL, NULL, E'Who was the first European to see Lake Victoria and name it?', NULL, E'"John Hanning Speke"', E'["Speke","John Speke"]', NULL, NULL, NULL, FALSE, FALSE, 2, 1, NULL, NULL, NULL, '2026-11-01T20:12:36.471Z', '2026-11-01T20:12:36.471Z')
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "Question" ("id", "paperId", "topicId", "type", "displayNumber", "section", "stimulus", "imageUrl", "prompt", "options", "correctAnswer", "acceptedAnswers", "explanation", "markingGuide", "numericTolerance", "caseSensitive", "requiresTeacher", "points", "order", "parentId", "unit", "partialRule", "createdAt", "updatedAt") VALUES
(E'cmvy9o5x302hsbogyio8fsceq', E'cmvy9o5x202hobogyfbvnxzzm', E'cmvy9o5jd0142bogyl6gnolwm', E'MULTIPLE_CHOICE', E'2', NULL, NULL, NULL, E'Which explorer discovered Victoria Falls?', E'["H.M. Stanley","David Livingstone","Samuel Baker","Mungo Park"]', E'"David Livingstone"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 2, NULL, NULL, NULL, '2026-11-01T20:12:36.472Z', '2026-11-01T20:12:36.472Z'),
(E'cmvy9o5x402hubogy4s7z22b9', E'cmvy9o5x202hobogyfbvnxzzm', E'cmvy9o5jd0142bogyl6gnolwm', E'SHORT_ANSWER', E'3', NULL, NULL, NULL, E'Name the first Arab trader to arrive in Buganda.', NULL, E'"Ahmed bin Ibrahim"', E'["Ahmed Bin Ibrahim","Ahmed Ibrahim"]', NULL, NULL, NULL, FALSE, FALSE, 2, 3, NULL, NULL, NULL, '2026-11-01T20:12:36.472Z', '2026-11-01T20:12:36.472Z'),
(E'cmvy9o5x402hwbogycr10tjvi', E'cmvy9o5x202hobogyfbvnxzzm', E'cmvy9o5jd0142bogyl6gnolwm', E'SHORT_ANSWER', E'4', NULL, NULL, NULL, E'In which year did the first CMS missionaries arrive in Buganda?', NULL, E'"1877"', NULL, NULL, NULL, NULL, FALSE, FALSE, 2, 4, NULL, NULL, NULL, '2026-11-01T20:12:36.472Z', '2026-11-01T20:12:36.472Z'),
(E'cmvy9o5x402hybogy927bn2kh', E'cmvy9o5x202hobogyfbvnxzzm', E'cmvy9o5jd0142bogyl6gnolwm', E'SHORT_ANSWER', E'5', NULL, NULL, NULL, E'Who was the leader of the first Roman Catholic missionaries (White Fathers) in Buganda?', NULL, E'"Fr Simeon Lourdel (Mapeera)"', E'["Lourdel","Simeon Lourdel","Mapeera","Father Lourdel"]', NULL, NULL, NULL, FALSE, FALSE, 2, 5, NULL, NULL, NULL, '2026-11-01T20:12:36.473Z', '2026-11-01T20:12:36.473Z'),
(E'cmvy9o5x502i0bogyax4ad4lj', E'cmvy9o5x202hobogyfbvnxzzm', E'cmvy9o5jd0142bogyl6gnolwm', E'MULTIPLE_CHOICE', E'6', NULL, NULL, NULL, E'The Uganda Martyrs were killed during the reign of:', E'["Kabaka Muteesa I","Kabaka Mwanga II","Kabaka Daudi Chwa","Kabaka Suuna"]', E'"Kabaka Mwanga II"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 6, NULL, NULL, NULL, '2026-11-01T20:12:36.473Z', '2026-11-01T20:12:36.473Z'),
(E'cmvy9o5x502i2bogy0gfloyh6', E'cmvy9o5x202hobogyfbvnxzzm', E'cmvy9o5jd0142bogyl6gnolwm', E'SHORT_ANSWER', E'7', NULL, NULL, NULL, E'Give one positive effect of missionaries in Uganda.', NULL, E'"They built schools and hospitals / wrote local languages / helped end the slave trade."', E'["built schools","built hospitals","introduced formal education","wrote local languages","spread Christianity","stopped slave trade","introduced new crops"]', NULL, NULL, NULL, FALSE, FALSE, 2, 7, NULL, NULL, NULL, '2026-11-01T20:12:36.474Z', '2026-11-01T20:12:36.474Z'),
(E'cmvy9o5x602i4bogycv0fsfr4', E'cmvy9o5x202hobogyfbvnxzzm', E'cmvy9o5jd0142bogyl6gnolwm', E'SHORT_ANSWER', E'8', NULL, NULL, NULL, E'Which company administered Uganda before it became a British protectorate?', NULL, E'"Imperial British East Africa Company (IBEACo)"', E'["IBEACo","IBEA","Imperial British East Africa Company","IBEACO"]', NULL, NULL, NULL, FALSE, FALSE, 2, 8, NULL, NULL, NULL, '2026-11-01T20:12:36.474Z', '2026-11-01T20:12:36.474Z'),
(E'cmvy9o5x602i6bogygczaqjp4', E'cmvy9o5x202hobogyfbvnxzzm', E'cmvy9o5jd0142bogyl6gnolwm', E'SHORT_ANSWER', E'9', NULL, NULL, NULL, E'Name the British explorer who found Livingstone and later visited Kabaka Muteesa I.', NULL, E'"Henry Morton Stanley"', E'["H.M. Stanley","Stanley","Henry Stanley"]', NULL, NULL, NULL, FALSE, FALSE, 2, 9, NULL, NULL, NULL, '2026-11-01T20:12:36.475Z', '2026-11-01T20:12:36.475Z'),
(E'cmvy9o5x702i8bogyaeyht92s', E'cmvy9o5x202hobogyfbvnxzzm', E'cmvy9o5jd0142bogyl6gnolwm', E'SHORT_ANSWER', E'10', NULL, NULL, NULL, E'Give one reason why Arab traders came to the interior of East Africa.', NULL, E'"To get ivory and slaves."', E'["ivory","slaves","to trade in ivory and slaves","to spread Islam","to look for ivory"]', NULL, NULL, NULL, FALSE, FALSE, 2, 10, NULL, NULL, NULL, '2026-11-01T20:12:36.475Z', '2026-11-01T20:12:36.475Z'),
(E'cmvy9o5x702iabogy20vei7a3', E'cmvy9o5x202hobogyfbvnxzzm', E'cmvy9o5jd0142bogyl6gnolwm', E'SHORT_ANSWER', E'11', NULL, NULL, NULL, E'On which date are the Uganda Martyrs remembered every year?', NULL, E'"3rd June"', E'["3 June","June 3","3rd of June","June 3rd"]', NULL, NULL, NULL, FALSE, FALSE, 2, 11, NULL, NULL, NULL, '2026-11-01T20:12:36.476Z', '2026-11-01T20:12:36.476Z'),
(E'cmvy9o5x802icbogyz4wimz3q', E'cmvy9o5x202hobogyfbvnxzzm', E'cmvy9o5jd0142bogyl6gnolwm', E'LONG_ANSWER', E'12', NULL, NULL, NULL, E'Explain two negative effects of the coming of foreigners to Africa.', NULL, E'"Any two: slave trade depopulated areas; religious wars; loss of independence/colonial rule; loss of African culture and religion; exploitation of resources. 2 marks each with explanation."', NULL, NULL, E'Any two: slave trade depopulated areas; religious wars; loss of independence/colonial rule; loss of African culture and religion; exploitation of resources. 2 marks each with explanation.', NULL, FALSE, FALSE, 4, 12, NULL, NULL, NULL, '2026-11-01T20:12:36.476Z', '2026-11-01T20:12:36.476Z'),
(E'cmvy9o5x902iibogyy7v0p3um', E'cmvy9o5x902igbogy33fmvilh', E'cmvy9o5je014abogy5rakx6qh', E'SHORT_ANSWER', E'1', NULL, NULL, NULL, E'Where is the headquarters of the East African Community?', NULL, E'"Arusha, Tanzania"', E'["Arusha"]', NULL, NULL, NULL, FALSE, FALSE, 2, 1, NULL, NULL, NULL, '2026-11-01T20:12:36.478Z', '2026-11-01T20:12:36.478Z'),
(E'cmvy9o5xa02ikbogy38h0zlov', E'cmvy9o5x902igbogy33fmvilh', E'cmvy9o5je014abogy5rakx6qh', E'SHORT_ANSWER', E'2', NULL, NULL, NULL, E'Give one reason why the first East African Community collapsed in 1977.', NULL, E'"Political differences between leaders / different ideologies / unequal sharing of benefits."', E'["political differences","ideological differences","unequal sharing of benefits","Idi Amin and Nyerere disagreed","Kenya benefited more","unequal distribution of benefits"]', NULL, NULL, NULL, FALSE, FALSE, 2, 2, NULL, NULL, NULL, '2026-11-01T20:12:36.478Z', '2026-11-01T20:12:36.478Z'),
(E'cmvy9o5xa02imbogyoa15lyfn', E'cmvy9o5x902igbogy33fmvilh', E'cmvy9o5je014abogy5rakx6qh', E'MULTIPLE_CHOICE', E'3', NULL, NULL, NULL, E'Which country joined the EAC most recently (2024)?', E'["Rwanda","DR Congo","Somalia","South Sudan"]', E'"Somalia"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 3, NULL, NULL, NULL, '2026-11-01T20:12:36.479Z', '2026-11-01T20:12:36.479Z'),
(E'cmvy9o5xb02iobogy2rap6ch5', E'cmvy9o5x902igbogy33fmvilh', E'cmvy9o5je014abogy5rakx6qh', E'SHORT_ANSWER', E'4', NULL, NULL, NULL, E'Name the organisation that was replaced by the African Union in 2002.', NULL, E'"Organisation of African Unity (OAU)"', E'["OAU","Organization of African Unity"]', NULL, NULL, NULL, FALSE, FALSE, 2, 4, NULL, NULL, NULL, '2026-11-01T20:12:36.479Z', '2026-11-01T20:12:36.479Z'),
(E'cmvy9o5xe02iqbogyfnrb9vuu', E'cmvy9o5x902igbogy33fmvilh', E'cmvy9o5je014abogy5rakx6qh', E'SHORT_ANSWER', E'5', NULL, NULL, NULL, E'Where is the headquarters of the African Union?', NULL, E'"Addis Ababa, Ethiopia"', E'["Addis Ababa"]', NULL, NULL, NULL, FALSE, FALSE, 2, 5, NULL, NULL, NULL, '2026-11-01T20:12:36.482Z', '2026-11-01T20:12:36.482Z'),
(E'cmvy9o5xe02isbogy9gni8py0', E'cmvy9o5x902igbogy33fmvilh', E'cmvy9o5je014abogy5rakx6qh', E'FILL_BLANK', E'6', NULL, NULL, NULL, E'Africa Day is celebrated every year on 25th ______.', NULL, E'"May"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 6, NULL, NULL, NULL, '2026-11-01T20:12:36.483Z', '2026-11-01T20:12:36.483Z'),
(E'cmvy9o5xf02iubogyvbtn2yga', E'cmvy9o5x902igbogy33fmvilh', E'cmvy9o5je014abogy5rakx6qh', E'SHORT_ANSWER', E'7', NULL, NULL, NULL, E'Give one benefit Uganda gets from being a member of the EAC.', NULL, E'"A wider market for goods / free movement of people / shared infrastructure / peace and security."', E'["wider market","free movement","shared infrastructure","trade","peace and security","common passport","market for goods"]', NULL, NULL, NULL, FALSE, FALSE, 2, 7, NULL, NULL, NULL, '2026-11-01T20:12:36.483Z', '2026-11-01T20:12:36.483Z'),
(E'cmvy9o5xf02iwbogyzrhy1175', E'cmvy9o5x902igbogy33fmvilh', E'cmvy9o5je014abogy5rakx6qh', E'SHORT_ANSWER', E'8', NULL, NULL, NULL, E'Name the EAC organ that makes laws for the community.', NULL, E'"East African Legislative Assembly (EALA)"', E'["EALA","East African Legislative Assembly"]', NULL, NULL, NULL, FALSE, FALSE, 2, 8, NULL, NULL, NULL, '2026-11-01T20:12:36.484Z', '2026-11-01T20:12:36.484Z'),
(E'cmvy9o5xf02iybogyelyohlj8', E'cmvy9o5x902igbogy33fmvilh', E'cmvy9o5je014abogy5rakx6qh', E'MULTIPLE_CHOICE', E'9', NULL, NULL, NULL, E'The headquarters of COMESA is in:', E'["Nairobi","Lusaka","Kampala","Kigali"]', E'"Lusaka"', NULL, NULL, NULL, NULL, FALSE, FALSE, 1, 9, NULL, NULL, NULL, '2026-11-01T20:12:36.484Z', '2026-11-01T20:12:36.484Z'),
(E'cmvy9o5xg02j0bogywof2c50v', E'cmvy9o5x902igbogy33fmvilh', E'cmvy9o5je014abogy5rakx6qh', E'SHORT_ANSWER', E'10', NULL, NULL, NULL, E'Name one UN agency that helps children.', NULL, E'"UNICEF"', E'["United Nations Children''s Fund","WFP","UNESCO"]', NULL, NULL, NULL, FALSE, FALSE, 2, 10, NULL, NULL, NULL, '2026-11-01T20:12:36.484Z', '2026-11-01T20:12:36.484Z'),
(E'cmvy9o5xg02j2bogyj5nn4en8', E'cmvy9o5x902igbogy33fmvilh', E'cmvy9o5je014abogy5rakx6qh', E'SHORT_ANSWER', E'11', NULL, NULL, NULL, E'Give one challenge facing the East African Community.', NULL, E'"Different currencies / border disputes / smuggling / political instability."', E'["different currencies","border disputes","smuggling","political instability","unequal development","language differences"]', NULL, NULL, NULL, FALSE, FALSE, 2, 11, NULL, NULL, NULL, '2026-11-01T20:12:36.485Z', '2026-11-01T20:12:36.485Z')
ON CONFLICT ("id") DO NOTHING;

GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO netlifydb_readonly;
GRANT USAGE, SELECT, UPDATE ON ALL SEQUENCES IN SCHEMA public TO netlifydb_readonly;
