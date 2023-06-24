const { validationResult, body } = require('express-validator');

const validateFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }

  next();
};

exports.loginValidataion = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Must be a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('password must be at leat 8 characters long'),
  validateFields,
];

exports.UserValidation = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Must be a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Pasword cannot be empty')
    .isLength({ min: 8 })
    .withMessage('password must be at leat 8 characters long'),
  validateFields,
];
exports.repairValidation = [
  body('date').notEmpty().withMessage('date cannot be null'),
  body('motorsNumber').notEmpty().withMessage('motorsNumber cannot be null'),
  body('description').notEmpty().withMessage('descriptip cannot be null'),
  body('userId').notEmpty().withMessage('userId cannot be null'),
  validateFields,
];
