export interface SecretsProvider {
  /**
   * Encrypts and stores a secret, returning an opaque reference string.
   */
  storeSecret(workspaceId: string, plaintextSecret: string): Promise<string>;

  /**
   * Retrieves and decrypts a secret using its opaque reference string.
   */
  getSecret(workspaceId: string, secretRef: string): Promise<string>;

  /**
   * Deletes a secret from storage.
   */
  deleteSecret(workspaceId: string, secretRef: string): Promise<void>;
}
