import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { AuthService } from '../../../../auth/infrastructure/service/auth.service';
import { FileService } from '../../service/file-service.service';

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

  constructor(private messageService: MessageService, private authService: AuthService, private fileService: FileService) {

  }

  async ngOnInit() {
    this.authenticated = await this.authService.isAuthenticated();
  }

  async onUpload(event: any) {

    const eventId = "";

    if (this.authenticated) {

      for (let file of event.files) {
        this.uploadedFiles.push(file);
      }

      this.fileService.upload(this.uploadedFiles, eventId)!
        .subscribe(
          {
            error: (e: any) => { this.messageService.add({ severity: 'info', summary: 'File Uploaded error', detail: e.message }); },
            next: () => { this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: '' }); }
          }
        )

    }

  }
}
