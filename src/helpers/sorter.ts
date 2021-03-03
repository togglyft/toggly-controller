exports.sort = (req, res) => {
  if(req.query && (req.query.sort || req.query.desc)){
    const sortBy = req.query.sort || req.query.desc
    if(sortBy.toLowerCase()==='name'){
      return internalSort(req, res, (f) => f.name)
    } else if(sortBy.toLowerCase()==='id'){
      return internalSort(req, res, (f) => f.id)
    }
  } 
  
  return res;
}

const internalSort = (req, res, getProperty) => {
  const order = getOrder(req)
  return res.sort((a,b) => getProperty(a) < getProperty(b) ? order : -order)
}

const getOrder = (req) => {
  return req.query.sort ? -1 : 1;
}