import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventModel } from '../../../domain/model/event-model';
import { EventService } from '../../service/event.service';
import { EventDetailComponent } from '../event-detail/event-detail/event-detail.component';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { NgStyle } from '@angular/common';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { CustomMapComponent } from '../../../../map/infrastructure/view/custom-map/custom-map.component';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [
    ReactiveFormsModule, EventDetailComponent,
    ButtonModule, ChipModule, FormsModule, RippleModule,
    NgStyle, MenuModule, InputTextModule, CustomMapComponent
  ],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss'
})
export class EventListComponent implements OnInit {

  events: EventModel[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventService
  ) { }


  async ngOnInit(): Promise<void> {
    await this.getEvents();
  }

  private async getEvents() {
    const res = await this.eventService.getAllEvent();

    if (res) {
      this.events = res;
    }
  }

  handleEventSubmit() {
    this.getEvents()
  }

  handleEventDelete() {
    this.getEvents()
  }

}
