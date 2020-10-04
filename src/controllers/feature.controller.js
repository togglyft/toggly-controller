const Feature = require('../entities/feature.entity')
const repository = require('../repositories/feature.repository')

exports.findAll = (req, res) => {
  repository.findAll().then(r => {
    console.log(r)
    res.status(200).send(r)
  })
};

exports.findOne = (req, res) => {
  repository.search(new Feature(req.params.id, null, null))
  .then(r => {
    r ? res.status(200).send(r)
      : res.status(400).send("Feature not found")
  })
  .catch(e => res.status(500).send(e))
};

exports.create = (req, res) => {
  if (!req.body || !req.body.name) {
    return res.status(400).send({
      message: "Please fill all required fields"
    });
  }
  repository.create(new Feature(null, req.body.name, req.body.enabled))
  .then(r => {
    console.log("created")
    res.sendStatus(200)
  })
  .catch(e => res.status(500).send(e))
};

exports.update = (req, res) => {
  console.log("update");
  // Validate Request
  if (!req.body) {
    return res.status(400).send({
      message: "Please fill all required fields"
    });
  }

  repository.update(new Feature(req.params.id, req.body.name, req.body.enabled))
  .then(r => res.sendStatus(200))
  .catch(e => res.status(500).send(e))
};

exports.delete = (req, res) => {
  repository.delete(new Feature(req.params.id, null, null))
  .then(r => res.sendStatus(200))
  .catch(e => res.status(500).send(e))
};