import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  private appConfig: FontainConfiguration;

  constructor(private http: HttpClient) { }

  async loadAppConfig(): Promise<void> {
    try {
      const data = await this.http.get<FontainConfiguration>('/assets/config.json', { headers: new HttpHeaders({'No-Auth': 'True'})})
      .toPromise();
      this.appConfig = data;
      console.log(data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  getConfig(): FontainConfiguration {
    return this.appConfig;
  }
}

export interface FontainConfiguration {
  ApiAddress: string;
}
