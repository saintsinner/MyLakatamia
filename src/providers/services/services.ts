import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, Platform, LoadingController, Events, App, ToastController } from 'ionic-angular';
//import { Network } from '@ionic-native/network';
import { Storage } from '@ionic/storage';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
//import { HomePage } from '../../pages/home/home';


export interface FileInterface {
    base64Path: string;
    uri: string;
}

export interface SubmissionInterface {
    submission: any;
    photos: FileInterface[];
}

/*
  Generated class for the ServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServicesProvider {
    baseUrlLocal: string = "http://192.168.10.104/"; //use IP of the PC
    baseUrlLive: string = "https://mylakatamia.zebrac.com/";
    baseUrl: string = this.baseUrlLive;
    instId: any = 1044
    userProfile: string = '1044MOB'
    language: string = 'EL'
    data: any;
    myLoading: any;
    contID: any = null;
    online: boolean;
    errorAppeared: boolean;
    disconnectSubscription: any;
    //isApp: any;
    deviceId: any;
    notificationsOn: boolean;
    notifications = 0;
    categoryColors = [];
    deviceToken: string;
    //toastNetwork: any;
    constructor(public app: App, public http: HttpClient, public alertCtrl: AlertController, public platform: Platform,
        public loadingCtrl: LoadingController, public storage: Storage, public events: Events, private fileTransfer: FileTransfer, private toast: ToastController) {
        //console.log('Hello ServicesProvider Provider');
        //    this.toastNetwork = this.toast.create({
        //         message: "Είστε σε " + "OFFLINE" + " mode.",
        //         //duration: 5000,
        //         position: 'top',
        //         cssClass: "offlineToast"
        //       });


        this.platform.ready().then(() => {
            // if (this.online) {                
            //     this.processYpovoliApopsisEisigisis();
            //     this.processSubmitComplaints();
            //     this.processSubmitProblems();
            //   }
            //   else {
            //     var submissionsOffline = setInterval(() => {
            //       if (this.online) {
            //         clearInterval(submissionsOffline);
            //         this.processYpovoliApopsisEisigisis();
            //         this.processSubmitComplaints();
            //         this.processSubmitProblems();
            //       }
            //     }, 1000);
            //   }
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

    // startNetworkEvents(isChecked) {
    //     if (isChecked) {
    //         this.events.publish('network:on');
    //         //this.online = true;
    //     }
    //     else {
    //         this.events.publish('network:off');
    //         //this.online = false;
    //     }
    //     //this.storage.set("online", this.online);
    // }

    // listenToNetworkEvents() {
    //     this.events.subscribe('network:on', () => {
    //         //alert(this.online);
    //         //if (this.online != true) {
    //         this.online = true;
    //         //console.log("isonline");
    //         this.processYpovoliApopsisEisigisis();
    //         this.processSubmitComplaints();
    //         this.processSubmitProblems();
    //         //alert(this.online);
    //         //this.storage.set("online", this.online);
    //         //this.navCtrl.setRoot(HomePage);
    //         //let nav = this.app.getActiveNav();
    //         //nav.setRoot(HomePage); // circular reference
    //         //}
    //     });

    //     this.events.subscribe('network:off', () => {
    //         this.online = false;
    //         //console.log("isoffline");
    //         //alert(this.online);
    //         //this.storage.set("online", this.online);
    //     });
    // }

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

    }

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

    // checkNetwork() {
    //     //alert(this.online);
    //     //alert(this.isApp);
    //     return new Promise<boolean>(resolve => {
    //         this.http.get(this.baseUrl + 'zePortalAPI/api/mylakatamia/CheckNetwork')
    //             .subscribe(
    //                 data => {
    //                     resolve(true);
    //                 },
    //                 (err: HttpErrorResponse) => {
    //                     resolve(false);
    //                 });
    //     });

    // }

    getContent(myservice: string, params: HttpParams, showLoading: boolean = true) {
        //alert(this.online);
        //alert(this.isApp);
        //console.log(this.online);
        if (this.online) {
            if (showLoading) {
                this.myLoading = this.loadingCtrl.create({
                    content: 'Παρακαλώ περιμένετε...'
                });
                this.myLoading.present();
            }

            //if (this.data) {
            //    //alert('ok');
            //    return Promise.resolve(this.data);
            //}

            //let myheaders = new HttpHeaders();
            ////myheaders.set('Content-Type', 'application/json');
            //myheaders.set('instId', this.instId.toString());
            //myheaders.set('user', this.user);

            return new Promise(resolve => {
                // alert(JSON.stringify(this.baseUrl + 'zePortalAPI/api/mylakatamia/' + myservice, {params}));
                const popup = this.alertCtrl.create({
                    title: 'Πρόβλημα',
                    message: this.baseUrl + "zePortalAPI/api/mylakatamia/" + myservice, //Υπάρχει πρόβλημα στην επικοινωνία με τον εξυπηρετητή"
                    buttons: ['ΕΝΤΑΞΕΙ']
                });
                this.http.get(this.baseUrl + 'zePortalAPI/api/mylakatamia/' + myservice, { params })
                    .subscribe(
                        data => {
                            if (showLoading) {
                                this.myLoading.dismiss().catch();
                            }
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
                                message: "Υπάρχει πρόβλημα στην επικοινωνία με τον εξυπηρετητή", //err.message
                                buttons: ['ΕΝΤΑΞΕΙ']
                            });
                            if (showLoading) {
                                this.myLoading.dismiss().catch();
                            }

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

    addSubmission(formData, submissionLoading: any, showLoading: boolean = true, hasCustomLoading: boolean = false) {
        //alert(this.online);
        if (this.online) {
            if (showLoading) {
                submissionLoading = this.loadingCtrl.create({
                    content: 'Παρακαλώ περιμένετε...'
                });
                submissionLoading.present();
            }
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
            //   alert(JSON.stringify(formData));
            return new Promise(resolve => {
                this.http.post(this.baseUrl + 'zePortalAPI/api/mylakatamia/PostAddSubmission', JSON.stringify(formData), { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
                    .subscribe(
                        (result) => {
                            console.log("success!");
                            if (showLoading) {
                                submissionLoading.dismiss().catch();
                            }
                            resolve(result);
                        },
                        (err: HttpErrorResponse) => {
                            this.errorAppeared = true;
                            console.log(err.message)
                            //console.log(JSON.parse(params))
                            const popup = this.alertCtrl.create({
                                title: 'Πρόβλημα',
                                message: "Υπάρχει πρόβλημα στην επικοινωνία με τον εξυπηρετητή", // err.message
                                buttons: ['ΕΝΤΑΞΕΙ']
                            });
                            if (showLoading || hasCustomLoading) {
                                submissionLoading.dismiss().catch();
                            }
                            popup.present();
                        });

            });
        }
        else {
            /* if (showLoading) {
                 this.myLoading.dismiss().catch();
             }*/
            return Promise.resolve(null);

            // if (this.data) {
            //     //alert('ok');
            //     return Promise.resolve(this.data);
            // }
        }
    }

    convertToDataURLviaCanvas(url, outputFormat) {
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.crossOrigin = 'Anonymous';
            img.onload = function () {
                let canvas = <HTMLCanvasElement>document.createElement('CANVAS'),
                    ctx = canvas.getContext('2d'),
                    dataURL;
                canvas.height = img.height;
                canvas.width = img.width;
                ctx.drawImage(img, 0, 0);
                dataURL = canvas.toDataURL(outputFormat);
                //callback(dataURL);
                canvas = null;
                resolve(dataURL);
            };
            img.src = url;
        });
    }

    sendData(submissionId, photos, showLoading: boolean = true) {
        if (showLoading) {
            this.myLoading = this.loadingCtrl.create({
                content: 'Παρακαλώ περιμένετε...'
            });
            this.myLoading.present();
        }
        return new Promise(resolve => {
            let count = 0;
            for (let photo of photos) {
                count = count + 1;
                let filename = "Image" + count.toString();
                var options = {
                    fileKey: "file",
                    fileName: filename,
                    chunkedMode: false,
                    mimeType: "image/jpg",
                    params: { 'title': filename, "instId": this.instId.toString(), "userprofile": this.userProfile, "lang": this.language, "refItemId": submissionId.toString() }
                };
                const fileTransfer: FileTransferObject = this.fileTransfer.create();
                fileTransfer.upload(photo.base64Path, this.baseUrl + 'zePortalAPI/api/mylakatamia/UploadImageSubmissions', options)
                    .then((res) => {
                        if (count = photos.length) {
                            if (showLoading) {
                                this.myLoading.dismiss().catch();
                            }
                            resolve(null);
                        }
                    }, (err) => {
                        //this.presentToast(err);
                        if (showLoading) {
                            this.myLoading.dismiss().catch();
                        }
                        resolve(null);
                    });
            }
        });
    }

    processYpovoliApopsisEisigisis() {
        if (this.online) {
            //alert(this.storage.get("YpovoliApopsisEisigisisPage"))
            this.storage.get("YpovoliApopsisEisigisisPage")
                .then(
                    (data) => {
                        //alert(data[0].title);
                        let submissions = [];
                        submissions = data;
                        if (submissions != null) {
                            let ok = true;
                            for (let submission of submissions) {
                                //alert(submission.title);
                                try {
                                    let mySubmissionLoading: any;
                                    this.addSubmission(submission, mySubmissionLoading)
                                        .then(data => {

                                        });
                                } catch (error) {
                                    //this.myLoading.dismiss().catch();
                                    //alert(error.message);
                                    ok = false;
                                }

                            }
                            if (ok) {
                                //this.myLoading.dismiss().catch();
                                this.storage.remove("YpovoliApopsisEisigisisPage");
                            }
                        }
                    }
                );
        }
    }

    processSubmitProblems() {
        if (this.online) {
            //alert(this.storage.get("YpovoliApopsisEisigisisPage"))
            this.storage.get("SubmitProblemPage")
                .then(
                    (data) => {
                        //alert(data[0].title);
                        let submissions = [];
                        submissions = data;
                        if (submissions != null) {
                            let ok = true;
                            for (let submission of submissions) {
                                //alert(submission.title);
                                try {
                                    let mySubmissionLoading: any;
                                    this.addSubmission(submission.submission, mySubmissionLoading)
                                        .then(data => {
                                            let message = JSON.parse(data.toString());

                                            if (message[0]["@RETTYPE"] == 'I') {
                                                //upload files
                                                //alert(message[0]["@PID"]);
                                                if (submission.photos.length > 0) {
                                                    this.sendData(message[0]["@PID"], submission.photos, false).then((res) => {
                                                        //this.myLoading.dismiss().catch();

                                                        // let alertTitle = "Μήνυμα";
                                                        // const popup = this.alertCtrl.create({
                                                        //   title: alertTitle,
                                                        //   message: message[0]["@RETMSG"],
                                                        //   buttons: ['ΕΝΤΑΞΕΙ']
                                                        // });
                                                        // popup.present();
                                                        //this.navCtrl.setRoot(HomePage);
                                                    });
                                                }
                                            }
                                        });
                                } catch (error) {
                                    //this.myLoading.dismiss().catch();
                                    //alert(error.message);
                                    ok = false;
                                }

                            }
                            if (ok) {
                                //this.myLoading.dismiss().catch();
                                this.storage.remove("SubmitProblemPage");
                            }
                        }
                    }
                );
        }
    }

    processSubmitComplaints() {
        if (this.online) {
            //alert(this.storage.get("YpovoliApopsisEisigisisPage"))
            this.storage.get("SubmitComplaintPage")
                .then(
                    (data) => {
                        //alert(data[0].title);
                        let submissions = [];
                        submissions = data;
                        if (submissions != null) {
                            let ok = true;
                            for (let submission of submissions) {
                                //alert(submission.title);
                                try {
                                    let mySubmissionLoading: any;
                                    this.addSubmission(submission.submission, mySubmissionLoading)
                                        .then(data => {
                                            let message = JSON.parse(data.toString());

                                            if (message[0]["@RETTYPE"] == 'I') {
                                                //upload files
                                                //alert(message[0]["@PID"]);
                                                if (submission.photos.length > 0) {
                                                    this.sendData(message[0]["@PID"], submission.photos, false).then((res) => {
                                                        //this.myLoading.dismiss().catch();

                                                        // let alertTitle = "Μήνυμα";
                                                        // const popup = this.alertCtrl.create({
                                                        //   title: alertTitle,
                                                        //   message: message[0]["@RETMSG"],
                                                        //   buttons: ['ΕΝΤΑΞΕΙ']
                                                        // });
                                                        // popup.present();
                                                        //this.navCtrl.setRoot(HomePage);
                                                    });
                                                }
                                            }
                                        });
                                } catch (error) {
                                    //this.myLoading.dismiss().catch();
                                    //alert(error.message);
                                    ok = false;
                                }

                            }
                            if (ok) {
                                //this.myLoading.dismiss().catch();
                                this.storage.remove("SubmitComplaintPage");
                            }
                        }
                    }
                );
        }
    }

    getNotifications() {
        if (this.online) {
            let params = new HttpParams()
                .set('INSTID', this.instId.toString())
                .set('ID', '')
                .set('contId', (this.contID == null ? "" : this.contID))
                .set('deviceId', (this.deviceId == null ? "" : this.deviceId))
                .set('notificationId', '')
                .set('category', '1001')
                .set('lang', this.language)
                .set('sortby', 'F491CRTDATE')
                .set('sortorder', 'DESC')
                .set('currentpage', '1')
                .set('pagesize', '99')
                .set('count', '0')
                .set('runoption', 'I')
                .set('USER_UI_LANGUAGE', this.language)
                .set('userprofile', this.userProfile)
                .set('retcode', '0')
                .set('retmsg', '0')
                .set('rettype', 'I');
            this.getContent("GetUserNotifications", params, false)
                .then(data => {
                    //alert('');
                    let dataset = JSON.parse(data.toString());
                    let datasetUnread = [];
                    for (let d of dataset) {
                        if (d.F491READ.toString().toLowerCase().trim() == 'true') {
                            d.F491READ = true;
                        }
                        else {
                            d.F491READ = false;
                            datasetUnread.push(d);
                        }
                    }
                    this.storage.set("NotificationsPage", dataset);
                    //this.dataset = data;
                    //this.filtersLoaded = Promise.resolve(true);
                    this.notifications = datasetUnread.length;
                    //alert(data);
                    //console.log("User Login: " + JSON.parse(this.dataset)[0].F420TITLE);
                });
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

                            this.myLoading.dismiss().catch();

                            resolve(result);
                        },
                        (err: HttpErrorResponse) => {
                            console.log(err.message)
                            //console.log(JSON.parse(params))
                            const popup = this.alertCtrl.create({
                                title: 'Πρόβλημα',
                                message: "Υπάρχει πρόβλημα στην επικοινωνία με τον εξυπηρετητή", //err.message
                                buttons: ['ΕΝΤΑΞΕΙ']
                            });
                            this.myLoading.dismiss().catch();
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

    updateTokens(formData) {
        //alert(this.online);
        if (this.online) {
            return new Promise(resolve => {
                this.http.post(this.baseUrl + 'zePortalAPI/api/mylakatamia/PostAddToken', JSON.stringify(formData), { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
                    .subscribe(
                        (result) => {
                            console.log("success!");
                            resolve(result);
                        },
                        (err: HttpErrorResponse) => {
                            console.log(err.message)
                            //console.log(JSON.parse(params))
                            const popup = this.alertCtrl.create({
                                title: 'Πρόβλημα',
                                message: "Υπάρχει πρόβλημα στην επικοινωνία με τον εξυπηρετητή", //err.message
                                buttons: ['ΕΝΤΑΞΕΙ']
                            });
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

    //mk\\
    encodeData(dataToEncode): string {
        // return new Promise(resolve => {
        var encodedString = btoa(dataToEncode);
        return (encodedString);
        // });

    }

    changePass(formData) {
        //alert(this.online);
        if (this.online) {
            this.myLoading = this.loadingCtrl.create({
                content: 'Παρακαλώ περιμένετε...'
            });
            this.myLoading.present();

            console.log('HERE');
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
                console.log('here - ' + JSON.stringify(formData))
                this.http.post(this.baseUrl + 'zePortalAPI/api/mylakatamia/PostUpdateContactPassword', JSON.stringify(formData), { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
                    .subscribe(
                        (result) => {
                            console.log("success!");

                            this.myLoading.dismiss().catch();

                            resolve(result);
                        },
                        (err: HttpErrorResponse) => {
                            console.log(err.message)
                            //console.log(JSON.parse(params))
                            const popup = this.alertCtrl.create({
                                title: 'Πρόβλημα',
                                message: "Υπάρχει πρόβλημα στην επικοινωνία με τον εξυπηρετητή", //err.message
                                buttons: ['ΕΝΤΑΞΕΙ']
                            });
                            this.myLoading.dismiss().catch();
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

    ContactMNT(formData) {
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

            // let myheaders = new HttpHeaders();
            // myheaders.set('Content-Type', 'application/json');

            // let options = {
            //     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
            //   };
            return new Promise(resolve => {
                this.http.post(this.baseUrl + 'zePortalAPI/api/mylakatamia/PostAddContact', JSON.stringify(formData), { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
                    .subscribe(
                        (result) => {
                            console.log("success!");

                            this.myLoading.dismiss().catch();

                            resolve(result);
                        },
                        (err: HttpErrorResponse) => {
                            console.log(err.message)
                            //console.log(JSON.parse(params))
                            const popup = this.alertCtrl.create({
                                title: 'Πρόβλημα',
                                message: "Υπάρχει πρόβλημα στην επικοινωνία με τον εξυπηρετητή", //err.message
                                buttons: ['ΕΝΤΑΞΕΙ']
                            });
                            this.myLoading.dismiss().catch();
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
