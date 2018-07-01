import { Component } from '@angular/core';
import { NavController, AlertController, Events, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpParams } from '@angular/common/http';

import { NewsPage } from '../news/news';
import { EventsPage } from '../events/events';
import { SubmitProblemPage } from '../submit-problem/submit-problem';
import { SubmitComplaintPage } from '../submit-complaint/submit-complaint';
import { YpovoliApopsisEisigisisPage } from '../ypovoli-apopsis-eisigisis/ypovoli-apopsis-eisigisis';
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
  notifications = 0;
  params: any;
  constructor(public navCtrl: NavController, public servicesProvider: ServicesProvider, public alertCtrl: AlertController, public storage: Storage, public events: Events,
    public platform: Platform) {

  }

  ionViewCanEnter() {
    this.platform.ready().then(() => {
      //this.servicesProvider.checkNetwork();
      //alert('');
      this.processYpovoliApopsisEisigisis();

      this.storage.get("notificationsOn")
        .then(
          (data) => {
            this.servicesProvider.notificationsOn = (data == null ? true : data);
            if (this.servicesProvider.notificationsOn)
              this.getNotifications();
          }
        );
    });
  }

  public getNotifications() {
    this.params = new HttpParams()
      .set('INSTID', this.servicesProvider.instId.toString())
      .set('ID', '')
      .set('contId', (this.servicesProvider.contID == null ? "" : this.servicesProvider.contID))
      .set('deviceId', (this.servicesProvider.deviceId == null ? "" : this.servicesProvider.deviceId))
      .set('notificationId', '')
      .set('category', '1001')
      .set('lang', this.servicesProvider.language)
      .set('sortby', 'F491CRTDATE')
      .set('sortorder', 'DESC')
      .set('currentpage', '1')
      .set('pagesize', '10')
      .set('count', '0')
      .set('runoption', 'I')
      .set('USER_UI_LANGUAGE', this.servicesProvider.language)
      .set('userprofile', '')
      .set('retcode', '0')
      .set('retmsg', '0')
      .set('rettype', 'I');
    this.servicesProvider.getContent("GetUserNotifications", this.params)
      .then(data => {
        //alert('');
        let dataset = JSON.parse(data.toString());
        let datasetUnread = [];
        for (let d of dataset) {
          if (d.F491READ.toString().toLowerCase().trim() == 'true') {
            d.F491READ = true;
          }
          else {
            d.F491READ = false;
            datasetUnread.push(d);
          }
        }
        this.storage.set("NotificationsPage", dataset);
        //this.dataset = data;
        //this.filtersLoaded = Promise.resolve(true);
        this.notifications = datasetUnread.length;
        //alert(data);
        //console.log("User Login: " + JSON.parse(this.dataset)[0].F420TITLE);
      });
  }
  processYpovoliApopsisEisigisis() {
    if (this.servicesProvider.online) {
      //alert(this.storage.get("YpovoliApopsisEisigisisPage"))
      this.storage.get("YpovoliApopsisEisigisisPage")
        .then(
          (data) => {
            //alert(data[0].title);
            let submissions = [];
            submissions = data;
            if (submissions != null) {
              let ok = true;
              for (let submission of submissions) {
                //alert(submission.title);
                try {
                  this.servicesProvider.addApopsisEisigisis(submission)
                    .then(data => {
                      //alert(JSON.parse(data.toString()).length);
                      //let message = JSON.parse(data.toString());
                      // //console.log(result.toString());
                      // //console.log(message[0]["@RETMSG"]);
                      // let alertTitle = "Μήνυμα";
                      // if (message[0]["@RETTYPE"] == 'E') {
                      //   alertTitle = "Πρόβλημα"
                      // }
                      // const alert = this.alertCtrl.create({
                      //   title: alertTitle,
                      //   subTitle: message[0]["@RETMSG"],
                      //   buttons: ['ΕΝΤΑΞΕΙ']
                      // });
                      // alert.present();
                      // if (message[0]["@RETTYPE"] == 'I') {
                      //   this.storage.remove("YpovoliApopsisEisigisisPage");
                      // }
                    });
                } catch (error) {
                  //alert(error.message);
                  ok = false;
                }

              }
              if (ok) {
                this.storage.remove("YpovoliApopsisEisigisisPage");
              }
            }
          }
        );
    }
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
