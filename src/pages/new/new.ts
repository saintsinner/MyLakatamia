import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Refresher } from 'ionic-angular';
//import { HTTP } from '@ionic-native/http';
import { ServicesProvider } from '../../providers/services/services';
//import { SqlLiteProvider } from '../../providers/sql-lite/sql-lite';
import { HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing';

/**
 * Generated class for the NewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-new',
  templateUrl: 'new.html',
})
export class NewPage {
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
  moduleId = '1001';
  likes = 0;
  dislikes = 0;
  deviceLiked: boolean;
  deviceDisliked: boolean;
  //constructor(public navCtrl: NavController, public navParams: NavParams, public servicesProvider: ServicesProvider, private sqlLiteProvider: SqlLiteProvider) {
  constructor(public navCtrl: NavController, public navParams: NavParams, public servicesProvider: ServicesProvider, public storage: Storage, public socialSharing: SocialSharing) {
    //console.log('Constructor LakatamiaPage');
    //sqlLiteProvider.addDanceMove('tango');
    //sqlLiteProvider.getDanceMoves();
  }

  doRefresh(refresher) {
    //console.log('Begin async operation', refresher);
    //this.getContent(http)
    if (this.servicesProvider.online) {
      this.getContent(refresher);
      //this.getSocialActions();
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
      .set('INSTID', this.servicesProvider.instId.toString())
      .set('newsid', this.navParams.get('id'))
      .set('catid', '')
      .set('TITLE', '')
      .set('DESC', '')
      .set('DATEFM', '')
      .set('DATETO', '')
      .set('lang', this.servicesProvider.language)
      .set('sortby', 'F401PUBDATE')
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
    this.servicesProvider.getContent("GetNews", this.params)
      .then(data => {
        //alert(JSON.parse(data.toString()).length);
        this.dataset = JSON.parse(data.toString());
        this.storage.set(this.storageId.toString(), this.dataset);
        this.setData();
        refresher.complete();
        //alert(data);
        //console.log("User Login: " + JSON.parse(this.dataset)[0].F420TITLE);
      })
  }

  setData() {
    this.isDataAvailable = true;
  }

  //if we want to use cache use ionViewDidLoad instead of ionViewCanEnter
  ionViewCanEnter() {
    //console.log('ionViewDidLoad LakatamiaPage');
    this.storageId = "NewPage" + this.navParams.get('id').toString();
    this.doRefresh(this.myrefresher);
  }

  // getSocialActions() {
  //   this.params = new HttpParams()
  //     .set('INSTID', this.servicesProvider.instId.toString())
  //     .set('id', '')
  //     .set('deviceid', (this.servicesProvider.deviceId == null ? "" : this.servicesProvider.deviceId))
  //     .set('moduleId', this.moduleId)
  //     .set('itemId', this.navParams.get('id'))
  //     .set('actionType', '')
  //     .set('lang', this.servicesProvider.language)
  //     .set('runoption', 'I')
  //     .set('userprofile', this.servicesProvider.userProfile)
  //     .set('retcode', '0')
  //     .set('retmsg', '0')
  //     .set('rettype', 'I');
  //   this.servicesProvider.getContent("GetSocialActions", this.params, false)
  //     .then(data => {
  //       //alert(JSON.parse(data.toString()).length);
  //       this.socialActions = JSON.parse(data.toString());
  //       this.likes = 0;
  //       this.dislikes = 0;
  //       this.deviceLiked = false;
  //       this.deviceDisliked = false;

  //       for (let item of this.socialActions) {
  //         if (item.F492TYPE.toString() == "1001") {
  //           this.likes = this.likes + 1;
  //           if (item.F492DEVICEID.toString() == this.servicesProvider.deviceId) {
  //             this.deviceLiked = true;
  //           }
  //         }
  //         else if (item.F492TYPE.toString() == "1002") {
  //           this.dislikes = this.dislikes + 1;
  //           if (item.F492DEVICEID.toString() == this.servicesProvider.deviceId) {
  //             this.deviceDisliked = true;
  //           }
  //         }
  //       }

  //       //alert(data);
  //       //console.log("User Login: " + JSON.parse(this.dataset)[0].F420TITLE);
  //     })
  // }

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
        //this.getSocialActions();
        //alert(data);
        //console.log("User Login: " + JSON.parse(this.dataset)[0].F420TITLE);
      })
  }

  shareAction() {
    let message = this.dataset[0].F401TITLE;
    this.socialSharing.share(message, null, null, null)
    .then(()=>{
      this.updateSocialActions('1003');
    })
    .catch(()=>{

    });
  }
}
