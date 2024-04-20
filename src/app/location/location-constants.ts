export const LOCATION_CONSTANTS = {
    MESSAGES: {
        LOCATION_CANT_BE_NULL: "Location cannot be null",
        LOCATION_TITLE_CANT_BE_NULL: "Location title cannot be null",
        LOCATION_NOT_FOUND: "Location not found",
        LOCATION_CREATE_OK: "Location created successfully",
        LOCATION_CREATE_KO: "An error has occurred during the creation of the location",
        LOCATION_UPDATE_OK: "Location updated successfully",
        LOCATION_UPDATE_KO: "An error has occurred updating an location",
        LOCATION_DELETE_OK: "Location deleted successfully",
        LOCATION_DELETE_KO: "An error has occurred during the deletion of the location",
        LOCATION_GENERIC_ERROR: "An error has occurred",
        LOCATION_DATABASE_GENERIC_ERROR: "An error has occurred"
    },
    API: {
        BASE_URL: "http://localhost:8080/api/v1/location/",
        ENDPOINTS: {
            GET_LOCATION_BY_ID: "get",
            GET_ALL_LOCATIONS: "get-all",
            DELETE_LOCATION_BY_ID: "delete",
            CREATE_LOCATION: "create",
            UPDATE_LOCATION: "update",
        }
    }

}