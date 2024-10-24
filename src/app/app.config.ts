import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideHotToastConfig } from '@ngneat/hot-toast';

import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideAnimationsAsync(),
    provideHotToastConfig(),
    provideRouter(appRoutes),
  ],
};
