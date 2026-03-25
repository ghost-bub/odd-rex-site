export const SECTIONS = [
  {
    id: "ors",
    slug: "/",
    label: "Odd Rex Studios",
    navLabel: "Studio",
    tagline: "Narrative filmmaking",
    titleFont: "'Special Elite', 'junkos typewriter', 'Courier New', monospace",
    description: "Original narrative projects rooted in cinematic craft. Story-driven work where every frame is intentional — from lookbook to final color. New, exciting, and thought-provoking films.",
    accent: "#D3D1C7",
    accentMid: "#888780",
    offerings: ["Short films & narrative projects", "Cinematic lookbook development", "Visual direction & cinematography", "Post-production & color grading"],
    bgGrad: "radial-gradient(ellipse at 20% 80%, rgba(255,255,255,0.03) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(255,255,255,0.02) 0%, transparent 50%)",
    isMonochrome: true,
    socials: { youtube: "https://www.youtube.com/@OddRexStudios", facebook: "https://www.facebook.com/OddRexStudios" },
  },
  {
    id: "av",
    slug: "/albert-video",
    label: "Albert Video",
    navLabel: "A/V",
    tagline: "Freelance & client production",
    titleFont: "'Astron Boy', 'Space Grotesk', sans-serif",
    description: "With over a decade of broadcast experience — from multi-camera studio direction to corporate and ministry media. Professional crews, broadcast-quality deliverables, and a production process built for real clients.",
    accent: "#378ADD",
    accentMid: "#185FA5",
    offerings: [],
    bgGrad: "radial-gradient(ellipse at 70% 90%, rgba(55,138,221,0.1) 0%, transparent 55%), radial-gradient(ellipse at 10% 30%, rgba(29,158,117,0.08) 0%, transparent 50%)",
    gradient: ["#639922", "#378ADD"],
    hasContactForm: true,
  },
  {
    id: "256cc",
    slug: "/bubmario",
    label: "bubmario",
    navLabel: "bubmario",
    tagline: "Gaming & commentary",
    titleFont: "'Glitch Goblin', 'Space Grotesk', sans-serif",
    description: "Gaming culture, retro collecting, and commentary content. From GameCube classics to current gen — covering the stuff that matters to people who actually play.",
    accent: "#EF9F27",
    accentMid: "#BA7517",
    offerings: ["Gaming commentary & reviews", "Retro game collecting content", "Live streaming & VOD", "Gaming culture analysis"],
    bgGrad: "radial-gradient(ellipse at 50% 100%, rgba(239,159,39,0.1) 0%, transparent 50%), radial-gradient(ellipse at 90% 20%, rgba(186,117,23,0.06) 0%, transparent 50%)",
    socials: { youtube: "https://www.youtube.com/@bubmario", twitch: "https://www.twitch.tv/bub_mario", twitter: "https://twitter.com/bub_mario", instagram: "https://instagram.com/bub_mario" },
    hasSchedulePage: true,
  },
  {
    id: "modmon",
    slug: "/mod-mondays",
    label: "Mod Mondays",
    navLabel: "Mod Mondays",
    tagline: "Hardware mods & custom builds",
    titleFont: "'Used Servers', 'JetBrains Mono', monospace",
    description: "Custom hardware projects, server builds, and console modifications. Xeon workstations, RCM loader setups, GPU swaps — hands-on builds documented from teardown to power-on. Every Monday.",
    accent: "#E24B4A",
    accentMid: "#A32D2D",
    offerings: ["Console modding & restoration", "Custom PC & server builds", "Hardware teardown content", "Mod tutorials & guides"],
    bgGrad: "radial-gradient(ellipse at 30% 20%, rgba(226,75,74,0.1) 0%, transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(163,45,45,0.08) 0%, transparent 50%)",
    isHidden: true,
    fontAttribution: { font: "Used Servers", author: "Alta Technologies", url: "https://www.altatechnologies.com", note: '"Used Servers" font by Alta Technologies (altatechnologies.com) — free for commercial use with attribution.' },
  },
];

export const BIO_FILMMAKER = {
  name: "Jack Albert",
  title: "Filmmaker & Founder, Odd Rex Studios",
  bio: `Jack Albert is a fiercely passionate filmmaker who loves to learn and lives to serve. He founded Odd Rex Studios with one mission: to bring new, exciting, and thought-provoking films into the medium.

With a double major in Film and English from Wisconsin Lutheran College — where he was recognized with the Inaugural Salty Earth Pictures Action Award, the Conduct Board Leadership Award, and the Student Impact Award — Jack has spent over a decade producing, writing, and directing narrative work that prioritizes quality, authenticity, and integrity in every frame.

His filmography includes the MIFA award-winning short "Spoiled," the psychological thriller "I Am Scourge," the ambitious multilingual TV pilot "Quiet Storm," and original work like "Parasocial" — which he wrote, directed, and edited — alongside collaborative projects like "Here and Now." From his earliest student work on "Beat" and "Hallowed Ground" to his current slate, the creative through-line has never changed: tell stories that challenge minds and move people.

In his limited spare time, Jack explores the intersection of technology and art, collects retro games, and occasionally tears apart hardware that was never meant to be opened. He just wants to make cool stuff with kind people.`,
  credentials: [
    "BA Film & English — Wisconsin Lutheran College",
    "Inaugural Salty Earth Pictures Action Award",
    "WLC Student Impact Award",
    "Founder, Odd Rex Studios LLC",
  ],
};

export const BIO_FREELANCER = {
  name: "Jack Albert",
  title: "Creative Video Director & Broadcast Producer",
  bio: `Jack Albert is an interdisciplinary learner, multimodal speaker, creative director, and broadcast production professional based in Milwaukee with over a decade of experience spanning studio direction, multi-camera production, video editorial, and crew management.

He holds a dual BA in Filmmaking and English from Wisconsin Lutheran College. If he wasn't writing and shooting countless video projects across multiple disciplines and languages, he was sharing his thoughts on the latest films as the resident Film Reviewer (as well as Arts & Entertainment Editor) for the college newspaper. His career has taken him from building a freelance film business to leading broadcast production teams — including serving as the first Lead Video Editor at a nationally distributed media ministry, where he played an instrumental role during a major on-air talent transition and helped establish editorial and production review processes from the ground up.

Jack has also served as Director of Video Production at a major Milwaukee church and as A1 Audio and Video Supervisor at Skylight Music Theatre. His technical expertise covers broadcast-standard delivery, multi-camera studio workflows, crew scheduling, and production documentation — and he brings the same level of precision to a corporate shoot that he does to a narrative film.`,
  credentials: [
    "Dual BA Filmmaking & English — Wisconsin Lutheran College",
    "10+ years broadcast & creative production",
    "Multi-camera studio direction",
    "Broadcast-standard delivery & compliance",
  ],
  testimonials: [
    {
      quote: "{Jack is a passionate filmmaker, seasoned digital marketer, and highly capable leader.} {It was clear from take one, day one that Jack's calling is behind the camera.} Taking charge of the room with patience, confidence, and genuine care proved he was in his element. Communication was {clear, concise, and highly responsive}. Jack would make an amazing addition to any team that prides themselves on transparent communication, a dedication to their craft, and {a willingness to work hard until a project is not only done, but done well.}",
      name: "Amanda S., Copywriter",
    },
    {
      quote: "{Jack is one of the best and most intelligent directors I've worked with, showing genuine excitement about his work.} He always strives to create the best product, no matter the time constraints. He has a remarkable ability to roll with the punches, adapting to situations as they arise. {He is a good, kind person and a talented director.}",
      name: "Josh Scheibe, Actor",
    },
    {
      quote: "Jack is one of the most {gifted, thoughtful, and genuine} people I've had the opportunity to work with. {Intellectually curious and diligent, he improved the dynamic of every room he was in.} He completed consistently top-notch work demonstrating sophisticated communication skills and agility navigating different audiences. Jack absorbs feedback, applying it in concrete ways, and creates memorable work I remember almost ten years later. {He is a person of high moral character who will be a positive influence on all around him.}",
      name: "Rebecca, Advisor",
    },
    {
      quote: "Jack has been a {great project leader}. He values all members of his team and treats everyone with respect and dignity. He is patient, not losing his cool when things get down to the wire. He is a {clear communicator}, always getting information out early to be sure everyone is on the same page. He keeps a {positive attitude} and can push a project through to completion. I would recommend him highly.",
      name: "Matthew H., Technical Director",
    },
  ],
};

export const SCHEDULE = [
  { day: "Monday", time: "10:00 PM CT", show: "Mod Mondays", note: "Hardware teardowns & builds", accent: "#E24B4A", isModMondays: true },
  { day: "Tuesday", time: "11:00 PM CT", show: "Retro Night", note: "GameCube, N64, PS2 — the classics", accent: "#EF9F27" },
  { day: "Wednesday", time: "10:00 PM CT", show: "256 Color Commentary", note: "See me hang out with friends here, at our 256 CC project.", accent: "#D3D1C7", is256CC: true, link: "https://www.youtube.com/@256ColorCommentary" },
  { day: "Thursday", time: "10:30 PM CT", show: "New Release Thursday", note: "First impressions on new drops", accent: "#EF9F27" },
  { day: "Friday", time: "11:00 PM CT", show: "Community Night", note: "Viewer games & hangouts", accent: "#EF9F27" },
  { day: "Saturday", time: "Midnight CT", show: "After Midnight", note: "Long plays, deep dives, vibes", accent: "#EF9F27" },
];

export function getSectionGradientCSS(s) {
  if (s.gradient) return `linear-gradient(135deg, ${s.gradient[0]}, ${s.gradient[1]})`;
  if (s.isMonochrome) return "#F1EFE8";
  return s.accent;
}
export function getSectionProgressCSS(s) {
  if (s.gradient) return `linear-gradient(90deg, ${s.gradient[0]}, ${s.gradient[1]})`;
  if (s.isMonochrome) return "#888780";
  return s.accent;
}
