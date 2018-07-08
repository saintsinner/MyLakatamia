//import { HomePage } from './../home - Copy/home';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Refresher, AlertController, Events } from 'ionic-angular';
//import { HTTP } from '@ionic-native/http';
import { ServicesProvider } from '../../providers/services/services';
//import { SqlLiteProvider } from '../../providers/sql-lite/sql-lite';
import { HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HomePage } from '../home/home';
import { RestorePasswordPage } from '../restore-password/restore-password';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  storageId: any;
  pageId: any;
  params: any;
  dataset: any;
  datasetOld: any;
  isDataAvailable: boolean = false;
  @ViewChild(Refresher) myrefresher: Refresher;
  currentpage = 0;
  private myFormGroup: FormGroup;
  Tresults: any;
  Tmsgs: any;
  results: any;
  successMsgs: any;
  encodedPass: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, public servicesProvider: ServicesProvider,
    public alertCtrl: AlertController, public events: Events, public storage: Storage) {
    this.myFormGroup = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])]
    });

  }
  goToRestorePassword() {
    this.navCtrl.push(RestorePasswordPage);
  }
  getUserLogin() {
    if (this.myFormGroup.valid) {
      this.encodedPass = this.servicesProvider.encodeData(this.myFormGroup.value['password'])
      // .then(data => {
      //   this.encodedPass = data.toString();

      //   console.log('pass -' + this.encodedPass);
      // });
      //  console.log('pass1 -' + this.encodedPass);
      this.params = new HttpParams()
        .set('username', this.myFormGroup.value['username'])
        .set('password', this.encodedPass)
        .set('deviceid', (this.servicesProvider.deviceId == null ? "" : this.servicesProvider.deviceId))
        .set('USER_UI_LANGUAGE', this.servicesProvider.language);
      this.servicesProvider.getContent("GetUserLogin", this.params)
        .then(data => {
          //alert(JSON.parse(data.toString()).length);
          // console.log('here222')
          // var dt= data.toString().split("{///}")[0];
          // JSON.parse(dt);
          if ((data).toString().includes("{///}")) {

            this.Tresults = JSON.parse(data.toString().split("{///}")[0]);
            this.Tmsgs = JSON.parse(data.toString().split("{///}")[1]);

            this.results = this.Tmsgs[0];
            this.successMsgs = this.Tmsgs[0];

            if (this.successMsgs["@RETTYPE"] != "E") {
              //store contid
              //  console.log('here222')
              this.servicesProvider.contID = this.results["@PCONTID"];
              var EncodedContID = this.servicesProvider.encodeData(this.results["@PCONTID"])

              // this.storage.set("CONTID", contID);
              this.storage.set("EncodedToken", EncodedContID);
              this.storage.set("Token", this.servicesProvider.contID);
              // console.log('here222 '+ contID);
              // console.log('here222'+contID)

              //publish event to change the menu
              this.events.publish('user:login');
              
              const popup = this.alertCtrl.create({
                title: "Μήνυμα",
                message: this.successMsgs["@RETMSG"],
                buttons: ['ΕΝΤΑΞΕΙ']
              });
              popup.present();

              this.navCtrl.setRoot(HomePage);
            }

          }
          else {

            var Tmsgs = JSON.parse(data.toString());

            // results = $scope.Tmsgs[0];
            this.successMsgs = Tmsgs[0];

            const popup = this.alertCtrl.create({
              title: 'Πρόβλημα',
              message: this.successMsgs["@RETMSG"],
              buttons: ['ΕΝΤΑΞΕΙ']
            });
            popup.present();

            // $ionicPopup.alert({
            // title: "Μήνυμα",
            // template: successMsgs["@RETMSG"]
            // }).then(function() {
            //     if(successMsgs["@RETTYPE"]=="I")
            //     {
            //         //store contid
            //         localStorage.setItem("token", successMsgs["@PCONTID"]);
            //         //redirect
            //         $state.go('menu.home');
            //     }
            // });

          }


          //   this.dataset = JSON.parse(data.split("{///}")[0]);
          //  this.storage.set(this.storageId.toString(), this.dataset);
          //    this.setData();
          //  refresher.complete();
          //alert(data);
          //console.log("User Login: " + JSON.parse(this.dataset)[0].F420TITLE);
        });
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
    console.log('ionViewDidLoad LoginPage');
  }

}
