/**
 * Stub implementation of AuthProvider for Phase 1.
 * Will be wired to NextAuth in Step 2.
 */
import { AuthProvider } from "./provider";

export class NextAuthProvider implements AuthProvider {
  async getCurrentUserId(): Promise<string | null> {
    // Stub implementation until NextAuth is wired
    return null;
  }

  async getCurrentWorkspaceId(): Promise<string | null> {
    // Stub implementation until NextAuth is wired
    return null;
  }
}

export const auth = new NextAuthProvider();
