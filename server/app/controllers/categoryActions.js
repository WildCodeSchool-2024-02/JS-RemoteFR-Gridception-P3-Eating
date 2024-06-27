const tables = require("../../database/tables");

const browse = async (req, res, next ) => {
  try {
    const categories = await tables.category.browse();
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

const read = async (req, res, next) => {
  try {
    const category = await tables.category.read(req.params.id);
    if (category) {
      res.json(category);
      } else {
        res.status(404).json({ message: 'Category not found'});
      }
    } catch (error) {
      next(error);
    }
  };

  const add = async (req, res, next) => {
    const newCategoryData = req.body;
    try {
      const insertedId = await tables.category.add(newCategoryData);
      const insertedCategory = { id: insertedId, ...newCategoryData };
      res.status(201).json(insertedCategory);
    } catch (error) {
      next(error);
    }
  };

  const edit = async (req, res, next) => {
    const { id } = req.params;
    const updatedCategoryData = req.body;
    try {
      const success = await tables.category.edit(req.params.id, updatedCategoryData);
      if (success) {
        const updatedCategory = { id, ...updatedCategoryData };
        res.json(updatedCategory);
      } else {
        res.status(404).json({ message: 'Category not found' });
      }
    } catch(error) {
      next(error);
    }
  };

  const deleteCategory = async (req, res, next) => {
    const { id } = req.params;
    try {
      const success = await tables.category.delete(id);
      if (success) {
        res.json({ message: 'Category deleted successfully' });
      } else {
        res.status(404).json({ message: 'Category not found' });
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
  deleteCategory
};
