import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NewsPage } from '../news/news';
import { EventsPage } from '../events/events';
import { ProblemsPage } from '../problems/problems';
import { ComplaintsPage } from '../complaints/complaints';
import { ApopseisEisigiseisPage } from '../apopseis-eisigiseis/apopseis-eisigiseis';
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
    this.navCtrl.push(ProblemsPage);
  }
  goToComplaints(){
    this.navCtrl.push(ComplaintsPage);
  }
  goToApopseisEisigiseis(){
    this.navCtrl.push(ApopseisEisigiseisPage);
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
