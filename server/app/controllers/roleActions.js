const tables = require("../../database/tables");

const read = async (req, res, next) => {
  try {
    const roles = await tables.role.read();
    res.json(roles);
  } catch (error) {
    next(error);
  }
};

const readOneById = async (req, res, next) => {
  try {
    const role = await tables.role.readOneById(req.params.id);
    res.json(role);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  read,
  readOneById,
};
