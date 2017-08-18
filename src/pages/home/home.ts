import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ToastController, Platform } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { LoginPage } from '../../pages/login/login';

import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition } from '@ionic-native/google-maps';
declare var google: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public user: any;

  @ViewChild('map') map;

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private toast: ToastController,
    private googleMaps: GoogleMaps,
    public platform: Platform
  ) {

  }

  ionViewWillLoad() {
    this.user = JSON.parse(this.navParams.get('_body') || null) || {username: 'Guest'};

    // if (!this.user) {
    //   this.navCtrl.push(LoginPage);
    // }
  }

  ngAfterViewInit() {
    this.loadMap();
  }

  loadMap() {
    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map');

    let map: GoogleMap = this.googleMaps.create(element);

    // listen to MAP_READY event
    // You must wait for this event to fire before adding something to the map or modifying it in anyway
    map.one(GoogleMapsEvent.MAP_READY).then(() => {
      console.log('Map is ready!')
    });

    // create LatLng object
    let ionic: LatLng = new LatLng(43.0741904, -89.3809802);

    // create CameraPosition
    let position: CameraPosition = {
      target: ionic,
      zoom: 18,
      tilt: 30
    };

    // move the map's camera to position
    map.moveCamera(position);
    // create new marker
     let markerOptions = {
       position: ionic,
       title: 'Ionic'
     };

     const marker = map.addMarker(markerOptions)
       .then((marker) => {
          marker.showInfoWindow();
        });
    }

    initJSMaps(mapEle) {
      new google.maps.Map(mapEle, {
        center: { lat: 43.071584, lng: -89.380120 },
        zoom: 16
      });
    }

    initNativeMaps(mapEle) {
      this.map = new GoogleMap(mapEle);
      mapEle.classList.add('show-map');

      GoogleMap.isAvailable().then(() => {
        const position = new GoogleMapsLatLng(43.074395, -89.381056);
        this.map.setPosition(position);
      });
    }

    ionViewDidLoad() {
      let mapEle = this.map.nativeElement;

      if (!mapEle) {
        console.error('Unable to initialize map, no map element with #map view reference.');
        return;
      }

      // Disable this switch if you'd like to only use JS maps, as the APIs
      // are slightly different between the two. However, this makes it easy
      // to use native maps while running in Cordova, and JS maps on the web.
      if (this.platform.is('cordova') === true) {
        this.initNativeMaps(mapEle);
      } else {
        this.initJSMaps(mapEle);
      }
    }
}
