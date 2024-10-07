export const SHARED_CONSTANTS = {
    MESSAGES: {
    },
    API: {
        IMAGE: {
            // BASE_URL: "https:/iminapp.acgarcia.es/api/v1/image/",
            BASE_URL: "http://localhost:8080/api/v1/image/",
            ENDPOINTS: {
                UPLOAD: "upload",
                DELETE: "delete",
                GET: "get/",
            }
        },
        CONFIGURATION: {
            // BASE_URL: "https:/iminapp.acgarcia.es/api/v1/configuration/",
            BASE_URL: "http://localhost:8080/api/v1/configuration/",
            ENDPOINTS: {
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
                UPDATE: "update",
            }
        },
        USER: {
            NAME: "user",
            CHILDREN: {
                PROFILE: "profile",
                EVENTS: "my-events",
            }

        },
        LOGIN: "login",
        LOGOUT: "logout",
        REGISTER: "register",
        VERIFICATION: "email-verification",
        ERROR: "error",
        FORBIDDEN: "forbidden",
        NOT_FOUND: "not-found",

    }
}