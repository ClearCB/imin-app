import { DeleteEventUseCase } from "../../domain/port/input/delete-event-use-case";
import { EventGateway } from "../../domain/port/output/event-gateway";

export class DeleteEventUseCaseImpl implements DeleteEventUseCase {
    constructor(private eventGateway: EventGateway) { }

    delete(eventId: number): void {
        throw new Error("Method not implemented.");
    }

}
