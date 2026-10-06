export type PipelineStage =
  | "pending"
  | "research"
  | "decide_content"
  | "write_hook"
  | "write_script"
  | "generate_voice"
  | "generate_video"
  | "assemble"
  | "awaiting_review"
  | "publish"
  | "sync_performance"
  | "completed"
  | "failed"
  | "paused_budget";

export interface MockWorkspace {
  id: string;
  name: string;
  planTier: "starter" | "pro" | "scale";
  monthlyBudgetUsd: number;
}

export interface MockContentLine {
  id: string;
  workspaceId: string;
  name: string;
  category: "kids_stories" | "travel" | "dance" | "cooking" | "anime";
  format: "short_form" | "episodic";
  targetPlatforms: ("youtube" | "instagram")[];
  status: "active" | "paused" | "error";
}

export interface MockPipelineRun {
  id: string;
  contentLineId: string;
  topic: string;
  category: string;
  stage: PipelineStage;
  platform?: "youtube" | "instagram" | "both";
  videoId?: string;
  errorMessage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MockSeriesState {
  contentLineId: string;
  currentEpisode: number;
  characterBible: string;
  plotSummarySoFar: string;
}

export interface MockVideo {
  id: string;
  contentLineId: string;
  platform: string;
  externalVideoId: string;
  title: string;
  publishedAt: string;
  views: number;
  ctr: number;
  retentionPct: number;
  retention3sPct: number;
}

export const WORKSPACE: MockWorkspace = {
  id: "ws_demo_123",
  name: "Demo Studio",
  planTier: "pro",
  monthlyBudgetUsd: 100,
};

export const CONTENT_LINES: MockContentLine[] = [
  {
    id: "cl_kids_01",
    workspaceId: WORKSPACE.id,
    name: "Kids Stories",
    category: "kids_stories",
    format: "short_form",
    targetPlatforms: ["youtube"],
    status: "active",
  },
  {
    id: "cl_travel_02",
    workspaceId: WORKSPACE.id,
    name: "Wanderlust Shorts",
    category: "travel",
    format: "short_form",
    targetPlatforms: ["youtube", "instagram"],
    status: "active",
  },
  {
    id: "cl_cooking_03",
    workspaceId: WORKSPACE.id,
    name: "Quick Bites",
    category: "cooking",
    format: "short_form",
    targetPlatforms: ["instagram"],
    status: "active",
  },
  {
    id: "cl_anime_04",
    workspaceId: WORKSPACE.id,
    name: "Anime Saga",
    category: "anime",
    format: "episodic",
    targetPlatforms: ["youtube"],
    status: "active",
  },
];

export const SERIES_STATE: MockSeriesState[] = [
  {
    contentLineId: "cl_anime_04",
    currentEpisode: 4,
    characterBible:
      "Aiko: Reluctant hero with shadow magic. Ren: Overconfident rival who secretly cares.",
    plotSummarySoFar:
      "Aiko and Ren discovered the hidden temple but awakened the crystal guardian.",
  },
];

const now = new Date();
const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
const twoDaysAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000);

// Global mutable state for runs so we can animate one
export const PIPELINE_RUNS: MockPipelineRun[] = [
  // Completed runs
  {
    id: "run_kids_1",
    contentLineId: "cl_kids_01",
    topic: "The Brave Little Cloud",
    category: "kids_stories",
    stage: "completed",
    platform: "youtube",
    videoId: "kids_vid_1",
    createdAt: twoDaysAgo.toISOString(),
    updatedAt: twoDaysAgo.toISOString(),
  },
  {
    id: "run_travel_1",
    contentLineId: "cl_travel_02",
    topic: "Hidden Cafes in Kyoto",
    category: "travel",
    stage: "completed",
    platform: "both",
    videoId: "travel_vid_1",
    createdAt: yesterday.toISOString(),
    updatedAt: yesterday.toISOString(),
  },
  // Active / animating run (we will cycle its stage)
  {
    id: "run_cooking_live",
    contentLineId: "cl_cooking_03",
    topic: "3-Ingredient Pasta That Went Viral",
    category: "cooking",
    stage: "research", // starts at research, will animate
    createdAt: new Date(now.getTime() - 1000 * 60).toISOString(),
    updatedAt: new Date(now.getTime() - 1000 * 60).toISOString(),
  },
  // Specific states for UI demonstration
  {
    id: "run_kids_review",
    contentLineId: "cl_kids_01",
    topic: "Dino Friends Save the Day",
    category: "kids_stories",
    stage: "awaiting_review", // specifically for the review gate
    createdAt: new Date(now.getTime() - 1000 * 60 * 30).toISOString(),
    updatedAt: now.toISOString(),
  },
  {
    id: "run_anime_failed",
    contentLineId: "cl_anime_04",
    topic: "Episode 4: The Crystal Guardian",
    category: "anime",
    stage: "failed",
    errorMessage: "Kling API rate limit exceeded during generation.",
    createdAt: new Date(now.getTime() - 1000 * 60 * 120).toISOString(),
    updatedAt: new Date(now.getTime() - 1000 * 60 * 100).toISOString(),
  },
];

export const VIDEOS: MockVideo[] = [
  {
    id: "vid_1",
    contentLineId: "cl_kids_01",
    platform: "youtube",
    externalVideoId: "yt_123abc",
    title: "The Brave Little Cloud | Bedtime Story",
    publishedAt: twoDaysAgo.toISOString(),
    views: 45200,
    ctr: 0.075,
    retentionPct: 0.68,
    retention3sPct: 0.88,
  },
  {
    id: "vid_2",
    contentLineId: "cl_travel_02",
    platform: "instagram",
    externalVideoId: "ig_456def",
    title: "Kyoto's Hidden Cafes ☕️",
    publishedAt: yesterday.toISOString(),
    views: 12400,
    ctr: 0.042,
    retentionPct: 0.52,
    retention3sPct: 0.71,
  },
  {
    id: "vid_3",
    contentLineId: "cl_travel_02",
    platform: "youtube",
    externalVideoId: "yt_789ghi",
    title: "Kyoto's Hidden Cafes (Shorts)",
    publishedAt: yesterday.toISOString(),
    views: 8900,
    ctr: 0.038,
    retentionPct: 0.45,
    retention3sPct: 0.65,
  },
];

export const COSTS = {
  totalSpent: 34.5,
  limit: 100,
};

// --- Live Animation Logic ---
// We will advance the `run_cooking_live` pipeline every 8 seconds on the client via API polling or directly in memory if this was a singleton.
// Since Next.js API routes are stateless in dev, we'll keep state in a global object.

const LIVE_STAGES: PipelineStage[] = [
  "research",
  "decide_content",
  "write_hook",
  "write_script",
  "generate_voice",
  "generate_video",
  "assemble",
  "publish",
  "completed",
];

let currentIndex = 0;

export function advanceLivePipeline() {
  const run = PIPELINE_RUNS.find((r) => r.id === "run_cooking_live");
  if (run) {
    if (currentIndex < LIVE_STAGES.length - 1) {
      currentIndex++;
      run.stage = LIVE_STAGES[currentIndex];
      run.updatedAt = new Date().toISOString();
    } else {
      // loop it for demo purposes
      currentIndex = 0;
      run.stage = LIVE_STAGES[currentIndex];
      run.updatedAt = new Date().toISOString();
    }
  }
}
