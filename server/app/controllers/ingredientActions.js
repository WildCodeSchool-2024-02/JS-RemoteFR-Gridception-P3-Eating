const tables = require("../../database/tables");

const read = async (req, res, next) => {
  try {
    const ingredients = await tables.ingredient.read();
    res.json(ingredients);
  } catch (error) {
    next(error);
  }
};

const readOneById = async (req, res, next) => {
  try {
    const ingredient = await tables.ingredient.readOneById(req.params.id);
    res.json(ingredient);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  read,
  readOneById,
};
