import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Refresher } from 'ionic-angular';
//import { HTTP } from '@ionic-native/http';
import { ServicesProvider } from '../../providers/services/services';
//import { SqlLiteProvider } from '../../providers/sql-lite/sql-lite';
import { HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ApopsiEisigisiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-apopsi-eisigisi',
  templateUrl: 'apopsi-eisigisi.html',
})
export class ApopsiEisigisiPage {
  storageId: any;
  params: any;
  dataset: any;
  socialActions: any;
  isDataAvailable: boolean = false;
  isTab1Available: boolean = false;
  isTab2Available: boolean = false;
  @ViewChild(Refresher) myrefresher: Refresher;
  //// Declaring the Promise, yes! Promise!
  //filtersLoaded: Promise<boolean>;
  mysections: string = '1';
  moduleId = '1029';
  likes = 0;
  dislikes = 0;
  deviceLiked: boolean;
  deviceDisliked: boolean;
  //constructor(public navCtrl: NavController, public navParams: NavParams, public servicesProvider: ServicesProvider, private sqlLiteProvider: SqlLiteProvider) {
  constructor(public navCtrl: NavController, public navParams: NavParams, public servicesProvider: ServicesProvider, public storage: Storage) {
    console.log('Constructor ApopsiEisigisiPage');
    //sqlLiteProvider.addDanceMove('tango');
    //sqlLiteProvider.getDanceMoves();
  }

  doRefresh(refresher) {
    //console.log('Begin async operation', refresher);
    //this.getContent(http)
    if (this.servicesProvider.online) {
      this.getContent(refresher);
      this.getSocialActions();
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
  }

  //if we want to use cache use ionViewDidLoad. To always load data use ionViewCanEnter.
  ionViewCanEnter() {
    //console.log('ionViewDidLoad LakatamiaPage');
    this.storageId = "ApopsiEisigisiPage" + this.navParams.get('id').toString();
    this.doRefresh(this.myrefresher);
  }

  getSocialActions() {
    this.params = new HttpParams()
      .set('INSTID', this.servicesProvider.instId.toString())
      .set('id', '')
      .set('deviceid', (this.servicesProvider.deviceId == null ? "" : this.servicesProvider.deviceId))
      .set('moduleId', this.moduleId)
      .set('itemId', this.navParams.get('id'))
      .set('actionType', '')
      .set('lang', this.servicesProvider.language)
      .set('runoption', 'I')
      .set('userprofile', this.servicesProvider.userProfile)
      .set('retcode', '0')
      .set('retmsg', '0')
      .set('rettype', 'I');
    this.servicesProvider.getContent("GetSocialActions", this.params, false)
      .then(data => {
        //alert(JSON.parse(data.toString()).length);
        this.socialActions = JSON.parse(data.toString());
        this.likes = 0;
        this.dislikes = 0;
        this.deviceLiked = false;
        this.deviceDisliked = false;

        for (let item of this.socialActions) {
          if (item.F492TYPE.toString() == "1001") {
            this.likes = this.likes + 1;
            if (item.F492DEVICEID.toString() == this.servicesProvider.deviceId) {
              this.deviceLiked = true;
            }
          }
          else if (item.F492TYPE.toString() == "1002") {
            this.dislikes = this.dislikes + 1;
            if (item.F492DEVICEID.toString() == this.servicesProvider.deviceId) {
              this.deviceDisliked = true;
            }
          }
        }

        //alert(data);
        //console.log("User Login: " + JSON.parse(this.dataset)[0].F420TITLE);
      })
  }

  updateSocialActions(actionType) {
    this.params = new HttpParams()
      .set('INSTID', this.servicesProvider.instId.toString())
      .set('id', '')
      .set('deviceid', (this.servicesProvider.deviceId == null ? "" : this.servicesProvider.deviceId))
      .set('moduleId', this.moduleId)
      .set('itemId', this.navParams.get('id'))
      .set('actionType', actionType)
      .set('lang', this.servicesProvider.language)
      .set('runoption', 'U')
      .set('userprofile', this.servicesProvider.userProfile)
      .set('retcode', '0')
      .set('retmsg', '0')
      .set('rettype', 'I');
    this.servicesProvider.getContent("GetSocialActions", this.params)
      .then(data => {
        //alert(JSON.parse(data.toString()).length);
        //this.dataset = JSON.parse(data.toString());
        this.getSocialActions();
        //alert(data);
        //console.log("User Login: " + JSON.parse(this.dataset)[0].F420TITLE);
      })
  }

}
