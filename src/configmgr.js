const fs = require('fs');
const yaml = require('js-yaml')
const CONFIG_FILE = "./src/configuration/configuration.yaml"
const repository = require('./repositories/feature.repository')

exports.init = () => {
  try {
    let config = yaml.safeLoad(fs.readFileSync(CONFIG_FILE, 'utf8'))

    initDatabase(config)
    
    console.log(config);
  } catch (e) {
    console.log(e);
  }
}

let initDatabase = (config) => {
  switch(config.storageStrategy) {
    case "mysql":
      const mysql = require('./repositories/mysql.feature.repository')
      mysql.init(config.mysql)
      repository.init(mysql)
      console.log(repository)
      break;
    case "postgresql":
      break;
    case "in-memory":
      break;
    case "etcd":
      break;
    case "redis":
      break;
  }
}