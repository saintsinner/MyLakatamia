import { Component, ViewChild } from '@angular/core';
import { NavController, Platform, NavParams, Refresher } from 'ionic-angular';
//import { HTTP } from '@ionic-native/http';
import { ServicesProvider } from '../../providers/services/services';
//import { SqlLiteProvider } from '../../providers/sql-lite/sql-lite';
import { HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { NotificationPage } from '../notification/notification';
import { Badge } from '@ionic-native/badge';

/**
 * Generated class for the NotificationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {
  storageId: any;
  pageId: any;
  params: any;
  dataset: any;
  isDataAvailable: boolean = false;
  isTab1Available: boolean = false;
  isTab2Available: boolean = false;
  @ViewChild(Refresher) myrefresher: Refresher;
  //constructor(public navCtrl: NavController, public navParams: NavParams, public servicesProvider: ServicesProvider, private sqlLiteProvider: SqlLiteProvider) {
  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams, public servicesProvider: ServicesProvider, public storage: Storage, private badge: Badge) {
    //console.log('Constructor LakatamiaPage');
    //sqlLiteProvider.addDanceMove('tango');
    //sqlLiteProvider.getDanceMoves();
  }

  doRefresh(refresher) {
    //console.log('Begin async operation', refresher);
    //this.getContent(http)
    if (this.servicesProvider.online) {
      //this.mysections = '1';
      this.getContent(refresher);
    }
    else {
      this.storage.get(this.storageId)
        .then(
          (data) => {
            this.dataset = data;
            this.setData();
            this.myrefresher.complete();
          }
        );
    }

    //setTimeout(() => {
    //    console.log('Async operation has ended');
    //    refresher.complete();
    //}, 10000);
  }

  getContent(refresher) {
    this.params = new HttpParams()
      .set('INSTID', this.servicesProvider.instId.toString())
      .set('ID', '')
      .set('contId', (this.servicesProvider.contID == null ? "" : this.servicesProvider.contID))
      .set('deviceId', (this.servicesProvider.deviceId == null ? "" : this.servicesProvider.deviceId))
      .set('notificationId', '')
      .set('category', '1001')
      .set('lang', this.servicesProvider.language)
      .set('sortby', 'F491CRTDATE')
      .set('sortorder', 'DESC')
      .set('currentpage', '1')
      .set('pagesize', '99')
      .set('count', '0')
      .set('runoption', 'I')
      .set('USER_UI_LANGUAGE', this.servicesProvider.language)
      .set('userprofile', this.servicesProvider.userProfile)
      .set('retcode', '0')
      .set('retmsg', '0')
      .set('rettype', 'I');
    this.servicesProvider.getContent("GetUserNotifications", this.params)
      .then(data => {
        //alert('');
        this.dataset = JSON.parse(data.toString());
        for (let d of this.dataset) {
          if (d.F491READ.toString().toLowerCase().trim() == 'true') {
            d.F491READ = true;
          }
          else {
            d.F491READ = false;
          }
        }
        this.storage.set(this.storageId.toString(), this.dataset);
        //this.dataset = data;
        //this.filtersLoaded = Promise.resolve(true);
        this.setData();
        refresher.complete();
        //alert(data);
        //console.log("User Login: " + JSON.parse(this.dataset)[0].F420TITLE);
      });
  }

  //if we want to use cache use ionViewDidLoad instead of ionViewCanEnter
  setData() {
    this.isDataAvailable = true;
    this.isTab1Available = true;
  }

  //if we want to use cache use ionViewDidLoad. To always load data use ionViewCanEnter.
  ionViewCanEnter() {
    //console.log('ionViewDidLoad LakatamiaPage');
    this.pageId = '';
    this.storageId = 'NotificationsPage';
    this.doRefresh(this.myrefresher);
  }


  goToNotification(id, notificationId) {
    let postdata = {
      instId: this.servicesProvider.instId,
      id: id,
      deviceId: this.servicesProvider.deviceId,
      contId: this.servicesProvider.contID,
      notificationId: notificationId,
      isRead: 'True',
      lang: this.servicesProvider.language,
      runoption: 'U',
      USER_UI_LANGUAGE: this.servicesProvider.language,
      userprofile: this.servicesProvider.userProfile,
      retcode: '',
      retmsg: '',
      rettype: ''
    };

    this.servicesProvider.updateUserNotifications(postdata)
      .then(data => {
        let message = JSON.parse(data.toString());
        if(this.platform.is('ios'))
        {
          //const permBadge = this.badge.requestPermission();
          this.badge.clear();
        }
        this.navCtrl.push(NotificationPage, { id: id });
      });
  }
}
