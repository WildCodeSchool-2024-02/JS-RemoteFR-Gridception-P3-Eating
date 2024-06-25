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

const add = async (req, res, next) => {
  const role = req.body;

  try {
    const insertId = await tables.role.add(role);
    res.json({ insertId });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  read,
  readOneById,
  add,
};
