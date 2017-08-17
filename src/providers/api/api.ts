import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  A generic REST api handler
*/
@Injectable()
export class ApiProvider {
  private url: string = '';

  constructor(public http: Http) {
  }

  get(endpoint: string,
    params?: any,
    options: RequestOptions = new RequestOptions()) {

    if (params) {
      let p = new URLSearchParams();
      for (let key in params) {
        p.set(key, params[key]);
      }

      options.search = !options.search && p || options.search;
    }

    return this.http.get(this.url + '/' + endpoint, options);
  }

  post(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.post(this.url + '/' + endpoint, body, options);
  }

  put(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.put(this.url + '/' + endpoint, body, options);
  }

  delete(endpoint: string, options?: RequestOptions) {
    return this.http.delete(this.url + '/' + endpoint, options);
  }

  patch(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.put(this.url + '/' + endpoint, body, options);
  }
}
