import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ApiResponse } from '../../../shared/domain/model/api-response';
import { HttpClient } from '@angular/common/http';
import { MAIL_CONSTANTS } from '../../mail-constants';
import { NotificationService } from '../../../shared/infrastructure/service/notification.service';
import { AUTH_CONSTANTS } from '../../../auth/auth-constants';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private httpClient: HttpClient,
    private notificationService: NotificationService
  ) { }

  public async sendEmail(to: string, message: string, subject?: string, cc?: string) {

    try {

      let url = `${MAIL_CONSTANTS.API.BASE_URL}${MAIL_CONSTANTS.API.ENDPOINTS.SEND_EMAIL}`;
      const body = {
        to: to,
        cc: cc,
        subject: subject,
        message: message
      }

      const mailSent = await lastValueFrom(this.httpClient.post<ApiResponse>(url, JSON.stringify(body)));

      if (!mailSent) {
        this.notificationService.showError(MAIL_CONSTANTS.MESSAGES.EMAIL_SENT_KO);
        return;
      }

      return mailSent;

    } catch (e: any) {

      console.error(e.message);
      this.notificationService.showError(MAIL_CONSTANTS.MESSAGES.EMAIL_SENT_KO);
      return;
    }

  }

  public async sendEmailVerification(username: string) {

    try {

      // let url = `${MAIL_CONSTANTS.API.BASE_URL}${MAIL_CONSTANTS.API.ENDPOINTS.SEND_EMAIL_VERIFICATION}`;
      let url = `${AUTH_CONSTANTS.API.BASE_URL}/${AUTH_CONSTANTS.API.ENDPOINTS.SEND_EMAIL_VERIFICATION}`;
      const body = username


      const mailSent = await lastValueFrom(this.httpClient.post<ApiResponse>(url, body));

      this.notificationService.showInfo(MAIL_CONSTANTS.MESSAGES.EMAIL_SENT_VERIFICATION);

    } catch (e: any) {

      console.error(e.message);
      this.notificationService.showError(MAIL_CONSTANTS.MESSAGES.EMAIL_SENT_KO);
      return;
    }

  }

}
