export interface AnalyticsProvider {
  /**
   * Records an event (e.g. video_viewed, pipeline_completed).
   */
  track(event: string, properties?: Record<string, any>): Promise<void>;

  /**
   * Runs an analytical query.
   */
  query(sql: string, params?: any[]): Promise<any[]>;
}
