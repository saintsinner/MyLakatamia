import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
//import { HTTP } from '@ionic-native/http';
import { ServicesProvider } from '../../providers/services/services';
//import { SqlLiteProvider } from '../../providers/sql-lite/sql-lite';
//import { HttpParams } from '@angular/common/http';

import { Storage } from '@ionic/storage';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  constructor(public navCtrl: NavController, public navParams: NavParams, public servicesProvider: ServicesProvider, public storage: Storage, public events: Events) {
  }

  ionViewCanEnter() {
    console.log('ionViewDidLoad SettingsPage');    
  }

  notify(event) {
    this.servicesProvider.startNotificationEvents(event.checked);
  }  

}
