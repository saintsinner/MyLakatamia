import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Refresher } from 'ionic-angular';
//import { HTTP } from '@ionic-native/http';
import { ServicesProvider } from '../../providers/services/services';
import { SqlLiteProvider } from '../../providers/sql-lite/sql-lite';
import { HttpParams } from '@angular/common/http';

/**
 * Generated class for the LakatamiaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-lakatamia',
    templateUrl: 'lakatamia.html',
})
export class LakatamiaPage {
    baseUrlLocal: String = "http://192.168.10.104/";
    baseUrlLive: String = "https://mylakatamia.zebrac.com/";
    baseUrl: String = this.baseUrlLocal;
    params: any;
    dataset: any;
    isDataAvailable: boolean = false;
    isTab1Available: boolean = false;
    isTab2Available: boolean = false;
    @ViewChild(Refresher) myrefresher: Refresher;
    //// Declaring the Promise, yes! Promise!
    //filtersLoaded: Promise<boolean>;
    mysections: string = '1';
    constructor(public navCtrl: NavController, public navParams: NavParams, public servicesProvider: ServicesProvider, private sqlLiteProvider: SqlLiteProvider) {
        console.log('Constructor LakatamiaPage');
        //sqlLiteProvider.addDanceMove('tango');
        //sqlLiteProvider.getDanceMoves();
        //alert(this.filtersLoaded);
        //this.http = httpClient;
        //        this.getContent();

        //this.http.get('http://192.168.10.104/' + 'zePortalAPI/api/mylakatamia/getpages', this.params, {})
        //    .then(data => {
        //        this.dataset = JSON.parse(data.data);
        //        console.log(data.status);
        //        console.log(this.dataset); // data received by server
        //        console.log(data.headers);

        //    })
        //    .catch(error => {

        //        console.log(error.status);
        //        console.log(error.error); // error message as string
        //        console.log(error.headers);

        //    });
    }



    doRefresh(refresher) {
        console.log('Begin async operation', refresher);
        //this.getContent(http)
        this.mysections = '1';
        this.getContent(refresher, '1004');
        
        //setTimeout(() => {
        //    console.log('Async operation has ended');
        //    refresher.complete();
        //}, 10000);
    }

    getContent(refresher, pageId) {
        this.params = new HttpParams()
            .set('INSTID', '1044')
            .set('ID', pageId)
            .set('TITLE', '')
            .set('SECTIONS', '0')
            .set('desc', '')
            .set('enablesum', '')
            .set('keywords', '')
            .set('pagename', '')
            .set('masterp', '0')
            .set('path', '')
            .set('htmltopimg', '')
            .set('htmltopdesc', '')
            .set('htmloverview', '')
            .set('htmlconclusion', '')
            .set('htmls1', '')
            .set('htmll1', '')
            .set('htmls2', '')
            .set('htmll2', '')
            .set('htmls3', '')
            .set('htmll3', '')
            .set('htmls4', '')
            .set('htmll4', '')
            .set('htmls5', '')
            .set('htmll5', '')
            .set('htmls6', '')
            .set('htmll6', '')
            .set('htmls7', '')
            .set('htmll7', '')
            .set('htmls8', '')
            .set('htmll8', '')
            .set('htmls9', '')
            .set('htmll9', '')
            .set('htmls10', '')
            .set('htmll10', '')
            .set('lang', 'EL')
            .set('sortby', 'F420ID')
            .set('sortorder', 'ASC')
            .set('currentpage', '1')
            .set('pagesize', '10')
            .set('count', '0')
            .set('runoption', 'I')
            .set('USER_UI_LANGUAGE', 'EL')
            .set('userprofile', '')
            .set('retcode', '0')
            .set('retmsg', '0')
            .set('rettype', 'I');
        this.servicesProvider.getPage(this.params)
            .then(data => {
                //alert('');
                this.dataset = JSON.parse(data);
                //this.filtersLoaded = Promise.resolve(true);
                this.isDataAvailable = true;
                if (this.mysections == "1") {
                    this.isTab1Available = true;
                    this.isTab2Available = false;
                }
                else if (this.mysections == "2") {
                    this.isTab1Available = false;
                    this.isTab2Available = true;
                }
                this.isTab1Available = true;
                refresher.complete();
                //alert(data);
                //console.log("User Login: " + JSON.parse(this.dataset)[0].F420TITLE);
            });
    }
    //    this.params = {
    //        INSTID: '1044', ID: '1004',
    //        TITLE: '', SECTIONS: '0', desc: '', enablesum: '', keywords: '', pagename: '', masterp: '0', path: '', htmltopimg: '',
    //        htmltopdesc: '', htmloverview: '', htmlconclusion: '', htmls1: '', htmll1: '', htmls2: '', htmll2: '', htmls3: '',
    //        htmll3: '', htmls4: '', htmll4: '', htmls5: '', htmll5: '', htmls6: '', htmll6: '', htmls7: '', htmll7: '', htmls8: '',
    //        htmll8: '', htmls9: '', htmll9: '', htmls10: '', htmll10: '', lang: 'EL', sortby: 'F420ID', sortorder: 'ASC', currentpage: '1',
    //        pagesize: '10', count: '0', runoption: 'I', USER_UI_LANGUAGE: 'EL', userprofile: '', retcode: '0', retmsg: '0', rettype: 'I'
    //    }
    //    this.http.get('http://192.168.10.104/' + 'zePortalAPI/api/mylakatamia/getpages', this.params, {})
    //        .then(data => {
    //            this.dataset = JSON.parse(data);
    //            console.log(data.status);
    //            console.log(data.data); // data received by server
    //            console.log(data.headers);

    //        })
    //        .catch(error => {

    //            console.log(error.status);
    //            console.log(error.error); // error message as string
    //            console.log(error.headers);

    //        });
    //}


    ionViewCanEnter() {
        console.log('ionViewDidLoad LakatamiaPage');
        //alert(this.baseUrl);
        //this.getContent();
        
        //this.params = {
        //    INSTID: '1044', ID: '1004',
        //    TITLE: '', SECTIONS: '0', desc: '', enablesum: '', keywords: '', pagename: '', masterp: '0', path: '', htmltopimg: '',
        //    htmltopdesc: '', htmloverview: '', htmlconclusion: '', htmls1: '', htmll1: '', htmls2: '', htmll2: '', htmls3: '',
        //    htmll3: '', htmls4: '', htmll4: '', htmls5: '', htmll5: '', htmls6: '', htmll6: '', htmls7: '', htmll7: '', htmls8: '',
        //    htmll8: '', htmls9: '', htmll9: '', htmls10: '', htmll10: '', lang: 'EL', sortby: 'F420ID', sortorder: 'ASC', currentpage: '1',
        //    pagesize: '10', count: '0', runoption: 'I', USER_UI_LANGUAGE: 'EL', userprofile: '', retcode: '0', retmsg: '0', rettype: 'I'
        //}
        this.doRefresh(this.myrefresher);
        
    }

}
