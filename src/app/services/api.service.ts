import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://fcsapi.com/';
  private apiKey = 'ZbWrsQu69Ax5MQXsBeyPFh';
  private params = {
    symbol: 'EUR/USD',
    period: '1d',
    access_key: this.apiKey,
    level: '3'
  }

  constructor(private http: HttpClient) {
  }

  public get(endpoint: string) {
    return this.http.get(this.apiUrl + endpoint, {params: this.params});
  }
}
