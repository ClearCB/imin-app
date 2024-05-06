import { UserData } from "../../../auth/domain/model/user-token-data";
import { ConfigurationGatewayPort } from "../../domain/port/out/configuration-gateway";

export async function getUserConfiguration(configurationGateway: ConfigurationGatewayPort, userData: UserData) {

    return configurationGateway.getUserConfiguration(userData);

}