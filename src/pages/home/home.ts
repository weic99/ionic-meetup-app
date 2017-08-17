import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public user: any;

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private toast: ToastController
  ) {

  }

  ionViewWillLoad() {
    this.user = JSON.parse(this.navParams.get('_body') || null);

    if (!this.user) {
      this.toast.create({
        message: 'Failed to load user data'
      }).present();
    }
  }
}
