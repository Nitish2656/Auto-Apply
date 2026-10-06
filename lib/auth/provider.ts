export interface AuthProvider {
  /**
   * Returns the current authenticated user's ID, or null if not logged in.
   */
  getCurrentUserId(): Promise<string | null>;

  /**
   * Returns the workspace ID associated with the current session.
   * If the user is logged in, this should always return their workspace ID.
   */
  getCurrentWorkspaceId(): Promise<string | null>;
}
