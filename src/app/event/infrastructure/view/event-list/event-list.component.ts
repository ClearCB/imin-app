import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventModel } from '../../../domain/model/event-model';
import { EventService } from '../../service/event.service';
import { EventDetailComponent } from '../event-detail/event-detail.component';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { CommonModule, NgClass, NgStyle } from '@angular/common';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { CustomMapComponent } from '../../../../map/infrastructure/view/custom-map/custom-map.component';
import { DropdownModule } from 'primeng/dropdown';
import { CustomCardEventComponent } from '../custom-card-event/custom-card-event.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { RatingModule } from 'primeng/rating';
import { SearchEventComponent } from '../search-event/search-event.component';
import { SkeletonModule } from 'primeng/skeleton';
import { DataViewLayoutOptions, DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { CustomListItemEventComponent } from '../custom-list-item-event/custom-list-item-event.component';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [
    ReactiveFormsModule, CustomCardEventComponent,
    ButtonModule, ChipModule, FormsModule, RippleModule,
    NgStyle, MenuModule, InputTextModule, CustomMapComponent, DropdownModule,
    MultiSelectModule, RatingModule, SearchEventComponent, SkeletonModule, NgClass,
    DataViewModule,
    TagModule,
    RatingModule,
    ButtonModule,
    CommonModule, CustomListItemEventComponent

  ],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss'
})
export class EventListComponent implements OnInit {

  @Input()
  events: EventModel[] = [];

  public dataSearched: boolean = false;
  public dataLoaded: boolean = false;

  constructor(
  ) { }


  async ngOnInit(): Promise<void> {
  }



}
