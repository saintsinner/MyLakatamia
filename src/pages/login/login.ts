import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public events: Events) {

  }

  ionViewCanEnter() {
    console.log('ionViewDidLoad LoginPage');
    this.storage.set("Token", "10000001");
    this.storage.set("EncodedToken", btoa("10000001"));
    this.events.publish('user:login');
  }

}
