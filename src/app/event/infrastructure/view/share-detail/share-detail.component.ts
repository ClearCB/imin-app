import { Component, OnInit } from '@angular/core';
import { QrGeneratorComponent } from '../../../../config/qr-generator/qr-generator.component';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { EventModel } from '../../../domain/model/event-model';

@Component({
  selector: 'app-share-detail',
  standalone: true,
  imports: [QrGeneratorComponent],
  templateUrl: './share-detail.component.html',
  styleUrl: './share-detail.component.scss'
})
export class ShareDetailComponent implements OnInit {

  eventId: string = "";

  imageSrc: string | undefined = "";

  twitterUrl: string | undefined;


  event?: EventModel;

  eventParamId?: string | null;
  eventDataId?: string;

  loaded: boolean = false;

  constructor(private dialogConfig: DynamicDialogConfig) {

  }
  ngOnInit(): void {
    if (this.dialogConfig.data) {
      this.event = this.dialogConfig.data;
      this.eventDataId = this.dialogConfig.data.id;


    }

    if (this.event) {
      this.twitterUrl = `https://twitter.com/intent/tweet?text=Join me at this event%20${this.event.title}%20https://iminapp.es/event/${this.event.id}`
    }
  }
}
