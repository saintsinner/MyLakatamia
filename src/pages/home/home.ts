import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { NewsPage } from '../news/news';
import { EventsPage } from '../events/events';
import { SubmitProblemPage } from '../submit-problem/submit-problem';
import { SubmitComplaintPage } from '../submit-complaint/submit-complaint';
import { YpovoliApopsisEisigisisPage } from '../ypovoli-apopsis-eisigisis/ypovoli-apopsis-eisigisis';
import { EksoflisiLogariasmonPage } from '../eksoflisi-logariasmon/eksoflisi-logariasmon';
import { OdigosEksypiretisisPage } from '../odigos-eksypiretisis/odigos-eksypiretisis';
import { LakatamiaPage } from '../lakatamia/lakatamia';
import { ContactPage } from '../contact/contact';

import { ServicesProvider } from '../../providers/services/services';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public servicesProvider: ServicesProvider, public alertCtrl: AlertController, public storage: Storage) {

  }

  ionViewCanEnter() {
    this.servicesProvider.checkNetwork();
    //alert('');
    if (this.servicesProvider.online || !this.servicesProvider.isApp) {
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
                  this.servicesProvider.addSubmission(submission)
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
    //TEMP - REMOVE IN PRODUCTION
    localStorage.removeItem("Token");
    localStorage.removeItem("EncodedToken");

    if (this.servicesProvider.checkTokens()) {
      this.navCtrl.push(SubmitProblemPage);
    }
    else {
      const popup = this.alertCtrl.create({
        title: "Μήνυμα",
        subTitle: "Πρέπει να κάνετε είσοδο στην εφαρμογή για να μπορέσετε να υποβάλετε Πρόβλημα.",
        buttons: ['ΕΝΤΑΞΕΙ']
      });
      popup.present();
    }
  }
  goToComplaints() {
    this.navCtrl.push(SubmitComplaintPage);
  }
  goToApopseisEisigiseis() {
    //TEMP - REMOVE IN PRODUCTION
    localStorage.setItem("Token", "10000001");
    localStorage.setItem("EncodedToken", btoa("10000001"));

    if (this.servicesProvider.checkTokens()) {
      this.navCtrl.push(YpovoliApopsisEisigisisPage);
    }
    else {
      const popup = this.alertCtrl.create({
        title: "Μήνυμα",
        subTitle: "Πρέπει να κάνετε είσοδο στην εφαρμογή για να μπορέσετε να υποβάλετε Εισήγηση.",
        buttons: ['ΕΝΤΑΞΕΙ']
      });
      popup.present();
    }
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

}
