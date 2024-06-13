const AbstractSeeder = require("./AbstractSeeder");
const IngredientSeeder = require("./IngredientSeeder");
const recipeSeeder = require("./recipeSeeder");

class QuantitySeeder extends AbstractSeeder {
  constructor() {
    super({
      table: "quantity",
      truncate: true,
      dependencies: [recipeSeeder, IngredientSeeder],
    });
  }

  run() {
    for (let i = 0; i < 10; i += 1) {
      const fakeQuantity = {
        quantity: this.faker.number.int({ max: 10 }),
        recipe_id: this.getRef(`recipe_${i}`).insertId,
        ingredient_id: this.getRef(`ingredient_${i}`).insertId,
      };

      this.insert(fakeQuantity);
    }
  }
}

module.exports = QuantitySeeder;
