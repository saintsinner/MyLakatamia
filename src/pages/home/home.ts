import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NewsPage } from '../news/news';
import { EventsPage } from '../events/events';
import { SubmitProblemPage } from '../submit-problem/submit-problem';
import { SubmitComplaintPage } from '../submit-complaint/submit-complaint';
import { YpovoliApopsisEisigisisPage } from '../ypovoli-apopsis-eisigisis/ypovoli-apopsis-eisigisis';
import { EksoflisiLogariasmonPage } from '../eksoflisi-logariasmon/eksoflisi-logariasmon';
import { OdigosEksypiretisisPage } from '../odigos-eksypiretisis/odigos-eksypiretisis';
import { LakatamiaPage } from '../lakatamia/lakatamia';
import { ContactPage } from '../contact/contact';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  
  goToNews(){
    this.navCtrl.push(NewsPage);
  }
  goToEvents(){
    this.navCtrl.push(EventsPage);
  }
  goToProblems(){
    this.navCtrl.push(SubmitProblemPage);
  }
  goToComplaints(){
    this.navCtrl.push(SubmitComplaintPage);
  }
  goToApopseisEisigiseis(){
    this.navCtrl.push(YpovoliApopsisEisigisisPage);
  }
  goToEksoflisiLogariasmon(){
    this.navCtrl.push(EksoflisiLogariasmonPage);
  }
  goToOdigosEksypiretisis(){
    this.navCtrl.push(OdigosEksypiretisisPage);
  }
  goToLakatamia(){
    this.navCtrl.push(LakatamiaPage);
  }
  goToContact(){
    this.navCtrl.push(ContactPage);
  }

}
