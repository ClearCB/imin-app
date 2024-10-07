import { Component, Input, OnInit } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';

@Component({
  selector: 'app-qr-generator',
  standalone: true,
  imports: [QRCodeModule],
  templateUrl: './qr-generator.component.html',
  styleUrl: './qr-generator.component.scss'
})
export class QrGeneratorComponent implements OnInit {

  @Input()
  eventId: string | undefined;
  urlAttend: string | undefined;

  ngOnInit(): void {
    this.urlAttend = 'http://localhost:8080/event/'+ this.eventId;
    // this.urlAttend = 'https:/iminapp.acgarcia.es/event/'+ this.eventId;
  }

}
