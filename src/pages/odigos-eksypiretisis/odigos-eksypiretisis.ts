import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Refresher, InfiniteScroll } from 'ionic-angular';
//import { HTTP } from '@ionic-native/http';
import { ServicesProvider } from '../../providers/services/services';
//import { SqlLiteProvider } from '../../providers/sql-lite/sql-lite';
import { HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';
//import { EventPage } from '../event/event';

/**
 * Generated class for the OdigosEksypiretisisPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-odigos-eksypiretisis',
  templateUrl: 'odigos-eksypiretisis.html',
})
export class OdigosEksypiretisisPage {
  storageId: any;
  pageId: any;
  params: any;
  dataset: any;
  isDataAvailable: boolean = false;
  isTab1Available: boolean = false;
  isTab2Available: boolean = false;
  sections: Array<{ title: string, pageId: string }>;
  @ViewChild(Refresher) myrefresher: Refresher;
  //constructor(public navCtrl: NavController, public navParams: NavParams, public servicesProvider: ServicesProvider, private sqlLiteProvider: SqlLiteProvider) {
  constructor(public navCtrl: NavController, public navParams: NavParams, public servicesProvider: ServicesProvider, public storage: Storage) {
    //console.log('Constructor LakatamiaPage');
    //sqlLiteProvider.addDanceMove('tango');
    //sqlLiteProvider.getDanceMoves();
  }

  doRefresh(refresher) {
    //console.log('Begin async operation', refresher);
    //this.getContent(http)
    //this.mysections = '1';
    this.getContent(refresher);


    //setTimeout(() => {
    //    console.log('Async operation has ended');
    //    refresher.complete();
    //}, 10000);
  }

  getContent(refresher) {
    this.params = new HttpParams()
      .set('INSTID', this.servicesProvider.instId.toString())
      .set('ID', this.pageId)
      .set('TITLE', '')
      .set('SECTIONS', '0')
      .set('desc', '')
      .set('enablesum', '')
      .set('keywords', '')
      .set('pagename', '')
      .set('masterp', '0')
      .set('path', '')
      .set('htmltopimg', '')
      .set('htmltopdesc', '')
      .set('htmloverview', '')
      .set('htmlconclusion', '')
      .set('htmls1', '')
      .set('htmll1', '')
      .set('htmls2', '')
      .set('htmll2', '')
      .set('htmls3', '')
      .set('htmll3', '')
      .set('htmls4', '')
      .set('htmll4', '')
      .set('htmls5', '')
      .set('htmll5', '')
      .set('htmls6', '')
      .set('htmll6', '')
      .set('htmls7', '')
      .set('htmll7', '')
      .set('htmls8', '')
      .set('htmll8', '')
      .set('htmls9', '')
      .set('htmll9', '')
      .set('htmls10', '')
      .set('htmll10', '')
      .set('lang', this.servicesProvider.language)
      .set('sortby', 'F420ID')
      .set('sortorder', 'ASC')
      .set('currentpage', '1')
      .set('pagesize', '10')
      .set('count', '0')
      .set('runoption', 'I')
      .set('USER_UI_LANGUAGE', this.servicesProvider.language)
      .set('userprofile', '')
      .set('retcode', '0')
      .set('retmsg', '0')
      .set('rettype', 'I');
    this.servicesProvider.getContent("GetPages", this.params)
      .then(data => {
        //alert('');
        this.dataset = JSON.parse(data.toString());
        this.storage.set(this.storageId.toString(), this.dataset);
        //this.sections=this.dataset[0].F420HTMLS1.split(";");

        //this.dataset = data;
        //this.filtersLoaded = Promise.resolve(true);

        this.setData();
        refresher.complete();
        //alert(data);
        //console.log("User Login: " + JSON.parse(this.dataset)[0].F420TITLE);
      });
  }

  setData() {
    if (this.dataset!=null) {
      this.sections = [];
      if (this.pageId == '1011') {
        var pages = this.dataset[0].F420HTMLS1.split(";");
        var pageIds = this.dataset[0].F420HTMLS2.split(";");
        let count = 0;
        for (let entry of pages) {
          this.sections.push({ title: entry, pageId: pageIds[count] })
          count = count + 1;
        }
        this.isTab1Available = true;
        this.isTab2Available = false;
      }
      else {
        this.isTab1Available = false;
        this.isTab2Available = true;
      }
      this.isDataAvailable = true;
    }
  }

  //if we want to use cache use ionViewDidLoad instead of ionViewCanEnter
  ionViewCanEnter() {
    //this.servicesProvider.online = false;
    //this.servicesProvider.isApp = true;
    if (this.navParams.get('id') != null) {
      this.pageId = this.navParams.get('id');
    }
    else {
      this.pageId = '1011';
    }
    this.storageId = 'OdigosEksypiretisisPage' + this.pageId;

    if (this.servicesProvider.online) {
      this.doRefresh(this.myrefresher);
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
    //console.log('ionViewDidLoad LakatamiaPage');

  }

  openPage(pageId) {
    this.navCtrl.push(OdigosEksypiretisisPage, { id: pageId });
  }
}