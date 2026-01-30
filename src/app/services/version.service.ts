import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Version } from '../models/version';
import { ConfigService } from './config.service';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class VersionService {

  constructor(private http: HttpClient, private errHandler: ErrorHandlerService) {}

  getFrontendVersion(): Observable<Version> {
    return this.http.get<Version>("/config/version");
  }
  getBackendVersion(): Observable<Version> {
    return this.http.get<Version>(ConfigService.config.apiBaseUrl +'/version')
  }
}
