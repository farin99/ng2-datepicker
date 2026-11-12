import { Component, OnInit } from '@angular/core';
import { environment } from './environments/environment';
import { PostHogService } from './services/posthog.service';
import { PostHogLogService } from './services/posthog-log.service';

@Component({
  selector: 'app-root',
  template: `<app-home></app-home>`
})
export class AppComponent implements OnInit {
  constructor(
    private posthogService: PostHogService,
    private posthogLogService: PostHogLogService
  ) {}

  ngOnInit(): void {
    if (!environment.posthogKey || !environment.posthogHost) {
      if (!environment.production) {
        if (!environment.posthogKey) {
          console.error('NG_APP_POSTHOG_PROJECT_TOKEN variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once NG_APP_POSTHOG_PROJECT_TOKEN is configured');
        }

        if (!environment.posthogHost) {
          console.error('NG_APP_POSTHOG_HOST variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once NG_APP_POSTHOG_HOST is configured');
        }
      }
      return;
    }

    this.posthogService.init(
      environment.posthogKey,
      environment.posthogHost,
      environment.production ? 'production' : 'development'
    );
    this.posthogLogService.info('datepicker demo initialized');
  }
}
