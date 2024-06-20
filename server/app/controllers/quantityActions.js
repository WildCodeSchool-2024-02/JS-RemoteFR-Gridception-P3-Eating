const tables = require("../../database/tables");

const read = async (req, res, next) => {
  try {
    const quantities = await tables.quantity.read();
    res.json(quantities);
  } catch (error) {
    next(error);
  }
};

const readOneById = async (req, res, next) => {
  try {
    const quantity = await tables.quantity.readOneById(req.params.id);
    res.json(quantity);
  } catch (error) {
    next(error);
  }
};

const readByRecipeId = async (req, res, next) => {
  try {
    const quantity = await tables.quantity.readByRecipeId(req.params.id);
    res.json(quantity);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  read,
  readOneById,
  readByRecipeId,
};
