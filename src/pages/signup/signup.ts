import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { HomePage } from '../../pages/home/home';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public account: { username: string, email: string, password: string, password2: string } = {
    username: undefined,
    email: undefined,
    password: undefined,
    password2: undefined
  };

  private signupErrorString: string = 'Sign up failed';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toast: ToastController,
    private User: UserProvider
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signup() {
    this.User.signup(this.account).subscribe((res) => {
      console.log('redirect to home');
      this.navCtrl.push(HomePage, res);
    }, (err) => {
      // this.navCtrl.push(HomePage);

      this.toast.create({
        message: this.signupErrorString,
        duration: 2000,
        position: 'top'
      }).present();
    })
  }

}
