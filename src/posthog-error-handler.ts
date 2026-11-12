import { ErrorHandler, Injectable } from '@angular/core';
import { PostHogService } from './services/posthog.service';

@Injectable()
export class PostHogErrorHandler implements ErrorHandler {
  constructor(private posthogService: PostHogService) {}

  handleError(error: any): void {
    const extractedError = this.extractError(error) || 'Unknown error';

    try {
      this.runOutsideAngular(() =>
        this.posthogService.posthog.captureException(extractedError)
      );
    } catch (captureError) {}

    console.error(error);
  }

  private extractError(error: any): any {
    return error && error.ngOriginalError ? error.ngOriginalError : error;
  }

  private runOutsideAngular(callback: () => void): void {
    if (typeof Zone !== 'undefined' && Zone.root && Zone.root.run) {
      Zone.root.run(callback);
      return;
    }

    callback();
  }
}

declare const Zone: any;
