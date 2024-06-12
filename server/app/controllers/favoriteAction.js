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
  const { recipeId, userId } = req.body;

  try {
    const newFavoriteId = await tables.favorite.add(recipeId, userId);
    res.json({ id: newFavoriteId, recipeId, userId });
  } catch (err) {
    next(err);
  }
};

const deleteFav = async (req, res, next) => {
  const { userId, recipeId } = req.params;

  try {
    const favToDelete = await tables.favorite.delete(userId, recipeId);
    res.json(favToDelete);
  } catch (err) {
    next(err);
  }
};

module.exports = { read, readOneById, add, deleteFav };
