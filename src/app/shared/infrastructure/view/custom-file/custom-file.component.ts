import { HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { AuthService } from '../../../../auth/infrastructure/service/auth.service';
import { FileService } from '../../service/file-service.service';
import { EventModel } from '../../../../event/domain/model/event-model';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-custom-file',
  standalone: true,
  imports: [FileUploadModule],
  templateUrl: './custom-file.component.html',
  styleUrl: './custom-file.component.scss'
})
export class CustomFileComponent implements OnInit {

  uploadedFiles: any[] = [];
  httpHeaders: HttpHeaders = new HttpHeaders();
  authenticated: boolean | string | undefined = false;

  @Input()
  eventId: string | null = null;

  @Output() uploadedFile: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private messageService: MessageService, private authService: AuthService, private fileService: FileService) {

  }

  async ngOnInit() {
    this.authenticated = await this.authService.isAuthenticated();
  }

  async onUpload(eventUploadClick: any) {

    if (this.authenticated && this.eventId) {

      for (let file of eventUploadClick.files) {
        this.uploadedFiles.push(file);
      }

      this.fileService.upload(this.uploadedFiles, this.eventId)
        .subscribe(
          {
            error: (e: any) => { 
              this.messageService.add({ severity: 'info', summary: 'File Uploaded error', detail: e.message }); },
            next: () => {
              this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: '' });
              this.uploadedFile.emit(true);
            }

          }
        )

        this.uploadedFiles.length = 0;
    }

  }
}
