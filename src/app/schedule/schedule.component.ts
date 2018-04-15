import { Component, Input, OnInit } from '@angular/core';
import { ScheduleService } from './schedule.service';
import { CalendarEvent } from 'angular-calendar';
import {
  isSameDay,
  isSameMonth
} from 'date-fns';
import { NgEvent } from '../event.model';
import { CalendarMonthViewDay } from 'angular-calendar';

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
// exclude weekends
  excludeDays: number[] = [0, 6];

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

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach(cell => {
      const groups: any = {};
      cell.events.forEach((event: CalendarEvent<NgEvent>) => {
        groups[event.meta.location] = groups[event.meta.location] || [];
        groups[event.meta.location].push(event);
      });
      cell['eventGroups'] = Object.entries(groups);
    });
  }
}
