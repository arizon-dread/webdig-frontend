import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LookupResponse } from '../models/lookup-response'
import { LookupRequest } from '../models/lookup-request';
import { ConfigService } from './config.service';
import { ErrorHandlerService } from './error-handler.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LookupService {

  resp: LookupResponse | undefined;
  constructor(private http: HttpClient, private errHandler: ErrorHandlerService) { }

  lookup(host: LookupRequest) : Observable<LookupResponse> {
    return this.http.post<LookupResponse>(ConfigService.config.apiBaseUrl + "/dig", host)
        .pipe(
          catchError(this.errHandler.handleError("lookup", this.resp, "Unable to lookup host"))
        )
  }

}
