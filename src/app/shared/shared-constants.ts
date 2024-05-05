export const SHARED_CONSTANTS = {
    MESSAGES: {
    },
    API: {
        IMAGE: {
            BASE_URL: "http://localhost:8080/api/v1/image/",
            ENDPOINTS: {
                UPLOAD: "upload",
                DELETE: "delete",
                GET: "get/",
            }
        }

    },
    ENDPOINTS: {
        HOME: "",
        EVENT: {
            NAME: "event",
            CHILDREN: {
                CREATE: "create",
                LIST: "list",
                MAP: "map",
                DETAIL: "detail",
            }
        },
        LOGIN: "login",
        LOGOUT: "logout",
        PROFILE: "profile",
        REGISTER: "register",
        ERROR: "error",
        FORBIDDEN: "forbidden",
        NOT_FOUND: "not-found",

    }
}