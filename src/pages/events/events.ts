import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Refresher, InfiniteScroll } from 'ionic-angular';
//import { HTTP } from '@ionic-native/http';
import { ServicesProvider } from '../../providers/services/services';
//import { SqlLiteProvider } from '../../providers/sql-lite/sql-lite';
import { HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { EventPage } from '../event/event';

/**
 * Generated class for the EventsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {
  storageId: any;
  params: any;
  dataset: any;
  datasetOld: any;
  isDataAvailable: boolean = false;
  isTab1Available: boolean = false;
  isTab2Available: boolean = false;
  @ViewChild(Refresher) myrefresher: Refresher;
  @ViewChild(InfiniteScroll) myinfinitescroll: InfiniteScroll;
  //// Declaring the Promise, yes! Promise!
  //filtersLoaded: Promise<boolean>;
  mysections: string = '1';
  datefrom = new Date().toISOString().substr(0, 10);
  dateto = "3000-01-01";
  currentpage = 0;
  theEnd = false;
  //constructor(public navCtrl: NavController, public navParams: NavParams, public servicesProvider: ServicesProvider, private sqlLiteProvider: SqlLiteProvider) {
  constructor(public navCtrl: NavController, public navParams: NavParams, public servicesProvider: ServicesProvider, public storage: Storage) {
    //console.log('Constructor LakatamiaPage');
    //sqlLiteProvider.addDanceMove('tango');
    //sqlLiteProvider.getDanceMoves();
  }

  doRefresh(refresher) {
    //console.log('Begin async operation', refresher);
    //this.getContent(http)
    this.mysections = '1';
    this.datefrom = new Date().toISOString().substr(0, 10);
    this.dateto = "3000-01-01";
    this.dataset = [];
    this.datasetOld = [];
    this.currentpage = 1;
    this.theEnd = false;
    this.getContent(refresher);

    //setTimeout(() => {
    //    console.log('Async operation has ended');
    //    refresher.complete();
    //}, 10000);
  }

  getContent(refresher) {
    //alert(this.mysections);
    this.params = new HttpParams()
      .set('INSTID', this.servicesProvider.instId.toString())
      .set('eventsid', '0')
      .set('catid', '')
      .set('TITLE', '')
      .set('DESC', '')
      .set('DATEFM', this.datefrom)
      .set('DATETO', this.dateto)
      .set('lang', this.servicesProvider.language)
      .set('sortby', 'F426DATEFROM')
      .set('sortorder', 'DESC')
      .set('currentpage', this.currentpage.toString())
      .set('pagesize', '10')
      .set('count', '0')
      .set('runoption', 'I')
      .set('USER_UI_LANGUAGE', this.servicesProvider.language)
      .set('userprofile', '')
      .set('retcode', '0')
      .set('retmsg', '0')
      .set('rettype', 'I');
    this.servicesProvider.getContent("GetEvents", this.params)
      .then(data => {
        //alert(JSON.parse(data.toString()).length);
        //this.dataset = JSON.parse(data.toString());
        if (this.mysections == '1') {
          if (JSON.parse(data.toString()).length > 0) {
            for (let item of JSON.parse(data.toString())) {
              this.dataset.push(item);
              this.storage.set(this.storageId.toString(), this.dataset);
            }
          }
          else {
            //this.noData=true;
            this.theEnd = true;
          }
        }
        else {
          if (JSON.parse(data.toString()).length > 0) {
            for (let item of JSON.parse(data.toString())) {
              this.datasetOld.push(item);
              this.storage.set(this.storageId.toString(), this.datasetOld);
            }
          }
          else {
            //this.noData=true;
            this.theEnd = true;
          }
        }
        //alert(this.dataset);
        //this.dataset = data;
        this.setData();
        refresher.complete();
        this.myinfinitescroll.complete();
        //alert(data);
        //console.log("User Login: " + JSON.parse(this.dataset)[0].F420TITLE);
      });
  }

  setData() {
    this.isDataAvailable = true;
    if (this.mysections == "1") {
      this.isTab1Available = true;
      this.isTab2Available = false;
    }
    else if (this.mysections == "2") {
      this.isTab1Available = false;
      this.isTab2Available = true;
    }
  }

  //if we want to use cache use ionViewDidLoad. To always load data use ionViewCanEnter.
  ionViewCanEnter() {
    //this.servicesProvider.online=false;
    //this.servicesProvider.isApp=true;
    //console.log('ionViewDidLoad LakatamiaPage');
    this.storageId = "EventsPage" + this.mysections;
    //console.log('ionViewDidLoad LakatamiaPage');
    if (this.servicesProvider.online || !this.servicesProvider.isApp) {
      this.doRefresh(this.myrefresher);
    }
    else {
      alert(this.storageId);
      this.theEnd = true;
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

  changeSection() {
    this.currentpage = 0;
    this.theEnd = false;
    this.storageId = "ApopseisEisigiseisPage" + this.mysections;

    if (this.mysections == '1') {
      this.dataset = [];
      this.datefrom = new Date().toISOString().substr(0, 10);
      this.dateto = "3000-01-01";

      if (this.servicesProvider.online || !this.servicesProvider.isApp) {
        this.doInfinite(this.myinfinitescroll);
      }
      else {
        this.theEnd = true;
        this.myinfinitescroll.complete();
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
    else {
      this.datasetOld = [];
      this.datefrom = "2000-01-01";
      var newdate = new Date();
      newdate.setDate(newdate.getDate() - 2);
      this.dateto = newdate.toISOString().substr(0, 10);

      if (this.servicesProvider.online || !this.servicesProvider.isApp) {
        this.doInfinite(this.myinfinitescroll);
      }
      else {
        this.theEnd = true;
        this.myinfinitescroll.complete();
        this.storage.get(this.storageId)
          .then(
            (data) => {
              this.datasetOld = data;
              this.setData();
              this.myrefresher.complete();
            }
          );
      }
    }
  }

  doInfinite(infiniteScroll) {
    if (this.theEnd == false) {
      this.currentpage = this.currentpage + 1;
      //alert(this.currentpage);
      this.getContent(this.myrefresher);
    }
    else {
      infiniteScroll.complete();
    }
  }

  goToEvent(id) {
    this.navCtrl.push(EventPage,{ id: id });
  }

}

