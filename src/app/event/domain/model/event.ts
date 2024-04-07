import { EventDTO } from "../dto/event-dto";

export class Event {

    public id: number;
    public title: string;
    public smallDescription: string;
    public largeDescription: string;

    constructor(eventDto: EventDTO) {
        this.id = eventDto.id;
        this.title = eventDto.title;
        this.smallDescription = eventDto.smallDescription;
        this.largeDescription = eventDto.largeDescription;
    }

}
