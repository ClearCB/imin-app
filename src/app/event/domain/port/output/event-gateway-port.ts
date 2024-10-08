import { UserData } from "../../../../auth/domain/model/user-token-data";
import { SearchCriteria } from "../../../../shared/domain/model/search-criteria";
import { SearchEventOptions } from "../../../application/search-event/search-event-options";
import { EventModel } from "../../model/event-model";

export abstract class EventGatewayPort {
    abstract createEvent(event: EventModel): Promise<EventModel | undefined>;
    abstract updateEvent(eventId: string, event: EventModel): Promise<EventModel | undefined>;
    abstract deleteEvent(eventId: string): Promise<void>;
    abstract getEvent(eventId: string): Promise<EventModel | undefined>;
    abstract getAllEvent(): Promise<EventModel[] | undefined>;
    abstract searchEvent(searchOptions: SearchEventOptions): Promise<EventModel[] | undefined>;
    abstract addUserToEvent(event: EventModel, userData: UserData): Promise<boolean | undefined>;
    abstract removeUserFromEvent(event: EventModel, userData: UserData): Promise<boolean | undefined>;
    abstract getEventAttendance(eventId: string): Promise<any[] | undefined>;
    abstract getUserAttendance(userId: string): Promise<EventModel[] | undefined>;
    abstract getUsersEvents(userId: string): Promise<EventModel[] | undefined>;
}
