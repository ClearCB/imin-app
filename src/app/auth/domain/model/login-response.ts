import { UserData } from "./user-token-data";

export interface LoginResponse {

    message: string;
    result: boolean;
    userData: UserData;

}