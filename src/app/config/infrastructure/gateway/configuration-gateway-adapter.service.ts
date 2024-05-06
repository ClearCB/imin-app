import { Injectable } from '@angular/core';
import { ExternalConfigurationApiService } from './configuration-external-api.service';
import { ConfigurationGatewayPort } from '../../domain/port/out/configuration-gateway';
import { UserData } from '../../../auth/domain/model/user-token-data';
import { UserConfiguration } from '../../domain/model/user-configuration';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationGatewayAdapterService extends ConfigurationGatewayPort {

  constructor(private externalConfigurationApiService: ExternalConfigurationApiService) {
    super();
  }

  override getUserConfiguration(userData: UserData): Promise<UserConfiguration> {
    return this.externalConfigurationApiService.configuration(userData);
  }

}
