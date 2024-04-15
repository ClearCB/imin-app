import { Provider } from "@angular/core";
import { AuthGatewayPort } from "../auth/domain/port/out/auth-gateway-port";
import { AuthGatewayAdapterService } from "../auth/infrastructure/gateway/auth-gateway-adapter.service";
import { LocalStorageRepositoryPort } from "../shared/domain/port/out/local-storage-repository-port";
import { LocalStorageRepositoryAdapterService } from "../shared/infrastructure/service/local-storage-repository-adapter.service";

export function customProvider(): Provider[] {
    return [
        { provide: AuthGatewayPort, useClass: AuthGatewayAdapterService },
        { provide: LocalStorageRepositoryPort, useClass: LocalStorageRepositoryAdapterService },
    ]
}