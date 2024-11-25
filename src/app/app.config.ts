import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { routes } from './app.routes';
import { ConfigService } from './services/config.service';

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
    //provideClientHydration(),
    provideAnimations()

  ]
};
