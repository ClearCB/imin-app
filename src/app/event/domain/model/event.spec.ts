import { Event } from './event';

describe('Event', () => {
  it('should create an instance', () => {

    const eventDto = {
      id: 1,
      title: "My title",
      smallDescription: "Small description",
      largeDescription: "Large description",
    }

    expect(new Event(eventDto)).toBeTruthy();
  });
});
