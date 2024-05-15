import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { EventModel } from '../../../domain/model/event-model';
import { FileService } from '../../../../shared/infrastructure/service/file-service.service';
import { ImageModule } from 'primeng/image';
import { ChipModule } from 'primeng/chip';
import { RatingModule } from 'primeng/rating';
import { EventDetailComponent } from '../event-detail/event-detail.component';
import { EventService } from '../../service/event.service';

@Component({
  selector: 'app-custom-card-event',
  standalone: true,
  imports: [ButtonModule, CardModule, ImageModule, ChipModule, RatingModule, EventDetailComponent],
  templateUrl: './custom-card-event.component.html',
  styleUrl: './custom-card-event.component.scss'
})
export class CustomCardEventComponent implements OnInit {

  imageSrc: string | undefined = "";

  @Input()
  event: EventModel | null = null;
  
  @Input()
  isUserEvent: boolean = false;

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

    if (this.event && !this.isUserEvent){
      this.eventService.goToEventDetail(this.event);
    } else if(this.event && this.isUserEvent) {
      this.eventService.goToEventEditForm(this.event);
    }

  }
}
