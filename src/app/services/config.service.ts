import { Injectable } from '@angular/core';
import { Config } from '../models/config';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private http: HttpClient) {}

  public static config: Config = {apiBaseUrl: ""};

  loadConfig(): Observable<Config> {
    console.log("loading config..");
    
    
    return this.http.get<Config>("/config/config.json");

  }
}
