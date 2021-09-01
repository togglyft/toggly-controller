const Feature = require('../entities/feature.entity.ts')
const repository = require('../repositories/feature.repository.ts')
const errors = require('../helpers/errors.ts')
const responseSorter = require('../helpers/sorter.ts')

exports.findAll = (req, res) => {
  return new Promise(resolve => {
    repository.findAll().then(r => {
      res.status(200).send(responseSorter.sort(req, r))
      resolve();
    })
  })
};

exports.findOne = (req, res) => {
  return new Promise(resolve => {
    repository.search(new Feature(req.params.id, null, null))
      .then(r => {
        r ? res.status(200).send(r)
          : res.status(404).send(errors.FEATURE_NOT_FOUND);
        resolve()
      })
      .catch(e => {
        res.status(500).send(e);
        resolve()
      })
  })
};

exports.create = (req, res) => {
  return new Promise(resolve => {
    if (!req.body || !req.body.name || req.body.name.length == 0) {
      res.status(400).send({ message: errors.FEATURE_INCOMPLETE });
      resolve();
    } else {
      repository.create(new Feature(null, req.body.name, req.body.enabled, req.body.relatedTask, req.body.lastModified))
        .then(r => {
          res.sendStatus(201)
          resolve();
        })
        .catch(e => {
          res.status(500).send(e);
          resolve()
        })
    }
  })
};

exports.update = (req, res) => {
  return new Promise(resolve => {
    // Validate Request
    if (!req.body || !req.params || !req.params.id || !req.body.name) {
      (!req.body || !req.body.name) && res.status(400).send({ message: errors.FEATURE_INCOMPLETE });
      (!req.params || !req.params.id) && res.status(400).send({ message: errors.PROVIDE_EXISTING_FEATURE_ID });
      resolve()
    } else {
      repository.update(new Feature(req.params.id, req.body.name, req.body.enabled, req.body.relatedTask, req.body.lastModified))
        .then(r => {
          res.sendStatus(200);
          resolve()
        })
        .catch(e => {
          res.status(500).send(e)
          resolve()
        })
    }

  })
};

exports.delete = (req, res) => {
  return new Promise(resolve => {
    if (!req.params || !req.params.id) {
      res.status(400).send({ message: errors.PROVIDE_EXISTING_FEATURE_ID });
      resolve()
    } else {
      repository.delete(new Feature(req.params.id, null, null))
        .then(r => {
          res.sendStatus(200);
          resolve();
        })
        .catch(e => {
          res.status(500).send(e);
          resolve();
        })
    }
  })
};
