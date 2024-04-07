import { EventModel } from '../../domain/model/event-model';
import { EventGatewayImpl } from './event-gateway-impl';

describe('EventGatewayImpl', () => {
  let eventGateway: EventGatewayImpl;

  beforeEach(() => {
    eventGateway = new EventGatewayImpl();
  });

  it('should create an instance', () => {
    expect(eventGateway).toBeTruthy();
  });

  it('should create an event', () => {

    const eventDto = {
      id: 1,
      title: "Test Event",
      smallDescription: "Small description",
      largeDescription: "Large description",
    }

    const createdEvent = eventGateway.createEvent(eventDto);
    expect(createdEvent).toEqual(eventDto);
  });

  it('should not create a duplicate event', () => {

    const eventDto = {
      id: 1,
      title: "Test Event",
      smallDescription: "Small description",
      largeDescription: "Large description",
    }
    eventGateway.createEvent(eventDto);
    const createdEvent = eventGateway.createEvent(eventDto);
    expect(createdEvent).toBe(eventDto);
  });

  it('should update an event', () => {
    const eventDto = {
      id: 1,
      title: "Test Event",
      smallDescription: "Small description",
      largeDescription: "Large description",
    }
    eventGateway.createEvent(eventDto);
    const updatedEventDto = {
      id: 1,
      title: 'Updated Event',
      smallDescription: "Small description",
      largeDescription: "Large description",
    }
    const result = eventGateway.updateEvent(1, updatedEventDto);
    expect(result).toEqual(updatedEventDto);
  });

  it('should return undefined when updating non-existent event', () => {
    const eventDto = {
      id: 1,
      title: 'Updated Event',
      smallDescription: "Small description",
      largeDescription: "Large description",
    }
    const result = eventGateway.updateEvent(1, eventDto);
    expect(result).toBeUndefined();
  });

  it('should delete an event', () => {
    const eventDto = {
      id: 1,
      title: 'Updated Event',
      smallDescription: "Small description",
      largeDescription: "Large description",
    }
    eventGateway.createEvent(eventDto);
    eventGateway.deleteEvent(1);
    const result = eventGateway.getEvent(1);
    expect(result).toBeUndefined();
  });

  it('should return undefined when deleting non-existent event', () => {
    eventGateway.deleteEvent(1);
    const result = eventGateway.getEvent(1);
    expect(result).toBeUndefined();
  });

  it('should get an event', () => {
    const eventDto = {
      id: 1,
      title: 'Updated Event',
      smallDescription: "Small description",
      largeDescription: "Large description",
    }
    eventGateway.createEvent(eventDto);
    const result = eventGateway.getEvent(1);
    expect(result).toEqual(eventDto);
  });

  it('should return undefined when getting non-existent event', () => {
    const result = eventGateway.getEvent(1);
    expect(result).toBeUndefined();
  });
});
