import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { HomePage } from '../../pages/home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public account: { username: string, password: string } = {
    username: undefined,
    password: undefined
  };

  private loginErrorString: string = 'Failed to login';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toast: ToastController,
    private User: UserProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    this.User.login(this.account).subscribe((res) => {
      this.navCtrl.push(HomePage, res);
    }, (err) => {
      this.navCtrl.push(HomePage);

      this.toast.create({
        message: this.loginErrorString,
        duration: 2000,
        position: 'top'
      }).present();
    });
  }
}
