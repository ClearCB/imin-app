import { Component, OnInit } from '@angular/core';
import { EventListComponent } from '../event-list/event-list.component';
import { EventModel } from '../../../domain/model/event-model';
import { EventService } from '../../service/event.service';
import { NgStyle, NgClass, CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { MultiSelectModule } from 'primeng/multiselect';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';
import { CustomMapComponent } from '../../../../map/infrastructure/view/custom-map/custom-map.component';
import { CustomCardEventComponent } from '../custom-card-event/custom-card-event.component';
import { SearchEventComponent } from '../search-event/search-event.component';
import { NotificationService } from '../../../../shared/infrastructure/service/notification.service';
import { searchOnlineEvent, searchStartDateEvent } from '../../../application/search-event/search-event-precon-searchs';

@Component({
  selector: 'app-event-list-layout',
  standalone: true,
  imports: [EventListComponent,
    ReactiveFormsModule, CustomCardEventComponent,
    ButtonModule, ChipModule, FormsModule, RippleModule,
    NgStyle, MenuModule, InputTextModule, CustomMapComponent, DropdownModule,
    MultiSelectModule, RatingModule, SearchEventComponent, SkeletonModule, NgClass,
    DataViewModule,
    TagModule,
    RatingModule,
    ButtonModule,
    CommonModule,
  ],
  templateUrl: './event-list-layout.component.html',
  styleUrl: './event-list-layout.component.scss'
})
export class EventListLayoutComponent implements OnInit {

  events: EventModel[] = [];
  isDataLoaded: boolean = false;
  dataSearched: boolean = false;

  constructor(
    private eventService: EventService, private notificationService: NotificationService
  ) { }

  async ngOnInit(): Promise<void> {
    this.getClosesEvents();
  }

  private async getClosesEvents() {

    this.dataSearched = true;
    this.events.length = 0;
    
    const startDate = new Date();
    const eOptions = searchStartDateEvent(startDate);
    this.eventService.searchEvents(eOptions)
      .then((events) => {
        if (events) {
          this.events = events;
        }
      })
      .catch((e) => {
        this.notificationService.showError(e.error.message);
      })
      .finally(() => this.isDataLoaded = true)

  }

  handleEventSearch(eventSearch: Promise<EventModel[] | undefined>) {

    this.dataSearched = true;
    this.events.length = 0;

    eventSearch
      .then((events) => {
        if (events) {
          this.events = events;
        }
      })
      .catch((e) => {
        this.notificationService.showError(e.error.message);
      })
      .finally(() => this.isDataLoaded = true)



  }

}