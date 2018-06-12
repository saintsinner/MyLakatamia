import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

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
    constructor(public http: HttpClient, public alertCtrl: AlertController) {
        console.log('Hello ServicesProvider Provider');
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
