const AbstractSeeder = require("./AbstractSeeder");

class RecipeSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "recipe", truncate: true });
  }

  run() {
    for (let i = 0; i < 10; i += 1) {
      const fakeRecipe = {
        title: this.faker.lorem.word(),
        descriptionText: this.faker.lorem.paragraph(),
        time: this.faker.number.binary(),
        refName: `recipe_${i}`,
        category_id: this.getRef(`category_${i}`).insertId,
      };

      this.insert(fakeRecipe);
    }
  }
}

module.exports = RecipeSeeder;
