import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Refresher, Platform } from 'ionic-angular';
//import { HTTP } from '@ionic-native/http';
import { ServicesProvider } from '../../providers/services/services';
//import { SqlLiteProvider } from '../../providers/sql-lite/sql-lite';
import { HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { GoogleMaps, GoogleMap, GoogleMapOptions } from '@ionic-native/google-maps';

/**
 * Generated class for the ProblemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-problem',
  templateUrl: 'problem.html',
})
export class ProblemPage {
  storageId: any;
  params: any;
  dataset: any;
  isDataAvailable: boolean = false;
  isTab1Available: boolean = false;
  isTab2Available: boolean = false;
  isCoordinatesAvailable: boolean = false;
  @ViewChild(Refresher) myrefresher: Refresher;
  //// Declaring the Promise, yes! Promise!
  //filtersLoaded: Promise<boolean>;
  mysections: string = '1';
  map: GoogleMap;
  //constructor(public navCtrl: NavController, public navParams: NavParams, public servicesProvider: ServicesProvider, private sqlLiteProvider: SqlLiteProvider) {
  constructor(public navCtrl: NavController, public navParams: NavParams, public servicesProvider: ServicesProvider, public storage: Storage, 
    public platform: Platform) {
    console.log('Constructor ProblemPage');


    //sqlLiteProvider.addDanceMove('tango');
    //sqlLiteProvider.getDanceMoves();
  }

  doRefresh(refresher) {
    //console.log('Begin async operation', refresher);
    //this.getContent(http)
    if (this.servicesProvider.online) {
      this.getContent(refresher);
    }
    else {
      //alert(this.storageId);
      this.storage.get(this.storageId)
        .then(
          (data) => {
            this.dataset = data;
            this.setData();
            this.myrefresher.complete();
          }
        );
    }
  }

  getContent(refresher) {
    //alert(this.mysections);
    this.params = new HttpParams()
      .set('crtdate', '')
      .set('INSTID', this.servicesProvider.instId.toString())
      .set('id', this.navParams.get('id'))
      .set('TITLE', '')
      .set('contactid', '')//(this.servicesProvider.checkTokens)?this.servicesProvider.contID.toString():''
      .set('fname', '')
      .set('lname', '')
      .set('category', '') //Parent Category
      .set('status', '')
      .set('email', '')
      .set('phone', '')
      .set('DESC', '')
      .set('address', '')
      .set('addressno', '')
      .set('latitude', '')
      .set('longitude', '')
      .set('visible', '')
      .set('answer', '')
      .set('lang', this.servicesProvider.language)
      .set('sortby', 'F488CRTDATE')
      .set('sortorder', 'DESC')
      .set('currentpage', '1')
      .set('pagesize', '10')
      .set('count', '0')
      .set('runoption', 'I')
      .set('USER_UI_LANGUAGE', this.servicesProvider.language)
      .set('userprofile', this.servicesProvider.userProfile)
      .set('retcode', '0')
      .set('retmsg', '0')
      .set('rettype', 'I');
    this.servicesProvider.getContent("GetSubmissions", this.params)
      .then(data => {
        //alert(JSON.parse(data.toString()).length);
        this.dataset = JSON.parse(data.toString());
        this.storage.set(this.storageId.toString(), this.dataset);
        this.setData();
        refresher.complete();
        //alert(data);
        //console.log("User Login: " + JSON.parse(this.dataset)[0].F420TITLE);
      });
  }

  setData() {
    this.isDataAvailable = true;

    this.platform.ready().then(() => {
      if (this.dataset[0].F488LONGITUDE!=null) {
        this.isCoordinatesAvailable = true;
        this.loadMap(parseFloat(this.dataset[0].F488LONGITUDE), parseFloat(this.dataset[0].F488LATITUDE));
      }
    });
  }

  //if we want to use cache use ionViewDidLoad. To always load data use ionViewCanEnter.
  ionViewCanEnter() {
    //console.log('ionViewDidLoad LakatamiaPage');
    this.storageId = "ProblemPage" + this.navParams.get('id').toString();
    this.doRefresh(this.myrefresher);
  }

  loadMap(longitude, latitude) {
    console.log('loadMap');
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: latitude,
          lng: longitude
        },
        zoom: 17,
        tilt: 20
      }
    };

    this.map = GoogleMaps.create('map', mapOptions);

    // let marker: Marker = this.map.addMarkerSync({
    //     title: 'Ionic',
    //     icon: 'blue',
    //     animation: 'DROP',
    //     position: {
    //         lat: 35.1103776939127,
    //         lng: 33.300821106221065
    //     }
    // });
    //   marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
    //     alert('clicked');
    //   });
  }

}
