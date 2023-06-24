const Repairs = require('./../models/repairsModel');
exports.validMiddleware = async (req, res, next) => {
  const { id } = req.params;
  const repair = await Repairs.findOne({
    where: {
      // id: id
      id,
      status: 'pending',
    },
  });
  if (!repair) {
    return res.status(404).json({
      status: 'error',
      message: `The product with id: ${id} not found!😭`,
    });
  }
  req.repair = repair;
  next();
};
