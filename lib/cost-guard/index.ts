/**
 * CostGuard checks remaining monthly budget before firing third-party API calls,
 * records actual cost after, and halts if exceeded.
 */
export class CostGuard {
  /**
   * Checks if a workspace has enough budget left for the estimated cost.
   * Throws an error if budget is exceeded.
   */
  async assertBudget(workspaceId: string, estimatedCostUsd: number): Promise<void> {
    // Stub implementation for Phase 1
    // Real implementation will query db to sum costs and compare with workspaces.monthly_budget_usd
  }

  /**
   * Records the actual cost incurred by an API call.
   */
  async recordCost(workspaceId: string, contentLineId: string | null, service: string, amountUsd: number, description?: string): Promise<void> {
    // Stub implementation for Phase 1
    // Real implementation will insert into costs table
  }
}

export const costGuard = new CostGuard();
