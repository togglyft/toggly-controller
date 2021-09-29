function Feature(id, name, enabled, relatedTask, lastModified, company_id) {
  this.id = id;
  this.name = name;
  this.enabled = enabled;
  this.relatedTask = relatedTask;
  this.lastModified = lastModified;  
  this.company_id = company_id;  
}

module.exports = Feature