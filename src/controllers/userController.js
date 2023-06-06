const Users = require('../models/userModel');

exports.findUsers = async (req, res) => {
  try {
    //logica
    const verUsers = await Users.findAll({
      where: {
        status: 'available',
      },
    });
    return res.status(200).json({
      status: 'success',
      verUsers,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'something went very wrong! 🤞',
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const user = await Users.findOne({
      where: {
        //id: id,
        id,
        status: 'available',
      },
    });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: `product with id: ${id} not foun 😒`,
      });
    }
    await user.update({ name, email });
    return res.status(200).json({
      status: 'success',
      message: 'update users',
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'something went very wrong! 🤞',
    });
  }
};

exports.addUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const user = await Users.create({
      name,
      email,
      password,
      role,
    });
    return res.status(200).json({
      status: 'success',
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Something went wrong!',
    });
  }
};

exports.findUser = async (req, res) => {
  // nos traemos el id
  try {
    const { id } = req.params; //DESTRUCION DE OBJETOS

    //? 2. BUSCO EL USUARIO EN LA BASE DE DATOS
    const user = await Users.findOne({
      where: {
        // id: id
        id,
        status: 'available',
      },
    });
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: `The product with id: ${id} not found!😭`,
      });
    }
    return res.status(200).json({
      status: 'success',
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Something went wrong!',
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    // traernos el id de los parametros
    const { id } = req.params;
    // buscar el producto
    const user = await Users.findOne({
      where: {
        id,
        status: 'available',
      },
    });
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: `user with id: ${id} not found!`,
      });
    }
    await user.update({ status: 'disabled' }); //eliminacion logica
    //await product.destroy() //eliminacion fisica
    // enviar respuesta al cliente
    return res.status(200).json({
      status: 'success',
      message: 'the user has been deleted!',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Something went wrong!',
    });
  }
};
