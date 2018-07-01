import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, Platform, LoadingController, Events } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { Storage } from '@ionic/storage';

/*
  Generated class for the ServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServicesProvider {
    baseUrlLocal: string = "http://192.168.10.104/";
    baseUrlLive: string = "https://mylakatamia.zebrac.com/";
    baseUrl: string = this.baseUrlLocal;
    instId: any = 1044
    user: string = '1044WEB'
    language: string = 'EL'
    data: any;
    myLoading: any;
    contID: any = null;
    online: boolean;
    disconnectSubscription: any;
    //isApp: any;
    deviceId: any;
    notificationsOn: boolean;
    categoryColors = [];
    constructor(public http: HttpClient, public alertCtrl: AlertController, private network: Network, public platform: Platform,
        public loadingCtrl: LoadingController, public storage: Storage, public events: Events) {
        //console.log('Hello ServicesProvider Provider');

        this.platform.ready().then(() => {
            //this.isApp = !document.URL.startsWith('http');
            // this.storage.get("categoryColors")
            //     .then(
            //         (data) => {
            //             this.categoryColors = data;
            //             if (this.categoryColors == null) {
            //                 this.setCategoryColors();
            //                 this.storage.set('categoryColors', this.categoryColors);
            //             }
            //         });
        });
    }

    startNotificationEvents(isChecked) {
        if (isChecked) {
            this.events.publish('notifications:on');
            this.notificationsOn = true;
        }
        else {
            this.events.publish('notifications:off');
            this.notificationsOn = false;
        }
        this.storage.set("notificationsOn", this.notificationsOn);
    }

    listenToNotificationEvents() {
        this.events.subscribe('notifications:on', () => {
            this.notificationsOn = true;
            this.storage.set("notificationsOn", this.notificationsOn);
        });

        this.events.subscribe('notifications:off', () => {
            this.notificationsOn = false;
            this.storage.set("notificationsOn", this.notificationsOn);
        });
    }

    startNetworkEvents(isChecked) {
        if (isChecked) {
            this.events.publish('network:on');
            this.online = true;
        }
        else {
            this.events.publish('network:off');
            this.online = false;
        }
        //this.storage.set("online", this.online);
    }

    listenToNetworkEvents() {
        this.events.subscribe('network:on', () => {
            this.online = true;
            //alert(this.online);
            //this.storage.set("online", this.online);
        });

        this.events.subscribe('network:off', () => {
            this.online = false;
            //alert(this.online);
            //this.storage.set("online", this.online);
        });
    }

    checkTokens() {
        return new Promise<boolean>(resolve => {
            this.storage.get("Token")
                .then(
                    (data) => {
                        this.contID = data;
                        if (this.contID != null) {
                            // Encode the String
                            this.storage.get("EncodedToken")
                                .then(
                                    (data2) => {
                                        let encodedString = btoa(this.contID);
                                        //alert(encodedString); // Outputs: "SGVsbG8gV29ybGQh"
                                        if (encodedString == data2) {
                                            this.events.publish('user:login');
                                            return resolve(true);
                                        }
                                        else {
                                            this.contID = null;
                                            this.events.publish('user:logout');
                                            return resolve(false);
                                        }
                                    });
                        }
                        else {
                            this.contID = null;
                            this.events.publish('user:logout');
                            return resolve(false);
                        }
                    });
        });


        // if (this.contID != null) {
        //     // Encode the String
        //     let encodedString = btoa(localStorage.getItem("Token"));
        //     //alert(encodedString); // Outputs: "SGVsbG8gV29ybGQh"
        //     if (encodedString == localStorage.getItem("EncodedToken")) {
        //         this.contID = localStorage.getItem("Token");
        //         return true;
        //     }
        //     else {
        //         this.contID = null;
        //         return false;
        //     }
        // }
        // else {
        //     this.contID = null;
        //     return false;
        // }

        // Decode the String
        // var decodedString = atob(encodedString);
        //alert(decodedString);
        // localStorage.setItem("token",id);
    }

    /*startWatching(){
       if(this.platform.isWebView()){
 
         $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
           console.log("went online");
         });
 
         $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
           console.log("went offline");
         });
 
       }
       else {
 
         window.addEventListener("online", function(e) {
           console.log("went online");
         }, false);   
 
         window.addEventListener("offline", function(e) {
           console.log("went offline");
         }, false); 
       }      
   }*/

    setCategoryColors() {
        for (var c = 1000; c < 1200; c++) {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            this.categoryColors.push(color);
        }
    }

    checkNetwork(myservice: string) {
        //alert(this.online);
        //alert(this.isApp);
        return new Promise<boolean>(resolve => {
            this.http.get(this.baseUrl + 'zePortalAPI/api/mylakatamia/' + myservice)
                .subscribe(
                    data => {
                        resolve(true);
                    },
                    (err: HttpErrorResponse) => {
                        resolve(false);
                    });
        });

    }

    getContent(myservice: string, params: HttpParams) {
        //alert(this.online);
        //alert(this.isApp);
        if (this.online) {
            this.myLoading = this.loadingCtrl.create({
                content: 'Παρακαλώ περιμένετε...'
            });
            this.myLoading.present();
            //if (this.data) {
            //    //alert('ok');
            //    return Promise.resolve(this.data);
            //}

            //let myheaders = new HttpHeaders();
            ////myheaders.set('Content-Type', 'application/json');
            //myheaders.set('instId', this.instId.toString());
            //myheaders.set('user', this.user);

            return new Promise(resolve => {
                this.http.get(this.baseUrl + 'zePortalAPI/api/mylakatamia/' + myservice, { params })
                    .subscribe(
                        data => {
                            this.myLoading.dismiss();
                            //console.log("User Login: " + data.F420HTMLTOPDESC);
                            this.data = data;
                            //console.log(this.data.F420HTMLTOPDESC);
                            resolve(this.data);
                        },
                        (err: HttpErrorResponse) => {
                            console.log(err.message)
                            //console.log(JSON.parse(params))
                            const popup = this.alertCtrl.create({
                                title: 'Πρόβλημα',
                                subTitle: "Υπάρχει πρόβλημα στην επικοινωνία με τον εξυπηρετητή", //err.message
                                buttons: ['ΕΝΤΑΞΕΙ']
                            });
                            this.myLoading.dismiss();
                            popup.present();
                        });
            });
        }
        else {
            if (this.data) {
                //alert('ok');
                return Promise.resolve(this.data);
            }
        }
    }

    addApopsisEisigisis(formData) {
        //alert(this.online);
        if (this.online) {
            this.myLoading = this.loadingCtrl.create({
                content: 'Παρακαλώ περιμένετε...'
            });
            this.myLoading.present();

            //if (this.data) {
            //    //alert('ok');
            //    return Promise.resolve(this.data);
            //}

            //let myheaders = new HttpHeaders();
            //myheaders.set('Content-Type', 'application/json');
            //myheaders.set('instId', this.instId.toString());
            //myheaders.set('user', this.user);

            // let options = {
            //     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
            //   };
            return new Promise(resolve => {
                this.http.post(this.baseUrl + 'zePortalAPI/api/mylakatamia/PostAddSubmission', JSON.stringify(formData), { headers: new HttpHeaders({ 'Content-Type': 'application/json' })})
                    .subscribe(
                        (result) => {
                            console.log("success!");

                            this.myLoading.dismiss();

                            resolve(result);
                        },
                        (err: HttpErrorResponse) => {
                            console.log(err.message)
                            //console.log(JSON.parse(params))
                            const popup = this.alertCtrl.create({
                                title: 'Πρόβλημα',
                                subTitle: "Υπάρχει πρόβλημα στην επικοινωνία με τον εξυπηρετητή", //err.message
                                buttons: ['ΕΝΤΑΞΕΙ']
                            });

                            this.myLoading.dismiss();

                            popup.present();
                        });

            });
        }
        else {
            return Promise.resolve(null);
            // if (this.data) {
            //     //alert('ok');
            //     return Promise.resolve(this.data);
            // }
        }
    }

    updateUserNotifications(formData) {
        //alert(this.online);
        if (this.online) {
            this.myLoading = this.loadingCtrl.create({
                content: 'Παρακαλώ περιμένετε...'
            });
            this.myLoading.present();

            //if (this.data) {
            //    //alert('ok');
            //    return Promise.resolve(this.data);
            //}

            //let myheaders = new HttpHeaders();
            //myheaders.set('Content-Type', 'application/json');
            //myheaders.set('instId', this.instId.toString());
            //myheaders.set('user', this.user);

            // let options = {
            //     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
            //   };
            return new Promise(resolve => {
                this.http.post(this.baseUrl + 'zePortalAPI/api/mylakatamia/UpdateUserNotifications', JSON.stringify(formData), { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
                    .subscribe(
                        (result) => {
                            console.log("success!");

                            this.myLoading.dismiss();

                            resolve(result);
                        },
                        (err: HttpErrorResponse) => {
                            console.log(err.message)
                            //console.log(JSON.parse(params))
                            const popup = this.alertCtrl.create({
                                title: 'Πρόβλημα',
                                subTitle: "Υπάρχει πρόβλημα στην επικοινωνία με τον εξυπηρετητή", //err.message
                                buttons: ['ΕΝΤΑΞΕΙ']
                            });

                            this.myLoading.dismiss();

                            popup.present();
                        });

            });
        }
        else {
            return Promise.resolve(null);
            // if (this.data) {
            //     //alert('ok');
            //     return Promise.resolve(this.data);
            // }
        }
    }

    // postFile(token:string, file:Blob){

    //     let url = WebService.API_POST_FILE + "?token="+token;
    //     let httpOptions = {
    //         headers: new HttpHeaders({
    //             'enctype': 'multipart/form-data; boundary=----WebKitFormBoundaryuL67FWkv1CA'
    //         })
    //     };

    //     let formData = new FormData();
    //     formData.append('file', file, 'test.jpg');

    //     console.log("post photo to URL at "+url);
    //     return this.http
    //         .post<SimpleResponse>(
    //             url,
    //             formData,
    //             httpOptions
    //     );
    // }
}
