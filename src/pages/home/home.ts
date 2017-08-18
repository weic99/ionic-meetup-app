import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, ToastController, Platform  } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { LoginPage } from '../../pages/login/login';

declare var google: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public user: any;
  map: any;
  @ViewChild('map') mapElement: ElementRef;

  /** Matching bariables */
  friendName: string;
  userLocationAddress: string;

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private toast: ToastController,
    public platform: Platform,
    private User: UserProvider
  ) {
    platform.ready().then(() => {
      this.initMap();
    });
  }

  ionViewWillLoad() {
    this.user = JSON.parse(this.navParams.get('_body') || null) || {username: 'Guest'};

    // if (!this.user) {
    //   this.navCtrl.push(LoginPage);
    // }
  }

  ionViewDidLoad() {
    /** Google map init */
    this.initMap();
  }

  initMap() {
    let latLng = new google.maps.LatLng(40.750487, -73.976401);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    /** my location dot */
    var myloc = new google.maps.Marker({
        clickable: false,
        icon: new google.maps.MarkerImage('//maps.gstatic.com/mapfiles/mobile/mobileimgs2.png',
                                                        new google.maps.Size(22,22),
                                                        new google.maps.Point(0,18),
                                                        new google.maps.Point(11,11)),
        shadow: null,
        zIndex: 999,
        map: this.map,
        position: new google.maps.LatLng(40.750487, -73.976401)
    });

    // circle around myLoc
    var cityCircle = new google.maps.Circle({
            strokeColor: '#0080ff',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#0080ff',
            fillOpacity: 0.35,
            map: this.map,
            center: new google.maps.LatLng(40.750487, -73.976401),
            radius: 100
    });
  }

  addMarker(position = this.map.getCenter()){
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: position,
      title: 'You'
    });

    let content = "<h6 class=\"marker\">You are here</h6>";

    this.addInfoWindow(marker, content);
    this.markers.push(marker);
  }

  addInfoWindow(marker, content){
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }

  match() {
    const userId = this.user.username;
    const location1 = { "address" : "369 Lexington Avenue, New York, NY", "coordinates": [0,0] };
    const location2 = { "address": this.friendName, "coordinates": [0,0] };
    console.log('match() with data', {userId, location1, location2});
    this.User.postMeetup({
      userId,
      location1,
      location2
    })
    .subscribe(res => {
      console.log('match() res', res);
      console.log('center is', this.map.getCenter());
      this.addMarker(res.json().midpoint);
      this.recenter();
    }, (err) => {
      console.error('match() err', err);
    });
  }

  markers = [];
  bounds = new google.maps.LatLngBounds();

  recenter() {
    for (var i = 0; i < this.markers.length; i++) {
      this.bounds.extend(this.markers[i].getPosition());
    }
    this.map.fitBounds(this.bounds);
  }
}
