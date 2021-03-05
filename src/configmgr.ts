const fs = require('fs');
const yaml = require('js-yaml')
const CONFIG_FILE = "./src/configuration/configuration.yaml"
const repository = require('./repositories/feature.repository.ts')

exports.init = () => {
  try {
    let config = yaml.safeLoad(fs.readFileSync(CONFIG_FILE, 'utf8'))
    const configWrapper = require('./configWrapper.ts')
    configWrapper.init(config)
    console.log(`StorageStrategy => ${configWrapper.get("storageStrategy")}`)

    initDatabase(configWrapper)
    
  } catch (e) {
    console.log(e);
  }
}

let initDatabase = (configWrapper) => {
  switch(configWrapper.get("storageStrategy")) {
    case "mysql":
      const mysql = require('./repositories/mysql/mysql.feature.repository.ts')
      const configWrapperMysql = require('./configWrapper.ts')
      configWrapperMysql.init(configWrapper.get("mysql"))
      mysql.init(configWrapperMysql)
      repository.init(mysql)
      break;
    case "postgresql":
      break;
    case "inMemory":
      const volatile = require('./repositories/volatile/volatile.feature.repository.ts')
      const configWrapperInMemory = require('./configWrapper.ts')
      configWrapperInMemory.init(configWrapper.get("inMemory"))
      volatile.init(configWrapperInMemory)
      repository.init(volatile)
      break;
    case "etcd":
      break;
    case "redis":
      break;
  }
}