import { StorageProvider } from "./provider";

/**
 * Phase 1 local storage implementation.
 */
export class LocalStorageProvider implements StorageProvider {
  async upload(file: Buffer | Uint8Array, path: string, mimeType: string): Promise<string> {
    // Stub: in reality this would write to a public/uploads folder.
    return `http://localhost:3000/uploads/${path}`;
  }

  async getUrl(path: string): Promise<string> {
    return `http://localhost:3000/uploads/${path}`;
  }
}

export const storage = new LocalStorageProvider();
