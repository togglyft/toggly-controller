const Feature = require('../entities/feature.entity')

let features = [
  new Feature(1, 'Feature 1', false),
  new Feature(2, 'Feature 2', true),
  new Feature(3, 'Feature 3', true),
  new Feature(4, 'Feature 4', false),
]

exports.findAll = (req, res) => {
  console.log(features)
  res.send(features)
};

exports.create = (req, res) => {
  console.log("create");
  console.log(req.body)
  if (!req.body || !req.body.name) {
    return res.status(400).send({
      message: "Please fill all required fields"
    });
  }
  const feature = new Feature(features.length+1, req.body.name, req.body.enabled);

  features.push(feature);
  res.status(200).send(feature)
};

exports.findOne = (req, res) => {
  console.log("findOne");
  const feature = features.find(f => f.id == req.params.id);
  feature
    ? res.status(200).send(feature)
    : res.status(400).send("Feature not found");
};

exports.update = (req, res) => {
  console.log("update");
  // Validate Request
  if (!req.body) {
    return res.status(400).send({
      message: "Please fill all required fields"
    });
  }

  const feature = features.find(f => f.id == req.params.id);
  if(!feature) {
    res.status(400).send("Feature not found");
  } else {
    feature.name = req.body.name;
    feature.enabled = req.body.enabled;
    res.status(200).send(feature);
  } 
};

exports.delete = (req, res) => {
  console.log("delete");
  const feature = features.find(f => f.id == req.params.id);
  features = features.filter(f => f.id != req.params.id)
  console.log(features)
  feature
    ?  res.sendStatus(200)
    : res.status(400).send("Feature not found");
};