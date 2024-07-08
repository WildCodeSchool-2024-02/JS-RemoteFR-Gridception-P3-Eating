const tables = require("../../database/tables");

const browse = async (req, res, next) => {
  try {
    const recipes = await tables.recipe.browse();
    res.json(recipes);
  } catch (error) {
    next(error);
  }
};

const readOneById = async (req, res, next) => {
  try {
    const recipes = await tables.recipe.readOneById(req.params.id);
    res.json(recipes);
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  try {
    const recipe = await tables.recipe.add(req.body);
    res.status(201).json({ recipe });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const edit = async (req, res, next) => {
  try {
    const affectedRows = await tables.recipe.edit(req.params.id, req.body);
    if (affectedRows > 0) {
      res.json({ message: "Recipe updated successfully" });
    } else {
      res.status(404).json({ message: "Recipe not found" });
    }
  } catch (error) {
    next(error);
  }
};

const deleteRecipe = async (req, res, next) => {
  try {
    await tables.recipe.delete(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  browse,
  readOneById,
  add,
  edit,
  deleteRecipe,
};
