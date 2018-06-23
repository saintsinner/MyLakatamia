import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, Platform, LoadingController } from 'ionic-angular';
import { Network } from '@ionic-native/network';

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
    language: string = 'EL'
    data: any;
    myLoading: any;
    contID: any = null;
    online: boolean = true;
    disconnectSubscription: any;
    isApp: any;
    constructor(public http: HttpClient, public alertCtrl: AlertController, private network: Network, public platform: Platform, public loadingCtrl: LoadingController) {
        //console.log('Hello ServicesProvider Provider');

        this.platform.ready().then(() => {
            let type = this.network.type;
            this.isApp = !document.URL.startsWith('http');
            //console.log("Connection type: ", this.network.type);
            // Try and find out the current online status of the device
            if (type == "unknown" || type == "none" || type == undefined) {
                console.log("The device is not online");
                this.online = false;
            } else {
                console.log("The device is online!");
                this.online = true;
            }
        });

        this.network.onDisconnect().subscribe(() => {
            this.online = false;
            console.log('network was disconnected :-(');
        });

        this.network.onConnect().subscribe(() => {
            this.online = true;
            console.log('network was connected :-)');
        });
    }

    checkTokens() {
        this.contID = localStorage.getItem("Token");
        if (this.contID != null) {
            // Encode the String
            let encodedString = btoa(localStorage.getItem("Token"));
            //alert(encodedString); // Outputs: "SGVsbG8gV29ybGQh"
            if (encodedString == localStorage.getItem("EncodedToken")) {
                this.contID = localStorage.getItem("Token");
                return true;
            }
            else {
                this.contID = null;
                return false;
            }
        }
        else {
            this.contID = null;
            return false;
        }

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

    getContent(myservice: string, params: HttpParams) {
        //alert(this.online);
        if (this.online || !this.isApp) {
            this.myLoading = this.loadingCtrl.create({
                content: 'Παρακαλώ περιμένετε...'
            });
            this.myLoading.present();
            //if (this.data) {
            //    //alert('ok');
            //    return Promise.resolve(this.data);
            //}

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
                                subTitle: err.message,
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

    addSubmission(formData) {
        //alert(this.online);
        if (this.online || !this.isApp) {
            this.myLoading = this.loadingCtrl.create({
                content: 'Παρακαλώ περιμένετε...'
            });
            this.myLoading.present();
            //if (this.data) {
            //    //alert('ok');
            //    return Promise.resolve(this.data);
            //}

            // let myheaders = new HttpHeaders();
            // myheaders.set('Content-Type', 'application/json');

            // let options = {
            //     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
            //   };
            return new Promise(resolve => {
                this.http.post(this.baseUrl + 'zePortalAPI/api/mylakatamia/PostAddSubmission', JSON.stringify(formData), { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
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
                                subTitle: err.message,
                                buttons: ['ΕΝΤΑΞΕΙ']
                            });
                            this.myLoading.dismiss();
                            popup.present();
                        });

            });
        }
        else {
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
