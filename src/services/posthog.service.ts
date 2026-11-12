import { Injectable } from '@angular/core';

declare const require: (moduleName: string) => any;
const posthog: any = require('posthog-js');
const noop = () => undefined;
const noopPosthog = {
  capture: noop,
  captureException: noop,
  identify: noop,
  reset: noop,
  logger: { info: noop }
};

@Injectable()
export class PostHogService {
  private initialized = false;

  get posthog(): any {
    if (this.initialized) {
      return posthog;
    }

    return noopPosthog;
  }

  get isInitialized(): boolean {
    return this.initialized;
  }

  init(apiKey: string, apiHost: string, deploymentEnvironment: string): void {
    if (!this.initialized) {
      posthog.init(apiKey, {
        api_host: apiHost,
        logs: {
          serviceName: 'ng2-datepicker-demo',
          environment: deploymentEnvironment
        }
      });
      this.initialized = true;
    }
  }
}
