import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, Platform } from 'ionic-angular';
import { Network } from '@ionic-native/network';

/*
  Generated class for the ServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServicesProvider {
    baseUrlLocal: String = "http://192.168.10.104/";
    baseUrlLive: String = "https://mylakatamia.zebrac.com/";
    baseUrl: String = this.baseUrlLocal;
    data: any;
    public online:boolean = true;
    disconnectSubscription: any;
    constructor(public http: HttpClient, public alertCtrl: AlertController, private network: Network, public platform: Platform) {
        //console.log('Hello ServicesProvider Provider');

        this.platform.ready().then(() => {
            let type = this.network.type;
      
            //console.log("Connection type: ", this.network.type);
            // Try and find out the current online status of the device
            if(type == "unknown" || type == "none" || type == undefined){
              //console.log("The device is not online");
              this.online = false;
            }else{
              //console.log("The device is online!");
              this.online = true;
            }
          });
    
        this.network.onDisconnect().subscribe( () => {
            this.online = false;
            //console.log('network was disconnected :-(');
          });
      
          this.network.onConnect().subscribe( () => {
            this.online = true;
            //console.log('network was connected :-)');
          });
    }

    getBaseUrl(): String {
        return this.baseUrl;
    }
   
    getPage(params: HttpParams) {
        //if (this.data) {
        //    //alert('ok');
        //    return Promise.resolve(this.data);
        //}

        return new Promise(resolve => {
            this.http.get(this.baseUrl + 'zePortalAPI/api/mylakatamia/getpages', { params })
                .subscribe(
                data => {
                    //console.log("User Login: " + data.F420HTMLTOPDESC);
                        this.data = data;
                        //console.log(this.data.F420HTMLTOPDESC);
                    resolve(this.data);
                },
                (err: HttpErrorResponse) => {
                    console.log(err.message)
                    //console.log(JSON.parse(params))
                    const alert = this.alertCtrl.create({
                        title: 'Πρόβλημα',
                        subTitle: err.message,
                        buttons: ['ΕΝΤΑΞΕΙ']
                    });
                    alert.present();
                });
        });
    }

}
