const User = require('./../models/userModel');
exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await User.create({ name, email, password, role });
    res.status(200).json({
      status: 'success 🤞',
      message: 'user created 🙃',
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      message: 'someting went very wrong 🦖',
    });
  }
};
