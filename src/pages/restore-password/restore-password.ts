import { HomePage } from '../home/home';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
//import { HTTP } from '@ionic-native/http';
import { ServicesProvider } from '../../providers/services/services';
//import { SqlLiteProvider } from '../../providers/sql-lite/sql-lite';
import { HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';


/**
 * Generated class for the RestorePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-restore-password',
  templateUrl: 'restore-password.html',
})
export class RestorePasswordPage {
  storageId: any;
  pageId: any;
  params: any;
  dataset: any;
  datasetOld: any;
  isDataAvailable: boolean = false;
  currentpage = 0;
  private restorePass1: FormGroup;
  private restorePass2: FormGroup;
  activeSection1: boolean = true;
  activeSection2: boolean = false;
  contID;
  SecQID = '';
  SecQTitle = '';
  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, public servicesProvider: ServicesProvider,
    public alertCtrl: AlertController, public storage: Storage) {
    this.restorePass1 = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.email])]
    });
    this.restorePass2 = this.formBuilder.group({
      secA: ['', Validators.compose([Validators.required])]
    });
  }

  // this.dataset = JSON.parse(data.toString());
  // this.storage.set(this.storageId.toString(), this.dataset);
  // // this.setData();
  // refresher.complete();
  //alert(data);
  //console.log("User Login: " + JSON.parse(this.dataset)[0].F420TITLE);
  VerifyEmail = function () {
    if (this.restorePass1.valid) {
      this.params = new HttpParams()
        .set('INSTID', this.servicesProvider.instId.toString())
        .set('USERNAME', this.restorePass1.value['username']);
      this.servicesProvider.getContent("GetCONNS", this.params)
        .then(data => {
          if ((data).includes("[")) {
            this.contID = JSON.parse(data)[0]["F202CONTID"];
            //   alert($scope.contID);
            // GetConSecQ(contID);
            this.activeSection2 = true;
            this.activeSection1 = false;
            this.params = new HttpParams()
              .set('INSTID', this.servicesProvider.instId.toString())
              .set('CONTID', this.contID)
              .set('lang', this.servicesProvider.language);
            this.servicesProvider.getContent("GetConSecQ", this.params)
              .then(data => {

                if (this.contID == "0") {
                  const popup = this.alertCtrl.create({
                    title: 'Πρόβλημα',
                    message: data,
                    buttons: ['ΕΝΤΑΞΕΙ']
                  });
                  popup.present();
                }
                else {
                  //  return  $scope.SecQID ;
                  this.SecQID = JSON.parse(data)[0]["SECQID"];
                  this.SecQTitle = JSON.parse(data)[0]["SECQTITLE"];
                  //      alert( $scope.SecQTitle);
                }
              })
          }
          else {
            let popupTitle = "Μήνυμα";

            const popup = this.alertCtrl.create({
              title: popupTitle,
              message: data,
              buttons: ['ΕΝΤΑΞΕΙ']
            });
            popup.present();
          }
        });

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

  setData() {
    this.isDataAvailable = true;
  }
  sentToCustomer = function () {
    //  alert( $scope.contID +' '  + $scope.data.username);
    // alert($scope.data.secA);
    //   GetSecA ($scope.contID,BlankFactory.EncodeData($scope.data.secA));
    if (this.restorePass2.valid) {
      this.encodedsecA = this.servicesProvider.encodeData(this.restorePass2.value['secA'])

      this.params = new HttpParams()
        .set('INSTID', this.servicesProvider.instId.toString())
        .set('CONTID', this.contID)
        .set('SECA', this.encodedsecA)
        .set('lang', this.servicesProvider.language);
      this.servicesProvider.getContent("GetSecA", this.params)
        .then(data => {

          if ((data).includes("[")) {

            let popupTitle = "Μήνυμα";
            const popup = this.alertCtrl.create({
              title: popupTitle,
              message: "Σας έχει αποσταλεί νέος κωδικός στο email σας.",
              buttons: ['ΕΝΤΑΞΕΙ']
            });
            popup.present();
            this.navCtrl.setRoot(HomePage);
          }
          else {
            let popupTitle = "Μήνυμα";
            const popup = this.alertCtrl.create({
              title: popupTitle,
              message: (data),
              buttons: ['ΕΝΤΑΞΕΙ']
            });
            popup.present();

          }
        })
    }
    else {
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
    console.log('ionViewDidLoad RestorePasswordPage');

    //  this.storageId = 'YpovoliApopsisEisigisisPageCategories';
    if (this.servicesProvider.online) {
      this.dataset = [];
      this.datasetOld = [];
      this.currentpage = 1;
      this.restorePass1.reset();
      this.restorePass2.reset();
    }
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
