export type PlatformCategory = "all" | "dev" | "social" | "media" | "community" | "gaming";

export interface PlatformConfig {
  id: string;
  name: string;
  category: "dev" | "social" | "media" | "community" | "gaming";
  description: string;
  color: string;
  iconType: "github" | "reddit" | "twitter" | "youtube" | "twitch" | "instagram" | "discord" | "telegram" | "gitlab" | "npm" | "medium";
  profileUrl: (username: string) => string;
  claimUrl: (username: string) => string;
  isAutomated: boolean; // whether backend worker automated check is currently connected
}

export const PLATFORMS: PlatformConfig[] = [
  {
    id: "github",
    name: "GitHub",
    category: "dev",
    description: "Code hosting & developer portfolio",
    color: "#24292e",
    iconType: "github",
    profileUrl: (u) => `https://github.com/${u}`,
    claimUrl: () => `https://github.com/signup`,
    isAutomated: true,
  },
  {
    id: "reddit",
    name: "Reddit",
    category: "community",
    description: "Community forums & discussions",
    color: "#FF4500",
    iconType: "reddit",
    profileUrl: (u) => `https://reddit.com/user/${u}`,
    claimUrl: () => `https://www.reddit.com/register/`,
    isAutomated: true,
  },
  {
    id: "twitter",
    name: "X (Twitter)",
    category: "social",
    description: "Microblogging & social network",
    color: "#000000",
    iconType: "twitter",
    profileUrl: (u) => `https://x.com/${u}`,
    claimUrl: () => `https://x.com/i/flow/signup`,
    isAutomated: false,
  },
  {
    id: "youtube",
    name: "YouTube",
    category: "media",
    description: "Video sharing & content creator handles",
    color: "#FF0000",
    iconType: "youtube",
    profileUrl: (u) => `https://youtube.com/@${u}`,
    claimUrl: () => `https://studio.youtube.com/`,
    isAutomated: false,
  },
  {
    id: "twitch",
    name: "Twitch",
    category: "gaming",
    description: "Live streaming for gamers & creators",
    color: "#9146FF",
    iconType: "twitch",
    profileUrl: (u) => `https://twitch.tv/${u}`,
    claimUrl: () => `https://www.twitch.tv/signup`,
    isAutomated: false,
  },
  {
    id: "instagram",
    name: "Instagram",
    category: "social",
    description: "Photos, stories & reels",
    color: "#E1306C",
    iconType: "instagram",
    profileUrl: (u) => `https://instagram.com/${u}`,
    claimUrl: () => `https://www.instagram.com/accounts/emailsignup/`,
    isAutomated: false,
  },
  {
    id: "discord",
    name: "Discord",
    category: "community",
    description: "Voice, video & text chat for groups",
    color: "#5865F2",
    iconType: "discord",
    profileUrl: (u) => `https://discord.com/users/${u}`,
    claimUrl: () => `https://discord.com/register`,
    isAutomated: false,
  },
  {
    id: "telegram",
    name: "Telegram",
    category: "community",
    description: "Cloud-based mobile & desktop messaging",
    color: "#229ED9",
    iconType: "telegram",
    profileUrl: (u) => `https://t.me/${u}`,
    claimUrl: () => `https://telegram.org/`,
    isAutomated: false,
  },
  {
    id: "gitlab",
    name: "GitLab",
    category: "dev",
    description: "DevSecOps & open-source repositories",
    color: "#FC6D26",
    iconType: "gitlab",
    profileUrl: (u) => `https://gitlab.com/${u}`,
    claimUrl: () => `https://gitlab.com/users/sign_up`,
    isAutomated: false,
  },
  {
    id: "npm",
    name: "npm",
    category: "dev",
    description: "Node.js package manager author account",
    color: "#CB3837",
    iconType: "npm",
    profileUrl: (u) => `https://www.npmjs.com/~${u}`,
    claimUrl: () => `https://www.npmjs.com/signup`,
    isAutomated: false,
  },
  {
    id: "medium",
    name: "Medium",
    category: "media",
    description: "Blogging & long-form writing",
    color: "#000000",
    iconType: "medium",
    profileUrl: (u) => `https://medium.com/@${u}`,
    claimUrl: () => `https://medium.com/m/signin`,
    isAutomated: false,
  },
];

export const CATEGORIES = [
  { id: "all", label: "All Platforms" },
  { id: "dev", label: "Developer" },
  { id: "social", label: "Social Media" },
  { id: "community", label: "Community & Chat" },
  { id: "media", label: "Media & Content" },
  { id: "gaming", label: "Gaming" },
] as const;

