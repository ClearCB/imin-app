import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { FileService } from '../../../../shared/infrastructure/service/file-service.service';
import { SHARED_CONSTANTS } from '../../../../shared/shared-constants';
import { EventModel } from '../../../domain/model/event-model';
import { RatingModule } from 'primeng/rating';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EventService } from '../../service/event.service';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { ImageModule } from 'primeng/image';
import { EventDetailComponent } from '../event-detail/event-detail.component';

@Component({
  selector: 'app-custom-list-item-event',
  standalone: true,
  imports: [ButtonModule, CardModule, ImageModule, ChipModule, RatingModule, EventDetailComponent],
  templateUrl: './custom-list-item-event.component.html',
  styleUrl: './custom-list-item-event.component.scss'
})
export class CustomListItemEventComponent implements OnInit, OnChanges {
  imageSrc: string | undefined = "";

  @Input()
  event: EventModel | null = null;

  @Input()
  isUserEvent: boolean = false;

  @Input()
  isPreviewEvent: boolean = false;

  constructor(private router: Router, private fileService: FileService, private eventService: EventService) { }

  async ngOnChanges(changes: SimpleChanges) {
    if (this.event) {
      this.imageSrc = await this.fileService.getImagesFromEvent(this.event?.id);

      if (!this.imageSrc) {
        this.imageSrc = "assets/images/generic.jpg"
      }
    }
  }
  
  async ngOnInit() {

    if (this.event) {
      this.imageSrc = await this.fileService.getImagesFromEvent(this.event?.id);

      if (!this.imageSrc) {
        this.imageSrc = "assets/images/generic.jpg"
      }
    }
  }



  opentEventDetail(eventId: string) {

    if (!this.isPreviewEvent) {

      if (this.event && !this.isUserEvent) {
        this.eventService.opentEventDetail(this.event);
      } else if (this.event && this.isUserEvent) {
        this.eventService.goToEventEditForm(this.event);
      }

    }
  }
}

