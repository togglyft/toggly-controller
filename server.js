const express = require('express');
const bodyParser = require('body-parser');
const featureRoutes = require('./src/routes/feature.routes')
const configmgr = require('./src/configmgr');

configmgr.init();

const app = express();
const port = process.env.PORT || 4000;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");

  next();
});
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/api/features', featureRoutes)

app.listen(port, () => {
  console.log(`Node server is listening on port ${port}`);
});