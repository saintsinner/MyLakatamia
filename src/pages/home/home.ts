import { Component } from '@angular/core';
import { NavController, AlertController, Events, Platform } from 'ionic-angular';
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

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  params: any;
  constructor(public navCtrl: NavController, public servicesProvider: ServicesProvider, public alertCtrl: AlertController, public storage: Storage, public events: Events,
    public platform: Platform) {

  }

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

}
