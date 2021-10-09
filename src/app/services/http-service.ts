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
  constructor(
    public http: HttpClient,
  ) {
  }
  
  public post(
    urlExt: string,
    jsonReq: string,
  ): any {
    this.url = hostMap.get('SERVER') + urlExt;
    console.log('URL', this.url);
    console.log('POST Payload', jsonReq)
    let headers = new HttpHeaders();
    headers = headers.append('Content-type', 'application/json');
    return this.http.post(this.url, jsonReq, {headers}).pipe(
      map((res: Response) => {
        return this.handleResponse(res);
      }),
    );
  }

  public patch(
    urlExt: string,
    jsonReq: string,
  ): any {
    this.url = hostMap + urlExt;
    return this.http.patch(this.url, jsonReq).pipe(
      map((res: Response) => {
        return this.handleResponse(res);
      }),
    );
  }

  public delete(urlKey: string, urlExt: string): any {
    this.url = hostMap + urlExt;
    return this.http.delete(this.url).pipe(
      map((res: Response) => {
        return this.handleResponse(res);
      }),
    );
  }

  private handleResponse(res: any): Promise<any> {
    return res;
  }

  get(urlExt: string): any {
    this.url = hostMap + urlExt;
    return this.http.get(this.url);
  }
}
