export const AUTH_CONSTANTS = {
    MESSAGES: {
        VALIDATION: {
            INVALID_USERNAME: "Invalid username ",
            INVALID_EMAIL: "Invalid email ",
        },
        INVALID_REGISTER_REQUEST: "Invalid register request.",
        INVALID_LOGIN_REQUEST: "Invalid login request.",
        INVALID_REFRESH_TOKEN_REQUEST: "Invalid refresh token request.",
        BAD_CREDENTIALS_ERROR: "Bad credentials.",
        GENERIC_LOGIN_ERROR: "An error has ocurred while loggin in.",
        GENERIC_LOGOUT_ERROR: "An error has ocurred while loggin out.",
        OK_LOGIN: "Login succeed.",
        SESSION_EXPIRED: "Session expired.",
        NOT_VALID_SESSION: "Not valid active session. Please login to continue.",
    },
    LOCAL_STORAGE_KEYS: {
        ACTIVE_USER_DATA: "imin-user-data",
        ACTIVE_USER_CONFIG: "imin-user-config",
    },
    API: {
        BASE_URL: "http://localhost:8080/",
        ENDPOINTS: {
            LOGIN: "auth/login",
            REGISTER: "auth/register",
            VALIDATE_TOKEN: "auth/validate-token",
            REFRESH_TOKEN: "auth/register",
        }
    }

}