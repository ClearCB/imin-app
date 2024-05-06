import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserData } from '../../../auth/domain/model/user-token-data';
import { getUserConfiguration } from '../../application/get-user-configuration/get-user-configuration';
import { UserConfiguration, initUserConfiguration } from '../../domain/model/user-configuration';
import { ConfigurationGatewayPort } from '../../domain/port/out/configuration-gateway';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  userConfiguration: BehaviorSubject<UserConfiguration | null> = new BehaviorSubject<UserConfiguration | null>(null);

  get activeUserConfiguration(): Observable<UserConfiguration | null> {
    return this.userConfiguration.asObservable();
  }

  constructor(private configurationGateway: ConfigurationGatewayPort) { }

  async getUserConfiguration(userData: UserData | undefined): Promise<UserConfiguration | undefined> {

    try {

      if (!userData) {
        this.userConfiguration.next(initUserConfiguration);
        return initUserConfiguration;
      }

      const userConfigurationResponse = await getUserConfiguration(this.configurationGateway, userData);

      if (!userConfigurationResponse) {
        this.userConfiguration.next(initUserConfiguration);
        return initUserConfiguration;
      }

      this.userConfiguration.next(userConfigurationResponse);
      return userConfigurationResponse;

    } catch (e: any) {

      console.error(e.message);
      return;

    }

  }
}
