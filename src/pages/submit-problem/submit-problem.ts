import { Component, ViewChild, NgModule } from '@angular/core';
import { NavController, NavParams, AlertController, Events, Platform, ActionSheetController, ToastController, normalizeURL } from 'ionic-angular';
//import { HTTP } from '@ionic-native/http';
import { ServicesProvider } from '../../providers/services/services';
//import { SqlLiteProvider } from '../../providers/sql-lite/sql-lite';
import { HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps, GoogleMap, GoogleMapOptions, Marker, LatLng, GoogleMapsEvent, MarkerOptions } from '@ionic-native/google-maps';
//import { FileChooser } from '@ionic-native/file-chooser';
//import { IOSFilePicker } from '@ionic-native/file-picker';
//import { FilePath } from '@ionic-native/file-path';
//import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
//import { ImagePicker } from '@ionic-native/image-picker';
//import { Base64 } from '@ionic-native/base64';
import { HomePage } from '../home/home';

//import { SelectSearchable } from 'ionic-select-searchable';
import { SelectSearchableComponent } from 'ionic-select-searchable';

//declare var cordova: any

export interface FileInterface {
  base64Path: string;
  uri: string;
}

export interface SubmissionInterface {
  submission: any;
  photos: FileInterface[];
}


/**
 * Generated class for the SubmitProblemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-submit-problem',
  templateUrl: 'submit-problem.html',
})
export class SubmitProblemPage {
  //@ViewChild('myselect') selectComponent: SelectSearchableComponent;
  //address1 = null;
  //position: string = "";
  streets=[];
  storageId: any;
  storageIdAddresses: any;
  pageId: any;
  params: any;
  dataset: any;
  addresses: any;
  isDataAvailable: boolean = false;
  currentpage = 0;
  private myFormGroup: FormGroup;
  titleLength = 100;
  descriptionLength = 500;
  latitudeLength = 30;
  longituteLength = 30;
  //latlngLength= 30;
  firstNameLength = 50;
  lastNameLength = 50;
  emailLength = 100;
  phoneLength = 20;
  houseNumberLength = 5;
  //myfiles: FileInterface[] = [];
  //myfile: any;
  //lastImage: string = null;
  public photos: FileInterface[] = [];
  public base64Image: string;
  showVisible = "True";
  map: GoogleMap;
  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation,
    private formBuilder: FormBuilder, public servicesProvider: ServicesProvider, public events: Events,
    public alertCtrl: AlertController, public storage: Storage, public platform: Platform, private camera: Camera,
    private actionSheetCtrl: ActionSheetController, private toastCtrl: ToastController) {
    this.myFormGroup = this.formBuilder.group({
      category: ['', Validators.compose([Validators.required])],
      title: ['', Validators.compose([Validators.maxLength(this.titleLength), Validators.required])],
      description: ['', Validators.compose([Validators.maxLength(this.descriptionLength), Validators.required])],
      latitude: [{ value: '' }],
      //latlng: [{ value: '' }],
      longitude: [{ value: '' }],
      firstName: ['', Validators.compose([Validators.maxLength(this.firstNameLength)])],
      lastName: ['', Validators.compose([Validators.maxLength(this.lastNameLength)])],
      email: ['', Validators.compose([Validators.maxLength(this.emailLength)])],
      phone: ['', Validators.compose([Validators.maxLength(this.phoneLength)])],
      address: ['', Validators.compose([Validators.required])],
      houseNumber: ['', Validators.compose([Validators.maxLength(this.houseNumberLength), Validators.required])]
    });

    platform.ready().then(() => {
     this.loadMap();
     //this.loadMap2();
    });
  }

  addressChange(event: {
    component: SelectSearchableComponent,
    value: any 
}) {
    //console.log('event: ', event);
    //console.log(this.addresses);
   // let address1 = event.value;
}

  getContent() {
    //alert(this.mysections);
    this.params = new HttpParams()
      .set('INSTID', this.servicesProvider.instId.toString())
      .set('ID', '')
      .set('PCTGID', '1002')
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
      .set('userprofile', this.servicesProvider.userProfile)
      .set('retcode', '0')
      .set('retmsg', '0')
      .set('rettype', 'I');
    this.servicesProvider.getContent("GetSubmissionCategories", this.params)
      .then(data => {
        //alert(JSON.parse(data.toString()).length);
        this.dataset = JSON.parse(data.toString());
        this.storage.set(this.storageId.toString(), this.dataset);
        this.params = new HttpParams()
          .set('INSTID', this.servicesProvider.instId.toString())
          .set('ID', '')
          .set('Address', '')
          .set('Enable', 'True')
          .set('INPUTLANG', this.servicesProvider.language)
          .set('sortby', 'F083ADDRESS')
          .set('sortorder', 'ASC')
          .set('currentpage', this.currentpage.toString())
          .set('pagesize', '2000')
          .set('count', '0')
          .set('runoption', 'I')
          .set('USER_UI_LANGUAGE', this.servicesProvider.language)
          .set('userprofile', this.servicesProvider.userProfile)
          .set('retcode', '0')
          .set('retmsg', '0')
          .set('rettype', 'I');
        this.servicesProvider.getContent("GetPostalAddresses", this.params)
          .then(data2 => {
            //alert(JSON.parse(data.toString()).length);
            this.addresses = JSON.parse(data2.toString());
            this.storage.set(this.storageIdAddresses.toString(), this.addresses);
            this.setData();
            //alert(data);
            //console.log("User Login: " + JSON.parse(this.dataset)[0].F420TITLE);
          });
        //alert(data);
        //console.log("User Login: " + JSON.parse(this.dataset)[0].F420TITLE);
      });
  }

  setData() {
    this.isDataAvailable = true;
  }

      /*let marker: Marker = this.map.addMarkerSync({
        title: 'Βρίσκεσε εδώ',
        icon: 'blue',
        draggable: true ,
        animation: 'DROP',
        position: {
          lat: res.coords.latitude,
          lng: res.coords.longitude
        }
      }); */
      /*let markerOptions: MarkerOptions = {
        position: {
          lat: res.coords.latitude,
          lng: res.coords.longitude
        },
        title: 'My position',
        snippet: "Soprendente",
        draggable: true
      };
      this.map.addMarker(markerOptions).then((maker: Marker) => {
        maker.showInfoWindow();
        maker.addEventListener(GoogleMapsEvent.MARKER_DRAG_END).subscribe((some: any) => {
          maker.getPosition()
        })*/

     

  loadMap() {
    let options = { timeout: 10000, enableHighAccuracy: true, maximumAge: 3600 };
    this.geolocation.getCurrentPosition(options).then(res => {

      console.log(res.coords.latitude);
      console.log(res.coords.longitude);

      let mapOptions: GoogleMapOptions = {
        camera: {
          target: {
            lat: res.coords.latitude,
            lng: res.coords.longitude
          },
          zoom: 17,
          tilt: 20
        }
      };

      this.map = GoogleMaps.create('map', mapOptions);

      let markerOptions: MarkerOptions = {
        position: {
          lat: res.coords.latitude,
          lng: res.coords.longitude},
        title: 'Βρίσκεσε εδώ',
        icon: 'blue',
        animation:'DROP',
        draggable: true
      };


      this.map.addMarker(markerOptions).then((marker: Marker) => {
        marker.showInfoWindow();
        marker.addEventListener(GoogleMapsEvent.MARKER_DRAG_END).subscribe((some: any) => {


        this.myFormGroup.patchValue({ latitude: marker.getPosition().lat });
        this.myFormGroup.patchValue({ longitude: marker.getPosition().lng });
             
            });
        });
        
      this.myFormGroup.patchValue({ latitude: res.coords.latitude.toString() });
      this.myFormGroup.patchValue({ longitude: res.coords.longitude.toString() });
    }).catch((error) => {
      console.log('Error getting location', error.message);
    });
  }

  /*loadMap2() {
    let options = { timeout: 10000, enableHighAccuracy: true, maximumAge: 3600 };
    this.geolocation.getCurrentPosition(options).then(res => {

      console.log(res.coords.latitude);
      console.log(res.coords.longitude);

      let mapOptions: GoogleMapOptions = {
        camera: {
          target: {
            lat: res.coords.latitude,
            lng: res.coords.longitude
          },
          zoom: 17,
          tilt: 20
        }
      };

      this.map = GoogleMaps.create('mapResize', mapOptions);

      let markerOptions: MarkerOptions = {
        position: {
          lat: res.coords.latitude,
          lng: res.coords.longitude},
        title: 'Βρίσκεσε εδώ',
        icon: 'blue',
        animation:'DROP',
        draggable: true
      };


      this.map.addMarker(markerOptions).then((marker: Marker) => {
        marker.showInfoWindow();
        marker.addEventListener(GoogleMapsEvent.MARKER_DRAG_END).subscribe((some: any) => {


        this.myFormGroup.patchValue({ latitude: marker.getPosition().lat });
        this.myFormGroup.patchValue({ longitude: marker.getPosition().lng });
             
            });
        });
        
      this.myFormGroup.patchValue({ latitude: res.coords.latitude.toString() });
      this.myFormGroup.patchValue({ longitude: res.coords.longitude.toString() });
    }).catch((error) => {
      console.log('Error getting location', error.message);
    });
    //this.showVisible = "false";
  }*/

 /* resizeMap(){
     this.loadMap2();
  }*/


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
        quality: 70, // picture quality
        sourceType: sourceType,
        correctOrientation: true,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        //targetWidth: 600,
        //targetHeight: 600,
        saveToPhotoAlbum: false
      }

      // Get the data of an image
      this.camera.getPicture(options).then((imageData) => {
        let imageURI = imageData;
        if (this.platform.is("ios")) {
          imageURI = normalizeURL(imageData);
        }
        this.servicesProvider.convertToDataURLviaCanvas(imageURI, "image/jpeg").then(imageBase64 => {
          this.base64Image = imageBase64.toString();
          this.photos.push({ base64Path: this.base64Image, uri: imageURI });
        });
        //this.base64Image = "data:image/jpeg;base64," + imageData;

        //this.photos.reverse(); // show them in descending order
      }, (err) => {
        //this.presentToast('Πρόβλημα με την επιλογή αρχείου.');
      });
    }
    else {
      const alert = this.alertCtrl.create({
        title: "Μήνυμα",
        message: "Μπορείτε να ανεβάσετε μέχρι 6 αρχεία.",
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
    console.log(this.myFormGroup.value)
    if (this.myFormGroup.valid) {
      //alert(this.myFormGroup.value['title']);
      console.log('form submitted');
      let postdata = {
        instId: this.servicesProvider.instId,
        category: this.myFormGroup.value['category'],
        title: this.myFormGroup.value['title'],
        description: this.myFormGroup.value['description'],
        latitude: this.myFormGroup.value['latitude'],
        longitude: this.myFormGroup.value['longitude'],
        //latlng: this.myFormGroup.value['latlng'],
        firstName: this.myFormGroup.value['firstName'],
        lastName: this.myFormGroup.value['lastName'],
        email: this.myFormGroup.value['email'],
        phone: this.myFormGroup.value['phone'],
        address: this.myFormGroup.value['address'],
        houseNumber: this.myFormGroup.value['houseNumber'],
        contId: (this.servicesProvider.contID == null ? '' : this.servicesProvider.contID),
        lang: this.servicesProvider.language,
        userProfile: this.servicesProvider.userProfile
      };

      let submissions: SubmissionInterface[];
      //if (this.storage.get("SubmitProblemPage") != null) {
      this.storage.get("SubmitProblemPage")
        .then(
          (data) => {
            submissions = data;
            if (submissions == null) {
              submissions = [];
            }
            submissions.push({ submission: postdata, photos: this.photos });
            this.storage.set("SubmitProblemPage", submissions);

            if (this.servicesProvider.online) {
             /* let alertTitle = "Μήνυμα";
                        const popup = this.alertCtrl.create({
                          title: alertTitle,
                          message: "You are here!",
                          buttons: ['ΕΝΤΑΞΕΙ']
                        });
                        popup.present();*/
              this.servicesProvider.myLoading = this.servicesProvider.loadingCtrl.create({
                content: 'Παρακαλώ περιμένετε...'
              });
              //if (this.servicesProvider.errorAppeared){
              //  this.servicesProvider.myLoading.dismiss();
            //  }else{
              this.servicesProvider.myLoading.present();
              

              this.servicesProvider.addSubmission(postdata, false, true)
                .then(data => {
                  //alert(JSON.parse(data.toString()).length);
                  this.servicesProvider.myLoading.present();
                  let message = JSON.parse(data.toString());

                  if (message[0]["@RETTYPE"] == 'I') {
                    //upload files
                    //alert(message[0]["@PID"]);
                    if (this.photos.length > 0) {
                      this.servicesProvider.sendData(message[0]["@PID"], this.photos, false).then((res) => {
                        this.storage.remove("SubmitProblemPage");

                        this.servicesProvider.myLoading.dismiss();

                        let alertTitle = "Μήνυμα";
                        const popup = this.alertCtrl.create({
                          title: alertTitle,
                          message: message[0]["@RETMSG"],
                          buttons: ['ΕΝΤΑΞΕΙ']
                        });
                        popup.present();
                        this.navCtrl.setRoot(HomePage);
                      });
                    }
                    else {
                     this.servicesProvider.myLoading.dismiss();

                      let alertTitle = "Μήνυμα";
                      const popup = this.alertCtrl.create({
                        title: alertTitle,
                        message: message[0]["@RETMSG"],
                        buttons: ['ΕΝΤΑΞΕΙ']
                      });
                      popup.present();
                      this.navCtrl.setRoot(HomePage);
                    }
                  }
                  else {
                   this.servicesProvider.myLoading.dismiss();

                    let alertTitle = "Πρόβλημα2";
                    const popup = this.alertCtrl.create({
                      title: alertTitle,
                     // message: message[0]["@RETMSG"],
                     message: "error in sub problem page",
                      buttons: ['ΕΝΤΑΞΕΙ']
                    });
                    //this.servicesProvider.myLoading.dismiss();
                    popup.present();
                  }
                }).catch((error) => {
                  console.log("Error at the code:",error);
                  //this.servicesProvider.myLoading.dismiss();
                });
              //this.servicesProvider.addSubmission(data);
            }
            else {
              let alertTitle = "Μήνυμα";

              const popup = this.alertCtrl.create({
                title: alertTitle,
                message: "Η καταχώρησή σας θα υποβληθεί μόλις ενωθείτε με το διαδίκτυο",
                buttons: ['ΕΝΤΑΞΕΙ']
              });
              popup.present();
              this.navCtrl.setRoot(HomePage);
            }
          });
          /*.catch((error) => {
            console.log(error);
            this.servicesProvider.myLoading.dismiss();
          });*/

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
    console.log('ionViewDidLoad SubmitProblemPage');

    this.storageId = 'SubmitProblemPageCategories';
    this.storageIdAddresses = 'SubmitProblemPageAddresses';

    if (this.servicesProvider.online) {
      this.photos = [];
      this.dataset = [];
      this.addresses = [];
      this.currentpage = 1;
      this.myFormGroup.reset();
      this.getContent();
    }
    else {
      this.storage.get(this.storageId)
        .then(
          (data) => {
            this.dataset = data;
            this.setData();
          }
        );
      this.storage.get(this.storageIdAddresses)
        .then(
          (data) => {
            this.addresses = data;
            this.setData();
          }
        );
    }

  }


}
