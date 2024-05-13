import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './auth/infrastructure/interceptors/token.interceptor';
import { customProvider } from './provider/custom-business-provider';
import { headersInterceptor } from './auth/infrastructure/interceptors/auth-interceptors';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';

export const appConfig: ApplicationConfig = {
  providers: [
    DialogService,
    DynamicDialogConfig,
    MessageService,
    provideAnimations(),
    customProvider(),
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors([headersInterceptor, tokenInterceptor])
    ),

  ]
};



