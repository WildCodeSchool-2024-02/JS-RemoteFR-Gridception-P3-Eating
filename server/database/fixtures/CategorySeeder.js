const AbstractSeeder = require("./AbstractSeeder");

class CategorySeeder extends AbstractSeeder {
  constructor() {
    super({ table: "category", truncate: true });
    this.categories = [
      "Plats rapides",
      "Plats végétariens",
      "Plats végétaliens",
      "Salades",
      "Soupes",
      "Smoothies et boissons",
      "Desserts",
      "Plats sans gluten",
      "Petit-déjeuners sains",
      "Recettes riches en protéines",
    ];
  }

  run() {
    for (let i = 0; i < this.categories.length; i += 1) {
      const listOfCategory = {
        name: this.categories[i],
      };

      this.insert(listOfCategory);
    }
  }
}

module.exports = CategorySeeder;
