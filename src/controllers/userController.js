const Users = require('../models/userModel');
const bcrypt = require('bcryptjs');
//controla los errores catchAsync
const catchAsync = require('../utils/catchAsync');
const generateJWT = require('../utils/jwt');
exports.findUsers = catchAsync(async (req, res) => {
  //logica
  const verUsers = await Users.findAll({
    where: {
      status: 'available',
    },
  });
  return res.status(200).json({
    status: 'success ✌️',
    results: verUsers.length,
    verUsers,
  });
});
exports.addUser = catchAsync(async (req, res) => {
  const { name, email, password, role } = req.body;

  const user = await Users.create({
    name,
    email,
    password,
    role,
  });
  const token = await generateJWT(user.id);
  return res.status(200).json({
    status: 'success',
    token,
    user,
  });
});

exports.updateUser = catchAsync(async (req, res) => {
  const { name, email } = req.body;
  const { user } = req;
  await user.update({ name, email });
  return res.status(200).json({
    status: 'success',
    message: 'update users 👍',
  });
});

exports.findUser = catchAsync(async (req, res) => {
  // nos traemos el id

  const { user } = req;
  return res.status(200).json({
    status: 'success',
    user,
  });
});

exports.deleteUser = catchAsync(async (req, res) => {
  const { user } = req;
  await user.update({ status: 'disabled' });
  return res.status(200).json({
    status: 'success 😒',
    message: 'the user has been deleted! 😒',
  });
});

exports.login = async (req, res, next) => {
  const { user } = req;
  const { password } = req.body;
  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({
      status: 'error',
      message: 'Incorrect email or password',
    });
  }
  const token = await generateJWT(user.id);
  res.status(200).json({
    status: 'success✌️',
    token,
    user,
  });
};
