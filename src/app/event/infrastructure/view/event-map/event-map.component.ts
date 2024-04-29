import { AfterContentChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { MapLayoutComponent } from '../../../../map/infrastructure/view/map-layout/map-layout.component';
import { FormBuilder } from '@angular/forms';
import { EventModel } from '../../../domain/model/event-model';
import { EventService } from '../../service/event.service';

@Component({
  selector: 'app-event-map',
  standalone: true,
  imports: [MapLayoutComponent],
  templateUrl: './event-map.component.html',
  styleUrl: './event-map.component.scss'
})
export class EventMapComponent implements OnInit {

  events: EventModel[] = [];
  isDataLoaded: boolean = false;

  constructor(
    private eventService: EventService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getEvents();
  }

  private async getEvents() {
    const res = await this.eventService.getAllEvent();

    if (res) {
      this.events = res;
      this.isDataLoaded = true;
    }
  }


}
