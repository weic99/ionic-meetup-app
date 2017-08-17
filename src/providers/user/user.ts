import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ApiProvider } from '../api/api';
import 'rxjs/add/operator/map';

@Injectable()
export class UserProvider {
  private _user: any;

  constructor(
    public http: Http,
    private api: ApiProvider
  ) {
  }

  /** Send a POST request to login endpoint */
  login(accountInfo: any) {

  }

  /** Send a POST request to signup endpoint */
  signup(accountInfo: any) {
    let seq = this.api.post('signup', accountInfo);

    seq
      .map((res) => res.json())
      .subscribe((res) => {
        if (res.status === 'success') {
          this._loggedIn(res);
        }
      }, (err) => {
        console.error('signup', err);
      });

    return seq;
  }

  /** Log out user */
  logout() {

  }

  /** Store user data */
  private _loggedIn(res) {

  }
}
