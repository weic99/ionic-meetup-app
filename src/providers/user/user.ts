import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UserProvider {
  private _user: any;

  constructor(public http: Http) {

  }

  /** Send a POST request to login endpoint */
  login(accountInfo: any) {

  }

  /** Send a POST request to signup endpoint */
  signup(accountInfo: any) {

  }

  /** Log out user */
  logout() {

  }

  /** Store user data */
  private _loggedIn(res) {

  }
}
