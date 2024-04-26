import { Component } from '@angular/core';
import { Validators, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventModel } from '../../../domain/model/event-model';
import { EventService } from '../../service/event.service';
import { NgStyle } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { EventDetailComponent } from '../event-detail/event-detail/event-detail.component';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-event-create-form',
  standalone: true,
  imports: [
    ReactiveFormsModule, EventDetailComponent,
    ButtonModule, ChipModule, FormsModule, RippleModule,
    NgStyle, MenuModule, InputTextModule, CheckboxModule
  ],
  templateUrl: './event-create-form.component.html',
  styleUrl: './event-create-form.component.scss'
})
export class EventCreateFormComponent {

  // Forms
  eventForm = this.formBuilder.group({

    title: ["my title", [Validators.required]],
    smallDescription: ["small description", Validators.required],
    largeDescription: ["large description", Validators.required],
    locationName: ["nombre location", [Validators.required]],
    latitude: [-65.732, [Validators.required]],
    longitude: [65.732, [Validators.required]],
    online: [true, [Validators.required]],

  });

  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventService,
  ) { }

  async handleSubmit() {

    if (this.eventForm.valid) {

      const event = this.eventForm.value as EventModel;

      const eventCreated = await this.eventService.createEvent(event);

      if (eventCreated) {
        this.eventForm.reset();
      }

    } else {

      this.eventForm.markAllAsTouched();
    }

  }

}
