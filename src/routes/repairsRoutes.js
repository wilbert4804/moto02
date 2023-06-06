const express = require('express');

const repairController = require('./../controllers/repairsController');

const router = express.Router();

router
  .route('/')
  .get(repairController.findRepairs)
  .post(repairController.addRepair);

router
  .route('/:id')
  .get(repairController.findRepair)
  .patch(repairController.updateRepair)
  .delete(repairController.deleteRepair);

//router.get("/:id", findUser);
//router.get("/", findUsers);
//router.post("/", addUser);
//router.patch("/:id", updateUser);
//router.delete("/:id", deleteUser);

module.exports = router;
