import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventModel } from '../../../domain/model/event-model';
import { EventService } from '../../service/event.service';
import { Router } from '@angular/router';
import { EventDetailComponent } from '../event-detail/event-detail/event-detail.component';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { CalendarModule } from 'primeng/calendar';
import { NgStyle } from '@angular/common';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [
    ReactiveFormsModule, EventDetailComponent,
    ButtonModule, ChipModule, FormsModule,
    NgStyle, MenuModule
  ],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss'
})
export class EventListComponent implements OnInit {
  date1: Date | undefined;

  date2: Date | undefined;

  date3: Date | undefined;

  eventFormError: string = "";
  items!: MenuItem[];


  events: EventModel[] = [];

  // Forms
  eventForm = this.formBuilder.group({
    title: ["my title", [Validators.required]],
    smallDescription: ["small description", Validators.required],
    largeDescription: ["large description", Validators.required]
  })

  // Getters 
  get title() { return this.eventForm.controls.title }
  get smallDescription() { return this.eventForm.controls.smallDescription }
  get largeDescription() { return this.eventForm.controls.largeDescription }

  constructor(private formBuilder: FormBuilder,
    private eventService: EventService,
    private router: Router) { }


  async ngOnInit(): Promise<void> {
    await this.getEvents();
    this.items = [
      { label: 'Add New', icon: 'pi pi-fw pi-plus' },
      { label: 'Remove', icon: 'pi pi-fw pi-minus' }
    ];
  }

  private async getEvents() {
    const res = await this.eventService.getAllEvent();

    if (res) {
      this.events = res;
    }
  }

  async handleSubmit() {

    if (this.eventForm.valid) {

      const event = this.eventForm.value as EventModel;
      const eventCreated = await this.eventService.createEvent(event);

      if (eventCreated) {
        this.eventForm.reset();
        this.getEvents();
      }

    } else {

      this.eventForm.markAllAsTouched();
    }

  }



  async updateEvent(event: EventModel) {
    if (event.id && event) {

      await this.eventService.updateEvent(event.id, event);
      await this.getEvents();

    }


  }

  async deleteEvent(eventId: string) {
    if (eventId) {

      await this.eventService.deleteEvent(eventId);
      await this.getEvents();


    }


  }

}
