import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventModel } from '../../../domain/model/event-model';
import { EventService } from '../../service/event.service';
import { NgStyle } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { EventDetailComponent } from '../event-detail/event-detail.component';
import { CheckboxModule } from 'primeng/checkbox';
import { MapLayoutComponent } from '../../../../map/infrastructure/view/map-layout/map-layout.component';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CustomFileComponent } from '../../../../shared/infrastructure/view/custom-file/custom-file.component';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { CalendarModule } from 'primeng/calendar';
import { StepperModule, StepperPanel } from 'primeng/stepper';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
  selector: 'app-event-create-form',
  standalone: true,
  imports: [
    ReactiveFormsModule, EventDetailComponent,
    ButtonModule, ChipModule, FormsModule, RippleModule,
    NgStyle, MenuModule, InputTextModule, CheckboxModule,
    MapLayoutComponent, FloatLabelModule, InputTextareaModule, MultiSelectModule,
    CustomFileComponent, CalendarModule, StepperModule, DropdownModule
  ],
  templateUrl: './event-create-form.component.html',
  styleUrl: './event-create-form.component.scss'
})
export class EventCreateFormComponent implements OnInit {

  //   {
  //     "title": "MYSUPERSTITLE",
  //     "smallDescription": "mysmalldescription",
  //     "largeDescription": "largeDescription",
  //     "locationName": "Library1234567891",
  //     "latitude": 40.878,
  //     "longitude": -87.6298,
  //     "isOnline": true,
  //     "startDate":"2024-05-01T00:00:00",
  //     "finishDate": "2024-05-15T00:00:00",
  //     "tags":[
  //         ],
  //     "categories":[{"id":8}]
  // } 
  // Forms
  eventForm = this.formBuilder.group({

    title: ["", [Validators.required]],
    smallDescription: ["", Validators.required],
    largeDescription: ["", Validators.required],
    locationName: ["", [Validators.required]],
    latitude: [0, [Validators.required]],
    longitude: [0, [Validators.required]],
    online: [true, [Validators.required]],

  });

  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventService,
  ) { }
  ngOnInit(): void {
  }

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
