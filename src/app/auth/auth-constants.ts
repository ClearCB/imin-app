export const AUTH_CONSTANTS = {
    MESSAGES: {
        INVALID_REGISTER_REQUEST: "Invalid register request.",
        INVALID_LOGIN_REQUEST: "Invalid login request.",
        INVALID_REFRESH_TOKEN_REQUEST: "Invalid refresh token request.",
        GENERIC_LOGIN_ERROR: "An error has occurred in login process.",
    },
    LOCAL_STORAGE_KEYS: {
        ACTIVE_USER_DATA: "imin-user-data"
    },
    API: {
        BASE_URL: "http://localhost:8080/",
        ENDPOINTS: {
            LOGIN: "auth/login",
            REGISTER: "auth/register",
            REFRESH_TOKEN: "auth/register",
        }
    }

}