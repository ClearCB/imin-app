export const EVENT_CONSTANTS = {
    MESSAGES: {
        EVENT_CANT_BE_NULL: "Event cannot be null",
        EVENT_TITLE_CANT_BE_NULL: "Event title cannot be null",
        EVENT_LOCATION_CANT_BE_NULL: "Event location cannot be null",
        EVENT_DATE_INVALID: "Event start date MUST be greater than finish date",
        EVENT_NOT_FOUND: "Event not found",
        EVENT_ATTENDANCE_ERROR: "An error has occurred while retrieving the event attendance",
        USER_ATTENDANCE_ERROR: "An error has occurred while retrieving users attendance",
        USERS_EVENT_ERROR: "An error has occurred while retrieving users events",
        EVENT_CANT_ADD_USER: "An error has occurred while joining the event",
        EVENT_CANT_REMOVE_USER: "An error has occurred while removing attendance from the event",
        EVENT_ADDED_USER: "You have just attend to event",
        EVENT_REMOVED_USER: "You have just removed your attendance from event",
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
        BASE_URL: "http://iminapp.es/api/v1/event/",
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