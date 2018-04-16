import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  view = 'day';
  viewDate: Date = new Date();

  setViewDay(day) {
    this.viewDate = new Date(this.viewDate.setDate(day));
  }
}
