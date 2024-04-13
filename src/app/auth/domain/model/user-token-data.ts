export interface UserTokenData {
    userId: string;
    username: string;
    expirationTimeInSeconds: number;
    token: string;
    refreshToken: string;
}
