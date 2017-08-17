import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import 'rxjs/add/operator/map';

@Injectable()
export class FirebaseProvider {

  constructor(
    private http: Http
  ) {
    const config = {
      apiKey: "AIzaSyBiWdX3bNM-s1FxFJ5UI5jMcbQNDVAbGfY",
      authDomain: "chat-d1a9e.firebaseapp.com",
      databaseURL: "https://chat-d1a9e.firebaseio.com",
      projectId: "chat-d1a9e",
      storageBucket: "chat-d1a9e.appspot.com",
      messagingSenderId: "652035804823"
    };
    AngularFireModule.initializeApp(config);
  }

}
