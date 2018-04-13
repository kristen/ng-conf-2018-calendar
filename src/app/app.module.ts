import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { ScheduleService } from './schedule/schedule.service';
import { ScheduleComponent } from './schedule/schedule.component';


@NgModule({
  declarations: [
    AppComponent,
    ScheduleComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [ScheduleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
