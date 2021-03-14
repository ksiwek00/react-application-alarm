import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("siwek_krzysztof_4ic1.db");

export default class Database {
  static createTable() {
    db.transaction(tx => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS alarmDataa (id integer primary key not null, hours text, minutes text, dates text, state text);"
      );
    });
  }

  static add(hours, minutes) {
    db.transaction(
      tx => {
        tx.executeSql(
          `INSERT INTO alarmDataa (hours, minutes, dates, state) values ("` +
            hours +
            `", "` +
            minutes +
            `", '[{"name":"MON","selected":false},{"name":"TUE","selected":false},{"name":"WED","selected":false},{"name":"THU","selected":false},{"name":"FRI","selected":false},{"name":"SAT","selected":false},{"name":"SUN","selected":false}]', 'false')`
        );
      },
      err => console.log("ERROR: " + JSON.stringify(err))
    ),
      () => console.log("dodano rekord do bazy!");
  }

  static switchState(id, state) {
    db.transaction(tx => {
      tx.executeSql(
        "UPDATE alarmDataa SET state = '" + state + "' WHERE id=" + id
      );
    });
  }

  static getAll() {
    var query = "SELECT * FROM alarmDataa";

    return new Promise((resolve, reject) =>
      db.transaction(tx => {
        tx.executeSql(
          query,
          [],
          (tx, results) => {
            //console.log(JSON.stringify(results));

            resolve(JSON.stringify(results));
          },
          function(tx, error) {
            reject(error);
          }
        );
      })
    );
  }

  static remove(id) {
    db.transaction(tx => {
      tx.executeSql("DELETE FROM alarmDataa WHERE (id = " + id + ");");
    });
  }

  static removeAll() {
    db.transaction(tx => {
      tx.executeSql("DELETE FROM alarmDataa ;");
    });
  }
}
