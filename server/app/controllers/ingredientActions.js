const tables = require("../../database/tables");

const browse = async (req, res, next) => {
  try {
    const ingredients = await tables.ingredient.browse();
    res.json(ingredients);
  } catch (error) {
    next(error);
  }
};

const read = async (req, res, next) => {
  try {
    const ingredient = await tables.ingredient.read(req.params.id);
    if (ingredient) {
      res.json(ingredient);
    } else {
      res.status(404).json({ message: "Ingredient not found" });
    }
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  const { ingredientInfo } = req.body;

  try {
    const insertedId = await tables.ingredient.add(ingredientInfo);

    const insertedIngredient = { id: insertedId, ...ingredientInfo };

    res.status(201).json(insertedIngredient);
  } catch (error) {
    next(error);
  }
};

const edit = async (req, res, next) => {
  const { id } = req.params;
  const updatedIngredientData = req.body;
  try {
    const success = await tables.ingredient.edit(
      req.params.id,
      updatedIngredientData
    );
    if (success) {
      const updatedIngredient = { id, ...updatedIngredientData };
      res.json(updatedIngredient);
    } else {
      res.status(404).json({ message: "Ingredient not found" });
    }
  } catch (error) {
    next(error);
  }
};

const deleteIngredient = async (req, res, next) => {
  const { id } = req.params;
  try {
    const success = await tables.ingredient.delete(id);
    if (success) {
      res.json({ message: "Ingredient deleted successfully" });
    } else {
      res.status(404).json({ message: "Ingredient not found" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  browse,
  read,
  add,
  edit,
  deleteIngredient,
};
