let config;
const ENVIRONMENT_PLACEHOLDER_REGEX = '\\$\{(.*)\}';

exports.init = (configParams) => {
  config = configParams
}

exports.get = (path) => {
  if (config[path] && config[path].match &&  config[path].match(ENVIRONMENT_PLACEHOLDER_REGEX)) {
    return process.env[config[path].match(ENVIRONMENT_PLACEHOLDER_REGEX)[1]];
  } else{
    return config[path];
  }
}
