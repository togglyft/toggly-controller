const fs = require('fs');
const yaml = require('js-yaml')
const CONFIG_FILE = "./src/configuration/configuration.yaml"
const repository = require('./repositories/feature.repository')

exports.init = () => {
  try {
    let config = yaml.safeLoad(fs.readFileSync(CONFIG_FILE, 'utf8'))

    console.log(`StorageStrategy => ${config.storageStrategy}`)

    initDatabase(config)
    
  } catch (e) {
    console.log(e);
  }
}

let initDatabase = (config) => {
  switch(config.storageStrategy) {
    case "mysql":
      const mysql = require('./repositories/mysql/mysql.feature.repository')
      mysql.init(config.mysql)
      repository.init(mysql)
      break;
    case "postgresql":
      break;
    case "inMemory":
      const volatile = require('./repositories/volatile/volatile.feature.repository')
      volatile.init(config.inMemory)
      repository.init(volatile)
      break;
    case "etcd":
      break;
    case "redis":
      break;
  }
}