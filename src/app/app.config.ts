import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, inject, provideAppInitializer } from '@angular/core';
import { provideRouter } from '@angular/router';
import { DefaultNoAnimationsGlobalConfig, provideToastr } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { routes } from './app.routes';
import { ConfigService } from './services/config.service';

export function appConfigInit(appConfigService: ConfigService): Observable<any> {
  return appConfigService.loadConfig()
    .pipe(
       tap(config => { ConfigService.config = config })
    );
 }

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideRouter(routes),
    provideAppInitializer(() => appConfigInit(inject(ConfigService))),
    provideToastr({
      toastComponent: DefaultNoAnimationsGlobalConfig.toastComponent}),
  ]
}

