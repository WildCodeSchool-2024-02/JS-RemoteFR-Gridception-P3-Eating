const CategoryRepository = require('../../database/models/CategoryRepository');

const categoryRepo = new CategoryRepository();

const browse = async (req, res, next ) => {
  try {
    const categories = await categoryRepo.browse();
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

const read = async (req, res, next) => {
  try {
    const category = await categoryRepo.read(req.params.id);
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
      const insertedId = await categoryRepo.add(newCategoryData);
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
      const success = await categoryRepo.edit(req.params.id, updatedCategoryData);
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
      const success = await categoryRepo.delete(id);
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
