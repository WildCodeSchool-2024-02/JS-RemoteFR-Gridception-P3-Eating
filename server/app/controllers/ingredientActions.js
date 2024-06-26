// ingredientActions.js
const IngredientRepository = require('../../database/models/IngredientRepository');

const ingredientRepo = new IngredientRepository();

const browse = async (req, res, next) => {
  try {
    const ingredients = await ingredientRepo.browse();
    res.json(ingredients);
  } catch (error) {
    next(error);
  }
};

const read = async (req, res, next) => {
  try {
    const ingredient = await ingredientRepo.read(req.params.id);
    if (ingredient) {
      res.json(ingredient);
    } else {
      res.status(404).json({ message: 'Ingredient not found' });
    }
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  const newIngredientData = req.body;
  try {
    const insertedId = await ingredientRepo.add(newIngredientData);
    const insertedIngredient = { id: insertedId, ...newIngredientData };
    res.status(201).json(insertedIngredient);
  } catch (error) {
    next(error);
  }
};

const edit = async (req, res, next) => {
  const { id } = req.params;
  const updatedIngredientData = req.body;
  try {
    const success = await ingredientRepo.edit(req.params.id, updatedIngredientData);
    if (success) {
      const updatedIngredient = { id, ...updatedIngredientData };
      res.json(updatedIngredient);
    } else {
      res.status(404).json({ message: 'Ingredient not found' });
    }
  } catch (error) {
    next(error);
  }
};

const deleteRecipe = async (req, res, next) => {
  const { id } = req.params;
  try {
    const success = await ingredientRepo.delete(id);
    if (success) {
      res.json({ message: 'Ingredient deleted successfully' });
    } else {
      res.status(404).json({ message: 'Ingredient not found' });
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
  deleteRecipe
};
