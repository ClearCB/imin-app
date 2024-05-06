import { UserData } from "../../../../auth/domain/model/user-token-data";
import { ApiResponse } from "../../../../shared/domain/model/api-response";
import { UserConfiguration } from "../../model/user-configuration";


export abstract class ConfigurationGatewayPort {

    abstract getUserConfiguration(userData: UserData): Promise<UserConfiguration>;

}