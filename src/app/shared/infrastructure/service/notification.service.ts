import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private messageService: MessageService) { }

  showSuccess(message: string) {
    this.messageService.clear();
    this.messageService.add({ key: "general_toast", severity: 'success', summary: 'Success', detail: message });
  }

  showError(message: string) {
    this.messageService.clear();
    this.messageService.add({ key: "general_toast", severity: 'error', summary: 'Error', detail: message });
  }

  showInfo(message: string) {
    this.messageService.clear();
    this.messageService.add({ key: "general_toast", severity: 'info', summary: 'Info', detail: message });
  }

  showWarn(message: string) {
    this.messageService.clear();
    this.messageService.add({ key: "general_toast", severity: 'warn', summary: 'Warning', detail: message });
  }
}
