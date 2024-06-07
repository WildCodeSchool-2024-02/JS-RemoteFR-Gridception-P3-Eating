const tables = require("../../database/tables");

const read = async (req, res, next) => {
  try {
    const roles = await tables.roles.read();
    res.json(roles);
  } catch (error) {
    next(error);
  }
};

const readOneById = async (req, res, next) => {
  try {
    const role = await tables.roles.readOneById(req.params.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  read,
  readOneById,
};
