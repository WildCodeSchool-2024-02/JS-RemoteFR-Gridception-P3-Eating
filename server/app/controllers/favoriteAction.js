const tables = require("../../database/tables");

const browse = async (req, res, next) => {
  try {
    const favorites = await tables.favorite.browse();
    res.json(favorites);
  } catch (error) {
    next(error);
  }
};

const read = async (req, res, next) => {
  try {
    const favorites = await tables.favorite.read();
    res.json(favorites);
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const favorite = req.body;
  try {
    const insertId = await tables.favorite.add(favorite);
    res.json({ insertId });
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res, next) => {
  const { id } = req.params;
  const updatedFavoriteData = req.body;
  try {
    const success = await tables.favorite.edit(req.params.id, updatedFavoriteData);
    if (success) {
      const updatedFavorite = { id, ...updatedFavoriteData };
      res.json(updatedFavorite);
    } else {
      res.status(404).json({ message: "Favorite not found" });
    }
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    await tables.favorite.destroy(req.params.userId);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};


module.exports = { browse, read, add, edit, destroy };
