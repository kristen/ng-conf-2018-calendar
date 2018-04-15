import { Component, Input, OnInit } from '@angular/core';
import { ScheduleService } from './schedule.service';
import { CalendarEvent } from 'angular-calendar';
import {
  isSameDay,
  isSameMonth
} from 'date-fns';
import { NgEvent } from '../event.model';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  @Input() view: string;
  @Input() viewDate: Date;
  activeDayIsOpen = true;
  events: CalendarEvent<NgEvent>[] = [];

  constructor(private scheduleService: ScheduleService) { }

  ngOnInit() {
    this.scheduleService.getEvents()
      .subscribe(events => this.events = events);
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventClicked(event: CalendarEvent<NgEvent>): void {
    window.open(
      event.meta.url,
      '_blank'
    );
  }
}
