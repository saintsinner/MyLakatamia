import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';

import { ServicesProvider } from '../providers/services/services';

import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { ChangePasswordPage } from '../pages/change-password/change-password';
import { LoginPage } from '../pages/login/login';
import { SettingsPage } from '../pages/settings/settings';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  //pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private network: Network, public servicesProvider: ServicesProvider) {
    this.initializeApp();


    /*// used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }
    ];*/

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      let type = this.network.type;
      this.servicesProvider.isApp = !document.URL.startsWith('http');
      //console.log("Connection type: ", this.network.type);
      // Try and find out the current online status of the device
      if ((type == "unknown" || type == "none" || type == undefined) && this.servicesProvider.isApp) {
        console.log("The device is not online");
        this.servicesProvider.online = false;
      } else {
        console.log("The device is online!");
        this.servicesProvider.online = true;
      }
    });
  }

  logout() {
    localStorage.removeItem("Token");
    localStorage.removeItem("EncodedToken");
    //$scope.data.visible = false;
  }

  openPage(pageStr) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    switch (pageStr) {
      case 'HomePage':
        this.nav.setRoot(HomePage);
        break;
      case 'ProfilePage':
        this.nav.setRoot(ProfilePage);
        break;
      case 'ChangePasswordPage':
        this.nav.setRoot(ChangePasswordPage);
        break;
      case 'LoginPage':
        this.nav.setRoot(LoginPage);
        break;
      case 'SettingsPage':
        this.nav.setRoot(SettingsPage);
        break;
      default:
        this.nav.setRoot(HomePage);
    }
  }
}
