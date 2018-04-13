import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { CalendarEvent } from 'angular-calendar';
import { Observable } from 'rxjs/Observable';
import { NgEvent } from '../event.model';
import { EventColor } from 'calendar-utils';

export class Response {
  sessions: NgEvent[];
}

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/x-www-form-urlencoded',
};

const httpOptions = {
  headers: new HttpHeaders(headers)
};

const colors: {[color: string]: EventColor} = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Injectable()
export class ScheduleService {

  constructor(private http: HttpClient) { }

  getEvents(): Observable<CalendarEvent<NgEvent>[]> {
    return this.getSchedule().pipe(map(response => {
      return response.sessions
        .map(session => this.ngEventToCalendarEvent(session));
    }));
  }

  private getSchedule(): Observable<Response> {
    const url = 'http://localhost:3000';
    const params = {};
    return this.http.post<Response>(url, params, httpOptions).pipe(
      tap(r => console.log(r)),
    );
  }

  private ngEventToCalendarEvent(event: NgEvent): CalendarEvent<NgEvent> {
    const start = new Date(Date.parse(`${event.date}, 2018 ${event.time}`));
    const end = new Date(Date.parse(`${event.date}, 2018 ${event.end_time}`));
    return {
      start,
      end,
      title: event.post_title,
      color: colors.red,
      meta: event,
    } as CalendarEvent;
  }
}
