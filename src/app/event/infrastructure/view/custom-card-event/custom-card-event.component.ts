import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { EventModel } from '../../../domain/model/event-model';
import { FileService } from '../../../../shared/infrastructure/service/file-service.service';
import { ImageModule } from 'primeng/image';
import { ChipModule } from 'primeng/chip';
import { RatingModule } from 'primeng/rating';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EventDetailComponent } from '../event-detail/event-detail.component';
import { EventService } from '../../service/event.service';

@Component({
  selector: 'app-custom-card-event',
  standalone: true,
  imports: [ButtonModule, CardModule, ImageModule, ChipModule, RatingModule, EventDetailComponent],
  providers: [DialogService], 
  templateUrl: './custom-card-event.component.html',
  styleUrl: './custom-card-event.component.scss'
})
export class CustomCardEventComponent implements OnInit {

  imageSrc: string | undefined = "";

  ref?: DynamicDialogRef;

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

  goToEventDetail(eventId: string) {

    if (this.event){
      this.eventService.goToEventDetail(this.event);
    }

  }
}
