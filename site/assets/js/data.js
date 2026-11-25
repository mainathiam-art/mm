// All of the show's content lives here so every page stays in sync.

export const site = {
  name: "Between the Bells",
  school: "Northfield High",
  tagline: "The student podcast of Northfield High",
  season: 3,
  room: "Room 214",
  email: "hello@betweenthebells.fm",
  social: "@betweenthebells",
  stats: [
    { value: "24", label: "episodes and counting" },
    { value: "9.4k", label: "listens this season" },
    { value: "5", label: "students behind the mic" },
    { value: "0", label: "scripts, on purpose" },
  ],
};

export const topics = [
  {
    number: "01",
    title: "Student life",
    text: "Cafeteria politics, the 8 a.m. sprint, and the group chat that never sleeps.",
  },
  {
    number: "02",
    title: "Interviews",
    text: "Teachers, alumni, the new kid, the custodian who quietly knows everything.",
  },
  {
    number: "03",
    title: "Big ideas",
    text: "Attention, ambition, faith, friendship — the things that keep us up at night.",
  },
  {
    number: "04",
    title: "Confessions",
    text: "Anonymous notes from the box outside Room 214, read out loud with permission.",
  },
];

export const episodes = [
  {
    id: "ep-08",
    number: 8,
    title: "Second Chances",
    blurb:
      "Mr. Okafor failed his own chemistry final once. We asked what happened next — and why the stories we tell about failure almost never include the comeback.",
    date: "2026-11-21",
    duration: "2:04",
    audio: "assets/audio/ep-06-second-chances.mp3",
    guest: "Mr. Okafor, chemistry",
    tags: ["Confessions", "Student life"],
    tone: "coral",
  },
  {
    id: "ep-07",
    number: 7,
    title: "Maybe Later",
    blurb:
      "Procrastination isn't laziness, it's a feeling. The three of us unpack the assignments we're avoiding right now — live, on air, with the clock running.",
    date: "2026-11-07",
    duration: "1:39",
    audio: "assets/audio/ep-07-maybe-later.mp3",
    guest: "Hosts only",
    tags: ["Advice"],
    tone: "sun",
  },
  {
    id: "ep-06",
    number: 6,
    title: "The New Kid",
    blurb:
      "Sofia moved here from Lisbon in September. She talks about eating lunch alone, learning the slang, and the day someone finally saved her a seat.",
    date: "2026-10-24",
    duration: "1:56",
    audio: "assets/audio/ep-05-new-kid.mp3",
    guest: "Sofia, Grade 10",
    tags: ["Interviews", "Student life"],
    tone: "mint",
  },
  {
    id: "ep-05",
    number: 5,
    title: "Stage Fright",
    blurb:
      "The drama club let us record their final dress rehearsal, then interviewed them shaking in the wings. A love letter to being terrified.",
    date: "2026-10-10",
    duration: "1:28",
    audio: "assets/audio/ep-08-stage-fright.mp3",
    guest: "The drama club",
    tags: ["Interviews", "Student life"],
    tone: "lilac",
  },
  {
    id: "ep-04",
    number: 4,
    title: "Exam Season Survival Guide",
    blurb:
      "Ms. Haddad, our school counselor, on study schedules that actually work, sleep debt, and how to tell the difference between stress and something heavier.",
    date: "2026-09-26",
    duration: "3:19",
    audio: "assets/audio/ep-04-exam-season.mp3",
    guest: "Ms. Haddad, counselor",
    tags: ["Advice"],
    tone: "coral",
  },
  {
    id: "ep-03",
    number: 3,
    title: "Slow Mornings",
    blurb:
      "We tried a no-phone first hour for two weeks. One of us caved on day three. A conversation about mornings, attention, and small experiments.",
    date: "2026-09-12",
    duration: "4:15",
    audio: "assets/audio/ep-03-slow-mornings.mp3",
    guest: "Hosts only",
    tags: ["Student life"],
    tone: "sun",
  },
  {
    id: "ep-02",
    number: 2,
    title: "Big Feelings, Small Hallways",
    blurb:
      "Peer counselor Ade joins us to talk about friendship breakups, therapy waitlists, and why “I'm fine” is the most common lie in high school.",
    date: "2026-08-29",
    duration: "5:42",
    audio: "assets/audio/ep-02-big-feelings.mp3",
    guest: "Ade, peer counselor",
    tags: ["Interviews", "Big ideas"],
    tone: "mint",
  },
  {
    id: "ep-01",
    number: 1,
    title: "The Quiet Part",
    blurb:
      "Our season opener: the things people think but never say out loud in class. Anonymous submissions from the box, read with permission.",
    date: "2026-08-15",
    duration: "3:05",
    audio: "assets/audio/ep-01-the-quiet-part.mp3",
    guest: "Hosts only",
    tags: ["Confessions", "Big ideas"],
    tone: "lilac",
  },
];

export const filters = ["All", "Interviews", "Student life", "Advice", "Confessions", "Big ideas"];

export const upcoming = [
  {
    date: "2026-12-05",
    title: "Ghosts of Group Projects",
    blurb:
      "Why does group work go wrong every single time? Ms. Rivera has a theory, and a stack of graded rubrics to prove it.",
    guest: "Ms. Rivera, history",
    tag: "Interviews",
    tone: "coral",
  },
  {
    date: "2026-12-19",
    title: "The Voicemail Special",
    blurb:
      "You leave a voice note, we play it. Thirty seconds about anything: a win, a worry, a very specific complaint about the vending machine.",
    guest: "You, hopefully",
    tag: "Student life",
    tone: "mint",
  },
  {
    date: "2027-01-09",
    title: "Applying to Everything",
    blurb:
      "Three alumni come back to talk gap years, rejection letters, and what nobody tells you about the personal essay.",
    guest: "Class of 2024 alumni",
    tag: "Advice",
    tone: "sun",
  },
];

export const team = [
  {
    name: "Amara Diallo",
    role: "Host & producer",
    grade: "Grade 12",
    photo: "assets/img/team-1.jpg",
    fact: "Keeps a running list of overheard hallway quotes in her notes app.",
    quote: "The best episodes start with a question we're slightly afraid to ask.",
  },
  {
    name: "Jonah Reyes",
    role: "Co-host",
    grade: "Grade 11",
    photo: "assets/img/team-2.jpg",
    fact: "Has never once been on time to a recording. Still brings the snacks.",
    quote: "I'm here for the follow-up question everyone else is too polite to ask.",
  },
  {
    name: "Priya Nair",
    role: "Editor & sound",
    grade: "Grade 12",
    photo: "assets/img/team-3.jpg",
    fact: "Owns 47 pairs of headphones and admits to using four of them.",
    quote: "Three hours of rambling becomes twenty minutes you can't switch off.",
  },
  {
    name: "Theo Bennett",
    role: "Research & booking",
    grade: "Grade 10",
    photo: "assets/img/team-4.jpg",
    fact: "Reads the student handbook for fun. Yes, the whole thing.",
    quote: "Every guest has one story they've never been asked about. I find it.",
  },
  {
    name: "Lena Fischer",
    role: "Art & social",
    grade: "Grade 11",
    photo: "assets/img/team-5.jpg",
    fact: "Designed our logo in a math class she would like everyone to forget.",
    quote: "If the cover doesn't make you curious, the episode doesn't stand a chance.",
  },
];

export const values = [
  {
    title: "Student voices first",
    text: "No adults write our questions. Every episode starts with something one of us genuinely wondered about in the hallway.",
  },
  {
    title: "Curiosity over clout",
    text: "We're not chasing a viral clip. We'd rather have one honest conversation than a hundred hot takes.",
  },
  {
    title: "Everyone gets a seat",
    text: "If you go to Northfield, you can pitch an episode, sit in on a recording, or just hang out in Room 214 while we work.",
  },
];

export const process = [
  {
    step: "Monday",
    title: "Pitch",
    text: "Anyone drops a topic in the box outside Room 214. We pick two every other week.",
  },
  {
    step: "Wednesday",
    title: "Record",
    text: "One mic, five chairs, zero scripts. We keep the awkward pauses on purpose.",
  },
  {
    step: "Thursday",
    title: "Edit",
    text: "Priya cuts it down, adds the music, and argues with the rest of us about the intro.",
  },
  {
    step: "Friday",
    title: "Publish",
    text: "It lands here, in the school newsletter, and anywhere you listen to podcasts.",
  },
];

export const faqs = [
  {
    q: "Can I be on the show?",
    a: "Yes. Send the form with “Guest pitch” selected and tell us what you'd want to talk about. You don't need experience — you need an opinion and thirty minutes on a Wednesday.",
  },
  {
    q: "Do you take anonymous submissions?",
    a: "We do. Pick “Anonymous tip” on the contact form and leave your name blank if you'd rather. We read the best ones out loud, and we never guess who wrote them.",
  },
  {
    q: "How long is an episode?",
    a: "Most run between fifteen and thirty minutes. The short ones are secretly our favourites.",
  },
  {
    q: "Is it really student-run?",
    a: "Every part of it: booking, recording, editing, artwork, the newsletter, and the group chat arguments about the intro music.",
  },
];
