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

const deleteFav = async (req, res, next) => {
  const { id } = req.params;

  try {
    const success = await tables.favorite.destroy(id);
    if (success) {
      res.json({ message: "Favorite deleted successfully" });
    } else {
      res.status(404).json({ message: "Favorite not found" });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { read, readOneById, add, deleteFav };
