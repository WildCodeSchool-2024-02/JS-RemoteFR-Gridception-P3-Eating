const tables = require("../../database/tables");

const browse = async (req, res, next) => {
  try {
    const roles = await tables.role.browse();
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

const edit = async (req, res, next) => {
  const role = { ...req.body, id: req.params.id };

  try {
    await tables.role.edit(role);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    await tables.role.destroy(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  browse,
  readOneById,
  add,
  edit,
  destroy,
};
