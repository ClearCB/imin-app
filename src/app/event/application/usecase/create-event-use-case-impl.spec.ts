import { EventGatewayImpl } from '../../infrastructure/gateway/event-gateway-impl';
import { CreateEventUseCaseImpl } from './create-event-use-case-impl';

describe('CreateEventUseCaseImpl', () => {

  const eventGateway = new EventGatewayImpl();
  it('should create an instance', () => {
    expect(new CreateEventUseCaseImpl(eventGateway)).toBeTruthy();
  });
});
