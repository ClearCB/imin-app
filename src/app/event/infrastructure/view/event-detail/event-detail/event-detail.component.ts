import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Validators, FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EventModel } from '../../../../domain/model/event-model';
import { EventService } from '../../../service/event.service';
import { NgStyle } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [
    ReactiveFormsModule, EventDetailComponent,
    ButtonModule, ChipModule, FormsModule, RippleModule,
    NgStyle, MenuModule, InputTextModule, CheckboxModule
  ],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.scss'
})
export class EventDetailComponent {

  @Input({ required: false })
  eventId: string = "";

  @Output() submitEventEmiter: EventEmitter<void> = new EventEmitter<void>();
  @Output() deleteEventEmiter: EventEmitter<void> = new EventEmitter<void>();


  event: EventModel | undefined = undefined;

  // Forms
  eventForm = this.formBuilder.group({

    id: ["", [Validators.required]],
    title: ["my title", [Validators.required]],
    smallDescription: ["small description", Validators.required],
    largeDescription: ["large description", Validators.required],
    locationName: ["nombre location", [Validators.required]],
    latitude: [-65.732, [Validators.required]],
    longitude: [65.732, [Validators.required]],
    online: [true, [Validators.required]],

  });

  constructor(private formBuilder: FormBuilder,
    private eventService: EventService,
    private router: Router) { }


  async ngOnInit(): Promise<void> {
    this.getEvent();
  }

  private async getEvent() {

    this.event = await this.eventService.getEvent(this.eventId) as EventModel;

    const initValue = {
      id: this.event.id,
      title: this.event.title,
      smallDescription: this.event.smallDescription,
      largeDescription: this.event.largeDescription,
      locationName: this.event.locationName,
      latitude: this.event.latitude,
      longitude: this.event.longitude,
      online: this.event.online,
    }

    this.eventForm.setValue(initValue);

  }

  async handleSubmit() {

    if (this.eventForm?.valid) {


      const event = this.eventForm.value as EventModel;

      const eventCreated = await this.eventService.updateEvent(this.eventId, event);

      if (eventCreated) {
        this.eventForm.reset();
        this.getEvent();
      }

    } else {

      this.eventForm?.markAllAsTouched();
    }

  }

  async updateEvent(event: EventModel) {
    if (event.id && event) {

      await this.eventService.updateEvent(event.id, event);
      await this.getEvent();
    }


  }


  async deleteEvent() {

    if (this.event?.id) {
      await this.eventService.deleteEvent(this.event.id);
      this.deleteEventEmiter.emit();
    }

  }



}
