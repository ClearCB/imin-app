import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Validators, FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
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
import { UserData } from '../../../../auth/domain/model/user-token-data';
import { t } from '@fullcalendar/core/internal-common';
import { LoginResponse } from '../../../../auth/domain/model/login-response';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [
    ReactiveFormsModule, EventDetailComponent,
    ButtonModule, ChipModule, FormsModule, RippleModule,
    NgStyle, MenuModule, InputTextModule, CheckboxModule,

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


  userInfo?: LoginResponse | null;

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

  });

  constructor(
    private formBuilder: FormBuilder,
    private fileService: FileService,
    private dialogConfig: DynamicDialogConfig,
    private eventService: EventService,
    private authService: AuthService,
    private route: ActivatedRoute) { }


  async ngOnInit(): Promise<void> {

    // const eventId = this.route.snapshot.paramMap.get('eventId');
    if (this.dialogConfig.data) {
      this.event = this.dialogConfig.data;
    };

    this.authService.currentUserLogged.subscribe({
      next: (userData) => this.userInfo = userData
    })

    // if (eventId) {
    //   await this.getEvent(eventId);
    // }

    if (this.event?.id) {
      this.imageSrc = await this.fileService.getImagesFromEvent(this.event?.id);
    }

  }

  private async getEvent(eventId: string) {

    this.event = await this.eventService.getEvent(eventId) as EventModel;

    const initValue = {
      id: this.event.id,
      title: this.event.title,
      smallDescription: this.event.smallDescription,
      largeDescription: this.event.largeDescription,
      locationName: this.event.locationName,
      latitude: this.event.latitude,
      longitude: this.event.longitude,
    }

    this.eventForm.setValue(initValue);

  }

  async handleSubmit() {

    if (this.eventForm?.valid) {


      const event = this.eventForm.value as EventModel;

      const eventCreated = await this.eventService.updateEvent(this.eventId, event);

      if (eventCreated) {
        this.eventForm.reset();
        this.getEvent(eventCreated.id);
      }

    } else {

      this.eventForm?.markAllAsTouched();
    }

  }

  async handleAttendProcess() {

    if (this.event && this.userInfo?.userData) {
      this.eventService.addUserToEvent(this.event, this.userInfo.userData);
    }

  }

  async updateEvent(event: EventModel) {
    if (event.id && event) {

      await this.eventService.updateEvent(event.id, event);
      await this.getEvent(event.id);
    }


  }


  async deleteEvent() {

    if (this.event?.id) {
      await this.eventService.deleteEvent(this.event.id);
      this.deleteEventEmiter.emit();
    }

  }



}
