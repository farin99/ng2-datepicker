import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { AppHomeComponent } from './components/app-home';
import { NgDatepickerModule } from './ng-datepicker';
import { PostHogService } from './services/posthog.service';
import { PostHogLogService } from './services/posthog-log.service';
import { PostHogErrorHandler } from './posthog-error-handler';

@NgModule({
  declarations: [
    AppComponent,
    AppHomeComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    NgDatepickerModule
  ],
  providers: [
    PostHogService,
    PostHogLogService,
    { provide: ErrorHandler, useClass: PostHogErrorHandler }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
