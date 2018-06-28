import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Refresher, AlertController, Events } from 'ionic-angular';
//import { HTTP } from '@ionic-native/http';
import { ServicesProvider } from '../../providers/services/services';
//import { SqlLiteProvider } from '../../providers/sql-lite/sql-lite';
import { HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';
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
  storageId: any;
  pageId: any;
  params: any;
  dataset: any;
  datasetOld: any;
  isDataAvailable: boolean = false;
  @ViewChild(Refresher) myrefresher: Refresher;
  currentpage = 0;
  private myFormGroup: FormGroup;
  titleLength = 100;
  descriptionLength = 500;
  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, public servicesProvider: ServicesProvider, public events: Events,
    public alertCtrl: AlertController, public storage: Storage) {
    this.myFormGroup = this.formBuilder.group({
      category: ['', Validators.compose([Validators.required])],
      title: ['', Validators.compose([Validators.maxLength(this.titleLength), Validators.required])],
      description: ['', Validators.compose([Validators.maxLength(this.descriptionLength), Validators.required])]
    });

    this.events.publish('user:login');
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
      .set('pagesize', '100')
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

  submitForm() {
    //this.servicesProvider.online = false;
    //this.servicesProvider.isApp = true;
    console.log(this.myFormGroup.value)
    if (this.myFormGroup.valid) {
      //alert(this.myFormGroup.value['title']);
      console.log('form submitted');
      let postdata = {
        category: this.myFormGroup.value['category'],
        title: this.myFormGroup.value['title'],
        description: this.myFormGroup.value['description'],
        contId: this.servicesProvider.contID
      };

      let submissions: any;
      //if (this.storage.get("YpovoliApopsisEisigisisPage") != null) {
      this.storage.get("YpovoliApopsisEisigisisPage")
        .then(
          (data) => {
            submissions = data;
            if (submissions == null) {
              submissions = [];
            }
            submissions.push(postdata);
            this.storage.set("YpovoliApopsisEisigisisPage", submissions);
            if (this.servicesProvider.online || !this.servicesProvider.isApp) {
              this.servicesProvider.addSubmission(postdata)
                .then(data => {
                  this.storage.remove("YpovoliApopsisEisigisisPage");
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
                    this.navCtrl.setRoot(HomePage);
                  }
                });
              //this.servicesProvider.addSubmission(data);
            }
            else {
              let alertTitle = "Μήνυμα";

              const alert = this.alertCtrl.create({
                title: alertTitle,
                subTitle: "Η καταχώρησή σας θα υποβληθεί μόλις ενωθείτε με το διαδίκτυο",
                buttons: ['ΕΝΤΑΞΕΙ']
              });
              alert.present();
              this.navCtrl.push(HomePage);
            }
          }
        );
      // }
      // else {
      //   submissions.push(postdata);
      //   this.storage.set("YpovoliApopsisEisigisisPage", submissions);
      //}
      // let aaa=[];
      // aaa.push(data);
      // localStorage.setItem("submission")


    } else {
      var errorMessage = "Παρακαλώ συμπληρώστε τα πεδία με έγκυρα δεδομένα";
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

    this.storageId = 'YpovoliApopsisEisigisisPageCategories';
    if (this.servicesProvider.online || !this.servicesProvider.isApp) {
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


  }

}
