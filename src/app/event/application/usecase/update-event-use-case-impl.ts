import { EventModel } from "../../domain/model/event-model";
import { UpdateEventUseCase } from "../../domain/port/input/update-event-use-case";
import { EventGateway } from "../../domain/port/output/event-gateway";

export class UpdateEventUseCaseImpl implements UpdateEventUseCase {

    constructor(private eventGateway: EventGateway) {

    }

    create(eventId: number, event: EventModel): EventModel {
        throw new Error("Method not implemented.");
    }
}
