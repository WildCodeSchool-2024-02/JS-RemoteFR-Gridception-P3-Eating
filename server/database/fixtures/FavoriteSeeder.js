const AbstractSeeder = require("./AbstractSeeder");

const UserSeeder = require("./UserSeeder");
const recipeSeeder = require("./recipeSeeder");

class FavoriteSeeder extends AbstractSeeder {
  constructor() {
    super({
      table: "favorite",
      truncate: true,
      dependencies: [UserSeeder, recipeSeeder],
    });
  }

  run() {
    for (let i = 0; i < 10; i += 1) {
      const fakeFavorite = {
        user_id: this.getRef(`user_${i}`).insertId,
        recipe_id: this.getRef(`recipe_${i}`).insertId,
      };
      this.insert(fakeFavorite);
    }
  }
}

module.exports = FavoriteSeeder;
