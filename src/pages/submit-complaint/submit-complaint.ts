import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Refresher, AlertController, Events, Platform, ActionSheetController, ToastController } from 'ionic-angular';
//import { HTTP } from '@ionic-native/http';
import { ServicesProvider } from '../../providers/services/services';
//import { SqlLiteProvider } from '../../providers/sql-lite/sql-lite';
import { HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Validators, FormBuilder, FormGroup, ValidationErrors } from '@angular/forms';
//import { FileChooser } from '@ionic-native/file-chooser';
//import { IOSFilePicker } from '@ionic-native/file-picker';
//import { FilePath } from '@ionic-native/file-path';
//import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
//import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import { HomePage } from '../home/home';

declare var cordova: any

export interface FileInterface {
  base64Path: string;
  uri: string;
}

export interface SubmissionInterface {
  submission: any;
  photos: FileInterface[];
}

/**
 * Generated class for the SubmitComplaintPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-submit-complaint',
  templateUrl: 'submit-complaint.html',
})
export class SubmitComplaintPage {
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
  //myfiles: FileInterface[] = [];
  //myfile: any;
  //lastImage: string = null;
  public photos: FileInterface[] = [];
  public base64Image: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, public servicesProvider: ServicesProvider, public events: Events,
    public alertCtrl: AlertController, public storage: Storage, public platform: Platform, private camera: Camera,
    private actionSheetCtrl: ActionSheetController, private toastCtrl: ToastController) {
    this.myFormGroup = this.formBuilder.group({
      category: ['', Validators.compose([Validators.required])],
      title: ['', Validators.compose([Validators.maxLength(this.titleLength), Validators.required])],
      description: ['', Validators.compose([Validators.maxLength(this.descriptionLength), Validators.required])]
    });
  }

  doRefresh(refresher) {
    //console.log('Begin async operation', refresher);
    //this.getContent(http)
    if (this.servicesProvider.online) {
      this.photos = [];
      this.dataset = [];
      this.datasetOld = [];
      this.currentpage = 1;
      this.myFormGroup.reset();
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
    //alert(this.mysections);
    this.params = new HttpParams()
      //{INSTID:'1044', ID:'', PCTGID:'1003', TITLE:'', DESC:'', PUBLISH:'', SEQ:'', lang: 'EL', sortby:'F487DESC', sortorder:'ASC', currentpage:'1', 
      //pagesize:'1000', count:'0', runoption:'I', USER_UI_LANGUAGE:'EL', userprofile:'1044WEB', retcode:'0', retmsg:'0', rettype:'I'} })
      .set('INSTID', this.servicesProvider.instId.toString())
      .set('ID', '')
      .set('PCTGID', '1001')
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



  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Επιλέξτε πηγή αρχείου',
      buttons: [
        {
          text: 'Από τη Βιβλιοθήκη',
          handler: () => {
            this.takePhoto(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Με την Κάμερα',
          handler: () => {
            this.takePhoto(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'ΑΚΥΡΟ',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  takePhoto(sourceType) {
    if (this.photos.length < 6) {
      var options = {
        quality: 50, // picture quality
        sourceType: sourceType,
        correctOrientation: true,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        targetWidth: 600,
        targetHeight: 600,
        saveToPhotoAlbum: false
      }

      // Get the data of an image
      this.camera.getPicture(options).then((imageData) => {
        this.base64Image = "data:image/jpeg;base64," + imageData;
        this.photos.push({ base64Path: this.base64Image, uri: imageData });
        //this.photos.reverse(); // show them in descending order
      }, (err) => {
        this.presentToast('Πρόβλημα με την επιλογή αρχείου.');
      });
    }
    else {
      const alert = this.alertCtrl.create({
        title: "Μήνυμσ",
        subTitle: "Μπορείτε να ανεβάσετε μέχρι 6 αρχεία.",
        buttons: ['ΕΝΤΑΞΕΙ']
      });
      alert.present();
    }

  }

  deletePhoto(index) {
    let alert = this.alertCtrl.create({
      title: 'Μήνυμα',
      message: 'Είστε σίγουροι;',
      buttons: [
        {
          text: 'ΟΧΙ',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'ΝΑΙ',
          handler: () => {
            this.photos.splice(index, 1);
          }
        }
      ]
    });
    alert.present();
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  submitForm() {
    //this.servicesProvider.online = false;
    //this.servicesProvider.isApp = true;
    console.log(this.myFormGroup.value)
    if (this.myFormGroup.valid) {
      //alert(this.myFormGroup.value['title']);
      console.log('form submitted');
      let postdata = {
        instId: this.servicesProvider.instId,
        category: this.myFormGroup.value['category'],
        title: this.myFormGroup.value['title'],
        description: this.myFormGroup.value['description'],
        contId: (this.servicesProvider.contID == null ? '' : this.servicesProvider.contID)
      };

      let submissions: SubmissionInterface[];
      //if (this.storage.get("SubmitComplaintPage") != null) {
      this.storage.get("SubmitComplaintPage")
        .then(
          (data) => {
            submissions = data;
            if (submissions == null) {
              submissions = [];
            }
            submissions.push({ submission: postdata, photos: this.photos });
            this.storage.set("SubmitComplaintPage", submissions);

            if (this.servicesProvider.online) {
              this.servicesProvider.addSubmission(postdata)
                .then(data => {
                  //alert(JSON.parse(data.toString()).length);
                  let message = JSON.parse(data.toString());

                  if (message[0]["@RETTYPE"] == 'I') {
                    //upload files
                    //alert(message[0]["@PID"]);
                    if (this.photos.length > 0) {
                      this.servicesProvider.sendData(message[0]["@PID"],this.photos).then((res) => {
                        this.storage.remove("SubmitComplaintPage");

                        this.servicesProvider.myLoading.dismiss();

                        let alertTitle = "Μήνυμα";
                        const popup = this.alertCtrl.create({
                          title: alertTitle,
                          subTitle: message[0]["@RETMSG"],
                          buttons: ['ΕΝΤΑΞΕΙ']
                        });
                        popup.present();
                        this.navCtrl.setRoot(HomePage);
                      });
                    }
                    else {
                      let alertTitle = "Μήνυμα";
                      const popup = this.alertCtrl.create({
                        title: alertTitle,
                        subTitle: message[0]["@RETMSG"],
                        buttons: ['ΕΝΤΑΞΕΙ']
                      });
                      popup.present();
                      this.navCtrl.setRoot(HomePage);
                    }
                  }
                  else {
                    let alertTitle = "Πρόβλημα";
                    const popup = this.alertCtrl.create({
                      title: alertTitle,
                      subTitle: message[0]["@RETMSG"],
                      buttons: ['ΕΝΤΑΞΕΙ']
                    });
                    popup.present();
                  }
                });
              //this.servicesProvider.addSubmission(data);
            }
            else {
              let alertTitle = "Μήνυμα";

              const popup = this.alertCtrl.create({
                title: alertTitle,
                subTitle: "Η καταχώρησή σας θα υποβληθεί μόλις ενωθείτε με το διαδίκτυο",
                buttons: ['ΕΝΤΑΞΕΙ']
              });
              popup.present();
              this.navCtrl.push(HomePage);
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
        subTitle: errorMessage,
        buttons: ['ΕΝΤΑΞΕΙ']
      });
      popup.present();
    }
  }

  ionViewCanEnter() {
    console.log('ionViewDidLoad SubmitComplaintPage');

    this.storageId = 'SubmitComplaintPageCategories';
    this.doRefresh(this.myrefresher);
  }

  // pickFile() {
  //   if (this.platform.is("ios")) {
  //     this.pickFileFromIOSDevice();
  //   }
  //   else if (this.platform.is("android")) {
  //     this.pickFileFromAndroidDevice();
  //   }
  // }

  // pickFileFromIOSDevice() {
  //   this.filePicker.pickFile()
  //     .then(
  //       uri => {
  //         this.myfile = uri;
  //         let filename = "Document " + (this.myfiles.length + 1).toString();
  //         //this.myfiles.push({ name: filename, uri: this.myfile });
  //       }
  //     )
  //     .catch(error => {
  //       alert(error);
  //     });
  // }

  // pickFileFromAndroidDevice() {
  //   this.fileChooser.open()
  //     .then(
  //       uri => {
  //         this.myfile = uri;
  //         let filename = "Document " + (this.myfiles.length + 1).toString();
  //         //this.myfiles.push({ name: filename, uri: this.myfile });
  //       }
  //     )
  //     .catch(error => {
  //       alert(error);
  //     });
  // }

  // removeFile(id) {
  //   let alert = this.alertCtrl.create({
  //     title: 'Μήνυμα',
  //     message: 'Είστε σίγουροι;',
  //     buttons: [
  //       {
  //         text: 'ΟΧΙ',
  //         role: 'cancel',
  //         handler: () => {
  //           console.log('Cancel clicked');
  //         }
  //       },
  //       {
  //         text: 'ΝΑΙ',
  //         handler: () => {
  //           for (var i = this.myfiles.length - 1; i >= 0; i--) {
  //             if (this.myfiles[i].name === id) {
  //               this.myfiles.splice(i, 1);
  //             }
  //           }
  //         }
  //       }
  //     ]
  //   });
  //   alert.present();

  // }

}
