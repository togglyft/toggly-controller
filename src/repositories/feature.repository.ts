let storageClient;
exports.init = (client) => {
  storageClient = client;
}

exports.findAll = () => {
  return storageClient.findAll();
}

exports.search = (feature) => {
  return new Promise((res, rej) => {
    storageClient.search(feature)
    .then(r => res(r[0]))
    .catch(e => rej(e))
  })
}

exports.create = (feature) => {
  return storageClient.create(feature)
}

exports.delete = (feature) => {
  return storageClient.delete(feature)
}

exports.update = (feature) => {
  return storageClient.update(feature)
}