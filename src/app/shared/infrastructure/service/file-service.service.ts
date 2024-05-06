import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { SHARED_CONSTANTS } from '../../shared-constants';

@Injectable({
  providedIn: 'root'
})
export class FileService implements OnInit {




  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    // const eventId = '5ae70aa2-2f09-4c0f-8940-f8ad514cfb4e'; // Replace with the actual event ID
    // 
  }

  upload(files: File[], eventId: string): any {

    const formData: FormData = new FormData();

    for (let file of files) {
      formData.append('files', file);
    }
    formData.append('eventId', eventId);

    const url = `${SHARED_CONSTANTS.API.IMAGE.BASE_URL}${SHARED_CONSTANTS.API.IMAGE.ENDPOINTS.UPLOAD}`
    return this.httpClient.post(url, formData);

  }


  async getImagesFromEvent(eventId: string): Promise<string | undefined> { // returns file as url

    const url = `${SHARED_CONSTANTS.API.IMAGE.BASE_URL}${SHARED_CONSTANTS.API.IMAGE.ENDPOINTS.GET}${eventId}`;

    try {
      const petition = await lastValueFrom(this.httpClient.get(url, { responseType: 'arraybuffer' }));

      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const imageFileUrl = reader.result as string;
          resolve(imageFileUrl);
        };
        reader.onerror = () => {
          reject(new Error('Failed to read file'));
        };
        reader.readAsDataURL(new Blob([petition]));
      });
    } catch (error: any) {
      console.error('Error fetching image:', error);
      return undefined;
    }

  }

}
