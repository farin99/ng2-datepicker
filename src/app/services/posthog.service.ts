import { Injectable } from '@angular/core';

declare const require: any;

const posthog: any = require('posthog-js');

@Injectable()
export class PostHogService {
  private initialized = false;

  get client(): any {
    return posthog;
  }

  init(apiKey: string, apiHost: string): void {
    if (!this.initialized) {
      posthog.init(apiKey, {
        api_host: apiHost
      });
      this.initialized = true;
    }
  }

  capture(eventName: string): void {
    if (this.initialized) {
      posthog.capture(eventName);
    }
  }

  captureException(error: any): void {
    if (this.initialized) {
      posthog.captureException(error);
    }
  }
}
