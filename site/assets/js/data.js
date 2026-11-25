/* Episode ledger for Monolith. Static content — no build step. */

export const CATEGORIES = [
  {
    id: "cities",
    name: "Cities & Sound",
    trend: "+24%",
    blurb: "The acoustics of public life — streets, courtyards, transit, the noise we agree to live inside.",
  },
  {
    id: "memory",
    name: "Memory & Mind",
    trend: "+18%",
    blurb: "How the ear files the past, and why some sounds never leave the body.",
  },
  {
    id: "materials",
    name: "Materials & Making",
    trend: "+11%",
    blurb: "Concrete, paper, brass, glass. The people who spend a life learning one substance.",
  },
];

export const EPISODES = [
  {
    slug: "the-shape-of-a-silence",
    number: 8,
    title: "The Shape of a Silence",
    guest: "Amara Diallo",
    role: "Sound archivist",
    place: "Dakar, Senegal",
    date: "2026-11-18",
    dateLabel: "18 Nov 2026",
    category: "cities",
    duration: 409,
    audio: "assets/audio/snowflake_03_weir_64kb.mp3",
    image: "assets/img/ep-01.jpg",
    alt: "Portrait of a woman in a black top, turned three-quarters away from a single hard light.",
    standfirst:
      "For thirty years Amara Diallo has recorded the rooms of Dakar before they are erased. We met at dawn, in a courtyard scheduled for demolition, with one microphone and no plan.",
    quote: {
      text: "A city does not vanish when the buildings come down. It vanishes when the last person stops remembering what it sounded like.",
      cite: "Amara Diallo",
    },
    chapters: [
      { t: 0, label: "Cold open — Rue 12" },
      { t: 38, label: "What a room remembers" },
      { t: 96, label: "The demolition archive" },
      { t: 188, label: "Mapping a city by ear" },
      { t: 286, label: "The last courtyard" },
      { t: 356, label: "Credits" },
    ],
    notes: [
      {
        heading: "The room is the instrument",
        paras: [
          "Amara Diallo began recording in 1994 with a borrowed cassette deck and a habit of standing very still. Her archive now holds more than four thousand hours of Dakar — not music, not interviews, but rooms: the stairwell of a 1950s apartment block, a fish market at 5 a.m., the specific echo of a courtyard with one tree in it.",
          "She calls this practice \"keeping the container.\" Buildings come down, she says, and the photograph survives, but the photograph is silent. Her work is an argument that a room's acoustic signature is a form of civic record, as legible as a cadastral map.",
        ],
      },
      {
        heading: "Listening as evidence",
        paras: [
          "We walked the Medina before the light came up. Diallo carries a small recorder and a pair of open-backed headphones; she listens to the room through them, then takes them off to hear it as a person would. The difference matters to her. One is a document, the other is a life.",
          "By the time the muezzin began, we had crossed four courtyards. None of them will exist in three years. She has already made the recordings, and she knows exactly which one she will play first when they are gone.",
        ],
      },
    ],
    transcript: [
      { speaker: "Amara Diallo", text: "People think silence is the absence of sound. It is not. Silence is a room telling you its dimensions." },
      { speaker: "Monolith", text: "So when you record a courtyard, you are recording architecture." },
      { speaker: "Amara Diallo", text: "I am recording a decision. Somebody chose these walls, this height, this gap between buildings. You can hear the choice." },
    ],
    credits: { host: "Ines Kone", producer: "Ines Kone", editor: "Rafael Costa", recorded: "Medina, Dakar" },
  },
  {
    slug: "concrete-hymn",
    number: 7,
    title: "Concrete Hymn",
    guest: "Elias Roth",
    role: "Architect",
    place: "Basel, Switzerland",
    date: "2026-11-04",
    dateLabel: "04 Nov 2026",
    category: "materials",
    duration: 241,
    audio: "assets/audio/snowflake_04_weir_64kb.mp3",
    image: "assets/img/ep-02.jpg",
    alt: "A man standing alone in a dark, empty room, hands in his pockets, lit from one side.",
    standfirst:
      "Elias Roth spent eleven years building a chapel that holds two hundred people and almost no sound. We asked him what a building is for when it refuses to echo.",
    quote: {
      text: "A material is a set of instructions. Concrete tells you what it will not do, and then you spend a decade learning to want that.",
      cite: "Elias Roth",
    },
    chapters: [
      { t: 0, label: "Cold open — the nave" },
      { t: 44, label: "Eleven years of formwork" },
      { t: 112, label: "Designing for absorption" },
      { t: 178, label: "What the building refuses" },
      { t: 214, label: "Credits" },
    ],
    notes: [
      {
        heading: "A room that does not answer",
        paras: [
          "The chapel sits at the edge of a industrial district outside Basel, a low grey volume with a single opening cut at an angle. Inside, footsteps stop almost immediately. There is no bloom, no tail, none of the warm return you expect from stone.",
          "Roth engineered this. The walls are a metre thick, poured against boards of rough-sawn spruce, and the interior is lined with a porous aggregate that swallows the middle frequencies where human speech lives. He wanted a room that would not flatter a voice.",
        ],
      },
      {
        heading: "The discipline of a substance",
        paras: [
          "He talks about concrete the way other people talk about a difficult teacher. It is heavy, it is patient, and it will record every mistake you make in the formwork for a hundred years. The building is not a gesture, he says. It is a negotiation that you lose slowly.",
          "When we recorded this conversation, we did it in the nave. You can hear the difference in the first thirty seconds: no room tone, no reverb, just two people and a microphone, close enough to hear each other breathe.",
        ],
      },
    ],
    transcript: [
      { speaker: "Elias Roth", text: "Everybody asks about the light. Nobody asks about the silence, and the silence took longer." },
      { speaker: "Monolith", text: "Was there a moment you thought it would not work?" },
      { speaker: "Elias Roth", text: "Every pour. Every single one. Concrete does not care whether you are right." },
    ],
    credits: { host: "Jonas Weber", producer: "Mira Lang", editor: "Rafael Costa", recorded: "Chapel of the Ascension, Basel" },
  },
  {
    slug: "what-the-body-remembers",
    number: 6,
    title: "What the Body Remembers",
    guest: "Dr. Nia Okafor",
    role: "Neuroscientist",
    place: "London, United Kingdom",
    date: "2026-10-21",
    dateLabel: "21 Oct 2026",
    category: "memory",
    duration: 189,
    audio: "assets/audio/snowflake_06_weir_64kb.mp3",
    image: "assets/img/ep-03.jpg",
    alt: "Black and white portrait of a woman with long hair, half her face in shadow.",
    standfirst:
      "A conversation about the sounds that arrive before language does, and why a song from a hospital corridor can outlast everything else about that year.",
    quote: {
      text: "The auditory system is the first sense to come online and the last to leave. It is the sense that files everything, whether you consent or not.",
      cite: "Dr. Nia Okafor",
    },
    chapters: [
      { t: 0, label: "Cold open — the corridor" },
      { t: 34, label: "The first sense online" },
      { t: 88, label: "Involuntary memory" },
      { t: 140, label: "What we cannot unhear" },
      { t: 170, label: "Credits" },
    ],
    notes: [
      {
        heading: "Before the words",
        paras: [
          "Dr. Okafor studies auditory memory in infants and in patients recovering from trauma. Her lab has a phrase for the phenomenon we keep circling: pre-verbal imprinting, the way a sound heard before the age of two can survive the loss of almost everything else.",
          "She is careful not to mystify it. Memory is physical, she says, and sound is unusually good at getting in. The ear has no lid. You can close your eyes; you cannot close your ears.",
        ],
      },
      {
        heading: "The ethics of a trigger",
        paras: [
          "Much of her recent work concerns what happens when a sound returns unbidden. A hospital corridor, a particular ringtone, the hum of a specific lift. The clinical term is involuntary autobiographical memory, and it is not a malfunction — it is the system doing exactly what it was built to do.",
          "What matters, she argues, is not whether the sound comes back, but whether the person has a room to put it in. That is a design problem as much as a medical one.",
        ],
      },
    ],
    transcript: [
      { speaker: "Nia Okafor", text: "You cannot close your ears. That single fact explains a great deal of human suffering and a great deal of music." },
      { speaker: "Monolith", text: "Is that why sound is so difficult to forget?" },
      { speaker: "Nia Okafor", text: "It is why sound is so difficult to refuse." },
    ],
    credits: { host: "Ines Kone", producer: "Mira Lang", editor: "Jonas Weber", recorded: "Bloomsbury, London" },
  },
  {
    slug: "a-grammar-of-rain",
    number: 5,
    title: "A Grammar of Rain",
    guest: "Tomás Ferreira",
    role: "Poet",
    place: "Lisbon, Portugal",
    date: "2026-10-07",
    dateLabel: "07 Oct 2026",
    category: "cities",
    duration: 176,
    audio: "assets/audio/snowflake_05_weir_64kb.mp3",
    image: "assets/img/ep-04.jpg",
    alt: "A man in a black crew-neck shirt, photographed against a dark ground.",
    standfirst:
      "Tomás Ferreira has lived in the same three streets for forty years. He reads from a sequence about rain on calçada and explains why a city needs a vocabulary for weather.",
    quote: {
      text: "Rain is not one sound. It is a language with dialects, and every pavement in this city speaks a slightly different one.",
      cite: "Tomás Ferreira",
    },
    chapters: [
      { t: 0, label: "Cold open — Rua da Rosa" },
      { t: 30, label: "The vocabulary of weather" },
      { t: 78, label: "Reading: 'Calçada'" },
      { t: 128, label: "A city you can hear" },
      { t: 158, label: "Credits" },
    ],
    notes: [
      {
        heading: "Three streets, forty years",
        paras: [
          "Ferreira has published nine books and left Lisbon for a total of eleven months. His subject is not the city as an idea but the city at the scale of a walk: the slope of a street, the way water leaves a square, the difference between rain on tile and rain on the white limestone they call calçada.",
          "He keeps a notebook of weather words in four languages, most of them untranslatable. He reads two of them aloud for us, then admits he is not sure they are real.",
        ],
      },
      {
        heading: "The poem as a measuring device",
        paras: [
          "His new sequence, still unpublished, is built from the sound of the street in different conditions. He insists this is not nostalgia. A poem, he says, is a way of paying attention for longer than is socially acceptable.",
          "We recorded in his kitchen during a downpour, with the window open. The rain is in the recording. He would not let us close it.",
        ],
      },
    ],
    transcript: [
      { speaker: "Tomás Ferreira", text: "In Lisbon we say it is 'chovendo pedra' — raining stone. You know what that means the moment you hear it on the pavement." },
      { speaker: "Monolith", text: "And in another city it would mean nothing." },
      { speaker: "Tomás Ferreira", text: "In another city it would be a metaphor. Here it is a forecast." },
    ],
    credits: { host: "Rafael Costa", producer: "Ines Kone", editor: "Mira Lang", recorded: "Bairro Alto, Lisbon" },
  },
  {
    slug: "the-weight-of-paper",
    number: 4,
    title: "The Weight of Paper",
    guest: "Ingrid Halvorsen",
    role: "Conservator",
    place: "Oslo, Norway",
    date: "2026-09-23",
    dateLabel: "23 Sep 2026",
    category: "materials",
    duration: 409,
    audio: "assets/audio/snowflake_03_weir_64kb.mp3",
    image: "assets/img/ep-05.jpg",
    alt: "A woman in a black hat photographed in profile against deep shadow.",
    standfirst:
      "In a basement in Oslo, Ingrid Halvorsen repairs paper that is older than the country she works in. A conversation about patience, glue, and the ethics of undoing someone else's repair.",
    quote: {
      text: "Every object arrives with a history of being handled. My job is not to erase that. It is to make sure it can keep being handled.",
      cite: "Ingrid Halvorsen",
    },
    chapters: [
      { t: 0, label: "Cold open — the bench" },
      { t: 52, label: "Eleven kinds of glue" },
      { t: 140, label: "The ethics of undoing" },
      { t: 232, label: "A thousand years of handling" },
      { t: 340, label: "What paper wants" },
      { t: 384, label: "Credits" },
    ],
    notes: [
      {
        heading: "The slowest room in the building",
        paras: [
          "The conservation lab is two floors below the reading room, lit for colour accuracy, kept at a constant 18 degrees. Halvorsen has worked here for twenty-six years. Her current project is a cartulary from 1340 that spent four centuries in a damp church and the last eighty in a box.",
          "She works at a pace that makes the rest of the world look frantic. A single leaf can take a week. When I asked how she knows when to stop, she said: when the object stops asking.",
        ],
      },
      {
        heading: "Repair as a form of listening",
        paras: [
          "Paper, she says, is a record of forces. Every fold is a decision, every stain an accident that survived. The conservator's discipline is to read those forces before touching anything, because a repair made in the wrong direction becomes part of the damage.",
          "She showed me a page repaired in the 1890s with silk and wheat paste. It is failing now. She will have to undo it, carefully, and she is not entirely comfortable with that. Somebody's best work is in the way.",
        ],
      },
    ],
    transcript: [
      { speaker: "Ingrid Halvorsen", text: "People think conservation is about stopping time. It is about slowing it down enough that the object can be read." },
      { speaker: "Monolith", text: "And the repair you undo — is that a loss?" },
      { speaker: "Ingrid Halvorsen", text: "It is a conversation. I am answering someone who died a hundred years ago." },
    ],
    credits: { host: "Jonas Weber", producer: "Ines Kone", editor: "Rafael Costa", recorded: "National Library, Oslo" },
  },
  {
    slug: "nobodys-listening",
    number: 3,
    title: "Nobody's Listening",
    guest: "Marcus Bell",
    role: "Radio engineer",
    place: "Detroit, United States",
    date: "2026-09-09",
    dateLabel: "09 Sep 2026",
    category: "cities",
    duration: 241,
    audio: "assets/audio/snowflake_04_weir_64kb.mp3",
    image: "assets/img/ep-06.jpg",
    alt: "Black and white portrait of a bearded man in profile.",
    standfirst:
      "Four AM transmitters still broadcast into empty counties across the American Midwest. Marcus Bell maintains them, and he has opinions about what a signal is for when nobody is receiving it.",
    quote: {
      text: "A transmitter is a promise that somebody might be out there. Most nights nobody is. You keep the promise anyway.",
      cite: "Marcus Bell",
    },
    chapters: [
      { t: 0, label: "Cold open — 1,200 metres" },
      { t: 46, label: "The last clear-channel" },
      { t: 118, label: "Maintenance as ritual" },
      { t: 186, label: "Who is still out there" },
      { t: 226, label: "Credits" },
    ],
    notes: [
      {
        heading: "The tower at the edge of the county",
        paras: [
          "Bell has maintained the same five towers since 1998. Three of them carry a signal that reaches, on a clear night, four hundred miles. He can tell you what the ground conductivity is at each site and which one hums in a north wind.",
          "The stations are automated now. A computer plays the playlist, reads the weather, signs off at midnight. Bell's job is to keep the physical plant alive: the transmission line, the cooling, the fence that keeps the cattle out.",
        ],
      },
      {
        heading: "Broadcasting to no one in particular",
        paras: [
          "He is not sentimental about it. The economics are what they are. But he resists the idea that a signal with few listeners is a wasted signal. A broadcast, he says, is an offer. The offer does not become meaningless because it goes unanswered.",
          "We drove out to the tower at dusk. He walked the perimeter with a torch, checking the guy wires out of habit. The carrier hum was audible from the fence line, a low steady tone that he says he can hear in his sleep.",
        ],
      },
    ],
    transcript: [
      { speaker: "Marcus Bell", text: "You can hear the carrier before you hear the program. That hum is the station saying: I am still here." },
      { speaker: "Monolith", text: "Does it matter if nobody hears it?" },
      { speaker: "Marcus Bell", text: "Somebody made a promise in 1947. I am not the one who gets to break it." },
    ],
    credits: { host: "Rafael Costa", producer: "Jonas Weber", editor: "Mira Lang", recorded: "Washtenaw County, Michigan" },
  },
  {
    slug: "the-long-now",
    number: 2,
    title: "The Long Now",
    guest: "Yuki Tanaka",
    role: "Horologist",
    place: "Kyoto, Japan",
    date: "2026-08-26",
    dateLabel: "26 Aug 2026",
    category: "memory",
    duration: 189,
    audio: "assets/audio/snowflake_06_weir_64kb.mp3",
    image: "assets/img/ep-07.jpg",
    alt: "Grayscale portrait of a woman wearing a necklace, looking directly at the camera.",
    standfirst:
      "Yuki Tanaka repairs clocks that were built to be repaired. A conversation about brass, patience, and the difference between accuracy and correctness.",
    quote: {
      text: "A mechanical clock is not trying to be right. It is trying to be regular. The rightness is our problem, not the clock's.",
      cite: "Yuki Tanaka",
    },
    chapters: [
      { t: 0, label: "Cold open — the workshop" },
      { t: 32, label: "Escapements and patience" },
      { t: 84, label: "Accuracy versus correctness" },
      { t: 138, label: "Objects built to be repaired" },
      { t: 172, label: "Credits" },
    ],
    notes: [
      {
        heading: "A room of small sounds",
        paras: [
          "Tanaka's workshop holds forty-one clocks and none of them agree. She keeps them running anyway. The sound of the room is a dense, irregular ticking — a texture she says she would miss if it stopped.",
          "She trained in Nagoya and came to Kyoto for a single clock: a mid-nineteenth-century bracket clock with a verge escapement that had been repaired badly three times. It took her two years to make it keep time.",
        ],
      },
      {
        heading: "The ethics of the second",
        paras: [
          "Most of her clients do not need their clocks to be accurate to the second. They need them to be theirs — to sound the way they remember, to wind the way their grandmother wound them. Tanaka takes this seriously as a technical requirement.",
          "A clock, she says, is a machine for making a household feel like it has a shape. That is a different job from telling the time.",
        ],
      },
    ],
    transcript: [
      { speaker: "Yuki Tanaka", text: "You can adjust a clock to be perfect and ruin it. Perfect is not the same as correct." },
      { speaker: "Monolith", text: "What is the difference?" },
      { speaker: "Yuki Tanaka", text: "Correct is when the owner stops noticing it." },
    ],
    credits: { host: "Ines Kone", producer: "Mira Lang", editor: "Jonas Weber", recorded: "Nishijin, Kyoto" },
  },
  {
    slug: "first-light",
    number: 1,
    title: "First Light",
    guest: "Sofia Marchetti",
    role: "Photographer",
    place: "Naples, Italy",
    date: "2026-08-12",
    dateLabel: "12 Aug 2026",
    category: "memory",
    duration: 176,
    audio: "assets/audio/snowflake_05_weir_64kb.mp3",
    image: "assets/img/ep-08.jpg",
    alt: "A man in a black button-up shirt photographed in low light.",
    standfirst:
      "The first episode of Monolith. Sofia Marchetti photographs the same six blocks of Naples every morning at first light, and has done so for eleven years. We asked her what she is waiting for.",
    quote: {
      text: "The light is never the same twice, and neither is the street. That is not a reason to stop looking. It is the whole reason to keep looking.",
      cite: "Sofia Marchetti",
    },
    chapters: [
      { t: 0, label: "Cold open — 05:40" },
      { t: 28, label: "Eleven years of mornings" },
      { t: 74, label: "What a street is for" },
      { t: 124, label: "The frame as an argument" },
      { t: 162, label: "Credits" },
    ],
    notes: [
      {
        heading: "Six blocks, eleven years",
        paras: [
          "Marchetti walks the same route before sunrise: a fish market, two stairways, a courtyard with a shrine in it, and the corner where the light first lands. She carries one camera and one lens. She has made, by her estimate, ninety thousand exposures of the same six blocks.",
          "The project began as an exercise in not being bored. It has become something closer to a census — a record of who was on the street in the minutes before the city woke up.",
        ],
      },
      {
        heading: "The argument of a frame",
        paras: [
          "She is suspicious of the word 'documentary'. A photograph, she says, is not a record of the world; it is a record of a decision about where to stand. Her discipline is to keep making that decision honestly, even when the street has stopped surprising her.",
          "We recorded this conversation at 6 a.m., on the corner she has photographed more than any other. You can hear the market opening behind her.",
        ],
      },
    ],
    transcript: [
      { speaker: "Sofia Marchetti", text: "People ask if I am waiting for a perfect photograph. I am waiting for the street to forget I am there." },
      { speaker: "Monolith", text: "Does it ever?" },
      { speaker: "Sofia Marchetti", text: "Once. In 2019. I have been trying to get back to it ever since." },
    ],
    credits: { host: "Rafael Costa", producer: "Ines Kone", editor: "Jonas Weber", recorded: "Pendino, Naples" },
  },
];

export const FEATURED = EPISODES[0];

export const bySlug = (slug) => EPISODES.find((ep) => ep.slug === slug);

export const categoryName = (id) => {
  const cat = CATEGORIES.find((c) => c.id === id);
  return cat ? cat.name : "";
};

export const fmtClock = (seconds) => {
  if (!Number.isFinite(seconds) || seconds < 0) seconds = 0;
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
};

export const fmtDuration = (seconds) => {
  if (!Number.isFinite(seconds) || seconds < 0) seconds = 0;
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};

export const episodeIndex = (slug) => EPISODES.findIndex((ep) => ep.slug === slug);
