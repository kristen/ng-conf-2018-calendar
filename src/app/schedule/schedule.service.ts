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
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  "Venezia": {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  "3rd Floor": {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  },
  "Grand Ballroom": {
    primary: '#934b33',
    secondary: '#ac725e',
  },
  "Gateway": {
    primary: '#7a45c9',
    secondary: '#a47ae2',
  },
  "Grand America Hotel 1st &amp; 3rd Floor": {
    primary: '#f83a22',
    secondary: '#df5c4b',
  },
  "Grand Ballroom A/D": {
    primary: '#ffad46',
    secondary: '#d9be9d',
  },
  "Grand Ballroom B": {
    primary: '#16a765',
    secondary: '#99b8ad',
  },
  "Grand Ballroom C": {
    primary: '#7bd148',
    secondary: '#bdd1b3',
  },
  "Imperial Ballroom": {
    primary: '#a4505c',
    secondary: '#cabdbf',
  },
  "Imperial Ballroom C": {
    primary: '#d06b64',
    secondary: '#dbbeba',
  },
  "Imperial Ballroom D": {
    primary: '#42d692',
    secondary: '#bcdbd0',
  },
  "Imperial Reception B/C": {
    primary: '#fbe983',
    secondary: '#fffad6',
  },
  "Imperial Ballroom A": {
    primary: '#9a9cff',
    secondary: '#e6e5ff',
  },
  "Savoy": {
    primary: '#92e1c0',
    secondary: '#d5ede5',
  },
  "Riviera": {
    primary: '#4286f4',
    secondary: '#ccdffc',
  },
  "default": {
    primary: '#f97b20',
    secondary: '#ffd2b2',
  },
  "": {
    primary: '#2356ff',
    secondary: '#8094d9',
  }
};

@Injectable()
export class ScheduleService {
  private baseUrl = '/api';

  constructor(private http: HttpClient) { }

  getEvents(): Observable<CalendarEvent<NgEvent>[]> {
    return this.getSchedule().pipe(map(response => {
      return response.sessions
        .map(session => this.ngEventToCalendarEvent(session));
    }));
  }

  private getSchedule(): Observable<Response> {
    return this.http.get<Response>(this.baseUrl + '/sessions', httpOptions);
  }

  private ngEventToCalendarEvent(event: NgEvent): CalendarEvent<NgEvent> {
    const start = new Date(Date.parse(`${event.date}, 2018 ${event.time}`));
    const end = new Date(Date.parse(`${event.date}, 2018 ${event.end_time}`));
    const color = (() => {
      if (!colors[event.location]) {
        console.warn("event missing color, using default", event);
        return colors["default"];
      } else {
        return colors[event.location];
      }
    })();
    return {
      start,
      end,
      title: event.post_title,
      color: color,
      meta: event,
    } as CalendarEvent;
  }
}
