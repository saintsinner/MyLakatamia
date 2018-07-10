import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
//import { HTTP } from '@ionic-native/http';
import { ServicesProvider } from '../../providers/services/services';
//import { SqlLiteProvider } from '../../providers/sql-lite/sql-lite';
import { HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HomePage } from '../home/home';

/**
 * Generated class for the ChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {
  storageId: any;
  pageId: any;
  params: any;
  dataset: any;
  datasetOld: any;
  isDataAvailable: boolean = false;
  currentpage = 0;
  T019SECQ: any;
  Tmsgs: any;

  private myFormGroup: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, public servicesProvider: ServicesProvider,
    public alertCtrl: AlertController, public storage: Storage) {
    this.myFormGroup = this.formBuilder.group({
      txtCurrPass: ['', Validators.compose([Validators.required])],
      txtNewPass: ['', Validators.compose([Validators.required])],
      txtRepeatNewPass: ['', Validators.compose([Validators.required])],
      txtSecQ: ['', Validators.compose([Validators.required])],
      txtSecA: ['', Validators.compose([Validators.required])]
    });


  }

  getContent() {
    this.params = new HttpParams()
      .set('INSTID', this.servicesProvider.instId.toString())
      .set('CONTID', this.servicesProvider.contID)
      .set('lang', this.servicesProvider.language);
    this.servicesProvider.getContent("GetSecQ", this.params)
      .then(data => {
        //alert(JSON.parse(data.toString()).length);
        console.log((data));
        this.dataset = JSON.parse(data);
        //   this.storage.set(this.storageId.toString(), this.dataset);
        this.setData();
        //alert(data);
        //console.log("User Login: " + JSON.parse(this.dataset)[0].F420TITLE);
      });

  }

  setData() {
    this.isDataAvailable = true;
  }
  back() {
    this.navCtrl.setRoot(HomePage);

  }
  submitForm() {
    // console.log(this.myFormGroup.value)
    if (this.myFormGroup.valid) {
      //alert(this.myFormGroup.value['title']);
      console.log('form submitted');
      let postdata = {
        //   category: this.myFormGroup.value['category'],
        //   title: this.myFormGroup.value['title'],
        //   description: this.myFormGroup.value['description'],
        contId: (this.servicesProvider.contID == null ? '' : this.servicesProvider.contID),
        txtCurrPass: this.servicesProvider.encodeData(this.myFormGroup.value['txtCurrPass']),
        txtNewPass: this.servicesProvider.encodeData(this.myFormGroup.value['txtNewPass']),
        //txtRepeatNewPass: this.myFormGroup.value['txtRepeatNewPass'],
        txtSecQ: this.myFormGroup.value['txtSecQ'],
        txtSecA: this.servicesProvider.encodeData(this.myFormGroup.value['txtSecA']),
        lang: this.servicesProvider.language,
        userProfile: this.servicesProvider.userProfile
      };

      this.servicesProvider.changePass(postdata)
        .then(data => {

          if (data.toString().includes("[")) {

            this.Tmsgs = JSON.parse(data);
            if (this.Tmsgs[0]["@RETTYPE"] != 'E') {
              const popup = this.alertCtrl.create({
                title: "Μήνυμα",
                message: this.Tmsgs[0]["@RETMSG"],
                buttons: ['ΕΝΤΑΞΕΙ']
              });
              popup.present();
              this.navCtrl.setRoot(HomePage);
            }
            else {
              const popup = this.alertCtrl.create({
                title: "Μήνυμα",
                message: this.Tmsgs[0]["@RETMSG"],
                buttons: ['ΕΝΤΑΞΕΙ']
              });
              popup.present();
              //    this.navCtrl.push(HomePage);
            }

          }
          else {
            const popup = this.alertCtrl.create({
              title: "Μήνυμα",
              message: data,
              buttons: ['ΕΝΤΑΞΕΙ']
            });
            popup.present();
            this.navCtrl.setRoot(HomePage);
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
        message: errorMessage,
        buttons: ['ΕΝΤΑΞΕΙ']
      });
      popup.present();
    }
  }

  ionViewCanEnter() {
    console.log('ionViewDidLoad ChangePasswordPage');
    if (this.servicesProvider.online) {
      this.dataset = [];
      this.datasetOld = [];
      this.currentpage = 1;
      this.myFormGroup.reset();
      this.getContent();
    }
    
    // this.storageId = 'ChangePasswordPageQuestions';
    // if (this.servicesProvider.online) {
    //   this.doRefresh(this.myrefresher);
    // }
    // else {
    //   this.storage.get(this.storageId)
    //     .then(
    //       (data) => {
    //         this.dataset = data;
    //         this.setData();
    //         this.myrefresher.complete();
    //       }
    //     );
    // }

  }

}
