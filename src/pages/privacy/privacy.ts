import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Refresher } from 'ionic-angular';
//import { HTTP } from '@ionic-native/http';
import { ServicesProvider } from '../../providers/services/services';
//import { SqlLiteProvider } from '../../providers/sql-lite/sql-lite';
import { HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';


@Component({
    selector: 'page-privacy',
    templateUrl: 'privacy.html',
  })
  export class PrivacyPage {
      storageId: any;
      pageId: any;
      params: any;
      dataset: any;
      isDataAvailable: boolean = false;
      isTab1Available: boolean = false;
      isTab2Available: boolean = false;
      @ViewChild(Refresher) myrefresher: Refresher;
      //// Declaring the Promise, yes! Promise!
      //filtersLoaded: Promise<boolean>;
      //mysections: string = '1';
      //constructor(public navCtrl: NavController, public navParams: NavParams, public servicesProvider: ServicesProvider, private sqlLiteProvider: SqlLiteProvider) {
      constructor(public navCtrl: NavController, public navParams: NavParams, public servicesProvider: ServicesProvider, public storage: Storage) {
          //console.log('Constructor CreditsPage');
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
            .set('userprofile', this.servicesProvider.userProfile)
            .set('retcode', '0')
            .set('retmsg', '0')
            .set('rettype', 'I');
        this.servicesProvider.getContent("GetPages", this.params)
            .then(data => {
                //alert('');
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
        this.isTab1Available = true;
    }
      goBack() {
        this.navCtrl.setRoot(HomePage);
      }

      ionViewCanEnter() {
        //this.servicesProvider.checkNetwork();

        this.pageId = '1028';
        this.storageId = 'ContactPage';
        this.doRefresh(this.myrefresher);

        //console.log('ionViewDidLoad LakatamiaPage');

    }

    }
