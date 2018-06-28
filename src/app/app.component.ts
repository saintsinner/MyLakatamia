import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events, MenuController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';
import { Device } from '@ionic-native/device';

import { ServicesProvider } from '../providers/services/services';

import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { ChangePasswordPage } from '../pages/change-password/change-password';
import { LoginPage } from '../pages/login/login';
import { SettingsPage } from '../pages/settings/settings';

export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  logsOut?: boolean;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  // List of pages that can be navigated to from the left menu
  // the left menu only works after login
  // the login page disables the left menu
  loggedInPages: PageInterface[] = [
    { title: 'MyLakatamia', name: 'HomePage', component: HomePage, icon: 'md-home' },
    { title: 'Προφίλ', name: 'ProfilePage', component: ProfilePage, icon: 'md-person' },
    { title: 'Αλλαγή Κωδικού', name: 'ChangePasswordPage', component: ChangePasswordPage, icon: 'md-lock' },
    { title: 'Έξοδος', name: 'HomePage', component: HomePage, icon: 'md-log-out', logsOut: true },
    { title: 'Ρυθμίσεις', name: 'SettingsPage', component: SettingsPage, icon: 'md-settings' }
  ];
  loggedOutPages: PageInterface[] = [
    { title: 'MyLakatamia', name: 'HomePage', component: HomePage, icon: 'md-home' },
    { title: 'Εγγραφή', name: 'ProfilePage', component: ProfilePage, icon: 'md-person' },
    { title: 'Είσοδος', name: 'LoginPage', component: LoginPage, icon: 'md-log-in' },
    { title: 'Ρυθμίσεις', name: 'SettingsPage', component: SettingsPage, icon: 'md-settings' }
  ];

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private network: Network, public events: Events,
    public menu: MenuController, public alertCtrl: AlertController, public device: Device, public servicesProvider: ServicesProvider) {
    this.initializeApp();


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
      
      // this.network.onDisconnect().subscribe(data => console.log(data), error => console.log(error));
      // // {
      // //   this.servicesProvider.online = false;
      // //   console.log('offline-->publish');
      // //   this.events.publish('network:offline');
      // // });
      // this.network.onConnect().subscribe(data => {console.log(data); this.nav.setRoot(HomePage)}, error => console.log(error));
      // // this.network.onConnect().subscribe(() => {
      // //   this.servicesProvider.online = true;
      // //   console.log('online--publish');
      // //   this.events.publish('network:online');
      // // });
      
      //this.listenToNetworkEvents();
      
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      //store device id
      this.servicesProvider.deviceId = this.device.uuid;

      //enable menu for login/logout
      this.enableMenu(this.servicesProvider.checkTokens());

      //add listeners for login/logout and online/offline
      this.listenToLoginEvents();
      this.network.onDisconnect()
      .subscribe(() => {
        alert('');
      });
    });
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:logout', () => {
      this.enableMenu(false);
    });
  }

  // listenToNetworkEvents() {
  //   // Offline event
  //   this.events.subscribe('network:offline', () => {
  //     this.servicesProvider.online = false;
  //     console.log('offline');
  //   });

  //   // Online event
  //   this.events.subscribe('network:online', () => {
  //     this.servicesProvider.online = true;
  //     console.log('online');
  //   });
  // }

  enableMenu(loggedIn: boolean) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }

  openPage(page: PageInterface) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario

    if (page.logsOut === true) {
      // Give the menu time to close before changing to logged out
      localStorage.removeItem("Token");
      localStorage.removeItem("EncodedToken");
      this.events.publish('user:logout');

      const popup = this.alertCtrl.create({
        title: "Μήνυμα",
        subTitle: "Έχετε εξέλθει από το σύστημα.",
        buttons: ['ΕΝΤΑΞΕΙ']
      });
      popup.present();
    }
    else {
      this.nav.setRoot(page.component);
    }
  }
}
