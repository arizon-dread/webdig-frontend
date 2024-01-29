import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Config } from '../models/config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private http: HttpClient) {}

  public static config: Config = {apiBaseUrl: ""};

  loadConfig(): Observable<Config> {


    return this.http.get<Config>("config/config.json");

  }
}
