const tables = require("../../database/tables");

const read = async (req, res, next) => {
  try {
    const favorites = await tables.favorite.read();
    res.json(favorites);
  } catch (err) {
    next(err);
  }
};

const readOneById = async (req, res, next) => {
  try {
    const favorite = await tables.favorite.readOneById(req.params.id);
    res.json(favorite);
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const favorite = req.body;
  // console.log(favorite);
  try {
    const insertId = await tables.favorite.add(favorite);
    res.json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    await tables.favorite.destroy(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
module.exports = { read, readOneById, add, destroy };
