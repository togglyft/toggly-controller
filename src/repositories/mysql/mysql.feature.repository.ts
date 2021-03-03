const Feature = require('../../entities/feature.entity.ts')
var mysql = require('mysql');
var pool
var featureTableName = "feature";

exports.init = (configParams) => {
  featureTableName = configParams.table ? configParams.table : featureTableName;
  pool = mysql.createPool({
    connectionLimit: configParams.connections ? configParams.connections : 10,
    host: configParams.host ? configParams.host : "localhost",
    port: configParams.port ? configParams.port : 3306,
    user: configParams.user,
    password: configParams.password,
    database: configParams.database ? configParams.database : "toggly",
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