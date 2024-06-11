const tables = require("../../database/tables");

const read = async (req, res, next) => {
  try {
    const users = await tables.user.read();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const readOneById = async (req, res, next) => {
  try {
    const user = await tables.user.readOneById(req.params.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  read,
  readOneById,
};
