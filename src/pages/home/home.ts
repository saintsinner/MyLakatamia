import { Component } from '@angular/core';
import { NavController, AlertController, Events, Platform, ToastController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpParams } from '@angular/common/http';

import { NewsPage } from '../news/news';
import { EventsPage } from '../events/events';
//import { SubmitProblemPage } from '../submit-problem/submit-problem';
//import { SubmitComplaintPage } from '../submit-complaint/submit-complaint';
//import { YpovoliApopsisEisigisisPage } from '../ypovoli-apopsis-eisigisis/ypovoli-apopsis-eisigisis';
import { ProblemsPage } from '../problems/problems';
import { ComplaintsPage } from '../complaints/complaints';
import { ApopseisEisigiseisPage } from '../apopseis-eisigiseis/apopseis-eisigiseis';
import { EksoflisiLogariasmonPage } from '../eksoflisi-logariasmon/eksoflisi-logariasmon';
import { OdigosEksypiretisisPage } from '../odigos-eksypiretisis/odigos-eksypiretisis';
import { LakatamiaPage } from '../lakatamia/lakatamia';
import { ContactPage } from '../contact/contact';
import { NotificationsPage } from '../notifications/notifications';

import { ServicesProvider } from '../../providers/services/services';


import { Network } from '@ionic-native/network';

//import { FirebasePage } from '../firebaseMsg/firebaseMsg';

//import { FcmProvider } from '../../providers/fcm/fcm';

//import { Subject } from 'rxjs/Subject';
//import { tap } from 'rxjs/operators'; // public fcm: FcmProvider, public toastCtrl: ToastController


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  params: any;
  public connection: string;
  tokenValue: string;
  toastNetwork: any;
  constructor(public navCtrl: NavController, public servicesProvider: ServicesProvider, public alertCtrl: AlertController, public storage: Storage, public events: Events,
    public platform: Platform, private network: Network, private toast: ToastController, public navParams: NavParams) {



    this.tokenValue = this.navParams.get('tokenData');

  }

 /* showNetworkToast() {
    this.toastNetwork = this.toast.create({
      message: "Είστε σε " + "Offline" + " mode.",
      //duration: 5000,
      position: 'top'
    });
    this.toastNetwork.present();
  }*/

  /*displayNetworkType(){

    let networkType = this.network.type ;

    if (this.network.type == "none"){
      networkType= "OFFLINE"
    }else{
      networkType= "ONLINE"
    }

    this.toast.create({
      message: "Είστε σε " + networkType + " mode."   ,
     // duration: 3000
     position: 'top'

    }).present();

}*/


  displayNetworkType() {
    //let networkType = this.network.type;
    console.log("Connection Type:" + this.network.type);

    if (this.network.type == "none") {
      //networkType = "OFFLINE";
      this.servicesProvider.online = false;
      //this.servicesProvider.toastNetwork.present();
      /*this.toastNetwork = this.toast.create({
        message: "Είστε σε " + "Offline" + " mode.",
        //duration: 5000,
        position: 'top'*/
      };
      
    // this.toastNetwork.present();
    
  }  
  


  checkToken() {
    console.log("Token value is:", this.tokenValue);

    this.toast.create({
      message: "Token: " + this.tokenValue,
      duration: 5000,
      position: 'top'
    }).present();

  }

  ionViewDidLoad() {
    this.displayNetworkType();
    //this.checkToken();

  }

  /*ionViewDidEnter() {

    this.network.onConnect().subscribe(data => {
      console.log(data.type)
      this.servicesProvider.online = true;
      if (this.toastNetwork != null) {
        this.toastNetwork.dismiss();
      }
      //this.displayNetworkUpdate(data.type);
      setTimeout(() => {
        //this.servicesProvider.online = true;
        //console.log("isonline");
        this.servicesProvider.getNotifications();
        this.servicesProvider.processYpovoliApopsisEisigisis();
        this.servicesProvider.processSubmitComplaints();
        this.servicesProvider.processSubmitProblems();
        // if (this.network.type === 'wifi') {
        //   console.log('we got a wifi connection, woohoo!');
        // }
      }, 500);
    }, error => console.error(error));

    this.network.onDisconnect().subscribe(data => {
      console.log(data.type)
      this.servicesProvider.online = false;
      this.toastNetwork = this.toast.create({
        message: "Είστε σε " + "Offline" + " mode.",
        //duration: 5000,
        position: 'top'
      });
      
      this.toastNetwork.present();
      //this.displayNetworkUpdate(data.type);
    }, error => console.error(error));

  }*/

  /*isonViewDidLoad(){

    // Get a FCM token
    this.fcm.getToken();

    // Listen to incoming messages
    this.fcm.listenToNotifications().pipe(
       tap(msg => {
            // show a toast
          const toast = this.toastCtrl.create({
            message: msg.body,
            duration: 3000
          });
          toast.present();
       })
    )
    .subscribe()
}*/

  ionViewCanEnter() {
    this.platform.ready().then(() => {
      //this.servicesProvider.checkNetwork();
      //alert('');
      this.storage.get("notificationsOn")
        .then(
          (data) => {
            this.servicesProvider.notificationsOn = (data == null ? true : data);
            if (this.servicesProvider.notificationsOn) {
              //this.servicesProvider.checkNetwork()
              //.then(
              //(data) => {
              //this.servicesProvider.online = data;
              //this.servicesProvider.startNetworkEvents(this.servicesProvider.online);
              if (this.servicesProvider.online) {
                this.servicesProvider.getNotifications();
              }
              else {
                setTimeout(() => {
                  if (this.servicesProvider.online) {
                    this.servicesProvider.getNotifications();
                  }
                }, 3000);
              }
              //else {
              // var nt = setInterval(() => {
              //   if (this.servicesProvider.online) {
              //     //clearInterval(nt);
              //     this.getNotifications();
              //   }
              // }, 5000);
              //}
              //}
              //);
            }
          }
        );
    });
  }

  goToNews() {
    this.navCtrl.push(NewsPage);
  }
  goToEvents() {
    this.navCtrl.push(EventsPage);
  }
  goToProblems() {
    this.navCtrl.push(ProblemsPage);
  }
  goToComplaints() {
    this.navCtrl.push(ComplaintsPage);
  }

  goToApopseisEisigiseis() {
    this.navCtrl.push(ApopseisEisigiseisPage);
  }
  goToEksoflisiLogariasmon() {
    this.navCtrl.push(EksoflisiLogariasmonPage);
  }
  goToOdigosEksypiretisis() {
    this.navCtrl.push(OdigosEksypiretisisPage);
  }
  goToLakatamia() {
    this.navCtrl.push(LakatamiaPage);
  }
  goToContact() {
    this.navCtrl.push(ContactPage);
  }

  goToNotifications() {
    this.navCtrl.push(NotificationsPage);
  }

  goToFirebase() {
    // this.navCtrl.push(FirebasePage);
  }

}
