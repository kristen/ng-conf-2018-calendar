import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  view = 'week';
  viewDate: Date = new Date(2018, 3, 18);

  setViewDay(day) {
    this.viewDate = new Date(this.viewDate.setDate(day));
  }
}
