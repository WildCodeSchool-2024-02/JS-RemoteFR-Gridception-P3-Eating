const AbstractSeeder = require("./AbstractSeeder");

class IngredientSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "ingredient", truncate: true });
    this.ingredients = [
      { name: "Pomme", calories: 52 },
      { name: "Banane", calories: 89 },
      { name: "Poulet", calories: 165 },
      { name: "Riz", calories: 130 },
      { name: "Brocoli", calories: 34 },
      { name: "Fromage", calories: 402 },
      { name: "Amande", calories: 576 },
      { name: "Tomate", calories: 18 },
      { name: "Pain complet", calories: 265 },
      { name: "Yaourt nature", calories: 59 },
    ];
  }

  run() {
    for (let i = 0; i < this.ingredients.length; i += 1) {
      const listOfIngredient = {
        name: this.ingredients[i].name,
        calories: this.ingredients[i].calories,
      };

      this.insert(listOfIngredient);
    }
  }
}

module.exports = IngredientSeeder;
