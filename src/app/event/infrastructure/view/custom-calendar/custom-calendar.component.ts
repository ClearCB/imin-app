import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';

@Component({
  selector: 'app-custom-calendar',
  standalone: true,
  imports: [CalendarModule, CommonModule, FullCalendarModule,],
  templateUrl: './custom-calendar.component.html',
  styleUrl: './custom-calendar.component.scss'
})
export class CustomCalendarComponent {
  calendarOptions: CalendarOptions = {
    initialView: 'timeGridDay',
    plugins: [timeGridPlugin],
    events: [
      { title: 'event 1', date: '2024-04-26' },
      { title: 'event 2', date: '2019-04-02' }
    ]
  };

  // dateClick: this.handleDateClick.bind(this),


  handleDateClick(arg: any) {
    alert('Date clicked: ' + arg.dateStr);
  }
}
