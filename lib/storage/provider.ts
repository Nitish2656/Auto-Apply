export interface StorageProvider {
  /**
   * Uploads a file buffer or stream and returns a public/signed URL.
   */
  upload(file: Buffer | Uint8Array, path: string, mimeType: string): Promise<string>;

  /**
   * Returns a URL for the given path.
   */
  getUrl(path: string): Promise<string>;
}
