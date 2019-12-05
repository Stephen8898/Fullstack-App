import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ShareDef } from './common';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getNewsData(): Promise<any>{
    return this.http.get(`${ShareDef.BACKEND_URL}api/news`).toPromise()
    .then(res => res)
    .catch(error => error);
}


searchNewsData(query): Promise<any>{
const params = new HttpParams({fromString: `q=${query}`});
  return this.http.get(`${ShareDef.BACKEND_URL}api/news/search`, {params}).toPromise()
  .then(res => res)
  .catch(error => error);
}

}
