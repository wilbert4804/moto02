const express = require('express');

const userController = require('./../controllers/userController');
//middleware
const userMiddleware = require('./../middlewares/userMiddleware');
const validMiddleware = require('./../middlewares/validationMiddleware');
const authMiddleware = require('./../middlewares/authMiddleware');
const router = express.Router();

router
  .route('/')
  .get(authMiddleware.protect, userController.findUsers)
  .post(validMiddleware.UserValidation, userController.addUser);

router.post('/login', userMiddleware.UserEmail, userController.login);
router.use(authMiddleware.protect);
router
  .use(userMiddleware.validUser)
  .route('/:id')
  .get(userController.findUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
