import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { Router, provideRouter } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { routes } from './app.routes';
import { ConfigService } from './services/config.service'
import { Config } from './models/config';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';

export function appConfigInit(appConfigService: ConfigService): () => Observable<any> {
  return () => 
    appConfigService.loadConfig()
    .pipe(
       tap(config => { ConfigService.config = config })
    );
 }

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideRouter(routes),
    {
      provide: APP_INITIALIZER,
      useFactory: appConfigInit,
      multi: true,
      deps: [ConfigService, HttpClient]
    },
    provideToastr(),
    provideClientHydration(),
    
  ]
};
