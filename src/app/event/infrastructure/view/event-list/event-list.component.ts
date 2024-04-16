import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterRequest } from '../../../../auth/domain/model/register-request';
import { ensureEventIsValid, EventModel } from '../../../domain/model/event-model';
import { EventService } from '../../service/event.service';
import { Router } from '@angular/router';
import { EventDetailComponent } from '../event-detail/event-detail/event-detail.component';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [ReactiveFormsModule, EventDetailComponent],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss'
})
export class EventListComponent implements OnInit {


  eventFormError: string = "";

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
