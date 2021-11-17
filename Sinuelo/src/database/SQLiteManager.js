import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(false);
SQLite.enablePromise(true);

import * as schema from './schemas';

const database_name = 'Sinuelo.db';
const database_version = '1.0';
const database_displayname = 'SinueloDB';
const database_size = 200000;

class SQLiteManager {
  constructor() {
    this.type = 'SingletonDefaultExportInstance';
    this.db = null;
  }

  initDB() {
    let db;
    return new Promise((resolve) => {
      SQLite.echoTest()
        .then(() => {
          SQLite.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size,
          )
            .then((DB) => {
              this.db = DB;
              db = DB; 
              resolve(db);
            })
            .catch((error) => {
              //
            });
        })
        .catch((error) => {
          //
        });
    });
  }

  closeDatabase(db) {
    if (db) {
      db.close()
        .then((status) => {
          //
        })
        .catch((error) => {
          this.errorCB(error);
        });
    } else {
      //
    }
  } 

  createTablesFromSchema() {
    if (this.db) {
      this.db.transaction((tx) => {
        for (const name in schema.Tables) {
          this.createTable(tx, schema.Tables[name], name);
        }
      });
    }
  } 

  dropTables() {
    return new Promise((resolve) => {
      this.db.transaction((tx) => {
        for (const name in schema.Tables) { 
          tx.executeSql(`DROP TABLE IF EXISTS ${name}`, []).then(([tx, results]) => {
            resolve(results);
          })
        }
      }).then((result) => {

      }).catch((error) => {
        console.log(error);
      });
    });
  }

  createTable(tx, table, tableName) {
    let sql = `CREATE TABLE IF NOT EXISTS ${tableName} `;
    const createColumns = [];
    for (const key in table) {
      createColumns.push(
        `${key} ${table[key].type.type} ${table[key].primary_key ? 'PRIMARY KEY NOT NULL' : ''
        } default ${table[key].default_value}`,
      );
    }
    sql += `(${createColumns.join(', ')});`;
    tx.executeSql(
      sql,
      [],
      () => {
        //
      },
      () => {
        //
      },
    );
  } 

  //Inserts datasources
  addTableAnimal(animal) {
    return new Promise((resolve) => {
      this.db.transaction((tx) => {
        tx.executeSql('INSERT INTO ANIMAIS VALUES (?, ?, ?)', [
          animal.id,
          animal.nome,
          animal.brinco,
        ]).then(([tx, results]) => {
          resolve(results);
        })
      }).then((result) => {

      }).catch((error) => {
        console.log(error);
      });
    });
  }

  addTableBrinco(brinco) {
    return new Promise((resolve) => {
      this.db.transaction((tx) => {
        tx.executeSql('INSERT INTO BRINCOS VALUES (?, ?, ?)', [
          brinco.id,
          brinco.id_animal,
          brinco.codigo, 
        ]).then(([tx, results]) => {
          resolve(results);
        })
      }).then((result) => {

      }).catch((error) => {
        console.log(error);
      });
    });
  }

  addTableAlerta(alerta) {
    return new Promise((resolve) => {
      this.db.transaction((tx) => {
        tx.executeSql('INSERT INTO ALERTAS VALUES (?, ?)', [
          alerta.id,
          alerta.descricao, 
        ]).then(([tx, results]) => {
          resolve(results);
        })
      }).then((result) => {

      }).catch((error) => {
        console.log(error);
      });
    });
  } 

  addTableVacina(vacina) {
    return new Promise((resolve) => {
      this.db.transaction((tx) => {
        tx.executeSql('INSERT INTO VACINAS VALUES (?, ?)', [
          vacina.id,
          vacina.descricao, 
        ]).then(([tx, results]) => {
          resolve(results);
        })
      }).then((result) => {

      }).catch((error) => {
        console.log(error);
      });
    });
  } 

  addTableDoenca(doenca) {
    return new Promise((resolve) => {
      this.db.transaction((tx) => {
        tx.executeSql('INSERT INTO DOENCAS VALUES (?, ?)', [
          doenca.id,
          doenca.descricao, 
        ]).then(([tx, results]) => {
          resolve(results);
        })
      }).then((result) => {

      }).catch((error) => {
        console.log(error);
      });
    });
  } 

  addTableMedicamento(medicamento) {
    return new Promise((resolve) => {
      this.db.transaction((tx) => {
        tx.executeSql('INSERT INTO MEDICAMENTOS VALUES (?, ?)', [
          medicamento.id,
          medicamento.descricao, 
        ]).then(([tx, results]) => {
          resolve(results);
        })
      }).then((result) => {

      }).catch((error) => {
        console.log(error);
      });
    });
  } 

  //Select datasources
  getAnimais() {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql('SELECT ID, NOME, BRINCO FROM ANIMAIS', []).then(([tx, results]) => {
          resolve(results);
        })
      }).then((result) => {
        reject(result);
      }).catch((error) => {
        reject(error);
      });
    });
  } 

  getAlertas() {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql('SELECT ID, DESCRICAO FROM ALERTAS', []).then(([tx, results]) => {
          resolve(results);
        })
      }).then((result) => {
        reject(result);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  getVacinas() {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql('SELECT ID, DESCRICAO FROM VACINAS', []).then(([tx, results]) => {
          resolve(results);
        })
      }).then((result) => {
        reject(result);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  getDoencas() {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql('SELECT ID, DESCRICAO FROM DOENCAS', []).then(([tx, results]) => {
          resolve(results);
        })
      }).then((result) => {
        reject(result);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  getMedicamentos() {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql('SELECT ID, DESCRICAO FROM MEDICAMENTOS', []).then(([tx, results]) => {
          resolve(results);
        })
      }).then((result) => {
        reject(result);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  getBrincoByCodigo(codigo) {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql('SELECT ID, ID_ANIMAL FROM BRINCOS WHERE CODIGO = ?', [codigo]).then(([tx, results]) => {
          resolve(results);
        })
      }).then((result) => {
        reject(result);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  getAlertaByCodigo(codigo) {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql(`
          SELECT A.NOME, AL.DESCRICAO
          FROM BRINCOS B 
            INNER JOIN ANIMAIS A ON B.ID_ANIMAL = A.ID
            INNER JOIN HISTORICO_ALERTAS H ON A.ID = H.ID_ANIMAL
            INNER JOIN ALERTAS AL ON H.ID_ALERTA = AL.ID
          WHERE B.CODIGO = ? 
        `, [codigo]).then(([tx, results]) => {
          resolve(results);
        })
      }).then((result) => {
        reject(result);
      }).catch((error) => {
        reject(error);
      });
    }); 
  }

  //Inserts historicos 
  verificarAlerta(alerta) {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql('SELECT ID FROM HISTORICO_ALERTAS WHERE ID_ALERTA = ? AND ID_ANIMAL = ?', [alerta.idAlerta, alerta.idAnimal]).then(([tx, results]) => {
          resolve(results);
        })
      }).then((result) => {
        reject(result);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  addAlerta(alerta) {
    return new Promise((resolve) => {
      this.db.transaction((tx) => {
        tx.executeSql(`INSERT INTO HISTORICO_ALERTAS (ID_ALERTA, ID_ANIMAL, DATA, HORA) VALUES (?, ?, DATE('NOW'), TIME('NOW'))`, [
          alerta.idAlerta,
          alerta.idAnimal, 
        ]).then(([tx, results]) => {
          resolve(results);
        })
      }).then((result) => {

      }).catch((error) => {
        console.log(error);
      });
    });
  }
 
  addPeso(peso) {
    return new Promise((resolve) => {
      this.db.transaction((tx) => {
        tx.executeSql(`INSERT INTO HISTORICO_PESAGENS (ID_ANIMAL, PESO, OBSERVACAO, DATA, HORA) VALUES (?, ?, ?, DATE('NOW'), TIME('NOW'))`, [
          peso.idAnimal,
          peso.peso, 
          peso.observacao
        ]).then(([tx, results]) => {
          resolve(results);
        })
      }).then((result) => {

      }).catch((error) => {
        console.log(error);
      });
    });
  }

  addVacina(vacina) {
    return new Promise((resolve) => {
      this.db.transaction((tx) => {
        tx.executeSql(`INSERT INTO HISTORICO_VACINAS (ID_VACINA, ID_ANIMAL, OBSERVACAO, DATA, HORA) VALUES (?, ?, ?, DATE('NOW'), TIME('NOW'))`, [
          vacina.idVacina,
          vacina.idAnimal, 
          vacina.observacao
        ]).then(([tx, results]) => {
          resolve(results);
        })
      }).then((result) => {

      }).catch((error) => {
        console.log(error);
      });
    });
  }

  addDoenca(doenca) {
    return new Promise((resolve) => {
      this.db.transaction((tx) => {
        tx.executeSql(`INSERT INTO HISTORICO_DOENCAS (ID_DOENCA, ID_ANIMAL, OBSERVACAO, DATA, HORA) VALUES (?, ?, ?, DATE('NOW'), TIME('NOW'))`, [
          doenca.idDoenca,
          doenca.idAnimal, 
          doenca.observacao 
        ]).then(([tx, results]) => {
          resolve(results);
        })
      }).then((result) => {

      }).catch((error) => {
        console.log(error);
      });
    });
  }

  addMedicamento(medicamento) {
    return new Promise((resolve) => {
      this.db.transaction((tx) => {
        tx.executeSql(`INSERT INTO HISTORICO_MEDICAMENTOS (ID_MEDICAMENTO, ID_ANIMAL, OBSERVACAO, DATA, HORA) VALUES (?, ?, ?, DATE('NOW'), TIME('NOW'))`, [
          medicamento.idMedicamento,
          medicamento.idAnimal, 
          medicamento.observacao 
        ]).then(([tx, results]) => {
          resolve(results);
        })
      }).then((result) => {

      }).catch((error) => {
        console.log(error);
      });
    });
  }

  //Selects históricos
  getHistoricoAlertas() {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql('SELECT ID_ALERTA, ID_ANIMAL, DATA, HORA FROM HISTORICO_ALERTAS ORDER BY DATA, HORA', []).then(([tx, results]) => {
          resolve(results);
        })
      }).then((result) => {
        reject(result);
      }).catch((error) => {
        reject(error);
      });
    });
  } 

  getHistoricoPesagens() {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql('SELECT ID_ANIMAL, PESO, OBSERVACAO, DATA, HORA FROM HISTORICO_PESAGENS ORDER BY DATA, HORA', []).then(([tx, results]) => {
          resolve(results);
        })
      }).then((result) => {
        reject(result);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  getHistoricoVacinas() {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql('SELECT ID_VACINA, ID_ANIMAL, OBSERVACAO, DATA, HORA FROM HISTORICO_VACINAS ORDER BY DATA, HORA', []).then(([tx, results]) => {
          resolve(results);
        })
      }).then((result) => {
        reject(result);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  getHistoricoDoencas() {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql('SELECT ID_DOENCA, ID_ANIMAL, OBSERVACAO, DATA, HORA FROM HISTORICO_DOENCAS ORDER BY DATA, HORA', []).then(([tx, results]) => {
          resolve(results);
        })
      }).then((result) => {
        reject(result);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  getHistoricoMedicamentos() {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql('SELECT ID_MEDICAMENTO, ID_ANIMAL, OBSERVACAO, DATA, HORA FROM HISTORICO_MEDICAMENTOS ORDER BY DATA, HORA', []).then(([tx, results]) => {
          resolve(results);
        })
      }).then((result) => {
        reject(result);
      }).catch((error) => {
        reject(error);
      });
    });
  }
}

export default new SQLiteManager();