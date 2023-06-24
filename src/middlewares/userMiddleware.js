const Users = require('../models/userModel');
exports.validUser = async (req, res, next) => {
  const { id } = req.params;
  const user = await Users.findOne({
    where: {
      // id: id
      id,
      status: 'available',
    },
  });
  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: `The product with id: ${id} not found!😭`,
    });
  }
  req.user = user;
  next();
};
exports.UserEmail = async (req, res, next) => {
  const { email } = req.body;

  const user = await Users.findOne({
    where: {
      email: email.toLowersCase(),
      status: 'available',
    },
  });
  if (!user) {
    return res.status(400).json({
      status: 'error',
      message: `User with email: ${email} not found`,
    });
  }
  req.user = user;
  next();
};
