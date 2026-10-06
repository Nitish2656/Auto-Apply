import {
  WORKSPACE,
  CONTENT_LINES,
  PIPELINE_RUNS,
  SERIES_STATE,
  VIDEOS,
  COSTS,
  advanceLivePipeline,
} from "./db";

// Helper to simulate network latency
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export class MockRepository {
  async getWorkspace(id: string) {
    await delay(300);
    // always return the demo workspace for now
    return WORKSPACE;
  }

  async getContentLines(workspaceId: string) {
    await delay(400);
    return CONTENT_LINES.filter((cl) => cl.workspaceId === workspaceId);
  }

  async getContentLine(id: string) {
    await delay(200);
    return CONTENT_LINES.find((cl) => cl.id === id) || null;
  }

  async getPipelineRuns(contentLineId?: string) {
    await delay(300);
    if (contentLineId) {
      return PIPELINE_RUNS.filter((pr) => pr.contentLineId === contentLineId);
    }
    return PIPELINE_RUNS;
  }

  async getSeriesState(contentLineId: string) {
    await delay(200);
    return SERIES_STATE.find((ss) => ss.contentLineId === contentLineId) || null;
  }

  async getVideos(contentLineId?: string) {
    await delay(400);
    if (contentLineId) {
      return VIDEOS.filter((v) => v.contentLineId === contentLineId);
    }
    return VIDEOS;
  }

  async getCosts(workspaceId: string) {
    await delay(200);
    return COSTS;
  }

  async approveReviewRun(runId: string) {
    await delay(500);
    const run = PIPELINE_RUNS.find((r) => r.id === runId);
    if (run && run.stage === "awaiting_review") {
      run.stage = "publish"; // skip to publish
      run.updatedAt = new Date().toISOString();
    }
  }

  async advanceAnimation() {
    advanceLivePipeline();
  }
}

export const mockRepo = new MockRepository();
