const Feature = require('../entities/feature.entity')
var mysql = require('mysql');
var pool
const FEATURE_TABLE_NAME = "feature"

exports.init = (configParams) => {
  pool = mysql.createPool({
    connectionLimit: configParams.connections ? configParams.connections : 10,
    host: configParams.host ? configParams.host : "localhost",
    port: configParams.port ? configParams.port : 3306,
    user: configParams.user,
    password: configParams.password,
    database: configParams.database ? configParams.database : "toggly"
  })

}

exports.findAll = () => {
  return new Promise((res, rej) => {
    pool.query(`SELECT * FROM ${FEATURE_TABLE_NAME}`, function (error, results, fields) {
      if (error)
        rej(error);
      else
        res(results.map(r => toFeatureEntity(r)));
    });
  })
}

exports.search = (feature) => {
  return new Promise((res, rej) => {
    pool.query(`
        SELECT * FROM ${FEATURE_TABLE_NAME}
        WHERE 1=1
          ${feature && feature.id ? "AND id=" + feature.id : ""}
          ${feature && feature.name ? "AND name=" + feature.name : ""}
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
    pool.query(`INSERT INTO ${FEATURE_TABLE_NAME} SET ?`, feature, function (error, results, fields) {
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
    pool.query(`DELETE FROM ${FEATURE_TABLE_NAME} WHERE id=?`, [feature.id], function (error, results, fields) {
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
    pool.query(`UPDATE ${FEATURE_TABLE_NAME} SET ? WHERE id=?`, [feature, feature.id], function (error, results, fields) {
      if (error)
        rej(error)
      else {
        res({});
      }
    })
  })
}


function toFeatureEntity(result) {
  return new Feature(result.id, result.name, result.enabled == 1);
}