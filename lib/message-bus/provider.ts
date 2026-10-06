export interface MessageBus {
  /**
   * Publishes an event to a topic.
   */
  publish(topic: string, message: any): Promise<void>;

  /**
   * Subscribes to a topic.
   */
  subscribe(topic: string, handler: (message: any) => Promise<void>): Promise<void>;
}

/**
 * Phase 1 stub implementation (direct function call).
 */
export class DirectMessageBus implements MessageBus {
  private handlers: Record<string, ((message: any) => Promise<void>)[]> = {};

  async publish(topic: string, message: any): Promise<void> {
    const topicHandlers = this.handlers[topic] || [];
    await Promise.all(topicHandlers.map(handler => handler(message)));
  }

  async subscribe(topic: string, handler: (message: any) => Promise<void>): Promise<void> {
    if (!this.handlers[topic]) {
      this.handlers[topic] = [];
    }
    this.handlers[topic].push(handler);
  }
}

export const bus = new DirectMessageBus();
