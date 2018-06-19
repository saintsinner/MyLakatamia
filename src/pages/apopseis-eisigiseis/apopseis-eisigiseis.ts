import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Refresher, InfiniteScroll } from 'ionic-angular';
//import { HTTP } from '@ionic-native/http';
import { ServicesProvider } from '../../providers/services/services';
//import { SqlLiteProvider } from '../../providers/sql-lite/sql-lite';
import { HttpParams } from '@angular/common/http';
import { YpovoliApopsisEisigisisPage } from '../ypovoli-apopsis-eisigisis/ypovoli-apopsis-eisigisis';

/**
 * Generated class for the ApopseisEisigiseisPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-apopseis-eisigiseis',
  templateUrl: 'apopseis-eisigiseis.html',
})
export class ApopseisEisigiseisPage {
  params: any;
  dataset: any;
  datasetOld: any;
  isDataAvailable: boolean = false;
  isTab1Available: boolean = false;
  isTab2Available: boolean = false;
  @ViewChild(Refresher) myrefresher: Refresher;
  @ViewChild(InfiniteScroll) myinfinitescroll: InfiniteScroll;
  filterContactId:any;
  //// Declaring the Promise, yes! Promise!
  //filtersLoaded: Promise<boolean>;
  mysections: string = '1';
  currentpage = 0;
  theEnd = false;
  //constructor(public navCtrl: NavController, public navParams: NavParams, public servicesProvider: ServicesProvider, private sqlLiteProvider: SqlLiteProvider) {
  constructor(public navCtrl: NavController, public navParams: NavParams, public servicesProvider: ServicesProvider) {
    console.log('Constructor ApopseisEisigiseisPage');

    localStorage.setItem("Token", "1001");
    localStorage.setItem("EncodedToken", btoa("1001"));
    //sqlLiteProvider.addDanceMove('tango');
    //sqlLiteProvider.getDanceMoves();
  }

  doRefresh(refresher) {
    //console.log('Begin async operation', refresher);
    //this.getContent(http)
    this.mysections = '1';
    this.filterContactId=null;
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
      .set('crtdate', '')  
      .set('INSTID', this.servicesProvider.instId.toString())
      .set('id', '')
      .set('catid', '')
      .set('TITLE', '')
      .set('contactid', this.filterContactId)//(this.servicesProvider.checkTokens)?this.servicesProvider.contID.toString():''
      .set('fname', '')
      .set('lname', '')
      .set('category', '1001')
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
      .set('currentpage', this.currentpage.toString())
      .set('pagesize', '10')
      .set('count', '0')
      .set('runoption', 'I')
      .set('USER_UI_LANGUAGE', this.servicesProvider.language)
      .set('userprofile', '')
      .set('retcode', '0')
      .set('retmsg', '0')
      .set('rettype', 'I');
    this.servicesProvider.getContent("Getsubmissions2", this.params)
      .then(data => {
        //alert(JSON.parse(data.toString()).length);
        //this.dataset = JSON.parse(data.toString());
        if (this.mysections == '1') {
          if (JSON.parse(data.toString()).length > 0) {
            for (let item of JSON.parse(data.toString())) {
              this.dataset.push(item);
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
            }
          }
          else {
            //this.noData=true;
            this.theEnd = true;
          }
        }
        //alert(this.dataset);
        //this.dataset = data;
        this.isDataAvailable = true;
        if (this.mysections == "1") {
          this.isTab1Available = true;
          this.isTab2Available = false;
        }
        else if (this.mysections == "2") {
          this.isTab1Available = false;
          this.isTab2Available = true;
        }
        refresher.complete();
        this.myinfinitescroll.complete();
        //alert(data);
        //console.log("User Login: " + JSON.parse(this.dataset)[0].F420TITLE);
      });
  }

  //if we want to use cache use ionViewDidLoad. To always load data use ionViewCanEnter.
  ionViewCanEnter() {
    //console.log('ionViewDidLoad LakatamiaPage');
    this.doRefresh(this.myrefresher);

  }

  changeSection() {
    this.currentpage = 0;
    this.theEnd = false;
    if (this.mysections == '1') {
      this.dataset = [];
      this.filterContactId=null;
    }
    else {
      this.datasetOld = [];
      this.filterContactId=this.servicesProvider.contID;
    }
    this.doInfinite(this.myinfinitescroll);
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

  goToSubmission(id)
  {
    this.navCtrl.push(YpovoliApopsisEisigisisPage,{ id: id });
  }

}

