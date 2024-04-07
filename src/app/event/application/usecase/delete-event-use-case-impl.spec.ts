import { EventGatewayImpl } from '../../infrastructure/gateway/event-gateway-impl';
import { DeleteEventUseCaseImpl } from './delete-event-use-case-impl';

describe('DeleteEventUseCaseImpl', () => {
  it('should create an instance', () => {
    const eventGateway = new EventGatewayImpl();
    expect(new DeleteEventUseCaseImpl(eventGateway)).toBeTruthy();
  });
});
