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

const edit = async (req, res, next) => {
  // Extract the category data from the request body and params
  const role = { ...req.body, id: req.params.id };

  try {
    // Update the category in the database
    await tables.role.edit(role);

    // Respond with HTTP 204 (No Content)
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    // Delete the category from the database
    await tables.role.destroy(req.params.id);

    // Respond with HTTP 204 (No Content)
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

module.exports = {
  read,
  readOneById,
  add,
  edit,
  destroy,
};
