const tables = require("../../database/tables");

const read = async (req, res, next) => {
  try {
    const recipe = await tables.recipe.read();
    res.json(recipe);
  } catch (error) {
    next(error);
  }
};

const readOneById = async (req, res, next) => {
  try {
    const recip = await tables.recipe.readOneById(req.params.id);
    res.json(recip);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  read,
  readOneById,
};
