import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SHARED_CONSTANTS } from '../../../../shared/shared-constants';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { EventModel } from '../../../domain/model/event-model';
import { FileService } from '../../../../shared/infrastructure/service/file-service.service';
import { ImageModule } from 'primeng/image';
import { ChipModule } from 'primeng/chip';
import { RatingModule } from 'primeng/rating';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EventDetailComponent } from '../event-detail/event-detail.component';

@Component({
  selector: 'app-custom-card-event',
  standalone: true,
  imports: [ButtonModule, CardModule, ImageModule, ChipModule, RatingModule],
  templateUrl: './custom-card-event.component.html',
  styleUrl: './custom-card-event.component.scss'
})
export class CustomCardEventComponent implements OnInit {

  imageSrc: string | undefined = "";

  ref: DynamicDialogRef | undefined;

  @Input()
  event: EventModel | null = null;

  constructor(private router: Router, private fileService: FileService, private dialogService: DialogService) { }
  async ngOnInit() {

    if (this.event) {
      this.imageSrc = await this.fileService.getImagesFromEvent(this.event?.id);
    }
  }

  goToEventDetail(eventId: string) {
    this.ref = this.dialogService.open(EventDetailComponent, {
      data: this.event,
      header: 'Select a Product',
      width: '85vw',
      modal: true,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
      baseZIndex: 10000,
      maximizable: true
    });


    // this.router.navigateByUrl(`/${SHARED_CONSTANTS.ENDPOINTS.EVENT.NAME}/${SHARED_CONSTANTS.ENDPOINTS.EVENT.CHILDREN.DETAIL}/${eventId}`);
  }
}
