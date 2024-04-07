import { EventModel } from "../../domain/model/event-model";
import { CreateEventUseCase } from "../../domain/port/input/create-event-use-case";
import { EventGateway } from "../../domain/port/output/event-gateway";

export class CreateEventUseCaseImpl implements CreateEventUseCase {
    constructor(private eventGateway: EventGateway) {

    }

    create(event: EventModel): EventModel {
        throw new Error("Method not implemented.");
    }
}
