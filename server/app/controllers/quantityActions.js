const tables = require("../../database/tables");


const browse = async (req, res, next) => {
  try {
    const quantities = await tables.quantity.browse();
    res.json(quantities);
  } catch (error) {
    next(error);
  }
};

const read = async (req, res, next) => {
  const { id } = req.params;
  try {
    const quantity = await tables.quantity.read(id);
    if (quantity) {
      res.json(quantity);
    } else {
      res.status(404).json({ message: 'Quantity not found' });
    }
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  const newQuantityData = req.body;
  try {
    const insertedId = await tables.quantity.add(newQuantityData);
    const insertedQuantity = { id: insertedId, ...newQuantityData };
    res.status(201).json(insertedQuantity);
  } catch (error) {
    next(error);
  }
};

const edit = async (req, res, next) => {
  const { id } = req.params;
  const updatedQuantityData = req.body;
  try {
    const success = await tables.quantity.edit(id, updatedQuantityData);
    if (success) {
      const updatedQuantity = { id, ...updatedQuantityData };
      res.json(updatedQuantity);
    } else {
      res.status(404).json({ message: 'Quantity not found' });
    }
  } catch (error) {
    next(error);
  }
};

const deleteQuantity = async (req, res, next) => {
  const { id } = req.params;
  try {
    const success = await tables.quantity.delete(id);
    if (success) {
      res.json({ message: 'Quantity deleted successfully' });
    } else {
      res.status(404).json({ message: 'Quantity not found' });
    }
  } catch (error) {
    next(error);
  }
};

const readByRecipeId = async (req, res, next) => {
  try {
    const quantity = await tables.quantity.readByRecipeId(req.params.id);
    res.json(quantity);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  browse,
  read,
  readOneById,
  readByRecipeId,
  add,
  edit,
  deleteQuantity
};
