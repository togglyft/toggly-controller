const Feature = require('../../entities/feature.entity.ts')
var mysql = require('mysql');
var pool
var featureTableName = "feature";

exports.init = (configWrapper) => {
  featureTableName = configWrapper.get('table') ? configWrapper.get('table') : featureTableName;
  console.log(`tableName => ${configWrapper.get("table")}`)
  pool = mysql.createPool({
    connectionLimit: configWrapper.get('connectionLimit') ? configWrapper.get('connectionLimit') : 10,
    host: configWrapper.get('host') ? configWrapper.get('host') : "localhost",
    port: configWrapper.get('port') ? configWrapper.get('port') : 3306,
    user: configWrapper.get('user'),
    password: configWrapper.get('password'),
    database: configWrapper.get('database') ? configWrapper.get('database') : "toggly",
    typeCast: function castField( field, useDefaultTypeCasting ) {
      // credit: https://www.bennadel.com/blog/3188-casting-bit-fields-to-booleans-using-the-node-js-mysql-driver.htm
      if ( ( field.type === "BIT" ) && ( field.length === 1 ) ) {
        var bytes = field.buffer();
        return( bytes[ 0 ] === 1 );
      }
      return( useDefaultTypeCasting() );
    }
  })

}

exports.findAll = () => {
  return new Promise((res, rej) => {
    pool.query(`SELECT * FROM ${featureTableName}`, function (error, results, fields) {
      if (error){
        rej(error);
      } else {
        res(results.map(r => toFeatureEntity(r)));
      }
    });
  })
}

exports.search = (feature) => {
  return new Promise((res, rej) => {
    pool.query(`
        SELECT * FROM ${featureTableName}
        WHERE 1=1
          ${feature && feature.id ? "AND id=" + feature.id : ""}
          ${feature && feature.name ? "AND name='" + feature.name + "'" : ""}
      `, function (error, results, fields) {
      if (error)
        rej(error)
      else
        res(results.map(r => toFeatureEntity(r)));
    });
  })
}

exports.create = (feature) => {
  return new Promise((res, rej) => {
    pool.query(`INSERT INTO ${featureTableName} SET ?`, feature, function (error, results, fields) {
      if (error)
        rej(error)
      else {
        res({});
      }
    })
  })
}

exports.delete = (feature) => {
  return new Promise((res, rej) => {
    pool.query(`DELETE FROM ${featureTableName} WHERE id=?`, [feature.id], function (error, results, fields) {
      if (error)
        rej(error)
      else {
        res({});
      }
    })
  })
}

exports.update = (feature) => {
  return new Promise((res, rej) => {
    pool.query(`UPDATE ${featureTableName} SET ? WHERE id=?`, [feature, feature.id], function (error, results, fields) {
      if (error)
        rej(error)
      else {
        res({});
      }
    })
  })
}

function toFeatureEntity(result) {
  return new Feature(result.id, result.name, result.enabled);
}