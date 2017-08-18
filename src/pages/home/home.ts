import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { LoginPage } from '../../pages/login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public user: any;
  public map: any;
  @ViewChild('map') mapElement;

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private toast: ToastController
  ) {

  }

  ionViewWillLoad() {
    this.user = JSON.parse(this.navParams.get('_body') || null) || {username: 'Guest'};

    // if (!this.user) {
    //   this.toast.create({
    //     message: 'Failed to load user data'
    //   }).present();
    // }

    // if (!this.user) {
    //   this.navCtrl.push(LoginPage);
    // }

  }

  ionViewDidLoad() {
    /** Google map init */
    this.initMap();
  }

  initMap() {
    let latLng = new google.maps.latLng(40.750487, -73.976401);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }


}
