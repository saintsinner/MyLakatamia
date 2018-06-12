import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the SqlLiteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SqlLiteProvider {

    // we need to declare a var that will point to the initialized db:
    public db: SQLiteObject;
    constructor(private sqlite: SQLite) {
        console.log('Hello SqlLiteProvider Provider');

        this.sqlite.create({
            name: 'data.db',
            location: 'default'
        }).then((db: SQLiteObject) => {
                // here we will assign created db to our var db (see above)
                this.db = db;
                // we can now create the table this way:
            this.db.executeSql("create table if not exists danceMoves(name VARCHAR(32))", {})
                    .then(() => console.log('Executed SQL'))
                .catch(e => console.log(e));
            this.db.executeSql("INSERT INTO danceMoves (name) VALUES ('" + 'tango' + "')", {})
                .then(() => console.log('Executed Insert SQL'))
                .catch(e => console.log(e));

            this.db.executeSql("SELECT * FROM danceMoves", {})
                .then((result) => {
                    console.log(JSON.stringify(result));
                    if (result.rows.length > 0) {
                        console.log('Result' + result.rows.item(0));
                    }
                    console.log("\n" + result.rows.item(0).name);
                    console.log("\n" + 'Rows' + result.rows.length);
                })

                .catch(e => console.log(JSON.stringify(e)));
            }).catch(e => console.log(e));
    }

    addDanceMove(dancemove): void {

        var sql = "INSERT INTO danceMoves (name) VALUES ('" + dancemove + "')";

        this.db.executeSql(sql, {})
            .then(() => console.log("\n" + 'Executed SQL' + sql))
            .catch(e => console.log("Error: " + JSON.stringify(e)));


    }

    getDanceMoves() {
        var sql = "SELECT * FROM danceMoves";

        this.db.executeSql(sql, {})
            .then((result) => {
                console.log(JSON.stringify(result));
                if (result.rows.length > 0) {
                    console.log('Result' + result.rows.item(0));
                }
                console.log("\n" + result.rows.item(0).name);
                console.log("\n" + 'Rows' + result.rows.length);
            })

            .catch(e => console.log(JSON.stringify(e)));
    }

    // here in this provider we create getBalance method, that should be accessible by other pages:
    getBalance() {
    // we will do Promise here:
    return new Promise((resolve, reject) => {
        let balanceQuery = "select sum(trxamount) sumofamount from transactiontable";
            this.db.executeSql(balanceQuery, []).then((data) => {
            let balance = data.rows.item(0).sumofamount;
                // if we successfully obtain data - we resolve it, means it can be available via callback
                resolve(balance)
        }).catch((err) => { console.log(err); reject(err) }) // we deal with errors etc
    })
}
}
