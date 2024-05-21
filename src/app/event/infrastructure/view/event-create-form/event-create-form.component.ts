import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormsModule, ReactiveFormsModule, FormControl, NgModel } from '@angular/forms';
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
import { CalendarModule } from 'primeng/calendar';
import { StepperModule, StepperPanel } from 'primeng/stepper';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { CustomMapComponent } from '../../../../map/infrastructure/view/custom-map/custom-map.component';
import { Category } from '../../../../shared/domain/model/category';
import { CommonService } from '../../../../shared/infrastructure/service/common.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FileService } from '../../../../shared/infrastructure/service/file-service.service';
import { ImageModule } from 'primeng/image';
import { CustomCardEventComponent } from '../custom-card-event/custom-card-event.component';
import { EventListComponent } from '../event-list/event-list.component';
import { CustomListItemEventComponent } from '../custom-list-item-event/custom-list-item-event.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { User } from '../../../../auth/domain/model/user';
import { CompactUserListComponent } from '../compact-user-list/compact-user-list.component';
import { attendanceTemplate, attendanceUpdatedTemplate } from '../../../../mail/infrastructure/templates/attendance';
import { EmailService } from '../../../../mail/infrastructure/service/email.service';
import { EditorModule } from 'primeng/editor';
import { MAIL_CONSTANTS } from '../../../../mail/mail-constants';
import { NotificationService } from '../../../../shared/infrastructure/service/notification.service';

@Component({
  selector: 'app-event-create-form',
  standalone: true,
  imports: [
    ReactiveFormsModule, EventDetailComponent,
    ButtonModule, ChipModule, FormsModule, RippleModule, EditorModule,
    NgStyle, MenuModule, InputTextModule, CheckboxModule, FormsModule,
    FloatLabelModule, InputTextareaModule, MultiSelectModule,
    CustomFileComponent, CalendarModule, StepperModule, DropdownModule, CustomMapComponent,
    ImageModule, CustomCardEventComponent, CustomListItemEventComponent, EventListComponent, SelectButtonModule, CompactUserListComponent
  ],
  templateUrl: './event-create-form.component.html',
  styleUrl: './event-create-form.component.scss'
})
export class EventCreateFormComponent implements OnInit {

  stateOptions: any[] = [{ label: 'Card', value: true }, { label: 'List item', value: false }];
  showCardPreview: boolean = false;

  usersAttendance: User[] = [];

  // Forms
  eventForm = this.formBuilder.group({

    id: [""],
    title: ["", [Validators.required]],
    smallDescription: ["", Validators.required],
    largeDescription: ["EDSAAAAAAAAAAAAAAAAAAA"],
    locationName: ["", [Validators.required]],
    latitude: [0],
    longitude: [0],
    startDate: [new Date(), [Validators.required]],
    finishDate: [new Date(), [Validators.required]],
    category: [{ id: 7, name: "Unknown", icon: "unknown" }, [Validators.required]],
    isOnline: [false, [Validators.required]],

  });

  event?: EventModel;
  events: EventModel[] = [];
  categories: Category[] | undefined = [];

  eventPreviewReady: boolean = false;
  isCreateFormEvent: boolean = true;

  eventParamId?: any;

  imageSrc: string | undefined = "";

  get category() { return this.eventForm.controls.category }

  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private commonService: CommonService,
    private route: ActivatedRoute, private notificationService: NotificationService,
    private fileService: FileService,
    private emailService: EmailService
  ) {

  }

  async ngOnInit() {

    this.categories = await this.commonService.getAllCategories();

    this.eventParamId = this.route.snapshot.paramMap.get('eventId');

    if (this.eventParamId) {
      await this.getEvent(this.eventParamId);
    } else {
      this.event = this.eventForm.value as EventModel;
    }

    this.eventForm.valueChanges.subscribe(value => {
      this.event = this.setEventValue(value)
    })

    this.eventPreviewReady = true;
  }

  handleChangeTogglePreview() {

    this.showCardPreview = !this.showCardPreview;

  }


  private async getEvent(eventId: string) {

    this.eventPreviewReady = false;
    this.event = await this.eventService.getEvent(eventId) as EventModel;

    if (!this.event) {
      return;
    }


    if (this.event?.id) {
      this.imageSrc = await this.fileService.getImagesFromEvent(this.event?.id);
    }


    let category: Category | null = null;
    if (this.event.categories && this.event.categories.length > 0) {
      category = this.event.categories[0];
    }

    const initValue = {
      id: this.event.id,
      title: this.event.title,
      smallDescription: this.event.smallDescription,
      largeDescription: this.event.largeDescription,
      locationName: this.event.locationName,
      isOnline: this.event.isOnline ? this.event.isOnline : false,
      latitude: this.event.latitude,
      longitude: this.event.longitude,
      startDate: new Date(this.event.startDate),
      finishDate: new Date(this.event.finishDate),
      category: category,
    }

    const usersResponse = await this.eventService.getEventAttendance(this.event);

    if (usersResponse) {
      this.usersAttendance = usersResponse;
    }

    this.eventForm.setValue(initValue)
    this.events.length = 0;
    this.events.push(this.eventForm.value as EventModel);
    this.eventPreviewReady = true;
  }

  private setEventValue(formValue: any) {

    const v = formValue as EventModel;

    v.categories = this.eventForm.controls.category.value
      ? [this.eventForm.controls.category.value]
      : [];

    this.events.length = 0;
    this.events.push(v);
    return v;
  }

  async handleSubmit() {

    if (this.eventForm.valid) {

      const event = this.eventForm.value as EventModel;

      event.categories = this.eventForm.controls.category.value
        ? [this.eventForm.controls.category.value]
        : [];

      let eventCreated;
      if (this.eventParamId) {
        eventCreated = await this.eventService.updateEvent(this.eventParamId, event);

        const emailPromises = [];

        for (const user of this.usersAttendance) {
          if (eventCreated) {
            const emailPromise = this.emailService.sendEmail(
              user.email,
              attendanceUpdatedTemplate(user.email, user.username, eventCreated),
              "Updated event '" + this.event?.title + "'",
              "acasasgarcia@cifpfbmoll.eu"
            );
            emailPromises.push(emailPromise);
          }
        }
        
        Promise.all(emailPromises)
        .then(()=> {
          this.notificationService.showSuccess(MAIL_CONSTANTS.MESSAGES.EMAIL_SENT_USERS);
        });
      } else {
        eventCreated = await this.eventService.createEvent(event);
      }

      if (eventCreated && !this.eventParamId) {
        this.eventForm.reset();
        this.eventService.goToEventEditForm(eventCreated);
      } else if (this.eventParamId) {
        await this.getEvent(this.eventParamId);
      }

    } else {

      this.eventForm.markAllAsTouched();
    }

  }


  handleMapClicked(latLang: { lat: number, lang: number }) {
    this.eventForm.controls.longitude.setValue(latLang.lang);
    this.eventForm.controls.latitude.setValue(latLang.lat);
  }

  async handleUploadedFile() {
    if (this.event) {
      await this.getEvent(this.event.id);
    }
  }
}
