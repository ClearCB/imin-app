import { Provider } from "@angular/core";
import { AuthGatewayPort } from "../auth/domain/port/out/auth-gateway-port";
import { AuthGatewayAdapterService } from "../auth/infrastructure/gateway/auth-gateway-adapter.service";
import { LocalStorageRepositoryPort } from "../shared/domain/port/out/local-storage-repository-port";
import { LocalStorageRepositoryAdapterService } from "../shared/infrastructure/service/local-storage-repository-adapter.service";
import { EventGatewayPort } from "../event/domain/port/output/event-gateway-port";
import { EventGatewayAdapterService } from "../event/infrastructure/gateway/event-gateway-adapter.service";
import { ConfigurationGatewayPort } from "../config/domain/port/out/configuration-gateway";
import { ConfigurationGatewayAdapterService } from "../config/infrastructure/gateway/configuration-gateway-adapter.service";
import { CommonRepositoryPort } from "../shared/domain/port/out/common-repository-port";

export function customProvider(): Provider[] {
    return [
        { provide: AuthGatewayPort, useClass: AuthGatewayAdapterService },
        { provide: LocalStorageRepositoryPort, useClass: LocalStorageRepositoryAdapterService },
        { provide: EventGatewayPort, useClass: EventGatewayAdapterService },
        { provide: ConfigurationGatewayPort, useClass: ConfigurationGatewayAdapterService },
        // { provide: CommonRepositoryPort, useClass: ConfigurationGatewayAdapterService },
    ]
}