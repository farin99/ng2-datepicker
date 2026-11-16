import { ErrorHandler, Injectable } from '@angular/core';
import { PostHogService } from './posthog.service';

declare const Zone: any;

@Injectable()
export class PostHogErrorHandler implements ErrorHandler {
  constructor(private posthogService: PostHogService) {}

  handleError(error: any): void {
    const extractedError = this.extractError(error);

    if (extractedError) {
      try {
        this.runOutsideAngular(() => {
          this.posthogService.captureException(extractedError);
        });
      } catch (captureError) {
        // Error reporting must not interfere with Angular's error handling.
      }
    }

    console.error(error);
  }

  private extractError(errorCandidate: any): any {
    const error = errorCandidate && errorCandidate.ngOriginalError
      ? errorCandidate.ngOriginalError
      : errorCandidate;

    if (typeof error === 'string' || error instanceof Error) {
      return error;
    }

    if (error && typeof error === 'object' && error.name && error.message) {
      return error;
    }

    return null;
  }

  private runOutsideAngular(callback: () => void): void {
    if (typeof Zone !== 'undefined' && Zone.root && Zone.root.run) {
      Zone.root.run(callback);
      return;
    }

    callback();
  }
}
