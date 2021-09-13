function Feature(id, name, enabled, relatedTask, lastModified) {
  this.id = id;
  this.name = name;
  this.enabled = enabled;
  this.relatedTask = relatedTask;
  this.lastModified = lastModified;  
}

module.exports = Feature