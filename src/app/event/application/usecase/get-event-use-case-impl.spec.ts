import { EventGatewayImpl } from '../../infrastructure/gateway/event-gateway-impl';
import { GetEventUseCaseImpl } from './get-event-use-case-impl';

describe('GetEventUseCaseImpl', () => {
  it('should create an instance', () => {
    const eventGateway = new EventGatewayImpl();
    expect(new GetEventUseCaseImpl(eventGateway)).toBeTruthy();
  });
});
