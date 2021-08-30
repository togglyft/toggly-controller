function Feature(id, name, enabled, lastModified, relatedTask) {
  this.id = id;
  this.name = name;
  this.enabled = enabled;
  this.lastModified = lastModified;
  this.relatedTask = relatedTask;
}

module.exports = Feature