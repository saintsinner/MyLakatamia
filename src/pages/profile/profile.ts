import { ServicesProvider } from '../../providers/services/services';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
//import { HTTP } from '@ionic-native/http';

//import { SqlLiteProvider } from '../../providers/sql-lite/sql-lite';
import { HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  storageId: any;
  pageId: any;
  params: any;
  dataset: any;
  datasetOld: any;
  isDataAvailable: boolean = false;
  currentpage = 0;
  T015CITIES: any;
  Tmsgs: any;
  T201CONTACTS: any;
  T202CONTACTSS: any;
  T203ADDRESSES: any;
  T203ADDRESSESS: any;
  T083POSTALADDRESSES: any;
  T203ADDR1: any;
  T203ADDR2: any;
  Tmessages: any;
  register = false;
  returnVal = '';
  endocde = '';
  contact: any;
  contactss: any;
  address: any;
  messages = '';
  runOption = 'I';
  userName = '';
  pagetitle = '';
  popupTitle: "Μήνυμα";
  private myFormGroup: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, public servicesProvider: ServicesProvider,
    public alertCtrl: AlertController, public storage: Storage) {
    this.myFormGroup = this.formBuilder.group({
      txtContID: [''],
      txtFName: ['', Validators.compose([Validators.required])],
      txtLName: ['', Validators.compose([Validators.required])],
      txtAddr1: ['', Validators.compose([Validators.required])],
      txtAddr2: ['', Validators.compose([Validators.required])],
      txtAppartment: [''],
      txtPostCode: ['', Validators.compose([Validators.required])],
      txtCity: [''],
      txtPhone: ['', Validators.compose([Validators.required])],
      txtemail: ['', Validators.compose([Validators.required])],
      chkTermsCond: [''],
      chkCitizen: [''],
      chkBusinessActivity: [''],
      chkPropertyOwner: [''],
      chkNoneMunicipalityRelation: [''],
      txtCountry: ['']
    });

    console.log('contid - ' + this.servicesProvider.contID);

  }

  getContent() {
    //cities
    this.params = new HttpParams()
      .set('INSTID', this.servicesProvider.instId.toString())
      .set('INPUTLANG', this.servicesProvider.language);
    this.servicesProvider.getContent("GetCities", this.params)
      .then(data2 => {
        this.T015CITIES = JSON.parse(data2.toString());
        this.setData();
        this.myFormGroup.patchValue({ txtCity: this.T015CITIES[0].F015ID });

        this.storage.get("Token").then(
          (data) => {
            this.servicesProvider.contID = data;

            if (this.servicesProvider.contID != null) // Retrieve Data
            {
              // console.log('this.register' + this.register)
              this.register = true;
              this.myFormGroup.patchValue({ btnUpdate: true, });
              this.pagetitle = "Προφίλ";

              this.getProfile();

              //  alert($scope.data.btnUpdate);
            }
            else {
              this.register = false;
              //   console.log('this.register' + this.register)
              this.pagetitle = "Eγγραφή";
              this.myFormGroup.patchValue({ btnUpdate: false, });
            }
          });
      });
  }

  getProfile() {

    this.params = new HttpParams()
      .set('INSTID', this.servicesProvider.instId)
      .set('CONTID', (this.servicesProvider.contID == null ? '' : this.servicesProvider.contID))
      .set('FNAME', '')
      .set('LNAME', '')
      .set('LANG', this.servicesProvider.language)
      .set('EMAIL', '')
      .set('STATUS', 'A')
      .set('USERNAME', '')
      .set('REGSTATUS', 'RA')
      .set('ADDRTYPE', 'H')
      .set('ADDR1H', '')
      .set('ADDR2H', '')
      .set('POSTCDH', '')
      .set('CITYIDH', '')
      .set('PHONE2H', '')
      .set('CITIZEN', '')
      .set('BUSSINESACTIVITY', '')
      .set('PROPERTYOWNER', '')
      .set('NONEMUNICIPALITYREALATION', '')
      .set('APPARTMENT', '')
      .set('RUNOPTION', 'I')
      .set('LANGUAGE', this.servicesProvider.language)
      .set('USERPROFILE', '1044')
      .set('RETCODE', '0')
      .set('RETMSG', '0')
      .set('RETTYPE', 'I');
    this.servicesProvider.getContent("GetPr", this.params)
      .then(data3 => {
        if (this.runOption != 'A')//INQ OR UPDATE
        {
          this.T201CONTACTS = JSON.parse(data3.split("{///}")[0]);
          this.T202CONTACTSS = JSON.parse(data3.split("{///}")[1]);
          this.T203ADDR1 = JSON.parse(data3.split("{///}")[2]);
          this.T203ADDR2 = JSON.parse(data3.split("{///}")[3]);
          this.Tmessages = JSON.parse(data3.split("{///}")[4]);

          this.contact = this.T201CONTACTS[0];
          this.myFormGroup.patchValue({ txtContID: this.contact.F201ID, });
          this.myFormGroup.patchValue({ txtFName: this.contact.F201FNAME, });
          this.myFormGroup.patchValue({ txtLName: this.contact.F201LNAME, });
          this.myFormGroup.patchValue({ txtemail: this.contact.F201EMAIL, });

          this.contactss = this.T202CONTACTSS[0];

          this.myFormGroup.patchValue({ chkCitizen: 'true' == this.contactss.F202CITIZEN.trim().toLowerCase(), });
          this.myFormGroup.patchValue({ chkBusinessActivity: 'true' == this.contactss.F202BUSSINESSACTIVITY.trim().toLowerCase(), });
          this.myFormGroup.patchValue({ chkPropertyOwner: 'true' == this.contactss.F202PROPERTYOWNER.trim().toLowerCase(), });
          this.myFormGroup.patchValue({ chkNoneMunicipalityRelation: 'true' == this.contactss.F202NONEMUNICIPALITYREALATION.trim().toLowerCase(), });


          this.address = this.T203ADDR1[0];

          this.myFormGroup.patchValue({ txtAddr1: this.address.F203ADDR1, });
          this.myFormGroup.patchValue({ txtAddr2: this.address.F203ADDR2, });
          this.myFormGroup.patchValue({ txtAppartment: this.address.F203APPARTMENT, });
          this.myFormGroup.patchValue({ txtCountry: this.address.F016DESC, });
          this.myFormGroup.patchValue({ txtPostCode: this.address.F203POSTCD, });
          this.myFormGroup.patchValue({ txtCity: parseInt(this.address.F203CITYID), });
          this.myFormGroup.patchValue({ txtPhone: this.address.F203PHONE2, });

          // this.servicesProvider.contID = this.Tmessages[0]["@PCONTID"]
          // this.storage.set("Token", this.servicesProvider.contID);
          // //  this.endocde = BlankFactory.EncodeID(this.Tmessages[0]["@PCONTID"]);
          // // alert( this.endocde);
          // this.storage.set("EncodedToken", this.servicesProvider.encodeData(this.servicesProvider.contID));
          // //alert(this.data.txtCity);
          // // this.data.txtAddr1 =address.F083ADDRESS;
          // // alert(this.data.txtAddr1 +' '+ this.data.txtAddr2+' '+ this.data.txtAppartment+' '+  this.data.txtCountry+' '+ this.data.txtPostCode+' '+
          // // this.data.txtCity+' '+ this.data.txtPhone);
          // // messages = this.Tmessages[0];

          // const popup = this.alertCtrl.create({
          //   title: 'Μήνυμα',
          //   message: this.Tmessages[0]["@RETMSG"],
          //   buttons: ['ΕΝΤΑΞΕΙ']
          // });
          // popup.present();
          // // $state.go('menu.home');

        }
        //   // this.profiless  = "ok";
        else //ADD CONTACT
        {
          // this.getResetContactPWD(refresher, this.myFormGroup['txtemail']);
          // this.Tmessages = JSON.parse(data.split("{///}")[0]);
          // localStorage.setItem("Token", this.Tmessages[0]["@PCONTID"]);
          // this.endocde = this.servicesProvider.encodeData(this.Tmessages[0]["@PCONTID"]);
          // // alert( this.Tmessages[0]["@PCONTID"]);
          // localStorage.setItem("EncodedToken", this.endocde);

          // const alert = this.alertCtrl.create({
          //   title: "Μήνυμα",
          //   message: this.Tmessages[0]["@RETMSG"],
          //   buttons: ['ΕΝΤΑΞΕΙ']
          // });

          // alert.present();

          //  $state.go('menu.login');
        }


      });
  }

  // getResetContactPWD(refresher, txtemail) {
  //   this.params = new HttpParams()
  //     .set('INSTID', this.servicesProvider.instId)
  //     .set('USERNAME', this.myFormGroup.value['txtemail'])
  //     .set('HASHPASSWORD', '')
  //     .set('SALT', '')
  //     .set('PASSWORDCHANGED', '0')
  //     .set('SECA', '')
  //     .set('runoption', 'U')
  //     .set('USER_UI_LANGUAGE', this.servicesProvider.language)
  //     .set('userprofile', '1044WEB')
  //     .set('retcode', '0')
  //     .set('retmsg', '')
  //     .set('rettype', 'U');
  //   this.servicesProvider.getContent("GetCities", this.params)
  //     .then(data => {
  //       //alert(JSON.parse(data.toString()).length);
  //       this.T015CITIES = JSON.parse(data.toString());
  //       //    this.storage.set(this.storageId.toString(), this.dataset);
  //       this.setData();
  //       this.myFormGroup.patchValue({ txtCity: this.T015CITIES[0].F015ID, });
  //       refresher.complete();
  //       //alert(data);

  //     });

  // }
  showTerms(pageId) {
    this.params = new HttpParams()
      .set('INSTID', this.servicesProvider.instId.toString())
      .set('ID', pageId)
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
        // this.storage.set(this.storageId.toString(), this.dataset);
        //this.dataset = data;
        //this.filtersLoaded = Promise.resolve(true);
        this.setData();

        console.log(' this.dataset.F420HTMLL1' + this.dataset.F420HTMLL1)
        // refresher.complete();
        const popup = this.alertCtrl.create({
          title: this.dataset[0].F420TITLE,
          message: this.dataset[0].F420HTMLL1,
          cssClass: 'custom',
          buttons: ['ΕΝΤΑΞΕΙ']
        });
        popup.present();
        //alert(data);
        //console.log("User Login: " + JSON.parse(this.dataset)[0].F420TITLE);
      });

  }

  clickRelation(condition) {
    if (condition == 1) {
      this.myFormGroup.patchValue({ chkNoneMunicipalityRelation: false, });
      // this.myFormGroup['chkNoneMunicipalityRelation'] = false;
    }
    else {
      this.myFormGroup.patchValue({ chkCitizen: false, });
      this.myFormGroup.patchValue({ chkBusinessActivity: false, });
      this.myFormGroup.patchValue({ chkPropertyOwner: false, });
    }
  }

  saveProfile() {
    if (this.myFormGroup.valid) {

      if (this.checkRequiredFields()) {
        //alert(this.myFormGroup.value['title']);
        // console.log('form submitted');
        // console.log('this.checkRequiredFields()' + this.checkRequiredFields());
        let postdata = {
          INSTID: this.servicesProvider.instId,
          CONTID: this.myFormGroup.value['txtContID'],
          FNAME: this.myFormGroup.value['txtFName'],
          LNAME: this.myFormGroup.value['txtLName'],
          LANG: this.servicesProvider.language,
          EMAIL: this.myFormGroup.value['txtemail'],
          STATUS: 'A',
          USERNAME: this.myFormGroup.value['txtemail'],
          REGSTATUS: 'RA',
          ADDRTYPE: 'H',
          ADDR1H: this.myFormGroup.value['txtAddr1'],
          ADDR2H: this.myFormGroup.value['txtAddr2'],
          POSTCDH: this.myFormGroup.value['txtPostCode'],
          CITYIDH: this.myFormGroup.value['txtCity'],
          PHONE2H: this.myFormGroup.value['txtPhone'],
          APPARTMENT: this.myFormGroup.value['txtAppartment'],
          //   txtCountry: this.myFormGroup.value['txtCountry'],
          CITIZEN: this.myFormGroup.value['chkCitizen'],
          BUSSINESACTIVITY: this.myFormGroup.value['chkBusinessActivity'],
          PROPERTYOWNER: this.myFormGroup.value['chkPropertyOwner'],
          NONEMUNICIPALITYREALATION: this.myFormGroup.value['chkNoneMunicipalityRelation'],
          RUNOPTION: '',
          LANGUAGE: this.servicesProvider.language,
          USERPROFILE: this.servicesProvider.userProfile,
          RETCODE: 0,
          RETMSG: "0",
          RETTYPE: "I",
        };

        //   this.getProfile(this.runoption, postdata);
        if (this.servicesProvider.contID == '' || this.servicesProvider.contID == null) // NEW CONTACT
        {
          postdata.RUNOPTION = 'A';
          console.log('NEW CONTACT');
          this.myFormGroup.patchValue({ btnUpdate: false, });
          this.runOption = 'A';
          if (this.servicesProvider.online) {
            this.servicesProvider.ContactMNT(postdata)
              .then(data => {
                //this.storage.remove("YpovoliApopsisEisigisisPage");
                // alert(JSON.parse(data.toString()).length);
                let message = JSON.parse(data.toString());
                // console.log('add contact');
                // console.log(message[0]["@RETMSG"]);
                let popupTitle = "Μήνυμα";
                if (message[0]["@RETTYPE"] == 'E') {
                  popupTitle = "Πρόβλημα"
                  const popup = this.alertCtrl.create({
                    title: popupTitle,
                    message: message[0]["@RETMSG"],
                    buttons: ['ΕΝΤΑΞΕΙ']
                  });
                  popup.present();
                }

                else {
                  if (message[0]["@RETTYPE"] == 'I') {
                    this.params = new HttpParams()
                      .set('INSTID', this.servicesProvider.instId)
                      .set('USERNAME', this.myFormGroup.value['txtemail'])
                      .set('HASHPASSWORD', '')
                      .set('SALT', '')
                      .set('PASSWORDCHANGED', '0')
                      .set('SECA', '')
                      .set('runoption', 'U')
                      .set('USER_UI_LANGUAGE', this.servicesProvider.language)
                      .set('userprofile', this.servicesProvider.userProfile)
                      .set('retcode', '0')
                      .set('retmsg', '')
                      .set('rettype', 'U');
                    this.servicesProvider.getContent("GetResetContactPWD", this.params)
                      .then(data2 => {
                        //alert(JSON.parse(data.toString()).length);
                        this.T015CITIES = JSON.parse(data2.toString());
                        //    this.storage.set(this.storageId.toString(), this.dataset);
                        this.setData();
                        this.myFormGroup.patchValue({ txtCity: this.T015CITIES[0].F015ID, });
                        //  refresher.complete();
                        //alert(data);

                      });
                    const popup = this.alertCtrl.create({
                      title: popupTitle,
                      message: message[0]["@RETMSG"],
                      buttons: ['ΕΝΤΑΞΕΙ']
                    });
                    popup.present();
                    this.navCtrl.setRoot(LoginPage);
                  }
                }
              });
            //this.servicesProvider.addSubmission(data);
          }
        }
        else //UPDATE CONTACT
        {
          postdata.RUNOPTION = 'U';
          console.log('UPDATE CONTACT');
          this.myFormGroup.patchValue({ btnUpdate: true, });
          this.runOption = 'U';
          console.log('service id - ' + this.servicesProvider.instId);
          this.servicesProvider.ContactMNT(postdata)
            .then(data => {
              // this.storage.remove("YpovoliApopsisEisigisisPage");
              // alert(JSON.parse(data.toString()).length);
              let message = JSON.parse(data.toString());
              //console.log(result.toString());
              //console.log(message[0]["@RETMSG"]);
              let popupTitle = "Μήνυμα";
              if (message[0]["@RETTYPE"] == 'E') {
                popupTitle = "Πρόβλημα"
              }

              else {
                if (message[0]["@RETTYPE"] == 'I') {
                  const popup = this.alertCtrl.create({
                    title: popupTitle,
                    message: message[0]["@RETMSG"],
                    buttons: ['ΕΝΤΑΞΕΙ']
                  });
                  popup.present();
                  this.navCtrl.setRoot(HomePage);
                }
              }
              //console.log('add contact');

            });

        }
      }

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

  checkRequiredFields(): boolean {
    if ((this.myFormGroup.get('chkCitizen').value != true && this.myFormGroup.get('chkBusinessActivity').value != true
      && this.myFormGroup.get('chkPropertyOwner').value != true) &&
      (this.myFormGroup.get('chkNoneMunicipalityRelation').value != true)) {
      const popup = this.alertCtrl.create({
        title: "Μήνυμα",
        message: "Παρακαλώ συμπληρώστε το πεδίο Σχέση με το Δήμο!",
        buttons: ['ΕΝΤΑΞΕΙ']
      });
      popup.present();
      return false;
    }
    else if (this.register == false) {
      if (this.myFormGroup.get('chkTermsCond').value != true) {
        const popup = this.alertCtrl.create({
          title: "Μήνυμα",
          message: "Πρέπει να αποδεχτείτε τους Όρους και Προϋποθέσεις",
          buttons: ['ΕΝΤΑΞΕΙ']
        });
        popup.present();

        return false;
      }
      else {
        // alert($scope.data.txtCity);
        return true;
      }
    }
    else
    {
      return true;
    }
  }
  setData() {
    this.isDataAvailable = true;
    console.log(this.isDataAvailable)
  }
  goBack() {
    this.navCtrl.setRoot(HomePage);
  }
  ionViewCanEnter() {
    console.log('ionViewDidLoad ProfilePage');

    this.storageId = 'ProfilePage';
    if (this.servicesProvider.online) {
      this.dataset = [];
      this.datasetOld = [];
      this.currentpage = 1;
      this.myFormGroup.reset();
      this.getContent();//CITIES AND POSTALADDRESS
    }
  }
}
