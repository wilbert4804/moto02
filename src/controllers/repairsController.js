const Repairs = require('../models/repairsModel');
const catchAsync = require('../utils/catchAsync');

exports.findRepairs = catchAsync(async (req, res) => {
  //logica
  const repairs = await Repairs.findAll({
    where: {
      status: 'pending',
    },
  });

  return res.status(200).json({
    status: 'success',
    results: repairs.length,
    repairs,
  });
});

exports.updateRepair = catchAsync(async (req, res) => {
  //la parte logica
  const { repair } = req;
  const { date, userId } = req.body;

  await repair.update({ date, userId });
  return res.status(200).json({
    status: 'success',
    repair,
  });
});

exports.addRepair = catchAsync(async (req, res) => {
  const { date, motorsNumber, description, userId } = req.body;
  const repair = await Repairs.create({
    date,
    motorsNumber,
    description,
    userId,
  });

  return res.status(200).json({
    status: 'success',
    repair,
  });
});

exports.findRepair = catchAsync(async (req, res) => {
  const { repair } = req;

  return res.status(200).json({
    status: 'success',
    repair,
  });
});

exports.deleteRepair = catchAsync(async (req, res) => {
  const { repair } = req;
  await repair.update({ status: 'cancelled' });
  return res.status(200).json({
    status: 'success',
    repair,
  });
});
