const Repairs = require('../models/repairsModel');

exports.findRepairs = async (req, res) => {
  try {
    //logica
    const repairs = await Repairs.findAll({
      where: {
        status: 'pending',
      },
    });

    return res.status(200).json({
      status: 'success',
      repairs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'something went very wrong! 🤞',
    });
  }
};

exports.updateRepair = async (req, res) => {
  try {
    //la parte logica
    const { id } = req.params;
    const { date, userId } = req.body;
    const repair = await Repairs.findOne({
      where: {
        //id: id,
        id,
        status: 'pending',
      },
    });

    if (!repair) {
      return res.status(404).json({
        status: 'error',
        message: `product with id: ${id} not foun 😒`,
      });
    }
    await repair.update({ date, userId });
    return res.status(200).json({
      status: 'success',
      repair,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'something went very wrong! 🤞',
    });
  }
};

exports.addRepair = async (req, res) => {
  try {
    const { date, userId } = req.body;
    const repair = await Repairs.create({ date, userId });

    return res.status(200).json({
      status: 'success',
      repair,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Something went wrong!',
    });
  }
};

exports.findRepair = async (req, res) => {
  // nos traemos el id
  try {
    const { id } = req.params; //DESTRUCION DE OBJETOS

    //? 2. BUSCO EL USUARIO EN LA BASE DE DATOS
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
    return res.status(200).json({
      status: 'success',
      repair,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Something went wrong!',
    });
  }
};

exports.deleteRepair = async (req, res) => {
  try {
    // traernos el id de los parametros
    const { id } = req.params;
    // buscar el producto
    const repair = await Repairs.findOne({
      where: {
        id,
        status: 'pending',
      },
    });
    if (!repair) {
      return res.status(404).json({
        status: 'error',
        message: `user with id: ${id} not found!`,
      });
    }
    await repair.update({ status: 'cancelled' });
    return res.status(200).json({
      status: 'success',
      repair,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Something went wrong!',
    });
  }
};
