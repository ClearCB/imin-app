import { EventModel } from "../../domain/model/event-model";
import { GetEventUseCase } from "../../domain/port/input/get-event-use-case";
import { EventGateway } from "../../domain/port/output/event-gateway";

export class GetEventUseCaseImpl implements GetEventUseCase {
    constructor(private eventGateway: EventGateway) {

    }

    create(eventId: number): EventModel {
        throw new Error("Method not implemented.");
    }
}
