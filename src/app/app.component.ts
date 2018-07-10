import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events, MenuController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';
import { Device } from '@ionic-native/device';
import { Storage } from '@ionic/storage';

import { ServicesProvider } from '../providers/services/services';

import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { ChangePasswordPage } from '../pages/change-password/change-password';
import { LoginPage } from '../pages/login/login';
import { SettingsPage } from '../pages/settings/settings';
import { CreditsPage } from '../pages/credits/credits';

export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  online?: boolean;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  onDevice: boolean;

  // List of pages that can be navigated to from the left menu
  // the left menu only works after login
  // the login page disables the left menu
  loggedInPages: PageInterface[] = [
    { title: 'MyLakatamia', name: 'HomePage', component: HomePage, icon: 'md-home' },
    { title: 'Προφίλ', name: 'ProfilePage', component: ProfilePage, icon: 'md-person', online: true },
    { title: 'Αλλαγή Κωδικού', name: 'ChangePasswordPage', component: ChangePasswordPage, icon: 'md-lock', online: true },
    { title: 'Έξοδος', name: 'HomePage', component: HomePage, icon: 'md-log-out', logsOut: true },
    { title: 'Ρυθμίσεις', name: 'SettingsPage', component: SettingsPage, icon: 'md-settings' },
    { title: 'Εφαρμογή', name: 'CreditsPage', component: CreditsPage, icon: 'md-bookmark' }
  ];
  loggedOutPages: PageInterface[] = [
    { title: 'MyLakatamia', name: 'HomePage', component: HomePage, icon: 'md-home' },
    { title: 'Εγγραφή', name: 'ProfilePage', component: ProfilePage, icon: 'md-person', online: true },
    { title: 'Είσοδος', name: 'LoginPage', component: LoginPage, icon: 'md-log-in', online: true },
    { title: 'Ρυθμίσεις', name: 'SettingsPage', component: SettingsPage, icon: 'md-settings' },
    { title: 'Εφαρμογή', name: 'CreditsPage', component: CreditsPage, icon: 'md-bookmark' }
  ];

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public events: Events, public network: Network,
    public menu: MenuController, public alertCtrl: AlertController, public device: Device, public servicesProvider: ServicesProvider, public storage: Storage) {
    this.initializeApp();

    //// stop connect watch
    //connectSubscription.unsubscribe();

    // // used for an example of ngFor and navigation
    // this.pages = [
    //   { title: 'Home', component: 'HomePage', icon: 'home', role: 5 },
    //   { title: 'Profile', component: 'ProfilePage', icon: 'person', role: 5 },
    //   { title: 'Account', component: 'AccountPage', icon: 'home', role: 5 },
    //   { title: 'Search Employee', component: 'AtlasemployeehomePage', icon: 'home', role: 4 }
    // ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.rootPage = HomePage;
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      //if web browser assume you are online because listeners do not work in browser
      if (document.URL.startsWith('http')) {
        this.servicesProvider.online = true;
        this.servicesProvider.getNotifications();
        this.servicesProvider.processYpovoliApopsisEisigisis();
        this.servicesProvider.processSubmitComplaints();
        this.servicesProvider.processSubmitProblems();
      }
      else {
        this.startupOnlineActions();
      }
      // watch network for a disconnect
      let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
        //alert('');
        console.log('network was disconnected :-(');
        this.servicesProvider.online = false;
        // //console.log("isonline");
        // this.processYpovoliApopsisEisigisis();
        // this.processSubmitComplaints();
        // this.processSubmitProblems();
      });

      //// stop disconnect watch
      //disconnectSubscription.unsubscribe();

      // watch network for a connection
      let connectSubscription = this.network.onConnect().subscribe(() => {
        this.startupOnlineActions();
      });

      // this.servicesProvider.checkNetwork()
      //   .then(
      //     (data) => {
      //       this.servicesProvider.online = data;
      //     }
      //   );

      // //online offline events
      // var cn = setInterval(() => {
      //   this.checkForNetwork();
      // }, 3000);
      // //add listeners for online/offline
      // this.servicesProvider.listenToNetworkEvents();

      //store device id
      this.servicesProvider.deviceId = this.device.uuid;

      //user login events - enable menu for login/logout
      this.servicesProvider.checkTokens()
        .then(
          (data) => {
            this.enableMenu(data);
          });
      //add listeners for login/logout
      this.listenToLoginEvents();

      //notification events
      this.storage.get("notificationsOn")
        .then(
          (data) => {
            this.servicesProvider.notificationsOn = (data == null ? true : data);
            this.servicesProvider.startNotificationEvents(this.servicesProvider.notificationsOn);
          }
        );
      //add listeners for notifications
      this.servicesProvider.listenToNotificationEvents();

      // let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      //   console.log('network was disconnected :-(');
      //   let alert = this.alertCtrl.create({
      //     title: 'Network was disconnected :-(',
      //     message: 'Please check your connection. And try again',
      //     buttons: ['OK']
      //   });
      //   alert.present();
      // });

      // disconnectSubscription.unsubscribe();

      // // watch network for a connection
      // let connectSubscription = this.network.onConnect().subscribe(() => {
      //   console.log('network connected!');
      //   let alert = this.alertCtrl.create({
      //     title: 'Network connected!',
      //     message: 'Hurrah!',
      //     buttons: ['OK']
      //   });
      //   alert.present();
      //   // We just got a connection but we need to wait briefly
      //   // before we determine the connection type.  Might need to wait
      //   // prior to doing any api requests as well.

      // });
      // connectSubscription.unsubscribe();

    });
  }

  // checkForNetwork() {
  //   this.servicesProvider.checkNetwork()
  //     .then(
  //       (data) => {
  //         this.servicesProvider.online = data;
  //         this.servicesProvider.startNetworkEvents(this.servicesProvider.online);
  //       }
  //     );
  // }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.servicesProvider.checkTokens()
        .then(
          (data) => {
            this.enableMenu(true);
          });
    });

    this.events.subscribe('user:logout', () => {
      this.servicesProvider.checkTokens()
        .then(
          (data) => {
            this.enableMenu(false);
          });
    })
  }

  startupOnlineActions() {
    if (this.network.type !== 'none') {
      //alert('');
      this.servicesProvider.online = true;
      console.log('network connected!');
      // We just got a connection but we need to wait briefly
      // before we determine the connection type. Might need to wait.
      // prior to doing any api requests as well.
      setTimeout(() => {
        this.servicesProvider.online = true;
        //console.log("isonline");
        this.servicesProvider.getNotifications();
        this.servicesProvider.processYpovoliApopsisEisigisis();
        this.servicesProvider.processSubmitComplaints();
        this.servicesProvider.processSubmitProblems();
        // if (this.network.type === 'wifi') {
        //   console.log('we got a wifi connection, woohoo!');
        // }
      }, 3000);
    } else if (this.network.type === 'none') {
      this.servicesProvider.online = false;
    } else {
      this.servicesProvider.online = false;
    }

  }

  enableMenu(loggedIn: boolean) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }

  openPage(page: PageInterface) {


    if (page.logsOut === true) {

      this.storage.remove("Token");
      this.storage.remove("EncodedToken");
      this.events.publish('user:logout');

      const popup = this.alertCtrl.create({
        title: "Μήνυμα",
        message: "ΕΧΕΤΕ ΑΠΟΣΥΝΔΕΘΕΙ ΕΠΙΤΥΧΩΣ",
        buttons: ['ΕΝΤΑΞΕΙ']
      });
      popup.present();
      this.nav.setRoot(HomePage);
    }
    else if (page.online === true && this.servicesProvider.online != true) {
      const popup = this.alertCtrl.create({
        title: "Μήνυμα",
        message: "ΠΡΕΠΕΙ ΝΑ ΕΙΣΤΕ ΣΥΝΔΕΔΕΜΕΝΟΙ ΜΕ ΤΟ ΔΙΑΔΙΚΤΥΟ",
        buttons: ['ΕΝΤΑΞΕΙ']
      });
      popup.present();
    }
    else {
      this.nav.setRoot(page.component);
    }
  }
}
