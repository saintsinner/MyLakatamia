import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, Platform } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { Network } from '@ionic-native/network';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SQLite } from '@ionic-native/sqlite';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps } from '@ionic-native/google-maps';
import { IonicStorageModule } from '@ionic/storage';
import { Device } from '@ionic-native/device';

//import { SocialSharing } from '@ionic-native/social-sharing';
import { SafePipe } from '../pipes/safe/safe';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AdeiesOikodomeisDiaxorismonPage } from '../pages/adeies-oikodomeis-diaxorismon/adeies-oikodomeis-diaxorismon';
import { ApopseisEisigiseisPage } from '../pages/apopseis-eisigiseis/apopseis-eisigiseis';
import { ChangePasswordPage } from '../pages/change-password/change-password';
import { ComplaintPage } from '../pages/complaint/complaint';
import { ComplaintsPage } from '../pages/complaints/complaints';
import { ContactPage } from '../pages/contact/contact';
import { DiafimistikesPinakidesPage } from '../pages/diafimistikes-pinakides/diafimistikes-pinakides';
import { DiatirisiKaiFrontidaSkyloyPage } from '../pages/diatirisi-kai-frontida-skyloy/diatirisi-kai-frontida-skyloy';
import { EksoflisiLogariasmonPage } from '../pages/eksoflisi-logariasmon/eksoflisi-logariasmon';
import { ElegxosPosimouNerouKaiTrofimonPage } from '../pages/elegxos-posimou-nerou-kai-trofimon/elegxos-posimou-nerou-kai-trofimon';
import { EventPage } from '../pages/event/event';
import { EventsPage } from '../pages/events/events';
import { GrafeioEksypiretisisDimotonPage } from '../pages/grafeio-eksypiretisis-dimoton/grafeio-eksypiretisis-dimoton';
import { KathariotitaKaiYgeiiniPage } from '../pages/kathariotita-kai-ygeiini/kathariotita-kai-ygeiini';
import { KoimitiriaPage } from '../pages/koimitiria/koimitiria';
import { LakatamiaPage } from '../pages/lakatamia/lakatamia';
import { LoadingPage } from '../pages/loading/loading';
import { LoginPage } from '../pages/login/login';
import { NewPage } from '../pages/new/new';
import { NewsPage } from '../pages/news/news';
import { NotificationsPage } from '../pages/notifications/notifications';
import { OdigosEksypiretisisPage } from '../pages/odigos-eksypiretisis/odigos-eksypiretisis';
import { PolitikoiGamoiPage } from '../pages/politikoi-gamoi/politikoi-gamoi';
import { PrasinoSimeioPage } from '../pages/prasino-simeio/prasino-simeio';
import { ProblemPage } from '../pages/problem/problem';
import { ProblemsPage } from '../pages/problems/problems';
import { ProfilePage } from '../pages/profile/profile';
import { RegisterPage} from '../pages/register/register';
import { RestorePasswordPage } from '../pages/restore-password/restore-password';
import { RestorePasswordConfirmPage } from '../pages/restore-password-confirm/restore-password-confirm';
import { SettingsPage } from '../pages/settings/settings';
import { SubmitComplaintPage } from '../pages/submit-complaint/submit-complaint';
import { SubmitProblemPage } from '../pages/submit-problem/submit-problem';
import { TeliForoiKaiAllesAdeiesPage } from '../pages/teli-foroi-kai-alles-adeies/teli-foroi-kai-alles-adeies';
import { YdatopromitheiaPage } from '../pages/ydatopromitheia/ydatopromitheia';
import { YpovoliApopsisEisigisisPage } from '../pages/ypovoli-apopsis-eisigisis/ypovoli-apopsis-eisigisis';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ServicesProvider } from '../providers/services/services';
import { SqlLiteProvider } from '../providers/sql-lite/sql-lite';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
	AdeiesOikodomeisDiaxorismonPage,
	ApopseisEisigiseisPage,
	ChangePasswordPage,
	ComplaintPage,
	ComplaintsPage,	
	ContactPage,
	DiafimistikesPinakidesPage,
	DiatirisiKaiFrontidaSkyloyPage,
	EksoflisiLogariasmonPage,
	ElegxosPosimouNerouKaiTrofimonPage,
	EventPage,
	EventsPage,
	GrafeioEksypiretisisDimotonPage,
	KathariotitaKaiYgeiiniPage,
	KoimitiriaPage,
	LakatamiaPage,
	LoadingPage,
	LoginPage,
	NewPage,
	NewsPage,
	NotificationsPage,
	OdigosEksypiretisisPage,
	PolitikoiGamoiPage,
	PrasinoSimeioPage,
	ProblemPage,
	ProblemsPage,
	ProfilePage,
	RegisterPage,
	RestorePasswordPage,
	RestorePasswordConfirmPage,
	SettingsPage,
	SubmitComplaintPage,
	SubmitProblemPage,
	TeliForoiKaiAllesAdeiesPage,
	YdatopromitheiaPage,
	  YpovoliApopsisEisigisisPage,
	  SafePipe
  ],
  imports: [
    BrowserModule,
      IonicModule.forRoot(MyApp),
      HttpClientModule,
	  FormsModule,
	  IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
	AdeiesOikodomeisDiaxorismonPage,
	ApopseisEisigiseisPage,
	ChangePasswordPage,
	ComplaintPage,
	ComplaintsPage,	
	ContactPage,
	DiafimistikesPinakidesPage,
	DiatirisiKaiFrontidaSkyloyPage,
	EksoflisiLogariasmonPage,
	ElegxosPosimouNerouKaiTrofimonPage,
	EventPage,
	EventsPage,
	GrafeioEksypiretisisDimotonPage,
	KathariotitaKaiYgeiiniPage,
	KoimitiriaPage,
	LakatamiaPage,
	LoadingPage,
	LoginPage,
	NewPage,
	NewsPage,
	NotificationsPage,
	OdigosEksypiretisisPage,
	PolitikoiGamoiPage,
	PrasinoSimeioPage,
	ProblemPage,
	ProblemsPage,
	ProfilePage,
	RegisterPage,
	RestorePasswordPage,
	RestorePasswordConfirmPage,
	SettingsPage,
	SubmitComplaintPage,
	SubmitProblemPage,
	TeliForoiKaiAllesAdeiesPage,
	YdatopromitheiaPage,
      YpovoliApopsisEisigisisPage
  ],
  providers: [
    StatusBar,
      SplashScreen,
	  HTTP,
	  Network,
      HttpClientModule,
      FormsModule,
	  SQLite,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServicesProvider,
	SqlLiteProvider,
	Geolocation,
	GoogleMaps,
	Device
  ]
})
export class AppModule {}
