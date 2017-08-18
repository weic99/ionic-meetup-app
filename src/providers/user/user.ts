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
    let seq = this.api.post('login', accountInfo);

    seq
      .map(res => res.json())
      .subscribe(res => {
        if (res.status === 'success') {
          this._loggedIn(res);
        } else {
          /** fail to login */
        }
      }, (err) => {
        console.error('login()', err);
      });

    return seq;
  }

  /** Send a POST request to signup endpoint */
  signup(accountInfo: any) {
    let seq = this.api.post('signup', accountInfo);

    seq
      .map(res => res.json())
      .subscribe(res => {
        if (res.status === 'success') {
          this._loggedIn(res);
        }
      }, (err) => {
        console.error('signup()', err);
      });

    return seq;
  }

  /** Log out user */
  logout() {
    this._user = null;
  }

  /** Store user data */
  private _loggedIn(res) {
    this._user = res.user;
  }

  postMeetup(meetupInfo: any) {
    let seq = this.api.post('two-locations', meetupInfo);

    seq
      .map(res => res.json())
      .subscribe(res => {
        console.log('postMeetup() res', res);
      }, (err) => {
        console.error('postMeetup()', err);
      });

    return seq;
  }
}
