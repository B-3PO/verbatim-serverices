const keys = require('./keys');
const jwt = require('jsonwebtoken');

exports.verify = (req, res, next) => {
  console.log('req.query.user_token', req.query.user_token);
  jwt.verify(req.query.user_token, keys.apiPublic, { algorithms: 'RS256' }, (err, decoded) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    req.token = req.query.user_token;
    req.tokenData = decoded;
    next();
  });
};

exports.generate = (data) => {
  let token;
  try {
    token = jwt.sign(data, keys.apiPrivate, { algorithm: 'RS256'});
  } catch(e) {
    console.log(e);
  }
  return token;
};

exports.update = (token, data) => {
  let decoded = jwt.decode(token);
  Object.assign(data, decoded);
  return jwt.sign(data, keys.apiPrivate, { algorithm: 'RS256'});
};
