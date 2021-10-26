import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { v4 as uuidv4 } from 'uuid';
import { hostMap } from '../config/config';


@Injectable()
export class HttpService {
  public res: Response;
  private url: string;
  private host:string = hostMap.get('SERVER');
  constructor(
    public http: HttpClient,
  ) {
  }
  
  public post(
    urlExt: string,
    jsonReq: string,
  ): any {
    this.url = this.host + urlExt;
    let headers = new HttpHeaders();
    headers = headers.append('Content-type', 'application/json');
    return this.http.post(this.url, jsonReq, {headers}).pipe(
      map((res: Response) => {
        return this.handleResponse(res);
      }),
    );
  }

  get(urlExt: string): any {
    this.url = this.host + urlExt;
    let headers = new HttpHeaders();
    headers = headers.append('Content-type', 'application/json');
    return this.http.get(this.url, {headers});
  }

  delete(urlExt: string): any {
    this.url = this.host + urlExt;
    let headers = new HttpHeaders();
    headers = headers.append('Content-type', 'application/json');
    return this.http.delete(this.url, {headers});
  }

  private handleResponse(res: any): Promise<any> {
    return res;
  }
}
