import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Refresher } from 'ionic-angular';
//import { HTTP } from '@ionic-native/http';
import { ServicesProvider } from '../../providers/services/services';
//import { SqlLiteProvider } from '../../providers/sql-lite/sql-lite';
import { HttpParams } from '@angular/common/http';

/**
 * Generated class for the ProblemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-problem',
  templateUrl: 'problem.html',
})
export class ProblemPage {
  params: any;
  dataset: any;
  isDataAvailable: boolean = false;
  isTab1Available: boolean = false;
  isTab2Available: boolean = false;
  @ViewChild(Refresher) myrefresher: Refresher;
  //// Declaring the Promise, yes! Promise!
  //filtersLoaded: Promise<boolean>;
  mysections: string = '1';
  //constructor(public navCtrl: NavController, public navParams: NavParams, public servicesProvider: ServicesProvider, private sqlLiteProvider: SqlLiteProvider) {
  constructor(public navCtrl: NavController, public navParams: NavParams, public servicesProvider: ServicesProvider) {
    console.log('Constructor ProblemPage');
    //sqlLiteProvider.addDanceMove('tango');
    //sqlLiteProvider.getDanceMoves();
  }

  doRefresh(refresher) {
    //console.log('Begin async operation', refresher);
    //this.getContent(http)
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
        .set('userprofile', '')
        .set('retcode', '0')
        .set('retmsg', '0')
        .set('rettype', 'I');
        this.servicesProvider.getContent("GetSubmissions", this.params)
          .then(data => {
            //alert(JSON.parse(data.toString()).length);
            this.dataset = JSON.parse(data.toString());
            this.isDataAvailable = true;
            refresher.complete();
            //alert(data);
            //console.log("User Login: " + JSON.parse(this.dataset)[0].F420TITLE);
          });


  }

  //if we want to use cache use ionViewDidLoad. To always load data use ionViewCanEnter.
  ionViewCanEnter() {
    //console.log('ionViewDidLoad LakatamiaPage');
    //alert(this.navParams.get('id'));
    this.doRefresh(this.myrefresher);
  }

}
