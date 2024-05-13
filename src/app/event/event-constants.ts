export const EVENT_CONSTANTS = {
    MESSAGES: {
        EVENT_CANT_BE_NULL: "Event cannot be null",
        EVENT_TITLE_CANT_BE_NULL: "Event title cannot be null",
        EVENT_NOT_FOUND: "Event not found",
        EVENT_CANT_ADD_USER: "User cant join event",
        EVENT_CREATE_OK: "Event created successfully",
        EVENT_CREATE_KO: "An error has occurred during the creation of the event",
        EVENT_UPDATE_OK: "Event updated successfully",
        EVENT_UPDATE_KO: "An error has occurred updating an event",
        EVENT_DELETE_OK: "Event deleted successfully",
        EVENT_DELETE_KO: "An error has occurred during the deletion of the event",
        EVENT_GENERIC_ERROR: "An error has occurred",
        EVENT_DATABASE_GENERIC_ERROR: "An error has occurred"
    },
    API: {
        BASE_URL: "http://localhost:8080/api/v1/event/",
        ENDPOINTS: {
            GET_EVENT_BY_ID: "get",
            GET_ALL_EVENTS: "get-all",
            SEARCH_EVENT: "search",
            ADD_USER: "add-user",
            REMOVE_USER: "remove-user",
            USER_ATTENDANCE: "user/event/attendance/",
            USERS_EVENTS: "user/event/",
            EVENT_ATTENDANCE: "event/user/",
            DELETE_EVENT_BY_ID: "delete",
            CREATE_EVENT: "create",
            UPDATE_EVENT: "update",
        }
    }

}