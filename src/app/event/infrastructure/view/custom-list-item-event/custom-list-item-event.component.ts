import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileService } from '../../../../shared/infrastructure/service/file-service.service';
import { SHARED_CONSTANTS } from '../../../../shared/shared-constants';
import { EventModel } from '../../../domain/model/event-model';
import { RatingModule } from 'primeng/rating';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EventService } from '../../service/event.service';

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

  constructor(private router: Router, private fileService: FileService, private eventService: EventService) { }
  async ngOnInit() {
    
    if (this.event) {
      this.imageSrc = await this.fileService.getImagesFromEvent(this.event?.id);
      
      if(!this.imageSrc){
        this.imageSrc = "assets/images/generic.jpg"
      }
    } 
  }

  goToEventDetail(event: EventModel) {

    this.eventService.goToEventDetail(event);

    // this.router.navigateByUrl(`/${SHARED_CONSTANTS.ENDPOINTS.EVENT.NAME}/${SHARED_CONSTANTS.ENDPOINTS.EVENT.CHILDREN.DETAIL}/${eventId}`);
  }
}

