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
import { EmailService } from '../../../../mail/infrastructure/service/email.service';
import { attendanceTemplate } from '../../../../mail/infrastructure/templates/attendance';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { NotificationService } from '../../../../shared/infrastructure/service/notification.service';
import { MAIL_CONSTANTS } from '../../../../mail/mail-constants';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [
    ReactiveFormsModule, EventDetailComponent,
    ButtonModule, ChipModule, FormsModule, RippleModule,
    NgStyle, MenuModule, InputTextModule, CheckboxModule,
    CompactUserListComponent, CustomMapDetailComponent,
    DropdownModule, InputTextareaModule, CalendarModule, CheckboxModule,
    ChipModule, ImageModule, ProgressSpinnerModule
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

  twitterUrl: string | undefined;

  userInfo?: LoginResponse | null;

  event?: EventModel;

  eventParamId?: string | null;
  eventDataId?: string;

  loaded: boolean = false;
  userIsPresent: boolean = false;
  usersAttendance: User[] = [];

  loginRoute: string = `/${SHARED_CONSTANTS.ENDPOINTS.LOGIN}`;
  eventDetailUrl: string = `/${SHARED_CONSTANTS.ENDPOINTS.EVENT.NAME}/${SHARED_CONSTANTS.ENDPOINTS.EVENT.CHILDREN.DETAIL}/${this.event?.id}`;

  categories: Category[] | undefined = [];

  constructor(
    private formBuilder: FormBuilder,
    private fileService: FileService,
    private eventService: EventService,
    private dialogConfig: DynamicDialogConfig,
    private authService: AuthService,
    private emailService: EmailService,
    private notificationService:NotificationService,
    private route: ActivatedRoute) { }


  async ngOnInit(): Promise<void> {
    this.loaded = false;


    this.eventParamId = this.route.snapshot.paramMap.get('eventId');

    if (this.eventParamId) {
      this.eventDataId = this.eventParamId;
      await this.getEvent(this.eventDataId);
    }
    else if (this.dialogConfig.data) {
      this.event = this.dialogConfig.data;
      this.eventDataId = this.dialogConfig.data.id;

      if (this.eventDataId) {
        await this.getEvent(this.eventDataId);
      }
    }

    this.authService.currentUserLogged.subscribe({
      next: (userData) => this.userInfo = userData
    })

    this.userIsPresent = this.usersAttendance.findIndex(u => u.username === this.userInfo?.userData.username) != -1;
    this.loaded = true
  }

  private async getEvent(eventId: string) {


    this.events.length = 0;
    this.event = await this.eventService.getEvent(eventId) as EventModel;

    let category: Category | null = null;
    if (this.event.categories && this.event.categories.length > 0) {
      category = this.event.categories[0];
    }

    if (this.event?.id) {
      this.imageSrc = await this.fileService.getImagesFromEvent(this.event?.id);

      if (!this.imageSrc) {
        this.imageSrc = "assets/images/generic.jpg"
      }
    }

    if (this.event) {
      const usersResponse = await this.eventService.getEventAttendance(this.event);

      if (usersResponse) {
        this.usersAttendance = usersResponse;

        if (this.userInfo) {
          this.userIsPresent = usersResponse.findIndex(u => u.username === this.userInfo?.userData.username) != -1;
        }
      }

      this.twitterUrl = `https://twitter.com/intent/tweet?text=Join me at this event%20${this.event.title}%20http://localhost:4200/event/${this.event.id}`
      this.events.push(this.event);
    }


  }

  async handleAttendProcess() {

    this.loaded = false

    if (this.event && this.userInfo?.userData && this.eventDataId) {
      const userAdded = await this.eventService.addUserToEvent(this.event, this.userInfo.userData);

      if (userAdded) {
        await this.getEvent(this.eventDataId);
        this.loaded = true
        await this.emailService.sendEmail(this.userInfo.userData.email, attendanceTemplate(this.userInfo.userData.email, this.userInfo.userData.username, this.event), "New event attendance", "acasasgarcia@cifpfbmoll.eu");
        this.notificationService.showSuccess(MAIL_CONSTANTS.MESSAGES.EMAIL_SENT);


      }
    }


  }

  async handleDisAttendProcess() {

    this.loaded = false

    if (this.event && this.userInfo?.userData && this.eventDataId) {
      await this.eventService.removeUserFromEvent(this.event, this.userInfo.userData);
      await this.getEvent(this.eventDataId);
    }

    this.loaded = true

  }

  async deleteEvent() {

    this.loaded = false

    if (this.eventDataId) {
      await this.eventService.deleteEvent(this.eventDataId);
      this.deleteEventEmiter.emit();
    }

    this.loaded = true
  }


}
