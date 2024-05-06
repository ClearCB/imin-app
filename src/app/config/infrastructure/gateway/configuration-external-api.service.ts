import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { UserData } from '../../../auth/domain/model/user-token-data';
import { UserConfiguration } from '../../domain/model/user-configuration';
import { SHARED_CONSTANTS } from '../../../shared/shared-constants';

@Injectable({
  providedIn: 'root'
})
export class ExternalConfigurationApiService {

  constructor(private httpClient: HttpClient) {
  }

  configuration(userData: UserData): Promise<UserConfiguration> {

    const url = `${SHARED_CONSTANTS.API.CONFIGURATION.BASE_URL}${SHARED_CONSTANTS.API.CONFIGURATION.ENDPOINTS.GET}${userData.username}`;

    return lastValueFrom(this.httpClient.get<UserConfiguration>(url));

  }

}
