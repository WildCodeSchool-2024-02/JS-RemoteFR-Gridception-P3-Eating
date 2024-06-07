
const CategoryRepository = require("./models/CategoryRepository");
const IngredientRepository = require("./models/IngredientRepository")

const tables = {};

tables.category = new CategoryRepository();
tables.ingredient = new IngredientRepository();

module.exports = new Proxy(tables, {
  get(obj, prop) {

    if (prop in obj) return obj[prop];


    throw new ReferenceError(
      `tables.${prop} is not defined. Did you register it in ${__filename}?`
    );
  },
});
