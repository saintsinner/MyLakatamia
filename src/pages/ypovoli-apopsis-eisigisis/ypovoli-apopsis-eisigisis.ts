import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Refresher, AlertController } from 'ionic-angular';
//import { HTTP } from '@ionic-native/http';
import { ServicesProvider } from '../../providers/services/services';
//import { SqlLiteProvider } from '../../providers/sql-lite/sql-lite';
import { HttpParams } from '@angular/common/http';
import { Validators, FormBuilder, FormGroup, ValidationErrors } from '@angular/forms';
import { HomePage } from '../home/home';

/**
 * Generated class for the YpovoliApopsisEisigisisPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ypovoli-apopsis-eisigisis',
  templateUrl: 'ypovoli-apopsis-eisigisis.html',
})
export class YpovoliApopsisEisigisisPage {
  params: any;
  dataset: any;
  datasetOld: any;
  isDataAvailable: boolean = false;
  @ViewChild(Refresher) myrefresher: Refresher;
  currentpage = 0;
  private myFormGroup: FormGroup;
  titleLength = 30;
  descriptionLength = 300;
  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, public servicesProvider: ServicesProvider, public alertCtrl: AlertController) {
    this.myFormGroup = this.formBuilder.group({
      category: ['', Validators.compose([Validators.required])],
      title: ['sdfs', Validators.compose([Validators.maxLength(this.titleLength), Validators.required])],
      description: ['3245234r234r', Validators.compose([Validators.maxLength(this.descriptionLength), Validators.required])]
    });
  }

  doRefresh(refresher) {
    //console.log('Begin async operation', refresher);
    //this.getContent(http)
    this.dataset = [];
    this.datasetOld = [];
    this.currentpage = 1;
    this.myFormGroup.reset();
    this.getContent(refresher);

    //setTimeout(() => {
    //    console.log('Async operation has ended');
    //    refresher.complete();
    //}, 10000);
  }

  getContent(refresher) {
    //alert(this.mysections);
    this.params = new HttpParams()
      //{INSTID:'1044', ID:'', PCTGID:'1003', TITLE:'', DESC:'', PUBLISH:'', SEQ:'', lang: 'EL', sortby:'F487DESC', sortorder:'ASC', currentpage:'1', 
      //pagesize:'1000', count:'0', runoption:'I', USER_UI_LANGUAGE:'EL', userprofile:'1044WEB', retcode:'0', retmsg:'0', rettype:'I'} })
      .set('INSTID', this.servicesProvider.instId.toString())
      .set('ID', '')
      .set('PCTGID', '1003')
      .set('TITLE', '')
      .set('DESC', '')
      .set('PUBLISH', '')
      .set('SEQ', '')
      .set('lang', this.servicesProvider.language)
      .set('sortby', 'F487TITLE')
      .set('sortorder', 'ASC')
      .set('currentpage', this.currentpage.toString())
      .set('pagesize', '10')
      .set('count', '0')
      .set('runoption', 'I')
      .set('USER_UI_LANGUAGE', this.servicesProvider.language)
      .set('userprofile', '')
      .set('retcode', '0')
      .set('retmsg', '0')
      .set('rettype', 'I');
    this.servicesProvider.getContent("GetSubmissionCategories", this.params)
      .then(data => {
        //alert(JSON.parse(data.toString()).length);
        this.dataset = JSON.parse(data.toString());
        this.isDataAvailable = true;
        refresher.complete();
        //alert(data);
        //console.log("User Login: " + JSON.parse(this.dataset)[0].F420TITLE);
      });
  }

  submitForm() {
    console.log(this.myFormGroup.value)
    if (this.myFormGroup.valid) {
      //alert(this.myFormGroup.value['title']);
      console.log('form submitted');
      let data = {
        category: this.myFormGroup.value['category'],
        title: this.myFormGroup.value['title'],
        description: this.myFormGroup.value['description'],
        contId: this.servicesProvider.contID
      };
      this.servicesProvider.addSubmission(data)
        .then(data => {
          //alert(JSON.parse(data.toString()).length);
          let message = JSON.parse(data.toString());
          //console.log(result.toString());
          //console.log(message[0]["@RETMSG"]);
          let alertTitle = "Μήνυμα";
          if (message[0]["@RETTYPE"] == 'E') {
            alertTitle = "Πρόβλημα"
          }
          const alert = this.alertCtrl.create({
            title: alertTitle,
            subTitle: message[0]["@RETMSG"],
            buttons: ['ΕΝΤΑΞΕΙ']
          });
          alert.present();
          if (message[0]["@RETTYPE"] == 'I') {
            this.navCtrl.push(HomePage);
          }
        });
      //this.servicesProvider.addSubmission(data);
    } else {
      var errorMessage = "Παρακαλώ συμπληρώστα τα πεδία με έγκυρα δεδομένα";
      // //this.myFormGroup.errors returns null which is wrong so the following does not work
      // for (let error in this.myFormGroup.errors) {
      //   errorMessage = errorMessage + error.toString();
      // }
      const popup = this.alertCtrl.create({
        title: 'Πρόβλημα',
        subTitle: errorMessage,
        buttons: ['ΕΝΤΑΞΕΙ']
      });
      popup.present();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad YpovoliApopsisEisigisisPage');

    this.doRefresh(this.myrefresher);


  }

}
