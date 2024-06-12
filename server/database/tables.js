const CategoryRepository = require("./models/CategoryRepository");
const IngredientRepository = require("./models/IngredientRepository");
const UserRepository = require("./models/UserRepository");
const RoleRepository = require("./models/RoleRepository");
const FavoriteRepository = require("./models/FavoriteRepository");
const RecipeRepository = require("./models/RecipeRepository");

const tables = {};

tables.category = new CategoryRepository();
tables.ingredient = new IngredientRepository();
tables.user = new UserRepository();
tables.role = new RoleRepository();
tables.favorite = new FavoriteRepository();

tables.recipe = new RecipeRepository();

module.exports = new Proxy(tables, {
  get(obj, prop) {
    if (prop in obj) return obj[prop];

    throw new ReferenceError(
      `tables.${prop} is not defined. Did you register it in ${__filename}?`
    );
  },
});
