export const profile = {
  name: "Srujan Pendurthi",
  tagline: "ML @ CMU. C enjoyer.",
  location: "United States",
  email: "srujan.pendurthi@gmail.com",
  github: "https://github.com/SrujanPendurthi",
  githubUsername: "SrujanPendurthi",
  linkedin: "https://linkedin.com/in/srujan-pendurthi/",
} as const;

export const education = {
  school: "Carnegie Mellon University",
  location: "Pittsburgh, PA",
  degree: "B.S. in Artificial Intelligence, Additional Major in Business",
  period: "Expected May 2028",
} as const;

export type Experience = {
  role: string;
  company: string;
  location?: string;
  period: string;
  highlights: string[];
};

export const experiences: Experience[] = [
  {
    role: "AI Engineering Intern",
    company: "Humana",
    location: "Louisville, KY",
    period: "May 2026 – Aug. 2026",
    highlights: [
      "Streamlined Medical Assistant workflows by 33% by developing multimodal RAG pipelines using Google ADK.",
      "Consolidated patient data and charts into Athena EMR using FastAPI and Snowflake MCP.",
      "Increased patient throughput by 6% by implementing LangChain and LangGraph agents into the MA workflow.",
      "Improved veteran healthcare data integration by creating API endpoints for Humana Military TRICARE.",
      "Presented in the final showcase to senior leadership and stakeholders.",
    ],
  },
  {
    role: "Machine Learning & Data Science Intern",
    company: "Drippy.ai",
    period: "May 2025 – Aug. 2025",
    highlights: [
      "Improved personalized learning recommendations by 28% by developing NLP and computer vision models in PyTorch for AI-driven e-learning tools.",
      "Reduced data processing time by 35% by building analytics workflows with Redis and NumPy on educational data.",
      "Increased platform engagement by 18% by helping deploy and optimize scalable end-to-end ML inference pipelines.",
    ],
  },
  {
    role: "Machine Learning Research Assistant",
    company: "Grand Canyon University",
    location: "Phoenix, AZ",
    period: "May 2024 – July 2024",
    highlights: [
      "Developed a real-time ASL gesture translation system using OpenCV, MediaPipe, and PyTorch.",
      "Applied Gaussian blur and thresholding techniques to improve hand segmentation and gesture feature extraction.",
      "Integrated EEG signal data with gesture recognition pipelines for BCI-focused multimodal classification research.",
      "Improved sign recognition accuracy by 25% by training an RNN classifier on temporal gesture sequence data.",
      "Authored a 7-page research paper and presented findings at the Arizona Association of the Deaf State Conference.",
    ],
  },
];

export type Project = {
  name: string;
  stack: string[];
  period: string;
  highlights: string[];
};

export const featuredProjects: Project[] = [
  {
    name: "TranscriptFlow",
    stack: ["Go", "Python", "React", "PostgreSQL", "Redis", "Docker"],
    period: "May 2025 – Present",
    highlights: [
      "YouTube transcript SaaS in Go (Chi) + React with a 3-layer pipeline: Redis cache, YouTube caption scraping, and yt-dlp + Faster-Whisper audio fallback.",
      "Dual auth — JWT (plan-gated) for web sessions and SHA-256-hashed developer API keys, both resolved via Chi middleware.",
      "Async job processing with Asynq (Redis-backed) and a standalone worker binary running a pending → processing → completed/failed state machine with retries.",
      "Stripe subscription billing with HMAC-validated webhooks promoting users between Free and Pro plans.",
    ],
  },
  {
    name: "reDoors",
    stack: ["Go", "React", "PostgreSQL", "Redis", "Docker"],
    period: "Sept. 2025 – Present",
    highlights: [
      "P2P outdoor gear marketplace in Go (Chi) + React with listing creation, PostgreSQL tsvector full-text search, and condition/price filtering.",
      "Real-time buyer–seller chat via Redis Pub/Sub + WebSocket relay, with history in PostgreSQL and unread counts cached in Redis.",
      "Stripe Connect escrow — funds released to seller on buyer confirmation, with HMAC-validated webhooks for disputes and refunds.",
    ],
  },
];

export const skills: { category: string; items: string[] }[] = [
  { category: "Languages", items: ["Python", "C/C++", "Go", "HTML/CSS", "R"] },
  {
    category: "Frameworks",
    items: ["FastAPI", "Claude SDK", "Google ADK", "PostgreSQL", "Redis", "LangChain", "LangGraph"],
  },
  {
    category: "Developer Tools",
    items: ["Git", "Docker", "VS Code", "Visual Studio", "Vim", "Claude Code", "Codex", "Cursor", "GitHub", "Jenkins"],
  },
  { category: "Libraries", items: ["pandas", "NumPy", "Matplotlib", "OpenCV", "PyTorch"] },
];
