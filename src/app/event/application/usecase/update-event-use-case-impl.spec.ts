import { EventGatewayImpl } from '../../infrastructure/gateway/event-gateway-impl';
import { UpdateEventUseCaseImpl } from './update-event-use-case-impl';

describe('UpdateEventUseCaseImpl', () => {
  it('should create an instance', () => {

    const eventGateway = new EventGatewayImpl();
    expect(new UpdateEventUseCaseImpl(eventGateway)).toBeTruthy();
  });
});
