const express = require('express');

const repairController = require('./../controllers/repairsController');
//middlewares
const validMiddleware = require('./../middlewares/validationMiddleware');
const repairMiddleware = require('./../middlewares/repairMiddleware');
const authMiddleware = require('./../middlewares/authMiddleware');
const router = express.Router();

router.use(authMiddleware.protect);
router
  .route('/')
  .get(authMiddleware.restrictTo('employee'), repairController.findRepairs)
  .post(validMiddleware.repairValidation, repairController.addRepair);

router
  .use('/:id', repairMiddleware.validMiddleware)
  .use(authMiddleware.restrictTo('employee'))
  .route('/:id')
  .get(repairController.findRepair)
  .patch(repairController.updateRepair)
  .delete(repairController.deleteRepair);

module.exports = router;
