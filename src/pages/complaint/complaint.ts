import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Refresher } from 'ionic-angular';
//import { HTTP } from '@ionic-native/http';
import { ServicesProvider } from '../../providers/services/services';
//import { SqlLiteProvider } from '../../providers/sql-lite/sql-lite';
import { HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { PhotoViewer } from '@ionic-native/photo-viewer';


/**
 * Generated class for the ComplaintPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-complaint',
  templateUrl: 'complaint.html',
})
export class ComplaintPage {
  storageId: any;
  params: any;
  dataset: any;
  datasetImages: any;
  isDataAvailable: boolean = false;
  isDataImagesAvailable: boolean = false;
  isTab1Available: boolean = false;
  isTab2Available: boolean = false;
  @ViewChild(Refresher) myrefresher: Refresher;
  //// Declaring the Promise, yes! Promise!
  //filtersLoaded: Promise<boolean>;
  mysections: string = '1';
  //constructor(public navCtrl: NavController, public navParams: NavParams, public servicesProvider: ServicesProvider, private sqlLiteProvider: SqlLiteProvider) {
  constructor(public navCtrl: NavController, public navParams: NavParams, public servicesProvider: ServicesProvider, public storage: Storage, public photoViewer: PhotoViewer) {
    console.log('Constructor ComplaintPage');
    //sqlLiteProvider.addDanceMove('tango');
    //sqlLiteProvider.getDanceMoves();
  }

  doRefresh(refresher) {
    //console.log('Begin async operation', refresher);
    //this.getContent(http)
    if (this.servicesProvider.online) {
      this.getContent(refresher);
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
      this.params = new HttpParams()
      .set('INSTID', this.servicesProvider.instId.toString())
      .set('lang', this.servicesProvider.language)
      .set('refItemId', this.navParams.get('id'))
      .set('refTableId', '488') 
      this.servicesProvider.getContent("GetImages", this.params, false)
      .then(data => {
        //alert(JSON.parse(data.toString()).length);
        this.datasetImages = JSON.parse(data.toString());
       this.isDataImagesAvailable = true;
        //refresher.complete();
      });

  }

  setData() {
    this.isDataAvailable = true;
  }

  //if we want to use cache use ionViewDidLoad. To always load data use ionViewCanEnter.
  ionViewCanEnter() {
    //console.log('ionViewDidLoad LakatamiaPage');
    this.storageId = "ComplaintPage" + this.navParams.get('id').toString();
    this.doRefresh(this.myrefresher);
  }

  viewLargerImage(itemID: string ){
      this.photoViewer.show(this.servicesProvider.baseUrl+"zeportalapi/PreviewImage.ashx?itemId="+itemID+"&refTableId=488&imageSize=L&language="+ this.servicesProvider.language);

  }

}
