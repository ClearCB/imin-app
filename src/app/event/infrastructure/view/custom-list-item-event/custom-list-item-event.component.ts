import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileService } from '../../../../shared/infrastructure/service/file-service.service';
import { SHARED_CONSTANTS } from '../../../../shared/shared-constants';
import { EventModel } from '../../../domain/model/event-model';
import { RatingModule } from 'primeng/rating';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EventCreateFormComponent } from '../event-create-form/event-create-form.component';
import { EventDetailComponent } from '../event-detail/event-detail.component';

@Component({
  selector: 'app-custom-list-item-event',
  standalone: true,
  imports: [RatingModule],
  templateUrl: './custom-list-item-event.component.html',
  styleUrl: './custom-list-item-event.component.scss'
})
export class CustomListItemEventComponent implements OnInit {

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

  goToEventDetail(event: EventModel) {

    this.ref = this.dialogService.open(EventDetailComponent, {
      data: event,
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

