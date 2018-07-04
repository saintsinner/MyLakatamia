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
import { ActionSheet } from '@ionic-native/action-sheet';
//import { FileChooser } from '@ionic-native/file-chooser';
//import { IOSFilePicker } from '@ionic-native/file-picker';
import { FileTransfer } from '@ionic-native/file-transfer';
//import { FilePath } from '@ionic-native/file-path';
//import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
//import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import { ServicesProvider } from '../providers/services/services';
import { SqlLiteProvider } from '../providers/sql-lite/sql-lite';

//import { SocialSharing } from '@ionic-native/social-sharing';
import { SafePipe } from '../pipes/safe/safe';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ApopseisEisigiseisPage } from '../pages/apopseis-eisigiseis/apopseis-eisigiseis';
import { ApopsiEisigisiPage } from '../pages/apopsi-eisigisi/apopsi-eisigisi';
import { ChangePasswordPage } from '../pages/change-password/change-password';
import { ComplaintPage } from '../pages/complaint/complaint';
import { ComplaintsPage } from '../pages/complaints/complaints';
import { ContactPage } from '../pages/contact/contact';
import { EksoflisiLogariasmonPage } from '../pages/eksoflisi-logariasmon/eksoflisi-logariasmon';
import { EventPage } from '../pages/event/event';
import { EventsPage } from '../pages/events/events';
import { KoimitiriaPage } from '../pages/koimitiria/koimitiria';
import { LakatamiaPage } from '../pages/lakatamia/lakatamia';
import { LoadingPage } from '../pages/loading/loading';
import { LoginPage } from '../pages/login/login';
import { NewPage } from '../pages/new/new';
import { NewsPage } from '../pages/news/news';
import { NotificationsPage } from '../pages/notifications/notifications';
import { NotificationPage } from '../pages/notification/notification';
import { OdigosEksypiretisisPage } from '../pages/odigos-eksypiretisis/odigos-eksypiretisis';
import { ProblemPage } from '../pages/problem/problem';
import { ProblemsPage } from '../pages/problems/problems';
import { ProfilePage } from '../pages/profile/profile';
import { RegisterPage} from '../pages/register/register';
import { RestorePasswordPage } from '../pages/restore-password/restore-password';
import { RestorePasswordConfirmPage } from '../pages/restore-password-confirm/restore-password-confirm';
import { SettingsPage } from '../pages/settings/settings';
import { SubmitComplaintPage } from '../pages/submit-complaint/submit-complaint';
import { SubmitProblemPage } from '../pages/submit-problem/submit-problem';
import { YpovoliApopsisEisigisisPage } from '../pages/ypovoli-apopsis-eisigisis/ypovoli-apopsis-eisigisis';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
	ApopseisEisigiseisPage,
	ApopsiEisigisiPage,
	ChangePasswordPage,
	ComplaintPage,
	ComplaintsPage,	
	ContactPage,
	EksoflisiLogariasmonPage,
	EventPage,
	EventsPage,
	KoimitiriaPage,
	LakatamiaPage,
	LoadingPage,
	LoginPage,
	NewPage,
	NewsPage,
	NotificationsPage,
	NotificationPage,
	OdigosEksypiretisisPage,
	ProblemPage,
	ProblemsPage,
	ProfilePage,
	RegisterPage,
	RestorePasswordPage,
	RestorePasswordConfirmPage,
	SettingsPage,
	SubmitComplaintPage,
	SubmitProblemPage,
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
	ApopseisEisigiseisPage,
	ApopsiEisigisiPage,
	ChangePasswordPage,
	ComplaintPage,
	ComplaintsPage,	
	ContactPage,
	EksoflisiLogariasmonPage,
	EventPage,
	EventsPage,
	KoimitiriaPage,
	LakatamiaPage,
	LoadingPage,
	LoginPage,
	NewPage,
	NewsPage,
	NotificationsPage,
	NotificationPage,
	OdigosEksypiretisisPage,
	ProblemPage,
	ProblemsPage,
	ProfilePage,
	RegisterPage,
	RestorePasswordPage,
	RestorePasswordConfirmPage,
	SettingsPage,
	SubmitComplaintPage,
	SubmitProblemPage,
    YpovoliApopsisEisigisisPage
  ],
  providers: [
	ServicesProvider,
    StatusBar,
      SplashScreen,
	  HTTP,
	  Network,
      HttpClientModule,
      FormsModule,
	  SQLite,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
	SqlLiteProvider,
	Geolocation,
	GoogleMaps,
	Device,
	ActionSheet,
	//FileChooser,
	//IOSFilePicker,
	FileTransfer,
	//FilePath,
	//File,
	Camera,
	//ImagePicker,
	Base64
  ]
})
export class AppModule {}
