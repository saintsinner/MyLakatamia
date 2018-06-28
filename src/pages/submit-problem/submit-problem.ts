import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions, LatLng, CameraPosition, MarkerOptions, Marker } from '@ionic-native/google-maps';

/**
 * Generated class for the SubmitProblemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-submit-problem',
  templateUrl: 'submit-problem.html',
})
export class SubmitProblemPage {
  map: GoogleMap;
  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation, private googleMaps: GoogleMaps) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubmitProblemPage');
    this.geolocation.getCurrentPosition().then(res => {
      console.log(res.coords.latitude);
      console.log(res.coords.longitude);

      let mapOptions: GoogleMapOptions = {
        camera: {
          target: {
            lat: res.coords.latitude,
            lng: res.coords.longitude
          },
          zoom: 17,
          tilt: 20
        }
      };

      this.map = GoogleMaps.create('map', mapOptions);

      let marker: Marker = this.map.addMarkerSync({
        title: 'Βρίσκεσε εδώ',
        icon: 'blue',
        animation: 'DROP',
        position: {
          lat: res.coords.latitude,
          lng: res.coords.longitude
        }
      });

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

}
