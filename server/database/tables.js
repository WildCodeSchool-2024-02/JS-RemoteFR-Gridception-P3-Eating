const RecipeRepository = require("./models/RecipeRepository");


const tables = {};

tables.recipe = new RecipeRepository();

module.exports = new Proxy(tables, {
  get(obj, prop) {
    
    if (prop in obj) return obj[prop];
    
    throw new ReferenceError(
      `tables.${prop} is not defined. Did you register it in ${__filename}?`
    );
  },
});