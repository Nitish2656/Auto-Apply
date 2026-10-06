"use server";

import { revalidatePath } from "next/cache";
import { updateDraftStatus as updateDbStatus } from "@/lib/db";
import { exec } from "child_process";
import path from "path";

export async function approveDraft(draftId: number) {
  const result = updateDbStatus(draftId, 'approved');
  if (result.success) {
    revalidatePath("/dashboard");
  }
  return result;
}

export async function rejectDraft(draftId: number) {
  const result = updateDbStatus(draftId, 'skipped');
  if (result.success) {
    revalidatePath("/dashboard");
  }
  return result;
}

export async function runPipeline() {
  const cwd = path.join(process.cwd(), 'engine');
  
  return new Promise((resolve) => {
    // Run the full pipeline in the background
    exec('python -m autoapply.cli fetch && python -m autoapply.cli score && python -m autoapply.cli contacts && python -m autoapply.cli draft && python -m autoapply.cli send', { cwd }, (error, stdout, stderr) => {
      if (error) {
        console.error("Pipeline error:", error);
        resolve({ success: false, error: error.message });
      } else {
        revalidatePath("/dashboard");
        resolve({ success: true, output: stdout });
      }
    });
    
    // We resolve immediately so the UI doesn't hang, as this can take minutes.
    // In a real app, we'd use a background worker (Temporal/Celery) and poll status.
    resolve({ success: true, message: "Pipeline started in background" });
  });
}
