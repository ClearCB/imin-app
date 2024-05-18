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

  eventParamId?: string | null;
  eventDataId?: string;

  usersLoaded: boolean = false;
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
    private route: ActivatedRoute) { }


  async ngOnInit(): Promise<void> {

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
      }

      this.events.push(this.event);
    }

    this.usersLoaded = true
  }

  async handleAttendProcess() {

      if (this.event && this.userInfo?.userData && this.eventDataId) {
        await this.eventService.addUserToEvent(this.event, this.userInfo.userData);
        await this.getEvent(this.eventDataId);
      }

  }

  async handleDisAttendProcess() {

    if (this.event && this.userInfo?.userData && this.eventDataId) {
      await this.eventService.removeUserFromEvent(this.event, this.userInfo.userData);
      await this.getEvent(this.eventDataId);
    }

  }

  async deleteEvent() {

    if (this.eventDataId) {
      await this.eventService.deleteEvent(this.eventDataId);
      this.deleteEventEmiter.emit();
    }

  }


}
