import { SecretsProvider } from "./provider";

/**
 * Phase 1 implementation of SecretsProvider.
 * In a real implementation, this would use the ENCRYPTION_KEY env var
 * and Node's crypto module (e.g. aes-256-gcm) to encrypt/decrypt the secret,
 * and store the ciphertext in a dedicated DB table or directly inside the
 * oauth_connections table if the ref IS the ciphertext.
 *
 * For now, this is a stub. We'll implement the actual crypto logic in Step 3
 * when wiring OAuth flows.
 */
export class EncryptedDbSecretsProvider implements SecretsProvider {
  async storeSecret(workspaceId: string, plaintextSecret: string): Promise<string> {
    // TODO: implement AES-256-GCM encryption
    return `encrypted_${plaintextSecret}_ref`;
  }

  async getSecret(workspaceId: string, secretRef: string): Promise<string> {
    // TODO: implement AES-256-GCM decryption
    return secretRef.replace("encrypted_", "").replace("_ref", "");
  }

  async deleteSecret(workspaceId: string, secretRef: string): Promise<void> {
    // TODO: implement
  }
}

export const secrets = new EncryptedDbSecretsProvider();
