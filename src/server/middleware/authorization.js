const { User } = require('../models/index');

async function authorization(req, res, next) {
  const token = req.headers.authorization;
  const user = await User.findOne({ token });
  if (user || process.env.authorizationOff) {
    next();
  } else {
    res.status = 403;
    res.send({ data: 'null', errors: [{ message: 'not Authorized', status: 403 }] });
  }
}
module.exports = authorization;
