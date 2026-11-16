import { Component, OnInit } from '@angular/core';
import { environment } from './environments/environment';
import { PostHogService } from './app/services/posthog.service';

@Component({
  selector: 'app-root',
  template: `<app-home></app-home>`
})
export class AppComponent implements OnInit {
  constructor(private posthogService: PostHogService) {}

  ngOnInit(): void {
    if (!environment.posthogKey) {
      if (!environment.production) {
        console.error('NG_APP_POSTHOG_PROJECT_TOKEN variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once NG_APP_POSTHOG_PROJECT_TOKEN is configured');
      }
      return;
    }

    if (!environment.posthogHost) {
      if (!environment.production) {
        console.error('NG_APP_POSTHOG_HOST variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once NG_APP_POSTHOG_HOST is configured');
      }
      return;
    }

    this.posthogService.init(
      environment.posthogKey,
      environment.posthogHost
    );
  }
}
