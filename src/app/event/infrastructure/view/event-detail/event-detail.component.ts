import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Validators, FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventModel } from '../../../domain/model/event-model';
import { EventService } from '../../service/event.service';
import { NgStyle } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { CheckboxModule } from 'primeng/checkbox';
import { FileService } from '../../../../shared/infrastructure/service/file-service.service';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AuthService } from '../../../../auth/infrastructure/service/auth.service';
import { LoginResponse } from '../../../../auth/domain/model/login-response';
import { User } from '../../../../auth/domain/model/user';
import { CompactUserListComponent } from '../compact-user-list/compact-user-list.component';
import { Category } from '../../../../shared/domain/model/category';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SHARED_CONSTANTS } from '../../../../shared/shared-constants';
import { CalendarModule } from 'primeng/calendar';
import { CustomMapDetailComponent } from '../../../../map/infrastructure/view/custom-map-detail/custom-map-detail.component';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [
    ReactiveFormsModule, EventDetailComponent,
    ButtonModule, ChipModule, FormsModule, RippleModule,
    NgStyle, MenuModule, InputTextModule, CheckboxModule,
    CompactUserListComponent, CustomMapDetailComponent,
    DropdownModule, InputTextareaModule, CalendarModule, CheckboxModule,
    ChipModule, ImageModule
  ],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.scss'
})
export class EventDetailComponent {

  @Input({ required: false })
  eventId: string = "";

  @Output() submitEventEmiter: EventEmitter<void> = new EventEmitter<void>();
  @Output() deleteEventEmiter: EventEmitter<void> = new EventEmitter<void>();

  imageSrc: string | undefined = "";

  events: EventModel[] = [];

  userInfo?: LoginResponse | null;

  event?: EventModel;

  usersLoaded: boolean = false;
  usersAttendance: User[] = [];

  eventDetailUrl: string = `/${SHARED_CONSTANTS.ENDPOINTS.EVENT.NAME}/${SHARED_CONSTANTS.ENDPOINTS.EVENT.CHILDREN.DETAIL}/${this.event?.id}`;


  // Forms
  eventForm = this.formBuilder.group({

    title: ["", [Validators.required]],
    smallDescription: ["", Validators.required],
    largeDescription: ["", Validators.required],
    locationName: ["", [Validators.required]],
    latitude: [0, [Validators.required]],
    longitude: [0, [Validators.required]],
    startDate: new FormControl<Date | null>(null),
    finishDate: new FormControl<Date | null>(null),
    categoryId: [{ id: 0, name: "", icon: "" }, [Validators.required]],
    // tagsId: [0, [Validators.required]],
    isOnline: [true, [Validators.required]],

  });

  categories: Category[] | undefined = [];

  constructor(
    private formBuilder: FormBuilder,
    private fileService: FileService,
    private eventService: EventService,
    private dialogConfig: DynamicDialogConfig,
    private authService: AuthService,
    private route: ActivatedRoute) { }


  async ngOnInit(): Promise<void> {

    const eventParamId = this.route.snapshot.paramMap.get('eventId');

    if (eventParamId) {
      await this.getEvent(eventParamId);
    }
    else if (this.dialogConfig.data) {
      this.event = this.dialogConfig.data;

      if (this.event) {
        await this.getEvent(this.event.id);
      }
    }

    this.authService.currentUserLogged.subscribe({
      next: (userData) => this.userInfo = userData
    })

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

    if (this.event?.id) {
      this.imageSrc = await this.fileService.getImagesFromEvent(this.event?.id);
    }

    if (this.event) {
      const usersResponse = await this.eventService.getEventAttendance(this.event);

      if (usersResponse) {
        this.usersAttendance = usersResponse;
      }

      this.events.push(this.event);
    }

    this.usersLoaded = true

    this.eventForm.setValue(initValue)
    // this.initFormValues(this.event);
  }

  private initFormValues(event: EventModel) {

    if (this.event) {
      this.eventForm.controls.title.setValue(this.event?.title);
      this.eventForm.controls.smallDescription.setValue(this.event?.smallDescription);
      this.eventForm.controls.largeDescription.setValue(this.event?.largeDescription);
      this.eventForm.controls.latitude.setValue(this.event?.latitude);
      this.eventForm.controls.locationName.setValue(this.event?.locationName);
      this.eventForm.controls.startDate.setValue(this.event?.startDate);
      this.eventForm.controls.finishDate.setValue(this.event?.finishDate);
      this.eventForm.controls.isOnline.setValue(this.event?.isOnline);
    }
  }
  async handleSubmit() {

    if (this.eventForm.valid) {

      const event = this.eventForm.value as EventModel;

      event.categories = this.eventForm.controls.categoryId.value
        ? [this.eventForm.controls.categoryId.value]
        : [];

      const eventCreated = await this.eventService.updateEvent(this.eventId, event);

      if (eventCreated) {
        this.eventForm.reset();
      }

    } else {

      this.eventForm.markAllAsTouched();
    }

  }

  async handleAttendProcess() {

    if (this.event && this.userInfo?.userData) {
      await this.eventService.addUserToEvent(this.event, this.userInfo.userData);
      await this.getEvent(this.event.id);
    }

  }

  async handleDisAttendProcess() {

    if (this.event && this.userInfo?.userData) {
      await this.eventService.removeUserFromEvent(this.event, this.userInfo.userData);
      await this.getEvent(this.event.id);
    }

  }


  async deleteEvent() {

    if (this.event?.id) {
      await this.eventService.deleteEvent(this.event.id);
      this.deleteEventEmiter.emit();
    }

  }

  handleMapClicked(latLang: { lat: number, lang: number }) {
    this.eventForm.controls.longitude.setValue(latLang.lang);
    this.eventForm.controls.latitude.setValue(latLang.lat);
  }
}
