import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { appRoutes } from './app.routes';

const port = process.env['PORT'] || 3000;

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    HttpClientModule,
    { provide: 'PORT', useValue: port },
  ],
};
