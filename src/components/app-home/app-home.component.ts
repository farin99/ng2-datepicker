import { Component } from '@angular/core';
import {DatepickerOptions} from '../../ng-datepicker/ng-datepicker.component';
import { PostHogService } from '../../app/services/posthog.service';
import * as enLocale from 'date-fns/locale/en';
import * as frLocale from 'date-fns/locale/fr';

@Component({
  selector: 'app-home',
  templateUrl: 'app-home.component.html'
})
export class AppHomeComponent {
  date: Date;
  options: DatepickerOptions = {
    locale: enLocale
  };
  constructor(private posthogService: PostHogService) {
    this.date = new Date();
  }

  onDateSelected(): void {
    this.posthogService.capture('date_selected');
  }
}
