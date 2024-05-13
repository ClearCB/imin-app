import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
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
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CustomFileComponent } from '../../../../shared/infrastructure/view/custom-file/custom-file.component';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { CalendarModule } from 'primeng/calendar';
import { StepperModule, StepperPanel } from 'primeng/stepper';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { CustomMapComponent } from '../../../../map/infrastructure/view/custom-map/custom-map.component';
import { Category } from '../../../../shared/domain/model/category';
import { CommonService } from '../../../../shared/infrastructure/service/common.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-event-create-form',
  standalone: true,
  imports: [
    ReactiveFormsModule, EventDetailComponent,
    ButtonModule, ChipModule, FormsModule, RippleModule,
    NgStyle, MenuModule, InputTextModule, CheckboxModule,
    FloatLabelModule, InputTextareaModule, MultiSelectModule,
    CustomFileComponent, CalendarModule, StepperModule, DropdownModule, CustomMapComponent
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
    startDate: new FormControl<Date | null>(null),
    finishDate:  new FormControl<Date | null>(null),
    categoryId: [{ id: 0, name: "", icon: "" }, [Validators.required]],
    // tagsId: [0, [Validators.required]],
    isOnline: [true, [Validators.required]],

  });
  
  event?: EventModel;
  events: EventModel[] = [];
  categories: Category[] | undefined = [];

  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private commonService: CommonService,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {

    this.categories = await this.commonService.getAllCategories();

    const eventParamId = this.route.snapshot.paramMap.get('eventId');

    if (eventParamId) {
      await this.getEvent(eventParamId);
    } 

  }

  
  private async getEvent(eventId: string) {

    this.event = await this.eventService.getEvent(eventId) as EventModel;


    let category: Category | null = null;
    if (this.event.categories && this.event.categories.length > 0) {
      category = this.event.categories[0];
    }

    const initValue = {
      // id: this.event.id,
      title: this.event.title,
      smallDescription: this.event.smallDescription,
      largeDescription: this.event.largeDescription,
      locationName: this.event.locationName,
      isOnline: this.event.isOnline ? this.event.isOnline : false,
      latitude: this.event.latitude,
      longitude: this.event.longitude,
      startDate: new Date(this.event.startDate),
      finishDate: new Date(this.event.finishDate),
      categoryId: category,
    }

    this.eventForm.setValue(initValue)
    // this.initFormValues(this.event);
  }

  async handleSubmit() {

    console.log(this.eventForm.value);

    if (this.eventForm.valid) {

      const event = this.eventForm.value as EventModel;

      event.categories = this.eventForm.controls.categoryId.value 
      ? [this.eventForm.controls.categoryId.value]
      : [];

      const eventCreated = await this.eventService.createEvent(event);

      if (eventCreated) {
        this.eventForm.reset();
      }

    } else {

      this.eventForm.markAllAsTouched();
    }

  }


  handleMapClicked(latLang: { lat: number, lang: number }) {
    this.eventForm.controls.longitude.setValue(latLang.lang);
    this.eventForm.controls.latitude.setValue(latLang.lat);
  }
}
