import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {tap} from 'rxjs/operators';

export class Response {
  sessions: Event[];
}

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/x-www-form-urlencoded",
};

const httpOptions = {
  headers: new HttpHeaders(headers)
};

@Injectable()
export class ScheduleService {

  constructor(private http: HttpClient) { }

  getSchedule() {
    const url = "http://localhost:3000";
    const params = {};
    return this.http.post<Response>(url, params, httpOptions).pipe(
      tap(r => console.log(r)),
    );
  }
}
