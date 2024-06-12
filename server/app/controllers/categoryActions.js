const tables = require("../../database/tables");

const read = async (req, res, next) => {
  try {
    const categories = await tables.category.read();
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

const readOneById = async (req, res, next) => {
  try {
    const category = await tables.category.readOneById(req.params.id);
    res.json(category);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  read,
  readOneById,
};
