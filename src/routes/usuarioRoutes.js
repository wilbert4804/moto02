const express = require('express');

const userController = require('./../controllers/userController');

const router = express.Router();

router.route('/').get(userController.findUsers).post(userController.addUser);

router
  .route('/:id')
  .get(userController.findUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

//router.get("/:id", findUser);
//router.get("/", findUsers);
//router.post("/", addUser);
//router.patch("/:id", updateUser);
//router.delete("/:id", deleteUser);

module.exports = router;
