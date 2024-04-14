import { UserTokenData } from "./user-token-data";

export interface LoginResponse {

    message: string;
    result: boolean;
    data: UserTokenData;

}