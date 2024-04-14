import { Provider } from "@angular/core";
import { LoginUseCaseImpl } from "../auth/application/usecase/login-use-case-impl";
import { LoginUseCase } from "../auth/domain/port/in/login-use-case";
import { AuthGatewayPort } from "../auth/domain/port/out/auth-gateway-port";
import { AuthGatewayAdapterService } from "../auth/infrastructure/gateway/auth-gateway-adapter.service";
import { LogoutUseCase } from "../auth/domain/port/in/logout-use-case";
import { LogoutUseCaseImpl } from "../auth/application/usecase/logout-use-case-impl";
import { RefreshTokenUseCase } from "../auth/domain/port/in/refresh-token-use-case";
import { RefreshTokenUseCaseImpl } from "../auth/application/usecase/refresh-token-use-case-impl";

export function customProvider(): Provider[] {
    return [
        { provide: LoginUseCase, useClass: LoginUseCaseImpl },
        { provide: LogoutUseCase, useClass: LogoutUseCaseImpl },
        { provide: RefreshTokenUseCase, useClass: RefreshTokenUseCaseImpl },
        { provide: AuthGatewayPort, useClass: AuthGatewayAdapterService },
    ]
}