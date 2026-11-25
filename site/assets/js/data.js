// All site content lives here — edit episodes, upcoming shows and the team
// in one place. Audio files are public-domain LibriVox recordings used as
// demo audio; swap them for your own recordings in site/assets/audio/.

export const EPISODES = [
  {
    id: "cafeteria-report",
    season: 2,
    number: 12,
    title: "The Cafeteria Report: What We Actually Eat",
    date: "Nov 21, 2026",
    duration: "8:26",
    tags: ["Student life"],
    guest: "Ms. Adeyemi, nutrition lead",
    art: "/assets/img/study-hall.jpg",
    audio: "/assets/audio/ep-street-food.mp3",
    description:
      "Two weeks, 340 lunch trays and one very patient cafeteria crew. We followed the food from the loading dock to the compost bin — and asked who really decides what lands on your plate.",
  },
  {
    id: "poetry-slam-uncut",
    season: 2,
    number: 11,
    title: "Poetry Slam Night, Uncut",
    date: "Nov 7, 2026",
    duration: "3:31",
    tags: ["Arts"],
    guest: "The Riverside Lit Club",
    art: "/assets/img/team-collab.jpg",
    audio: "/assets/audio/ep-poetry-slam.mp3",
    description:
      "Microphones open, nerves high, gym lights down. We recorded the whole night — the shaky first lines, the mid-poem applause, and the kid who brought the house down.",
  },
  {
    id: "night-shift",
    season: 2,
    number: 10,
    title: "Night Shift: Students Who Work After School",
    date: "Oct 24, 2026",
    duration: "2:35",
    tags: ["Interviews", "Student life"],
    guest: "Three working students",
    art: "/assets/img/mic-closeup.jpg",
    audio: "/assets/audio/ep-night-shift.mp3",
    description:
      "Between closing shifts and first period, three classmates talk about rent money, tired mornings and the jobs their teachers never ask about.",
  },
  {
    id: "first-year-first-fears",
    season: 2,
    number: 9,
    title: "First Year, First Fears",
    date: "Oct 10, 2026",
    duration: "5:28",
    tags: ["Student life"],
    guest: "The freshman panel",
    art: "/assets/img/studio-mic.jpg",
    audio: "/assets/audio/ep-first-year.mp3",
    description:
      "We asked the newest class what nobody told them before September: the maze of hallways, the locker combinations, and the friends who make it survivable.",
  },
];

export const UPCOMING = [
  {
    day: "27",
    month: "Nov",
    weekday: "Friday",
    title: "Finals Week Survival Guide",
    tag: "Advice",
    guest: "the counselling team",
    description:
      "Sleep, snacks and the study methods that actually work — an honest hour with the people who see every December panic attack up close.",
  },
  {
    day: "04",
    month: "Dec",
    weekday: "Friday",
    title: "The Band Room Tapes",
    tag: "Arts",
    guest: "the Riverside marching band",
    description:
      "Six a.m. rehearsals, borrowed instruments and the halftime show nobody sees from the field. We spent a week inside the band room.",
  },
  {
    day: "11",
    month: "Dec",
    weekday: "Friday",
    title: "Senior Year, Unfiltered",
    tag: "Interviews",
    guest: "the Class of 2027 panel",
    description:
      "College applications, last-choice backup plans and the pressure to have it all figured out at seventeen. Four seniors, no script.",
  },
];

export const TEAM = [
  {
    name: "Amara Diallo",
    role: "Host & Editor-in-Chief",
    grade: "Grade 12",
    photo: "/assets/img/p-amara.jpg",
    bio: "Started the show with a borrowed mic and a shared Google Doc. Now she writes the questions everyone is too polite to ask.",
  },
  {
    name: "Theo Bennett",
    role: "Producer & Sound Designer",
    grade: "Grade 11",
    photo: "/assets/img/p-theo.jpg",
    bio: "Turns a noisy storage closet into a studio. Owns more cables than friends, and mixes every episode on headphones older than he is.",
  },
  {
    name: "Lina Okafor",
    role: "Research & Booking",
    grade: "Grade 12",
    photo: "/assets/img/p-lina.jpg",
    bio: "Finds the guests, checks the facts and keeps the calendar from collapsing. If an episode sounds smart, it is usually her.",
  },
  {
    name: "Marcus Reid",
    role: "Field Reporter",
    grade: "Grade 11",
    photo: "/assets/img/p-marcus.jpg",
    bio: "Records in hallways, parking lots and, once, a supply cupboard. Believes every good story starts with somebody saying “don't record this.”",
  },
  {
    name: "Sofia Alvarez",
    role: "Social & Community",
    grade: "Grade 10",
    photo: "/assets/img/p-sofia.jpg",
    bio: "Runs the clips, the polls and the group chat that decides next month's topics. Reads every single message you send us.",
  },
  {
    name: "Jules Moreau",
    role: "Music & Mixing",
    grade: "Grade 10",
    photo: "/assets/img/p-jules.jpg",
    bio: "Wrote our theme music on a school laptop and somehow makes six voices sound like they are in the same room.",
  },
];
