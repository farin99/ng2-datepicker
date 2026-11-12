import { Injectable } from '@angular/core';
import { PostHogService } from './posthog.service';

export interface PostHogLogAttributes {
  [key: string]: string | number | boolean;
}

@Injectable()
export class PostHogLogService {
  constructor(private posthogService: PostHogService) {}

  info(message: string, attributes: PostHogLogAttributes = {}): void {
    if (!this.posthogService.isInitialized) {
      return;
    }

    this.posthogService.posthog.logger.info(message, attributes);
  }
}
