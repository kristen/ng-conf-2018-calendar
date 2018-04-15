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
  "Murano": {
    secondary: '#ad2121',
    primary: '#FAE3E3'
  },
  "Venezia": {
    secondary: '#1e90ff',
    primary: '#D1E8FF'
  },
  "3rd Floor": {
    secondary: '#e3bc08',
    primary: '#FDF1BA'
  },
  "Grand Ballroom": {
    secondary: '#ac725e',
    primary: '#1d1d1d',
  },
  "Gateway": {
    secondary: '#a47ae2',
    primary: '#1d1d1d',
  },
  "Grand America Hotel 1st &amp; 3rd Floor": {
    secondary: '#f83a22',
    primary: '#1d1d1d',
  },
  "Grand Ballroom A/D": {
    secondary: '#ffad46',
    primary: '#1d1d1d',
  },
  "Grand Ballroom B": {
    secondary: '#16a765',
    primary: '#1d1d1d',
  },
  "Grand Ballroom C": {
    secondary: '#7bd148',
    primary: '#1d1d1d',
  },
  "Imperial Ballroom": {
    secondary: '#cabdbf',
    primary: '#1d1d1d',
  },
  "Imperial Ballroom C": {
    secondary: '#d06b64',
    primary: '#1d1d1d',
  },
  "Imperial Ballroom D": {
    secondary: '#42d692',
    primary: '#1d1d1d',
  },
  "Imperial Reception B/C": {
    secondary: '#fbe983',
    primary: '#1d1d1d',
  },
  "Imperial Ballroom A": {
    secondary: '#9a9cff',
    primary: '#1d1d1d',
  },
  "Savoy": {
    secondary: '#92e1c0',
    primary: '#1d1d1d',
  },
  "": {
    secondary: "#ffffff",
    primary: "#000000"
  }
};

const LOCATIONS = [
  "Murano",
  "Venezia",
  "3rd Floor",
  "Grand Ballroom",
  "Gateway",
  "Grand America Hotel 1st &amp; 3rd Floor",
  "Grand Ballroom A/D",
  "Grand Ballroom B",
  "Grand Ballroom C",
  "Imperial Ballroom",
  "Imperial Ballroom C",
  "Imperial Reception B/C",
  "Imperial Ballroom A",
  "Savoy"];

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
    const color = colors[event.location];
    if (!color) {
      console.log("color: ", event);
    }
    return {
      start,
      end,
      title: event.post_title,
      color: color,
      meta: event,
    } as CalendarEvent;
  }
}
