const Feature = require('../../entities/feature.entity.ts');
const errors = require('../../helpers/errors.ts')
let repository;

exports.init = (configParams) => {
  repository = []
}

exports.findAll = () => {
  return new Promise(res => {
    res(repository);
  })
}

exports.search = (feature) => {
  return new Promise((res, rej) => {
    feature && (feature.id || feature.name)
      ? res(
        repository
          .filter(r => feature && feature.id ? r.id == feature.id : true)
          .filter(r => feature && feature.name ? r.name === feature.name : true)
      )
      : rej(errors.NO_ATTTRIBUTE_SPECIFIED)
  })
}

exports.create = (feature) => {
  return new Promise((res, rej) => {
    if (feature && feature.name) {
      if (repository.filter(f => f.name === feature.name).length == 0) {
        feature.id = nextId();
        repository.push(feature)
        res(feature);
      } else {
        rej(errors.FEATURE_ALREADY_EXISTS)
      }
    } else {
      rej(errors.FEATURE_INCOMPLETE)
    }
  })
}

exports.delete = (feature) => {
  return new Promise((res, rej) => {
    if (feature && feature.id) {
      repository = repository.filter(f => f.id != feature.id)
      res({})
    } else {
      rej(errors.PROVIDE_FEATURE_ID)
    }
  })
}

exports.update = (feature) => {
  return new Promise((res, rej) => {
    if (!feature || !feature.id) {
      rej(errors.PROVIDE_EXISTING_FEATURE_ID)
    } else if (!feature.name) {
      rej(errors.FEATURE_INCOMPLETE)
    } else if (repository.filter(f => f.name === feature.name && f.id != feature.id).length > 0) {
      rej(errors.FEATURE_ALREADY_EXISTS)
    } else {
      repository
        .filter(f => f.id == feature.id)
        .forEach(f => {
          f.name = feature.name;
          f.enabled = feature.enabled
        })
      res(feature)
    }
  })
}

let nextId = () => {
  return repository.length > 0
    ? Math.max(...repository.map(f => f.id)) + 1
    : 1
}